"use client";

import { useState } from "react";
import { Search, Inbox, Send, FileText, Archive, SlidersHorizontal } from "lucide-react";
import { mockThreads } from "@/lib/mock-data";
import { InboxList } from "@/components/inbox/InboxList";
import { ThreadPanel } from "@/components/inbox/ThreadPanel";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Inbox", icon: Inbox, badge: 2 },
  { label: "Drafts", icon: FileText, badge: null },
  { label: "Sent", icon: Send, badge: null },
  { label: "Archive", icon: Archive, badge: null },
];

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>(mockThreads[0].id);
  const [activeNav, setActiveNav] = useState("Inbox");

  const selectedThread = mockThreads.find((t) => t.id === selectedId) ?? null;
  const unreadCount = mockThreads.filter((t) => !t.read).length;

  return (
    <div className="flex h-full overflow-hidden flex-col md:flex-row">
      {/* Left Rail */}
      <div className="w-56 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-xs text-gray-600 placeholder:text-gray-400 outline-none bg-transparent"
            />
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full text-left",
                activeNav === item.label
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== null && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                    activeNav === item.label
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Middle Panel */}
      <div className="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white flex flex-col max-h-56 md:max-h-none">
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Inbox</span>
            {unreadCount > 0 && (
              <Badge variant="info">{unreadCount} unread</Badge>
            )}
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
        <InboxList
          threads={mockThreads}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <ThreadPanel thread={selectedThread} />
      </div>
    </div>
  );
}
