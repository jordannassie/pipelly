"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Zap, GitBranch, Users2, Building2, CheckCircle2, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Copilot",
    description: "Context-aware AI that drafts outreach, scores leads, analyzes deals, and recommends the next best action — automatically.",
    accent: "text-violet-600 bg-violet-50",
  },
  {
    icon: Building2,
    title: "Client Workspaces",
    description: "Agencies can create and manage dedicated workspaces for every client — each with its own pipeline, leads, and automations.",
    accent: "text-blue-600 bg-blue-50",
  },
  {
    icon: GitBranch,
    title: "Pipeline & Deals",
    description: "Premium kanban pipeline with AI deal scoring, risk detection, and intelligent follow-up reminders built in.",
    accent: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Set up smart workflows that trigger on events — meetings booked, leads replied, deals stalled — no code required.",
    accent: "text-amber-600 bg-amber-50",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Agency creates a workspace", desc: "Spin up a client workspace in minutes. Configure the pipeline, invite admin users, and connect integrations." },
  { step: "02", title: "Business runs daily operations", desc: "The business team manages leads, messages, jobs, and calendar inside their own dashboard — AI handles the follow-up." },
  { step: "03", title: "AI moves everything faster", desc: "Pipelly surfaces the right actions, drafts the right messages, and keeps every deal and lead from slipping through the cracks." },
];

const AGENCY_BENEFITS = [
  "Create unlimited client workspaces",
  "Monitor workspace health in one view",
  "Manage admin users and permissions",
  "Launch setup in under 10 minutes",
];

const BUSINESS_BENEFITS = [
  "Simple AI-driven lead management",
  "Messages, jobs, and calendar in one place",
  "AI drafts follow-ups automatically",
  "Never miss a booked estimate or job",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-900">
              Pipelly<span className="text-gray-400">.ai</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              Book a Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-gray-600">Now in early access — agencies and local businesses</span>
        </div>
        <h1 className="mx-auto mb-6 max-w-3xl text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          The AI-powered operating system for agencies and businesses.
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-gray-500 leading-relaxed">
          Create client workspaces, manage leads, automate follow-up, and let AI help run the day-to-day. Built for agencies managing clients and local businesses doing the work.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            Try the Demo
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Book a Demo
          </Link>
        </div>

        {/* Product preview */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60">
          <div className="flex h-8 items-center gap-2 border-b border-gray-100 bg-gray-50 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs text-gray-400">app.pipelly.ai/demo/agency</span>
          </div>
          <div className="flex h-80 bg-gray-50">
            {/* Mini sidebar */}
            <div className="w-48 border-r border-gray-100 bg-white p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-5 w-5 rounded bg-gray-900 flex items-center justify-center"><Sparkles className="h-3 w-3 text-white" /></div>
                <span className="text-[11px] font-bold text-gray-900">Pipelly.ai</span>
              </div>
              <div className="flex rounded-md bg-gray-100 p-0.5 mb-1">
                <div className="flex-1 rounded bg-gray-900 py-1 text-center text-[10px] font-semibold text-white">Agency</div>
                <div className="flex-1 py-1 text-center text-[10px] text-gray-400">Business</div>
              </div>
              {["Home", "Clients", "Setup", "Automations", "Settings"].map((item, i) => (
                <div key={item} className={`rounded px-2 py-1 text-[11px] font-medium ${i === 0 ? "bg-gray-900 text-white" : "text-gray-500"}`}>{item}</div>
              ))}
            </div>
            {/* Content preview */}
            <div className="flex-1 p-6">
              <div className="mb-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">AI System Active</span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-900">Good morning, Jordan.</h3>
              <p className="mb-4 text-xs text-gray-400">3 clients need attention · 2 setups in progress · AI ready</p>
              <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">What do you want Pipelly to do today?</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[["4", "Clients"], ["2", "Setups"], ["3", "Healthy"], ["1", "Flagged"]].map(([v, l]) => (
                  <div key={l} className="rounded-lg border border-gray-100 bg-white p-2.5 text-center">
                    <p className="text-base font-bold text-gray-900">{v}</p>
                    <p className="text-[9px] text-gray-400">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Everything AI-driven. Nothing manual.</h2>
            <p className="text-gray-500">Every feature in Pipelly is built with AI doing the heavy lifting.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.accent}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-sm font-bold text-gray-900">{f.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">How Pipelly works</h2>
            <p className="text-gray-500">Designed for two types of users working together.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="relative pl-12">
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-xs font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mb-2 text-sm font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two user modes */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Built for two experiences</h2>
            <p className="text-gray-500">One platform, two distinct ways to work.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Agency card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1.5">
                <Building2 className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white">For Agencies</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Manage every client workspace from one command center.
              </h3>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                Create and manage client business workspaces, assign admin users, monitor workspace health, and launch setups in minutes.
              </p>
              <ul className="mb-8 space-y-2.5">
                {AGENCY_BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                onClick={() => localStorage.setItem("pipelly_mode", "agency")}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Try Agency Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Business card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5">
                <Users2 className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-semibold text-white">For Local Businesses</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Run your whole business from a single AI-powered dashboard.
              </h3>
              <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                Manage leads, messages, jobs, and calendar. AI drafts follow-ups, scores leads, and tells you who to call next.
              </p>
              <ul className="mb-8 space-y-2.5">
                {BUSINESS_BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                onClick={() => localStorage.setItem("pipelly_mode", "business")}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Try Business Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics preview */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">AI Analytics</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 leading-tight">
                Your AI copilot explains what changed and why.
              </h2>
              <p className="mb-6 text-gray-500 leading-relaxed">
                Pipelly doesn't just show you numbers. The AI surfaces insights, flags weak points, and tells you exactly what to do next — whether it's leads going cold, deals stalling, or automations firing wrong.
              </p>
              <div className="space-y-3">
                {[
                  "Elevate Roofing hasn't had activity in 6 days — at risk of going cold",
                  "Marcus Reid replied to your proposal — respond before Thursday meeting",
                  "12 leads went quiet 14+ days ago — AI can re-engage them automatically",
                ].map((insight) => (
                  <div key={insight} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Pipeline Health</span>
                <span className="text-xs text-gray-400">Last 30 days</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Leads Added", value: "312", change: "+18%", pos: true },
                  { label: "Positive Replies", value: "84", change: "+12%", pos: true },
                  { label: "Booked Calls", value: "41", change: "-3%", pos: false },
                  { label: "Open Deals", value: "28", change: "+5%", pos: true },
                  { label: "Revenue Influenced", value: "$148k", change: "+22%", pos: true },
                ].map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-2.5">
                    <span className="text-sm text-gray-600">{kpi.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{kpi.value}</span>
                      <span className={`text-xs font-medium ${kpi.pos ? "text-emerald-600" : "text-red-500"}`}>{kpi.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-100 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Ready to let AI run the work?
          </h2>
          <p className="mb-8 text-gray-500 leading-relaxed">
            Pipelly is the operating system built for agencies managing clients and local businesses doing the work. AI does the heavy lifting — you stay in control.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              Try the Demo Free
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-gray-200 px-8 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Pipelly<span className="text-gray-400">.ai</span></span>
          </div>
          <p className="text-xs text-gray-400">© 2026 Pipelly.ai · AI-powered acquisition system</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">Privacy</Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
