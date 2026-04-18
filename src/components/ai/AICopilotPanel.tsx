"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles, X, Send, RotateCcw, ChevronRight, Lightbulb,
  Building2, PenLine, BarChart3, Contact, Zap, CheckSquare,
  Copy, Check, AlertCircle, Clock, CheckCircle2, ArrowRight,
  TrendingUp, TrendingDown, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAICopilot, detectCardType, type AICardType } from "@/lib/ai-copilot-context";

// ── Types ──────────────────────────────────────────────────────────────────
interface AIMessage {
  id: string;
  role: "user" | "ai";
  content?: string;
  card?: AICardType;
  timestamp: Date;
}

// ── Context suggestions per page ───────────────────────────────────────────
const PAGE_SUGGESTIONS: Record<string, { label: string; query: string }[]> = {
  "/demo": [
    { label: "Who needs a follow-up today?",      query: "Who do I need to follow up with today?" },
    { label: "Write a reply for a lead",           query: "Write a text reply for my top lead" },
    { label: "Show my hottest leads",              query: "Show my hottest leads" },
    { label: "What jobs are waiting on me?",       query: "What jobs are waiting on me?" },
  ],
  "/demo/agency": [
    { label: "Analyze pipeline",                   query: "Analyze my pipeline" },
    { label: "Draft outreach",                     query: "Draft outreach for my top leads" },
    { label: "Generate tasks",                     query: "Generate follow-up tasks from my pipeline" },
    { label: "Recommend automations",              query: "Recommend automations for my workflow" },
  ],
  "/demo/client": [
    { label: "Who needs a follow-up today?",       query: "Who do I need to follow up with today?" },
    { label: "Write a reply for a lead",           query: "Write a text reply for my top lead" },
    { label: "Show my hottest leads",              query: "Show my hottest leads" },
    { label: "What jobs are waiting on me?",       query: "What jobs are waiting on me?" },
  ],
  "/demo/leads": [
    { label: "Show my hottest leads",              query: "Show my hottest leads" },
    { label: "Write a follow-up text",             query: "Write a text reply for Jessica Kim about her roof estimate" },
    { label: "Who hasn't been called yet?",        query: "Which leads haven't been contacted yet?" },
    { label: "Which estimates haven't replied?",   query: "Which estimates have not been answered?" },
  ],
  "/demo/messages": [
    { label: "Write a reply for Dave",             query: "Write a text reply for Dave Mitchell about his roof inquiry" },
    { label: "Draft a follow-up for Jessica",      query: "Write a text reply for Jessica Kim about her roof estimate" },
    { label: "Summarize my messages",              query: "Summarize my recent messages" },
    { label: "Who replied today?",                 query: "Who replied to my messages today?" },
  ],
  "/demo/jobs": [
    { label: "Which estimates haven't replied?",   query: "Which estimates have not been answered?" },
    { label: "What jobs are booked this week?",    query: "What jobs are waiting on me?" },
    { label: "Who needs payment collected?",       query: "Generate follow-up tasks for completed jobs" },
    { label: "Follow up on pending estimates",     query: "Draft outreach for leads with unanswered estimates" },
  ],
  "/demo/settings": [
    { label: "Help with notifications",            query: "How do I set up notifications?" },
    { label: "Add a team member",                  query: "How do I invite a team member?" },
    { label: "Explain my plan",                    query: "Explain my current billing plan" },
    { label: "Help with integrations",             query: "What integrations do you support?" },
  ],
  "/demo/pipeline": [
    { label: "Analyze pipeline", query: "Analyze my pipeline" },
    { label: "Generate follow-up tasks", query: "Generate follow-up tasks from my deals" },
    { label: "Draft follow-up emails", query: "Draft outreach for stuck deals" },
    { label: "Recommend automations", query: "Recommend automations for my pipeline" },
  ],
  "/demo/contacts": [
    { label: "Summarize this contact", query: "Summarize contact Marcus Reid" },
    { label: "Draft follow-up", query: "Draft outreach for Marcus Reid" },
    { label: "Generate next steps", query: "Generate follow-up tasks for this contact" },
    { label: "Recommend automations", query: "Recommend automations for contact management" },
  ],
  "/demo/workspaces": [
    { label: "Create workspace", query: "Create a new client workspace for a roofing company in Dallas" },
    { label: "Analyze pipeline", query: "Analyze my pipeline health" },
    { label: "Recommend automations", query: "Recommend automations for my workspaces" },
    { label: "Generate tasks", query: "Generate follow-up tasks" },
  ],
  "/demo/inbox": [
    { label: "Draft outreach reply", query: "Draft outreach reply to Marcus Reid" },
    { label: "Generate follow-up tasks", query: "Generate follow-up tasks from inbox threads" },
    { label: "Summarize contacts", query: "Summarize contact Marcus Reid" },
    { label: "Recommend automations", query: "Recommend automations for inbox" },
  ],
  "/demo/automations": [
    { label: "Recommend automations", query: "Recommend automations for my pipeline" },
    { label: "Analyze pipeline", query: "Analyze my pipeline" },
    { label: "Create workspace", query: "Create a new client workspace" },
    { label: "Generate tasks", query: "Generate follow-up tasks" },
  ],
  "/demo/analytics": [
    { label: "Analyze pipeline", query: "Analyze my pipeline" },
    { label: "Generate tasks from data", query: "Generate follow-up tasks from pipeline" },
    { label: "Recommend automations", query: "Recommend automations based on my data" },
    { label: "Draft outreach", query: "Draft outreach for underperforming segments" },
  ],
  "/demo/tasks": [
    { label: "Generate tasks", query: "Generate follow-up tasks from my pipeline" },
    { label: "Analyze pipeline", query: "Analyze my pipeline" },
    { label: "Draft outreach", query: "Draft outreach for priority leads" },
    { label: "Recommend automations", query: "Recommend automations to reduce manual tasks" },
  ],
};

