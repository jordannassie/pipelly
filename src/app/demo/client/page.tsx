"use client";

import { useState, useEffect } from "react";
import {
  Sparkles, Send, TrendingUp, TrendingDown, Phone, FileText,
  CheckCircle2, Clock, X, AlertCircle, Users2, Briefcase,
  MessageSquare, ChevronRight,
} from "lucide-react";
import { mockLiteKPIs, mockLiteTasks, mockLiteLeads } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAICopilot, detectCardType, type AICardType } from "@/lib/ai-copilot-context";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  "new":        { label: "New",        color: "bg-blue-50 text-blue-700" },
  "contacted":  { label: "Contacted",  color: "bg-amber-50 text-amber-700" },
  "quote-sent": { label: "Quote Sent", color: "bg-violet-50 text-violet-700" },
  "booked":     { label: "Booked",     color: "bg-emerald-50 text-emerald-700" },
  "closed":     { label: "Closed",     color: "bg-gray-100 text-gray-500" },
};

const URGENCY_COLOR: Record<string, string> = {
  high: "bg-red-50 border-red-100", medium: "bg-amber-50 border-amber-100", low: "bg-gray-50 border-gray-100",
};

const URGENCY_DOT: Record<string, string> = {
  high: "bg-red-400", medium: "bg-amber-400", low: "bg-gray-300",
};

// ─────────────────────────────────────────────────────────────────────────────
// RESULT SHELL
// ─────────────────────────────────────────────────────────────────────────────

