import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Workspace } from "@/lib/types";
import {
  cn,
  healthColor,
  formatCurrency,
  formatRelativeDate,
  getInitials,
} from "@/lib/utils";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const {
    name,
    industry,
    health,
    leads,
    bookedCalls,
    activeCampaigns,
    revenue,
    lastUpdated,
    color,
  } = workspace;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white",
              color
            )}
          >
            {getInitials(name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{industry}</p>
          </div>
        </div>
        <Badge
          className={cn("capitalize border shrink-0", healthColor(health))}
        >
          {health}
        </Badge>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Leads</p>
          <p className="text-lg font-bold text-gray-900">{leads}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Booked Calls</p>
          <p className="text-lg font-bold text-gray-900">{bookedCalls}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Campaigns</p>
          <p className="text-lg font-bold text-gray-900">{activeCampaigns}</p>
        </div>
      </div>

      {/* Revenue */}
      <div className="rounded-lg bg-gray-50 px-3 py-2.5 flex items-center justify-between">
        <p className="text-xs text-gray-500">Revenue Influenced</p>
        <p className="text-sm font-semibold text-gray-900">
          {formatCurrency(revenue)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Updated {formatRelativeDate(lastUpdated)}
        </p>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors">
            Open
          </button>
          <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors">
            Launch Setup
          </button>
          <button className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
