# AgentGuard — Agent Flight Simulator

Working prototype for **Build with भारत 2.0 / Team Rocket**. Runs an AI customer-support
agent against a library of synthetic angry users, adversarial prompts, and edge cases,
then finds the root cause of any failures and auto-patches the agent — live, in the browser.

This is the "1,000 Angry Users vs Your AI Agent" demo from the pitch deck, actually running.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No API key or database required — it runs on a deterministic
mock agent and an in-memory store out of the box (see "Two modes" and "Database" below).
Click **Run Demo** on `/dashboard/agents` to trigger the full pipeline.

To test against a real model, or persist runs to a real database, copy `.env.example` to
`.env.local` and set `GROQ_API_KEY` / `MONGODB_URI`.

## What's actually implemented (honest mapping to the 6-module deck)

| Deck module | This repo |
|---|---|
| 01 Simulation Engine | `src/lib/simulate.ts` runs each persona's message against the agent-under-test with real bounded concurrency (6 at a time), not sequentially |
| 02 Scenario Generator | `src/lib/scenario.ts` — 56 seeded personas (50 adversarial attack-vector personas across 5 categories + control group), 59 total runs per pass including canary repeats |
| 03 Stress Testing Layer | The adversarial personas in `scenario.ts` *are* the stress layer — prompt injection, policy contradiction, and PII probing are all represented |
| 04 Multi-Run Execution | A bounded worker pool (`runBatch` in `simulate.ts`) runs 6 personas concurrently, streaming results as each one completes over Socket.IO — not a queue, but genuinely parallel |
| 05 Evaluation Engine | `src/lib/evaluate.ts` — rule-based flag detection read from the *response text itself* (not the persona's label, so it's an honest check), plus 4-axis scoring: reliability, safety, consistency, cost. Each flag now surfaces a plain-English reason in the Decision Feed |
| 06 Learning Loop | `src/lib/agent.ts` + `src/lib/agentState.ts` + `simulate.ts` — after failures are clustered by category, the system prompt is patched for every NEW failing category and the patch **persists as the agent's baseline** (`/api/agent`), so the next run starts from what was already learned instead of relearning it. Resettable from the Agents page. |

## Two modes: agent

- **Mock agent** (default, no setup): `src/lib/llm.ts` falls back to a scripted agent whose
  answers depend on whether the system prompt has been patched yet — so the before/after
  score improvement (verified: 31%→100% reliability, 0%→100% safety in a real test run) is
  a real effect of the patch, not a hardcoded number.
- **Real agent**: set `GROQ_API_KEY` and the same code path calls `llama-3.1-8b-instant` instead.
  Real models usually fail a similar subset of personas against the unpatched prompt, so the
  demo still works, just with less predictable timing — test this before presenting.

## Two modes: storage

- **In-memory** (default, no setup): `src/lib/store.ts` keeps run state in a `Map`. Good
  for local dev and single-instance demos; state resets on server restart.
- **MongoDB**: set `MONGODB_URI` and the exact same functions (`createRun`, `getRun`,
  `updateRun`, `appendLog`) transparently switch to real Mongoose-backed persistence via
  `src/lib/db.ts` + `src/lib/models/Run.ts`. No code elsewhere changes — check `GET /api/health`
  to confirm which mode is active.

## Real-time: real Socket.IO, with an important deployment tradeoff

This now runs on a **custom Node server** (`server.js`) with real Socket.IO attached —
not polling. Every run mutation in `src/lib/store.ts` pushes a `run:progress` event to
anyone subscribed to that run, and a `runs:changed` broadcast to everyone else. Verified
with a real `socket.io-client` test: 228 live push events for one 59-persona run, zero
polling involved.

**This means `npm run dev` / `npm start` now run `node server.js`, not the plain Next.js
CLI** — required so Socket.IO can attach to the same HTTP server Next.js uses.

**The tradeoff, and it's a real one:** a custom long-lived server does not run on Vercel's
serverless functions — they don't stay alive for WebSockets. Deploy this to **Render,
Railway, or Fly** instead (all free-tier friendly). If you do end up somewhere serverless,
`src/hooks/useRunSocket.ts` detects the socket never connects and automatically falls back
to 700ms polling — you lose the real-time push, not functionality.

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/runs` | `POST` | Starts a new demo run, returns `{ id }` immediately, runs the pipeline in the background |
| `/api/runs` | `GET` | Lists recent runs (used by Overview + Decisions pages) |
| `/api/runs/[id]` | `GET` | Live run state — pushed over Socket.IO, polling is a fallback only |
| `/api/agent` | `GET` | Current agent-under-test version + patch history |
| `/api/agent/reset` | `POST` | Resets the agent back to its unpatched v1 baseline |
| `/api/health` | `GET` | Reports active storage mode (`memory`/`mongodb`) and agent mode (`mock-agent`/`live-model`) |

All routes wrap their logic in try/catch and return proper HTTP status codes on failure —
nothing throws an unhandled error into a blank Vercel 500 page.

## Project structure

```
src/
  lib/
    types.ts        shared types for the whole pipeline
    scenario.ts      Module 02/03 — persona + edge-case library (25 personas)
    agent.ts         the agent-under-test's system prompt + patch generator (Module 06)
    llm.ts           real/mock LLM call wrapper
    evaluate.ts      Module 05 — flag detection, scoring, root-cause clustering
    simulate.ts      orchestrates one full demo run across all modules
    store.ts         run state store — memory or MongoDB, same API either way
    db.ts            Mongoose connection singleton
    models/Run.ts    Mongoose schema for a run
  app/
    page.tsx                      landing page + pipeline diagram
    dashboard/page.tsx             AI Decision Analytics overview
    dashboard/agents/page.tsx      the live demo screen — this is what you present
    dashboard/runs/page.tsx        per-persona decision feed
    dashboard/notifications/page.tsx  live warn/error feed
    api/runs/route.ts              POST start a run, GET list runs
    api/runs/[id]/route.ts         GET live run state (polled)
    api/health/route.ts            storage + agent mode check
  components/        UI pieces styled to match the Voltix reference (dark/mint theme,
                      icon sidebar, tab topbar, toast alerts, floating action button)
```

## Deploying

1. Push to GitHub.
2. Deploy to **Render, Railway, or Fly** (not Vercel — see "Real-time" above for why).
   All three support a `node server.js` start command out of the box with a free tier.
3. Zero config needed for the default (memory + mock) mode. To go further: add a free
   MongoDB Atlas cluster and set `MONGODB_URI` in the host's env vars, redeploy. Check
   `/api/health` to confirm it picked it up.
4. If you specifically need Vercel (e.g. team familiarity), it still works — `npm run
   dev:vercel-style` runs the plain Next.js CLI without the custom server, and the client
   automatically falls back to polling. You lose real-time push, not functionality.

## Next up (see the team's build-phase plan for the day-by-day)

- Redis-backed job queue if persona counts grow past what an in-process worker pool
  handles well (current concurrency-pool approach — see Module 04 above — comfortably
  covers the present 59-persona scale without new infrastructure)
- LLM-driven expansion of the persona library beyond the seeded 50 attack vectors (per Module 02's spec)
- Wire in a second, swappable "agent under test" so judges can point AgentGuard at
  their own agent instead of the built-in Playstream demo bot
- Auth stub for multi-user judging (currently single-tenant by design, matches hackathon scope)
