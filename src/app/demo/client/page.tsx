"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("pipelly-dashboard-mode", "client");
    localStorage.setItem("pipelly-user-type", "client");
    router.replace("/demo");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
    </div>
  );
}
