"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect legacy /demo/client → /demo/business
export default function ClientRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/demo/business"); }, [router]);
  return null;
}
