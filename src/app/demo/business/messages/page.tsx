"use client";

import { useState } from "react";
import { mockLiteMessages } from "@/lib/mock-data";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { Sparkles, Send, ArrowLeft, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const AI_DRAFTS: Record<string, string> = {
  "m-1": "Hi Dave! Thanks for reaching out. I can come by tomorrow morning for a free estimate — does 9 AM work for you?",
  "m-2": "Hi Jessica! The comparison sheet is attached. Yes, cleanup is included — we haul everything away same day.",
  "m-3": "Hi Tom! We're all set for Tuesday. See you at 7:30 AM!",
  "m-4": "Hi Sarah! I can come by Wednesday or Thursday morning — which works better for you?",
};

export default function BusinessMessagesPage() {
  const { openWithQuery } = useAICopilot();
  const [activeId, setActiveId] = useState<string | null>(mockLiteMessages[0]?.id ?? null);
  const [reply, setReply] = useState("");
  const [aiDraft, setAiDraft] = useState<string | null>(null);

  const active = mockLiteMessages.find((m) => m.id === activeId);

  const handleAIDraft = () => {
    const draft = AI_DRAFTS[activeId ?? ""] ?? "Hi! Thanks for your message. I'll follow up shortly.";
    setAiDraft(draft);
    setReply(draft);
  };

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col">
      <div className="flex-1 flex overflow-hidden max-w-5xl w-full mx-auto px-6 py-6 gap-4">

        {/* Thread list */}
        <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Messages</p>
            <p className="text-xs text-gray-400">{mockLiteMessages.length} conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {mockLiteMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setActiveId(msg.id); setAiDraft(null); setReply(""); }}
                className={cn(
                  "w-full text-left p-4 hover:bg-gray-50 transition-colors",
                  activeId === msg.id ? "bg-gray-50 border-l-2 border-gray-900" : ""
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
                    {msg.from[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-900 truncate">{msg.from}</p>
                      {msg.unread && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{msg.preview}</p>
                    <p className="text-[11px] text-gray-300 mt-1">{msg.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active thread */}
        {active ? (
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            {/* Thread header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <button className="sm:hidden" onClick={() => setActiveId(null)}>
                <ArrowLeft className="h-4 w-4 text-gray-400" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                {active.from[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{active.from}</p>
                <p className="text-xs text-gray-400">{active.phone}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={handleAIDraft}
                  className="h-8 px-3 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> AI Draft Reply
                </button>
                <button
                  onClick={() => openWithQuery(`Summarize my conversation with ${active.from}`)}
                  className="h-8 px-3 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Summarize
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {active.messages.map((m, i) => (
                <div key={i} className={cn("flex", m.sender === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm",
                    m.sender === "me"
                      ? "bg-gray-900 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  )}>
                    <p>{m.text}</p>
                    <p className="text-[11px] mt-1 opacity-60">{m.time}</p>
                  </div>
                </div>
              ))}

              {aiDraft && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-blue-600 mb-1 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> AI suggested reply
                  </p>
                  <p className="text-xs text-blue-800">{aiDraft}</p>
                  <p className="text-[11px] text-blue-500 mt-1">Loaded into reply box below — edit and send.</p>
                </div>
              )}
            </div>

            {/* Reply bar */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a reply…"
                  className="flex-1 h-10 px-4 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  disabled={!reply.trim()}
                  className="h-10 px-4 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
                >
                  <Send className="h-4 w-4" /> Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Select a conversation</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
