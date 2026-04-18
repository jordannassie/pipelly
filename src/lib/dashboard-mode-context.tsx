"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type DashboardMode = "agency" | "business";

interface DashboardModeContextType {
  mode: DashboardMode;
  hasChosen: boolean;
  setMode: (mode: DashboardMode) => void;
  resetChoice: () => void;
}

const DashboardModeContext = createContext<DashboardModeContextType | null>(null);

const STORAGE_KEY = "pipelly-dashboard-mode";

export function DashboardModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DashboardMode>("business");
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // migrate "client" → "business"
    const resolved = stored === "agency" ? "agency" : stored === "business" || stored === "client" ? "business" : null;
    if (resolved) {
      setModeState(resolved);
      setHasChosen(true);
    }
  }, []);

  const setMode = useCallback((m: DashboardMode) => {
    setModeState(m);
    setHasChosen(true);
    localStorage.setItem(STORAGE_KEY, m);
  }, []);

  const resetChoice = useCallback(() => {
    setHasChosen(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <DashboardModeContext.Provider value={{ mode, hasChosen, setMode, resetChoice }}>
      {children}
    </DashboardModeContext.Provider>
  );
}

export function useDashboardMode() {
  const ctx = useContext(DashboardModeContext);
  if (!ctx) throw new Error("useDashboardMode must be used within DashboardModeProvider");
  return ctx;
}
