"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  MessageSquare,
  Briefcase,
  Settings,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home",     href: "/demo",           icon: LayoutDashboard },
  { label: "Leads",    href: "/demo/leads",      icon: Users2 },
  { label: "Messages", href: "/demo/messages",   icon: MessageSquare },
  { label: "Jobs",     href: "/demo/jobs",       icon: Briefcase },
  { label: "Settings", href: "/demo/settings",   icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/demo") return pathname === "/demo";
    return pathname.startsWith(href);
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

      {/* Main nav */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {nav.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive(href) ? "text-white" : "text-gray-400"
                )}
              />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-4 py-5 border-t border-gray-100 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <HelpCircle className="h-5 w-5 text-gray-400" />
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
            <p className="truncate text-xs text-gray-400">Owner</p>
          </div>
        </button>
      </div>
    </aside>
  );
}
