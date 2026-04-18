"use client";

import { useState } from "react";
import { Search, Plus, Sparkles, Phone, MessageSquare, ChevronRight } from "lucide-react";
import { mockLiteLeads, type LiteLeadStatus, type LiteLead } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAICopilot } from "@/lib/ai-copilot-context";
import Link from "next/link";

const STATUSES: { value: LiteLeadStatus | "all"; label: string }[] = [
  { value: "all",        label: "All Leads" },
  { value: "new",        label: "New" },
  { value: "contacted",  label: "Contacted" },
  { value: "quote-sent", label: "Quote Sent" },
  { value: "booked",     label: "Booked" },
  { value: "closed",     label: "Closed" },
];

const STATUS_STYLE: Record<string, { label: string; color: string }> = {
  "new":        { label: "New",        color: "bg-blue-50 text-blue-700" },
  "contacted":  { label: "Contacted",  color: "bg-amber-50 text-amber-700" },
  "quote-sent": { label: "Quote Sent", color: "bg-violet-50 text-violet-700" },
  "booked":     { label: "Booked",     color: "bg-emerald-50 text-emerald-700" },
  "closed":     { label: "Closed",     color: "bg-gray-100 text-gray-500" },
};

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LiteLeadStatus | "all">("all");
  const { openWithQuery } = useAICopilot();

  const filtered = mockLiteLeads.filter((lead) => {
    const matchSearch =
      !search ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.service.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    const matchStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-full bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="text-sm text-gray-500 mt-1">{filtered.length} leads</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, service, or phone..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none shadow-sm transition-colors"
            />
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            {STATUSES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                  statusFilter === value
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* AI actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: "Who needs a follow-up?",    query: "Who do I need to follow up with today?" },
            { label: "Show my hottest leads",      query: "Show my hottest leads" },
            { label: "Write a text for a lead",   query: "Write a text reply for my top lead" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => openWithQuery(a.query)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-gray-400" />
              {a.label}
            </button>
          ))}
        </div>

        {/* Leads list */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-gray-500 font-medium mb-1">No leads found</p>
              <p className="text-sm text-gray-400">Try a different search or filter</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {/* Table header */}
              <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 items-center px-5 py-3 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <span>Name</span>
                <span>Service Need</span>
                <span>Status</span>
                <span>Last Contact</span>
                <span />
              </div>

              {/* Rows */}
              {filtered.map((lead) => (
                <LeadRow key={lead.id} lead={lead} openWithQuery={openWithQuery} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom AI nudge */}
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
          <Sparkles className="h-4 w-4 text-gray-400" />
          <p className="text-sm text-gray-600 flex-1">
            <span className="font-semibold text-gray-900">AI tip:</span> 3 leads haven&apos;t been contacted in 5+ days. Want AI to write follow-up texts?
          </p>
          <button
            onClick={() => openWithQuery("Write follow-up texts for leads with no contact in 5 days")}
            className="shrink-0 flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
          >
            Write texts
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}

function LeadRow({ lead, openWithQuery }: { lead: LiteLead; openWithQuery: (q: string) => void }) {
  const st = STATUS_STYLE[lead.status];
  return (
    <div className="group grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 hover:bg-gray-50 transition-colors">
      {/* Name + phone */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
          {lead.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{lead.phone}</p>
        </div>
      </div>

      {/* Service */}
      <p className="text-sm text-gray-700 truncate">{lead.service}</p>

      {/* Status */}
      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium w-fit", st.color)}>
        {st.label}
      </span>

      {/* Last contact */}
      <p className="text-sm text-gray-500">{lead.lastContact}</p>

      {/* Actions */}
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => openWithQuery(`Write a text reply for ${lead.name} about ${lead.service}`)}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <Sparkles className="h-3 w-3 text-gray-400" />
          Text
        </button>
        <Link
          href="/demo/messages"
          className="flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </Link>
        <a
          href={`tel:${lead.phone}`}
          className="flex items-center justify-center rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
