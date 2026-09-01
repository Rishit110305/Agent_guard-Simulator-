"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { useChatbot } from "@/hooks/useChatbot";

interface ChatbotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What is AgentGuard?",
  "Explain the 6 modules",
  "How is an agent evaluated?",
  "What is the learning loop?",
];

export default function ChatbotPanel({ isOpen, onClose }: ChatbotPanelProps) {
  const { messages, input, setInput, isLoading, error, sendMessage } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && input.trim()) {
      sendMessage(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 z-50 w-[380px] sm:w-[420px] h-[600px] max-h-[80vh] flex flex-col bg-[#050505] border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center border border-mint/20">
                <Bot size={18} className="text-mint" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-[15px] tracking-tight leading-tight">AGENTGUARD AI</h3>
                <p className="text-white/50 text-[11px] uppercase tracking-wider">System Assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-transparent to-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-mint/10 flex items-center justify-center border border-mint/20 shrink-0 mt-1">
                    <Bot size={12} className="text-mint" />
                  </div>
                )}
                <div
                  className={`relative max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-mint text-black rounded-tr-sm"
                      : "bg-[#111] text-white/90 border border-white/5 rounded-tl-sm shadow-inner"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0 mt-1">
                    <User size={12} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Suggested Questions (only show if it's just the initial welcome message) */}
            {messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-4 ml-9">
                <p className="text-xs text-white/40 mb-1">Suggested questions:</p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/80 text-[13px] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start gap-3">
                <div className="w-6 h-6 rounded-full bg-mint/10 flex items-center justify-center border border-mint/20 shrink-0 mt-1">
                  <Bot size={12} className="text-mint" />
                </div>
                <div className="bg-[#111] text-white/60 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-[13px] bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/60 border-t border-white/5 backdrop-blur-md shrink-0">
            <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden focus-within:border-mint/50 focus-within:shadow-[0_0_15px_rgba(74,222,128,0.1)] transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AgentGuard..."
                className="w-full bg-transparent text-white placeholder-white/30 px-4 py-3 outline-none resize-none min-h-[44px] max-h-[120px] text-[14px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="mb-1.5 mr-1.5 p-2 rounded-lg bg-mint text-black disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 transition-colors flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-white/30">Press Enter to send, Shift+Enter for new line</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
