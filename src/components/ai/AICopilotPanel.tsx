"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  ChevronRight,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// ── Context-aware suggestions per page ────────────────────────────────────
const contextSuggestions: Record<string, { label: string; description: string }[]> = {
  "/demo": [
    { label: "Analyze my pipeline", description: "Breakdown of open deals and risk" },
    { label: "What should I focus on today?", description: "AI-prioritized daily plan" },
    { label: "Find leads in Dallas", description: "Targeted lead discovery" },
    { label: "Write a follow-up sequence", description: "Draft for cold/warm leads" },
  ],
  "/demo/leads": [
    { label: "Score all leads with AI", description: "Rank by intent and fit" },
    { label: "Segment by industry", description: "Group leads intelligently" },
    { label: "Draft cold outreach for top leads", description: "Personalized first message" },
    { label: "Find 50 roofing leads in Texas", description: "Targeted lead discovery" },
  ],
  "/demo/pipeline": [
    { label: "Why are these deals stuck?", description: "Diagnose pipeline blockers" },
    { label: "Highlight deals at risk", description: "Flag low-activity deals" },
    { label: "Suggest next actions per deal", description: "AI-recommended steps" },
    { label: "Forecast close probability", description: "Revenue prediction" },
  ],
  "/demo/contacts": [
    { label: "Summarize this contact", description: "Full AI profile brief" },
    { label: "Draft a follow-up email", description: "Context-aware outreach" },
    { label: "Suggest call talking points", description: "Prep for the next call" },
    { label: "What's the best time to reach out?", description: "Engagement timing" },
  ],
  "/demo/inbox": [
    { label: "Summarize unread threads", description: "Quick inbox digest" },
    { label: "Draft a reply to Marcus", description: "Personalized response" },
    { label: "Flag urgent messages", description: "Priority inbox sort" },
    { label: "Create follow-up tasks", description: "Turn threads into actions" },
  ],
  "/demo/automations": [
    { label: "Recommend automation for my pipeline", description: "Based on your deal stages" },
    { label: "Build a follow-up sequence", description: "Multi-step outreach flow" },
    { label: "Connect Calendly to deal stages", description: "Auto-move deals on booking" },
    { label: "Set up a lead scoring workflow", description: "Auto-qualify new leads" },
  ],
  "/demo/analytics": [
    { label: "Explain my funnel drop-off", description: "Where are leads falling out?" },
    { label: "What changed this month?", description: "Key metric shifts explained" },
    { label: "Where should I improve?", description: "AI growth recommendations" },
    { label: "Compare workspace performance", description: "Side-by-side breakdown" },
  ],
  "/demo/workspaces": [
    { label: "Create a new client workspace", description: "AI-guided setup" },
    { label: "Compare workspace performance", description: "Health and revenue view" },
    { label: "Which workspace needs attention?", description: "Risk and opportunity flags" },
    { label: "Generate workspace report", description: "Client-ready summary" },
  ],
  "/demo/tasks": [
    { label: "Prioritize my tasks today", description: "AI-ranked to-do list" },
    { label: "Generate tasks from pipeline", description: "Action items from deals" },
    { label: "Auto-create follow-ups", description: "Tasks from lead activity" },
    { label: "What's overdue?", description: "Overdue task summary" },
  ],
};

// ── Context-aware page greetings ───────────────────────────────────────────
const contextGreetings: Record<string, string> = {
  "/demo": "I can see your full pipeline, leads, and workspaces. What would you like to work on?",
  "/demo/leads": "I'm looking at your leads list. I can score, segment, or draft outreach for any of them.",
  "/demo/pipeline": "I can see 8 open deals worth $74.3k. 3 of them haven't had activity in 7+ days — want me to flag those?",
  "/demo/contacts": "I can summarize this contact, draft a message, or suggest your next step. Just ask.",
  "/demo/inbox": "You have 2 unread threads. Marcus Reid replied to your proposal — that one looks high priority.",
  "/demo/automations": "I can help you build any automation in plain English. Just describe what you want to happen.",
  "/demo/analytics": "I've analyzed your last 30 days. Lead volume is up 18%, but booked calls dropped slightly. Want the full breakdown?",
  "/demo/workspaces": "You have 5 active workspaces. Elevate Roofing is your top performer. BrightPath needs attention.",
  "/demo/tasks": "You have 8 tasks — 2 are overdue. Want me to prioritize them and generate a plan for today?",
};

