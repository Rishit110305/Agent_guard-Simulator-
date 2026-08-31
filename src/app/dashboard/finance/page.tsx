"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend } from "recharts";
import { TrendingUp, Activity, Target, ShieldCheck, ArrowUpRight, Zap, Briefcase, FileText, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const initialGrowthData = [
  { month: 'Jan', mrr: 12000, opex: 2160 },
  { month: 'Feb', mrr: 15000, opex: 2700 },
  { month: 'Mar', mrr: 22000, opex: 3960 },
  { month: 'Apr', mrr: 34000, opex: 6120 },
  { month: 'May', mrr: 48000, opex: 8640 },
  { month: 'Jun', mrr: 65000, opex: 11700 },
  { month: 'Jul', mrr: 89000, opex: 16020 },
];

const opexBreakdown = [
  { name: 'LLM Inference (API)', value: 45 },
  { name: 'Redis / Infrastructure', value: 25 },
  { name: 'R&D / Team', value: 20 },
  { name: 'Marketing / CAC', value: 10 }
];

export default function FinanceDashboard() {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState(initialGrowthData);
  const [liveTokenBurn, setLiveTokenBurn] = useState(14.521);
  const [totalSimulations, setTotalSimulations] = useState(1420);
  
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setLiveTokenBurn(prev => prev + (Math.random() * 0.005));
      if (Math.random() > 0.8) setTotalSimulations(prev => prev + 1);
    }, 1000);
    
    const chartInterval = setInterval(() => {
      setChartData(current => {
        const newData = [...current];
        const last = newData[newData.length - 1];
        newData[newData.length - 1] = {
          ...last,
          mrr: last.mrr + Math.floor(Math.random() * 50),
          opex: last.opex + Math.floor(Math.random() * 9)
        };
        return newData;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(chartInterval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 font-sans pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center gap-3">
            Financial & Accounting Overview
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono tracking-widest uppercase">Internal Use Only</div>
          </h1>
          <p className="text-white/50 mt-2 text-sm">Unit economics, OPEX breakdown, and projected P&L statement.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/finance/report" className="px-5 py-2.5 bg-mint hover:bg-mint/90 text-black rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(52,224,161,0.2)]">
            <FileText size={16} /> Generate Financial Report
          </Link>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Addressable Market" value="$4.2B" sub="India + SEA Beachhead → US/EU" trend="+430% YoY" positive />
        <MetricCard title="Projected ARR (Year 3)" value="₹5.18Cr" sub="2,400 Enterprise Customers" trend="83% Margin" positive />
        <MetricCard title="LTV to CAC Ratio" value="3.75x" sub="₹45K LTV vs ₹12K CAC" trend="4 Mo Payback" positive />
        
        {/* Live OPEX Tracker */}
        <div className="bg-black border border-white/10 rounded-xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="flex justify-between items-start mb-2 relative z-10">
            <div className="text-sm font-medium text-white/50 uppercase tracking-wider">Live API Burn</div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-400 border border-rose-400/20 px-2 py-0.5 rounded bg-rose-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" /> LIVE
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-mono text-white tracking-tight">${liveTokenBurn.toFixed(3)}</div>
            <div className="text-xs text-white/40 mt-1 font-mono">{totalSimulations.toLocaleString()} active simulation runs</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MRR vs OPEX Spline Chart */}
        <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-6 shadow-xl">
           <div className="flex justify-between items-end mb-6">
             <div>
               <h3 className="text-base font-semibold text-white">MRR vs OPEX Scale</h3>
               <p className="text-white/50 text-xs mt-1">Monthly recurring revenue compared to infrastructure costs.</p>
             </div>
             <div className="flex items-center gap-4 text-[11px] font-mono text-white/60 uppercase tracking-widest">
               <div className="flex items-center gap-2"><div className="w-2 h-2 bg-mint" /> MRR</div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 bg-violet/80" /> OPEX</div>
             </div>
           </div>
           
           <div className="h-[280px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#34e0a1" stopOpacity={0.15}/>
                     <stop offset="95%" stopColor="#34e0a1" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorOpex" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8b7cf6" stopOpacity={0.15}/>
                     <stop offset="95%" stopColor="#8b7cf6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                 <XAxis dataKey="month" stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                 <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }} />
                 <Area type="monotone" dataKey="mrr" stroke="#34e0a1" strokeWidth={2} fillOpacity={1} fill="url(#colorMrr)" />
                 <Area type="monotone" dataKey="opex" stroke="#8b7cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorOpex)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-black border border-white/10 rounded-xl p-6 flex flex-col shadow-xl">
          <h3 className="text-base font-semibold text-white mb-1">OPEX Distribution</h3>
          <p className="text-white/50 text-xs mb-6">Percentage allocation of operating expenses.</p>
          
          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={opexBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  <Cell fill="#8b7cf6" />
                  <Cell fill="#34e0a1" />
                  <Cell fill="#f5a623" />
                  <Cell fill="#3b82f6" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }} formatter={(val: any) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 mt-4">
            {opexBreakdown.map((item, i) => (
              <div key={item.name} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#8b7cf6', '#34e0a1', '#f5a623', '#3b82f6'][i] }} />
                  <span className="text-white/70">{item.name}</span>
                </div>
                <span className="font-mono text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Matrix & Pricing Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pricing Tiers */}
        <div className="bg-black border border-white/10 rounded-xl p-0 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 bg-white/[0.02]">
            <h3 className="font-semibold text-white flex items-center gap-2"><Briefcase size={16} className="text-mint" /> GTM Target Segments</h3>
            <p className="text-white/50 text-xs mt-1">Tiered pricing architecture and segment distribution.</p>
          </div>
          <div className="p-5 space-y-5">
            <PricingRow name="Dev (Free)" detail="50 runs/mo · Individual builders" rev="PLG Wedge" />
            <PricingRow name="Growth" detail="1,000 runs/mo · Startups" rev="₹4,999/mo" />
            <PricingRow name="Team" detail="5,000 runs/mo · ML teams" rev="₹14,999/mo" />
            <PricingRow name="Enterprise" detail="Unlimited · Regulated AI" rev="Custom" />
          </div>
        </div>

        {/* Competitor Matrix */}
        <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-0 overflow-hidden shadow-xl overflow-x-auto">
          <div className="p-5 border-b border-white/10 bg-white/[0.02]">
            <h3 className="font-semibold text-white flex items-center gap-2"><Target size={16} className="text-mint" /> Competitor Cost & Feature Matrix</h3>
            <p className="text-white/50 text-xs mt-1">We certify agents safe before they deploy, others just observe.</p>
          </div>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/[0.01] border-b border-white/10">
              <tr className="text-white/50 text-[11px] uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Pre-Deploy Eval</th>
                <th className="px-6 py-4 font-medium">Auto Learning Loop</th>
                <th className="px-6 py-4 font-medium text-right">Effective Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <tr className="text-white/80 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium">LangSmith</td>
                <td className="px-6 py-4 flex items-center gap-2 text-rose-400"><XCircle size={14} /> Post-deploy only</td>
                <td className="px-6 py-4 text-rose-400">None</td>
                <td className="px-6 py-4 text-right font-mono text-white/50">High (Token + Seat)</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium">Promptfoo</td>
                <td className="px-6 py-4 flex items-center gap-2 text-yellow-400"><Target size={14} /> Prompts only</td>
                <td className="px-6 py-4 text-rose-400">None</td>
                <td className="px-6 py-4 text-right font-mono text-white/50">Mid</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium">Galileo AI</td>
                <td className="px-6 py-4 flex items-center gap-2 text-yellow-400"><Target size={14} /> 1 failure mode</td>
                <td className="px-6 py-4 text-rose-400">None</td>
                <td className="px-6 py-4 text-right font-mono text-white/50">High (Enterprise)</td>
              </tr>
              <tr className="bg-mint/5 border-l-2 border-mint">
                <td className="px-6 py-4 font-bold text-mint flex items-center gap-2"><Zap size={16} /> AgentGuard</td>
                <td className="px-6 py-4 text-mint font-medium flex items-center gap-2"><CheckCircle2 size={16} /> Full 360° Simulation</td>
                <td className="px-6 py-4 text-mint font-medium flex items-center gap-2"><CheckCircle2 size={16} /> Autonomous</td>
                <td className="px-6 py-4 text-right font-mono font-bold text-mint">$0.50 / Run</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accounting Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black border border-white/10 rounded-xl p-0 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 bg-white/[0.02]">
            <h3 className="font-semibold text-white">Projected P&L Summary</h3>
            <p className="text-white/50 text-xs mt-1">3-Year financial projection summary (INR).</p>
          </div>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/[0.01] border-b border-white/10">
              <tr className="text-white/50 text-[11px] uppercase tracking-widest">
                <th className="px-5 py-4 font-medium">Metric</th>
                <th className="px-5 py-4 font-medium text-right">Year 1</th>
                <th className="px-5 py-4 font-medium text-right">Year 2</th>
                <th className="px-5 py-4 font-medium text-right text-mint">Year 3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium">Customers</td>
                <td className="px-5 py-3 text-right font-mono">120</td>
                <td className="px-5 py-3 text-right font-mono">680</td>
                <td className="px-5 py-3 text-right font-mono text-mint">2,400</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium">ARR (Revenue)</td>
                <td className="px-5 py-3 text-right font-mono text-white/50">₹54.7L</td>
                <td className="px-5 py-3 text-right font-mono text-white/50">₹669L</td>
                <td className="px-5 py-3 text-right font-mono text-mint">₹5,184L</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium">Gross Margin</td>
                <td className="px-5 py-3 text-right font-mono">72%</td>
                <td className="px-5 py-3 text-right font-mono">79%</td>
                <td className="px-5 py-3 text-right font-mono text-mint">83%</td>
              </tr>
              <tr className="text-white hover:bg-white/5 border-t border-white/20 bg-white/[0.01]">
                <td className="px-5 py-4 font-medium">Net Status</td>
                <td className="px-5 py-4 text-right text-[11px] font-bold tracking-wider text-rose-400">BURN</td>
                <td className="px-5 py-4 text-right text-[11px] font-bold tracking-wider text-yellow-400">BREAKEVEN</td>
                <td className="px-5 py-4 text-right text-[11px] font-bold tracking-wider text-mint uppercase">Profitable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-black border border-white/10 rounded-xl p-0 overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 bg-white/[0.02]">
            <h3 className="font-semibold text-white">Unit Economics & Incident ROI</h3>
            <p className="text-white/50 text-xs mt-1">Cost of prevention vs production failure.</p>
          </div>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/[0.01] border-b border-white/10">
              <tr className="text-white/50 text-[11px] uppercase tracking-widest">
                <th className="px-5 py-4 font-medium">Metric</th>
                <th className="px-5 py-4 font-medium text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium">Customer Acquisition Cost (CAC)</td>
                <td className="px-5 py-3 text-right font-mono text-rose-400">₹12,000</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium">Lifetime Value (LTV)</td>
                <td className="px-5 py-3 text-right font-mono text-mint">₹45,000</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5 bg-white/[0.01] border-y border-white/5">
                <td className="px-5 py-3 font-medium text-white/50">—</td>
                <td className="px-5 py-3 text-right font-mono text-white/50">—</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium flex items-center gap-2"><div className="w-2 h-2 bg-rose-400 rounded-full"/> Avg Prod Failure Incident</td>
                <td className="px-5 py-3 text-right font-mono text-rose-400">$60,000+</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5">
                <td className="px-5 py-3 font-medium flex items-center gap-2"><div className="w-2 h-2 bg-mint rounded-full"/> AgentGuard Prevention Cost</td>
                <td className="px-5 py-3 text-right font-mono text-mint">$500</td>
              </tr>
              <tr className="text-white hover:bg-white/5 border-t border-white/20 bg-mint/5">
                <td className="px-5 py-4 font-medium">Implied ROI (Every run)</td>
                <td className="px-5 py-4 text-right font-bold text-mint">120×</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ title, value, sub, trend, positive }: any) {
  return (
    <div className="bg-black border border-white/10 rounded-xl p-5 flex flex-col justify-between shadow-xl">
      <div className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">{title}</div>
      <div className="flex items-baseline gap-3 mb-1">
        <div className="text-3xl font-mono text-white tracking-tight">{value}</div>
        <div className={clsx("text-xs font-semibold px-2 py-0.5 rounded", positive ? "text-mint bg-mint/10 border border-mint/20" : "text-rose-400 bg-rose-400/10 border border-rose-400/20")}>
          {trend}
        </div>
      </div>
      <div className="text-xs text-white/40">{sub}</div>
    </div>
  );
}

function PricingRow({ name, detail, rev }: { name: string, detail: string, rev: string }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
      <div>
        <div className="text-white font-medium text-sm">{name}</div>
        <div className="text-white/40 text-xs mt-0.5">{detail}</div>
      </div>
      <div className="text-mint font-semibold font-mono text-sm">{rev}</div>
    </div>
  );
}
