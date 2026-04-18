import { CheckCircle, DownloadCloud } from "lucide-react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { Badge } from "@/components/ui/Badge";
import { mockInvoices } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Invoice } from "@/lib/types";

const PLAN_FEATURES = [
  { label: "Workspaces", value: "10" },
  { label: "AI Credits", value: "50,000/mo" },
  { label: "Seats", value: "5" },
  { label: "Automations", value: "Unlimited" },
  { label: "Support", value: "Priority" },
];

const USAGE_STATS = [
  { label: "AI Credits", used: 31248, total: 50000, pct: 62 },
  { label: "Active Workspaces", used: 5, total: 10, pct: 50 },
  { label: "Seats", used: 3, total: 5, pct: 60 },
];

const INVOICE_STATUS_VARIANT: Record<Invoice["status"], "success" | "warning" | "danger"> = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

export default function BillingPage() {
  return (
    <div className="flex h-full">
      <SettingsSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Billing &amp; Plan</h1>

        {/* Current Plan Card */}
        <div className="rounded-2xl border-2 border-gray-900 bg-white p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Agency Pro</h2>
              <Badge variant="success">Active</Badge>
              <Badge variant="info">Annual</Badge>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">$297</span>
            <span className="text-sm text-gray-500">/mo &nbsp;&middot;&nbsp; billed annually</span>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Included
            </p>
            <div className="flex flex-col gap-2">
              {PLAN_FEATURES.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">{label}:</span> {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
              Upgrade Plan
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Manage Plan
            </button>
          </div>
        </div>

        {/* Usage Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {USAGE_STATS.map(({ label, used, total, pct }) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
              <p className="text-xs text-gray-500 mb-3">
                {used.toLocaleString()} / {total.toLocaleString()} used
              </p>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{pct}% used</p>
            </div>
          ))}
        </div>

        {/* Invoices Table */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-4">
            <p className="text-sm font-semibold text-gray-900">Invoices</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Invoice", "Date", "Amount", "Status", "Download"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono text-gray-600">{invoice.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-700">{formatDate(invoice.date)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={INVOICE_STATUS_VARIANT[invoice.status]} className="capitalize">
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <DownloadCloud className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
