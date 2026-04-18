"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const contextSuggestions: Record<string, string[]> = {
  "/demo": ["Analyze my pipeline", "What should I focus on today?", "Find leads in Dallas"],
  "/demo/leads": ["Score all leads with AI", "Segment by industry", "Draft cold outreach for top leads"],
  "/demo/pipeline": ["Why are these deals stuck?", "Highlight deals at risk", "Suggest next actions"],
  "/demo/contacts": ["Summarize this contact", "Draft a follow-up email", "Suggest call talking points"],
  "/demo/inbox": ["Summarize unread threads", "Draft a reply to Marcus", "Flag urgent messages"],
  "/demo/automations": ["Recommend automation for my pipeline", "Build a follow-up sequence", "Connect Calendly to deals"],
  "/demo/analytics": ["Explain my funnel drop-off", "What changed this month?", "Where should I improve?"],
  "/demo/workspaces": ["Create a new client workspace", "Compare workspace performance", "Which workspace needs attention?"],
  "/demo/tasks": ["Prioritize my tasks today", "Generate tasks from pipeline", "Auto-create follow-ups"],
};

interface Message {
  role: "user" | "ai";
  content: string;
}

const aiResponses: Record<string, string> = {
  default: "I'm analyzing your pipeline and data... Based on current signals, I'd recommend focusing on the 3 deals in the Proposal Made stage — those have the highest close probability this week. Want me to draft follow-up messages for each?",
  "analyze my pipeline": "Your pipeline currently has **$74,300** in open deals across 8 active opportunities. 🔴 **At risk**: Elevate Roofing deal ($24k) — no activity in 6 days. 🟡 **Stuck**: BrightPath proposal ($6k) sent 4 days ago, no reply. 🟢 **Warm**: FlowState demo scheduled for tomorrow. Want me to draft outreach for the stuck deals?",
  "score all leads with ai": "I've analyzed all 10 leads based on engagement, company size, and intent signals. **Top 3 to prioritize**: Nina Kowalski (96), Marcus Reid (92), Amara Osei (85). I recommend starting outreach with these high-scorers today. Want me to draft personalized messages?",
  "summarize unread threads": "You have **2 unread threads**. 📌 Marcus Reid (Apex Growth) replied to your proposal — he's reviewing with his team. ⭐ Priority. 📌 Sophia Chen confirmed the demo for April 22nd and wants to include her Head of Ops. Should I send calendar details to both?",
};

export function AICopilotPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi Jordan! I'm your Pipelly AI copilot. I can help you find leads, analyze your pipeline, draft outreach, and more. What would you like to do?" },
  ]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = contextSuggestions[pathname] ?? contextSuggestions["/demo"];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    const userMsg = text.trim();
    if (!userMsg) return;
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const key = Object.keys(aiResponses).find((k) => userMsg.toLowerCase().includes(k));
      const reply = key ? aiResponses[key] : aiResponses.default;
      setMessages((m) => [...m, { role: "ai", content: reply }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[360px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-gray-900">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">AI Copilot</span>
              <span className="rounded-full bg-emerald-400 px-1.5 py-0.5 text-[9px] font-bold text-gray-900">LIVE</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMessages([{ role: "ai", content: "Conversation cleared. How can I help you?" }])} className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setOpen(false)} className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed", m.role === "user" ? "bg-gray-900 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm")}>
                  {m.content.split("**").map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-xl bg-gray-100 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="border-t border-gray-100 px-4 py-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="flex-shrink-0 flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  {s}
                  <ChevronRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-gray-900 focus-within:bg-white transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask Pipelly anything..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button onClick={() => send(input)} disabled={!input.trim() || loading} className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-900 text-white disabled:opacity-40 hover:bg-gray-700 transition-colors">
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
