"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Smartphone, Monitor, Cpu, Activity, Search } from "lucide-react";

const INTEGRATIONS = [
  { letter: "O", name: "OpenAI", desc: "Seamless integration for OpenAI ChatGPT.", badge: "Popular" },
  { letter: "G", name: "Google", desc: "Google Cloud Platform integration." },
  { letter: "G", name: "Gemini", desc: "Google's Gemini AI assistant." },
  { letter: "G", name: "GitHub", desc: "Code and repository management." },
  { letter: "V", name: "Vercel", desc: "Deploy and host your applications." },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 selection:bg-mint/20">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mb-12">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          Elevate Your <span className="text-mint">Agent Experience</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Card: Download App */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center shrink-0">
                <Shield size={28} className="text-black fill-black" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">AgentGuard App</h2>
            </div>
            
            <p className="text-white/60 leading-relaxed mb-10 relative z-10 text-[15px]">
              A smart autonomous agent testing platform designed to optimize your deployment pipeline. Find vulnerabilities, track usage, and manage your AI models seamlessly.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4 relative z-10">
              <button className="flex items-center justify-center gap-2 bg-mint hover:bg-mint-dim text-black font-semibold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(52,224,161,0.2)]">
                <Smartphone size={18} /> Download for iOS
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-white/10 hover:bg-white/5 text-white font-medium py-4 rounded-2xl transition-all">
                <Smartphone size={18} /> Download for Android
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6 relative z-10">
              <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-white/10 hover:bg-white/5 text-white font-medium py-4 rounded-2xl transition-all text-sm">
                <Monitor size={16} /> macOS (Apple Silicon)
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-white/10 hover:bg-white/5 text-white font-medium py-4 rounded-2xl transition-all text-sm">
                <Cpu size={16} /> macOS (Intel)
              </button>
            </div>

            <a href="#" className="text-white/40 text-sm hover:text-white underline underline-offset-4 decoration-white/20 mb-12 inline-block transition-colors">
              More download options
            </a>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

            <div className="text-[11px] font-bold tracking-widest text-white/40 uppercase mb-6">Feature Overview</div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center shrink-0 mt-1">
                  <Activity size={18} className="text-mint" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Live Telemetry</h4>
                  <p className="text-sm text-white/40 leading-relaxed">Find vulnerabilities and logic flaws with real-time dashboard tracking.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center shrink-0 mt-1">
                  <Shield size={18} className="text-mint" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Auto-Improvement</h4>
                  <p className="text-sm text-white/40 leading-relaxed">AI-optimized system prompt patches based on live failure metrics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Integrations */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Integrations</h2>
            <p className="text-white/60 mb-8 text-[15px]">Connect AgentGuard with your favorite apps and services.</p>

            <div className="relative mb-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search integrations..." 
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[15px] text-white focus:outline-none focus:border-mint/50 transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="space-y-6">
              {INTEGRATIONS.map((integ, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-green-900/40 text-mint flex items-center justify-center font-bold text-lg shrink-0 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                    {integ.letter}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white group-hover:text-mint transition-colors">{integ.name}</h4>
                      {integ.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-950 px-2 py-0.5 rounded-full border border-green-800">
                          {integ.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 mt-1">{integ.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
