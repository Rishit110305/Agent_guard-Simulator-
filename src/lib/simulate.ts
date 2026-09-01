import { applyPatch, isCategoryPatched, patchForCategory } from "./agent";
import { callAgent } from "./llm";
import { buildRunSet } from "./scenario";
import { buildPersonaResult, computeScores, findRootCause } from "./evaluate";
import { appendLog, updateRun } from "./store";
import { getAgentState, commitAgentPatch } from "./agentState";
import { Persona, PersonaResult } from "./types";

/** How many personas run at once. No Redis needed for this — just a bounded worker pool. */
const CONCURRENCY = 6;

/**
 * Runs a batch of personas with bounded concurrency, calling `onResult` as
 * each one finishes — not in original order, in COMPLETION order, which is
 * what real parallel execution looks like.
 */
async function runBatch(
  personas: Persona[],
  systemPrompt: string,
  onResult: (result: PersonaResult) => Promise<void>
) {
  let cursor = 0;
  async function worker() {
    while (cursor < personas.length) {
      const persona = personas[cursor++];
      const { text, tokensUsed, mocked } = await callAgent(systemPrompt, persona);
      const result = buildPersonaResult(persona, text, tokensUsed, mocked);
      await onResult(result);
    }
  }
  const workers = Array.from({ length: Math.min(CONCURRENCY, personas.length) }, () => worker());
  await Promise.all(workers);
}

/**
 * Runs the full "1,000 Angry Users vs Your AI Agent" pipeline for one run id.
 * Module 01 (Simulation) + Module 04 (Multi-Run Execution): personas run
 * with real bounded concurrency, not sequentially.
 * Module 06 (Learning Loop): starts from whatever the agent last learned —
 * see agentState.ts — and commits any new patch back for the NEXT run.
 */
export async function runDemoPipeline(runId: string, customPrompt?: string) {
  const personas = buildRunSet();
  const agentState = await getAgentState();
  const basePrompt = customPrompt || agentState.prompt;

  await updateRun(runId, { status: "chaos_input", agentVersionBefore: customPrompt ? "Custom-v1" : agentState.version });
  await appendLog(
    runId,
    `Injecting ${personas.length} synthetic users (${CONCURRENCY} concurrent) against agent v${agentState.version}...`,
    "info"
  );

  // --- Module 01 + 04: Simulation Engine + Multi-Run Execution ---
  const results: PersonaResult[] = [];
  await runBatch(personas, basePrompt, async (result) => {
    results.push(result);
    await updateRun(runId, { results: [...results] });
    await appendLog(
      runId,
      `${result.persona.name} (${result.persona.mood}) → ${result.passed ? "OK" : `FLAGGED: ${result.flags.map(f => f.category).join(", ")}`}`,
      result.passed ? "info" : "warn"
    );
  });

  // --- Module 05: Evaluation Engine ---
  await updateRun(runId, { status: "failure_detection" });
  await appendLog(runId, "Running 4-axis evaluation (Reliability, Safety, Consistency, Cost)...", "info");
  const scoresBefore = computeScores(results);
  await updateRun(runId, { scoresBefore });
  await appendLog(runId, `Pre-patch scores computed: Reliability ${scoresBefore.reliability}, Safety ${scoresBefore.safety}.`, "info");
  const failedCount = results.filter((r) => !r.passed).length;
  await appendLog(runId, `Failure detection complete: ${failedCount} of ${personas.length} runs flagged.`, failedCount ? "error" : "success");

  // --- Root cause clustering ---
  await updateRun(runId, { status: "root_cause" });
  const rootCause = findRootCause(results);
  if (rootCause) {
    await updateRun(runId, { rootCause });
    await appendLog(runId, rootCause.summary, "warn");
  } else {
    await appendLog(runId, "No failures found — agent passed the full adversarial suite.", "success");
  }

  // --- Module 06: Learning Loop ---
  if (rootCause) {
    const toRerun = results.filter((r) => !r.passed);
    const failingCategories = [...new Set(toRerun.flatMap((r) => r.flags.map(f => f.category)))];
    // Only patch categories this baseline hasn't already learned — avoids
    // duplicating instructions once the agent has converged.
    const newCategories = failingCategories.filter((cat) => !isCategoryPatched(basePrompt, cat));

    if (newCategories.length === 0) {
      await appendLog(runId, "All failing categories were already hardened in a previous run — no new patch to apply.", "info");
      await updateRun(runId, { scoresAfter: scoresBefore, agentVersionAfter: agentState.version });
    } else {
      await updateRun(runId, { status: "auto_improve" });
      let patchedPrompt = basePrompt;
      const reasons: string[] = [];
      for (const cat of newCategories) {
        const patch = patchForCategory(cat);
        patchedPrompt = applyPatch(patchedPrompt, patch);
        reasons.push(patch.reason);
      }
      await updateRun(runId, { patchApplied: reasons.join(" ") });
      await appendLog(runId, `Auto-patch applied across ${newCategories.length} new failure categories.`, "info");

      const rerunResults: PersonaResult[] = [];
      await runBatch(toRerun.map((r) => r.persona), patchedPrompt, async (result) => {
        rerunResults.push(result);
        await updateRun(runId, { rerunResults: [...rerunResults] });
        await appendLog(runId, `Re-run ${result.persona.name} → ${result.passed ? "FIXED" : "still failing"}`, result.passed ? "success" : "error");
      });

      const mergedResults = results.map((r) => rerunResults.find((rr) => rr.persona.id === r.persona.id) ?? r);
      const scoresAfter = computeScores(mergedResults);
      await updateRun(runId, { scoresAfter });
      await appendLog(
        runId,
        `Reliability ${scoresBefore.reliability} → ${scoresAfter.reliability}, Safety ${scoresBefore.safety} → ${scoresAfter.safety}.`,
        "success"
      );

      // This is the actual fix: persist the hardened prompt as the new
      // baseline so the NEXT run starts smarter, instead of relearning
      // the same fix every time.
      if (!customPrompt) {
        const newState = await commitAgentPatch(patchedPrompt, reasons.join(" "));
        await updateRun(runId, { agentVersionAfter: newState.version });
        await appendLog(runId, `Agent baseline updated: v${agentState.version} → v${newState.version}. Next run starts here.`, "success");
      } else {
        await updateRun(runId, { agentVersionAfter: "Custom-v2", customPatch: patchedPrompt });
        await appendLog(runId, `Custom Agent successfully patched. Your new secure system prompt is ready!`, "success");
      }
    }
  } else {
    await updateRun(runId, { scoresAfter: scoresBefore, agentVersionAfter: customPrompt ? "Custom-v1" : agentState.version });
  }

  await updateRun(runId, { status: "done" });
  await appendLog(runId, "Run complete.", "success");
}
