"use client";

import { useState } from "react";
import {
  Sparkles, Send, Search, PenLine, BarChart3, Layers, Zap,
  TrendingUp, TrendingDown, ArrowRight, AlertCircle, Clock,
  CheckCircle2, ChevronRight, Building2, Contact, CheckSquare, Copy, Check, Plus, X,
} from "lucide-react";
import { QuickActionCard } from "@/components/ui/QuickActionCard";
import { Badge } from "@/components/ui/Badge";
import { mockWorkspaces, mockKPIs, mockAISuggestions, mockAIActivity } from "@/lib/mock-data";
import { cn, formatCurrency, getInitials, healthColor } from "@/lib/utils";
import { useAICopilot, detectCardType, type AICardType } from "@/lib/ai-copilot-context";

// ── Prompt chips ───────────────────────────────────────────────────────────
const PROMPT_CHIPS = [
  { label: "Analyze my pipeline",              icon: BarChart3,  action: "pipeline"    as AICardType },
  { label: "Draft outreach for top leads",     icon: PenLine,    action: "outreach"    as AICardType },
  { label: "Create a client workspace",        icon: Building2,  action: "workspace"   as AICardType },
  { label: "Generate follow-up tasks",         icon: CheckSquare,action: "tasks"       as AICardType },
  { label: "Recommend automations",            icon: Zap,        action: "automations" as AICardType },
  { label: "Summarize Marcus Reid",            icon: Contact,    action: "contact"     as AICardType },
];

const QUICK_ACTIONS = [
  { icon: Search,   label: "Find",     description: "Discover qualified leads", accent: "bg-blue-500" },
  { icon: PenLine,  label: "Write",    description: "Generate AI outreach copy", accent: "bg-violet-500" },
  { icon: BarChart3,label: "Analyze",  description: "Understand pipeline health", accent: "bg-emerald-500" },
  { icon: Layers,   label: "Build",    description: "Create client workspaces", accent: "bg-amber-500" },
  { icon: Zap,      label: "Automate", description: "Set up smart workflows", accent: "bg-rose-500" },
];

const ACTIVITY_STYLES: Record<string, { color: string; bg: string }> = {
  outreach:   { color: "text-blue-600",   bg: "bg-blue-50" },
  import:     { color: "text-violet-600", bg: "bg-violet-50" },
  task:       { color: "text-amber-600",  bg: "bg-amber-50" },
  automation: { color: "text-emerald-600",bg: "bg-emerald-50" },
  analysis:   { color: "text-rose-600",   bg: "bg-rose-50" },
};

