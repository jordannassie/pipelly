"use client";

import { useState, useEffect } from "react";
import {
  Sparkles, Send, TrendingUp, TrendingDown, Phone, FileText,
  CheckCircle2, Clock, X, AlertCircle, Users2, Briefcase,
  MessageSquare, ChevronRight, BarChart3, PenLine, Zap,
  Building2, Contact, CheckSquare, Copy, Check, ArrowRight,
  GitBranch, Layers,
} from "lucide-react";
import {
  mockLiteKPIs, mockLiteTasks, mockLiteLeads,
  mockWorkspaces, mockKPIs, mockAISuggestions, mockAIActivity,
} from "@/lib/mock-data";
import { cn, formatCurrency, healthColor } from "@/lib/utils";
import { useAICopilot, detectCardType, type AICardType } from "@/lib/ai-copilot-context";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED TYPES / HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  "new":        { label: "New",        color: "bg-blue-50 text-blue-700" },
  "contacted":  { label: "Contacted",  color: "bg-amber-50 text-amber-700" },
  "quote-sent": { label: "Quote Sent", color: "bg-violet-50 text-violet-700" },
  "booked":     { label: "Booked",     color: "bg-emerald-50 text-emerald-700" },
  "closed":     { label: "Closed",     color: "bg-gray-100 text-gray-500" },
};

const URGENCY_COLOR: Record<string, string> = {
  high:   "bg-red-50 border-red-100",
  medium: "bg-amber-50 border-amber-100",
  low:    "bg-gray-50 border-gray-100",
};

const URGENCY_DOT: Record<string, string> = {
  high: "bg-red-400", medium: "bg-amber-400", low: "bg-gray-300",
};

