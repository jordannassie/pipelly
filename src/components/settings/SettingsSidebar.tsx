"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Users,
  CreditCard,
  Puzzle,
  Bell,
  Sun,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Workspace", icon: Settings, href: "/demo/settings" },
  { label: "Team & Users", icon: Users, href: "/demo/settings/users" },
  { label: "Billing & Plan", icon: CreditCard, href: "/demo/settings/billing" },
  { label: "Integrations", icon: Puzzle, href: "/demo/settings" },
  { label: "Notifications", icon: Bell, href: "/demo/settings" },
  { label: "Theme", icon: Sun, href: "/demo/settings" },
  { label: "AI Preferences", icon: Sparkles, href: "/demo/settings" },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 border-r border-gray-200 bg-white h-full p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 px-3 mb-2">
        Settings
      </p>
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href && label !== "Integrations" && label !== "Notifications" && label !== "Theme" && label !== "AI Preferences"
            ? true
            : pathname === href && label === "Workspace";

          const active =
            (label === "Workspace" && pathname === "/demo/settings") ||
            (label === "Team & Users" && pathname === "/demo/settings/users") ||
            (label === "Billing & Plan" && pathname === "/demo/settings/billing");

          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-gray-100 font-semibold text-gray-900"
                  : "font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
