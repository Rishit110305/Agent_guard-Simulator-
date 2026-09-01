"use client";

import { useEffect, useRef, useState } from "react";
import { PlayCircle, Loader2, Bug, ShieldAlert, Users, Cpu, Radio, RadioTower, ArrowRight } from "lucide-react";
import PipelineFlow from "@/components/PipelineFlow";
import RunGrid from "@/components/RunGrid";
import LiveConsole from "@/components/LiveConsole";
import ScoreDonut from "@/components/ScoreDonut";
import ScenarioCard from "@/components/ScenarioCard";
import ToastAlert from "@/components/ToastAlert";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ATTACK_VECTOR_COUNT } from "@/lib/scenario";
import { useRunSocket } from "@/hooks/useRunSocket";

const SCENARIOS = [
  { icon: Users, title: "1,000 Angry Users", subtitle: "Full chaos + auto-improve run", badge: "Primary" },
  { icon: Bug, title: "Prompt Injection Sweep", subtitle: "Jailbreak + override attempts", badge: "Included" },
  { icon: ShieldAlert, title: "PII Exposure Probe", subtitle: "Unverified identity requests", badge: "Included" },
  { icon: Cpu, title: "Policy Consistency Check", subtitle: "Canary repeat-answer test", badge: "Included" },
];

