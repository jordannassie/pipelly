"use client";

import { useState } from "react";
import {
  Sparkles, Send, Building2, CheckCircle2, AlertTriangle, Clock,
  ArrowRight, Plus, ExternalLink, TrendingUp, Users2, Zap,
  ChevronRight, RefreshCw,
} from "lucide-react";
import { mockAgencyClients, mockSetupQueue } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PROMPT_CHIPS = [
  "Create a new business workspace",
  "Show clients needing attention",
  "Summarize setup progress",
  "Recommend next action",
];

const KPI_CARDS = [
  { label: "Total Clients",        value: "5",    change: "+1 this month",  icon: Building2,    color: "text-violet-600 bg-violet-50" },
  { label: "Active Setups",        value: "2",    change: "In progress",    icon: RefreshCw,     color: "text-blue-600 bg-blue-50" },
  { label: "Healthy Workspaces",   value: "3",    change: "Above threshold",icon: CheckCircle2,  color: "text-emerald-600 bg-emerald-50" },
  { label: "Flagged Accounts",     value: "1",    change: "Needs attention", icon: AlertTriangle, color: "text-amber-600 bg-amber-50" },
  { label: "Revenue Managed",      value: "$229k", change: "+22% YoY",      icon: TrendingUp,    color: "text-gray-900 bg-gray-100" },
];

const HEALTH_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  excellent:      { label: "Excellent",      color: "text-emerald-700 bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  good:           { label: "Good",           color: "text-blue-700 bg-blue-50 border-blue-200",          dot: "bg-blue-500" },
  needs_attention:{ label: "Attention",      color: "text-amber-700 bg-amber-50 border-amber-200",       dot: "bg-amber-500" },
  flagged:        { label: "Flagged",        color: "text-red-700 bg-red-50 border-red-200",             dot: "bg-red-500" },
};

const SETUP_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  launched:    { label: "Launched",     color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  in_progress: { label: "In Progress",  color: "text-blue-700 bg-blue-50 border-blue-200" },
  pending:     { label: "Pending",      color: "text-amber-700 bg-amber-50 border-amber-200" },
};

const AI_INSIGHTS = [
  { text: "Elevate Solar has not had activity in 5 days — admin invite still pending.", action: "Send reminder", urgency: "high" },
  { text: "Northstar Med Spa pipeline stages have not been configured — setup stalled.", action: "Resume setup", urgency: "medium" },
  { text: "Apex Roofing is your best-performing workspace — consider upsell conversation.", action: "View workspace", urgency: "low" },
];

const QUICK_ACTIONS = [
  { label: "New Client Account", icon: Plus,        accent: "bg-gray-900 text-white hover:bg-gray-800" },
  { label: "Assign Admin User",  icon: Users2,      accent: "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200" },
  { label: "Launch Setup",       icon: Zap,         accent: "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200" },
  { label: "Open Business Demo", icon: ExternalLink, accent: "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200" },
];

export default function AgencyHomePage() {
  const [query, setQuery] = useState("");

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
            2 setups in progress · 1 client needs attention · 3 healthy workspaces
          </p>

          {/* AI Input */}
          <div className="relative mb-4">
            <Sparkles className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want Pipelly to do today?"
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
                key={chip}
                onClick={() => setQuery(chip)}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
              <div className={cn("mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg", kpi.color)}>
                <kpi.icon className="h-4 w-4" />
              </div>
              <p className="text-xs text-gray-400 mb-0.5">{kpi.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Client workspaces */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Client Workspaces</h2>
              <a href="/demo/agency/clients" className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors">
                View all <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="space-y-3">
              {mockAgencyClients.slice(0, 4).map((client) => {
                const health = HEALTH_CONFIG[client.health];
                const setup = SETUP_STATUS_CONFIG[client.setupStatus];
                return (
                  <div
                    key={client.id}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3.5"
                  >
                    <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white", client.color)}>
                      {client.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{client.name}</p>
                        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold flex-shrink-0", health.color)}>
                          <span className={cn("mr-1 inline-block h-1.5 w-1.5 rounded-full", health.dot)} />
                          {health.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{client.industry} · {client.adminUser} · {client.leads} leads</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className={cn("hidden sm:inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", setup.color)}>
                        {setup.label}
                      </span>
                      <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        Open <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick actions */}
            <div className="mt-5">
              <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    className={cn("flex flex-col items-center gap-2 rounded-xl px-3 py-4 text-xs font-medium transition-colors", action.accent)}
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* AI Insights */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">AI Insights</h2>
              </div>
              <div className="space-y-3">
                {AI_INSIGHTS.map((insight, i) => (
                  <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={cn("mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        insight.urgency === "high" ? "bg-red-500"
                          : insight.urgency === "medium" ? "bg-amber-500"
                          : "bg-blue-500"
                      )} />
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{insight.text}</p>
                    </div>
                    <button className="flex items-center gap-1 text-[11px] font-medium text-gray-900 dark:text-white hover:underline">
                      {insight.action} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup Queue */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Setup Queue</h2>
                </div>
                <a href="/demo/agency/setup" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">View all</a>
              </div>
              <div className="space-y-2.5">
                {mockSetupQueue.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5">
                    <div className={cn("h-2 w-2 flex-shrink-0 rounded-full",
                      item.status === "pending" ? "bg-amber-500"
                        : item.status === "in_progress" ? "bg-blue-500"
                        : "bg-emerald-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.client}</p>
                      <p className="text-[10px] text-gray-400 truncate">{item.step}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{item.updatedAt}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 py-2.5 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-700 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                Add new setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
