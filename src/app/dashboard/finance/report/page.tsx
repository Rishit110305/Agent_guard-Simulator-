"use client";

import { useEffect } from "react";
import { ArrowLeft, Printer, TrendingUp, Building2, Calendar, Target } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function FinanceReport() {
  
  return (
    <div className="min-h-screen bg-white text-black p-8 font-serif print:p-0 print:bg-white print:m-0">
      
      {/* Non-printable controls */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden border-b border-black/10 pb-4">
        <Link href="/dashboard/finance" className="flex items-center gap-2 text-sm text-black/60 hover:text-black">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-sans font-medium hover:bg-black/80"
        >
          <Printer size={16} /> Print Official Report
        </button>
      </div>

      {/* Printable Report Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-2 border-black pb-8">
          <div>
            <h1 className="text-4xl font-bold font-sans tracking-tight mb-2">AgentGuard</h1>
            <p className="text-xl text-black/70">Financial & Unit Economics Report</p>
          </div>
          <div className="text-right font-sans text-sm text-black/60">
            <p><strong>DATE:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>PREPARED FOR:</strong> Team Rocket</p>
            <p><strong>DOCUMENT ID:</strong> AG-FIN-001</p>
          </div>
        </div>

        {/* Executive Summary */}
        <section>
          <h2 className="text-xl font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest"><Building2 size={20} /> Executive Summary</h2>
          <p className="text-black/80 leading-relaxed mb-4">
            This document outlines the projected financial performance and unit economics for AgentGuard over a 3-year horizon. AgentGuard operates in the rapidly expanding Agent Testing & Evaluation market, currently valued at a Total Addressable Market (TAM) of <strong>$4.2 Billion</strong>.
          </p>
          <p className="text-black/80 leading-relaxed">
            By establishing a beachhead in the India and SEA markets (SOM: $95M), the platform aims to capture early market share through a Product-Led Growth (PLG) motion. The unit economics exhibit strong software margins (up to 83% by Year 3) driven by scalable cloud infrastructure and highly efficient concurrent processing engines.
          </p>
        </section>

        {/* 3-Year Projections */}
        <section>
          <h2 className="text-xl font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest"><Calendar size={20} /> 3-Year P&L Projections</h2>
          <table className="w-full text-left font-sans text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-3 px-2">Metric</th>
                <th className="py-3 px-2 text-right">Year 1</th>
                <th className="py-3 px-2 text-right">Year 2</th>
                <th className="py-3 px-2 text-right">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              <tr>
                <td className="py-3 px-2 font-semibold">Active Customers</td>
                <td className="py-3 px-2 text-right">120</td>
                <td className="py-3 px-2 text-right">680</td>
                <td className="py-3 px-2 text-right font-bold">2,400</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-semibold">Projected ARR (INR)</td>
                <td className="py-3 px-2 text-right">₹54.7L</td>
                <td className="py-3 px-2 text-right">₹669L</td>
                <td className="py-3 px-2 text-right font-bold">₹5,184L</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-semibold">Gross Margin</td>
                <td className="py-3 px-2 text-right">72%</td>
                <td className="py-3 px-2 text-right">79%</td>
                <td className="py-3 px-2 text-right font-bold">83%</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-semibold">Operating Status</td>
                <td className="py-3 px-2 text-right">Cash Burn</td>
                <td className="py-3 px-2 text-right">Breakeven</td>
                <td className="py-3 px-2 text-right font-bold uppercase">Profitable</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Unit Economics */}
        <section className="grid grid-cols-2 gap-12 pt-4">
          <div>
            <h2 className="text-xl font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest"><TrendingUp size={20} /> Acquisition Metrics</h2>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Blended CAC</span>
                <strong className="font-mono">₹12,000</strong>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Est. Lifetime Value (LTV)</span>
                <strong className="font-mono">₹45,000</strong>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">LTV : CAC Ratio</span>
                <strong className="font-mono text-green-700">3.75x</strong>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Est. Payback Period</span>
                <strong className="font-mono">4 Months</strong>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold font-sans mb-4 flex items-center gap-2 uppercase tracking-widest"><Target size={20} /> Customer ROI Profile</h2>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Avg. Cost per Prod Incident</span>
                <strong className="font-mono text-red-600">$60,000+</strong>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Cost of AgentGuard Simulation</span>
                <strong className="font-mono text-green-700">$500</strong>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Net ROI Multiplier</span>
                <strong className="font-mono text-green-700">120x</strong>
              </li>
              <li className="flex justify-between border-b border-black/10 pb-2">
                <span className="text-black/60">Simulation Run Cost (Internal)</span>
                <strong className="font-mono">$0.50 / run</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-12 text-center text-xs font-sans text-black/40 border-t border-black/10">
          AgentGuard Proprietary & Confidential • Internal Use Only • Do Not Distribute
        </div>

      </div>
    </div>
  );
}
