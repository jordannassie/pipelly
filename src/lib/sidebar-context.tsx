"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  mobileOpen: false,
  setMobileOpen: () => {},
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = () => setMobileOpen((v) => !v);
  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