// ── AI response library ────────────────────────────────────────────────────
const aiResponses: Record<string, string> = {
  "analyze my pipeline": "Your pipeline has **$74,300** across 8 open deals.\n\n**At risk:** Elevate Roofing ($24k) — no activity in 6 days. **Stuck:** BrightPath proposal ($6k) — sent 4 days ago, no reply. **Warm:** FlowState demo scheduled for tomorrow.\n\nWant me to draft follow-ups for the stuck deals?",

  "what should i focus on today": "Based on your pipeline and tasks, here's your priority list:\n\n**1.** Follow up with Marcus Reid — proposal has been open 3 days.\n**2.** Confirm Sophia Chen's demo for April 22nd.\n**3.** Re-engage 12 leads that went cold 14+ days ago.\n\nShall I draft messages for any of these?",

  "find leads in dallas": "I found **312 potential leads** in the Dallas metro area matching your ICP (home services, revenue $1M–$10M, 10–50 employees).\n\nTop matches: Pinnacle Roofing, SunBelt HVAC, Lone Star Electric. Want me to import the top 50 and start an outreach sequence?",

  "score all leads with ai": "Analyzed all 10 leads based on engagement, company fit, and intent signals.\n\n**Top priority:** Nina Kowalski (96) — replied twice, high budget. **Next:** Marcus Reid (92) — proposal open, warm. **Nurture:** Sophia Chen (74) — demo scheduled, engaged.\n\nWant me to draft personalized outreach for the top 3?",

  "why are these deals stuck": "I identified **3 deals with no activity in 7+ days:**\n\n- **Elevate Roofing** ($24k) — last touch was an unanswered email 8 days ago\n- **BrightPath** ($6k) — proposal sent, no reply in 4 days\n- **Solaris Solar** ($11k) — qualified but no follow-up scheduled\n\nWant me to draft re-engagement messages for each?",

  "summarize unread threads": "**2 unread threads:**\n\n**Marcus Reid (Apex Growth)** — Replied to your proposal. He's reviewing with his team, expects a response by Thursday. Priority: High.\n\n**Sophia Chen (TechVault)** — Confirmed the April 22nd demo and wants to add her Head of Ops.\n\nShould I draft replies for both?",

  "recommend automation for my pipeline": "Based on your pipeline, here are my top 3 recommendations:\n\n**1. Calendly → Demo Scheduled** — Move deal stage when a meeting is booked. High impact.\n**2. No reply in 5 days → Follow-up email** — Prevent deals from going cold.\n**3. Closed Won → Create workspace** — Auto-launch client onboarding.\n\nWant me to build any of these now?",

  "explain my funnel drop-off": "Your biggest drop-off is **Contacted → Replied (55% loss)**. Of 184 contacted leads, only 84 replied.\n\nLikely causes: Email timing, subject line performance, or follow-up gaps.\n\nRecommendation: Test a new subject line variant and add a Day 3 follow-up. Want me to draft both?",

  "prioritize my tasks today": "Here's your AI-ranked to-do list for today:\n\n**1. (HIGH)** Follow up with Marcus Reid — proposal pending 3 days\n**2. (HIGH)** Schedule discovery call with Sophia Chen — overdue\n**3. (MED)** Re-engage 12 cold leads with new sequence\n**4. (MED)** Review Northstar Media proposal\n\nShall I start drafting the follow-ups?",

  "create a new client workspace": "I can set up a new workspace in about 2 minutes. Tell me:\n\n- Client name and industry\n- Their target location and audience\n- Main goal (leads, calls, deals)?\n\nOr describe the client in one sentence and I'll configure everything automatically.",

  "write a follow-up sequence": "Here's a 3-step follow-up sequence I can generate for you:\n\n**Day 1:** Warm intro email referencing their business\n**Day 3:** Value-add follow-up with a relevant insight or case study\n**Day 7:** Final check-in with a low-pressure CTA\n\nWant me to personalize this for a specific lead or campaign?",

  default: "I'm analyzing your data... I'd recommend focusing on the 3 deals in the **Proposal Made** stage — those have the highest close probability this week. I also noticed 2 tasks are overdue. Want me to create a prioritized action plan for today?",
};

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export function AICopilotPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = contextSuggestions[pathname] ?? contextSuggestions["/demo"];
  const greeting = contextGreetings[pathname] ?? contextGreetings["/demo"];

  // Reset and greet when page changes while panel is open
  useEffect(() => {
    if (open) {
      setMessages([{ role: "ai", content: greeting, timestamp: new Date() }]);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize when first opened
  const handleOpen = () => {
    if (messages.length === 0) {
      setMessages([{ role: "ai", content: greeting, timestamp: new Date() }]);
    }
    setOpen(true);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    const userMsg = text.trim();
    if (!userMsg) return;
    setMessages((m) => [...m, { role: "user", content: userMsg, timestamp: new Date() }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const lc = userMsg.toLowerCase();
      const key = Object.keys(aiResponses).find((k) => k !== "default" && lc.includes(k));
      const reply = key ? aiResponses[key] : aiResponses.default;
      setMessages((m) => [...m, { role: "ai", content: reply, timestamp: new Date() }]);
      setLoading(false);
    }, 1000 + Math.random() * 500);
  };

  const renderMessage = (content: string) => {
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part.split("\n").map((line, j) => (
        <span key={j}>{line}{j < part.split("\n").length - 1 && <br />}</span>
      ))
    );
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <>
      {/* Floating button — pulse when closed */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open AI Copilot"
        >
          <span className="absolute inset-0 rounded-full bg-gray-700 animate-ping opacity-20" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-bold text-gray-900 ring-2 ring-white">
            5
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[580px] w-[380px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 bg-gray-900">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">AI Copilot</span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-600/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([{ role: "ai", content: greeting, timestamp: new Date() }]);
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                title="Clear conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
                {m.role === "ai" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500">Pipelly AI · {formatTime(m.timestamp)}</span>
                  </div>
                )}
                <div className={cn(
                  "max-w-[88%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-gray-900 text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm"
                )}>
                  {renderMessage(m.content)}
                </div>
                {m.role === "user" && (
                  <span className="mt-1 text-[10px] text-gray-400">{formatTime(m.timestamp)}</span>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">Pipelly AI · thinking...</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Context chips */}
          <div className="border-t border-gray-100 bg-white px-4 py-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <Lightbulb className="h-3 w-3 text-gray-400" />
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Suggested for this page</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.label)}
                  className="flex-shrink-0 flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 hover:border-gray-900 hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {s.label}
                  <ChevronRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-3">
            <div className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2 transition-all",
              input ? "border-gray-900 bg-white" : "border-gray-200 bg-gray-50"
            )}>
              <ArrowRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Ask Pipelly anything..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-900 text-white disabled:opacity-30 hover:bg-gray-700 transition-colors"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-400">AI responses are illustrative for demo purposes</p>
          </div>
        </div>
      )}
    </>
  );
}
