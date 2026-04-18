"use client";

import { Building2, Users2, Bell, Zap, CreditCard, Save } from "lucide-react";

export default function BusinessSettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your business account and preferences.</p>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="h-4 w-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Business Info</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Business Name",   value: "Apex Roofing LLC",         type: "text"  },
              { label: "Industry",        value: "Roofing",                   type: "text"  },
              { label: "Phone",           value: "(214) 555-0182",            type: "tel"   },
              { label: "Email",           value: "mike@apexroofing.com",      type: "email" },
              { label: "Address",         value: "2314 Oak Ln, Dallas TX",    type: "text"  },
              { label: "Business Hours",  value: "Mon–Fri 7:00 AM – 5:00 PM", type: "text"  },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.value}
                  className="w-full h-9 px-3 text-sm border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            ))}
          </div>
          <button className="mt-5 h-9 px-5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>

        {/* Team / Users */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users2 className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">Users</h2>
            </div>
            <button className="h-8 px-4 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Invite User
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { name: "Mike Torres",   email: "mike@apexroofing.com",  role: "Admin"   },
              { name: "Lisa Moreno",   email: "lisa@apexroofing.com",   role: "Staff"   },
            ].map((u) => (
              <div key={u.email} className="flex items-center gap-3 py-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                  {u.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <span className="text-xs border border-gray-200 rounded-full px-2.5 py-0.5 text-gray-500">{u.role}</span>
                <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "New lead alerts",           checked: true  },
              { label: "Follow-up reminders",       checked: true  },
              { label: "Job status updates",        checked: true  },
              { label: "Daily summary email",       checked: false },
              { label: "Weekly AI report",          checked: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-700">{n.label}</span>
                <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${n.checked ? "bg-gray-900" : "bg-gray-200"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-transform ${n.checked ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations + Billing side by side */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">Integrations</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: "Google Calendar", connected: false },
                { name: "Gmail",           connected: false },
                { name: "Zapier",          connected: false },
                { name: "Stripe",          connected: true  },
              ].map((i) => (
                <div key={i.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{i.name}</span>
                  <button className={`text-xs font-medium px-3 py-1 rounded-lg transition-colors ${i.connected ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {i.connected ? "Connected" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">Billing</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Current plan</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">Business — $97/mo</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Next billing date</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">May 1, 2026</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">AI credits used</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">240 / 500 this month</p>
              </div>
              <button className="w-full h-9 text-sm font-medium border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                Manage Billing
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
