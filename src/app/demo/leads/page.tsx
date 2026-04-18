"use client";

import { useState } from "react";
import { Search, Sparkles, PenLine, Upload, Plus } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";
import { LeadTable } from "@/components/leads/LeadTable";
import type { LeadStatus } from "@/lib/types";
import { useAICopilot } from "@/lib/ai-copilot-context";

const SEGMENT_TABS: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All Leads", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Nurturing", value: "nurturing" },
];

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<LeadStatus | "all">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const { openWithQuery } = useAICopilot();

  const filtered = mockLeads.filter((lead) => {
    const matchSearch =
      search === "" ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" || lead.status === activeTab;
    const matchStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchSource = sourceFilter === "all" || lead.source === sourceFilter;
    const matchOwner = ownerFilter === "all" || lead.owner === ownerFilter;
    return matchSearch && matchTab && matchStatus && matchSource && matchOwner;
  });

  return (
    <div className="p-6">
      {/* Top row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">312 total leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="nurturing">Nurturing</option>
          <option value="unqualified">Unqualified</option>
          <option value="converted">Converted</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer"
        >
          <option value="all">All Sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Cold Email">Cold Email</option>
          <option value="Referral">Referral</option>
          <option value="Website">Website</option>
          <option value="Ads">Ads</option>
          <option value="Organic">Organic</option>
        </select>

        <select
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer"
        >
          <option value="all">All Owners</option>
          <option value="Jordan N.">Jordan N.</option>
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => openWithQuery("Score all leads with AI and rank by intent")}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-violet-500" />
            Score with AI
          </button>
          <button
            onClick={() => openWithQuery("Draft outreach for top leads")}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-colors"
          >
            <PenLine className="h-4 w-4" />
            Draft Outreach
          </button>
        </div>
      </div>

      {/* Segment tabs */}
      <div className="flex border-b border-gray-200 mb-5 gap-0">
        {SEGMENT_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={
              activeTab === tab.value
                ? "px-4 py-2.5 text-sm font-semibold text-gray-900 border-b-2 border-gray-900 -mb-px transition-colors"
                : "px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent -mb-px transition-colors"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <LeadTable leads={filtered} />

      {/* AI Actions footer */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">AI Lead Actions</span>
          <span className="text-xs text-gray-400">— click any action to run it</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Score with AI", desc: "Rank leads by intent and fit", query: "Score all leads with AI and rank by intent" },
            { label: "Segment with AI", desc: "Group by industry and signals", query: "Draft outreach for top leads" },
            { label: "Draft Outreach", desc: "Write personalized cold emails", query: "Draft outreach for top leads" },
            { label: "Generate Tasks", desc: "Create follow-up action items", query: "Generate follow-up tasks from my leads" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => openWithQuery(action.query)}
              className="flex flex-col items-start rounded-xl border border-gray-200 bg-gray-50 p-4 text-left hover:border-gray-900 hover:bg-white transition-all group"
            >
              <span className="text-sm font-semibold text-gray-900 group-hover:text-gray-900 mb-1">{action.label}</span>
              <span className="text-xs text-gray-400">{action.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
