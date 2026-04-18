"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users2, MessageSquare, Briefcase, Settings,
  HelpCircle, Sparkles, GitBranch, Contact, Inbox, Zap,
  BarChart3, CheckSquare, Building2, LogOut, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import { useSidebar } from "@/lib/sidebar-context";

// Business mode — full daily operating system for one business
const agencyNav = [
  { label: "Home",        href: "/demo",             icon: LayoutDashboard },
  { label: "Leads",       href: "/demo/leads",       icon: Users2 },
  { label: "Pipeline",    href: "/demo/pipeline",    icon: GitBranch },
  { label: "Contacts",    href: "/demo/contacts",    icon: Contact },
  { label: "Inbox",       href: "/demo/inbox",       icon: Inbox },
  { label: "Automations", href: "/demo/automations", icon: Zap },
  { label: "Analytics",   href: "/demo/analytics",   icon: BarChart3 },
  { label: "Tasks",       href: "/demo/tasks",       icon: CheckSquare },
  { label: "Settings",    href: "/demo/settings",    icon: Settings },
];

// Agency mode — multi-client portfolio control center
const clientNav = [
  { label: "Home",       href: "/demo",             icon: LayoutDashboard },
  { label: "Workspaces", href: "/demo/workspaces",  icon: Building2 },
  { label: "Analytics",  href: "/demo/analytics",   icon: BarChart3 },
  { label: "Settings",   href: "/demo/settings",    icon: Settings },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode, userType } = useDashboardMode();

  const nav = mode === "client" ? agencyNav : clientNav;

  const isActive = (href: string) => {
    if (href === "/demo") return pathname === "/demo";
    return pathname.startsWith(href);
  };

  const handleModeSwitch = (newMode: "agency" | "client") => {
    if (newMode === mode) return;
    setMode(newMode);
    router.push("/demo");
    onClose?.();
  };

  const handleNav = () => onClose?.();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-100 bg-white">
      {/* Logo + mobile close */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-gray-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 flex-shrink-0">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <span className="text-base font-bold tracking-tight text-gray-900">Pipelly</span>
          <span className="text-base font-bold tracking-tight text-gray-400">.ai</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mode switcher — agency users only */}
      {userType === "agency" && (
        <div className="px-4 pt-4 pb-1">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 px-1 mb-1.5">View as</p>
          <div className="flex rounded-xl border border-gray-100 bg-gray-50 p-1">
            <button
              onClick={() => handleModeSwitch("agency")}
              className={cn(
                "flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all",
                mode === "agency" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Agency
            </button>
            <button
              onClick={() => handleModeSwitch("client")}
              className={cn(
                "flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all",
                mode === "client" ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Business
            </button>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {nav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={handleNav}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0", isActive(href) ? "text-white" : "text-gray-400")} />
              {label}
              {mode === "client" && label === "Automations" && (
                <span className="ml-auto rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 border border-emerald-100">AI</span>
              )}
              {mode === "client" && label === "Analytics" && (
                <span className="ml-auto rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 border border-blue-100">Live</span>
              )}
              {mode === "agency" && label === "Workspaces" && (
                <span className="ml-auto rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500 border border-gray-200">5</span>
              )}
            </Link>
          ))}
        </div>

        {mode === "agency" && (
          <div className="mt-5 px-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-300 mb-1.5">Client Workspaces</p>
            {["Apex Growth", "Northstar Media", "Elevate Roofing"].map((ws) => (
              <button key={ws} onClick={handleNav} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                {ws}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Bottom utilities */}
      <div className="px-4 py-3 border-t border-gray-100 space-y-0.5">
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <HelpCircle className="h-4 w-4 text-gray-400" />
          Help
        </button>
      </div>

      {/* User + Logout */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white flex-shrink-0">JN</div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">Jordan Nassie</p>
            <p className="truncate text-xs text-gray-400">{userType === "agency" ? "Admin · Agency" : "Owner · Business"}</p>
          </div>
        </div>
        <button
          onClick={() => { localStorage.removeItem("pipelly_mode"); router.push("/login"); }}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}

export function AppSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <div className="hidden md:flex h-full flex-shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden" style={{ animation: "slideInLeft 0.2s ease-out" }}>
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
