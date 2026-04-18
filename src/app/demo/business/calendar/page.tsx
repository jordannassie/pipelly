"use client";

import { useState } from "react";
import {
  CalendarDays, Plus, ChevronLeft, ChevronRight, Sparkles,
  Clock, MapPin, Phone, Link as LinkIcon, CheckCircle2,
} from "lucide-react";
import { mockCalendarEvents } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  call:      { label: "Call",     color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  estimate:  { label: "Estimate", color: "text-violet-700", bg: "bg-violet-50 border-violet-200" },
  job:       { label: "Job",      color: "text-emerald-700",bg: "bg-emerald-50 border-emerald-200" },
  followup:  { label: "Follow-up",color: "text-amber-700",  bg: "bg-amber-50 border-amber-200" },
  meeting:   { label: "Meeting",  color: "text-gray-700",   bg: "bg-gray-50 border-gray-200" },
};

const UPCOMING = [
  { date: "Today",     events: mockCalendarEvents.slice(0, 2) },
  { date: "Tomorrow",  events: mockCalendarEvents.slice(2, 3) },
  { date: "Thu Apr 18",events: mockCalendarEvents.slice(3, 4) },
];

export default function BusinessCalendarPage() {
  const [view, setView] = useState<"today" | "week">("today");
  const [selected, setSelected] = useState<string | null>("ce-1");

  const selectedEvent = mockCalendarEvents.find((e) => e.id === selected);

  return (
    <div className="flex h-full min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Calendar</h1>
              <p className="text-xs text-gray-400 mt-0.5">April 2026 · 4 events today</p>
            </div>
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden">
                {(["today", "week"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
                      view === v ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Nav */}
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>

              <button className="flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-800 transition-colors">
                <Plus className="h-4 w-4" />
                Add Appointment
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Calendar grid / timeline */}
          <div className="flex-1 overflow-auto p-6">
            {view === "today" ? (
              <div className="space-y-6">
                {/* Google Calendar connect */}
                <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-blue-100">
                    <CalendarDays className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-900">Connect Google Calendar</p>
                    <p className="text-xs text-blue-600">Sync your appointments and get AI scheduling help.</p>
                  </div>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
                    Connect
                  </button>
                </div>

                {/* Today's timeline */}
                <div>
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Today · Saturday, April 18</h2>
                  <div className="relative space-y-0">
                    {HOURS.map((hour) => {
                      const event = mockCalendarEvents.find((e) => e.time.startsWith(hour.split(" ")[0]));
                      return (
                        <div key={hour} className="flex gap-4">
                          <div className="w-14 py-3 text-right">
                            <span className="text-xs text-gray-400">{hour}</span>
                          </div>
                          <div className="flex-1 border-t border-gray-100 dark:border-gray-800 py-2 min-h-[48px]">
                            {event && (
                              <button
                                onClick={() => setSelected(event.id)}
                                className={cn(
                                  "w-full rounded-lg border px-3 py-2 text-left transition-all",
                                  selected === event.id ? "ring-2 ring-gray-900 dark:ring-white" : "",
                                  TYPE_CONFIG[event.type]?.bg ?? "bg-gray-50 border-gray-200"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <p className={cn("text-xs font-semibold", TYPE_CONFIG[event.type]?.color ?? "text-gray-700")}>
                                    {event.title}
                                  </p>
                                  <span className={cn("rounded-full border px-1.5 py-0.5 text-[10px] font-medium", TYPE_CONFIG[event.type]?.bg, TYPE_CONFIG[event.type]?.color)}>
                                    {TYPE_CONFIG[event.type]?.label}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-0.5">{event.time} · {event.duration}</p>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Week view */
              <div>
                <div className="grid grid-cols-8 border-l border-t border-gray-100 dark:border-gray-800">
                  <div className="border-b border-r border-gray-100 dark:border-gray-800 p-2" />
                  {DAYS.map((day, i) => (
                    <div key={day} className={cn("border-b border-r border-gray-100 dark:border-gray-800 p-2 text-center", i === 5 ? "opacity-40" : "")}>
                      <p className="text-[10px] text-gray-400">{day}</p>
                      <p className={cn("text-sm font-bold mt-0.5", i === 0 ? "text-gray-900 dark:text-white" : "text-gray-400")}>
                        {14 + i}
                      </p>
                    </div>
                  ))}
                  {HOURS.map((hour) => (
                    <>
                      <div key={`h-${hour}`} className="border-b border-r border-gray-100 dark:border-gray-800 p-2 text-right">
                        <span className="text-[10px] text-gray-400">{hour}</span>
                      </div>
                      {DAYS.map((day, i) => {
                        const hasEvent = i === 0 && ["9 AM", "11 AM", "2 PM", "4 PM"].includes(hour);
                        return (
                          <div key={`${day}-${hour}`} className="border-b border-r border-gray-100 dark:border-gray-800 p-1 min-h-[40px]">
                            {hasEvent && (
                              <div className="rounded bg-blue-100 text-blue-700 px-1.5 py-1 text-[10px] font-medium leading-tight">
                                Appointment
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Event detail + AI */}
          <div className="w-72 flex-shrink-0 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-auto">
            {/* Upcoming */}
            <div className="border-b border-gray-100 dark:border-gray-800 p-5">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Upcoming</h2>
              <div className="space-y-3">
                {UPCOMING.map((group) => (
                  <div key={group.date}>
                    <p className="mb-1.5 text-[10px] font-medium text-gray-400">{group.date}</p>
                    {group.events.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setSelected(e.id)}
                        className={cn(
                          "w-full rounded-lg border px-3 py-2 text-left mb-1.5 transition-all",
                          selected === e.id ? "border-gray-900 dark:border-white" : "border-gray-100 dark:border-gray-800 hover:border-gray-300",
                          TYPE_CONFIG[e.type]?.bg ?? "bg-gray-50"
                        )}
                      >
                        <p className={cn("text-xs font-semibold truncate", TYPE_CONFIG[e.type]?.color)}>{e.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{e.time} · {e.duration}</p>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected event detail */}
            {selectedEvent && (
              <div className="border-b border-gray-100 dark:border-gray-800 p-5">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Event Detail</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedEvent.title}</p>
                    <span className={cn("mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", TYPE_CONFIG[selectedEvent.type]?.bg, TYPE_CONFIG[selectedEvent.type]?.color)}>
                      {TYPE_CONFIG[selectedEvent.type]?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {selectedEvent.time} · {selectedEvent.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {selectedEvent.contact}
                  </div>
                  {selectedEvent.address && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      {selectedEvent.address}
                    </div>
                  )}
                  {selectedEvent.notes && (
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3 py-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">{selectedEvent.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI scheduling help */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-gray-400" />
                <h2 className="text-xs font-semibold text-gray-900 dark:text-white">AI Scheduling Help</h2>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  "Show open slots this week",
                  "Schedule a follow-up call",
                  "Add booked lead to calendar",
                  "Block off job time",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    className="w-full rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-left text-xs text-gray-600 dark:text-gray-400 hover:border-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
