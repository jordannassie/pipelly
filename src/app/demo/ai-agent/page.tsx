"use client";

import { useState } from "react";
import {
  Bot, Sparkles, Play, Clock, CheckCircle2, XCircle, AlertCircle,
  ChevronRight, Plus, Shield, Eye, Zap, Users2, GitBranch,
  Inbox, RotateCcw, Check, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock data ──────────────────────────────────────────────────────────────

const ACTIVE_PLANS = [
  {
    id: "ap-1",
    name: "Re-engage Cold Leads",
    description: "Identify leads silent for 14+ days and draft personalised follow-up sequences.",
    status: "running",
    scope: "Leads",
    lastRun: "2 min ago",
    nextRun: "Daily at 9:00 AM",
    actionsCompleted: 38,
    actionsQueued: 7,
  },
  {
    id: "ap-2",
    name: "Pipeline Stall Detection",
    description: "Flag deals with no activity in 7 days and suggest next steps to owner.",
    status: "running",
    scope: "Pipeline",
    lastRun: "14 min ago",
    nextRun: "Every 4 hours",
    actionsCompleted: 12,
    actionsQueued: 3,
  },
  {
    id: "ap-3",
    name: "Inbox Auto-Triage",
    description: "Categorise incoming messages, surface urgent threads, and draft suggested replies.",
    status: "paused",
    scope: "Inbox",
    lastRun: "3h ago",
    nextRun: "Paused",
    actionsCompleted: 91,
    actionsQueued: 0,
  },
];

const APPROVAL_QUEUE = [
  {
    id: "aq-1",
    action: "Send follow-up email",
    target: "Marcus Reid — Proposal Follow-up",
    plan: "Pipeline Stall Detection",
    preview: "Hey Marcus, just circling back on the proposal we sent Thursday. Happy to hop on a quick call if you have questions.",
    urgency: "high",
    createdAt: "4 min ago",
  },
  {
    id: "aq-2",
    action: "Re-engage sequence",
    target: "12 cold leads — Segment B",
    plan: "Re-engage Cold Leads",
    preview: "Agent will enrol 12 leads into a 3-step re-engagement sequence over 6 days.",
    urgency: "medium",
    createdAt: "18 min ago",
  },
  {
    id: "aq-3",
    action: "Move deal stage",
    target: "Apex Media — Demo Scheduled → Proposal Sent",
    plan: "Pipeline Stall Detection",
    preview: "Calendly confirmed: demo completed Apr 17. Agent recommends advancing deal stage.",
    urgency: "low",
    createdAt: "1h ago",
  },
];

const RUN_HISTORY = [
  { id: "rh-1", plan: "Re-engage Cold Leads",     action: "Enrolled 6 leads into follow-up sequence",       status: "completed", time: "Today, 9:02 AM" },
  { id: "rh-2", plan: "Pipeline Stall Detection",  action: "Flagged 3 deals — notified owner via task",      status: "completed", time: "Today, 8:00 AM" },
  { id: "rh-3", plan: "Inbox Auto-Triage",         action: "Categorised 14 threads, surfaced 2 urgent",      status: "completed", time: "Yesterday, 6:00 PM" },
  { id: "rh-4", plan: "Re-engage Cold Leads",      action: "Attempted to enrol 4 leads — 1 skipped (opted out)", status: "warning",   time: "Yesterday, 9:01 AM" },
  { id: "rh-5", plan: "Pipeline Stall Detection",  action: "No stalled deals detected — no action taken",    status: "completed", time: "Yesterday, 8:00 AM" },
  { id: "rh-6", plan: "Inbox Auto-Triage",         action: "Drafted 5 reply suggestions — 3 approved",      status: "completed", time: "Apr 16, 6:00 PM" },
];

const GUARDRAILS = [
  { label: "Max emails per contact per week",   value: "2",          icon: Inbox },
  { label: "Max deal stage changes per day",    value: "5",          icon: GitBranch },
  { label: "Require approval for bulk actions", value: "Enabled",    icon: Shield },
  { label: "Agent scope",                       value: "Leads + Pipeline + Inbox", icon: Bot },
  { label: "Auto-run without approval",         value: "Disabled",   icon: Eye },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "running")   return <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Running</span>;
  if (status === "paused")    return <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-100">Paused</span>;
  if (status === "completed") return <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600">Completed</span>;
  if (status === "warning")   return <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700 border border-orange-100">Warning</span>;
  return null;
}

