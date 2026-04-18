"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type DashboardMode = "agency" | "business";

interface DashboardModeContextType {
  mode: DashboardMode;
  setMode: (m: DashboardMode) => void;
}

const DashboardModeContext = createContext<DashboardModeContextType>({
  mode: "agency",
  setMode: () => {},
});

export function DashboardModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DashboardMode>("agency");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pipelly_mode") as DashboardMode | null;
    if (stored === "agency" || stored === "business") {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  const setMode = (m: DashboardMode) => {
    setModeState(m);
    localStorage.setItem("pipelly_mode", m);
  };

  if (!mounted) return null;

  return (
    <DashboardModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DashboardModeContext.Provider>
  );
}

export function useDashboardMode() {
  return useContext(DashboardModeContext);
}
