"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  Search,
  PenLine,
  BarChart3,
  Layers,
  Zap,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { QuickActionCard } from "@/components/ui/QuickActionCard";
import { Badge } from "@/components/ui/Badge";
import {
  mockWorkspaces,
  mockKPIs,
  mockAISuggestions,
  mockAIActivity,
} from "@/lib/mock-data";
import { cn, formatCurrency, getInitials, healthColor } from "@/lib/utils";

const PROMPT_SUGGESTIONS = [
  { label: "Find 50 roofing leads in Dallas", icon: Search },
  { label: "Write follow-ups for unreplied deals", icon: PenLine },
  { label: "Analyze my pipeline health", icon: BarChart3 },
  { label: "Create a client workspace", icon: Layers },
  { label: "Build a Calendly automation", icon: Zap },
  { label: "Summarize top opportunities", icon: Sparkles },
];

const QUICK_ACTIONS = [
  { icon: Search, label: "Find", description: "Discover qualified leads", accent: "bg-blue-500" },
  { icon: PenLine, label: "Write", description: "Generate AI outreach copy", accent: "bg-violet-500" },
  { icon: BarChart3, label: "Analyze", description: "Understand pipeline health", accent: "bg-emerald-500" },
  { icon: Layers, label: "Build", description: "Create client workspaces", accent: "bg-amber-500" },
  { icon: Zap, label: "Automate", description: "Set up smart workflows", accent: "bg-rose-500" },
];

const ACTIVITY_ICONS: Record<string, { color: string; bg: string }> = {
  outreach: { color: "text-blue-600", bg: "bg-blue-100" },
  import: { color: "text-violet-600", bg: "bg-violet-100" },
  task: { color: "text-amber-600", bg: "bg-amber-100" },
  automation: { color: "text-emerald-600", bg: "bg-emerald-100" },
  analysis: { color: "text-rose-600", bg: "bg-rose-100" },
};

const URGENCY_CONFIG: Record<string, { dot: string; badge: string; icon: typeof AlertCircle }> = {
  high: { dot: "bg-red-400", badge: "text-red-600", icon: AlertCircle },
  medium: { dot: "bg-amber-400", badge: "text-amber-600", icon: Clock },
  low: { dot: "bg-gray-300", badge: "text-gray-500", icon: CheckCircle2 },
};

