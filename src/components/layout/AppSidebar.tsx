"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Users2,
  Briefcase,
  Settings,
  MessageSquare,
  CalendarDays,
  Building2,
  Wrench,
  Sparkles,
  LogOut,
  Sun,
  Moon,
  HelpCircle,
  ArrowLeftRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Nav definitions ────────────────────────────────────────────────────────────
const AGENCY_NAV = [
  { label: "Home",     href: "/demo/agency",          icon: Home      },
  { label: "Clients",  href: "/demo/agency/clients",  icon: Building2 },
  { label: "Setup",    href: "/demo/agency/setup",    icon: Wrench    },
  { label: "Settings", href: "/demo/agency/settings", icon: Settings  },
];

const BUSINESS_NAV = [
  { label: "Home",     href: "/demo/business",          icon: Home         },
  { label: "Leads",    href: "/demo/business/leads",    icon: Users2       },
  { label: "Messages", href: "/demo/business/messages", icon: MessageSquare},
  { label: "Jobs",     href: "/demo/business/jobs",     icon: Briefcase    },
  { label: "Calendar", href: "/demo/business/calendar", icon: CalendarDays },
  { label: "Settings", href: "/demo/business/settings", icon: Settings     },
];

const STORAGE_KEY = "pipelly-dashboard-mode";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  // Detect mode purely from URL
  const isAgency = pathname.startsWith("/demo/agency");
  const nav = isAgency ? AGENCY_NAV : BUSINESS_NAV;
  const modeLabel = isAgency ? "Agency" : "Business";
  const switchLabel = isAgency ? "Switch to Business" : "Switch to Agency";
  const switchTarget = isAgency ? "/demo/business" : "/demo/agency";

  // Theme init
  useEffect(() => {
    const stored = localStorage.getItem("pipelly-theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("pipelly-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("pipelly-theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  };

  const handleSwitchDemo = () => {
    localStorage.setItem(STORAGE_KEY, isAgency ? "business" : "agency");
    router.push(switchTarget);
  };

  const isActive = (href: string) => {
    if (href === "/demo/agency" || href === "/demo/business") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex flex-col h-full w-60 bg-white border-r border-gray-100 shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-gray-900">Pipelly.ai</span>
        </div>
        {/* Mode badge */}
        <div className="mt-3">
          <span className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border",
            isAgency
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-blue-50 text-blue-700 border-blue-200"
          )}>
            {isAgency ? <Building2 className="h-3 w-3" /> : <Briefcase className="h-3 w-3" />}
            {modeLabel} Mode
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-gray-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Utilities */}
      <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
        {/* Switch demo */}
        <button
          onClick={handleSwitchDemo}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftRight className="h-4 w-4 text-gray-400 shrink-0" />
          {switchLabel}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          {isDark
            ? <Sun className="h-4 w-4 text-gray-400 shrink-0" />
            : <Moon className="h-4 w-4 text-gray-400 shrink-0" />
          }
          {isDark ? "Light mode" : "Dark mode"}
        </button>

        {/* Help */}
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <HelpCircle className="h-4 w-4 text-gray-400 shrink-0" />
          Help
        </a>
      </div>

      {/* User + Logout */}
      <div className="px-3 pb-4 pt-3 border-t border-gray-100 space-y-2">
        {/* User row */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">Jordan Nassie</p>
            <p className="text-[11px] text-gray-400 truncate">{modeLabel} Admin</p>
          </div>
        </div>
        {/* Logout — always visually distinct */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
