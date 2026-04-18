import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value}`;
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return `${value}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return formatDate(date);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600 bg-emerald-50";
  if (score >= 60) return "text-amber-600 bg-amber-50";
  if (score >= 40) return "text-orange-600 bg-orange-50";
  return "text-red-600 bg-red-50";
}

export function healthColor(health: "excellent" | "good" | "fair" | "poor") {
  const map = {
    excellent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    good: "text-blue-600 bg-blue-50 border-blue-200",
    fair: "text-amber-600 bg-amber-50 border-amber-200",
    poor: "text-red-600 bg-red-50 border-red-200",
  };
  return map[health];
}

export function statusColor(status: string) {
  const map: Record<string, string> = {
    new: "text-blue-600 bg-blue-50",
    contacted: "text-violet-600 bg-violet-50",
    qualified: "text-emerald-600 bg-emerald-50",
    unqualified: "text-red-600 bg-red-50",
    nurturing: "text-amber-600 bg-amber-50",
    converted: "text-teal-600 bg-teal-50",
    active: "text-emerald-600 bg-emerald-50",
    paused: "text-amber-600 bg-amber-50",
    draft: "text-gray-600 bg-gray-100",
    sent: "text-blue-600 bg-blue-50",
    won: "text-emerald-600 bg-emerald-50",
    lost: "text-red-600 bg-red-50",
  };
  return map[status] ?? "text-gray-600 bg-gray-100";
}
