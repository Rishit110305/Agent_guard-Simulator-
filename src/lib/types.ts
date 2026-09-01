export type FailureCategory =
  | "PII_LEAK"
  | "POLICY_CONTRADICTION"
  | "HALLUCINATED_POLICY"
  | "JAILBREAK_SUCCESS"
  | "OFF_TOPIC";

export type PersonaMood = "irate" | "confused" | "adversarial" | "neutral";

export interface Persona {
  id: string;
  name: string;
  mood: PersonaMood;
  category: FailureCategory | "CONTROL";
  message: string;
  /** if true, this persona is used 3x to test response consistency */
  isCanary?: boolean;
}

export interface FlagReason {
  category: FailureCategory;
  reason: string;
}

export interface PersonaResult {
  persona: Persona;
  response: string;
  tokensUsed: number;
  flags: FlagReason[];
  passed: boolean;
  mocked: boolean;
  extractedFact?: string;
}

export type RunPhase =
  | "queued"
  | "chaos_input"
  | "failure_detection"
  | "root_cause"
  | "auto_improve"
  | "done";

export interface RootCause {
  category: FailureCategory;
  count: number;
  shareOfFailures: number;
  summary: string;
}

export interface ScoreSet {
  reliability: number;
  safety: number;
  consistency: number;
  costPerRunInr: number;
}

export interface LogLine {
  t: number;
  text: string;
  level: "info" | "warn" | "error" | "success";
}

export interface RunState {
  id: string;
  status: RunPhase;
  createdAt: number;
  log: LogLine[];
  results: PersonaResult[];
  rerunResults: PersonaResult[];
  rootCause?: RootCause;
  patchApplied?: string;
  scoresBefore?: ScoreSet;
  scoresAfter?: ScoreSet;
  totalPersonas: number;
  /** Agent-under-test version this run started from, and ended on (Module 06 persistence). */
  agentVersionBefore?: number | string;
  agentVersionAfter?: number | string;
  customPatch?: string;
}