function HealthBar({ health }: { health: string }) {
  const scores = { excellent: 95, good: 72, fair: 48, poor: 24 };
  const colors = { excellent: "bg-emerald-500", good: "bg-blue-500", fair: "bg-amber-400", poor: "bg-red-400" };
  const pct = scores[health as keyof typeof scores] ?? 50;
  const color = colors[health as keyof typeof colors] ?? "bg-gray-400";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 rounded-full bg-gray-100 overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-gray-400">{pct}%</span>
    </div>
  );
}

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const handleSend = () => {
    if (!prompt.trim()) return;
    setAiOutput(null);
    setTimeout(() => {
      setAiOutput(
        `I'm working on: "${prompt}". I found 47 matching leads in your target market, drafted 3 outreach sequences, and flagged 2 deals for immediate follow-up. Want me to proceed?`
      );
    }, 800);
    setPrompt("");
  };

  return (
    <div className="p-6 max-w-[1400px]">

      {/* AI Hero — command center style */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100" />
              <span className="text-xs font-medium text-emerald-600">AI System Active</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning, Jordan.</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Your pipeline has <strong className="text-gray-900">$74.3k</strong> in open deals · <strong className="text-gray-900">3 tasks</strong> need attention today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Today</p>
              <p className="text-xs font-semibold text-gray-700">Fri, Apr 18</p>
            </div>
          </div>
        </div>

        {/* AI input */}
        <div className={cn(
          "rounded-xl border-2 bg-white p-3.5 flex items-center gap-3 transition-all mb-3",
          prompt ? "border-gray-900 shadow-sm" : "border-gray-200"
        )}>
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
          <button
            onClick={handleSend}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors shrink-0 disabled:opacity-40"
            disabled={!prompt.trim()}
          >
            <Send className="h-3.5 w-3.5" />
            Send
          </button>
        </div>

        {/* AI output (after send) */}
        {aiOutput && (
          <div className="mb-3 rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gray-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed">{aiOutput}</p>
          </div>
        )}

        {/* Prompt chips */}
        <div className="flex flex-wrap gap-2">
          {PROMPT_SUGGESTIONS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setPrompt(label)}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">AI Actions</p>
        <div className="grid grid-cols-5 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard key={action.label} {...action} />
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Performance · Last 30 days</p>
        <div className="grid grid-cols-6 gap-3">
          {mockKPIs.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 mb-2">{kpi.label}</p>
              <p className="text-xl font-bold text-gray-900 mb-2">{kpi.value}</p>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-red-500" : "text-gray-400"
              )}>
                {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(kpi.change)}% vs last mo.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main 3-col layout */}
      <div className="grid grid-cols-3 gap-5">

        {/* Left 2/3 */}
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
                  <div
                    key={ws.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-4 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
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
                      <div>
                        <p className="text-sm font-bold text-gray-900">{ws.leads}</p>
                        <p className="text-[10px] text-gray-400">Leads</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{ws.bookedCalls}</p>
                        <p className="text-[10px] text-gray-400">Calls</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{convRate}%</p>
                        <p className="text-[10px] text-gray-400">Conv.</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(ws.revenue)}</p>
                        <p className="text-[10px] text-gray-400">Revenue</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={cn("capitalize border text-[10px]", healthColor(ws.health))}>
                        {ws.health}
                      </Badge>
                      <button className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors">
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">AI Activity Log</p>
            <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
              {mockAIActivity.map((item) => {
                const style = ACTIVITY_ICONS[item.type] ?? { color: "text-gray-600", bg: "bg-gray-100" };
                return (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                    <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", style.bg)}>
                      <Sparkles className={cn("h-3.5 w-3.5", style.color)} />
                    </div>
                    <p className="flex-1 text-sm text-gray-700">{item.message}</p>
                    <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{item.time}</span>
                    <button className="shrink-0">
                      <ArrowRight className="h-3.5 w-3.5 text-gray-300 hover:text-gray-600 transition-colors" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1/3 — AI Insights */}
        <div className="col-span-1 flex flex-col gap-5">
          {/* AI Insights panel */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3.5 bg-gray-900">
              <Sparkles className="h-4 w-4 text-white" />
              <p className="text-sm font-semibold text-white flex-1">AI Insights</p>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-900" />
            </div>
            <div className="divide-y divide-gray-100">
              {mockAISuggestions.map((s) => {
                const cfg = URGENCY_CONFIG[s.urgency] ?? URGENCY_CONFIG.low;
                const Icon = cfg.icon;
                return (
                  <div key={s.id} className="px-4 py-3.5">
                    <div className="flex items-start gap-2.5">
                      <Icon className={cn("h-3.5 w-3.5 mt-0.5 shrink-0", cfg.badge)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-snug mb-1.5">{s.message}</p>
                        <button className="flex items-center gap-1 text-xs font-medium text-gray-900 hover:underline underline-offset-2">
                          {s.action}
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
              <button className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">
                <Sparkles className="h-3 w-3" />
                Ask AI for more insights
              </button>
            </div>
          </div>

          {/* Today's Focus */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-4 py-3.5 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Today&apos;s Focus</p>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: "Follow up with Marcus Reid — high-value proposal pending", done: false, priority: "high" },
                { label: "Review Northstar Media proposal before sending", done: false, priority: "medium" },
                { label: "Re-engage 12 leads that went cold 14+ days ago", done: false, priority: "medium" },
                { label: "Approve Calendly automation for BrightPath", done: true, priority: "low" },
              ].map((task, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <div className={cn(
                    "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center",
                    task.done ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                  )}>
                    {task.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <p className={cn("text-xs leading-relaxed flex-1", task.done ? "line-through text-gray-400" : "text-gray-700")}>
                    {task.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
