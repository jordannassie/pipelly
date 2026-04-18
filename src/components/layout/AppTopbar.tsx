"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Plus, Sparkles, Bell, HelpCircle, LogOut, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, { title: string; breadcrumb: string[]; aiHint: string }> = {
  // Legacy /demo routes
  "/demo":                    { title: "Home",              breadcrumb: [],                             aiHint: "What should I focus on?" },
  "/demo/workspaces":         { title: "Workspaces",        breadcrumb: ["Workspaces"],                 aiHint: "Create a new workspace" },
  "/demo/leads":              { title: "Leads",             breadcrumb: ["Leads"],                      aiHint: "Score leads with AI" },
  "/demo/pipeline":           { title: "Pipeline",          breadcrumb: ["Pipeline"],                   aiHint: "Why are deals stuck?" },
  "/demo/contacts":           { title: "Contacts",          breadcrumb: ["Contacts"],                   aiHint: "Summarize this contact" },
  "/demo/inbox":              { title: "Inbox",             breadcrumb: ["Inbox"],                      aiHint: "Draft a reply" },
  "/demo/automations":        { title: "Automations",       breadcrumb: ["Automations"],                aiHint: "Build an automation" },
  "/demo/analytics":          { title: "Analytics",         breadcrumb: ["Analytics"],                  aiHint: "Explain my trends" },
  "/demo/tasks":              { title: "Tasks",             breadcrumb: ["Tasks"],                      aiHint: "Prioritize my tasks" },
  "/demo/settings":           { title: "Settings",          breadcrumb: ["Settings"],                   aiHint: "Help with settings" },
  "/demo/settings/users":     { title: "Users & Permissions", breadcrumb: ["Settings", "Users"],        aiHint: "Manage team access" },
  "/demo/settings/billing":   { title: "Billing & Plan",   breadcrumb: ["Settings", "Billing"],        aiHint: "Explain my plan" },
  "/demo/onboarding":         { title: "Setup Wizard",      breadcrumb: ["Onboarding"],                 aiHint: "Guide me through setup" },
  // Agency routes
  "/demo/agency":             { title: "Agency Home",       breadcrumb: ["Agency"],                     aiHint: "Show clients needing attention" },
  "/demo/agency/clients":     { title: "Clients",           breadcrumb: ["Agency", "Clients"],          aiHint: "Summarize workspace health" },
  "/demo/agency/setup":       { title: "Setup",             breadcrumb: ["Agency", "Setup"],            aiHint: "What's the next setup step?" },
  "/demo/agency/automations": { title: "Automations",       breadcrumb: ["Agency", "Automations"],      aiHint: "Recommend an automation" },
  "/demo/agency/team":        { title: "Team",              breadcrumb: ["Agency", "Team"],             aiHint: "Help manage team access" },
  "/demo/agency/billing":     { title: "Billing",           breadcrumb: ["Agency", "Billing"],          aiHint: "Explain my plan" },
  "/demo/agency/settings":    { title: "Settings",          breadcrumb: ["Agency", "Settings"],         aiHint: "Help with settings" },
  // Business routes
  "/demo/business":           { title: "Business Home",     breadcrumb: ["Business"],                   aiHint: "What should I focus on today?" },
  "/demo/business/leads":     { title: "Leads",             breadcrumb: ["Business", "Leads"],          aiHint: "Score leads with AI" },
  "/demo/business/pipeline":  { title: "Pipeline",          breadcrumb: ["Business", "Pipeline"],       aiHint: "Why are deals stuck?" },
  "/demo/business/contacts":  { title: "Contacts",          breadcrumb: ["Business", "Contacts"],       aiHint: "Summarize this contact" },
  "/demo/business/messages":  { title: "Messages",          breadcrumb: ["Business", "Messages"],       aiHint: "Draft a reply" },
  "/demo/business/calendar":  { title: "Calendar",          breadcrumb: ["Business", "Calendar"],       aiHint: "Show open slots this week" },
  "/demo/business/automations":{ title: "Automations",      breadcrumb: ["Business", "Automations"],    aiHint: "Build an automation" },
  "/demo/business/analytics": { title: "Analytics",         breadcrumb: ["Business", "Analytics"],      aiHint: "Explain my trends" },
  "/demo/business/tasks":     { title: "Tasks",             breadcrumb: ["Business", "Tasks"],          aiHint: "Prioritize my tasks" },
  "/demo/business/settings":  { title: "Settings",          breadcrumb: ["Business", "Settings"],       aiHint: "Help with settings" },
};

export function AppTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const page = pageTitles[pathname] ?? { title: "Pipelly", breadcrumb: [], aiHint: "Ask AI" };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pipelly_mode");
    router.push("/login");
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-5 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm shrink-0">
        {page.breadcrumb.length > 0 ? (
          <>
            <span className="text-gray-400">Pipelly</span>
            {page.breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <span className={cn(
                  i === page.breadcrumb.length - 1
                    ? "font-semibold text-gray-900 dark:text-white"
                    : "text-gray-400"
                )}>
                  {crumb}
                </span>
              </span>
            ))}
          </>
        ) : (
          <span className="font-semibold text-gray-900 dark:text-white">{page.title}</span>
        )}
      </div>

      {/* Search */}
      <div className="relative ml-2 flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads, deals, contacts..."
          className="h-8 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 pl-9 pr-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-colors"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-1.5 py-0.5 text-[10px] text-gray-400">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Plus */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 transition-colors">
          <Plus className="h-4 w-4" />
        </button>

        {/* AI action */}
        <button className="flex h-8 items-center gap-1.5 rounded-lg bg-gray-900 dark:bg-white pl-3 pr-3.5 text-xs font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:block">{page.aiHint}</span>
          <span className="block sm:hidden">Ask AI</span>
        </button>

        {/* Notifications */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-950" />
        </button>

        {/* Help */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Profile dropdown */}
        <div className="relative ml-0.5" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 px-1 py-0.5 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 dark:bg-white text-xs font-bold text-white dark:text-gray-900 ring-2 ring-gray-200 dark:ring-gray-700">
              JN
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Jordan Nassie</p>
                <p className="text-xs text-gray-500">jordan@daily.church</p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { setProfileOpen(false); router.push("/demo/agency/settings"); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
