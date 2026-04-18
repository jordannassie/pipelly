"use client";

import { Plus } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { DealCard } from "@/components/pipeline/DealCard";
import type { Deal, DealStage } from "@/lib/types";

interface PipelineBoardProps {
  deals: Deal[];
}

const STAGES: DealStage[] = [
  "Qualified",
  "Contact Made",
  "Demo Scheduled",
  "Proposal Made",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

const stageDotColor: Record<DealStage, string> = {
  "Qualified": "bg-blue-400",
  "Contact Made": "bg-violet-400",
  "Demo Scheduled": "bg-amber-400",
  "Proposal Made": "bg-orange-400",
  "Negotiation": "bg-rose-400",
  "Closed Won": "bg-emerald-400",
  "Closed Lost": "bg-gray-400",
};

export function PipelineBoard({ deals }: PipelineBoardProps) {
  const dealsByStage = STAGES.reduce<Record<DealStage, Deal[]>>((acc, stage) => {
    acc[stage] = deals.filter((d) => d.stage === stage);
    return acc;
  }, {} as Record<DealStage, Deal[]>);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STAGES.map((stage) => {
        const stageDeals = dealsByStage[stage];
        const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

        return (
          <div key={stage} className="w-64 flex-shrink-0 flex flex-col">
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className={cn("h-2 w-2 rounded-full flex-shrink-0", stageDotColor[stage])} />
              <span className="text-sm font-semibold text-gray-900 truncate flex-1">{stage}</span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {stageDeals.length}
              </span>
            </div>
            <div className="mb-3 px-1">
              <span className="text-xs text-gray-500 font-medium">{formatCurrency(totalValue)}</span>
            </div>

            {/* Deal cards */}
            <div className="flex flex-col gap-3 flex-1">
              {stageDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>

            {/* Add deal */}
            <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 py-2.5 text-xs font-medium text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Add deal
            </button>
          </div>
        );
      })}
    </div>
  );
}
