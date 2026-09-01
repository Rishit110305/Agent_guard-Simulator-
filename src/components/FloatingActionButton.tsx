"use client";

import { useState } from "react";
import { Zap, MessageSquareText } from "lucide-react";
import ChatbotPanel from "./ChatbotPanel";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AgentGuard AI Assistant"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-mint text-black flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:scale-105 transition-transform"
      >
        {isOpen ? <MessageSquareText size={22} className="text-black" /> : <Zap size={22} fill="black" />}
      </button>

      <ChatbotPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
