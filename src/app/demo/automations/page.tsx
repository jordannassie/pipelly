"use client";

import { useState } from "react";
import { Plus, Sparkles, LayoutTemplate, CheckCircle2, ArrowRight, Zap, AlertTriangle } from "lucide-react";
import { mockAutomations } from "@/lib/mock-data";
import { AutomationCard } from "@/components/automations/AutomationCard";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const TABS = ["Templates", "Active", "History"] as const;
type Tab = (typeof TABS)[number];

const INTEGRATIONS = [
  { name: "Zapier",        connected: false, abbr: "ZP", desc: "Connect 5,000+ apps" },
  { name: "Slack",         connected: true,  abbr: "SL", desc: "Team notifications" },
  { name: "Gmail",         connected: true,  abbr: "GM", desc: "Email tracking & send" },
  { name: "Google Sheets", connected: false, abbr: "GS", desc: "Auto-sync lead data" },
  { name: "Calendly",      connected: true,  abbr: "CA", desc: "Meeting → deal trigger" },
  { name: "Stripe",        connected: false, abbr: "ST", desc: "Payment triggers" },
  { name: "HubSpot",       connected: false, abbr: "HS", desc: "CRM sync" },
  { name: "Airtable",      connected: false, abbr: "AT", desc: "Database automation" },
  { name: "Pipedrive",     connected: false, abbr: "PD", desc: "Pipeline migration" },
];

// Mock AI-generated automation output
const AI_AUTOMATION_PREVIEW = {
  name: "Calendly → Deal Moved + Slack Alert",
  trigger: "Calendly meeting booked",
  steps: [
    { action: "Find deal matching invitee email", detail: "Matches lead email against open pipeline" },
    { action: "Move deal to 'Demo Scheduled'", detail: "Updates deal stage automatically" },
    { action: "Create follow-up task", detail: "Due 1 day before the meeting" },
    { action: "Post to #sales-alerts on Slack", detail: "Notifies the team with deal details" },
  ],
  impact: "Estimated to save 15 min/day · Affects ~6 deals/week",
};

