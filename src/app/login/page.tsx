"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Building2, Users2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const enterDemo = (mode: "agency" | "business") => {
    localStorage.setItem("pipelly_mode", mode);
    router.push(mode === "agency" ? "/demo/agency" : "/demo/business");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-gray-900">
            Pipelly<span className="text-gray-400">.ai</span>
          </span>
        </Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          ← Back to home
        </Link>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-gray-500">Demo mode — no account needed</span>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome to Pipelly</h1>
        <p className="mb-12 text-gray-500">Choose a demo experience to explore.</p>

        <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          {/* Agency Demo */}
          <button
            onClick={() => enterDemo("agency")}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm hover:border-gray-900 hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Agency Demo</h2>
            <p className="mb-6 text-sm text-gray-500 leading-relaxed">
              Create and manage client business workspaces. Assign admin users, launch setups, and monitor workspace health from one dashboard.
            </p>
            <ul className="mb-8 space-y-2">
              {[
                "Multi-workspace management",
                "Client setup wizard",
                "Health & performance monitoring",
                "AI copilot for agencies",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:gap-3 transition-all">
              Enter Agency Demo
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>

          {/* Business Demo */}
          <button
            onClick={() => enterDemo("business")}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm hover:border-emerald-500 hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
              <Users2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">Business Demo</h2>
            <p className="mb-6 text-sm text-gray-500 leading-relaxed">
              Manage leads, messages, jobs, and calendar. AI drafts follow-ups, scores leads, and tells you who to call next — built for local businesses.
            </p>
            <ul className="mb-8 space-y-2">
              {[
                "Lead management & pipeline",
                "Messaging & customer inbox",
                "Jobs & calendar management",
                "AI follow-up & suggestions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
              Enter Business Demo
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        <p className="mt-10 text-xs text-gray-400">
          This is a demo environment. No real data or payment required.
        </p>
      </div>
    </div>
  );
}
