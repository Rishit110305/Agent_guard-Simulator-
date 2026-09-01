import { BarChart2, LayoutDashboard, Users, Shield, Puzzle, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: BarChart2,
    title: "Analytics",
    desc: "Track user behavior",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "Centralized data view",
    colSpan: "col-span-12 md:col-span-3",
    rowSpan: "row-span-1",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Work together seamlessly",
    colSpan: "col-span-12 md:col-span-5",
    rowSpan: "row-span-2",
    isLarge: true,
  },
  {
    icon: Shield,
    title: "Efficiency",
    desc: "Optimized pipelines",
    colSpan: "col-span-12 md:col-span-7",
    rowSpan: "row-span-1",
    isLarge: true,
  },
  {
    icon: Puzzle,
    title: "Connectivity",
    desc: "Integrate APIs quickly",
    colSpan: "col-span-12 md:col-span-3",
    rowSpan: "row-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Protection",
    desc: "Enterprise grade security",
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
  }
];

export default function FeaturesGrid() {
  return (
    <section className="bg-white py-24 rounded-t-[40px] -mt-6 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">What We Offer To The World!</h2>
          <p className="mt-4 text-mint font-medium max-w-2xl mx-auto leading-relaxed">
            Startup Framework gives you complete freedom over your creative process — you don't have to think about any technical aspects. There are no limits and absolutely no coding.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-[220px]">
          {FEATURES.map((f, i) => (
            <div key={i} className={`bg-[#0a0a0a] rounded-3xl p-8 flex flex-col justify-between ${f.colSpan} ${f.rowSpan} group hover:shadow-[0_0_40px_rgba(52,224,161,0.15)] transition-all duration-300 relative overflow-hidden`}>
              {f.isLarge && (
                <div className="absolute inset-0 bg-gradient-to-br from-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <div className="flex items-center gap-3 relative z-10">
                <f.icon className="text-mint" size={24} />
                <span className="text-mint font-medium">{f.title}</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-white text-lg font-semibold mb-1">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
