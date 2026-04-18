"use client";

import { useState } from "react";
import { mockLiteLeads, type LiteLeadStatus } from "@/lib/mock-data";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { Search, Plus, Sparkles, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterOption = "all" | LiteLeadStatus;

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: "all",        label: "All"          },
  { value: "new",        label: "New Lead"      },
  { value: "contacted",  label: "Contacted"     },
  { value: "quote-sent", label: "Quote Sent"    },
  { value: "booked",     label: "Booked"        },
  { value: "closed",     label: "Closed"        },
];

const STATUS_LABELS: Record<LiteLeadStatus, string> = {
  "new":        "New Lead",
  "contacted":  "Contacted",
  "quote-sent": "Quote Sent",
  "booked":     "Booked",
  "closed":     "Closed",
};

const STATUS_STYLES: Record<LiteLeadStatus, string> = {
  "new":        "bg-blue-50 text-blue-700 border-blue-200",
  "contacted":  "bg-amber-50 text-amber-700 border-amber-200",
  "quote-sent": "bg-violet-50 text-violet-700 border-violet-200",
  "booked":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "closed":     "bg-gray-100 text-gray-600 border-gray-200",
};

export default function BusinessLeadsPage() {
  const { openWithQuery } = useAICopilot();
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [search, setSearch] = useState("");

  const filtered = mockLiteLeads.filter((l) => {
    const matchStatus = activeFilter === "all" || l.status === activeFilter;
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.service.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Leads</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track and manage all incoming leads.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWithQuery("Show my hottest leads")}
              className="h-9 px-4 text-xs font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> Hot Leads
            </button>
            <button
              onClick={() => openWithQuery("Who needs a follow-up today?")}
              className="h-9 px-4 text-xs font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> Follow Ups
            </button>
            <button className="h-9 px-4 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Lead
            </button>
          </div>
        </div>

        {/* AI tip */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
          <p className="text-xs text-blue-700">
            <strong>AI tip:</strong> Dave Mitchell called twice — he may be ready to book.{" "}
            <button
              onClick={() => openWithQuery("Draft a call-back message for Dave Mitchell")}
              className="font-semibold underline hover:no-underline"
            >
              Draft a message
            </button>
          </p>
        </div>

        {/* Search + filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-auto flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads…"
              className="w-full h-8 pl-8 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "h-7 px-3 text-xs rounded-lg border transition-colors",
                  activeFilter === f.value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Service</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Phone</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Last Contact</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Source</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{lead.notes}</p>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{lead.service}</td>
                  <td className="px-4 py-3.5">
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Phone className="h-3 w-3 text-gray-400" />
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full border", STATUS_STYLES[lead.status])}>
                      {STATUS_LABELS[lead.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">{lead.lastContact}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{lead.source}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => openWithQuery(`Draft a follow-up message for ${lead.name}`)}
                      className="text-xs text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
                    >
                      Follow up <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">No leads match this filter.</div>
          )}
        </div>

      </div>
    </div>
  );
}