const TEMPLATE_CARDS = [
  {
    name: "Lead Score → Priority Tag",
    desc: "When AI scores a lead above 80, automatically tag it as High Priority and notify the owner.",
    trigger: "Lead score ≥ 80",
    action: "Tag + notify",
    category: "Leads",
    impact: "Saves 20 min/day",
  },
  {
    name: "Deal Won → Client Workspace",
    desc: "Automatically create a new client workspace with onboarding tasks when a deal is marked Closed Won.",
    trigger: "Deal = Closed Won",
    action: "Create workspace",
    category: "Workspaces",
    impact: "Eliminates manual setup",
  },
  {
    name: "Weekly Pipeline Digest",
    desc: "Send a weekly AI-generated pipeline summary to the team every Monday morning.",
    trigger: "Every Monday 9AM",
    action: "Send Slack + email",
    category: "Reports",
    impact: "Always informed",
  },
  {
    name: "Proposal Sent → Follow-up Sequence",
    desc: "When a proposal is sent, automatically start a 3-email follow-up sequence if no reply in 2 days.",
    trigger: "Proposal sent",
    action: "Email sequence",
    category: "Outreach",
    impact: "Saves 10 min/deal",
  },
];

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const activeCount = mockAutomations.filter((a) => a.status === "active").length;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1400);
  };

  return (
    <div className="p-6">

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Automations</h1>
          <p className="text-sm text-gray-500 mt-0.5">{activeCount} active · 214 actions run this month</p>
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
      <div className="flex items-center border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
            {tab === "Active" && <Badge variant="success" className="ml-1.5">{activeCount}</Badge>}
          </button>
        ))}
      </div>

      {/* AI Automation Builder */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900">Build an Automation with AI</h2>
            <p className="text-xs text-gray-500 mt-0.5">Describe what you want to automate in plain English — Pipelly handles the rest</p>
          </div>
        </div>

        <input
          type="text"
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); setGenerated(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="e.g. When a Calendly meeting is booked, move the deal to Demo Scheduled and notify me on Slack"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-900 transition-colors mb-3"
        />

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {generating ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Generate Automation
              </>
            )}
          </button>
          <span className="text-xs text-gray-400">or</span>
          <button
            onClick={() => setActiveTab("Templates")}
            className="text-xs font-medium text-blue-600 hover:underline underline-offset-2"
          >
            Browse Templates
          </button>
        </div>

        {/* AI-generated automation preview */}
        {generated && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">Automation Generated</span>
              </div>
              <span className="text-xs text-emerald-600 bg-emerald-100 border border-emerald-200 rounded-full px-2.5 py-1 font-medium">Preview</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-3">{AI_AUTOMATION_PREVIEW.name}</p>
            <div className="flex flex-col gap-2 mb-3">
              {AI_AUTOMATION_PREVIEW.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{step.action}</span>
                    <span className="text-xs text-gray-500"> — {step.detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-medium">{AI_AUTOMATION_PREVIEW.impact}</span>
              <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
                <Zap className="h-3.5 w-3.5" />
                Activate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Prompt suggestions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "When a lead replies, create a task",
          "Follow up 5 days after no reply",
          "Notify Slack when a proposal is sent",
          "Move deal to Won when invoice is paid",
        ].map((s) => (
          <button
            key={s}
            onClick={() => { setPrompt(s); setGenerated(false); }}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
          >
            <ArrowRight className="h-3 w-3" />
            {s}
          </button>
        ))}
      </div>

      {/* Automations Grid */}
      {activeTab === "Active" && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {mockAutomations.map((automation) => (
            <AutomationCard key={automation.id} automation={automation} />
          ))}
        </div>
      )}

      {/* Templates tab */}
      {activeTab === "Templates" && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {TEMPLATE_CARDS.map((t) => (
            <div key={t.name} className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <Badge variant="default">{t.category}</Badge>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{t.desc}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-lg bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 text-xs font-medium">{t.trigger}</span>
                <ArrowRight className="h-3 w-3 text-gray-400" />
                <span className="rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 text-xs font-medium">{t.action}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-medium">{t.impact}</span>
                <button className="flex items-center gap-1 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
                  <Zap className="h-3 w-3" />
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History tab */}
      {activeTab === "History" && (
        <div className="rounded-xl border border-gray-200 bg-white mb-8 divide-y divide-gray-100">
          {[
            { name: "Calendly → Move to Booked", time: "Today 10:22 AM", result: "Deal moved: FlowState Agency", status: "success" },
            { name: "5-Day No Reply Follow-up", time: "Today 9:15 AM", result: "Email sent to 3 leads", status: "success" },
            { name: "Lead Reply → Create Task", time: "Yesterday 4:44 PM", result: "Task created for Jordan N.", status: "success" },
            { name: "Stalled Deal Notification", time: "Yesterday 9:00 AM", result: "Notification failed — owner email missing", status: "error" },
            { name: "New Lead → Google Sheets Sync", time: "Yesterday 8:31 AM", result: "47 leads synced to sheet", status: "success" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5">
              <div className={cn("flex h-6 w-6 items-center justify-center rounded-full shrink-0", row.status === "success" ? "bg-emerald-100" : "bg-red-100")}>
                {row.status === "success" ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{row.name}</p>
                <p className="text-xs text-gray-500">{row.result}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{row.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Integrations */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Connected Integrations</h2>
        <div className="flex flex-wrap gap-3">
          {INTEGRATIONS.map((integration) => (
            <div key={integration.name} className={cn("rounded-xl border bg-white p-4 flex items-center gap-3 w-52 hover:border-gray-300 transition-colors", integration.connected ? "border-gray-200" : "border-gray-200")}>
              <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                <span className="text-xs font-bold text-gray-600">{integration.abbr}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900">{integration.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{integration.desc}</p>
                {integration.connected ? (
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-medium">Connected</span>
                  </div>
                ) : (
                  <button className="text-[10px] text-blue-600 font-medium hover:underline underline-offset-2 mt-1">
                    Connect →
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
