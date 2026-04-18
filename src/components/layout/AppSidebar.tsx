"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users2,
  GitBranch,
  Contact,
  Inbox,
  Zap,
  BarChart3,
  CheckSquare,
  Settings,
  Puzzle,
  HelpCircle,
  Sun,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", href: "/demo", icon: LayoutDashboard },
  { label: "Workspaces", href: "/demo/workspaces", icon: Briefcase },
  { label: "Leads", href: "/demo/leads", icon: Users2 },
  { label: "Pipeline", href: "/demo/pipeline", icon: GitBranch },
  { label: "Contacts", href: "/demo/contacts", icon: Contact },
  { label: "Inbox", href: "/demo/inbox", icon: Inbox },
  { label: "Automations", href: "/demo/automations", icon: Zap },
  { label: "Analytics", href: "/demo/analytics", icon: BarChart3 },
  { label: "Tasks", href: "/demo/tasks", icon: CheckSquare },
  { label: "Settings", href: "/demo/settings", icon: Settings },
];

const utilities = [
  { label: "Integrations", href: "/demo/settings", icon: Puzzle },
  { label: "Help", href: "#", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/demo") return pathname === "/demo";
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-full w-56 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-gray-200 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold tracking-tight text-gray-900">Pipelly<span className="text-gray-400">.ai</span></span>
      </div>

      {/* Workspace selector */}
      <div className="border-b border-gray-200 px-3 py-2.5">
        <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-violet-500 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">AG</span>
            </div>
            <span className="text-xs font-medium text-gray-700">Apex Growth</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
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
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", isActive(href) ? "text-white" : "text-gray-400")} />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom utilities */}
      <div className="border-t border-gray-200 px-3 py-3 space-y-0.5">
        {utilities.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Icon className="h-4 w-4 flex-shrink-0 text-gray-400" />
            {label}
          </Link>
        ))}
        {/* Theme toggle placeholder */}
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <Sun className="h-4 w-4 flex-shrink-0 text-gray-400" />
          Light Mode
        </button>
      </div>

      {/* User */}
      <div className="border-t border-gray-200 px-3 py-3">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white flex-shrink-0">JN</div>
          <div className="flex-1 min-w-0 text-left">
            <p className="truncate text-xs font-semibold text-gray-900">Jordan Nassie</p>
            <p className="truncate text-[10px] text-gray-400">Admin</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
