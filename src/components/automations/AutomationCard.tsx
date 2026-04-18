import { ArrowRight, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeDate } from "@/lib/utils";
import type { Automation } from "@/lib/types";

interface AutomationCardProps {
  automation: Automation;
}

const STATUS_VARIANT: Record<Automation["status"], "success" | "warning" | "default"> = {
  active: "success",
  paused: "warning",
  draft: "default",
};

export function AutomationCard({ automation }: AutomationCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-sm transition-all">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-sm font-semibold text-gray-900 truncate">{automation.name}</span>
        <Badge variant={STATUS_VARIANT[automation.status]} className="capitalize shrink-0">
          {automation.status}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{automation.description}</p>

      {/* Trigger → Action */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="bg-blue-50 text-blue-700 rounded-lg px-2 py-1 text-xs font-medium">
          Trigger: {automation.trigger}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
        <span className="bg-emerald-50 text-emerald-700 rounded-lg px-2 py-1 text-xs font-medium">
          Action: {automation.action}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {automation.runs.toLocaleString()} runs
          </span>
          <span className="text-xs text-gray-400">
            Last run: {automation.lastRun === "—" ? "—" : formatRelativeDate(automation.lastRun)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle switch */}
          <button
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0"
            style={{ backgroundColor: automation.status === "active" ? "#111827" : "#d1d5db" }}
            aria-label="Toggle automation"
          >
            <span
              className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform"
              style={{ transform: automation.status === "active" ? "translateX(18px)" : "translateX(2px)" }}
            />
          </button>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