const PAGE_GREETINGS: Record<string, string> = {
  "/demo":            "Hey Jordan! You have 4 follow-ups due today and 12 new leads. What would you like help with?",
  "/demo/agency":     "I can see your full system. What would you like me to do?",
  "/demo/client":     "Hey Jordan! You have 4 follow-ups due today and 12 new leads. What would you like help with?",
  "/demo/leads":      "I can see your 10 leads. 3 quotes haven't been answered in 5+ days — want me to write follow-up texts?",
  "/demo/messages":   "You have 2 unread messages. Dave Mitchell just asked about roof availability. Want me to draft a reply?",
  "/demo/jobs":       "You have 13 jobs across 6 stages. 3 estimates haven't had a response — should I follow up?",
  "/demo/settings":   "I can help you with notifications, team access, billing, or integrations. What do you need?",
  "/demo/pipeline":   "Your pipeline has $74.3k in 8 open deals. 3 haven't had activity in 7+ days — want me to flag those?",
  "/demo/contacts":   "I can summarize any contact, draft a message, or suggest your next step. Just ask.",
  "/demo/workspaces": "You have 5 active workspaces. Elevate Roofing is your top performer. Want me to analyze or create a new one?",
  "/demo/inbox":      "You have 2 unread threads. Marcus Reid replied to your proposal — that one looks high priority.",
  "/demo/automations":"I can build any automation in plain English — or recommend ones based on your pipeline.",
  "/demo/analytics":  "I've analyzed your last 30 days. Lead volume is up 18%, but booked calls dropped slightly.",
  "/demo/tasks":      "You have 8 tasks — 2 are overdue. Want me to prioritize them and generate a plan for today?",
};

// ── Rich result card components ────────────────────────────────────────────

