import { CheckSquare } from "lucide-react";
import { cn, formatCurrency, formatRelativeDate, getInitials } from "@/lib/utils";
import type { Deal } from "@/lib/types";

interface DealCardProps {
  deal: Deal;
}

function probabilityColor(probability: number): string {
  if (probability >= 75) return "bg-emerald-50 text-emerald-700";
  if (probability >= 50) return "bg-blue-50 text-blue-700";
  if (probability >= 25) return "bg-amber-50 text-amber-700";
  if (probability === 0) return "bg-gray-100 text-gray-500";
  return "bg-orange-50 text-orange-700";
}

export function DealCard({ deal }: DealCardProps) {
  const visibleTags = deal.tags.slice(0, 2);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all">
      {/* Top row: company + value */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-semibold text-sm text-gray-900 leading-snug">{deal.company}</span>
        <span className="font-semibold text-sm text-gray-900 whitespace-nowrap">{formatCurrency(deal.value)}</span>
      </div>

      {/* Contact + probability */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">{deal.contact}</span>
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", probabilityColor(deal.probability))}>
          {deal.probability}%
        </span>
      </div>

      {/* Next task */}
      {deal.nextTask && (
        <div className="flex items-center gap-1.5 mb-3">
          <CheckSquare className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500 truncate">{deal.nextTask}</span>
        </div>
      )}

      {/* Tags */}
      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {visibleTags.map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row: owner + due date */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-[10px] font-semibold">
            {getInitials(deal.owner)}
          </div>
          <span className="text-xs text-gray-600">{deal.owner}</span>
        </div>
        <span className="text-xs text-gray-400">{formatRelativeDate(deal.dueDate)}</span>
      </div>
    </div>
  );
}
