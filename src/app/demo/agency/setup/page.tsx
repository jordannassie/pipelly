"use client";

import { useState } from "react";
import {
  CheckCircle2, Circle, ChevronRight, Sparkles, Building2,
  UserPlus, GitBranch, CalendarDays, Zap, Rocket, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SETUP_STEPS = [
  {
    id: 1,
    icon: Building2,
    title: "Business Info",
    description: "Enter the business name, industry, and primary contact details.",
    fields: ["Business Name", "Industry", "Website", "Primary Contact"],
    completed: true,
  },
  {
    id: 2,
    icon: Building2,
    title: "Create Workspace",
    description: "Set up the workspace environment and configure branding.",
    fields: ["Workspace Name", "Logo Upload", "Brand Color", "Business Address"],
    completed: true,
  },
  {
    id: 3,
    icon: UserPlus,
    title: "Add Admin User",
    description: "Invite the business owner or admin to manage their workspace.",
    fields: ["Admin Name", "Admin Email", "Role", "Access Level"],
    completed: false,
    active: true,
  },
  {
    id: 4,
    icon: GitBranch,
    title: "Configure Pipeline",
    description: "Set up pipeline stages and deal properties for this business.",
    fields: ["Pipeline Name", "Stage Names", "Deal Properties", "Win Conditions"],
    completed: false,
  },
  {
    id: 5,
    icon: CalendarDays,
    title: "Connect Calendar",
    description: "Integrate Google Calendar or Calendly for appointment management.",
    fields: ["Calendar Type", "API Connection", "Default Availability"],
    completed: false,
  },
  {
    id: 6,
    icon: Rocket,
    title: "Launch",
    description: "Review and activate the workspace. Send welcome email to the business.",
    fields: ["Review Settings", "Notify Admin", "Activate Workspace"],
    completed: false,
  },
];

const PENDING_SETUPS = [
  { name: "Elevate Solar", step: 3, progress: 33 },
  { name: "BrightPath Plumbing", step: 5, progress: 67 },
  { name: "Northstar Med Spa", step: 4, progress: 50 },
];

export default function AgencySetupPage() {
  const [activeClient, setActiveClient] = useState("Elevate Solar");
  const [activeStep, setActiveStep] = useState(3);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Queue</h1>
          <p className="text-sm text-gray-500 mt-0.5">Complete client workspace setup step by step.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left: Pending setups */}
          <div className="lg:col-span-1">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Pending Setups ({PENDING_SETUPS.length})
            </h2>
            <div className="space-y-2">
              {PENDING_SETUPS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { setActiveClient(item.name); setActiveStep(item.step); }}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-all",
                    activeClient === item.name
                      ? "border-gray-900 bg-gray-900 dark:border-white dark:bg-white"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-400"
                  )}
                >
                  <p className={cn("text-sm font-semibold mb-1",
                    activeClient === item.name ? "text-white dark:text-gray-900" : "text-gray-900 dark:text-white"
                  )}>
                    {item.name}
                  </p>
                  <p className={cn("text-xs mb-2",
                    activeClient === item.name ? "text-gray-400 dark:text-gray-600" : "text-gray-400"
                  )}>
                    Step {item.step} of 6
                  </p>
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={cn("h-1.5 rounded-full transition-all",
                        activeClient === item.name ? "bg-white dark:bg-gray-900" : "bg-gray-900 dark:bg-white"
                      )}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* AI help */}
            <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">AI Setup Help</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Pipelly can pre-fill setup steps based on the business type and industry.</p>
              <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gray-900 dark:bg-white py-2 text-xs font-medium text-white dark:text-gray-900 hover:bg-gray-800 transition-colors">
                <Zap className="h-3.5 w-3.5" />
                Auto-fill with AI
              </button>
            </div>
          </div>

          {/* Right: Step wizard */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden">
              {/* Steps header */}
              <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center gap-1">
                  {SETUP_STEPS.map((step, i) => (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => setActiveStep(step.id)}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all",
                          step.completed ? "bg-emerald-500 text-white"
                            : activeStep === step.id ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                            : "bg-gray-100 dark:bg-gray-900 text-gray-400"
                        )}
                      >
                        {step.completed ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                      </button>
                      {i < SETUP_STEPS.length - 1 && (
                        <div className={cn("h-0.5 w-8 mx-1", step.completed ? "bg-emerald-200" : "bg-gray-100 dark:bg-gray-800")} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active step content */}
              {SETUP_STEPS.filter((s) => s.id === activeStep).map((step) => (
                <div key={step.id} className="p-6">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
                      <step.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    {step.fields.map((field) => (
                      <div key={field}>
                        <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">{field}</label>
                        <input
                          value={formValues[field] ?? ""}
                          onChange={(e) => setFormValues((v) => ({ ...v, [field]: e.target.value }))}
                          placeholder={`Enter ${field.toLowerCase()}...`}
                          className="h-9 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-5">
                    <button
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-40"
                      disabled={activeStep === 1}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setActiveStep(Math.min(6, activeStep + 1))}
                      className="flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-5 py-2 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-800 transition-colors"
                    >
                      {activeStep === 6 ? "Launch Workspace" : "Continue"}
                      {activeStep < 6 ? <ChevronRight className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
