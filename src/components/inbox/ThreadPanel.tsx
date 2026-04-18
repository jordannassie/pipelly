"use client";

import { useState } from "react";
import { Sparkles, Star, Archive, Inbox, Flame, Thermometer, Snowflake, CheckCircle2, Copy } from "lucide-react";
import { cn, formatRelativeDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Thread } from "@/lib/types";

interface ThreadPanelProps {
  thread: Thread | null;
}

// ── Per-thread AI summaries ────────────────────────────────────────────────
const AI_SUMMARIES: Record<string, { summary: string; signal: "hot" | "warm" | "cold"; nextStep: string; sentiment: string }> = {
  "t-1": {
    summary: "Marcus is reviewing the proposal with his team and will respond by Thursday. He asked two clarifying questions — both positive buying signals. No objections raised. High close probability.",
    signal: "hot",
    nextStep: "Send a brief follow-up Thursday morning before he meets with his team.",
    sentiment: "Very positive — engaged, asks questions, no pushback",
  },
  "t-2": {
    summary: "Sophia confirmed the April 22nd demo and is asking whether to include her Head of Ops — a strong indication that multiple stakeholders are evaluating. This is an accelerated buying signal.",
    signal: "hot",
    nextStep: "Confirm who else will be on the call and prepare a multi-stakeholder demo flow.",
    sentiment: "Positive — adding decision-makers is a great sign",
  },
  "t-3": {
    summary: "Priya has a question about workspace setup for agencies. She's in the evaluation phase, comparing options. Low urgency but engaged. A well-timed response with a short Loom video could accelerate her decision.",
    signal: "warm",
    nextStep: "Reply with a 90-second Loom showing agency workspace setup. Keep it simple.",
    sentiment: "Neutral — evaluating, not yet committed",
  },
  "t-4": {
    summary: "Liam came via referral and is scaling outreach for solar. He's in early research mode with clear intent. Low friction to convert — a quick intro call could qualify him fast.",
    signal: "warm",
    nextStep: "Send a short intro and offer a 15-minute call to understand his goals.",
    sentiment: "Curious — referral source, likely credible",
  },
  "t-5": {
    summary: "Jackson replied to cold outreach and is requesting a short overview. This is a soft yes — he's open to learning more. A concise one-pager or short video would move him forward with minimal friction.",
    signal: "warm",
    nextStep: "Send a one-pager or 2-minute overview video and ask for a brief call.",
    sentiment: "Mildly interested — replied to cold email, low urgency",
  },
  "t-6": {
    summary: "Elena is following up from last week, suggesting she's still engaged but waiting on your response. Prompt reply is critical — this thread is at risk of going cold if not addressed today.",
    signal: "cold",
    nextStep: "Reply today. Acknowledge the delay and re-open the conversation with a direct question.",
    sentiment: "Fading — needs re-engagement immediately",
  },
};

// ── Per-thread suggested replies ───────────────────────────────────────────
const SUGGESTED_REPLIES: Record<string, string[]> = {
  "t-1": [
    "Thanks Marcus — happy to answer any questions before Thursday.",
    "Let me know if you'd like a quick call to walk through the details.",
    "Looking forward to hearing your team's thoughts by end of week.",
  ],
  "t-2": [
    "Absolutely, please include your Head of Ops — the more context the better.",
    "Confirmed for April 22nd — I'll send a calendar hold for all attendees.",
    "Great, I'll tailor the demo to cover both sales and operations.",
  ],
  "t-3": [
    "Happy to walk you through agency workspace setup — here's a quick overview.",
    "The setup takes about 10 minutes — can I book a brief screen share?",
    "I'll send you a short Loom that covers exactly what you're asking about.",
  ],
  "t-4": ["Great intro — let's set up a 15-minute call this week.", "Happy to learn more about your solar outreach goals.", "Can you share what your current lead volume looks like?"],
  "t-5": ["Sending over a short overview now — let me know if you'd like to chat.", "Happy to send more details. What's your biggest outreach challenge right now?", "I'll keep it brief — here's a 2-minute overview of how it works."],
  "t-6": ["Hey Elena — apologies for the delay. Still very interested in connecting.", "Happy to reconnect — want to jump on a quick call this week?", "Thanks for following up — what were you hoping to learn?"],
};