function WorkspaceCard() {
  const stages = ["Qualified", "Contact Made", "Demo Scheduled", "Proposal Made", "Closed Won"];
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <Building2 className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">Workspace Created</span>
        <span className="ml-auto rounded-full bg-emerald-400/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300">PREVIEW</span>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-bold text-gray-900">Apex Roofing Dallas</p>
          <p className="text-xs text-gray-500">Home Services · Dallas, TX · Residential</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["50", "Initial Leads"], ["5", "Pipeline Stages"], ["3", "Automations"]].map(([val, lbl]) => (
            <div key={lbl} className="rounded-lg bg-gray-50 border border-gray-100 py-2">
              <p className="text-sm font-bold text-gray-900">{val}</p>
              <p className="text-[10px] text-gray-400">{lbl}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Pipeline Stages</p>
          <div className="flex items-center gap-1 flex-wrap">
            {stages.map((s, i) => (
              <span key={s} className="flex items-center gap-1">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">{s}</span>
                {i < stages.length - 1 && <ArrowRight className="h-3 w-3 text-gray-300" />}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">AI Automations Included</p>
          <div className="space-y-1">
            {["Calendly → Demo Scheduled", "5-day no-reply follow-up", "Deal won → Onboarding tasks"].map((a) => (
              <div key={a} className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                <span className="text-xs text-gray-700">{a}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
          <button className="flex-1 rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors text-center">
            Create Workspace
          </button>
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}

function OutreachCard() {
  const [copied, setCopied] = useState(false);
  const email = `Subject: Quick question about {Company}'s growth strategy

Hey {First Name},

I came across {Company} and noticed you're scaling your acquisition — congrats on the growth.

I run Pipelly.ai, an AI system that helps agencies and service businesses find leads, run outreach, and fill their pipeline automatically. We've helped similar businesses book 20–40 calls a month without adding headcount.

Would it make sense to connect for 15 minutes to see if there's a fit? I can show you exactly how it would work for {Company}.

Best,
Jordan`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <PenLine className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">AI Outreach Draft</span>
        <span className="ml-auto text-[10px] text-gray-400">Ready to send</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[["Audience", "Top 5 scored leads"], ["Tone", "Professional · Direct"], ["Length", "Short-form"], ["Type", "Cold Intro"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-1.5">
              <p className="text-[10px] text-gray-400">{k}</p>
              <p className="text-xs font-medium text-gray-800">{v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
          <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">{email}</pre>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition-colors",
              copied
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-900"
            )}
          >
            {copied ? <><Check className="h-3.5 w-3.5" />Copied!</> : <><Copy className="h-3.5 w-3.5" />Copy Email</>}
          </button>
          <button className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
            Send to Top 5
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-gray-400" />
          <span className="text-[10px] text-gray-400">Personalization tokens will be filled automatically for each lead</span>
        </div>
      </div>
    </div>
  );
}

function PipelineCard() {
  const deals = [
    { name: "Elevate Roofing", value: "$24k", stage: "Negotiation", risk: "high", days: 6 },
    { name: "BrightPath", value: "$6k", stage: "Proposal Made", risk: "medium", days: 4 },
    { name: "Solaris Solar", value: "$11k", stage: "Qualified", risk: "medium", days: 3 },
  ];
  const riskConfig = {
    high:   { dot: "bg-red-400",   text: "text-red-600",   label: "High risk" },
    medium: { dot: "bg-amber-400", text: "text-amber-600", label: "Stalled" },
    low:    { dot: "bg-emerald-400", text: "text-emerald-600", label: "On track" },
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <BarChart3 className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">Pipeline Analysis</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[["$74.3k", "Total Value"], ["8", "Open Deals"], ["3", "At Risk"]].map(([val, lbl]) => (
            <div key={lbl} className="rounded-lg bg-gray-50 border border-gray-100 py-2">
              <p className="text-sm font-bold text-gray-900">{val}</p>
              <p className="text-[10px] text-gray-400">{lbl}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[
            { icon: AlertCircle, color: "text-red-500 bg-red-50", text: "3 deals have no activity in 7+ days" },
            { icon: Clock, color: "text-amber-500 bg-amber-50", text: "2 proposals sent with no reply" },
            { icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50", text: "3 deals are progressing normally" },
          ].map(({ icon: Icon, color, text }) => (
            <div key={text} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-xs", color)}>
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="text-gray-700">{text}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Deals Needing Attention</p>
          <div className="space-y-1.5">
            {deals.map((deal) => {
              const cfg = riskConfig[deal.risk as keyof typeof riskConfig];
              return (
                <div key={deal.name} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <span className={cn("h-2 w-2 rounded-full shrink-0", cfg.dot)} />
                  <span className="flex-1 text-xs font-medium text-gray-900">{deal.name}</span>
                  <span className="text-xs font-semibold text-gray-700">{deal.value}</span>
                  <span className="text-[10px] text-gray-400">{deal.days}d idle</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
          <button className="flex-1 rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors text-center">
            Draft Follow-ups
          </button>
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            View Pipeline
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactCard() {
  const signals = [
    { ok: true,  text: "Replied to 3 of 4 emails — engagement is strong" },
    { ok: true,  text: "Asked budget questions — clear buying signal" },
    { ok: true,  text: "Opened proposal email 4 times" },
    { ok: false, text: "No response to last follow-up (3 days ago)" },
  ];
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <Contact className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">Contact Summary</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white shrink-0">MR</div>
          <div>
            <p className="text-sm font-bold text-gray-900">Marcus Reid</p>
            <p className="text-xs text-gray-500">CEO · Apex Growth · Marketing Agency</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Last contact: 2 days ago</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[["Open Deals", "$12,000"], ["Deal Stage", "Proposal Made"], ["Lead Score", "92 / 100"], ["Last Reply", "2 days ago"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-gray-50 border border-gray-100 px-2.5 py-1.5">
              <p className="text-[10px] text-gray-400">{k}</p>
              <p className="text-xs font-semibold text-gray-800">{v}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Engagement Signals</p>
          <div className="space-y-1.5">
            {signals.map((s) => (
              <div key={s.text} className="flex items-start gap-2">
                {s.ok
                  ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  : <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />}
                <span className="text-xs text-gray-600">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2.5">
          <div className="flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gray-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">AI Recommendation</p>
              <p className="text-xs text-gray-700">Send a short, direct follow-up today referencing his Thursday team meeting. Keep it under 3 sentences.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
          <button className="flex-1 rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors text-center">
            Draft Message
          </button>
          <button className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            View Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function AutomationsCard() {
  const [enabled, setEnabled] = useState<Record<number, boolean>>({});
  const recs = [
    { name: "Calendly → Demo Scheduled", trigger: "Meeting booked via Calendly", action: "Move deal stage + notify owner", impact: "High", runs: "~6×/week" },
    { name: "5-Day No Reply Follow-up", trigger: "No email reply in 5 days", action: "Send follow-up sequence", impact: "High", runs: "~12×/week" },
    { name: "Deal Won → Create Workspace", trigger: "Deal marked Closed Won", action: "Auto-create client workspace", impact: "Medium", runs: "~2×/week" },
  ];
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <Zap className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">Recommended Automations</span>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-xs text-gray-500">Based on your pipeline activity and deal stages:</p>
        <div className="space-y-2.5">
          {recs.map((rec, i) => (
            <div key={i} className={cn("rounded-xl border p-3 transition-colors", enabled[i] ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-gray-50")}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-xs font-semibold text-gray-900 leading-snug">{rec.name}</p>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold", rec.impact === "High" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600")}>
                  {rec.impact}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                <span className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">{rec.trigger}</span>
                <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
                <span className="rounded-md bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{rec.action}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Estimated: {rec.runs}</span>
                <button
                  onClick={() => setEnabled((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className={cn("flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-colors", enabled[i] ? "bg-emerald-600 text-white" : "bg-gray-900 text-white hover:bg-gray-700")}
                >
                  {enabled[i] ? <><Check className="h-3 w-3" />Enabled</> : <><Plus className="h-3 w-3" />Enable</>}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors">
          Enable All 3 Automations
        </button>
      </div>
    </div>
  );
}

function TasksCard() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  const tasks = [
    { label: "Follow up with Marcus Reid — proposal pending 3 days", priority: "high",   due: "Today",      aiGen: true },
    { label: "Confirm Sophia Chen's demo attendees for Apr 22",       priority: "high",   due: "Today",      aiGen: true },
    { label: "Re-engage 12 cold leads with new outreach sequence",    priority: "medium", due: "Tomorrow",   aiGen: true },
    { label: "Review Northstar Media proposal before sending",        priority: "medium", due: "Apr 20",     aiGen: false },
    { label: "Approve Calendly automation for BrightPath workspace",  priority: "low",    due: "Apr 21",     aiGen: false },
  ];
  const priorityBadge: Record<string, string> = {
    high:   "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low:    "bg-gray-100 text-gray-600",
  };
  const grouped = { Today: tasks.filter((t) => t.due === "Today"), "Tomorrow": tasks.filter((t) => t.due === "Tomorrow"), "Upcoming": tasks.filter((t) => !["Today", "Tomorrow"].includes(t.due)) };
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <CheckSquare className="h-3.5 w-3.5 text-white" />
        <span className="text-xs font-semibold text-white">AI Generated Tasks</span>
        <span className="ml-auto text-[10px] text-gray-400">{tasks.length} tasks</span>
      </div>
      <div className="p-4 space-y-3">
        {Object.entries(grouped).filter(([, arr]) => arr.length > 0).map(([group, arr]) => (
          <div key={group}>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">{group}</p>
            <div className="space-y-1.5">
              {arr.map((task, rawIdx) => {
                const idx = tasks.indexOf(task);
                return (
                  <div
                    key={idx}
                    onClick={() => toggle(idx)}
                    className={cn("flex items-start gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors", checked[idx] ? "border-gray-100 bg-gray-50 opacity-60" : "border-gray-200 bg-white hover:border-gray-300")}
                  >
                    <div className={cn("mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors", checked[idx] ? "border-emerald-500 bg-emerald-500" : "border-gray-300")}>
                      {checked[idx] && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs leading-relaxed", checked[idx] ? "line-through text-gray-400" : "text-gray-800")}>{task.label}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {task.aiGen && <Sparkles className="h-3 w-3 text-violet-400" />}
                      <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase", priorityBadge[task.priority])}>{task.priority}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button className="w-full rounded-lg bg-gray-900 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
          Add All to Tasks
        </button>
      </div>
    </div>
  );
}

// ── Typing indicator ───────────────────────────────────────────────────────
function TypingIndicator({ query }: { query: string }) {
  const cardType = detectCardType(query);
  const labels: Record<AICardType, string> = {
    workspace:   "Configuring workspace...",
    outreach:    "Drafting outreach email...",
    pipeline:    "Analyzing pipeline...",
    contact:     "Summarizing contact...",
    automations: "Finding best automations...",
    tasks:       "Generating tasks...",
  };
  const label = cardType ? labels[cardType] : "Thinking...";
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
        <span className="text-[10px] font-medium text-gray-500">Pipelly AI · {label}</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

// ── Fallback text responses ────────────────────────────────────────────────
const TEXT_RESPONSES: Record<string, string> = {
  "what should i focus on today": "Based on your pipeline and activity data, here's your priority list for today:\n\n**1.** Follow up with Marcus Reid — proposal has been open 3 days.\n**2.** Confirm Sophia Chen's demo attendees for April 22nd.\n**3.** Re-engage 12 leads that went cold 14+ days ago.\n\nShall I create tasks for any of these?",
  "find leads": "I found **312 potential leads** matching your ICP in the target area. Top matches include Pinnacle Roofing, SunBelt HVAC, and Lone Star Electric. Want me to import the top 50 and start an outreach sequence?",
  "score": "I've scored all 10 leads based on engagement, fit, and intent signals. **Top 3:** Nina Kowalski (96), Marcus Reid (92), Amara Osei (85). Want me to draft outreach for the highest scorers?",
  default: "I'm analyzing your data now. Based on current signals, I'd recommend focusing on the 3 deals in **Proposal Made** stage — highest close probability this week. Want me to draft follow-ups or create a task list?",
};

// ── Main panel ─────────────────────────────────────────────────────────────
export function AICopilotPanel() {
  const { isOpen, setOpen, consumePendingQuery } = useAICopilot();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState("");
  const pathname = usePathname();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastPathRef = useRef(pathname);

  const greeting = PAGE_GREETINGS[pathname] ?? PAGE_GREETINGS["/demo"];
  const suggestions = PAGE_SUGGESTIONS[pathname] ?? PAGE_SUGGESTIONS["/demo"];

  const initMessages = useCallback(() => [
    { id: "init", role: "ai" as const, content: greeting, timestamp: new Date() },
  ], [greeting]);

  // Reset messages when pathname changes (page switch)
  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      setMessages(initMessages());
    }
  }, [pathname, initMessages]);

  // Initialize on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages(initMessages());
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages.length, initMessages]);

  // Consume pending query from context (triggered by page buttons)
  useEffect(() => {
    if (!isOpen) return;
    const query = consumePendingQuery();
    if (query) {
      setTimeout(() => send(query), 300);
    }
  }); // intentionally runs every render to catch context changes

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback((text: string) => {
    const userMsg = text.trim();
    if (!userMsg || loading) return;

    const userMessage: AIMessage = { id: Date.now().toString(), role: "user", content: userMsg, timestamp: new Date() };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);
    setLoadingQuery(userMsg);

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const cardType = detectCardType(userMsg);
      let aiMsg: AIMessage;
      if (cardType) {
        aiMsg = { id: (Date.now() + 1).toString(), role: "ai", card: cardType, timestamp: new Date() };
      } else {
        const lc = userMsg.toLowerCase();
        const key = Object.keys(TEXT_RESPONSES).find((k) => k !== "default" && lc.includes(k));
        aiMsg = { id: (Date.now() + 1).toString(), role: "ai", content: TEXT_RESPONSES[key ?? "default"], timestamp: new Date() };
      }
      setMessages((m) => [...m, aiMsg]);
      setLoading(false);
      setLoadingQuery("");
    }, delay);
  }, [loading]);

  const renderCard = (card: AICardType) => {
    if (card === "workspace")   return <WorkspaceCard />;
    if (card === "outreach")    return <OutreachCard />;
    if (card === "pipeline")    return <PipelineCard />;
    if (card === "contact")     return <ContactCard />;
    if (card === "automations") return <AutomationsCard />;
    if (card === "tasks")       return <TasksCard />;
    return null;
  };

  const renderContent = (content: string) => {
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> :
        part.split("\n").map((line, j, arr) => (
          <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
        ))
    );
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
    <>
      {/* Floating trigger */}
      {!isOpen && (
        <button
          onClick={() => { setOpen(true); if (messages.length === 0) setMessages(initMessages()); }}
          className="fixed bottom-6 right-6 z-50"
          aria-label="Open AI Copilot"
        >
          <span className="absolute inset-0 rounded-full bg-gray-700 animate-ping opacity-20" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-gray-900 ring-2 ring-white">
            6
          </span>
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[420px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3 shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">AI Copilot</span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-400/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />LIVE
            </span>
            <div className="ml-auto flex items-center gap-1">
              <button
                onClick={() => { setMessages(initMessages()); }}
                className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                title="Clear"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
                {m.role === "ai" && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-500">Pipelly AI · {formatTime(m.timestamp)}</span>
                  </div>
                )}
                {m.card ? (
                  <div className="w-full">{renderCard(m.card)}</div>
                ) : (
                  <div className={cn(
                    "max-w-[92%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-gray-900 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-200 shadow-sm"
                  )}>
                    {renderContent(m.content ?? "")}
                  </div>
                )}
                {m.role === "user" && (
                  <span className="mt-1 text-[10px] text-gray-400">{formatTime(m.timestamp)}</span>
                )}
              </div>
            ))}

            {loading && <TypingIndicator query={loadingQuery} />}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className="border-t border-gray-100 bg-white px-4 py-2.5 shrink-0">
            <div className="flex items-center gap-1.5 mb-2">
              <Lightbulb className="h-3 w-3 text-gray-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Quick actions</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.query)}
                  className="flex-shrink-0 flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 hover:border-gray-900 hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {s.label}
                  <ChevronRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-3 shrink-0">
            <div className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2 transition-all",
              input ? "border-gray-900 bg-white" : "border-gray-200 bg-gray-50"
            )}>
              <Sparkles className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Ask Pipelly anything..."
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-900 text-white disabled:opacity-30 hover:bg-gray-700 transition-colors shrink-0"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-400">AI responses are illustrative · for demo purposes</p>
          </div>
        </div>
      )}
    </>
  );
}
