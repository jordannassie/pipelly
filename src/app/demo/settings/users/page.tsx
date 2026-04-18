import { MoreHorizontal, CheckCircle, UserPlus } from "lucide-react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { Badge } from "@/components/ui/Badge";
import { mockUsers } from "@/lib/mock-data";
import { getInitials, formatRelativeDate } from "@/lib/utils";
import type { User } from "@/lib/types";

const ROLE_VARIANT: Record<User["role"], "info" | "violet" | "default" | "outline"> = {
  Admin: "info",
  Manager: "violet",
  Member: "default",
  Viewer: "outline",
};

const STATUS_VARIANT: Record<User["status"], "success" | "warning" | "default"> = {
  active: "success",
  invited: "warning",
  deactivated: "default",
};

const ROLES = ["Admin", "Manager", "Member", "Viewer"] as const;

const PERMISSIONS = [
  "View Leads",
  "Edit Leads",
  "Manage Pipeline",
  "Create Automations",
  "Billing Access",
  "User Management",
] as const;

const ROLE_PERMISSIONS: Record<string, boolean[]> = {
  Admin: [true, true, true, true, true, true],
  Manager: [true, true, true, true, false, false],
  Member: [true, true, true, false, false, false],
  Viewer: [true, false, false, false, false, false],
};

const TABS = ["Active (3)", "Invited (1)", "Deactivated (1)"] as const;

export default function UsersPage() {
  return (
    <div className="flex h-full">
      <SettingsSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Users &amp; Permissions</h1>
            <p className="text-sm text-gray-500 mt-0.5">5 members</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            <UserPlus className="h-4 w-4" />
            Invite User
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={
                tab === "Active (3)"
                  ? "px-3 py-2 text-sm font-medium text-gray-900 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                  : "px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["User", "Role", "Workspace", "Last Active", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  {/* Avatar + name + email */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Role */}
                  <td className="px-4 py-3">
                    <Badge variant={ROLE_VARIANT[user.role]}>{user.role}</Badge>
                  </td>
                  {/* Workspace */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">{user.workspace}</span>
                  </td>
                  {/* Last Active */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">
                      {user.lastActive === "—" ? "—" : formatRelativeDate(user.lastActive)}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANT[user.status]} className="capitalize">
                      {user.status}
                    </Badge>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <button className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role Permissions */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-semibold text-gray-900 mb-4">Role Permissions</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-2 text-left text-xs font-semibold text-gray-500 w-48">
                    Permission
                  </th>
                  {ROLES.map((role) => (
                    <th key={role} className="py-2 text-center text-xs font-semibold text-gray-500">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((perm, pi) => (
                  <tr key={perm} className="border-b border-gray-100 last:border-0">
                    <td className="py-2.5 text-sm text-gray-700">{perm}</td>
                    {ROLES.map((role) => (
                      <td key={role} className="py-2.5 text-center">
                        {ROLE_PERMISSIONS[role][pi] ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-gray-300 text-sm">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
