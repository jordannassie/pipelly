import {
  Building2,
  Users2,
  CreditCard,
  Activity,
  Puzzle,
  Bell,
  Sun,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

const SETTINGS_CARDS = [
  {
    icon: Building2,
    title: "Workspace",
    description: "Name, branding, timezone",
  },
  {
    icon: Users2,
    title: "Team & Users",
    description: "Manage seats and permissions",
  },
  {
    icon: CreditCard,
    title: "Billing & Plan",
    description: "Subscription, usage, invoices",
  },
  {
    icon: Activity,
    title: "Usage",
    description: "AI credits, actions, limits",
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description: "Connect your tools",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Alerts and reminders",
  },
  {
    icon: Sun,
    title: "Theme",
    description: "Light / dark mode preferences",
  },
  {
    icon: Sparkles,
    title: "AI Preferences",
    description: "Copilot behavior, tone, limits",
  },
];

export default function SettingsPage() {
  return (
    <div className="flex h-full">
      <SettingsSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500 mb-6">
          Manage your workspace, team, and preferences
        </p>

        <div className="grid grid-cols-2 gap-4">
          {SETTINGS_CARDS.map(({ icon: Icon, title, description }) => (
            <button
              key={title}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 cursor-pointer transition-colors text-left"
            >
              <div className="bg-gray-100 rounded-xl p-2 shrink-0">
                <Icon className="h-5 w-5 text-gray-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
