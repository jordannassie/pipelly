"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDashboardMode } from "@/lib/dashboard-mode-context";
import { Sparkles } from "lucide-react";

export default function DemoIndexPage() {
  const { mode, hasChosen } = useDashboardMode();
  const router = useRouter();

  useEffect(() => {
    if (hasChosen) {
      router.replace(mode === "agency" ? "/demo/agency" : "/demo/client");
    } else {
      router.replace("/login");
    }
  }, [mode, hasChosen, router]);

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="flex items-center gap-2 text-gray-400">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Loading your dashboard...</span>
      </div>
    </div>
  );
}
