"use client";

import { useState } from "react";
import {
  Plus, Sparkles, Phone, FileText, Clock, DollarSign,
  ChevronDown, MoreHorizontal,
} from "lucide-react";
import { mockLiteJobs, JOB_STAGES, type JobStage, type LiteJob } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useAICopilot } from "@/lib/ai-copilot-context";

const STAGE_COLORS: Record<JobStage, { header: string; dot: string; bg: string }> = {
  "New Lead":      { header: "border-blue-200 bg-blue-50",     dot: "bg-blue-400",    bg: "bg-blue-50/40" },
  "Contacted":     { header: "border-amber-200 bg-amber-50",   dot: "bg-amber-400",   bg: "bg-amber-50/40" },
  "Estimate Sent": { header: "border-violet-200 bg-violet-50", dot: "bg-violet-400",  bg: "bg-violet-50/40" },
  "Booked":        { header: "border-emerald-200 bg-emerald-50",dot: "bg-emerald-400", bg: "bg-emerald-50/40" },
  "Job Done":      { header: "border-teal-200 bg-teal-50",     dot: "bg-teal-400",    bg: "bg-teal-50/40" },
  "Paid":          { header: "border-gray-200 bg-gray-100",    dot: "bg-gray-400",    bg: "bg-gray-50/60" },
};

const NEXT_ACTION_ICON: Record<string, React.ElementType> = {
  "Call back": Phone,
  "Send intro text": Phone,
  "Schedule estimate": Clock,
  "Send estimate": FileText,
  "Follow up on quote": Clock,
  "Call — quote pending": Phone,
  "Follow up — 5 days": Clock,
  "Confirm Tuesday": Clock,
  "Confirm materials": FileText,
  "Collect payment": DollarSign,
  "Send invoice": FileText,
  "Ask for review": Sparkles,
  "Request referral": Sparkles,
};

function JobCard({ job }: { job: LiteJob }) {
  const ActionIcon = NEXT_ACTION_ICON[job.nextAction] ?? Clock;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
      {/* Customer */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{job.customer}</p>
          <p className="text-xs text-gray-500 mt-0.5">{job.service}</p>
        </div>
        <button className="opacity-0 group-hover:opacity-100 rounded-lg p-1 text-gray-400 hover:bg-gray-100 transition-all">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Value */}
      {job.value !== null && (
        <div className="flex items-center gap-1.5 mb-3">
          <DollarSign className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-sm font-bold text-gray-900">
            ${job.value.toLocaleString()}
          </span>
        </div>
      )}

      {/* Address */}
      <p className="text-xs text-gray-400 mb-3 truncate">{job.address}</p>

      {/* Next action */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-2">
        <ActionIcon className="h-3.5 w-3.5 text-gray-500 shrink-0" />
        <span className="text-xs font-medium text-gray-700 truncate">{job.nextAction}</span>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">
          {job.daysInStage === 0 ? "Added today" : `${job.daysInStage}d in stage`}
        </span>
        <span className="text-[10px] text-gray-400">{job.source}</span>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [jobs] = useState<LiteJob[]>(mockLiteJobs);
  const { openWithQuery } = useAICopilot();

  const jobsByStage = (stage: JobStage) => jobs.filter((j) => j.stage === stage);
  const totalValue = jobs
    .filter((j) => j.value !== null && j.stage !== "Paid")
    .reduce((sum, j) => sum + (j.value ?? 0), 0);

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 bg-white">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {jobs.length} jobs · ${totalValue.toLocaleString()} in open pipeline
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openWithQuery("Which estimates have not been answered?")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Sparkles className="h-4 w-4 text-gray-400" />
            Ask AI
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            Add Job
          </button>
        </div>
      </div>

      {/* AI hint bar */}
      <div className="flex items-center gap-3 px-7 py-3 bg-gray-50 border-b border-gray-100">
        <Sparkles className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-gray-500">Ask AI:</span>
        {[
          "Which estimates haven't been answered?",
          "What jobs are booked this week?",
          "Who needs payment collected?",
        ].map((q) => (
          <button
            key={q}
            onClick={() => openWithQuery(q)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 p-6 h-full" style={{ minWidth: `${JOB_STAGES.length * 280}px` }}>
          {JOB_STAGES.map((stage) => {
            const stageJobs = jobsByStage(stage);
            const colors = STAGE_COLORS[stage];
            const stageValue = stageJobs.filter(j => j.value !== null).reduce((s, j) => s + (j.value ?? 0), 0);
            return (
              <div key={stage} className="flex flex-col w-64 flex-shrink-0">
                {/* Column header */}
                <div className={cn("flex items-center justify-between rounded-xl border px-3.5 py-3 mb-3", colors.header)}>
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", colors.dot)} />
                    <span className="text-xs font-semibold text-gray-800">{stage}</span>
                    <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-xs font-bold text-gray-600">
                      {stageJobs.length}
                    </span>
                  </div>
                  {stageValue > 0 && (
                    <span className="text-[10px] font-semibold text-gray-600">
                      ${stageValue.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Job cards */}
                <div className={cn("flex-1 rounded-xl p-2 space-y-2.5", colors.bg)}>
                  {stageJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}

                  {stageJobs.length === 0 && (
                    <div className="flex items-center justify-center py-8 text-xs text-gray-400">
                      No jobs here
                    </div>
                  )}

                  {/* Add job */}
                  <button className="flex w-full items-center gap-2 rounded-xl border border-dashed border-gray-200 py-2.5 px-3 text-xs font-medium text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                    Add job
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom AI bar */}
      <div className="border-t border-gray-100 bg-white px-7 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="h-3.5 w-3.5 text-gray-400" />
            <span>AI Actions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Follow up on all pending estimates", query: "Follow up on pending estimates" },
              { label: "Send job reminders",                 query: "Generate follow-up tasks for booked jobs" },
              { label: "Collect outstanding payments",       query: "Which jobs are done and need payment?" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => openWithQuery(a.query)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <Sparkles className="h-3 w-3 text-gray-400" />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
