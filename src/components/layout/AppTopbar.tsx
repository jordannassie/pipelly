"use client";

import { usePathname } from "next/navigation";
import { Search, Plus, Sparkles, Bell, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, { title: string; breadcrumb: string[] }> = {
  "/demo": { title: "Home", breadcrumb: [] },
  "/demo/workspaces": { title: "Workspaces", breadcrumb: ["Workspaces"] },
  "/demo/leads": { title: "Leads", breadcrumb: ["Leads"] },
  "/demo/pipeline": { title: "Pipeline", breadcrumb: ["Pipeline"] },
  "/demo/contacts": { title: "Contacts", breadcrumb: ["Contacts"] },
  "/demo/inbox": { title: "Inbox", breadcrumb: ["Inbox"] },
  "/demo/automations": { title: "Automations", breadcrumb: ["Automations"] },
  "/demo/analytics": { title: "Analytics", breadcrumb: ["Analytics"] },
  "/demo/tasks": { title: "Tasks", breadcrumb: ["Tasks"] },
  "/demo/settings": { title: "Settings", breadcrumb: ["Settings"] },
  "/demo/settings/users": { title: "Users & Permissions", breadcrumb: ["Settings", "Users"] },
  "/demo/settings/billing": { title: "Billing & Plan", breadcrumb: ["Settings", "Billing"] },
  "/demo/onboarding": { title: "Setup Wizard", breadcrumb: ["Onboarding"] },
};

export function AppTopbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Pipelly", breadcrumb: [] };

  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-5">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-1.5 text-sm">
        {page.breadcrumb.length > 0 ? (
          <>
            <span className="text-gray-400">Pipelly</span>
            {page.breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-gray-300">/</span>
                <span className={cn(i === page.breadcrumb.length - 1 ? "font-semibold text-gray-900" : "text-gray-400")}>{crumb}</span>
              </span>
            ))}
          </>
        ) : (
          <span className="font-semibold text-gray-900">{page.title}</span>
        )}
      </div>

      {/* Search */}
      <div className="relative ml-4 flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads, deals, contacts..."
          className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none transition-colors"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] text-gray-400 sm:block">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Plus */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
          <Plus className="h-4 w-4" />
        </button>

        {/* AI action */}
        <button className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-900 bg-gray-900 px-3 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </button>

        {/* Bell */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* Help */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Avatar */}
        <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">JN</div>
      </div>
    </header>
  );
}
