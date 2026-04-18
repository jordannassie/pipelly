"use client";

import { ChevronDown, Plus, Filter, LayoutGrid, List, Sparkles } from "lucide-react";
import { mockDeals } from "@/lib/mock-data";
import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { useAICopilot } from "@/lib/ai-copilot-context";

export default function PipelinePage() {
  const { openWithQuery } = useAICopilot();
  return (
    <div className="p-6">
      {/* Top row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pipeline</h1>
          <p className="text-sm text-gray-500 mt-0.5">$74.3k in 8 open deals</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
            <button className="flex items-center justify-center px-3 py-2 bg-gray-900 text-white">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors border-l border-gray-200">
              <List className="h-4 w-4" />
            </button>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            <Plus className="h-4 w-4" />
            New Deal
          </button>
        </div>
      </div>

      {/* Pipeline selector + controls row */}
      <div className="flex items-center gap-4 mb-5">
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
          Pipeline 1
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        <div className="flex items-center gap-3 ml-auto">
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Sort by value
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            All owners
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* AI insight banner */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-5 flex items-start gap-3">
        <Sparkles className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">AI Pipeline Insights:</span>{" "}
            3 deals haven&#39;t had activity in 7+ days. Elevate Roofing ($24k) is at highest risk of going cold.
          </p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <button
              onClick={() => openWithQuery("Analyze my pipeline and identify at-risk deals")}
              className="text-xs font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 transition-colors"
            >
              Analyze with AI
            </button>
            <button
              onClick={() => openWithQuery("Draft outreach for stuck deals in my pipeline")}
              className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700 transition-colors"
            >
              Draft Follow-ups
            </button>
            <button
              onClick={() => openWithQuery("Generate follow-up tasks from my pipeline deals")}
              className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
            >
              Generate Tasks
            </button>
            <button
              onClick={() => openWithQuery("Recommend automations for my pipeline")}
              className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
            >
              Recommend Automations
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline board */}
      <PipelineBoard deals={mockDeals} />
    </div>
  );
}
