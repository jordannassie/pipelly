"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  MessageSquare,
  Briefcase,
  Settings,
  HelpCircle,
  Sparkles,
  GitBranch,
  Contact,
  Inbox,
  Zap,
  BarChart3,
  CheckSquare,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardMode } from "@/lib/dashboard-mode-context";

const agencyNav = [
  { label: "Home",        href: "/demo/agency",      icon: LayoutDashboard },
  { label: "Workspaces",  href: "/demo/workspaces",  icon: Building2 },
  { label: "Leads",       href: "/demo/leads",       icon: Users2 },
  { label: "Pipeline",    href: "/demo/pipeline",    icon: GitBranch },
  { label: "Contacts",    href: "/demo/contacts",    icon: Contact },
  { label: "Inbox",       href: "/demo/inbox",       icon: Inbox },
  { label: "Automations", href: "/demo/automations", icon: Zap },
  { label: "Analytics",   href: "/demo/analytics",   icon: BarChart3 },
  { label: "Tasks",       href: "/demo/tasks",       icon: CheckSquare },
  { label: "Settings",    href: "/demo/settings",    icon: Settings },
];

const clientNav = [
  { label: "Home",     href: "/demo/client",   icon: LayoutDashboard },
  { label: "Leads",    href: "/demo/leads",    icon: Users2 },
  { label: "Messages", href: "/demo/messages", icon: MessageSquare },
  { label: "Jobs",     href: "/demo/jobs",     icon: Briefcase },
  { label: "Settings", href: "/demo/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode, hasChosen } = useDashboardMode();

  const nav = mode === "agency" ? agencyNav : clientNav;

  const isActive = (href: string) => {
    if (href === "/demo/agency") return pathname === "/demo/agency";
    if (href === "/demo/client") return pathname === "/demo/client";
    return pathname.startsWith(href);
  };

  const handleModeSwitch = (newMode: "agency" | "client") => {
    if (newMode === mode) return;
    setMode(newMode);
    router.push(newMode === "agency" ? "/demo/agency" : "/demo/client");
  };

  return (
    <aside className="flex h-full w-60 flex-col border-r border-gray-100 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-gray-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold tracking-tight text-gray-900">Pipelly</span>
          <span className="text-sm font-bold tracking-tight text-gray-400">.ai</span>
        </div>
      </div>

      {/* Mode switcher */}
      {hasChosen && (
        <div className="px-4 pt-4 pb-1">
          <div className="flex rounded-xl border border-gray-100 bg-gray-50 p-1">
            <button
              onClick={() => handleModeSwitch("agency")}
              className={cn(
                "flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all",
                mode === "agency"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Agency
            </button>
            <button
              onClick={() => handleModeSwitch("client")}
              className={cn(
                "flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all",
                mode === "client"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Business
            </button>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className={cn("space-y-0.5", mode === "agency" ? "" : "space-y-1")}>
          {nav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl transition-colors",
                mode === "agency"
                  ? "px-3 py-2 text-sm font-medium"
                  : "px-3.5 py-3 text-sm font-medium",
                isActive(href)
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "flex-shrink-0",
                  mode === "agency" ? "h-4 w-4" : "h-5 w-5",
                  isActive(href) ? "text-white" : "text-gray-400"
                )}
              />
              {label}
              {/* Agency-only: subtle complexity indicator */}
              {mode === "agency" && label === "Automations" && (
                <span className="ml-auto rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 border border-emerald-100">
                  AI
                </span>
              )}
              {mode === "agency" && label === "Analytics" && (
                <span className="ml-auto rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 border border-blue-100">
                  Live
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Agency: section label */}
        {mode === "agency" && (
          <div className="mt-5 px-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Workspaces</p>
            {["Apex Growth", "Northstar Media", "Elevate Roofing"].map((ws) => (
              <button
                key={ws}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                {ws}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-100 space-y-0.5">
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <HelpCircle className="h-4 w-4 text-gray-400" />
          Help
        </button>
      </div>

      {/* User */}
      <div className="border-t border-gray-100 px-4 py-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white flex-shrink-0">
            JN
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="truncate text-sm font-semibold text-gray-900">Jordan Nassie</p>
            <p className="truncate text-xs text-gray-400">
              {mode === "agency" ? "Admin · Agency" : "Owner · Business"}
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
}