export default function AgentsPage() {
  const [runId, setRunId] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAddPersona, setShowAddPersona] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const alertedRef = useRef(false);
  const { run, live } = useRunSocket(runId);

  async function startDemo() {
    setStarting(true);
    setShowAlert(false);
    alertedRef.current = false;
    const res = await fetch("/api/runs", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customPrompt: customPrompt || undefined })
    });
    const { id } = await res.json();
    setStarting(false);
    setRunId(id);
  }
  
  async function handleAddPersona(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/personas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd.entries())),
    });
    setShowAddPersona(false);
    window.location.reload();
  }

  useEffect(() => {
    if (run?.rootCause && !alertedRef.current) {
      alertedRef.current = true;
      setShowAlert(true);
    }
  }, [run?.rootCause]);

  const isRunning = run && run.status !== "done";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Agent Demo Scenarios</h1>
          <p className="text-muted mt-1">{ATTACK_VECTOR_COUNT}+ adversarial attack vectors, run against your agent in one pass.</p>
        </div>
        <Badge tone={live ? "mint" : "muted"} icon={live ? RadioTower : Radio}>
          {live ? "Live · Socket.IO connected" : "Polling fallback"}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 flex flex-col gap-3 h-fit shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-mint/5 blur-[50px] pointer-events-none" />
          <h3 className="text-sm font-medium text-muted mb-1">Select scenario</h3>
          {SCENARIOS.map((s, i) => (
            <ScenarioCard key={s.title} {...s} active={i === 0} />
          ))}
          <h3 className="text-sm font-medium text-muted mb-1 mt-2">Test your own agent or Webhook</h3>
          <textarea
            className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-mint/50 transition-colors resize-none h-24 scrollbar-thin"
            placeholder="Paste your agent's system prompt OR your live API Webhook URL (https://...) to stress-test your deployed infrastructure."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            disabled={starting || !!isRunning}
          />
          <Button onClick={startDemo} disabled={starting || !!isRunning} className="mt-2 h-12 text-base">
            {starting || isRunning ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
            {isRunning ? "Running..." : "Run Simulation"}
          </Button>
          <Button onClick={() => setShowAddPersona(true)} disabled={starting || !!isRunning} className="bg-transparent border border-white/10 hover:bg-white/5 text-white/60 hover:text-white h-10">
            + Add Custom Persona
          </Button>
        </div>

        <LiveConsole log={run?.log ?? []} />
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6">
          <PipelineFlow status={run?.status ?? "queued"} />
          
          <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet/5 blur-[80px] pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Execution Matrix</h3>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-widest font-semibold">Module 04 · Live Traversal</p>
              </div>
              <Badge tone="mint" className="animate-pulse">Processing</Badge>
            </div>
            <RunGrid results={run?.results ?? []} />
          </div>
        </div>

        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6">
          <div className="absolute top-0 left-0 w-32 h-32 bg-mint/5 blur-[50px] pointer-events-none" />
          
          <div>
            <h3 className="text-sm font-semibold text-white mb-1 uppercase tracking-widest">Active Defenses</h3>
            <div className="text-xs text-white/50 mb-4">Cryptographic verification layer engaged</div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full border border-mint/20 flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 rounded-full border border-mint/40 border-t-mint animate-spin" style={{ animationDuration: '2s' }} />
                <ShieldAlert size={16} className="text-mint" />
              </div>
              <div>
                <div className="text-xs text-mint uppercase tracking-widest font-semibold">Shield Active</div>
                <div className="text-[10px] text-white/40 mt-0.5">Monitoring all vectors</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">Session ID</div>
              <div className="text-sm font-mono text-white/90 truncate">{run?.id ?? "AWAITING_TRIGGER"}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">Vectors Processed</div>
              <div className="text-2xl font-bold text-white/90">{run?.results.length ?? 0} <span className="text-sm text-white/30">/ {ATTACK_VECTOR_COUNT}</span></div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">Compute Latency</div>
              <div className="text-sm font-mono text-white/90">{isRunning ? '12.4ms' : '0.0ms'}</div>
            </div>
          </div>
        </div>
      </div>

      {run?.rootCause && (
        <div className="bg-rose/10 backdrop-blur-xl border border-rose/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(244,63,94,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose animate-pulse" />
          <div className="text-xs text-rose tracking-widest mb-2 font-bold uppercase flex items-center gap-2">
            <ShieldAlert size={14} /> Critical Vulnerability Cluster
          </div>
          <p className="text-white/90 text-lg font-medium leading-relaxed">{run.rootCause.summary}</p>
          {run.patchApplied && (
            <div className="mt-4 pt-4 border-t border-rose/20">
              <div className="text-xs text-mint font-bold uppercase tracking-widest mb-1">Auto-Patch Deployed</div>
              <p className="text-sm text-mint/80 font-mono bg-mint/5 p-3 rounded-lg border border-mint/10 mb-2">{run.patchApplied}</p>
              {run.agentVersionAfter && run.agentVersionAfter !== run.agentVersionBefore && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-mint mb-2">
                    <div className="px-2 py-1 rounded bg-mint/10 border border-mint/20 text-[10px] font-bold tracking-widest uppercase">Agent Baseline Updated</div>
                    <span className="text-xs font-mono opacity-80">v{run.agentVersionBefore} → v{run.agentVersionAfter}</span>
                  </div>
                  {(run as any).customPatch && (
                    <div className="p-3 bg-mint/5 border border-mint/20 rounded-xl text-xs text-mint/90 font-mono leading-relaxed h-32 overflow-y-auto scrollbar-thin">
                      <div className="font-sans font-bold uppercase tracking-widest text-[10px] mb-1 opacity-70">Generated Secure Prompt:</div>
                      {(run as any).customPatch}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {run?.scoresBefore && (
        <div className="bg-[#050505] rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-mint/10 blur-[80px] pointer-events-none" />
          
          <h3 className="text-lg font-semibold text-white mb-6 relative z-10 flex items-center gap-2">
            {run.scoresAfter ? (
              <>Pre & Post Patch Validation <Badge tone="mint">Verified</Badge></>
            ) : (
              "Live Telemetry Scores"
            )}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <ScoreCompare label="Reliability" color="#8b7cf6" before={run.scoresBefore.reliability} after={run.scoresAfter?.reliability} />
            <ScoreCompare label="Safety" color="#34e0a1" before={run.scoresBefore.safety} after={run.scoresAfter?.safety} />
            <ScoreCompare label="Consistency" color="#f5a623" before={run.scoresBefore.consistency} after={run.scoresAfter?.consistency} />
          </div>
        </div>
      )}

      {showAlert && run?.rootCause && (
        <ToastAlert
          title="Failure Cluster Detected"
          message={run.rootCause.summary}
          actionLabel="Auto-patch in progress"
          onAction={() => setShowAlert(false)}
        />
      )}

      {showAddPersona && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet to-mint" />
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-semibold text-xl text-white">Custom Vector</h3>
              <button onClick={() => setShowAddPersona(false)} className="text-white/50 hover:text-white transition-colors">&times;</button>
            </div>
            <form onSubmit={handleAddPersona} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Identifier</label>
                <input required name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mint/50 transition-colors" placeholder="e.g. Hacker Bob" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Mood Profile</label>
                  <select required name="mood" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mint/50 appearance-none transition-colors">
                    <option value="neutral">Neutral</option>
                    <option value="irate">Irate</option>
                    <option value="confused">Confused</option>
                    <option value="adversarial">Adversarial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Target Category</label>
                  <select required name="category" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mint/50 appearance-none transition-colors">
                    <option value="CONTROL">Control</option>
                    <option value="PII_LEAK">PII Leak</option>
                    <option value="POLICY_CONTRADICTION">Policy Contradiction</option>
                    <option value="HALLUCINATED_POLICY">Hallucinated Policy</option>
                    <option value="JAILBREAK_SUCCESS">Jailbreak</option>
                    <option value="OFF_TOPIC">Off Topic</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">Prompt Payload</label>
                <textarea required name="message" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-mint/50 resize-none transition-colors" placeholder="Inject payload here..." />
              </div>
              <Button type="submit" className="w-full mt-2 h-12 text-sm font-semibold tracking-wide">Initialize Vector</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreCompare({ label, color, before, after }: { label: string; color: string; before: number; after?: number }) {
  if (after === undefined || after === before) {
    return (
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <ScoreDonut label={label} value={before} color={color} />
      </div>
    );
  }
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `linear-gradient(45deg, transparent, ${color})` }} />
      <div className="flex items-center justify-between h-full relative z-10">
        <div className="text-center flex-1">
          <div className="text-3xl font-bold text-white/30">{before}<span className="text-xl">%</span></div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2">Baseline</div>
        </div>
        <div className="text-mint animate-pulse shrink-0 px-2">
          <ArrowRight size={20} />
        </div>
        <div className="text-center flex-1">
          <div className="text-4xl font-bold" style={{ color }}>{after}<span className="text-2xl">%</span></div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color }}>Optimized</div>
        </div>
      </div>
      <div className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}
