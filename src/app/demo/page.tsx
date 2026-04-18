"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DemoRootPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("pipelly_mode");
    if (stored === "business") {
      router.replace("/demo/business");
    } else {
      router.replace("/demo/agency");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
        <p className="text-sm text-gray-400">Loading Pipelly...</p>
      </div>
    </div>
  );
}
