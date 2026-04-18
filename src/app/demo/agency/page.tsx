"use client";

import { useEffect, useState } from "react";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { mockAgencyBusinesses, mockSetupQueue } from "@/lib/mock-data";
import {
  Sparkles,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AGENCY_KPI = [
  { label: "Total Businesses",  value: "5", sub: "+1 this month",   color: "text-gray-900" },
  { label: "Setups In Progress",value: "2", sub: "2 need action",   color: "text-amber-600" },
  { label: "Healthy Accounts",  value: "3", sub: "60% of total",    color: "text-emerald-600" },
  { label: "Needs Attention",   value: "1", sub: "Summit HVAC",     color: "text-red-500" },
];

const PROMPT_CHIPS = [
  "Create a new business workspace",
  "Show setups in progress",
  "Show businesses needing attention",
  "Assign admin user",
];

const HEALTH_STYLES: Record<string, string> = {
  excellent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  good:      "bg-blue-50 text-blue-700 border-blue-200",
  fair:      "bg-amber-50 text-amber-700 border-amber-200",
  poor:      "bg-red-50 text-red-700 border-red-200",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  "launched":        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />,
  "in-progress":     <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin shrink-0" />,
  "waiting":         <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />,
  "needs-attention": <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />,
};

const STATUS_LABEL: Record<string, string> = {
  "launched":        "Launched",
  "in-progress":     "In progress",
  "waiting":         "Waiting",
  "needs-attention": "Needs attention",
};

export default function AgencyHomePage() {
  const { setMode } = useDashboardMode();
  const { openWithQuery } = useAICopilot();
  const [query, setQuery] = useState("");

  useEffect(() => { setMode("agency"); }, [setMode]);

  const handleSend = () => {
    const q = query.trim();
    if (!q) return;
    openWithQuery(q);
    setQuery("");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-7">

        {/* Greeting */}
        <div>
          <p className="text-sm text-gray-400 mb-0.5">Good morning</p>
          <h1 className="text-2xl font-black text-gray-900">Jordan Nassie</h1>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s your agency overview for today.</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AGENCY_KPI.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-gray-400 mb-2 font-medium">{kpi.label}</p>
              <p className={cn("text-4xl font-black mb-1", kpi.color)}>{kpi.value}</p>
              <p className="text-xs text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* AI helper */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </p>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="What do you want to do today?"
              className="flex-1 h-10 px-4 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
            />
            <button
              onClick={handleSend}
              className="h-10 px-4 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-1.5 shrink-0"
            >
              Ask <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => openWithQuery(chip)}
                className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Business accounts list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Business Accounts</h2>
              <p className="text-xs text-gray-400 mt-0.5">{mockAgencyBusinesses.length} total</p>
            </div>
            <Link
              href="/demo/agency/clients"
              className="h-8 px-4 text-xs font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> New Business
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {mockAgencyBusinesses.map((biz) => (
              <div key={biz.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                {/* Icon */}
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Building2 className="h-4 w-4 text-gray-500" />
                </div>

                {/* Name & industry */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{biz.name}</p>
                  <p className="text-xs text-gray-400">{biz.industry} · {biz.adminUser}</p>
                </div>

                {/* Setup status */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
                  {STATUS_ICON[biz.setupStatus]}
                  {STATUS_LABEL[biz.setupStatus]}
                </div>

                {/* Health badge */}
                <span className={cn("hidden sm:inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0", HEALTH_STYLES[biz.health])}>
                  {biz.health}
                </span>

                {/* Last activity */}
                <span className="hidden md:block text-xs text-gray-400 shrink-0">{biz.lastActivity}</span>

                {/* Action */}
                <Link
                  href="/demo/agency/clients"
                  className="h-8 px-3 text-xs font-semibold border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all inline-flex items-center gap-1 shrink-0"
                >
                  Open <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <Link href="/demo/agency/clients" className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium">
              View all clients and details →
            </Link>
          </div>
        </div>

        {/* Bottom row: setup queue + quick actions */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Setup queue */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Setup Queue</h2>
              <Link href="/demo/agency/setup" className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors">
                Manage →
              </Link>
            </div>
            <div className="space-y-3">
              {mockSetupQueue.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0", item.color)}>
                    {item.status === "done" ? "Done" :
                     item.status === "in-progress" ? "Active" :
                     item.status === "waiting" ? "Waiting" : "Not started"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{item.business}</p>
                    <p className="text-[11px] text-gray-400 truncate">{item.step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "New Business Account",  href: "/demo/agency/clients" },
                { label: "Launch Setup Wizard",   href: "/demo/agency/setup"   },
                { label: "View All Clients",      href: "/demo/agency/clients" },
                { label: "Switch to Business Demo", href: "/demo/business"    },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{action.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
