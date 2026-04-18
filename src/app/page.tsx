"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles, ArrowRight, Check, Zap, Users2, Building2, GitBranch,
  MessageSquare, Briefcase, CheckCircle2, TrendingUp, ChevronRight, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD MOCKUP (product preview)
// ─────────────────────────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 mx-3 h-6 rounded-md bg-white border border-gray-200 flex items-center px-3 gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-300" />
          <span className="text-[11px] text-gray-400 font-mono">pipelly.ai/demo</span>
        </div>
      </div>

      {/* App shell */}
      <div className="flex" style={{ height: 380 }}>
        {/* Mini sidebar */}
        <div className="w-40 border-r border-gray-100 bg-white flex flex-col shrink-0">
          <div className="flex items-center gap-2 px-3 py-3.5 border-b border-gray-100">
            <div className="h-5 w-5 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-[11px] font-bold text-gray-900">Pipelly.ai</span>
          </div>
          <div className="flex-1 p-2 space-y-0.5">
            {[
              { label: "Home", active: true },
              { label: "Leads", active: false },
              { label: "Messages", active: false },
              { label: "Jobs", active: false },
              { label: "Settings", active: false },
            ].map(({ label, active }) => (
              <div key={label} className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium",
                active ? "bg-gray-900 text-white" : "text-gray-400"
              )}>
                <div className={cn("h-2.5 w-2.5 rounded shrink-0", active ? "bg-white/40" : "bg-gray-200")} />
                {label}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 p-2">
            <div className="flex items-center gap-2 rounded-lg px-2.5 py-2">
              <div className="h-5 w-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-bold text-white">JN</span>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-gray-900 truncate">Jordan N.</p>
                <p className="text-[8px] text-gray-400">Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-50/60 p-4 overflow-hidden flex flex-col gap-3">
          {/* Greeting + topbar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Good morning, Jordan.</p>
              <p className="text-[10px] text-gray-500">Here&apos;s your business today.</p>
            </div>
            <div className="flex h-7 items-center gap-1.5 rounded-lg bg-gray-900 px-3">
              <Sparkles className="h-3 w-3 text-white" />
              <span className="text-[10px] text-white font-medium">Ask AI</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-2">
            {[
              ["12",    "New Leads",      "text-blue-600",    "bg-blue-50"],
              ["4",     "Follow Ups",     "text-amber-600",   "bg-amber-50"],
              ["7",     "Booked Jobs",    "text-emerald-600", "bg-emerald-50"],
              ["$8.4k", "Revenue",        "text-gray-900",    "bg-gray-50"],
            ].map(([val, label, textColor, bgColor]) => (
              <div key={label} className="rounded-xl border border-gray-100 bg-white p-2.5">
                <p className="text-[8px] text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-bold text-gray-900">{val}</p>
                <div className={cn("mt-1 rounded-full px-1.5 py-0.5 text-[8px] font-semibold w-fit", textColor, bgColor)}>
                  +{Math.floor(Math.random() * 20) + 5}%
                </div>
              </div>
            ))}
          </div>

          {/* Tasks + Leads */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="rounded-xl border border-gray-100 bg-white p-3 overflow-hidden">
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="h-3 w-3 text-gray-400" />
                <p className="text-[9px] font-semibold text-gray-700">Today&apos;s Tasks</p>
                <span className="rounded-full bg-red-50 px-1 py-0.5 text-[8px] font-bold text-red-500 ml-auto">4</span>
              </div>
              {[
                { text: "Call Dave Mitchell", done: true },
                { text: "Follow up Jessica K.", done: false },
                { text: "Confirm Tom Nguyen job", done: false },
              ].map(({ text, done }) => (
                <div key={text} className="flex items-center gap-1.5 mb-1.5">
                  <div className={cn(
                    "h-3.5 w-3.5 rounded-full border-2 shrink-0 flex items-center justify-center",
                    done ? "bg-gray-900 border-gray-900" : "border-gray-300"
                  )}>
                    {done && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <p className={cn("text-[9px]", done ? "line-through text-gray-300" : "text-gray-700")}>{text}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-3 overflow-hidden">
              <div className="flex items-center gap-1.5 mb-2">
                <Users2 className="h-3 w-3 text-gray-400" />
                <p className="text-[9px] font-semibold text-gray-700">Recent Leads</p>
              </div>
              {[
                ["DM", "Dave Mitchell",  "New",    "bg-blue-50 text-blue-600"],
                ["JK", "Jessica Kim",    "Quote",  "bg-violet-50 text-violet-600"],
                ["TN", "Tom Nguyen",     "Booked", "bg-emerald-50 text-emerald-600"],
              ].map(([init, name, status, badge]) => (
                <div key={name} className="flex items-center gap-1.5 mb-1.5">
                  <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-[7px] font-bold text-gray-600">{init}</span>
                  </div>
                  <span className="text-[9px] text-gray-700 flex-1 truncate">{name}</span>
                  <span className={cn("text-[8px] rounded-full px-1.5 py-0.5 font-medium", badge)}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKETING PAGE
// ─────────────────────────────────────────────────────────────────────────────

const ROTATING_PHRASES = [
  "acquisition system",
  "growth engine",
  "lead machine",
  "follow-up system",
  "revenue engine",
  "client conversion system",
  "sales automation system",
  "lead conversion engine",
  "pipeline operating system",
  "business growth system",
];

export default function MarketingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length);
        setPhraseVisible(true);
      }, 450);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">

      {/* ── Navbar ── */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-900">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-gray-900">
              Pipelly<span className="text-gray-400">.ai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#who" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Who It&apos;s For
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
              Login
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              Book a Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium text-gray-600 py-2">Features</a>
            <a href="#who" className="block text-sm font-medium text-gray-600 py-2">Who It&apos;s For</a>
            <Link href="/login" className="block text-sm font-medium text-gray-600 py-2">Login</Link>
            <Link href="/login" className="block w-full rounded-xl bg-gray-900 px-4 py-2.5 text-center text-sm font-semibold text-white">
              Book a Demo
            </Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.05]">
            The AI-powered<br />
            {/* Fixed-height container prevents layout shift when phrase changes */}
            <span style={{ display: "block", height: "1.12em", overflow: "hidden" }}>
              <span
                style={{
                  display: "inline-block",
                  opacity: phraseVisible ? 1 : 0,
                  transform: phraseVisible ? "translateY(0px)" : "translateY(-10px)",
                  transition: "opacity 0.42s ease, transform 0.42s ease",
                  background: "linear-gradient(135deg, #16a34a 0%, #4ade80 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  willChange: "opacity, transform",
                }}
              >
                {ROTATING_PHRASES[phraseIdx]}
              </span>
            </span>
            for growing businesses.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage leads, follow-ups, jobs, messages, and automations with an AI copilot built to do the work for you.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400 mb-16">
            {["No setup required", "Works in minutes", "AI does the heavy lifting"].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                {t}
              </div>
            ))}
          </div>

          {/* Dashboard Mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-3xl blur-2xl opacity-60" />
            <div className="relative">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Features</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need, powered by AI</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Pipelly replaces five different tools with one AI-driven system that actively helps you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Sparkles,
                title: "AI Copilot",
                description: "Context-aware AI available on every page. Draft replies, analyze leads, build automations, and prioritize your day — just by asking.",
                badge: "Core Feature",
                badgeColor: "bg-gray-900 text-white",
              },
              {
                icon: GitBranch,
                title: "Leads & Pipeline",
                description: "Manage your full sales pipeline with AI lead scoring, automated follow-up reminders, and one-click outreach drafts.",
                badge: "Sales",
                badgeColor: "bg-blue-50 text-blue-700 border border-blue-100",
              },
              {
                icon: Building2,
                title: "Client Workspaces",
                description: "Agencies can create and manage separate workspaces for every client — each with its own pipeline, leads, automations, and reporting.",
                badge: "Agency",
                badgeColor: "bg-amber-50 text-amber-700 border border-amber-100",
              },
              {
                icon: Zap,
                title: "Automations",
                description: "Describe what you want to automate in plain English. Pipelly builds the workflow, connects your tools, and runs it automatically.",
                badge: "Automation",
                badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-100",
              },
            ].map(({ icon: Icon, title, description, badge, badgeColor }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-8 hover:border-gray-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-gray-900 transition-colors">
                    <Icon className="h-5 w-5 text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", badgeColor)}>
                    {badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section id="who" className="py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Who It&apos;s For</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for two kinds of businesses</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Whether you run an agency with 20 clients or a local roofing company, Pipelly has a mode built for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agency card — dark */}
            <div className="rounded-2xl bg-gray-900 p-9 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mb-6">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold">For Agencies</h3>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">PRO</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Manage multiple client workspaces, launch setups, and monitor performance — all from one AI-powered operating system.
              </p>
              <ul className="space-y-2.5 mb-8">
                {["Multi-client workspaces","Full pipeline & deal tracking","Automations & AI workflows","Team inbox & contacts","Analytics & reporting"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all"
              >
                Try Agency Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Local business card — light */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-9">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 mb-6">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold text-gray-900">For Local Businesses</h3>
                <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 text-xs font-semibold">SIMPLE</span>
              </div>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Simple dashboard for leads, messages, jobs, and AI-powered follow-up. Designed for plumbers, roofers, med spas, and home service companies.
              </p>
              <ul className="space-y-2.5 mb-8">
                {["Simple lead tracking","Text message center","Jobs board & kanban","AI writes your replies","Daily task reminders"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:gap-3 transition-all"
              >
                Try Business Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Product</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See it in action</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              A clean, fast, AI-first interface. No clutter. No complexity. Just clarity.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-14">
            {[
              { value: "12+",  label: "Leads managed",       icon: Users2 },
              { value: "AI",   label: "Draft replies",        icon: MessageSquare },
              { value: "6",    label: "Pipeline stages",      icon: GitBranch },
              { value: "100%", label: "No extra tools needed", icon: TrendingUp },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-gray-100 p-6 text-center">
                <Icon className="h-5 w-5 text-gray-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-b from-transparent via-gray-50/60 to-transparent rounded-3xl" />
            <div className="relative max-w-3xl mx-auto">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-400 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Start today — no setup required
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to let AI run<br />your business operations?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Explore the live demo. No sign-up needed. See what AI-driven acquisition looks like for your business type.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-white/30 hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 border-t border-white/5 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-bold text-white">Pipelly<span className="text-gray-500">.ai</span></span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Login</Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Demo</Link>
          </div>
          <p className="text-xs text-gray-600">© 2026 Pipelly.ai. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
