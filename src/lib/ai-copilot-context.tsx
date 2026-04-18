"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type AICardType =
  | "workspace"
  | "outreach"
  | "pipeline"
  | "contact"
  | "automations"
  | "tasks";

interface AICopilotContextType {
  isOpen: boolean;
  pendingQuery: string | null;
  openWithQuery: (query: string) => void;
  consumePendingQuery: () => string | null;
  setOpen: (open: boolean) => void;
}

const AICopilotContext = createContext<AICopilotContextType | null>(null);

export function AICopilotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  const openWithQuery = useCallback((query: string) => {
    setPendingQuery(query);
    setOpen(true);
  }, []);

  const consumePendingQuery = useCallback((): string | null => {
    const q = pendingQuery;
    setPendingQuery(null);
    return q;
  }, [pendingQuery]);

  return (
    <AICopilotContext.Provider value={{ isOpen, pendingQuery, openWithQuery, consumePendingQuery, setOpen }}>
      {children}
    </AICopilotContext.Provider>
  );
}

export function useAICopilot() {
  const ctx = useContext(AICopilotContext);
  if (!ctx) throw new Error("useAICopilot must be used within AICopilotProvider");
  return ctx;
}

// ── Query → Card type detection ────────────────────────────────────────────
export function detectCardType(query: string): AICardType | null {
  const q = query.toLowerCase();
  if (q.includes("workspace") || q.includes("new client") || q.includes("create a client")) return "workspace";
  if (q.includes("outreach") || q.includes("draft") || q.includes("write") || q.includes("email") || q.includes("message") || q.includes("sequence")) return "outreach";
  if (q.includes("pipeline") || q.includes("deals") || q.includes("at risk") || q.includes("stuck") || q.includes("analyze") || q.includes("forecast")) return "pipeline";
  if (q.includes("contact") || q.includes("summarize") || q.includes("who is") || q.includes("tell me about") || q.includes("marcus") || q.includes("sophia")) return "contact";
  if (q.includes("automation") || q.includes("workflow") || q.includes("automate") || q.includes("recommend auto") || q.includes("trigger")) return "automations";
  if (q.includes("task") || q.includes("follow-up") || q.includes("follow up") || q.includes("prioritize") || q.includes("to-do") || q.includes("next steps") || q.includes("generate task")) return "tasks";
  return null;
}
