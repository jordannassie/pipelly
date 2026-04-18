"use client";

import { useState } from "react";
import {
  Sparkles, Send, TrendingUp, TrendingDown, Users2, GitBranch,
  CheckSquare, DollarSign, ArrowRight, Plus, Clock, AlertCircle,
  CheckCircle2, ChevronRight, Contact, BarChart3, Zap,
} from "lucide-react";
import { mockLeads, mockDeals, mockKPIs, mockTasks, mockAISuggestions } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

const PROMPT_CHIPS = [
  { label: "Who needs a follow-up today?", icon: Users2 },
  { label: "Score my hottest leads", icon: BarChart3 },
  { label: "What jobs are waiting on me?", icon: CheckSquare },
  { label: "Analyze my pipeline", icon: GitBranch },
  { label: "Draft a follow-up message", icon: Zap },
];

const KPI_CARDS = [
  { key: "leads",    label: "Leads Added",       icon: Users2,      color: "text-blue-600 bg-blue-50",      trendUp: true  },
  { key: "replies",  label: "Positive Replies",   icon: CheckCircle2,color: "text-emerald-600 bg-emerald-50", trendUp: true  },
  { key: "calls",    label: "Booked Calls",       icon: Contact,     color: "text-violet-600 bg-violet-50",   trendUp: false },
  { key: "deals",    label: "Open Deals",         icon: GitBranch,   color: "text-amber-600 bg-amber-50",     trendUp: true  },
  { key: "revenue",  label: "Revenue Influenced", icon: DollarSign,  color: "text-gray-900 bg-gray-100",      trendUp: true  },
];

const TASK_PRIORITY: Record<string, string> = {
  high:   "text-red-500",
  medium: "text-amber-500",
  low:    "text-blue-500",
};

const DEAL_STAGE_COLOR: Record<string, string> = {
  "Qualified":       "bg-blue-100 text-blue-700",
  "Contact Made":    "bg-violet-100 text-violet-700",
  "Demo Scheduled":  "bg-amber-100 text-amber-700",
  "Proposal Made":   "bg-emerald-100 text-emerald-700",
  "Negotiation":     "bg-orange-100 text-orange-700",
  "Closed Won":      "bg-emerald-100 text-emerald-700",
  "Closed Lost":     "bg-red-100 text-red-700",
};

export default function BusinessHomePage() {
  const [query, setQuery] = useState("");

  const kpiData = mockKPIs.slice(0, 5);
  const recentLeads = mockLeads.slice(0, 4);
  const openDeals = mockDeals.filter((d) => d.stage !== "Closed Won" && d.stage !== "Closed Lost").slice(0, 3);
  const todayTasks = mockTasks.filter((t) => t.status === "pending").slice(0, 4);

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* AI Hero */}
        <div className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">AI System Active</span>
          </div>
          <h1 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">Good morning, Jordan.</h1>
          <p className="mb-6 text-sm text-gray-400">
            Here&#39;s what&#39;s happening with your business today.
          </p>

          {/* AI Input */}
          <div className="relative mb-4">
            <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want Pipelly to help with today?"
              className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-11 pr-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-colors"
            />
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Prompt chips */}
          <div className="flex flex-wrap gap-2">
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => setQuery(chip.label)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <chip.icon className="h-3.5 w-3.5" />
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Row */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {KPI_CARDS.map((card, i) => {
            const kpi = kpiData[i];
            return (
              <div key={card.key} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                <div className={cn("mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg", card.color)}>
                  <card.icon className="h-4 w-4" />
                </div>
                <p className="text-xs text-gray-400 mb-0.5">{card.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi?.value ?? "—"}</p>
                <div className="mt-1 flex items-center gap-1">
                  {card.trendUp ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={cn("text-[10px] font-medium", card.trendUp ? "text-emerald-600" : "text-red-500")}>
                    {kpi?.change ?? ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content area */}
          <div className="space-y-5 lg:col-span-2">
            {/* Recent Leads */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Users2 className="h-4 w-4 text-gray-400" />
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Leads</h2>
                </div>
                <a href="/demo/business/leads" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{lead.name}</p>
                      <p className="text-xs text-gray-400 truncate">{lead.company} · {lead.lastContact}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                        lead.status === "new" ? "bg-blue-50 text-blue-700"
                          : lead.status === "qualified" ? "bg-emerald-50 text-emerald-700"
                          : lead.status === "contacted" ? "bg-violet-50 text-violet-700"
                          : lead.status === "unqualified" ? "bg-red-50 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      )}>
                        {lead.status}
                      </span>
                      <span className="rounded-full bg-gray-50 dark:bg-gray-900 px-2 py-0.5 text-[10px] font-bold text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800">
                        {lead.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Snapshot */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-5 py-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-gray-400" />
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Pipeline Snapshot</h2>
                </div>
                <a href="/demo/business/pipeline" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors">
                  Full board <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="p-5 space-y-3">
                {openDeals.map((deal) => (
                  <div key={deal.id} className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{deal.company}</p>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium flex-shrink-0", DEAL_STAGE_COLOR[deal.stage] ?? "bg-gray-100 text-gray-600")}>
                          {deal.stage}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{deal.contact} · Due {deal.dueDate}</p>
                    </div>
                    <p className="flex-shrink-0 text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(deal.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Today's Tasks */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
              <div className="mb-4 flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Today&#39;s Tasks</h2>
                <span className="ml-auto rounded-full bg-gray-100 dark:bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:text-gray-400">
                  {todayTasks.length}
                </span>
              </div>
              <div className="space-y-2">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5">
                    <div className={cn("mt-0.5 h-2 w-2 flex-shrink-0 rounded-full", TASK_PRIORITY[task.priority]?.replace("text-", "bg-") ?? "bg-gray-400")} />
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{task.title}</p>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 py-2.5 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-700 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                Add task
              </button>
            </div>

            {/* AI Suggestions */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">AI Suggestions</h2>
              </div>
              <div className="space-y-3">
                {mockAISuggestions.slice(0, 3).map((s) => (
                  <div key={s.id} className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={cn("mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        s.urgency === "high" ? "bg-red-500"
                          : s.urgency === "medium" ? "bg-amber-500"
                          : "bg-blue-500"
                      )} />
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{s.message}</p>
                    </div>
                    <button className="flex items-center gap-1 text-[11px] font-medium text-gray-900 dark:text-white hover:underline">
                      {s.action} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
