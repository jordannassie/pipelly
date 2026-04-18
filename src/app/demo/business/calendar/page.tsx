"use client";

import { useState } from "react";
import { mockCalendarEvents, CALENDAR_TYPE_COLOR } from "@/lib/mock-data";
import { useAICopilot } from "@/lib/ai-copilot-context";
import { Sparkles, Plus, CalendarDays, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [20, 21, 22, 23, 24, 25, 26]; // Apr 20-26, 2026
const TODAY_IDX = 2; // Wednesday Apr 22

export default function BusinessCalendarPage() {
  const { openWithQuery } = useAICopilot();
  const [weekOffset, setWeekOffset] = useState(0);

  const upcoming = [...mockCalendarEvents].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Calendar</h1>
            <p className="text-sm text-gray-500 mt-0.5">Your schedule and upcoming appointments.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openWithQuery("What's on my calendar this week?")}
              className="h-9 px-4 text-xs font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> Ask AI
            </button>
            <button className="h-9 px-4 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5">
              <Plus className="h-4 w-4" /> Add Appointment
            </button>
          </div>
        </div>

        {/* Connect Google Calendar banner */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-blue-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-800">Connect Google Calendar</p>
              <p className="text-xs text-blue-600 mt-0.5">Sync your appointments and avoid double-booking.</p>
            </div>
          </div>
          <button className="h-8 px-4 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Connect
          </button>
        </div>

        {/* Week view */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Week nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <button onClick={() => setWeekOffset((p) => p - 1)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
            <p className="text-sm font-semibold text-gray-900">
              Apr {DATES[0] + weekOffset * 7} – Apr {DATES[6] + weekOffset * 7}, 2026
            </p>
            <button onClick={() => setWeekOffset((p) => p + 1)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Day columns */}
          <div className="grid grid-cols-7 divide-x divide-gray-100">
            {DAYS.map((day, i) => {
              const dateNum = DATES[i] + weekOffset * 7;
              const isToday = weekOffset === 0 && i === TODAY_IDX;
              const dayLabel = `${DAYS[i]}`;
              const eventsForDay = mockCalendarEvents.filter((e) => e.dayLabel === dayLabel && weekOffset === 0);

              return (
                <div key={day} className={cn("min-h-[160px] p-2", isToday ? "bg-blue-50/40" : "")}>
                  {/* Day header */}
                  <div className="text-center mb-2">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase">{day}</p>
                    <p className={cn(
                      "text-lg font-bold mt-0.5 w-8 h-8 flex items-center justify-center mx-auto rounded-full",
                      isToday ? "bg-gray-900 text-white" : "text-gray-700"
                    )}>
                      {dateNum}
                    </p>
                  </div>
                  {/* Events */}
                  <div className="space-y-1.5">
                    {eventsForDay.map((ev) => (
                      <div
                        key={ev.id}
                        className={cn("px-2 py-1.5 rounded-lg border text-[11px] leading-tight cursor-pointer hover:shadow-sm transition-shadow", CALENDAR_TYPE_COLOR[ev.type])}
                      >
                        <p className="font-semibold truncate">{ev.title}</p>
                        <p className="opacity-75 mt-0.5">{ev.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-3">
            {upcoming.map((ev) => (
              <div key={ev.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                <div className={cn("w-2 rounded-full self-stretch", {
                  "bg-blue-400": ev.type === "estimate",
                  "bg-emerald-400": ev.type === "job",
                  "bg-violet-400": ev.type === "call",
                  "bg-amber-400": ev.type === "follow-up",
                })} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{ev.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{ev.customer}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ev.time} · {ev.duration}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-gray-700">{ev.dayLabel}</p>
                  <p className="text-xs text-gray-400">Apr {ev.date.split("-")[2]}</p>
                </div>
                <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full border capitalize shrink-0", CALENDAR_TYPE_COLOR[ev.type])}>
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI scheduling helper */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Scheduling Helper
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "What's on my calendar this week?",
              "Schedule a confirmation for Tom's install",
              "Block off next Monday morning",
              "Send a reminder to Dave Mitchell",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => openWithQuery(chip)}
                className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
