import { MoreHorizontal, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Workspace } from "@/lib/types";
import { cn, healthColor, formatCurrency, formatRelativeDate, getInitials } from "@/lib/utils";

interface WorkspaceCardProps {
  workspace: Workspace;
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1 w-full rounded-full bg-gray-100 overflow-hidden">
      <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

const HEALTH_BAR: Record<string, { pct: number; color: string; trend: "up" | "down" }> = {
  excellent: { pct: 95, color: "bg-emerald-500", trend: "up" },
  good:      { pct: 72, color: "bg-blue-500",    trend: "up" },
  fair:      { pct: 48, color: "bg-amber-400",   trend: "down" },
  poor:      { pct: 24, color: "bg-red-400",     trend: "down" },
};

const AI_SIGNALS: Record<string, string> = {
  excellent: "Strong pipeline velocity — AI recommends scaling outreach",
  good:      "Healthy conversion rate — consider adding an automation",
  fair:      "Booked call rate is below target — review outreach cadence",
  poor:      "Needs immediate attention — AI has 3 recommendations ready",
};

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const { name, industry, health, leads, bookedCalls, activeCampaigns, revenue, lastUpdated, color } = workspace;
  const bar = HEALTH_BAR[health] ?? HEALTH_BAR.good;
  const convRate = leads > 0 ? Math.round((bookedCalls / leads) * 100) : 0;
  const aiSignal = AI_SIGNALS[health] ?? "";
  const TrendIcon = bar.trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-4 hover:border-gray-300 hover:shadow-sm transition-all">

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white", color)}>
            {getInitials(name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{industry}</p>
          </div>
        </div>
        <Badge className={cn("capitalize border shrink-0 text-[10px]", healthColor(health))}>
          {health}
        </Badge>
      </div>

      {/* Health bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Workspace Health</span>
          <div className={cn("flex items-center gap-0.5 text-[10px] font-semibold", bar.trend === "up" ? "text-emerald-600" : "text-red-500")}>
            <TrendIcon className="h-3 w-3" />
            {bar.pct}%
          </div>
        </div>
        <MiniBar pct={bar.pct} color={bar.color} />
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-[10px] text-gray-400 mb-0.5">Leads</p>
          <p className="text-lg font-bold text-gray-900">{leads}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 mb-0.5">Booked Calls</p>
          <p className="text-lg font-bold text-gray-900">{bookedCalls}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 mb-0.5">Conv. Rate</p>
          <p className="text-lg font-bold text-gray-900">{convRate}%</p>
        </div>
      </div>

      {/* Revenue + campaigns */}
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5">
          <p className="text-[10px] text-gray-400 mb-0.5">Revenue Influenced</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(revenue)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5 text-center">
          <p className="text-[10px] text-gray-400 mb-0.5">Campaigns</p>
          <p className="text-sm font-bold text-gray-900">{activeCampaigns}</p>
        </div>
      </div>

      {/* AI signal */}
      <div className="flex items-start gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5">
        <Sparkles className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
        <p className="text-xs text-gray-600 leading-snug">{aiSignal}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">Updated {formatRelativeDate(lastUpdated)}</p>
        <div className="flex items-center gap-1.5">
          <button className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors">
            Open
          </button>
          <button className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors">
            Launch Setup
          </button>
          <button className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
