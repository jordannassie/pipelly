"use client";

import { useState } from "react";
import { Plus, Sparkles, LayoutTemplate, CheckCircle2 } from "lucide-react";
import { mockAutomations } from "@/lib/mock-data";
import { AutomationCard } from "@/components/automations/AutomationCard";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const TABS = ["Templates", "Active", "History"] as const;
type Tab = (typeof TABS)[number];

const INTEGRATIONS = [
  { name: "Zapier", connected: false },
  { name: "Slack", connected: true },
  { name: "Gmail", connected: true },
  { name: "Google Sheets", connected: false },
  { name: "Calendly", connected: true },
  { name: "Stripe", connected: false },
  { name: "HubSpot", connected: false },
  { name: "Airtable", connected: false },
  { name: "Pipedrive", connected: false },
];

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [prompt, setPrompt] = useState("");

  const activeCount = mockAutomations.filter((a) => a.status === "active").length;

  return (
    <div className="p-6">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Automations</h1>
          <p className="text-sm text-gray-500 mt-0.5">{activeCount} active workflows</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 transition-colors">
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            New Automation
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 mb-6 gap-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
            {tab === "Active" && (
              <Badge variant="success" className="ml-1.5">
                {activeCount}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* AI Automation Builder */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 shrink-0">
            <Sparkles className="h-4.5 w-4.5 text-white h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Build an Automation with AI</h2>
            <p className="text-xs text-gray-500 mt-0.5">Describe what you want to automate in plain English</p>
          </div>
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. When a Calendly meeting is booked, move the deal to Demo Scheduled and notify me on Slack'
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors mb-3"
        />
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            <Sparkles className="h-3.5 w-3.5" />
            Generate Automation
          </button>
          <span className="text-xs text-gray-400">or</span>
          <button className="text-xs font-medium text-blue-600 hover:underline underline-offset-2">
            Browse Templates
          </button>
        </div>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {mockAutomations.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}
      </div>

      {/* Integrations Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Connected Integrations</h2>
        <div className="flex flex-wrap gap-3">
          {INTEGRATIONS.map((integration) => (
            <div
              key={integration.name}
              className="rounded-xl border border-gray-200 bg-white p-4 flex items-center gap-3 w-48"
            >
              <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-gray-600">
                  {integration.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{integration.name}</p>
                {integration.connected ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">Connected</span>
                  </div>
                ) : (
                  <button className="text-xs text-blue-600 font-medium hover:underline underline-offset-2 mt-0.5">
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
