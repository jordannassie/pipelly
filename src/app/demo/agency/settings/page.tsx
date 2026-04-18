"use client";

import { Building2, Users2, CreditCard, Bell, Zap } from "lucide-react";

const SECTIONS = [
  { icon: Building2, label: "Agency Info",   desc: "Update your agency name, contact details, and branding." },
  { icon: Users2,    label: "Team Members", desc: "Manage who has access to the agency dashboard."          },
  { icon: CreditCard,label: "Billing",      desc: "View your plan, usage, and invoices."                    },
  { icon: Bell,      label: "Notifications",desc: "Control when and how you receive alerts."                 },
  { icon: Zap,       label: "Integrations", desc: "Connect third-party tools to your agency account."        },
];

export default function AgencySettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your agency account and preferences.</p>
        </div>

        {/* Agency info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Agency Info</h2>
          {[
            { label: "Agency Name",   value: "Nassie Growth Agency" },
            { label: "Contact Email", value: "jordan@nassiegrowth.com" },
            { label: "Phone",         value: "(214) 555-0100" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
              <span className="text-sm text-gray-500">{f.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">{f.value}</span>
                <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Edit</button>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Team Members</h2>
            <button className="h-8 px-4 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Invite
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Jordan Nassie",  email: "jordan@nassiegrowth.com", role: "Owner"   },
              { name: "Sarah Kim",      email: "sarah@nassiegrowth.com",  role: "Manager" },
            ].map((u) => (
              <div key={u.email} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {u.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <span className="text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">{u.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.slice(2).map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:border-gray-300 transition-all cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
