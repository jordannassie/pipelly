"use client";

import { useState } from "react";
import { Sparkles, Plus, Search, ChevronDown } from "lucide-react";
import { WorkspaceCard } from "@/components/workspaces/WorkspaceCard";
import { mockWorkspaces } from "@/lib/mock-data";

export default function WorkspacesPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [search, setSearch] = useState("");

  const totalLeads = mockWorkspaces.reduce((sum, ws) => sum + ws.leads, 0);
  const totalCalls = mockWorkspaces.reduce((sum, ws) => sum + ws.bookedCalls, 0);
  const avgHealth = Math.round(
    (mockWorkspaces.filter((ws) => ws.health === "excellent").length * 100 +
      mockWorkspaces.filter((ws) => ws.health === "good").length * 75 +
      mockWorkspaces.filter((ws) => ws.health === "fair").length * 50 +
      mockWorkspaces.filter((ws) => ws.health === "poor").length * 25) /
      mockWorkspaces.length
  );

  const filtered = mockWorkspaces.filter((ws) =>
    ws.name.toLowerCase().includes(search.toLowerCase()) ||
    ws.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Top bar */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Client Workspaces</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and monitor all client acquisition systems
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" />
          New Workspace
        </button>
      </div>

      {/* AI Workspace Builder */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Create a New Client Workspace with AI</p>
            <p className="text-xs text-gray-500 mt-0.5">Pipelly will create a new client workspace and prepare a recommended acquisition setup.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Enter workspace name"
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:bg-white transition-colors"
          />
          <button className="shrink-0 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            Create Workspace
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Apex Growth",
            "Northstar Media",
            "Elevate Roofing",
            "BluePeak Digital",
            "Summit Advisory",
          ].map((s) => (
            <button
              key={s}
              onClick={() => setAiPrompt(s)}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workspaces..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:border-gray-300 transition-colors">
          All Industries
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:border-gray-300 transition-colors">
          All Health
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 hover:border-gray-300 transition-colors">
          Sort by
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Workspace grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {filtered.map((ws) => (
          <WorkspaceCard key={ws.id} workspace={ws} />
        ))}
      </div>

      {/* Bottom stats bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">Total Workspaces</p>
          <p className="text-sm font-semibold text-gray-900">
            {mockWorkspaces.length}
          </p>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">Total Leads</p>
          <p className="text-sm font-semibold text-gray-900">{totalLeads}</p>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">Total Booked Calls</p>
          <p className="text-sm font-semibold text-gray-900">{totalCalls}</p>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">Avg Health Score</p>
          <p className="text-sm font-semibold text-gray-900">{avgHealth}%</p>
        </div>
      </div>
    </div>
  );
}
