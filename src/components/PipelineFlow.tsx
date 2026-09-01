"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bug, Shield, Play, Gauge, RefreshCw, Sparkles } from "lucide-react";
import { RunPhase } from "@/lib/types";

const NODES = [
  { key: "generate", label: "Generate", icon: Bug, phases: ["chaos_input"] },
  { key: "stress", label: "Stress", icon: Shield, phases: ["chaos_input"] },
  { key: "execute", label: "Execute", icon: Play, phases: ["chaos_input", "failure_detection"] },
  { key: "evaluate", label: "Evaluate", icon: Gauge, phases: ["failure_detection", "root_cause"] },
  { key: "learn", label: "Learn", icon: RefreshCw, phases: ["auto_improve"] },
  { key: "verify", label: "Verify", icon: Sparkles, phases: ["auto_improve", "done"] },
] as const;

const PHASE_ORDER: RunPhase[] = ["queued", "chaos_input", "failure_detection", "root_cause", "auto_improve", "done"];

export default function PipelineFlow({ status }: { status: RunPhase }) {
  const currentIdx = PHASE_ORDER.indexOf(status);

  return (
    <div className="bg-[#050505] rounded-2xl p-6 overflow-x-auto border border-white/10 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-mint/5 via-transparent to-violet/5 opacity-50" />
      <div className="flex items-center gap-2 min-w-[640px] relative z-10">
        {NODES.map((node, i) => {
          const nodeMaxIdx = Math.max(...node.phases.map((p) => PHASE_ORDER.indexOf(p as RunPhase)));
          const nodeMinIdx = Math.min(...node.phases.map((p) => PHASE_ORDER.indexOf(p as RunPhase)));
          const active = currentIdx >= nodeMinIdx && currentIdx <= nodeMaxIdx;
          const done = currentIdx > nodeMaxIdx;

          return (
            <div key={node.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <motion.div
                  animate={{
                    scale: active ? [1, 1.1, 1] : 1,
                    borderColor: active ? "#34e0a1" : done ? "rgba(52,224,161,0.5)" : "rgba(255,255,255,0.1)",
                    boxShadow: active ? "0 0 20px rgba(52,224,161,0.4)" : "none"
                  }}
                  transition={{ duration: 2, repeat: active ? Infinity : 0 }}
                  className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]"
                >
                  {active && (
                    <div className="absolute inset-0 bg-mint/20 animate-pulse" />
                  )}
                  <node.icon size={20} className={active ? "text-mint relative z-10" : done ? "text-mint/60 relative z-10" : "text-white/30 relative z-10"} />
                </motion.div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${active ? "text-mint" : done ? "text-mint/60" : "text-white/40"}`}>{node.label}</span>
              </div>

              {i < NODES.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 relative overflow-hidden bg-white/5 rounded-full">
                  <AnimatePresence>
                    {(done || active) && (
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-mint/80 shadow-[0_0_10px_rgba(52,224,161,0.8)]"
                      />
                    )}
                  </AnimatePresence>
                  {active && (
                     <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-white/80 blur-[2px] animate-[streak_1.5s_linear_infinite]" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
