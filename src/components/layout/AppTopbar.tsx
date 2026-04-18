"use client";

import { usePathname } from "next/navigation";
import { Search, Plus, Sparkles, Bell, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, { title: string; breadcrumb: string[]; aiHint: string }> = {
  "/demo":              { title: "Home",          breadcrumb: [],                         aiHint: "Who needs a follow-up today?" },
  "/demo/leads":        { title: "Leads",         breadcrumb: ["Leads"],                  aiHint: "Show my hottest leads" },
  "/demo/messages":     { title: "Messages",      breadcrumb: ["Messages"],               aiHint: "Write a text reply" },
  "/demo/jobs":         { title: "Jobs",          breadcrumb: ["Jobs"],                   aiHint: "What jobs are waiting on me?" },
  "/demo/settings":     { title: "Settings",      breadcrumb: ["Settings"],               aiHint: "Help with settings" },
  "/demo/settings/users":   { title: "Users",     breadcrumb: ["Settings", "Users"],      aiHint: "Manage my team" },
  "/demo/settings/billing": { title: "Billing",   breadcrumb: ["Settings", "Billing"],    aiHint: "Explain my plan" },
  "/demo/workspaces":   { title: "Workspaces",    breadcrumb: ["Workspaces"],             aiHint: "Create a new workspace" },
  "/demo/pipeline":     { title: "Pipeline",      breadcrumb: ["Pipeline"],               aiHint: "Why are deals stuck?" },
  "/demo/contacts":     { title: "Contacts",      breadcrumb: ["Contacts"],               aiHint: "Summarize this contact" },
  "/demo/inbox":        { title: "Inbox",         breadcrumb: ["Inbox"],                  aiHint: "Draft a reply" },
  "/demo/automations":  { title: "Automations",   breadcrumb: ["Automations"],            aiHint: "Build an automation" },
  "/demo/analytics":    { title: "Analytics",     breadcrumb: ["Analytics"],              aiHint: "Explain my trends" },
  "/demo/tasks":        { title: "Tasks",         breadcrumb: ["Tasks"],                  aiHint: "Prioritize my tasks" },
  "/demo/onboarding":   { title: "Setup",         breadcrumb: ["Onboarding"],             aiHint: "Guide me through setup" },
};

export function AppTopbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Pipelly", breadcrumb: [], aiHint: "Ask AI" };

  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm shrink-0">
        {page.breadcrumb.length > 0 ? (
          <>
            <span className="text-gray-400">Pipelly</span>
            {page.breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-gray-300">/</span>
                <span className={cn(i === page.breadcrumb.length - 1 ? "font-semibold text-gray-900" : "text-gray-400")}>
                  {crumb}
                </span>
              </span>
            ))}
          </>
        ) : (
          <span className="font-semibold text-gray-900">{page.title}</span>
        )}
      </div>

      {/* Search */}
      <div className="relative ml-2 flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads, jobs, messages..."
          className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none transition-colors"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] text-gray-400">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Plus */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors">
          <Plus className="h-4 w-4" />
        </button>

        {/* AI action — prominent with context hint */}
        <button className="group flex h-8 items-center gap-1.5 rounded-lg bg-gray-900 pl-3 pr-3.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span className="hidden sm:block">{page.aiHint}</span>
          <span className="block sm:hidden">Ask AI</span>
        </button>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Help */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Avatar */}
        <div className="ml-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white ring-2 ring-gray-200">
          JN
        </div>
      </div>
    </header>
  );
}
