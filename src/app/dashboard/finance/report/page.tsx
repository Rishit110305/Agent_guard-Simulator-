"use client";

import { useEffect } from "react";
import { ArrowLeft, Printer, TrendingUp, Building2, Calendar, Target, Activity, ShieldCheck, Briefcase, Zap, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function FinanceReport() {
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 p-8 font-serif print:p-0 print:bg-white print:m-0">
      
      {/* Non-printable controls */}
      <div className="max-w-[210mm] mx-auto mb-8 flex justify-between items-center print:hidden border-b border-slate-200 pb-4">
        <Link href="/dashboard/finance" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-sans">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-sans font-semibold hover:bg-slate-800 transition-colors shadow-lg"
        >
          <Printer size={16} /> Print Official Report
        </button>
      </div>

      {/* Printable Report Content (A4 Proportions approx) */}
      <div className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-2xl p-12 space-y-10 border border-slate-200 print:border-none">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-[3px] border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={28} className="text-slate-900" />
              <h1 className="text-4xl font-black font-sans tracking-tight text-slate-900">AgentGuard</h1>
            </div>
            <p className="text-lg text-slate-600 font-sans font-medium uppercase tracking-widest">Financial & Unit Economics Audit</p>
          </div>
          <div className="text-right font-sans text-xs text-slate-500 space-y-1">
            <p><strong className="text-slate-700">DATE:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong className="text-slate-700">PREPARED BY:</strong> Team Rocket</p>
            <p><strong className="text-slate-700">DOCUMENT ID:</strong> AG-FIN-001</p>
            <p><strong className="text-slate-700">CONFIDENTIALITY:</strong> Level 1 (Strict)</p>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <section>
          <h2 className="text-lg font-bold font-sans mb-3 flex items-center gap-2 uppercase tracking-widest text-slate-900"><Building2 size={18} /> 1. Executive Summary</h2>
          <div className="text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              This document outlines the projected financial performance, operational expenditure (OPEX) distribution, and unit economics for AgentGuard over a 3-year horizon. AgentGuard operates in the rapidly expanding <strong>Agent Testing & Evaluation market</strong>, driven by the explosive 430% YoY growth in enterprise AI agent deployments.
            </p>
            <p>
              Currently, Fortune 500s are deploying autonomous agents with zero standardized testing, exposing them to an average production failure cost of <strong>$60,000+ per incident</strong>. AgentGuard bridges this critical gap by providing a pre-deployment simulation engine that evaluates agents against 1,000+ adversarial scenarios for just <strong>$0.50 per run</strong>, yielding an unprecedented <strong>120x ROI</strong> for enterprise customers.
            </p>
          </div>
        </section>

        {/* 2. Market Opportunity */}
        <section className="bg-slate-50 p-6 rounded-lg border border-slate-100">
          <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-900"><Target size={18} /> 2. Market Opportunity (TAM/SAM/SOM)</h2>
          <div className="grid grid-cols-3 gap-6 font-sans">
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Addressable (TAM)</div>
              <div className="text-2xl font-black text-slate-900">$4.2B</div>
              <div className="text-xs text-slate-600 mt-1">Global AI Eval Market</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Serviceable (SAM)</div>
              <div className="text-2xl font-black text-slate-900">$820M</div>
              <div className="text-xs text-slate-600 mt-1">Enterprise Pre-deploy</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Obtainable (SOM)</div>
              <div className="text-2xl font-black text-slate-900">$95M</div>
              <div className="text-xs text-slate-600 mt-1">India & SEA Beachhead</div>
            </div>
          </div>
        </section>

        {/* 3. Detailed 3-Year P&L */}
        <section>
          <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-900"><Calendar size={18} /> 3. Detailed 3-Year P&L Projection</h2>
          <table className="w-full text-left font-sans text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-900">
                <th className="py-3 px-2 font-bold uppercase text-xs tracking-wider">Financial Metric</th>
                <th className="py-3 px-2 text-right font-bold uppercase text-xs tracking-wider">Year 1</th>
                <th className="py-3 px-2 text-right font-bold uppercase text-xs tracking-wider">Year 2</th>
                <th className="py-3 px-2 text-right font-bold uppercase text-xs tracking-wider">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Revenue */}
              <tr className="bg-slate-50/50">
                <td className="py-3 px-2 font-semibold">Active Enterprise Customers</td>
                <td className="py-3 px-2 text-right">120</td>
                <td className="py-3 px-2 text-right">680</td>
                <td className="py-3 px-2 text-right font-bold">2,400</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-3 px-2 font-semibold">Projected ARR (Gross Revenue)</td>
                <td className="py-3 px-2 text-right font-mono text-slate-700">₹54.7L</td>
                <td className="py-3 px-2 text-right font-mono text-slate-700">₹669L</td>
                <td className="py-3 px-2 text-right font-mono font-bold text-slate-900">₹5,184L</td>
              </tr>
              {/* OPEX */}
              <tr>
                <td className="py-3 px-2 text-slate-600 pl-6 border-l-2 border-slate-200">Cost of Compute (LLM Inference)</td>
                <td className="py-3 px-2 text-right font-mono text-slate-500">₹11.2L</td>
                <td className="py-3 px-2 text-right font-mono text-slate-500">₹104L</td>
                <td className="py-3 px-2 text-right font-mono text-slate-500">₹695L</td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-slate-600 pl-6 border-l-2 border-slate-200">Server Infrastructure (Redis/DB)</td>
                <td className="py-3 px-2 text-right font-mono text-slate-500">₹4.1L</td>
                <td className="py-3 px-2 text-right font-mono text-slate-500">₹36L</td>
                <td className="py-3 px-2 text-right font-mono text-slate-500">₹186L</td>
              </tr>
              {/* Margins */}
              <tr className="border-t-2 border-slate-200">
                <td className="py-3 px-2 font-bold text-slate-900">Gross Margin %</td>
                <td className="py-3 px-2 text-right font-bold text-slate-900">72%</td>
                <td className="py-3 px-2 text-right font-bold text-slate-900">79%</td>
                <td className="py-3 px-2 text-right font-bold text-slate-900 text-green-700">83%</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold text-slate-900">Net Operational Status</td>
                <td className="py-3 px-2 text-right text-xs font-bold uppercase tracking-widest text-red-600">Cash Burn</td>
                <td className="py-3 px-2 text-right text-xs font-bold uppercase tracking-widest text-amber-600">Breakeven</td>
                <td className="py-3 px-2 text-right text-xs font-bold uppercase tracking-widest text-green-700">Profitable</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 4. Unit Economics & Pricing */}
        <section className="grid grid-cols-2 gap-8 pt-4">
          <div>
            <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-900"><TrendingUp size={18} /> 4a. Unit Economics</h2>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">Customer Acquisition Cost (CAC)</span>
                <strong className="font-mono text-slate-900">₹12,000</strong>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">Lifetime Value (LTV)</span>
                <strong className="font-mono text-slate-900">₹45,000</strong>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">LTV to CAC Ratio</span>
                <strong className="font-mono text-green-700">3.75x</strong>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">CAC Payback Period</span>
                <strong className="font-mono text-slate-900">4 Months</strong>
              </li>
              <li className="flex justify-between pt-1">
                <span className="text-slate-600 font-medium">AgentGuard Run Cost</span>
                <strong className="font-mono text-slate-900">$0.50 / run</strong>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-900"><Briefcase size={18} /> 4b. SaaS Pricing Tiers</h2>
            <ul className="space-y-3 font-sans text-sm">
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">Dev Tier <span className="text-[10px] uppercase ml-2 text-slate-400 tracking-wider">PLG Wedge</span></span>
                <strong className="font-mono text-slate-900">Free</strong>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">Growth Tier <span className="text-[10px] uppercase ml-2 text-slate-400 tracking-wider">Startups</span></span>
                <strong className="font-mono text-slate-900">₹4,999/mo</strong>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600 font-medium">Team Tier <span className="text-[10px] uppercase ml-2 text-slate-400 tracking-wider">ML Teams</span></span>
                <strong className="font-mono text-slate-900">₹14,999/mo</strong>
              </li>
              <li className="flex justify-between pt-1">
                <span className="text-slate-600 font-medium">Enterprise <span className="text-[10px] uppercase ml-2 text-slate-400 tracking-wider">On-Prem</span></span>
                <strong className="font-mono text-slate-900">Custom</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* 5. Competitor Matrix */}
        <section>
          <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest text-slate-900"><ShieldCheck size={18} /> 5. Competitor Cost & Capability Matrix</h2>
          <table className="w-full text-left font-sans text-sm border-collapse border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3 px-4 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-600">Platform</th>
                <th className="py-3 px-4 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-600">Pre-Deploy Eval</th>
                <th className="py-3 px-4 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-600">Autonomous Learning</th>
                <th className="py-3 px-4 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-600 text-right">Cost Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">LangSmith</td>
                <td className="py-3 px-4 text-slate-600 flex items-center gap-2"><XCircle size={14} className="text-red-500" /> Post-deploy only</td>
                <td className="py-3 px-4 text-slate-600">None</td>
                <td className="py-3 px-4 text-right text-slate-500 font-mono">High (Token + Seat)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Promptfoo</td>
                <td className="py-3 px-4 text-slate-600 flex items-center gap-2"><Target size={14} className="text-amber-500" /> Prompts only</td>
                <td className="py-3 px-4 text-slate-600">None</td>
                <td className="py-3 px-4 text-right text-slate-500 font-mono">Medium</td>
              </tr>
              <tr className="bg-slate-900 text-white">
                <td className="py-3 px-4 font-bold flex items-center gap-2"><Zap size={14} className="text-mint" /> AgentGuard</td>
                <td className="py-3 px-4 font-semibold flex items-center gap-2"><CheckCircle2 size={14} className="text-mint" /> Full 360° Agent Eval</td>
                <td className="py-3 px-4 font-semibold flex items-center gap-2"><CheckCircle2 size={14} className="text-mint" /> Yes (Module 06)</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-mint">$0.50 / Run</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <div className="pt-8 mt-12 text-center text-[10px] font-sans text-slate-400 border-t border-slate-200 uppercase tracking-widest flex justify-between items-center">
          <span>AgentGuard Proprietary & Confidential</span>
          <span>Page 1 of 1</span>
          <span>Do Not Distribute</span>
        </div>

      </div>
    </div>
  );
}
