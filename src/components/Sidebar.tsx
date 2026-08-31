"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Home, Users, ShieldCheck, Bell, LogOut, Sparkles, Mail, Search, PanelLeft, Info, Download, LineChart } from "lucide-react";
import clsx from "clsx";
import { useSidebar } from "./SidebarProvider";

const ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/finance", icon: LineChart, label: "Finance Dashboard" },
  { href: "/about", icon: Info, label: "About Us" },
  { href: "/contact", icon: Mail, label: "Contact Us" },
  { href: "/download", icon: Download, label: "Download App" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  return (
    <aside 
      className={clsx(
        "hidden md:flex flex-col border-r border-border bg-[#050505] transition-all duration-300 ease-in-out shrink-0 relative",
        isOpen ? "w-[240px]" : "w-16 items-center"
      )}
    >
      {/* Brand Header */}
      <div className={clsx("flex items-center h-20", isOpen ? "px-6 gap-4" : "justify-center mt-2")}>
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-mint text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
        >
          <Zap size={20} className="fill-black" />
        </Link>
        
        {isOpen && (
          <div className="flex flex-col justify-center overflow-hidden whitespace-nowrap">
            <span className="text-white font-bold text-lg tracking-wide uppercase">AgentGuard</span>
            <span className="text-white/40 text-xs">AI Control Center</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {isOpen && (
        <div className="px-6 mb-6 mt-2">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#111] border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-mint/50 transition-colors placeholder:text-white/30"
            />
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className={clsx("flex flex-col flex-1", isOpen ? "px-4 gap-1" : "items-center gap-4 mt-8")}>
        {ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "#" && pathname.startsWith(href) && href !== "/");
          
          return (
            <Link
              key={label}
              href={href}
              title={label}
              className={clsx(
                "flex items-center transition-all duration-200 group",
                isOpen ? "px-4 py-3 rounded-xl gap-4 w-full" : "w-10 h-10 justify-center rounded-xl",
                active 
                  ? (isOpen ? "bg-white/5 text-white" : "bg-mint/15 text-mint")
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={20} className={clsx("shrink-0", active && !isOpen ? "text-mint" : (active && isOpen ? "text-white" : "text-white/60 group-hover:text-white"))} />
              {isOpen && <span className="font-medium text-[15px]">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className={clsx("mb-6 flex flex-col", isOpen ? "px-4 gap-2" : "items-center gap-4")}>
        <Link
          href="/dashboard/agents"
          title="Run demo"
          className={clsx(
            "flex items-center transition-all duration-200 text-violet hover:bg-white/5 group",
            isOpen ? "px-4 py-3 rounded-xl gap-4 w-full" : "w-10 h-10 justify-center rounded-xl"
          )}
        >
          <Sparkles size={20} className="shrink-0" />
          {isOpen && <span className="font-medium text-[15px]">Run Demo</span>}
        </Link>
        
        <Link 
          href="/" 
          title="Exit dashboard" 
          className={clsx(
            "flex items-center transition-all duration-200 text-white/50 hover:text-rose hover:bg-white/5 group",
            isOpen ? "px-4 py-3 rounded-xl gap-4 w-full" : "w-10 h-10 justify-center rounded-xl"
          )}
        >
          <LogOut size={20} className="shrink-0 group-hover:text-rose" />
          {isOpen && <span className="font-medium text-[15px]">Exit</span>}
        </Link>
      </div>
    </aside>
  );
}