// ── Inline AI result cards (compact versions for home hero) ────────────────
function InlinePipelineResult({ onDismiss }: { onDismiss: () => void }) {
  const deals = [
    { name: "Elevate Roofing", value: "$24k", risk: "high", days: 6 },
    { name: "BrightPath", value: "$6k", risk: "medium", days: 4 },
    { name: "Solaris Solar", value: "$11k", risk: "medium", days: 3 },
  ];
  return (
    <ResultShell title="Pipeline Analysis" icon={BarChart3} onDismiss={onDismiss}>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[["$74.3k", "Total Value"], ["8", "Open Deals"], ["3", "At Risk"], ["62%", "Health"]].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
            <p className="text-lg font-bold text-gray-900">{v}</p>
            <p className="text-[10px] text-gray-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="mb-3 space-y-1.5">
        {deals.map((d) => (
          <div key={d.name} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-2.5">
            <span className={cn("h-2 w-2 rounded-full shrink-0", d.risk === "high" ? "bg-red-400" : "bg-amber-400")} />
            <span className="flex-1 text-sm font-medium text-gray-900">{d.name}</span>
            <span className="text-sm font-semibold text-gray-700">{d.value}</span>
            <span className="text-xs text-gray-400">{d.days}d idle</span>
            <AlertCircle className={cn("h-4 w-4", d.risk === "high" ? "text-red-400" : "text-amber-400")} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors text-center">
          Draft Follow-up Emails
        </button>
        <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors">
          View Pipeline
        </button>
      </div>
    </ResultShell>
  );
}

function InlineOutreachResult({ onDismiss }: { onDismiss: () => void }) {
  const [copied, setCopied] = useState(false);
  const email = `Subject: Quick question about {Company}'s growth strategy

Hey {First Name},

I came across {Company} and noticed you're scaling your acquisition — congrats on the growth.

I run Pipelly.ai, an AI system that helps agencies and service businesses find leads, run outreach, and fill their pipeline automatically.

Would it make sense to connect for 15 minutes to see if there's a fit?

Best,
Jordan`;
  return (
    <ResultShell title="AI Outreach Draft" icon={PenLine} onDismiss={onDismiss}>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[["Audience", "Top 5 leads"], ["Tone", "Direct"], ["Type", "Cold intro"]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
            <p className="text-[10px] text-gray-400">{k}</p>
            <p className="text-xs font-semibold text-gray-800">{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-3">
        <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">{email}</pre>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className={cn("flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors", copied ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-900")}
        >
          {copied ? <><Check className="h-4 w-4" />Copied!</> : <><Copy className="h-4 w-4" />Copy Email</>}
        </button>
        <button className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
          Send to Top 5
        </button>
      </div>
    </ResultShell>
  );
}

function InlineWorkspaceResult({ onDismiss }: { onDismiss: () => void }) {
  const stages = ["Qualified", "Contact Made", "Demo Scheduled", "Proposal Made", "Closed Won"];
  return (
    <ResultShell title="Workspace Created" icon={Building2} onDismiss={onDismiss}>
      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shrink-0">AR</div>
        <div>
          <p className="text-sm font-bold text-gray-900">Apex Roofing Dallas</p>
          <p className="text-xs text-gray-500">Home Services · Dallas, TX · Residential</p>
        </div>
        <Badge variant="success" className="ml-auto">Ready</Badge>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[["50", "Initial Leads"], ["5", "Pipeline Stages"], ["3", "Auto-rules"]].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
            <p className="text-lg font-bold text-gray-900">{v}</p>
            <p className="text-[10px] text-gray-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Pipeline</p>
        <div className="flex items-center gap-1 flex-wrap">
          {stages.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">{s}</span>
              {i < stages.length - 1 && <ArrowRight className="h-3 w-3 text-gray-300" />}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4 space-y-1">
        {["Calendly → Demo Scheduled", "5-day follow-up sequence", "Deal won → Onboarding tasks"].map((a) => (
          <div key={a} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="text-xs text-gray-700">{a}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors text-center">Open Workspace</button>
        <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors">Customize</button>
      </div>
    </ResultShell>
  );
}

function InlineTasksResult({ onDismiss }: { onDismiss: () => void }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const tasks = [
    { label: "Follow up with Marcus Reid — proposal pending 3 days", priority: "high", due: "Today" },
    { label: "Confirm Sophia Chen's demo for April 22nd", priority: "high", due: "Today" },
    { label: "Re-engage 12 cold leads with new sequence", priority: "medium", due: "Tomorrow" },
    { label: "Review Northstar Media proposal", priority: "medium", due: "Apr 20" },
    { label: "Approve BrightPath automation", priority: "low", due: "Apr 21" },
  ];
  return (
    <ResultShell title="AI Generated Tasks" icon={CheckSquare} onDismiss={onDismiss}>
      <div className="mb-3 space-y-1.5">
        {tasks.map((t, i) => (
          <div key={i} onClick={() => setChecked((p) => ({ ...p, [i]: !p[i] }))}
            className={cn("flex items-center gap-3 rounded-lg border px-4 py-2.5 cursor-pointer transition-colors", checked[i] ? "border-gray-100 bg-gray-50 opacity-60" : "border-gray-200 bg-white hover:border-gray-300")}>
            <div className={cn("h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", checked[i] ? "border-emerald-500 bg-emerald-500" : "border-gray-300")}>
              {checked[i] && <Check className="h-2.5 w-2.5 text-white" />}
            </div>
            <span className={cn("flex-1 text-sm", checked[i] ? "line-through text-gray-400" : "text-gray-800")}>{t.label}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", t.priority === "high" ? "bg-red-100 text-red-700" : t.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>
              {t.priority}
            </span>
          </div>
        ))}
      </div>
      <button className="w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
        Add All to Tasks
      </button>
    </ResultShell>
  );
}

function InlineAutomationsResult({ onDismiss }: { onDismiss: () => void }) {
  const [enabled, setEnabled] = useState<Record<number, boolean>>({});
  const recs = [
    { name: "Calendly → Demo Scheduled", trigger: "Meeting booked", action: "Move deal + notify", impact: "High" },
    { name: "5-Day No Reply Follow-up", trigger: "No reply after 5 days", action: "Send email sequence", impact: "High" },
    { name: "Deal Won → Create Workspace", trigger: "Closed Won", action: "Auto-create workspace", impact: "Medium" },
  ];
  return (
    <ResultShell title="Recommended Automations" icon={Zap} onDismiss={onDismiss}>
      <div className="mb-3 space-y-2">
        {recs.map((r, i) => (
          <div key={i} className={cn("rounded-xl border p-4 transition-colors", enabled[i] ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white")}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-sm font-semibold text-gray-900">{r.name}</p>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", r.impact === "High" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600")}>{r.impact}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs text-blue-700">{r.trigger}</span>
              <ArrowRight className="h-3 w-3 text-gray-400" />
              <span className="rounded-md bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-xs text-emerald-700">{r.action}</span>
            </div>
            <button onClick={() => setEnabled((p) => ({ ...p, [i]: !p[i] }))}
              className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors", enabled[i] ? "bg-emerald-600 text-white" : "bg-gray-900 text-white hover:bg-gray-700")}>
              {enabled[i] ? <><Check className="h-3 w-3" />Enabled</> : <><Plus className="h-3 w-3" />Enable</>}
            </button>
          </div>
        ))}
      </div>
      <button className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors">
        Enable All 3 Automations
      </button>
    </ResultShell>
  );
}

function InlineContactResult({ onDismiss }: { onDismiss: () => void }) {
  const signals = [
    { ok: true,  text: "Replied to 3 of 4 emails — strong engagement" },
    { ok: true,  text: "Asked budget questions — buying signal" },
    { ok: true,  text: "Opened proposal email 4 times" },
    { ok: false, text: "No reply to last follow-up (3 days ago)" },
  ];
  return (
    <ResultShell title="Contact Summary" icon={Contact} onDismiss={onDismiss}>
      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <div className="h-11 w-11 rounded-full bg-gray-900 flex items-center justify-center text-sm font-bold text-white shrink-0">MR</div>
        <div>
          <p className="text-sm font-bold text-gray-900">Marcus Reid</p>
          <p className="text-xs text-gray-500">CEO · Apex Growth · Marketing Agency</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs font-bold text-gray-900">$12,000</p>
          <p className="text-[10px] text-gray-400">Open deals</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[["Score", "92 / 100"], ["Stage", "Proposal Made"], ["Last reply", "2 days ago"], ["Emails", "4 sent"]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
            <p className="text-[10px] text-gray-400">{k}</p>
            <p className="text-xs font-semibold text-gray-800">{v}</p>
          </div>
        ))}
      </div>
      <div className="mb-3 space-y-1.5">
        {signals.map((s) => (
          <div key={s.text} className="flex items-start gap-2">
            {s.ok ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />}
            <span className="text-sm text-gray-600">{s.text}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">AI Recommendation</p>
        <p className="text-sm text-gray-700">Send a short follow-up today referencing his Thursday team meeting. Keep it under 3 sentences.</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors text-center">Draft Message</button>
        <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors">View Contact</button>
      </div>
    </ResultShell>
  );
}

function ResultShell({ title, icon: Icon, onDismiss, children }: {
  title: string; icon: React.ElementType; onDismiss: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-4">
      <div className="flex items-center gap-2 bg-gray-900 px-5 py-3.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
          <Icon className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-white flex-1">{title}</span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300 mr-1">
          <Sparkles className="h-2.5 w-2.5" />AI RESULT
        </span>
        <button onClick={onDismiss} className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function HealthBar({ health }: { health: string }) {
  const pct = { excellent: 95, good: 72, fair: 48, poor: 24 }[health] ?? 50;
  const color = { excellent: "bg-emerald-500", good: "bg-blue-500", fair: "bg-amber-400", poor: "bg-red-400" }[health] ?? "bg-gray-400";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 rounded-full bg-gray-100 overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-gray-400">{pct}%</span>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [activeResult, setActiveResult] = useState<AICardType | null>(null);
  const [loading, setLoading] = useState(false);
  const { openWithQuery } = useAICopilot();

  const handleSend = (query?: string) => {
    const q = (query ?? prompt).trim();
    if (!q) return;
    const type = detectCardType(q);
    if (type) {
      setLoading(true);
      setActiveResult(null);
      setTimeout(() => { setLoading(false); setActiveResult(type); }, 900);
    } else {
      openWithQuery(q);
    }
    setPrompt("");
  };

  const handleChip = (chip: typeof PROMPT_CHIPS[0]) => {
    setLoading(true);
    setActiveResult(null);
    setTimeout(() => { setLoading(false); setActiveResult(chip.action); }, 900);
  };

  return (
    <div className="p-6 max-w-[1400px]">

      {/* AI Hero */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100" />
              <span className="text-xs font-medium text-emerald-600">AI System Active</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning, Jordan.</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Your pipeline has <strong className="text-gray-900">$74.3k</strong> in open deals · <strong className="text-gray-900">3 tasks</strong> need attention today
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Today</p>
            <p className="text-xs font-semibold text-gray-700">Fri, Apr 18</p>
          </div>
        </div>

        {/* Input */}
        <div className={cn("rounded-xl border-2 bg-white p-3.5 flex items-center gap-3 transition-all mb-3", prompt ? "border-gray-900 shadow-sm" : "border-gray-200")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="What do you want Pipelly to do today?"
            className="flex-1 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
          />
          <button onClick={() => handleSend()} disabled={!prompt.trim()} className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors shrink-0 disabled:opacity-40">
            <Send className="h-3.5 w-3.5" />Send
          </button>
        </div>

        {/* Prompt chips */}
        <div className="flex flex-wrap gap-2">
          {PROMPT_CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleChip(chip)}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <chip.icon className="h-3 w-3" />
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Loading */}
      {loading && (
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Pipelly AI is working...</p>
            <p className="text-xs text-gray-500 mt-0.5">Analyzing your data and preparing results</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      )}

      {/* AI Result Card — inline in hero */}
      {!loading && activeResult === "pipeline"    && <InlinePipelineResult    onDismiss={() => setActiveResult(null)} />}
      {!loading && activeResult === "outreach"    && <InlineOutreachResult    onDismiss={() => setActiveResult(null)} />}
      {!loading && activeResult === "workspace"   && <InlineWorkspaceResult   onDismiss={() => setActiveResult(null)} />}
      {!loading && activeResult === "tasks"       && <InlineTasksResult       onDismiss={() => setActiveResult(null)} />}
      {!loading && activeResult === "automations" && <InlineAutomationsResult onDismiss={() => setActiveResult(null)} />}
      {!loading && activeResult === "contact"     && <InlineContactResult     onDismiss={() => setActiveResult(null)} />}

      {/* Quick Actions */}
      {!activeResult && !loading && (
        <>
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">AI Actions</p>
            <div className="grid grid-cols-5 gap-3">
              {QUICK_ACTIONS.map((a) => (
                <QuickActionCard key={a.label} {...a} />
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Performance · Last 30 days</p>
            <div className="grid grid-cols-6 gap-3">
              {mockKPIs.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-2">{kpi.label}</p>
                  <p className="text-xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                  <div className={cn("flex items-center gap-1 text-xs font-medium", kpi.trend === "up" ? "text-emerald-600" : "text-red-500")}>
                    {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(kpi.change)}% vs last mo.
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-col layout */}
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 flex flex-col gap-5">

              {/* Workspaces */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Active Workspaces</p>
                  <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    View all <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {mockWorkspaces.slice(0, 4).map((ws) => {
                    const convRate = Math.round((ws.bookedCalls / ws.leads) * 100);
                    return (
                      <div key={ws.id} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-4 hover:border-gray-300 hover:shadow-sm transition-all">
                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white", ws.color)}>
                          {getInitials(ws.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-gray-900">{ws.name}</p>
                            <span className="text-xs text-gray-400">{ws.industry}</span>
                          </div>
                          <HealthBar health={ws.health} />
                        </div>
                        <div className="flex items-center gap-5 shrink-0 text-center">
                          {[[ws.leads, "Leads"], [ws.bookedCalls, "Calls"], [`${convRate}%`, "Conv."], [formatCurrency(ws.revenue), "Revenue"]].map(([v, l]) => (
                            <div key={String(l)}>
                              <p className="text-sm font-bold text-gray-900">{v}</p>
                              <p className="text-[10px] text-gray-400">{l}</p>
                            </div>
                          ))}
                        </div>
                        <Badge className={cn("capitalize border text-[10px] shrink-0", healthColor(ws.health))}>{ws.health}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">AI Activity Log</p>
                <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
                  {mockAIActivity.map((item) => {
                    const style = ACTIVITY_STYLES[item.type] ?? { color: "text-gray-600", bg: "bg-gray-50" };
                    return (
                      <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                        <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", style.bg)}>
                          <Sparkles className={cn("h-3.5 w-3.5", style.color)} />
                        </div>
                        <p className="flex-1 text-sm text-gray-700">{item.message}</p>
                        <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-gray-300 hover:text-gray-600 transition-colors shrink-0 cursor-pointer" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="col-span-1 flex flex-col gap-5">
              {/* AI Insights */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3.5 bg-gray-900">
                  <Sparkles className="h-4 w-4 text-white" />
                  <p className="text-sm font-semibold text-white flex-1">AI Insights</p>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-900" />
                </div>
                <div className="divide-y divide-gray-100">
                  {mockAISuggestions.map((s) => {
                    const Icon = s.urgency === "high" ? AlertCircle : s.urgency === "medium" ? Clock : CheckCircle2;
                    const color = s.urgency === "high" ? "text-red-500" : s.urgency === "medium" ? "text-amber-500" : "text-gray-400";
                    return (
                      <div key={s.id} className="px-4 py-3.5">
                        <div className="flex items-start gap-2.5">
                          <Icon className={cn("h-3.5 w-3.5 mt-0.5 shrink-0", color)} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 leading-snug mb-1.5">{s.message}</p>
                            <button
                              onClick={() => openWithQuery(s.action)}
                              className="flex items-center gap-1 text-xs font-medium text-gray-900 hover:underline underline-offset-2"
                            >
                              {s.action} <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                  <button onClick={() => openWithQuery("Analyze my pipeline")} className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    <Sparkles className="h-3 w-3" />Ask AI for more insights
                  </button>
                </div>
              </div>

              {/* Today's Focus */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Today&apos;s Focus</p>
                  <button onClick={() => handleChip({ label: "Generate follow-up tasks", icon: CheckSquare, action: "tasks" })} className="flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-gray-900 transition-colors">
                    <Sparkles className="h-3 w-3" />Refresh
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: "Follow up with Marcus Reid — proposal pending", done: false, priority: "high" },
                    { label: "Confirm Sophia Chen's demo attendees", done: false, priority: "high" },
                    { label: "Re-engage 12 cold leads", done: false, priority: "medium" },
                    { label: "Approve BrightPath automation", done: true, priority: "low" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3">
                      <div className={cn("mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center", t.done ? "border-emerald-500 bg-emerald-500" : "border-gray-300")}>
                        {t.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <p className={cn("text-xs leading-relaxed flex-1", t.done ? "line-through text-gray-400" : "text-gray-700")}>{t.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
