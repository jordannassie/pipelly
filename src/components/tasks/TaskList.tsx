"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Task } from "@/lib/types";

interface TaskListProps {
  tasks: Task[];
  title: string;
}

const PRIORITY_VARIANT: Record<Task["priority"], "danger" | "warning" | "default"> = {
  high: "danger",
  medium: "warning",
  low: "default",
};

const TYPE_LABEL: Record<Task["type"], string> = {
  "follow-up": "Follow-up",
  review: "Review",
  outreach: "Outreach",
  admin: "Admin",
  call: "Call",
};

export function TaskList({ tasks, title }: TaskListProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
        {title}
      </p>
      <div className="rounded-xl border border-gray-200 bg-white px-4">
        {tasks.map((task) => {
          const isCompleted = task.status === "completed";
          const isOverdue = task.status === "overdue";

          return (
            <div
              key={task.id}
              className="flex items-start gap-3 py-3.5 border-b border-gray-100 last:border-0"
            >
              {/* Checkbox */}
              <button
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-gray-300 bg-white hover:border-gray-400"
                )}
                aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
              >
                {isCompleted && (
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium text-gray-900", isCompleted && "line-through text-gray-400")}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>

                {/* Footer row */}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] border rounded-full px-2 py-0.5 text-gray-500">
                    {task.workspace}
                  </span>
                  <span className="text-xs text-gray-400">{task.due}</span>
                  <Badge variant="outline" className="text-[10px] py-0">
                    {TYPE_LABEL[task.type]}
                  </Badge>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                {task.aiGenerated && (
                  <span
                    className="flex items-center gap-1 text-[10px] font-medium text-violet-500"
                    title="AI Generated"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    AI
                  </span>
                )}
                {isOverdue && (
                  <Badge variant="danger">Overdue</Badge>
                )}
                <Badge variant={PRIORITY_VARIANT[task.priority]}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
