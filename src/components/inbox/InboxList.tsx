"use client";

import { Star } from "lucide-react";
import { cn, formatRelativeDate } from "@/lib/utils";
import type { Thread } from "@/lib/types";

interface InboxListProps {
  threads: Thread[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InboxList({ threads, selectedId, onSelect }: InboxListProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {threads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => onSelect(thread.id)}
          className={cn(
            "w-full text-left border-b border-gray-100 py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors relative",
            selectedId === thread.id
              ? "bg-gray-50 border-l-2 border-l-gray-900"
              : "border-l-2 border-l-transparent"
          )}
        >
          <div className="flex items-start gap-2">
            {/* Unread indicator */}
            <div className="mt-1.5 shrink-0 w-2 h-2">
              {!thread.read && (
                <span className="block h-2 w-2 rounded-full bg-blue-500" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* From + timestamp */}
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <div className="flex items-center gap-1 min-w-0">
                  <span
                    className={cn(
                      "text-sm truncate",
                      !thread.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"
                    )}
                  >
                    {thread.from}
                  </span>
                  <span className="text-xs text-gray-400 truncate shrink-0">
                    · {thread.company}
                  </span>
                  {thread.starred && (
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-gray-400 shrink-0">
                  {formatRelativeDate(thread.timestamp)}
                </span>
              </div>

              {/* Subject */}
              <p
                className={cn(
                  "text-sm truncate mb-0.5",
                  !thread.read ? "font-semibold text-gray-800" : "text-gray-700"
                )}
              >
                {thread.subject}
              </p>

              {/* Preview + reply count */}
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-400 truncate flex-1">
                  {thread.preview}
                </p>
                {thread.replies > 0 && (
                  <span className="shrink-0 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                    {thread.replies}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
