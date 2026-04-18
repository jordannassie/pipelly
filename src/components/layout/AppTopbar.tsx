"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Plus, Sparkles, Bell, HelpCircle, LogOut, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import { useAICopilot } from "@/lib/ai-copilot-context";

const PAGE_META: Record<string, { title: string; breadcrumb: string[] }> = {
  "/demo":              { title: "Home",          breadcrumb: [] },
  "/demo/leads":        { title: "Leads",         breadcrumb: ["Leads"] },
  "/demo/messages":     { title: "Messages",      breadcrumb: ["Messages"] },
  "/demo/jobs":         { title: "Jobs",          breadcrumb: ["Jobs"] },
  "/demo/workspaces":   { title: "Workspaces",    breadcrumb: ["Workspaces"] },
  "/demo/pipeline":     { title: "Pipeline",      breadcrumb: ["Pipeline"] },
  "/demo/contacts":     { title: "Contacts",      breadcrumb: ["Contacts"] },
  "/demo/inbox":        { title: "Inbox",         breadcrumb: ["Inbox"] },
  "/demo/automations":  { title: "Automations",   breadcrumb: ["Automations"] },
  "/demo/analytics":    { title: "Analytics",     breadcrumb: ["Analytics"] },
  "/demo/tasks":        { title: "Tasks",         breadcrumb: ["Tasks"] },
  "/demo/settings":     { title: "Settings",      breadcrumb: ["Settings"] },
  "/demo/settings/users":   { title: "Users",     breadcrumb: ["Settings", "Users"] },
  "/demo/settings/billing": { title: "Billing",   breadcrumb: ["Settings", "Billing"] },
  "/demo/onboarding":   { title: "Setup",         breadcrumb: ["Onboarding"] },
};

const AI_HINTS: Record<"agency" | "client", Record<string, string>> = {
  agency: {
    "/demo":             "What should I focus on today?",
    "/demo/workspaces":  "Create a new workspace",
    "/demo/leads":       "Score leads with AI",
    "/demo/pipeline":    "Why are deals stuck?",
    "/demo/contacts":    "Summarize this contact",
    "/demo/inbox":       "Draft a reply",
    "/demo/automations": "Build an automation",
    "/demo/analytics":   "Explain my trends",
    "/demo/tasks":       "Prioritize my tasks",
    "/demo/settings":    "Help with settings",
  },
  client: {
    "/demo":             "Who needs a follow-up today?",
    "/demo/leads":       "Show my hottest leads",
    "/demo/messages":    "Write a text reply",
    "/demo/jobs":        "What jobs are waiting on me?",
    "/demo/settings":    "Help with settings",
  },
};

export function AppTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode } = useDashboardMode();
  const { setOpen } = useAICopilot();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const meta = PAGE_META[pathname] ?? { title: "Pipelly", breadcrumb: [] };
  const hints = AI_HINTS[mode] ?? AI_HINTS.client;
  const aiHint = hints[pathname] ?? "Ask AI";

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
    <header className="flex h-14 items-center gap-4 border-b border-gray-100 bg-white px-5">
      {/* Breadcrumb / Title */}
      <div className="flex items-center gap-1.5 text-sm shrink-0">
        {meta.breadcrumb.length > 0 ? (
          <>
            <span className="text-gray-400 text-xs">Pipelly</span>
            {meta.breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-gray-300 text-xs">/</span>
                <span className={cn("text-xs", i === meta.breadcrumb.length - 1 ? "font-semibold text-gray-900" : "text-gray-400")}>
                  {crumb}
                </span>
              </span>
            ))}
          </>
        ) : (
          <span className="text-sm font-semibold text-gray-900">{meta.title}</span>
        )}
      </div>

      {/* Search */}
      <div className="relative ml-2 flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={mode === "agency" ? "Search leads, deals, contacts..." : "Search leads, jobs, messages..."}
          className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none transition-colors"
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

        {/* AI action */}
        <button
          onClick={() => setOpen(true)}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-gray-900 pl-3 pr-3.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:block max-w-[180px] truncate">{aiHint}</span>
          <span className="block sm:hidden">AI</span>
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

        {/* Profile dropdown */}
        <div className="relative ml-0.5" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-1 rounded-lg hover:bg-gray-50 px-1 py-0.5 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white ring-2 ring-gray-100">
              JN
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Jordan Nassie</p>
                <p className="text-xs text-gray-500">jordan@daily.church</p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { setProfileOpen(false); router.push("/demo/settings"); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  Settings
                </button>
                <button
                  onClick={() => { setProfileOpen(false); handleLogout(); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
