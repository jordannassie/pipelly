"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Zap,
  Users2,
  CalendarDays,
  MessageSquare,
  ChevronRight,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ── Product mockup ────────────────────────────────────────────────────────────
function ProductMockup() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-b from-gray-100 via-transparent to-transparent rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/80 bg-white">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-100">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <div className="flex-1 mx-4">
            <div className="bg-gray-50 border border-gray-100 rounded-md px-3 py-1 text-[11px] text-gray-400 font-mono text-center w-fit mx-auto">
              pipelly.ai/demo/business
            </div>
          </div>
        </div>

        <div className="flex h-72">
          {/* Sidebar */}
          <div className="w-44 bg-white border-r border-gray-100 py-4 px-3 flex flex-col gap-0.5 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 mb-2">
              <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-gray-900">Pipelly.ai</span>
            </div>
            {[
              { label: "Home",     active: true  },
              { label: "Leads",    active: false },
              { label: "Messages", active: false },
              { label: "Jobs",     active: false },
              { label: "Calendar", active: false },
            ].map(({ label, active }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium ${active ? "bg-gray-900 text-white" : "text-gray-500"}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white/60" : "bg-gray-300"}`} />
                {label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-5 bg-gray-50 overflow-hidden">
            <p className="text-xs font-semibold text-gray-800 mb-3">Good morning, Jordan 👋</p>

            {/* AI bar */}
            <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2 mb-4 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-gray-300" />
              <span className="text-[11px] text-gray-400">Who needs a follow-up today?</span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: "New Leads",   value: "12", up: true  },
                { label: "Follow Ups",  value: "4",  up: false },
                { label: "Booked Jobs", value: "7",  up: true  },
                { label: "Revenue",     value: "$8.4k", up: true },
              ].map((k) => (
                <div key={k.label} className="bg-white rounded-lg p-2.5 border border-gray-100 shadow-sm">
                  <p className="text-[9px] text-gray-400 mb-0.5">{k.label}</p>
                  <p className="text-sm font-black text-gray-900">{k.value}</p>
                  <p className={`text-[9px] font-medium ${k.up ? "text-emerald-500" : "text-amber-500"}`}>{k.up ? "↑" : "↓"}</p>
                </div>
              ))}
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Today's Tasks</p>
              {["Call back Dave Mitchell", "Send estimate to Sarah", "Confirm Tom's install"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 py-1">
                  <div className={`w-3 h-3 rounded border ${i === 0 ? "border-emerald-400 bg-emerald-50" : "border-gray-300"}`} />
                  <span className={`text-[10px] ${i === 0 ? "line-through text-gray-400" : "text-gray-600"}`}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">Pipelly.ai</span>
          </Link>
          <div className="hidden sm:flex items-center gap-5 ml-2">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#who" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Who It&apos;s For</a>
            <a href="#how" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">How It Works</a>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Login
            </Link>
            <Link
              href="/login"
              className="h-9 px-4 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              Book a Demo <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600 mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-native for agencies &amp; local businesses
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
            The operating system<br className="hidden sm:block" /> your business{" "}
            <span className="relative">
              runs on.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gray-900 rounded-full" />
            </span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Manage leads, messages, jobs, and calendar. Let AI draft follow-ups, flag urgent tasks, and keep your pipeline moving — without the busywork.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/login"
              className="h-12 px-8 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-md shadow-gray-900/10 inline-flex items-center gap-2"
            >
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="h-12 px-8 text-sm font-semibold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors inline-flex items-center gap-2"
            >
              View demo
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: "500+",  label: "agencies onboarded" },
              { value: "10k+",  label: "leads managed"      },
              { value: "98%",   label: "follow-up rate"     },
              { value: "< 2min", label: "to first AI reply" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-black text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <ProductMockup />
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-3xl font-black text-gray-900">Everything in one place</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">No tab-switching. No copy-pasting. One system that handles leads, communication, jobs, and AI — all connected.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Sparkles,     color: "bg-gray-900 text-white",         title: "AI Copilot",         desc: "Context-aware AI that drafts messages, flags leads, and recommends your next move — on every page." },
              { icon: Users2,       color: "bg-blue-600 text-white",         title: "Leads & Pipeline",   desc: "Track every lead from first inquiry to paid invoice. AI scores and prioritises automatically."         },
              { icon: Building2,    color: "bg-gray-700 text-white",         title: "Agency Workspaces",  desc: "Create client workspaces, assign admins, and monitor health for every account in one view."            },
              { icon: Zap,          color: "bg-amber-500 text-white",        title: "Automations",        desc: "Follow-up sequences, calendar triggers, and notification flows — no code required."                   },
              { icon: MessageSquare,color: "bg-emerald-600 text-white",      title: "Inbox & Messages",   desc: "All lead communication in one thread. AI drafts replies and flags urgent conversations."               },
              { icon: CalendarDays, color: "bg-violet-600 text-white",       title: "Calendar & Jobs",    desc: "Manage estimates, installs, and appointments. AI sends reminders and confirms bookings."               },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section id="how" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">How It Works</p>
            <h2 className="text-3xl font-black text-gray-900">Simple for agencies. Powerful for businesses.</h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-8 left-[16%] right-[16%] h-px bg-gray-100" />
            <div className="grid sm:grid-cols-3 gap-10">
              {[
                {
                  n: "1",
                  title: "Agency creates a workspace",
                  desc: "Set up a business account, assign an admin, and configure the pipeline in minutes.",
                },
                {
                  n: "2",
                  title: "Business runs operations daily",
                  desc: "The owner manages leads, messages, jobs, and appointments — all in one simple view.",
                },
                {
                  n: "3",
                  title: "AI helps both sides move faster",
                  desc: "The copilot drafts replies, flags follow-ups, recommends actions, and keeps momentum.",
                },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-900/10">
                    <span className="text-xl font-black text-white">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section id="who" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Two Modes</p>
            <h2 className="text-3xl font-black text-gray-900">Built for both sides</h2>
            <p className="text-gray-500 mt-3">One platform, two tailored experiences.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Agency */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">For Agencies</span>
                </div>
                <h3 className="text-xl font-black mb-2">Manage your client portfolio</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Create workspaces, assign admins, and monitor account health — all from one simple dashboard.
                </p>
              </div>
              <ul className="space-y-2.5">
                {["Create client business workspaces", "Assign admin users per account", "Monitor setup progress", "Track account health & activity"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-auto inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-bold bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Try Agency Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Business */}
            <div className="bg-white rounded-2xl p-8 flex flex-col gap-6 border border-gray-200 shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">For Local Businesses</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Run your daily operations</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Simple AI-powered dashboard to handle leads, messages, jobs, and calendar — designed for busy owners.
                </p>
              </div>
              <ul className="space-y-2.5">
                {["Track leads through your pipeline", "AI-drafted follow-up messages", "Jobs, estimates & calendar in one view", "Daily AI action suggestions"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-auto inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                Try Business Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-900/10">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            Let AI do more<br />of the work.
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            No setup required. Choose your demo and see the full platform in action — today.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/login"
              className="h-12 px-8 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-md shadow-gray-900/10 inline-flex items-center gap-2"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="h-12 px-8 text-sm font-semibold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-8 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-900">Pipelly.ai</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features"  className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Features</a>
            <a href="#how"       className="text-xs text-gray-400 hover:text-gray-700 transition-colors">How It Works</a>
            <Link href="/login"  className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Login</Link>
            <Link href="/login"  className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Book a Demo</Link>
          </div>
          <p className="text-xs text-gray-300">© 2026 Pipelly.ai</p>
        </div>
      </footer>
    </div>
  );
}
