"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Activity, DollarSign, Target, CreditCard, ShieldCheck, ArrowUpRight, Zap, Briefcase } from "lucide-react";
import clsx from "clsx";

// Theme Colors
const COLORS = ['#8b7cf6', '#34e0a1', '#f5a623', '#3b82f6'];

// Dummy data scaling up towards Y3 projections
const initialGrowthData = [
  { month: 'Jan', revenue: 12000, cost: 2160 },
  { month: 'Feb', revenue: 15000, cost: 2700 },
  { month: 'Mar', revenue: 22000, cost: 3960 },
  { month: 'Apr', revenue: 34000, cost: 6120 },
  { month: 'May', revenue: 48000, cost: 8640 },
  { month: 'Jun', revenue: 65000, cost: 11700 },
  { month: 'Jul', revenue: 89000, cost: 16020 },
];

const roiData = [
  { name: 'Prevention (AgentGuard)', value: 500, color: '#34e0a1' },
  { name: 'Production Incident', value: 60000, color: '#ef4444' }
];

export default function FinanceDashboard() {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState(initialGrowthData);
  const [liveTokenBurn, setLiveTokenBurn] = useState(14.52);
  const [totalSimulations, setTotalSimulations] = useState(1420);
  
  useEffect(() => {
    setMounted(true);
    
    // Simulate live token burn and simulation counter
    const interval = setInterval(() => {
      setLiveTokenBurn(prev => prev + (Math.random() * 0.05));
      if (Math.random() > 0.7) {
        setTotalSimulations(prev => prev + 1);
      }
    }, 800);
    
    // Simulate live revenue ticking up slowly
    const chartInterval = setInterval(() => {
      setChartData(current => {
        const newData = [...current];
        const last = newData[newData.length - 1];
        newData[newData.length - 1] = {
          ...last,
          revenue: last.revenue + Math.floor(Math.random() * 50),
          cost: last.cost + Math.floor(Math.random() * 9)
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
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Financial Projections <div className="px-3 py-1 rounded-full bg-violet/20 text-violet text-xs font-bold uppercase tracking-widest border border-violet/30">Confidential</div>
          </h1>
          <p className="text-white/50 mt-1">Unit economics, market opportunity, and platform operational costs.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10">Download Report</button>
          <button className="px-4 py-2 bg-mint hover:bg-mint/90 text-black rounded-lg text-sm font-bold transition-colors">Export CSV</button>
        </div>
      </div>

      {/* Top 4 KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Widget 
          title="Total Addressable Market" 
          value="$4.2B" 
          subValue="Agent testing & eval market" 
          trend="+430% YoY" 
          icon={Target} 
          accent="#8b7cf6" 
        />
        <Widget 
          title="Projected ARR (Year 3)" 
          value="₹51.8 Cr" 
          subValue="2,400 Enterprise Customers" 
          trend="83% Margin" 
          icon={TrendingUp} 
          accent="#34e0a1" 
        />
        <Widget 
          title="LTV : CAC Ratio" 
          value="3.75x" 
          subValue="₹45K LTV vs ₹12K CAC" 
          trend="4mo Payback" 
          icon={Activity} 
          accent="#f5a623" 
        />
        <div className="bg-gradient-to-br from-[#0f0f13] to-[#0a0a0c] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none group-hover:bg-blue-500/20 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20"><CreditCard size={20} /></div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded-full"><Activity size={12} className="animate-pulse" /> LIVE BURN</div>
          </div>
          <div className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-1">API Token Cost</div>
          <div className="text-3xl font-bold text-white font-mono">${liveTokenBurn.toFixed(4)}</div>
          <div className="text-xs text-white/40 mt-2 font-mono">{totalSimulations.toLocaleString()} simulations run</div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Spline Chart */}
        <div className="lg:col-span-2 bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-violet/5 blur-[100px] pointer-events-none" />
           <div className="flex justify-between items-end mb-6 relative z-10">
             <div>
               <h3 className="text-lg font-semibold text-white">Revenue vs Compute (82% Gross Margin)</h3>
               <p className="text-white/50 text-sm">Monthly recurring revenue compared to OpenAI/AWS infrastructure costs.</p>
             </div>
             <div className="flex items-center gap-4 text-xs font-medium">
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-mint" /> MRR</div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-violet" /> Compute Cost</div>
             </div>
           </div>
           
           <div className="h-[300px] w-full relative z-10">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#34e0a1" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#34e0a1" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#8b7cf6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#8b7cf6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                 <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '12px', color: '#fff' }}
                   itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                 />
                 <Area type="monotone" dataKey="revenue" stroke="#34e0a1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                 <Area type="monotone" dataKey="cost" stroke="#8b7cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Breakdown / ROI Calculator */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">120x ROI Multiplier</h3>
            <p className="text-white/50 text-sm mb-6">Cost of production failure vs AgentGuard.</p>
            
            <div className="h-[200px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roiData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {roiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => `$${value.toLocaleString()}`}
                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm text-white/80">Avg. Prod Incident</span>
              </div>
              <span className="font-bold text-red-400">$60,000+</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-mint/10 border border-mint/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-mint" />
                <span className="text-sm text-white/80">AgentGuard Run</span>
              </div>
              <span className="font-bold text-mint">$500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing / Competitor Analysis Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-mint" size={20} />
            <h3 className="font-semibold text-white">Target Segments</h3>
          </div>
          <div className="space-y-4">
            <SegmentRow name="Dev (Free)" detail="50 runs/mo" rev="PLG Wedge" />
            <SegmentRow name="Growth" detail="1,000 runs/mo" rev="₹4,999/mo" />
            <SegmentRow name="Team" detail="5,000 runs/mo" rev="₹14,999/mo" />
            <SegmentRow name="Enterprise" detail="Unlimited (On-Prem)" rev="Custom" />
          </div>
        </div>

        <div className="md:col-span-2 bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl overflow-x-auto">
          <h3 className="font-semibold text-white mb-4">Competitor Cost & Feature Matrix</h3>
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-widest">
                <th className="pb-3 font-medium">Platform</th>
                <th className="pb-3 font-medium">Auto-Eval</th>
                <th className="pb-3 font-medium">Learning Loop</th>
                <th className="pb-3 font-medium">Pre-Deploy</th>
                <th className="pb-3 font-medium text-right">Effective Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="text-white/80 hover:bg-white/5 transition-colors">
                <td className="py-4 font-medium flex items-center gap-2">LangSmith</td>
                <td className="py-4 text-rose-400">Manual</td>
                <td className="py-4 text-rose-400">None</td>
                <td className="py-4 text-rose-400">Post-deploy only</td>
                <td className="py-4 text-right font-mono text-white/50">High (Token + Seat)</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5 transition-colors">
                <td className="py-4 font-medium">Promptfoo</td>
                <td className="py-4 text-yellow-400">Partial</td>
                <td className="py-4 text-rose-400">None</td>
                <td className="py-4 text-yellow-400">Partial</td>
                <td className="py-4 text-right font-mono text-white/50">Mid</td>
              </tr>
              <tr className="text-white/80 hover:bg-white/5 transition-colors">
                <td className="py-4 font-medium">Galileo AI</td>
                <td className="py-4 text-yellow-400">Partial</td>
                <td className="py-4 text-rose-400">None</td>
                <td className="py-4 text-yellow-400">Partial</td>
                <td className="py-4 text-right font-mono text-white/50">High (Enterprise)</td>
              </tr>
              <tr className="bg-mint/5 border-l-2 border-mint">
                <td className="py-4 pl-3 font-bold text-mint flex items-center gap-2"><Zap size={14} /> AgentGuard</td>
                <td className="py-4 text-white font-medium">Full 360°</td>
                <td className="py-4 text-white font-medium">Autonomous</td>
                <td className="py-4 text-white font-medium">Full CI/CD</td>
                <td className="py-4 text-right font-mono font-bold text-mint">$0.50 / Run</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function Widget({ title, value, subValue, trend, icon: Icon, accent }: any) {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-[40px] pointer-events-none group-hover:opacity-20 transition-opacity" style={{ background: accent }} />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}>
          <Icon size={20} />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border" style={{ color: accent, background: `${accent}10`, borderColor: `${accent}20` }}>
          <ArrowUpRight size={14} /> {trend}
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-1">{title}</div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-white/40">{subValue}</div>
      </div>
    </div>
  );
}

function SegmentRow({ name, detail, rev }: { name: string, detail: string, rev: string }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
      <div>
        <div className="text-white font-medium text-sm">{name}</div>
        <div className="text-white/40 text-xs">{detail}</div>
      </div>
      <div className="text-mint font-semibold text-sm">{rev}</div>
    </div>
  );
}
