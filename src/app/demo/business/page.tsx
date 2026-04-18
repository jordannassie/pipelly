"use client";

import { useEffect, useState } from "react";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { mockLiteKPIs, mockLiteTasks, mockLiteLeads, mockBusinessAISuggestions } from "@/lib/mock-data";
import { Sparkles, ArrowRight, CheckCircle2, Circle, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PROMPT_CHIPS = [
  "Who needs a follow-up today?",
  "Show my hottest leads",
  "What jobs are waiting on me?",
  "Write a reply for this lead",
  "What's on my calendar this week?",
];

const STATUS_STYLES: Record<string, string> = {
  "new":        "bg-blue-50 text-blue-700 border-blue-200",
  "contacted":  "bg-amber-50 text-amber-700 border-amber-200",
  "quote-sent": "bg-violet-50 text-violet-700 border-violet-200",
  "booked":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "closed":     "bg-gray-100 text-gray-600 border-gray-200",
};

const STATUS_LABELS: Record<string, string> = {
  "new": "New Lead", "contacted": "Contacted",
  "quote-sent": "Quote Sent", "booked": "Booked", "closed": "Closed",
};

export default function BusinessHomePage() {
  const { setMode } = useDashboardMode();
  const { openWithQuery } = useAICopilot();
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState(mockLiteTasks.map((t) => ({ ...t, checked: false })));

  useEffect(() => { setMode("business"); }, [setMode]);

  const handleSend = () => {
    const q = query.trim();
    if (!q) return;
    openWithQuery(q);
    setQuery("");
  };

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, checked: !t.checked } : t));

  const urgentItems = mockBusinessAISuggestions.filter((s) => s.urgency === "high");

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-7">

        {/* Urgency banner */}
        {urgentItems.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-800 mb-2">
                {urgentItems.length} things need your attention today
              </p>
              <div className="flex flex-wrap gap-2">
                {urgentItems.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => openWithQuery(s.action)}
                    className="text-xs px-3 py-1.5 bg-white border border-amber-200 rounded-full text-amber-700 hover:bg-amber-100 transition-colors font-medium"
                  >
                    {s.action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Greeting */}
        <div>
          <p className="text-sm text-gray-400 mb-0.5">Good morning 👋</p>
          <h1 className="text-2xl font-black text-gray-900">Jordan Nassie</h1>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s what&apos;s happening with your business today.</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mockLiteKPIs.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-400 mb-2 font-medium">{kpi.label}</p>
              <p className="text-4xl font-black text-gray-900 mb-1.5">{kpi.value}</p>
              <p className={cn("text-xs font-semibold flex items-center gap-1", kpi.trend === "up" ? "text-emerald-600" : "text-amber-500")}>
                {kpi.trend === "up"
                  ? <TrendingUp className="h-3.5 w-3.5" />
                  : <TrendingDown className="h-3.5 w-3.5" />}
                {typeof kpi.change === "number"
                  ? `${kpi.trend === "up" ? "+" : ""}${kpi.change} this month`
                  : kpi.change}
              </p>
            </div>
          ))}
        </div>

        {/* AI input */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </p>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI anything about your business…"
              className="flex-1 h-11 px-4 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
            />
            <button
              onClick={handleSend}
              className="h-11 px-5 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shrink-0"
            >
              Ask <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => openWithQuery(chip)}
                className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks + Leads */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Tasks */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Today&apos;s Tasks</h2>
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {tasks.filter((t) => !t.checked).length} left
              </span>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-xl border transition-all",
                    task.checked ? "bg-gray-50 border-gray-100 opacity-50" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {task.checked
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    : <Circle className="h-4 w-4 text-gray-300 shrink-0 mt-0.5" />}
                  <p className={cn("text-sm leading-snug", task.checked ? "line-through text-gray-400" : "text-gray-700 font-medium")}>
                    {task.text}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Recent Leads</h2>
              <Link href="/demo/business/leads" className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {mockLiteLeads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs font-bold text-gray-500">
                    {lead.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.service}</p>
                  </div>
                  <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0", STATUS_STYLES[lead.status])}>
                    {STATUS_LABELS[lead.status] ?? lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI suggestions row */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-bold text-gray-900">AI Suggestions</h2>
          </div>
          <div className="space-y-2.5">
            {mockBusinessAISuggestions.map((s) => (
              <div
                key={s.id}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl border",
                  s.urgency === "high" ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"
                )}
              >
                <AlertCircle className={cn("h-4 w-4 shrink-0", s.urgency === "high" ? "text-red-400" : "text-gray-300")} />
                <p className="text-xs text-gray-700 leading-relaxed flex-1">{s.message}</p>
                <button
                  onClick={() => openWithQuery(s.action)}
                  className="text-xs font-semibold text-gray-900 hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap"
                >
                  {s.action} <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