const SIGNAL_CONFIG = {
  hot:  { label: "Hot",  icon: Flame,       color: "text-red-500",    bg: "bg-red-50 border-red-200" },
  warm: { label: "Warm", icon: Thermometer,  color: "text-amber-500",  bg: "bg-amber-50 border-amber-200" },
  cold: { label: "Cold", icon: Snowflake,    color: "text-blue-400",   bg: "bg-blue-50 border-blue-200" },
};

export function ThreadPanel({ thread }: ThreadPanelProps) {
  const [replyText, setReplyText] = useState("");
  const [copiedReply, setCopiedReply] = useState<string | null>(null);

  if (!thread) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyState icon={Inbox} title="Select a conversation" description="Choose a thread from the list to view it here." />
      </div>
    );
  }

  const ai = AI_SUMMARIES[thread.id] ?? {
    summary: "AI is analyzing this conversation. Summary will appear shortly.",
    signal: "warm" as const,
    nextStep: "Review the thread and decide on a next step.",
    sentiment: "Analyzing...",
  };
  const replies = SUGGESTED_REPLIES[thread.id] ?? ["Sounds great, let's connect.", "Can you share more details?", "I'll follow up by end of week."];
  const signal = SIGNAL_CONFIG[ai.signal];
  const SignalIcon = signal.icon;

  const copyReply = (text: string) => {
    setReplyText(text);
    setCopiedReply(text);
    setTimeout(() => setCopiedReply(null), 1500);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 shrink-0 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-900">{thread.from}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{thread.company}</span>
              {thread.replies > 0 && (
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                  {thread.replies} replies
                </span>
              )}
            </div>
            <p className="text-base font-semibold text-gray-900 truncate">{thread.subject}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatRelativeDate(thread.timestamp)}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button className={cn("flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors", thread.starred ? "border-amber-200 text-amber-500" : "border-gray-200 text-gray-500 hover:border-gray-300")}>
              <Star className={cn("h-3.5 w-3.5", thread.starred && "fill-amber-400 text-amber-400")} />
              Star
            </button>
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:border-gray-300 transition-colors">
              <Archive className="h-3.5 w-3.5" />
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 bg-gray-50">

        {/* AI Summary card */}
        <div className="rounded-xl border bg-white p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">AI Summary</span>
            </div>
            {/* Signal badge */}
            <div className={cn("flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", signal.bg, signal.color)}>
              <SignalIcon className="h-3 w-3" />
              {signal.label} Lead
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-3">{ai.summary}</p>

          {/* Sentiment */}
          <div className="flex items-start gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mt-0.5 shrink-0">Sentiment</span>
            <span className="text-xs text-gray-600">{ai.sentiment}</span>
          </div>

          {/* Next step */}
          <div className="flex items-start gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 mb-3">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block mb-0.5">Recommended Next Step</span>
              <span className="text-xs text-gray-700">{ai.nextStep}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
              <Sparkles className="h-3 w-3" />
              Draft Reply
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
              Summarize Thread
            </button>
          </div>
        </div>

        {/* Thread messages */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-gray-600">
                {thread.from.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700 max-w-md leading-relaxed shadow-sm">
              {thread.preview}
            </div>
          </div>

          {thread.replies > 1 && (
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-gray-900 text-white rounded-xl p-4 text-sm max-w-md leading-relaxed">
                Thanks for the quick response — happy to walk you through everything. Let me know what time works best for a call this week.
              </div>
              <div className="h-7 w-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-white">JN</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested replies */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-3 w-3 text-gray-400" />
            <span className="text-xs font-medium text-gray-500">AI Suggested Replies</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {replies.map((reply) => (
              <button
                key={reply}
                onClick={() => copyReply(reply)}
                className="group flex items-center justify-between gap-2 border border-gray-200 bg-white rounded-xl px-3.5 py-2.5 text-left text-xs text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                <span className="flex-1 leading-relaxed">{reply}</span>
                <Copy className={cn("h-3.5 w-3.5 shrink-0 transition-colors", copiedReply === reply ? "text-emerald-500" : "text-gray-300 group-hover:text-gray-500")} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reply box */}
      <div className="border-t border-gray-200 px-6 py-4 shrink-0 bg-white">
        <textarea
          rows={3}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply or click a suggestion above to use it..."
          className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors mb-3"
        />
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-900 transition-colors">
            <Sparkles className="h-3.5 w-3.5" />
            AI Draft Reply
          </button>
          <button className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
