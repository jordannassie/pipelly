"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles, ArrowRight, Check, Briefcase, ChevronLeft, Layers,
} from "lucide-react";

const STORAGE_KEY = "pipelly-dashboard-mode";

export default function LoginPage() {
  const router = useRouter();

  const handleChoose = (mode: "agency" | "client") => {
    localStorage.setItem(STORAGE_KEY, mode);
    router.push(mode === "agency" ? "/demo/agency" : "/demo/client");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Subtle grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:48px_48px] opacity-70 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      {/* Topbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">Pipelly<span className="text-gray-400">.ai</span></span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-500 shadow-sm mb-6">
              <Sparkles className="h-3.5 w-3.5 text-gray-900" />
              No sign-up required
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Pipelly</h1>
            <p className="text-base text-gray-500">
              Choose a demo experience. You can switch anytime from inside the app.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

            {/* Agency */}
            <button
              onClick={() => handleChoose("agency")}
              className="group text-left rounded-2xl border-2 border-gray-200 bg-white p-7 shadow-sm hover:border-gray-900 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 group-hover:scale-105 transition-transform duration-200">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base font-bold text-gray-900">Agency Demo</span>
                    <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[9px] font-bold text-white">PRO</span>
                  </div>
                  <span className="text-xs text-gray-500">For agencies &amp; consultants</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Manage multiple client workspaces, launch setups, and monitor client performance — all from one AI-powered operating system.
              </p>
              <ul className="space-y-2 mb-6">
                {["Multi-client workspaces","Full pipeline & deals","Automations & workflows","Team inbox","Analytics"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="h-3.5 w-3.5 text-gray-900 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:gap-3 transition-all">
                Open Agency Demo <ArrowRight className="h-4 w-4" />
              </div>
            </button>

            {/* Local Business */}
            <button
              onClick={() => handleChoose("client")}
              className="group text-left rounded-2xl border-2 border-gray-200 bg-white p-7 shadow-sm hover:border-gray-900 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 group-hover:scale-105 transition-transform duration-200">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base font-bold text-gray-900">Client Demo</span>
                    <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[9px] font-bold text-white">SIMPLE</span>
                  </div>
                  <span className="text-xs text-gray-500">For local service businesses</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Simple AI-driven dashboard for a local business to manage leads, messages, jobs, and next actions — without the complexity.
              </p>
              <ul className="space-y-2 mb-6">
                {["Simple lead list","Text message center","Jobs board & kanban","AI writes your replies","Daily task reminders"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:gap-3 transition-all">
                Open Client Demo <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400">
            This is a live interactive demo. No account or credit card needed.
            <br />
            Not sure? Start with the{" "}
            <button onClick={() => handleChoose("client")} className="underline hover:text-gray-700 transition-colors font-medium">
              Client Demo
            </button>
            {" "}— it&apos;s the simpler experience.
          </p>

        </div>
      </main>
    </div>
  );
}
