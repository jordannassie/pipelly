"use client";

import { useState } from "react";
import { CheckCircle, Sparkles, GripVertical, X, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "About You",
  "Your Agency",
  "Your Pipeline",
  "Your Goals",
  "Integrations",
  "Setup Complete",
] as const;

const BUSINESS_TYPES = ["Agency", "Consultant", "Sales Team", "Freelancer", "Other"] as const;
const INDUSTRIES = ["Marketing", "Home Services", "SaaS", "Consulting", "Real Estate", "Other"] as const;
const TEAM_SIZES = ["Just me", "2–5", "6–15", "16–50", "50+"] as const;

const GOAL_OPTIONS = [
  "Generate more qualified leads",
  "Automate follow-up sequences",
  "Manage multiple client campaigns",
  "Book more discovery calls",
  "Track pipeline and revenue",
  "Build client workspaces",
] as const;

const DEFAULT_STAGES = ["Qualified", "Contact Made", "Demo Scheduled", "Proposal Made", "Closed Won"];

const INTEGRATIONS = [
  { name: "Gmail", icon: "G" },
  { name: "Slack", icon: "S" },
  { name: "Calendly", icon: "C" },
  { name: "Google Sheets", icon: "GS" },
  { name: "Zapier", icon: "Z" },
  { name: "HubSpot", icon: "H" },
] as const;

const STAGE_COLORS = [
  "bg-blue-400",
  "bg-violet-400",
  "bg-amber-400",
  "bg-orange-400",
  "bg-emerald-500",
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  // Step 0 — About You
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [businessType, setBusinessType] = useState<string>("");

  // Step 1 — Agency
  const [agencyName, setAgencyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");

  // Step 2 — Pipeline
  const [stages, setStages] = useState<string[]>(DEFAULT_STAGES);
  const [newStage, setNewStage] = useState("");

  // Step 3 — Goals
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set());
  const [revenueTarget, setRevenueTarget] = useState("");

  // Step 4 — Integrations
  const [connectedIntegrations, setConnectedIntegrations] = useState<Set<string>>(new Set());

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) => {
      const next = new Set(prev);
      next.has(goal) ? next.delete(goal) : next.add(goal);
      return next;
    });
  };

  const toggleIntegration = (name: string) => {
    setConnectedIntegrations((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const removeStage = (idx: number) => {
    setStages((prev) => prev.filter((_, i) => i !== idx));
  };

  const addStage = () => {
    const trimmed = newStage.trim();
    if (trimmed && !stages.includes(trimmed)) {
      setStages((prev) => [...prev, trimmed]);
      setNewStage("");
    }
  };

  const completionPct = Math.round((currentStep / (STEPS.length - 1)) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Progress Bar Header */}
        <div className="px-8 pt-6 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i < currentStep
                    ? "bg-emerald-500"
                    : i === currentStep
                    ? "bg-gray-900"
                    : "bg-gray-200"
                )}
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              Step {currentStep + 1} of {STEPS.length} &mdash; {STEPS[currentStep]}
            </span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all duration-300"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8">
          {/* Step 0 — About You */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Tell us about yourself</h2>
              <p className="text-sm text-gray-500 mb-6">
                This helps us personalize your Pipelly experience.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jordan"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Nassie"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-medium text-gray-700 block mb-1.5">Role / Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="Founder, Agency Owner..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-2">
                  What best describes your business?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setBusinessType(type)}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                        businessType === type
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Your Agency */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">About your agency</h2>
              <p className="text-sm text-gray-500 mb-6">
                Tell us about your business so we can tailor your workspace.
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">Agency / Business Name</label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="Acme Agency"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                  >
                    <option value="">Select an industry</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1.5">Team Size</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors bg-white"
                  >
                    <option value="">Select team size</option>
                    {TEAM_SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Your Pipeline */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Set up your pipeline stages</h2>
              <p className="text-sm text-gray-500 mb-6">
                Customize the stages deals move through in your pipeline.
              </p>
              <div className="flex flex-col gap-2 mb-4">
                {stages.map((stage, i) => (
                  <div
                    key={stage}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5"
                  >
                    <GripVertical className="h-4 w-4 text-gray-300 shrink-0 cursor-grab" />
                    <input
                      type="text"
                      value={stage}
                      onChange={(e) => {
                        const updated = [...stages];
                        updated[i] = e.target.value;
                        setStages(updated);
                      }}
                      className="flex-1 text-sm text-gray-900 bg-transparent outline-none"
                    />
                    <button
                      onClick={() => removeStage(i)}
                      className="text-gray-300 hover:text-gray-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addStage}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-6"
              >
                <Plus className="h-4 w-4" />
                Add Stage
              </button>

              {/* Stage preview */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Preview</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {stages.map((stage, i) => (
                    <div key={stage} className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full shrink-0",
                            STAGE_COLORS[i % STAGE_COLORS.length]
                          )}
                        />
                        <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                          {stage}
                        </span>
                      </div>
                      {i < stages.length - 1 && (
                        <span className="text-gray-300 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Your Goals */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">What are your main goals?</h2>
              <p className="text-sm text-gray-500 mb-6">
                Select everything that applies — we will prioritize your experience around these.
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {GOAL_OPTIONS.map((goal) => {
                  const checked = selectedGoals.has(goal);
                  return (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium text-left transition-colors",
                        checked
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      )}
                    >
                      <span
                        className={cn(
                          "h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                          checked ? "border-white bg-white" : "border-current"
                        )}
                      >
                        {checked && (
                          <svg className="h-2.5 w-2.5 text-gray-900" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {goal}
                    </button>
                  );
                })}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1.5">
                  Monthly revenue target
                </label>
                <input
                  type="text"
                  value={revenueTarget}
                  onChange={(e) => setRevenueTarget(e.target.value)}
                  placeholder="$0"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Step 4 — Integrations */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Connect your tools</h2>
              <p className="text-sm text-gray-500 mb-6">
                Connect at least one integration to get started.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {INTEGRATIONS.map(({ name, icon }) => {
                  const connected = connectedIntegrations.has(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleIntegration(name)}
                      className={cn(
                        "rounded-xl border p-4 flex items-center gap-3 cursor-pointer hover:border-gray-900 transition-colors text-left",
                        connected ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white"
                      )}
                    >
                      <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700 shrink-0">
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className={cn("text-xs mt-0.5", connected ? "text-emerald-600 font-medium" : "text-gray-400")}>
                          {connected ? "Connected" : "Connect"}
                        </p>
                      </div>
                      {connected && (
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5 — Complete */}
          {currentStep === 5 && (
            <div className="flex flex-col items-center text-center py-4">
              <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You&apos;re all set, Jordan!
              </h2>
              <p className="text-sm text-gray-600 max-w-sm mb-4">
                Pipelly is ready to help you find leads, close deals, and grow your business.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI is setting up your workspace...
              </div>
              <a
                href="/demo"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Go to Dashboard
              </a>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-8 py-5">
          <div className="w-20">
            {currentStep > 0 && currentStep < 5 && (
              <button
                onClick={goBack}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back
              </button>
            )}
          </div>
          <span className="text-xs text-gray-400">
            {currentStep + 1} of {STEPS.length}
          </span>
          <div className="w-20 flex justify-end">
            {currentStep < STEPS.length - 1 && (
              <button
                onClick={goNext}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            )}
            {currentStep === STEPS.length - 1 && (
              <a
                href="/demo"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Go to Dashboard
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
