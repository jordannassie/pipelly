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
} from "lucide-react";
import { QuickActionCard } from "@/components/ui/QuickActionCard";
import { KPIStatCard } from "@/components/ui/KPIStatCard";
import { Badge } from "@/components/ui/Badge";
import {
  mockWorkspaces,
  mockKPIs,
  mockAISuggestions,
  mockAIActivity,
} from "@/lib/mock-data";
import { cn, getInitials, healthColor } from "@/lib/utils";

const PROMPT_SUGGESTIONS = [
  "Find 50 roofing leads in Dallas",
  "Write a follow-up for unreplied deals",
  "Analyze my pipeline",
  "Create a client workspace",
  "Build a Calendly automation",
  "Summarize top opportunities",
];

const QUICK_ACTIONS = [
  {
    icon: Search,
    label: "Find",
    description: "Discover qualified leads",
    accent: "bg-blue-500",
  },
  {
    icon: PenLine,
    label: "Write",
    description: "Generate AI outreach copy",
    accent: "bg-violet-500",
  },
  {
    icon: BarChart3,
    label: "Analyze",
    description: "Understand pipeline health",
    accent: "bg-emerald-500",
  },
  {
    icon: Layers,
    label: "Build",
    description: "Create client workspaces",
    accent: "bg-amber-500",
  },
  {
    icon: Zap,
    label: "Automate",
    description: "Set up smart workflows",
    accent: "bg-rose-500",
  },
];

const ACTIVITY_TYPE_COLORS: Record<string, string> = {
  outreach: "bg-blue-400",
  import: "bg-violet-400",
  task: "bg-amber-400",
  automation: "bg-emerald-400",
  analysis: "bg-rose-400",
};

const URGENCY_COLORS: Record<string, string> = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-gray-300",
};

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="p-6">
      {/* AI Hero Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Good morning, Jordan.
        </h1>
        <p className="text-sm text-gray-500 mb-5">
          Your AI acquisition system is ready. What do you want to do today?
        </p>

        <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-sm p-4 flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What do you want Pipelly to do today?"
            className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
          />
          <button className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors shrink-0">
            <Send className="h-3.5 w-3.5" />
            Send
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {PROMPT_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-5 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard
              key={action.label}
              icon={action.icon}
              label={action.label}
              description={action.description}
              accent={action.accent}
            />
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-900 mb-3">Performance Overview</p>
        <div className="grid grid-cols-6 gap-4">
          {mockKPIs.map((kpi) => (
            <KPIStatCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </div>

      {/* Two-column section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left 2/3 */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Recent Workspaces */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Recent Workspaces</p>
            <div className="flex flex-col gap-3">
              {mockWorkspaces.slice(0, 4).map((ws) => (
                <div
                  key={ws.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-3"
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white",
                      ws.color
                    )}
                  >
                    {getInitials(ws.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {ws.name}
                    </p>
                    <p className="text-xs text-gray-500">{ws.industry}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="default">{ws.leads} leads</Badge>
                    <Badge
                      className={cn(
                        "capitalize border",
                        healthColor(ws.health)
                      )}
                    >
                      {ws.health}
                    </Badge>
                    <button className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors">
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</p>
            <div className="rounded-xl border border-gray-200 bg-white px-5">
              {mockAIActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      ACTIVITY_TYPE_COLORS[item.type] ?? "bg-gray-300"
                    )}
                  />
                  <p className="flex-1 text-sm text-gray-700">{item.message}</p>
                  <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1/3 — AI Suggestions */}
        <div className="col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="flex items-center gap-2 bg-gray-900 px-5 py-3.5">
              <Sparkles className="h-4 w-4 text-gray-300" />
              <p className="text-sm font-semibold text-white">AI Insights</p>
            </div>
            <div className="px-5">
              {mockAISuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      URGENCY_COLORS[suggestion.urgency] ?? "bg-gray-300"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 mb-1">
                      {suggestion.message}
                    </p>
                    <button className="text-xs font-medium text-blue-600 underline-offset-2 hover:underline">
                      {suggestion.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