function ResultShell({
  title, icon: Icon, onDismiss, children,
}: {
  title: string; icon: React.ElementType; onDismiss: () => void; children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">{title}</span>
          <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> AI Result
          </span>
        </div>
        <button onClick={onDismiss} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE RESULT CARDS
// ─────────────────────────────────────────────────────────────────────────────

function InlineFollowUpResult({ onDismiss }: { onDismiss: () => void }) {
  const followups = [
    { name: "Jessica Kim",   service: "Roof Replacement",    reason: "Quote sent 3 days ago — no reply",   action: "Follow up on quote", urgency: "high" },
    { name: "Ray Dominguez", service: "Gutter Replacement",  reason: "Quote sent 5 days ago — no reply",   action: "Follow up on quote", urgency: "high" },
    { name: "Sarah Johnson", service: "Storm Damage Repair", reason: "Spoke 2 days ago — estimate pending", action: "Schedule estimate",   urgency: "medium" },
    { name: "Carol Stevens", service: "Skylight Install",    reason: "Quote sent 5 days ago — no reply",   action: "Send reminder",       urgency: "medium" },
  ];
  return (
    <ResultShell title="Follow-Ups Needed Today" icon={Clock} onDismiss={onDismiss}>
      <p className="text-sm text-gray-500 mb-4">AI found 4 leads that need attention today.</p>
      <div className="space-y-2.5">
        {followups.map((f) => (
          <div key={f.name} className={cn("flex items-center gap-4 rounded-xl border px-4 py-3", URGENCY_COLOR[f.urgency])}>
            <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", URGENCY_DOT[f.urgency])} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{f.name}</p>
              <p className="text-xs text-gray-500 truncate">{f.reason}</p>
            </div>
            <button className="shrink-0 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
              {f.action}
            </button>
          </div>
        ))}
      </div>
    </ResultShell>
  );
}

function InlineOutreachResult({ onDismiss }: { onDismiss: () => void }) {
  const [copied, setCopied] = useState(false);
  const draft = `Hi Jessica! Just following up on the roofing estimate I sent over a few days ago. Happy to answer any questions or walk you through what's included. Are you free for a quick call this week?`;
  return (
    <ResultShell title="AI Text Draft — Jessica Kim" icon={MessageSquare} onDismiss={onDismiss}>
      <p className="text-xs text-gray-400 mb-3">Quote follow-up · Roof Replacement · $11,000</p>
      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-800 leading-relaxed mb-4">{draft}</div>
      <div className="flex gap-2">
        <button
          onClick={() => { navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
        >
          {copied ? <><CheckCircle2 className="h-4 w-4" /> Copied!</> : <><Phone className="h-4 w-4" /> Copy &amp; Send</>}
        </button>
        <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors">Edit</button>
      </div>
    </ResultShell>
  );
}

function InlineHotLeadsResult({ onDismiss }: { onDismiss: () => void }) {
  const hot = [
    { name: "Tom Nguyen",    service: "Full Roof Replace",   status: "booked",     score: "Hot" },
    { name: "Jessica Kim",   service: "Roof Replacement",    status: "quote-sent", score: "Hot" },
    { name: "Mike Torres",   service: "Leak Repair",         status: "contacted",  score: "Warm" },
    { name: "Sarah Johnson", service: "Storm Damage Repair", status: "contacted",  score: "Warm" },
  ];
  return (
    <ResultShell title="Your Hottest Leads" icon={Users2} onDismiss={onDismiss}>
      <p className="text-sm text-gray-500 mb-4">AI ranked leads by urgency and engagement.</p>
      <div className="space-y-2">
        {hot.map((l) => (
          <div key={l.name} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700 shrink-0">
              {l.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{l.name}</p>
              <p className="text-xs text-gray-500">{l.service}</p>
            </div>
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold",
              l.score === "Hot" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
            )}>{l.score}</span>
          </div>
        ))}
      </div>
    </ResultShell>
  );
}

function InlineJobsResult({ onDismiss }: { onDismiss: () => void }) {
  const waiting = [
    { customer: "Angela Brooks",  service: "Flat Roof Repair",    action: "Confirm materials", stage: "Booked" },
    { customer: "Frank Osei",     service: "Storm Damage Repair", action: "Collect payment",   stage: "Job Done" },
    { customer: "Maria Castillo", service: "Gutter Cleaning",     action: "Send invoice",      stage: "Job Done" },
  ];
  return (
    <ResultShell title="Jobs Waiting on You" icon={Briefcase} onDismiss={onDismiss}>
      <p className="text-sm text-gray-500 mb-4">These 3 jobs have open actions that need your attention.</p>
      <div className="space-y-2.5">
        {waiting.map((j) => (
          <div key={j.customer} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <FileText className="h-5 w-5 text-gray-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{j.customer}</p>
              <p className="text-xs text-gray-500">{j.service} · {j.stage}</p>
            </div>
            <span className="text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-1.5">{j.action}</span>
          </div>
        ))}
      </div>
    </ResultShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROMPT CHIPS
// ─────────────────────────────────────────────────────────────────────────────

const CLIENT_CHIPS = [
  { label: "Who needs a follow-up?",       action: "tasks"    as AICardType },
  { label: "Write a reply for a lead",     action: "outreach" as AICardType },
  { label: "Show my hottest leads",        action: "contact"  as AICardType },
  { label: "What jobs are waiting on me?", action: "pipeline" as AICardType },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ClientHomePage() {
  const { setMode } = useDashboardMode();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<AICardType | null>(null);
  const [tasks, setTasks] = useState(mockLiteTasks);
  const { openWithQuery } = useAICopilot();

  // Ensure mode is synced
  useEffect(() => { setMode("client"); }, [setMode]);

  const handleSend = (query: string = input) => {
    if (!query.trim()) return;
    const cardType = detectCardType(query);
    if (cardType && ["tasks","outreach","contact","pipeline"].includes(cardType)) {
      setActiveResult(cardType); setLoading(true); setTimeout(() => setLoading(false), 900);
    } else {
      openWithQuery(query);
    }
    setInput("");
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{greeting}, Jordan.</h1>
          <p className="text-base text-gray-500">Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        {/* AI Input */}
        <div className="mb-10">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden focus-within:border-gray-400 focus-within:shadow-md transition-all">
            <div className="flex items-center gap-3 px-5 py-4">
              <Sparkles className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <input
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="What do you need help with today?"
                className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button onClick={() => handleSend()} disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-30 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-5 pb-4 border-t border-gray-50 pt-3">
              {CLIENT_CHIPS.map((chip) => (
                <button key={chip.label} onClick={() => handleSend(chip.label)}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
              <Sparkles className="h-4 w-4 text-gray-400 animate-pulse" />
              <span className="text-sm text-gray-500">AI is thinking...</span>
              <div className="flex gap-1 ml-1">
                {[0,1,2].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${i*150}ms` }} />
                ))}
              </div>
            </div>
          )}

          {!loading && activeResult === "tasks"    && <InlineFollowUpResult onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "outreach" && <InlineOutreachResult onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "contact"  && <InlineHotLeadsResult onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "pipeline" && <InlineJobsResult     onDismiss={() => setActiveResult(null)} />}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {mockLiteKPIs.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400 mb-2">{kpi.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1.5">{kpi.value}</p>
              <div className="flex items-center gap-1">
                {kpi.trend === "up"
                  ? <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  : <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
                <span className={cn("text-xs font-medium", kpi.trend === "up" ? "text-emerald-600" : "text-red-500")}>
                  {kpi.trend === "up" ? "+" : ""}{kpi.change}%
                </span>
                <span className="text-xs text-gray-400">this month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tasks + Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Tasks */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900">Today&apos;s Tasks</h2>
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                  {tasks.filter((t) => !t.done).length}
                </span>
              </div>
              <button onClick={() => openWithQuery("Generate follow-up tasks from my leads")}
                className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Refresh
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {tasks.map((task) => (
                <div key={task.id} className={cn("flex items-start gap-3 px-5 py-3.5", task.done && "opacity-40")}>
                  <button
                    onClick={() => setTasks((p) => p.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                    className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      task.done ? "border-emerald-500 bg-emerald-500" : "border-gray-300 hover:border-gray-500"
                    )}
                  >
                    {task.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </button>
                  <p className={cn("flex-1 text-sm text-gray-800 leading-snug", task.done && "line-through text-gray-400")}>
                    {task.text}
                  </p>
                  <span className={cn("shrink-0 h-2 w-2 rounded-full mt-1.5",
                    task.urgency === "high" ? "bg-red-400" : task.urgency === "medium" ? "bg-amber-400" : "bg-gray-300"
                  )} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <Users2 className="h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900">Recent Leads</h2>
              </div>
              <Link href="/demo/leads" className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {mockLiteLeads.slice(0, 5).map((lead) => {
                const st = STATUS_LABELS[lead.status];
                return (
                  <div key={lead.id} className="flex items-center gap-3 px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 shrink-0">
                      {lead.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                      <p className="text-xs text-gray-500 truncate">{lead.service}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", st.color)}>{st.label}</span>
                      <span className="text-[10px] text-gray-400">{lead.lastContact}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-gray-50">
              <button onClick={() => openWithQuery("Show my hottest leads")}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" /> Ask AI: Show my hottest leads
              </button>
            </div>
          </div>
        </div>

        {/* Alert banner */}
        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">3 estimates haven&apos;t been answered in 5+ days</p>
            <p className="text-xs text-amber-700 mt-0.5">Jessica Kim, Ray Dominguez, and Carol Stevens are waiting. AI can write follow-ups.</p>
          </div>
          <button onClick={() => openWithQuery("Write follow-up texts for unanswered estimates")}
            className="shrink-0 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
          >
            Write Follow-Ups
          </button>
        </div>
      </div>
    </div>
  );
}
