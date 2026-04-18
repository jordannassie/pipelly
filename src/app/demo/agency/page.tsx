"use client";

import { useState, useEffect } from "react";
import {
  Sparkles, Send, TrendingUp, TrendingDown, X, ChevronRight,
  BarChart3, PenLine, Zap, Building2, Users2, Copy, Check,
  GitBranch,
} from "lucide-react";
import {
  mockWorkspaces, mockKPIs, mockAISuggestions, mockAIActivity,
} from "@/lib/mock-data";
import { cn, formatCurrency, healthColor } from "@/lib/utils";
import { useAICopilot, detectCardType, type AICardType } from "@/lib/ai-copilot-context";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// RESULT SHELL
// ─────────────────────────────────────────────────────────────────────────────

function ResultShell({
  title, icon: Icon, onDismiss, children,
}: {
  title: string; icon: React.ElementType; onDismiss: () => void; children: React.ReactNode;
}) {
  return (
    <div className="mt-3 rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-900">
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">{title}</span>
          <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-600 flex items-center gap-1">
            <Sparkles className="h-2.5 w-2.5" /> AI Result
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
      <div className="space-y-1.5 mb-4">
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

function InlineOutreachResult({ onDismiss }: { onDismiss: () => void }) {
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
          <span className="ml-auto rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-600">PREVIEW</span>
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
        <div className="flex flex-wrap gap-1.5">
          {stages.map((s) => (
            <span key={s} className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600">{s}</span>
          ))}
        </div>
      </div>
    </ResultShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY STYLES
// ─────────────────────────────────────────────────────────────────────────────

const ACTIVITY_STYLES: Record<string, { color: string; bg: string }> = {
  outreach:   { color: "text-blue-600",   bg: "bg-blue-50" },
  import:     { color: "text-violet-600", bg: "bg-violet-50" },
  task:       { color: "text-amber-600",  bg: "bg-amber-50" },
  automation: { color: "text-emerald-600",bg: "bg-emerald-50" },
  analysis:   { color: "text-rose-600",   bg: "bg-rose-50" },
};

const QUICK_ACTIONS = [
  { icon: Users2,    label: "Find",      description: "Discover qualified leads" },
  { icon: PenLine,   label: "Write",     description: "Generate AI outreach" },
  { icon: BarChart3, label: "Analyze",   description: "Understand pipeline health" },
  { icon: Building2, label: "Build",     description: "Create client workspaces" },
  { icon: Zap,       label: "Automate",  description: "Set up smart workflows" },
];

const AGENCY_CHIPS = [
  { label: "Analyze my pipeline",          action: "pipeline"    as AICardType },
  { label: "Draft outreach for top leads", action: "outreach"    as AICardType },
  { label: "Create a client workspace",    action: "workspace"   as AICardType },
  { label: "Recommend automations",        action: "automations" as AICardType },
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AgencyHomePage() {
  const { setMode } = useDashboardMode();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<AICardType | null>(null);
  const { openWithQuery } = useAICopilot();

  // Ensure mode is synced
  useEffect(() => { setMode("agency"); }, [setMode]);

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
    <div className="p-7 space-y-6">

      {/* AI Command Hero */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI System Active</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{greeting}, Jordan.</h1>
          <p className="text-sm text-gray-500 mb-6">
            3 deals need attention · 12 leads can be re-engaged · 1 workspace health issue
          </p>

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
              {AGENCY_CHIPS.map((chip) => (
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

          {!loading && activeResult === "pipeline"  && <InlinePipelineResult  onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "outreach"  && <InlineOutreachResult  onDismiss={() => setActiveResult(null)} />}
          {!loading && activeResult === "workspace" && <InlineWorkspaceResult onDismiss={() => setActiveResult(null)} />}
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
                <p className="flex-1 text-sm text-gray-700 leading-snug">{a.message}</p>
                <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
