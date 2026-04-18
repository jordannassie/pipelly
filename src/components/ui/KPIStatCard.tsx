import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KPIStat } from "@/lib/types";

interface KPIStatCardProps extends KPIStat {
  className?: string;
}

export function KPIStatCard({ label, value, change, trend, className }: KPIStatCardProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-5", className)}>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mb-3 text-2xl font-bold text-gray-900">{value}</p>
      <div className={cn("flex items-center gap-1 text-xs font-medium", trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-gray-400")}>
        {trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : trend === "down" ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
        <span>{Math.abs(change)}% vs last month</span>
      </div>
    </div>
  );
}
