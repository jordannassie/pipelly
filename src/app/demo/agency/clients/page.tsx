"use client";

import { useState } from "react";
import {
  Search, Plus, ExternalLink, UserCog, Settings2,
  Building2, ChevronDown,
} from "lucide-react";
import { mockAgencyClients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

const HEALTH_CONFIG: Record<string, { label: string; dot: string; badge: string }> = {
  excellent:      { label: "Excellent",   dot: "bg-emerald-500", badge: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  good:           { label: "Good",        dot: "bg-blue-500",    badge: "text-blue-700 bg-blue-50 border-blue-200" },
  needs_attention:{ label: "Attention",   dot: "bg-amber-500",   badge: "text-amber-700 bg-amber-50 border-amber-200" },
  flagged:        { label: "Flagged",     dot: "bg-red-500",     badge: "text-red-700 bg-red-50 border-red-200" },
};

const SETUP_CONFIG: Record<string, { label: string; badge: string }> = {
  launched:    { label: "Launched",    badge: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  in_progress: { label: "In Progress", badge: "text-blue-700 bg-blue-50 border-blue-200" },
  pending:     { label: "Pending",     badge: "text-amber-700 bg-amber-50 border-amber-200" },
};

export default function AgencyClientsPage() {
  const [search, setSearch] = useState("");
  const [filterHealth, setFilterHealth] = useState("all");

  const filtered = mockAgencyClients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.adminUser.toLowerCase().includes(search.toLowerCase());
    const matchHealth = filterHealth === "all" || c.health === filterHealth;
    return matchSearch && matchHealth;
  });

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Workspaces</h1>
            <p className="text-sm text-gray-500 mt-0.5">{mockAgencyClients.length} businesses managed</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            New Client
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="h-9 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-9 pr-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-gray-400 focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={filterHealth}
              onChange={(e) => setFilterHealth(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-3 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:border-gray-400 focus:outline-none"
            >
              <option value="all">All Health</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="needs_attention">Needs Attention</option>
              <option value="flagged">Flagged</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Business</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin User</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Setup</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Health</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Leads</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Revenue</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Activity</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((client) => {
                const health = HEALTH_CONFIG[client.health];
                const setup = SETUP_CONFIG[client.setupStatus];
                return (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white", client.color)}>
                          {client.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{client.name}</p>
                          <p className="text-xs text-gray-400">{client.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{client.adminUser}</p>
                      <p className="text-xs text-gray-400">{client.adminEmail}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("rounded-full border px-2.5 py-1 text-xs font-medium", setup.badge)}>
                        {setup.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", health.badge)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", health.dot)} />
                        {health.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{client.leads}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(client.revenue)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-400">{client.lastActivity}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <ExternalLink className="h-3 w-3" />
                          Open
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <UserCog className="h-3 w-3" />
                          Users
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <Settings2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12">
              <Building2 className="mb-3 h-8 w-8 text-gray-300" />
              <p className="text-sm text-gray-400">No clients match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
