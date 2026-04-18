"use client";

import { useState } from "react";
import { Sparkles, Send, Copy, Check, Phone, ChevronRight } from "lucide-react";
import { mockLiteMessages, type LiteMessage } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAICopilot } from "@/lib/ai-copilot-context";

const AI_DRAFTS: Record<string, string> = {
  "m-1": "Hi Dave! Thanks for reaching out — yes, we'd love to help with your roof. Are you available for a quick call this week? We can also come out for a free estimate at your convenience.",
  "m-2": "Hi Jessica! Great question. The 30-year shingle option includes architectural shingles, new synthetic underlayment, a full ridge cap, and complete debris cleanup after the job. Want me to send a side-by-side comparison?",
  "m-3": "Hi Tom! Our crew will be there at 7:30 AM sharp on Tuesday. We'll send you a text 30 minutes before we head your way. See you then!",
  "m-4": "Hi Sarah! We have Monday morning (8–10 AM) or Wednesday morning (9–11 AM) available. Which works better for you?",
  "m-5": "Hi Ray! Great question — our gutters come with a 10-year warranty on materials and 2-year on labor. We stand behind our work completely. Let me know if you have any other questions!",
};

export default function MessagesPage() {
  const [selected, setSelected] = useState<LiteMessage>(mockLiteMessages[0]);
  const [reply, setReply] = useState("");
  const [copied, setCopied] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const { openWithQuery } = useAICopilot();

  const handleAIDraft = () => {
    setLoadingDraft(true);
    setShowDraft(false);
    setTimeout(() => {
      setLoadingDraft(false);
      setShowDraft(true);
      setReply(AI_DRAFTS[selected.id] ?? "Hi! Thanks for reaching out. Happy to help — let me know a good time to connect.");
    }, 900);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const unreadCount = mockLiteMessages.filter((m) => m.unread).length;

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── Conversation list ── */}
      <div className="w-80 flex-shrink-0 border-r border-gray-100 bg-white flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div>
            <h1 className="text-base font-bold text-gray-900">Messages</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
            )}
          </div>
        </div>

        {/* AI hint */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {["Who replied today?", "Draft a follow-up"].map((q) => (
              <button
                key={q}
                onClick={() => openWithQuery(q)}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
              >
                <Sparkles className="h-3 w-3 text-gray-400" />
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Threads */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {mockLiteMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelected(msg); setShowDraft(false); setReply(""); }}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-gray-50",
                selected.id === msg.id ? "bg-gray-50" : ""
              )}
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                {msg.from.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={cn("text-sm truncate", msg.unread ? "font-bold text-gray-900" : "font-medium text-gray-700")}>
                    {msg.from}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {msg.unread && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate">{msg.service}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.preview}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Thread view ── */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Thread header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">{selected.from}</h2>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{selected.service}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Phone className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{selected.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWithQuery(`Summarize my conversation with ${selected.from}`)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-gray-400" />
              Summarize
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              Call
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {selected.messages.map((msg, i) => (
            <div key={i} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.sender === "me"
                  ? "bg-gray-900 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-900 rounded-bl-sm"
              )}>
                {msg.text}
                <p className={cn("text-[10px] mt-1.5", msg.sender === "me" ? "text-gray-400" : "text-gray-500")}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply area */}
        <div className="border-t border-gray-100 px-6 py-4">
          {/* AI Draft toggle */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleAIDraft}
              disabled={loadingDraft}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-white hover:border-gray-300 transition-colors disabled:opacity-50"
            >
              {loadingDraft
                ? <><Sparkles className="h-3.5 w-3.5 text-gray-400 animate-pulse" /> Writing reply...</>
                : <><Sparkles className="h-3.5 w-3.5 text-gray-400" /> Write reply with AI</>
              }
            </button>
            {showDraft && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
              </button>
            )}
          </div>

          {/* Textarea */}
          <div className="relative rounded-xl border border-gray-200 bg-gray-50 focus-within:border-gray-400 focus-within:bg-white transition-all">
            <textarea
              rows={3}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              className="w-full resize-none rounded-xl bg-transparent px-4 pt-3 pb-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <div className="absolute bottom-2.5 right-3 flex items-center gap-2">
              <button
                onClick={() => setReply("")}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear
              </button>
              <button
                disabled={!reply.trim()}
                className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:opacity-30 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Send
              </button>
            </div>
          </div>

          {/* Quick-reply suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {["Thanks, I'll check and get back to you.", "Can we schedule a call this week?", "I'll send that over shortly!"].map((s) => (
              <button
                key={s}
                onClick={() => setReply(s)}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500 hover:border-gray-300 hover:text-gray-800 hover:bg-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
