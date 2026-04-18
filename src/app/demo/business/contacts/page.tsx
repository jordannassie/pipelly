"use client";

import { mockLiteLeads } from "@/lib/mock-data";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { Search, Plus, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  "new":        "bg-blue-50 text-blue-700 border-blue-200",
  "contacted":  "bg-amber-50 text-amber-700 border-amber-200",
  "quote-sent": "bg-violet-50 text-violet-700 border-violet-200",
  "booked":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "closed":     "bg-gray-100 text-gray-600 border-gray-200",
};

const STATUS_LABELS: Record<string, string> = {
  "new":        "New Lead",
  "contacted":  "Contacted",
  "quote-sent": "Quote Sent",
  "booked":     "Booked",
  "closed":     "Closed",
};

export default function BusinessContactsPage() {
  const { openWithQuery } = useAICopilot();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Contacts</h1>
            <p className="text-sm text-gray-500 mt-0.5">All your customers and leads in one place.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWithQuery("Find a contact")}
              className="h-9 px-4 text-xs font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI Search
            </button>
            <button className="h-9 px-4 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Contact
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            placeholder="Search contacts…"
            className="w-full h-9 pl-9 pr-3 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 shadow-sm"
          />
        </div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLiteLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                  {lead.name[0]}
                </div>
                <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full border", STATUS_STYLES[lead.status])}>
                  {STATUS_LABELS[lead.status] ?? lead.status}
                </span>
              </div>

              <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{lead.service}</p>

              <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
                <Phone className="h-3 w-3" />
                {lead.phone}
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">Last contact: {lead.lastContact}</span>
                <button
                  onClick={() => openWithQuery(`Draft a follow-up for ${lead.name}`)}
                  className="ml-auto text-[11px] font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3" /> Follow up
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
