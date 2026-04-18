"use client";

import { useState } from "react";
import { Sparkles, Download, ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockKPIs, mockFunnelData, mockTrendData, mockWorkspacePerformance } from "@/lib/mock-data";
import { KPIStatCard } from "@/components/ui/KPIStatCard";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, cn } from "@/lib/utils";

const DATE_TABS = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom"] as const;
type DateTab = (typeof DATE_TABS)[number];

const AI_INSIGHTS = [
  "Lead volume is up 18% month-over-month — highest since Q3 2025.",
  "Booked calls dropped 3% — recommend reviewing your Calendly sequence timing.",
  "Elevate Roofing is your top-performing workspace by revenue ($72k influenced).",
];

const REPLY_RATES: Record<string, string> = {
  "Apex Growth": "31%",
  Northstar: "22%",
  Elevate: "28%",
  BrightPath: "19%",
  Solaris: "14%",
};

const WORKSPACE_HEALTH: Record<string, "success" | "warning" | "danger"> = {
  "Apex Growth": "success",
  Northstar: "success",
  Elevate: "success",
  BrightPath: "warning",
  Solaris: "danger",
};

export default function AnalyticsPage() {
  const [activeDateTab, setActiveDateTab] = useState<DateTab>("Last 30 days");

  return (
    <div className="p-6">
      {/* Top row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors">
            April 2026
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {mockKPIs.map((kpi) => (
          <KPIStatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Date range tabs */}
      <div className="flex items-center gap-0 border-b border-gray-200 mb-6">
        {DATE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveDateTab(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeDateTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Lead & Booking Trends — 2/3 */}
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="text-sm font-semibold text-gray-900">Lead & Booking Trends</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block" />
                <span className="text-xs text-gray-500">Leads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="text-xs text-gray-500">Booked Calls</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockTrendData} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                cursor={{ stroke: "#e5e7eb" }}
              />
              <Area type="monotone" dataKey="leads" stroke="#1d4ed8" fill="#dbeafe" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="calls" stroke="#059669" fill="#d1fae5" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Funnel — 1/3 */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Lead Funnel</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={mockFunnelData}
              layout="vertical"
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                cursor={{ fill: "#f9fafb" }}
              />
              <Bar dataKey="count" fill="#1f2937" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workspace Performance Table */}
      <div className="rounded-xl border border-gray-200 bg-white mb-5 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Workspace Performance</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["Workspace", "Leads", "Booked Calls", "Revenue", "Reply Rate", "Status"].map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockWorkspacePerformance.map((ws) => (
              <tr key={ws.name} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{ws.name}</td>
                <td className="px-5 py-3.5 text-sm text-gray-700">{ws.leads}</td>
                <td className="px-5 py-3.5 text-sm text-gray-700">{ws.calls}</td>
                <td className="px-5 py-3.5 text-sm text-gray-700">{formatCurrency(ws.revenue)}</td>
                <td className="px-5 py-3.5 text-sm text-gray-700">{REPLY_RATES[ws.name] ?? "—"}</td>
                <td className="px-5 py-3.5">
                  <Badge variant={WORKSPACE_HEALTH[ws.name] ?? "default"}>
                    {WORKSPACE_HEALTH[ws.name] === "success"
                      ? "Healthy"
                      : WORKSPACE_HEALTH[ws.name] === "warning"
                      ? "Fair"
                      : "Needs Attention"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Insight Panel */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900">AI Analysis</h2>
        </div>
        <div className="flex flex-col gap-2.5 mb-4">
          {AI_INSIGHTS.map((insight) => (
            <div key={insight} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            <Sparkles className="h-3 w-3" />
            Ask AI to explain
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            Get recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
