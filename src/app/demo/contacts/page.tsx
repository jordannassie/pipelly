"use client";

import { useState } from "react";
import { Search, Sparkles, Activity, Mail, Phone, Building2, MapPin, Globe, Link, Plus } from "lucide-react";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { mockContacts } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { cn, getInitials, formatRelativeDate } from "@/lib/utils";
import type { Contact } from "@/lib/types";

type Tab = "activity" | "notes" | "email" | "files";

const TABS: { id: Tab; label: string }[] = [
  { id: "activity", label: "Activity" },
  { id: "notes", label: "Notes" },
  { id: "email", label: "Email" },
  { id: "files", label: "Files" },
];

function labelVariant(label: string): "success" | "violet" | "info" | "default" {
  if (label === "client") return "success";
  if (label === "vip") return "violet";
  if (label === "prospect") return "info";
  return "default";
}

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact>(mockContacts[0]);
  const [activeTab, setActiveTab] = useState<Tab>("activity");
  const { openWithQuery } = useAICopilot();

  const filtered = mockContacts.filter(
    (c) =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full overflow-hidden flex-col md:flex-row">
      {/* Left panel */}
      <div className="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white flex flex-col overflow-hidden max-h-64 md:max-h-none">
        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
            />
          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelected(contact)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50",
                selected.id === contact.id && "bg-gray-50 border-l-2 border-l-gray-900"
              )}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-semibold">
                {getInitials(contact.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">{contact.name}</p>
                <p className="text-xs text-gray-500 truncate">{contact.company}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{formatRelativeDate(contact.lastActivity)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex gap-6 p-6">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* Contact header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-semibold">
                {getInitials(selected.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900">{selected.name}</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {selected.role} &middot; {selected.company}
                </p>
                {selected.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selected.labels.map((label) => (
                      <Badge key={label} variant={labelVariant(label)}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-5">
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Plus className="h-4 w-4" />
                Add Activity
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Plus className="h-4 w-4" />
                Add Note
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Mail className="h-4 w-4" />
                Send Email
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Phone className="h-4 w-4" />
                Schedule Call
              </button>
            </div>

            {/* AI Actions box */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-900">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900">AI Actions</span>
                <span className="text-xs text-gray-400">for {selected.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Summarize contact", desc: "Full AI profile & signals", query: `Summarize contact ${selected.name}` },
                  { label: "Draft follow-up",   desc: "Personalized email draft",  query: `Draft outreach for ${selected.name} at ${selected.company}` },
                  { label: "Generate tasks",    desc: "Create next-step actions",  query: `Generate follow-up tasks for ${selected.name}` },
                  { label: "Recommend automations", desc: "Smart workflow suggestions", query: "Recommend automations for contact management" },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => openWithQuery(action.query)}
                    className="flex flex-col items-start rounded-xl border border-gray-200 bg-gray-50 p-3 text-left hover:border-gray-900 hover:bg-white transition-all"
                  >
                    <span className="text-xs font-semibold text-gray-900 mb-0.5">{action.label}</span>
                    <span className="text-[10px] text-gray-400">{action.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                    activeTab === tab.id
                      ? "text-gray-900 border-gray-900 font-semibold"
                      : "text-gray-500 border-transparent hover:text-gray-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <EmptyState
              icon={Activity}
              title="No activities yet"
              description="Add an activity to track your interactions with this contact."
            />
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
            {/* Summary card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Summary</h3>
              <div className="flex flex-col gap-2.5">
                {selected.labels.length > 0 && (
                  <div className="flex gap-2">
                    <span className="w-20 flex-shrink-0 text-xs text-gray-400">Labels</span>
                    <div className="flex flex-wrap gap-1">
                      {selected.labels.map((label) => (
                        <Badge key={label} variant={labelVariant(label)}>
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Email</span>
                  <a href={`mailto:${selected.email}`} className="text-xs text-gray-700 hover:underline truncate">
                    {selected.email}
                  </a>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Phone</span>
                  <span className="text-xs text-gray-700">{selected.phone}</span>
                </div>
              </div>
            </div>

            {/* Details card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Details</h3>
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">First name</span>
                  <span className="text-xs text-gray-700">{selected.name.split(" ")[0]}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Last name</span>
                  <span className="text-xs text-gray-700">{selected.name.split(" ").slice(1).join(" ")}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Role</span>
                  <span className="text-xs text-gray-700">{selected.role}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Industry</span>
                  <span className="text-xs text-gray-700">{selected.industry}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Owner</span>
                  <span className="text-xs text-gray-700">{selected.owner}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-20 flex-shrink-0 text-xs text-gray-400">Deals</span>
                  <span className="text-xs text-gray-700">{selected.deals}</span>
                </div>
              </div>
            </div>

            {/* Organization card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Organization</h3>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-700">{selected.company}</span>
                </div>
                {selected.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{selected.address}</span>
                  </div>
                )}
                {selected.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <a
                      href={`https://${selected.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-700 hover:underline truncate"
                    >
                      {selected.website}
                    </a>
                  </div>
                )}
                {selected.linkedin && (
                  <div className="flex items-center gap-2">
                    <Link className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <a
                      href={`https://${selected.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-700 hover:underline truncate"
                    >
                      {selected.linkedin}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {selected.notes && (
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Notes</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{selected.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
