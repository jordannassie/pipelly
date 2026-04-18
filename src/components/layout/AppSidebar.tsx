"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users2,
  GitBranch,
  Contact,
  Inbox,
  Zap,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  LogOut,
  Briefcase,
  ListChecks,
  CalendarDays,
  BarChart3,
  CheckSquare,
  Building2,
  UserCog,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardMode } from "@/lib/dashboard-mode-context";

const AGENCY_NAV = [
  { label: "Home",        href: "/demo/agency",         icon: LayoutDashboard },
  { label: "Clients",     href: "/demo/agency/clients",  icon: Building2 },
  { label: "Setup",       href: "/demo/agency/setup",    icon: ListChecks },
  { label: "Automations", href: "/demo/agency/automations", icon: Zap },
  { label: "Team",        href: "/demo/agency/team",     icon: UserCog },
  { label: "Billing",     href: "/demo/agency/billing",  icon: CreditCard },
  { label: "Settings",    href: "/demo/agency/settings", icon: Settings },
];

const BUSINESS_NAV = [
  { label: "Home",        href: "/demo/business",              icon: LayoutDashboard },
  { label: "Leads",       href: "/demo/business/leads",        icon: Users2 },
  { label: "Pipeline",    href: "/demo/business/pipeline",     icon: GitBranch },
  { label: "Contacts",    href: "/demo/business/contacts",     icon: Contact },
  { label: "Messages",    href: "/demo/business/messages",     icon: Inbox },
  { label: "Calendar",    href: "/demo/business/calendar",     icon: CalendarDays },
  { label: "Automations", href: "/demo/business/automations",  icon: Zap },
  { label: "Analytics",   href: "/demo/business/analytics",    icon: BarChart3 },
  { label: "Tasks",       href: "/demo/business/tasks",        icon: CheckSquare },
  { label: "Settings",    href: "/demo/business/settings",     icon: Settings },
];

const AGENCY_WORKSPACES = [
  { label: "Apex Roofing",   color: "bg-emerald-500", initials: "AR" },
  { label: "BrightPath",     color: "bg-blue-500",    initials: "BP" },
  { label: "Northstar Spa",  color: "bg-violet-500",  initials: "NS" },
];

const BUSINESS_WORKSPACES = [
  { label: "My Business",    color: "bg-gray-900",    initials: "MB" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode } = useDashboardMode();

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("pipelly_theme") as "light" | "dark" | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("pipelly_theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("pipelly_mode");
    router.push("/login");
  };

  const nav = mode === "agency" ? AGENCY_NAV : BUSINESS_NAV;
  const workspaces = mode === "agency" ? AGENCY_WORKSPACES : BUSINESS_WORKSPACES;

  const isActive = (href: string) => {
    if (href === "/demo/agency" || href === "/demo/business") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleModeSwitch = (newMode: "agency" | "business") => {
    setMode(newMode);
    router.push(newMode === "agency" ? "/demo/agency" : "/demo/business");
  };

  const currentWorkspace = mode === "agency"
    ? { label: "Agency Dashboard", initials: "AG", color: "bg-gray-900" }
    : { label: "My Business", initials: "MB", color: "bg-emerald-600" };

  return (
    <aside className="flex h-full w-56 flex-col border-r border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 flex-shrink-0">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-gray-200 dark:border-gray-800 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
          <Sparkles className="h-4 w-4 text-white dark:text-gray-900" />
        </div>
        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          Pipelly<span className="text-gray-400">.ai</span>
        </span>
      </div>

      {/* Mode toggle */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-3 py-2.5">
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-900 p-0.5">
          <button
            onClick={() => handleModeSwitch("agency")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-semibold transition-all",
              mode === "agency"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            Agency
          </button>
          <button
            onClick={() => handleModeSwitch("business")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-semibold transition-all",
              mode === "business"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            )}
          >
            Business
          </button>
        </div>
      </div>

      {/* Workspace selector */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-3 py-2.5">
        <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
          <div className="flex items-center gap-2">
            <div className={cn("h-5 w-5 rounded flex items-center justify-center", currentWorkspace.color)}>
              <span className="text-[9px] font-bold text-white">{currentWorkspace.initials}</span>
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
              {currentWorkspace.label}
            </span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-0.5">
          {nav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive(href) ? "text-white dark:text-gray-900" : "text-gray-400"
                )}
              />
              {label}
            </Link>
          ))}
        </div>

        {/* Workspace quick-links */}
        {workspaces.length > 1 && (
          <div className="mt-5">
            <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Workspaces
            </p>
            <div className="space-y-0.5">
              {workspaces.map((ws) => (
                <button
                  key={ws.label}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span className={cn("h-2 w-2 rounded-full flex-shrink-0", ws.color.replace("bg-", "bg-").replace("-500", "-400"))} />
                  {ws.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom utilities */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-3 space-y-0.5">
        <Link
          href="#"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <HelpCircle className="h-4 w-4 flex-shrink-0 text-gray-400" />
          Help
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 flex-shrink-0 text-gray-400" />
          ) : (
            <Sun className="h-4 w-4 flex-shrink-0 text-gray-400" />
          )}
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>

      {/* User row + Logout */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 dark:bg-white text-xs font-bold text-white dark:text-gray-900 flex-shrink-0">
            JN
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">Jordan Nassie</p>
            <p className="truncate text-[10px] text-gray-400">
              {mode === "agency" ? "Admin · Agency" : "Admin · Business"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}