const ACTIVITY_STYLES: Record<string, { color: string; bg: string }> = {
  outreach:   { color: "text-blue-600",   bg: "bg-blue-50" },
  import:     { color: "text-violet-600", bg: "bg-violet-50" },
  task:       { color: "text-amber-600",  bg: "bg-amber-50" },
  automation: { color: "text-emerald-600",bg: "bg-emerald-50" },
  analysis:   { color: "text-rose-600",   bg: "bg-rose-50" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED RESULT SHELL
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
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 flex items-center gap-1 border border-blue-100">
            <Sparkles className="h-3 w-3" /> AI Result
          </span>
        </div>
        <button onClick={onDismiss} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT INLINE RESULT CARDS
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
// AGENCY INLINE RESULT CARDS
// ─────────────────────────────────────────────────────────────────────────────

function InlinePipelineResult({ onDismiss }: { onDismiss: () => void }) {
  const deals = [
    { name: "Elevate Roofing", value: "$24k", risk: "high",   days: 6 },
    { name: "BrightPath",      value: "$6k",  risk: "medium", days: 4 },
    { name: "Solaris Solar",   value: "$11k", risk: "medium", days: 3 },
  ];
  return (
    <ResultShell title="Pipeline Analysis" icon={BarChart3} onDismiss={onDismiss}>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[["$74.3k","Total Value"],["8","Open Deals"],["3","At Risk"],["62%","Health"]].map(([v,l]) => (
          <div key={l} className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
            <p className="text-lg font-bold text-gray-900">{v}</p>
            <p className="text-[10px] text-gray-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="mb-4 space-y-1.5">
        {deals.map((d) => (
          <div key={d.name} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-2.5">
            <span className={cn("h-2 w-2 rounded-full shrink-0", d.risk === "high" ? "bg-red-400" : "bg-amber-400")} />
            <span className="flex-1 text-sm font-medium text-gray-900">{d.name}</span>
            <span className="text-sm font-semibold text-gray-700">{d.value}</span>
            <span className="text-xs text-gray-400">{d.days}d idle</span>
          </div>
        ))}
      </div>
      <button className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
        Draft Follow-up Emails
      </button>
    </ResultShell>
  );
}

function InlineAgencyOutreachResult({ onDismiss }: { onDismiss: () => void }) {
  const [copied, setCopied] = useState(false);
  const draft = `Hi Marcus,\n\nHope your week is going well! I wanted to follow up on the proposal I sent last week. Given the momentum we've seen with your Q2 lead volume, I believe this is a great time to get the system set up.\n\nWould Thursday at 2pm work for a 20-min call to answer any questions?\n\nBest,\nJordan`;
  return (
    <ResultShell title="AI Outreach Draft — Marcus Reid" icon={PenLine} onDismiss={onDismiss}>
      <p className="text-xs text-gray-400 mb-3">Proposal follow-up · Apex Growth · $12,000</p>
      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-800 leading-relaxed whitespace-pre-line mb-4">{draft}</div>
      <div className="flex gap-2">
        <button
          onClick={() => { navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
        >
          {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy Draft</>}
        </button>
        <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors">Edit</button>
      </div>
    </ResultShell>
  );
}

function InlineWorkspaceResult({ onDismiss }: { onDismiss: () => void }) {
  const stages = ["Qualified","Contact Made","Demo Scheduled","Proposal Made","Closed Won"];
  return (
    <ResultShell title="New Workspace Created" icon={Building2} onDismiss={onDismiss}>
      <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-xs font-bold text-white">ER</div>
          <div>
            <p className="text-sm font-bold text-gray-900">Elevate Roofing Co.</p>
            <p className="text-xs text-gray-500">Home Services · Dallas, TX</p>
          </div>
          <span className="ml-auto rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-600">PREVIEW</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[["Pipeline","Active"],["AI Outreach","Ready"],["Leads","0"],["Health","—"]].map(([k,v]) => (
            <div key={k} className="flex justify-between rounded-lg bg-white border border-gray-100 px-2.5 py-1.5">
              <span className="text-gray-500">{k}</span><span className="font-semibold text-gray-900">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-2 font-medium">Pipeline Stages</p>
        <div className="flex gap-1.5">
          {stages.map((s) => (
            <span key={s} className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600">{s}</span>
          ))}
        </div>
      </div>
    </ResultShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTRY CHOOSER
// ─────────────────────────────────────────────────────────────────────────────

function EntryChooser({ onChoose }: { onChoose: (m: "agency" | "client") => void }) {
  return (
    <div className="flex items-center justify-center min-h-full bg-gray-50/60">
      <div className="w-full max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-900">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Pipelly<span className="text-gray-400">.ai</span></span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            How do you use Pipelly?
          </h1>
          <p className="text-base text-gray-500">
            Choose your experience. You can switch anytime from the sidebar.
          </p>
        </div>

        {/* Mode cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Agency card */}
          <button
            onClick={() => onChoose("agency")}
            className="group text-left rounded-2xl border-2 border-gray-200 bg-white p-7 shadow-sm hover:border-gray-900 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 group-hover:scale-105 transition-transform">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">Agency</span>
                  <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-bold text-white">PRO</span>
                </div>
                <span className="text-xs text-gray-500">For agencies &amp; consultants</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Manage multiple client workspaces, full pipeline, automations, analytics, and team inbox — all AI-powered.
            </p>
            <ul className="space-y-2 mb-6">
              {["Multi-client workspaces","Full pipeline & deals","Automations & workflows","Analytics & reporting","Team inbox & contacts"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-3.5 w-3.5 text-gray-900 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:gap-3 transition-all">
              Get started <ArrowRight className="h-4 w-4" />
            </div>
          </button>

          {/* Client / Local Business card */}
          <button
            onClick={() => onChoose("client")}
            className="group text-left rounded-2xl border-2 border-gray-200 bg-white p-7 shadow-sm hover:border-gray-900 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 group-hover:scale-105 transition-transform">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900">Local Business</span>
                  <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">SIMPLE</span>
                </div>
                <span className="text-xs text-gray-500">For service businesses</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Simple leads, text messages, and a jobs board. AI writes your follow-ups. No complexity, just clarity.
            </p>
            <ul className="space-y-2 mb-6">
              {["Simple lead list","Text message center","Jobs board & tracking","AI writes your replies","Daily task reminders"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:gap-3 transition-all">
              Get started <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Not sure? Start with <button onClick={() => onChoose("client")} className="underline hover:text-gray-600 transition-colors">Local Business</button> — you can always upgrade to Agency later.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT HOME
// ─────────────────────────────────────────────────────────────────────────────

const CLIENT_PROMPT_CHIPS = [
  { label: "Who needs a follow-up?",       action: "tasks"    as AICardType },
  { label: "Write a reply for a lead",     action: "outreach" as AICardType },
  { label: "Show my hottest leads",        action: "contact"  as AICardType },
  { label: "What jobs are waiting on me?", action: "pipeline" as AICardType },
];

function ClientHome() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<AICardType | null>(null);
  const [tasks, setTasks] = useState(mockLiteTasks);
  const { openWithQuery } = useAICopilot();

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
              {CLIENT_PROMPT_CHIPS.map((chip) => (
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

          {!loading && activeResult === "tasks"    && <InlineFollowUpResult  onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "outreach" && <InlineOutreachResult  onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "contact"  && <InlineHotLeadsResult  onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "pipeline" && <InlineJobsResult      onDismiss={() => setActiveResult(null)} />}
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

// ─────────────────────────────────────────────────────────────────────────────
// AGENCY HOME
// ─────────────────────────────────────────────────────────────────────────────

const AGENCY_PROMPT_CHIPS = [
  { label: "Analyze my pipeline",         action: "pipeline"    as AICardType },
  { label: "Draft outreach for top leads", action: "outreach"   as AICardType },
  { label: "Create a client workspace",   action: "workspace"   as AICardType },
  { label: "Recommend automations",       action: "automations" as AICardType },
];

const QUICK_ACTIONS = [
  { icon: Users2,   label: "Find",      description: "Discover qualified leads" },
  { icon: PenLine,  label: "Write",     description: "Generate AI outreach" },
  { icon: BarChart3,label: "Analyze",   description: "Understand pipeline health" },
  { icon: Building2,label: "Build",     description: "Create client workspaces" },
  { icon: Zap,      label: "Automate",  description: "Set up smart workflows" },
];

function AgencyHome() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<AICardType | null>(null);
  const { openWithQuery } = useAICopilot();

  const handleSend = (query: string = input) => {
    if (!query.trim()) return;
    const cardType = detectCardType(query);
    if (cardType && ["pipeline","outreach","workspace"].includes(cardType)) {
      setActiveResult(cardType); setLoading(true); setTimeout(() => setLoading(false), 1000);
    } else {
      openWithQuery(query);
    }
    setInput("");
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-7 space-y-7">

      {/* AI Command Hero */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-7 pt-7 pb-5">
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI System Active</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{greeting}, Jordan.</h1>
          <p className="text-sm text-gray-500 mb-6">3 deals need attention · 12 leads can be re-engaged · 1 workspace health issue</p>

          {/* Input */}
          <div className="relative rounded-xl border border-gray-200 bg-gray-50 focus-within:border-gray-900 focus-within:bg-white transition-all">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <Sparkles className="h-4 w-4 text-gray-400 shrink-0" />
              <input
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="What do you want Pipelly to do today?"
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button onClick={() => handleSend()} disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-30 transition-all"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-4 pb-3.5">
              {AGENCY_PROMPT_CHIPS.map((chip) => (
                <button key={chip.label} onClick={() => handleSend(chip.label)}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
              <Sparkles className="h-4 w-4 text-gray-400 animate-pulse" />
              <span className="text-xs text-gray-500">AI is analyzing your data...</span>
              <div className="flex gap-1 ml-1">
                {[0,1,2].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${i*150}ms` }} />
                ))}
              </div>
            </div>
          )}

          {!loading && activeResult === "pipeline"  && <InlinePipelineResult         onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "outreach"  && <InlineAgencyOutreachResult   onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "workspace" && <InlineWorkspaceResult        onDismiss={() => setActiveResult(null)} />}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-5 border-t border-gray-100">
          {QUICK_ACTIONS.map(({ icon: Icon, label, description }) => (
            <button key={label}
              onClick={() => openWithQuery(description)}
              className="flex flex-col items-center gap-1.5 py-4 px-3 hover:bg-gray-50 transition-colors border-r border-gray-100 last:border-0 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-900 transition-colors">
                <Icon className="h-3.5 w-3.5 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 group-hover:text-gray-900">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {mockKPIs.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-medium text-gray-400 mb-1.5 truncate">{kpi.label}</p>
            <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.trend === "up"
                ? <TrendingUp className="h-3 w-3 text-emerald-500" />
                : <TrendingDown className="h-3 w-3 text-red-400" />}
              <span className={cn("text-[10px] font-medium", kpi.trend === "up" ? "text-emerald-600" : "text-red-500")}>
                {kpi.trend === "up" ? "+" : ""}{kpi.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Workspaces + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Workspaces */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Workspaces</h2>
            </div>
            <Link href="/demo/workspaces" className="text-xs font-medium text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {mockWorkspaces.slice(0, 4).map((ws) => (
              <div key={ws.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white shrink-0", ws.color)}>
                  {ws.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 truncate">{ws.name}</p>
                    <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase",
                      healthColor(ws.health) === "text-emerald-600" ? "bg-emerald-50 text-emerald-600" :
                      healthColor(ws.health) === "text-amber-600"   ? "bg-amber-50 text-amber-600"   :
                      "bg-red-50 text-red-600"
                    )}>{ws.health}</span>
                  </div>
                  <p className="text-xs text-gray-400">{ws.industry}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(ws.revenue)}</p>
                  <p className="text-[10px] text-gray-400">{ws.leads} leads · {ws.bookedCalls} calls</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <Sparkles className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">AI Insights</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {mockAISuggestions.slice(0, 4).map((s) => (
              <div key={s.id} className="px-5 py-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className={cn("mt-0.5 h-2 w-2 rounded-full shrink-0",
                    s.urgency === "high" ? "bg-red-400" : s.urgency === "medium" ? "bg-amber-400" : "bg-gray-300"
                  )} />
                  <p className="text-xs text-gray-700 leading-relaxed">{s.message}</p>
                </div>
                <button
                  onClick={() => openWithQuery(s.action)}
                  className="ml-4 text-[11px] font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {s.action} <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <GitBranch className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {mockAIActivity.map((a) => {
            const style = ACTIVITY_STYLES[a.type] ?? { color: "text-gray-600", bg: "bg-gray-50" };
            return (
              <div key={a.id} className="flex items-start gap-3.5 px-5 py-3.5">
                <div className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full", style.bg)}>
                  <Sparkles className={cn("h-3 w-3", style.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{a.message}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE (tristate controller)
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { mode, hasChosen, setMode } = useDashboardMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch — render nothing until client-side
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="flex items-center gap-2 text-gray-400">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!hasChosen) return <EntryChooser onChoose={setMode} />;
  if (mode === "agency") return <AgencyHome />;
  return <ClientHome />;
}