function UrgencyDot({ urgency }: { urgency: string }) {
  return <span className={cn("h-2 w-2 rounded-full shrink-0 mt-1",
    urgency === "high" ? "bg-red-400" : urgency === "medium" ? "bg-amber-400" : "bg-gray-300"
  )} />;
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function AIAgentPage() {
  const [agentInput, setAgentInput] = useState("");
  const [approvals, setApprovals] = useState(APPROVAL_QUEUE);

  const approve = (id: string) => setApprovals((q) => q.filter((a) => a.id !== id));
  const dismiss = (id: string) => setApprovals((q) => q.filter((a) => a.id !== id));

  return (
    <div className="p-6 space-y-6 max-w-5xl">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">AI Agent</h1>
            <span className="rounded-full bg-violet-50 border border-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">BETA</span>
          </div>
          <p className="text-sm text-gray-500 ml-10.5">
            Turn instructions into approved actions across leads, pipeline, inbox, and automations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
            <Eye className="h-4 w-4" />
            View Approval Queue
            {approvals.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{approvals.length}</span>
            )}
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            New Agent Plan
          </button>
        </div>
      </div>

      {/* Hero command card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Give the Agent an Instruction</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={agentInput}
              onChange={(e) => setAgentInput(e.target.value)}
              placeholder="e.g. Re-engage all leads silent for 14 days and draft follow-ups for my approval"
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:bg-white transition-all"
            />
            <button
              disabled={!agentInput.trim()}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-40 transition-colors shrink-0"
            >
              <Play className="h-3.5 w-3.5" />
              Run Agent
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Re-engage leads silent for 14+ days",
              "Flag all stalled deals and suggest next steps",
              "Triage my inbox and surface urgent threads",
              "Find hot leads and draft outreach for approval",
            ].map((chip) => (
              <button key={chip} onClick={() => setAgentInput(chip)}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-500">All agent actions require your approval before executing. Nothing runs automatically without your sign-off.</span>
        </div>
      </div>

      {/* Active Plans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Active Plans</h2>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
            View all <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-3">
          {ACTIVE_PLANS.map((plan) => (
            <div key={plan.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{plan.name}</p>
                    <StatusBadge status={plan.status} />
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">{plan.scope}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                  <div className="flex items-center gap-5 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Last run: {plan.lastRun}</span>
                    <span className="flex items-center gap-1"><RotateCcw className="h-3 w-3" />Next: {plan.nextRun}</span>
                    <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3 w-3" />{plan.actionsCompleted} completed</span>
                    {plan.actionsQueued > 0 && (
                      <span className="flex items-center gap-1 text-amber-600"><AlertCircle className="h-3 w-3" />{plan.actionsQueued} awaiting approval</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {plan.status === "running" && (
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 transition-colors">Pause</button>
                  )}
                  {plan.status === "paused" && (
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 transition-colors flex items-center gap-1"><Play className="h-3 w-3" />Resume</button>
                  )}
                  <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">View Plan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Queue */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900">Approval Queue</h2>
            {approvals.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">{approvals.length}</span>
            )}
          </div>
          <span className="text-xs text-gray-400">Review and approve agent actions before they execute</span>
        </div>
        {approvals.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">All caught up</p>
            <p className="text-xs text-gray-500 mt-1">No pending approvals right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {approvals.map((item) => (
              <div key={item.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                <div className="flex items-start gap-3">
                  <UrgencyDot urgency={item.urgency} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                      <span className="text-[10px] text-gray-400">via {item.plan}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-600 mb-2">{item.target}</p>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-600 italic mb-3">
                      &ldquo;{item.preview}&rdquo;
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approve(item.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-gray-700 transition-colors"
                      >
                        <Check className="h-3 w-3" /> Approve
                      </button>
                      <button
                        onClick={() => dismiss(item.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <X className="h-3 w-3" /> Dismiss
                      </button>
                      <span className="ml-auto text-[10px] text-gray-400">{item.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Run History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Run History</h2>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
            View all <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {RUN_HISTORY.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3.5 px-5 py-3.5">
                <div className="mt-0.5 shrink-0">
                  {entry.status === "completed" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  {entry.status === "warning"   && <AlertCircle  className="h-4 w-4 text-amber-500" />}
                  {entry.status === "failed"    && <XCircle      className="h-4 w-4 text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 mb-0.5">{entry.plan}</p>
                  <p className="text-xs text-gray-500">{entry.action}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permissions & Guardrails */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Permissions &amp; Guardrails</h2>
          </div>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors">Edit</button>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {GUARDRAILS.map((g) => (
              <div key={g.label} className="flex items-center gap-4 px-5 py-3.5">
                <g.icon className="h-4 w-4 text-gray-400 shrink-0" />
                <p className="flex-1 text-sm text-gray-600">{g.label}</p>
                <span className="text-sm font-semibold text-gray-900">{g.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
