"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: 1,
    label: "Business Info",
    description: "Enter the business name, industry, and contact details.",
    fields: [
      { label: "Business Name",   placeholder: "e.g. Apex Roofing LLC" },
      { label: "Industry",        placeholder: "e.g. Roofing, Plumbing, HVAC…" },
      { label: "Business Phone",  placeholder: "(214) 555-0100" },
      { label: "Business Email",  placeholder: "hello@apexroofing.com" },
    ],
  },
  {
    id: 2,
    label: "Create Workspace",
    description: "Pipelly will create a dedicated workspace for this business.",
    fields: [
      { label: "Workspace Name",  placeholder: "Apex Roofing" },
      { label: "Primary Color",   placeholder: "#1a1a1a (optional)" },
    ],
  },
  {
    id: 3,
    label: "Add Admin User",
    description: "Add the business owner or main point of contact.",
    fields: [
      { label: "Full Name",   placeholder: "Mike Torres" },
      { label: "Email",       placeholder: "mike@apexroofing.com" },
      { label: "Phone",       placeholder: "(214) 555-0182" },
    ],
  },
  {
    id: 4,
    label: "Configure Pipeline",
    description: "Set the lead stages this business will use.",
    stages: ["New Lead", "Contacted", "Estimate Sent", "Booked", "Job Done", "Paid"],
  },
  {
    id: 5,
    label: "Connect Calendar",
    description: "Optionally connect a Google Calendar to sync appointments.",
    fields: [
      { label: "Google Calendar Email", placeholder: "calendar@apexroofing.com (optional)" },
    ],
  },
  {
    id: 6,
    label: "Launch",
    description: "Review and launch the workspace for the business to start using.",
  },
];

export default function AgencySetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [launched, setLaunched] = useState(false);
  const [pipelineStages, setPipelineStages] = useState(STEPS[3].stages ?? []);

  const step = STEPS[currentStep - 1];
  const isLast = currentStep === STEPS.length;

  if (launched) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Workspace Launched!</h2>
          <p className="text-sm text-gray-500 mb-8">
            The business workspace has been created and the admin user has been notified. They can log in and start managing their leads immediately.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setLaunched(false)}
              className="h-9 px-5 text-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Set Up Another
            </button>
            <button className="h-9 px-5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
              View All Clients
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">New Business Setup</h1>
          <p className="text-sm text-gray-500 mt-0.5">Walk through these steps to create a new client workspace.</p>
        </div>

        <div className="flex gap-8">
          {/* Step list */}
          <div className="w-52 shrink-0">
            <div className="space-y-1">
              {STEPS.map((s) => {
                const done = s.id < currentStep;
                const active = s.id === currentStep;
                return (
                  <button
                    key={s.id}
                    onClick={() => s.id <= currentStep && setCurrentStep(s.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors",
                      active ? "bg-gray-900 text-white" : done ? "text-gray-700 hover:bg-gray-100" : "text-gray-400"
                    )}
                  >
                    {done
                      ? <CheckCircle2 className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-emerald-500")} />
                      : <Circle className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-gray-300")} />
                    }
                    <span className="font-medium truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-400">Step {currentStep} of {STEPS.length}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{step.label}</h2>
            <p className="text-sm text-gray-500 mb-6">{step.description}</p>

            {step.fields && (
              <div className="space-y-4">
                {step.fields.map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{f.label}</label>
                    <input
                      placeholder={f.placeholder}
                      className="w-full h-10 px-3 text-sm border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  </div>
                ))}
              </div>
            )}

            {step.stages && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Pipeline Stages (drag to reorder)</p>
                {pipelineStages.map((stage, i) => (
                  <div key={stage} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <span className="text-xs font-bold text-gray-400 w-5 text-center">{i + 1}</span>
                    <span className="text-sm text-gray-800 font-medium flex-1">{stage}</span>
                    <button
                      onClick={() => setPipelineStages((prev) => prev.filter((_, j) => j !== i))}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {isLast && (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Ready to launch</h3>
                <p className="text-sm text-gray-500 mb-3">
                  The workspace will be created with the details you've entered. The admin user will receive an email invitation.
                </p>
                <ul className="space-y-1.5">
                  {["Workspace created", "Admin user invited", "Pipeline configured", "Calendar connected (optional)"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                onClick={() => {
                  if (isLast) { setLaunched(true); return; }
                  setCurrentStep((prev) => Math.min(STEPS.length, prev + 1));
                }}
                className="flex items-center gap-2 h-9 px-5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                {isLast ? "Launch Workspace" : "Next Step"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
