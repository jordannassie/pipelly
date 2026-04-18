"use client";

import { Sparkles, Star, Archive, Inbox } from "lucide-react";
import { cn, formatRelativeDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Thread } from "@/lib/types";

interface ThreadPanelProps {
  thread: Thread | null;
}

const AI_SUMMARIES: Record<string, string> = {
  "t-1":
    "Marcus is reviewing the Pipelly proposal with his team and will respond by Thursday. The conversation is warm — he's asking clarifying questions and appears ready to move forward.",
  "t-2":
    "Sophia confirmed the April 22nd demo and is asking whether to include her Head of Ops. Engagement is high; this is a strong buying signal.",
  "t-3":
    "Priya has a quick question about how workspace setup works for agencies. She's in the onboarding evaluation phase and needs a concise walkthrough.",
  "t-4":
    "Liam found Pipelly through a referral and is scaling solar outreach. He's early-stage but shows clear intent — a well-timed intro call could qualify him quickly.",
  "t-5":
    "Jackson responded to cold outreach and is requesting a short overview. Low friction — a one-pager or short video could move him to a discovery call.",
  "t-6":
    "Elena is following up from last week, indicating she's still engaged. Responding promptly here will prevent the conversation from going cold.",
};

const SUGGESTED_REPLIES = [
  "Sounds great, let's connect Thursday.",
  "Can you share more details?",
  "I'll follow up by end of week.",
];

export function ThreadPanel({ thread }: ThreadPanelProps) {
  if (!thread) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState icon={Inbox} title="Select a conversation" description="Choose a thread from the list to view it here." />
      </div>
    );
  }

  const summary = AI_SUMMARIES[thread.id] ?? "AI is analyzing this conversation. Summary will appear shortly.";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-900">{thread.from}</span>
              <span className="text-xs text-gray-500">{thread.company}</span>
            </div>
            <p className="text-base font-semibold text-gray-900 truncate">{thread.subject}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatRelativeDate(thread.timestamp)}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              className={cn(
                "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-gray-300",
                thread.starred ? "text-amber-500" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Star className={cn("h-3.5 w-3.5", thread.starred && "fill-amber-400 text-amber-400")} />
              Star
            </button>
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
              <Archive className="h-3.5 w-3.5" />
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* AI Summary */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">AI Summary</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          <div className="flex items-center gap-2 mt-3">
            <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Draft Reply
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
              Summarize Thread
            </button>
          </div>
        </div>

        {/* Thread messages */}
        <div className="flex flex-col gap-3 mb-5">
          {/* Incoming message */}
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-gray-600">
                {thread.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 max-w-md leading-relaxed">
              {thread.preview}
            </div>
          </div>

          {/* Jordan's reply (shown when replies > 1) */}
          {thread.replies > 1 && (
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-gray-900 text-white rounded-xl p-4 text-sm max-w-md leading-relaxed">
                Thanks for the quick response! Happy to walk you through everything — let me know what time works best for a call this week.
              </div>
              <div className="h-7 w-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-white">JN</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested replies */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3 w-3 text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Suggested Replies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_REPLIES.map((reply) => (
              <button
                key={reply}
                className="border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600 cursor-pointer hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reply box */}
      <div className="border-t border-gray-200 px-6 py-4 shrink-0">
        <textarea
          rows={3}
          placeholder="Write a reply or let AI draft it..."
          className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors mb-3"
        />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            <Sparkles className="h-3.5 w-3.5" />
            AI Draft Reply
          </button>
          <button className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
