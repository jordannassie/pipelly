"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type DashboardMode = "agency" | "client";
export type UserType = "agency" | "client";

interface DashboardModeContextType {
  mode: DashboardMode;
  userType: UserType;
  hasChosen: boolean;
  setMode: (mode: DashboardMode) => void;
  setUserType: (type: UserType) => void;
  resetChoice: () => void;
}

const DashboardModeContext = createContext<DashboardModeContextType | null>(null);

const MODE_KEY = "pipelly-dashboard-mode";
const TYPE_KEY = "pipelly-user-type";

export function DashboardModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DashboardMode>("client");
  const [userType, setUserTypeState] = useState<UserType>("client");
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem(MODE_KEY);
    const storedType = localStorage.getItem(TYPE_KEY);
    if (storedMode === "agency" || storedMode === "client") {
      setModeState(storedMode);
      setHasChosen(true);
    }
    if (storedType === "agency" || storedType === "client") {
      setUserTypeState(storedType);
    }
  }, []);

  const setMode = useCallback((m: DashboardMode) => {
    setModeState(m);
    setHasChosen(true);
    localStorage.setItem(MODE_KEY, m);
  }, []);

  const setUserType = useCallback((t: UserType) => {
    setUserTypeState(t);
    localStorage.setItem(TYPE_KEY, t);
  }, []);

  const resetChoice = useCallback(() => {
    setHasChosen(false);
    localStorage.removeItem(MODE_KEY);
    localStorage.removeItem(TYPE_KEY);
  }, []);

  return (
    <DashboardModeContext.Provider value={{ mode, userType, hasChosen, setMode, setUserType, resetChoice }}>
      {children}
    </DashboardModeContext.Provider>
  );
}

export function useDashboardMode() {
  const ctx = useContext(DashboardModeContext);
  if (!ctx) throw new Error("useDashboardMode must be used within DashboardModeProvider");
  return ctx;
}
