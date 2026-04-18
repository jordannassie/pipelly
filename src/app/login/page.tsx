"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Briefcase, Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "pipelly-dashboard-mode";

export default function LoginPage() {
  const router = useRouter();

  const handleChoose = (mode: "agency" | "business") => {
    localStorage.setItem(STORAGE_KEY, mode);
    router.push(mode === "agency" ? "/demo/agency" : "/demo/business");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Back link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-lg">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">Pipelly.ai</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome to Pipelly</h1>
          <p className="text-sm text-gray-500">Choose a demo experience to get started</p>
        </div>

        {/* Demo cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Agency Demo */}
          <button
            onClick={() => handleChoose("agency")}
            className="group text-left bg-white border-2 border-gray-100 rounded-2xl p-7 hover:border-gray-900 hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-200 flex flex-col gap-5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-900/20">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase border border-gray-200 rounded-full px-2.5 py-1">
                AGENCY
              </span>
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 mb-1.5">Agency Demo</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Create and manage client business workspaces, assign admins, and monitor setups.
              </p>
            </div>
            <ul className="space-y-2 flex-1">
              {["Create client workspaces", "Assign admin users", "Monitor setup & health", "Simple client overview"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all pt-2 border-t border-gray-100">
              Enter Agency Demo <ArrowRight className="h-4 w-4" />
            </div>
          </button>

          {/* Business Demo */}
          <button
            onClick={() => handleChoose("business")}
            className="group text-left bg-white border-2 border-gray-100 rounded-2xl p-7 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-200 flex flex-col gap-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase border border-blue-200 rounded-full px-2.5 py-1 bg-blue-50">
                BUSINESS
              </span>
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900 mb-1.5">Business Demo</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Manage leads, messages, jobs, calendar, and AI-powered follow-up for your business.
              </p>
            </div>
            <ul className="space-y-2 flex-1">
              {["Leads & pipeline tracking", "Jobs & calendar management", "AI follow-up messages", "Daily task suggestions"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all pt-2 border-t border-gray-100">
              Enter Business Demo <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Demo mode — no account required · Data is pre-populated for exploration
        </p>
      </div>
    </div>
  );
}
