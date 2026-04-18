"use client";

import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { TaskList } from "@/components/tasks/TaskList";
import { mockTasks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TABS = ["All", "Today", "Upcoming", "Overdue", "AI Recommended"] as const;
type Tab = (typeof TABS)[number];

const TODAY = "2026-04-18";

const AI_SUGGESTIONS = [
  "3 deals haven't had follow-up in 7 days",
  "12 cold leads are ready to re-engage",
  "Elevate Roofing campaign needs approval",
];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const todayTasks = mockTasks.filter((t) => t.due === TODAY && t.status !== "overdue");
  const upcomingTasks = mockTasks.filter((t) => t.status === "pending" && t.due !== TODAY);
  const overdueTasks = mockTasks.filter((t) => t.status === "overdue");
  const aiTasks = mockTasks.filter((t) => t.aiGenerated);

  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter((t) => t.status === "completed").length;
  const overdueCount = overdueTasks.length;
  const aiCount = aiTasks.length;
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {totalTasks} tasks &middot; {overdueCount} overdue
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Generate Tasks
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* AI Task Generation Panel */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-violet-600" />
          <p className="font-semibold text-sm text-gray-900">AI Task Recommendations</p>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Pipelly automatically generates recommended actions based on your pipeline and lead activity.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {["Prioritize tasks", "Generate from pipeline", "Auto-create follow-ups"].map((action) => (
            <button
              key={action}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors relative",
              activeTab === tab
                ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1 min-w-0">
          {(activeTab === "All" || activeTab === "Today") && (
            <TaskList tasks={todayTasks} title="Today" />
          )}
          {(activeTab === "All" || activeTab === "Upcoming") && (
            <TaskList tasks={upcomingTasks} title="Upcoming" />
          )}
          {(activeTab === "All" || activeTab === "Overdue") && (
            <TaskList tasks={overdueTasks} title="Overdue" />
          )}
          {activeTab === "AI Recommended" && (
            <TaskList tasks={aiTasks} title="AI Recommended" />
          )}
        </div>

        {/* Right Column */}
        <div className="w-72 flex-shrink-0">
          {/* Stats Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-4">Task Summary</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Total", value: totalTasks },
                { label: "Completed", value: completedTasks },
                { label: "Overdue", value: overdueCount },
                { label: "AI Generated", value: aiCount },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs text-gray-500">Completion</p>
                <p className="text-xs font-medium text-gray-900">{completionPct}%</p>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full transition-all"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Actions Card */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <p className="text-sm font-semibold text-gray-900">AI Suggested Actions</p>
            </div>
            <div className="flex flex-col gap-3">
              {AI_SUGGESTIONS.map((suggestion) => (
                <div key={suggestion} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700">{suggestion}</p>
                    <button className="text-xs font-medium text-blue-600 hover:underline underline-offset-2 mt-0.5">
                      Create Task
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
