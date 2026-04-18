"use client";

import { mockLiteJobs, JOB_STAGES } from "@/lib/mock-data";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { Sparkles, Phone, MapPin, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGE_COLORS: Record<string, string> = {
  "New Lead":      "bg-blue-50 border-blue-200 text-blue-700",
  "Contacted":     "bg-amber-50 border-amber-200 text-amber-700",
  "Estimate Sent": "bg-violet-50 border-violet-200 text-violet-700",
  "Booked":        "bg-emerald-50 border-emerald-200 text-emerald-700",
  "Job Done":      "bg-gray-100 border-gray-200 text-gray-600",
  "Paid":          "bg-emerald-100 border-emerald-300 text-emerald-800",
};

export default function BusinessJobsPage() {
  const { openWithQuery } = useAICopilot();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between max-w-full">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track every job from first inquiry to paid.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWithQuery("What jobs are waiting on me?")}
              className="h-9 px-4 text-xs font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI: What needs action?
            </button>
          </div>
        </div>

        {/* AI hint banner */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>3 estimates sent</strong> with no response. 
            <button onClick={() => openWithQuery("Which estimates have not been answered?")} className="ml-1 font-semibold underline hover:no-underline">
              Follow up now →
            </button>
          </p>
        </div>

        {/* Kanban board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {JOB_STAGES.map((stage) => {
              const jobs = mockLiteJobs.filter((j) => j.stage === stage);
              return (
                <div key={stage} className="w-60 shrink-0">
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-full border", STAGE_COLORS[stage])}>
                      {stage}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{jobs.length}</span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{job.customer}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{job.service}</p>
                        </div>

                        {job.value && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <DollarSign className="h-3 w-3 text-gray-400" />
                            {job.value.toLocaleString()}
                          </div>
                        )}

                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{job.address}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Phone className="h-3 w-3" />
                          {job.phone}
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-[11px] font-medium text-gray-500">Next action</p>
                          <p className="text-xs text-gray-700 mt-0.5">{job.nextAction}</p>
                        </div>

                        {job.daysInStage > 2 && (
                          <div className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 rounded-lg px-2 py-1">
                            <Sparkles className="h-3 w-3" />
                            {job.daysInStage}d in stage
                          </div>
                        )}
                      </div>
                    ))}

                    {jobs.length === 0 && (
                      <div className="py-6 text-center">
                        <p className="text-xs text-gray-300">No jobs here</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
