"use client";

import { mockAgencyBusinesses } from "@/lib/mock-data";
import { Building2, CheckCircle2, Clock, AlertCircle, Loader2, Plus, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HEALTH_STYLES: Record<string, string> = {
  excellent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  good:      "bg-blue-50 text-blue-700 border-blue-200",
  fair:      "bg-amber-50 text-amber-700 border-amber-200",
  poor:      "bg-red-50 text-red-700 border-red-200",
};

const STATUS_STYLES: Record<string, string> = {
  "launched":        "bg-emerald-50 text-emerald-700 border-emerald-200",
  "in-progress":     "bg-blue-50 text-blue-700 border-blue-200",
  "waiting":         "bg-amber-50 text-amber-700 border-amber-200",
  "needs-attention": "bg-red-50 text-red-700 border-red-200",
};

const STATUS_ICON = {
  "launched":         <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
  "in-progress":      <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />,
  "waiting":          <Clock className="h-3.5 w-3.5 text-amber-500" />,
  "needs-attention":  <AlertCircle className="h-3.5 w-3.5 text-red-500" />,
};

export default function AgencyClientsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Clients</h1>
            <p className="text-sm text-gray-500 mt-0.5">All business workspaces managed by your agency.</p>
          </div>
          <Link
            href="/demo/agency/setup"
            className="h-9 px-4 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Business
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              placeholder="Search businesses…"
              className="w-full h-8 pl-8 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {["All", "Launched", "In Progress", "Waiting", "Needs Attention"].map((f) => (
              <button
                key={f}
                className={cn(
                  "h-7 px-3 text-xs rounded-lg border transition-colors",
                  f === "All"
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Business</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Admin User</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Setup Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Health</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Last Activity</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAgencyBusinesses.map((biz) => (
                <tr key={biz.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{biz.name}</p>
                        <p className="text-xs text-gray-400">{biz.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-700">{biz.adminUser}</p>
                    <p className="text-xs text-gray-400">{biz.adminEmail}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border", STATUS_STYLES[biz.setupStatus])}>
                      {STATUS_ICON[biz.setupStatus]}
                      <span className="capitalize">{biz.setupStatus.replace("-", " ")}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full border capitalize", HEALTH_STYLES[biz.health])}>
                      {biz.health}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-400">{biz.lastActivity}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">Manage User</button>
                      <button className="h-7 px-3 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-1">
                        Open <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
