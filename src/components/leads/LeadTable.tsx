"use client";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatRelativeDate, scoreColor } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/lib/types";

interface LeadTableProps {
  leads: Lead[];
}

function statusVariant(status: LeadStatus): "info" | "violet" | "success" | "danger" | "warning" {
  const map: Record<LeadStatus, "info" | "violet" | "success" | "danger" | "warning"> = {
    new: "info",
    contacted: "violet",
    qualified: "success",
    unqualified: "danger",
    nurturing: "warning",
    converted: "success",
  };
  return map[status];
}

function statusLabel(status: LeadStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 w-10">
              <input type="checkbox" className="rounded border-gray-300 text-gray-900 cursor-pointer" />
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Company</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Industry</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Email</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Score</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Owner</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Last Contact</th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <input type="checkbox" className="rounded border-gray-300 text-gray-900 cursor-pointer" />
              </td>
              <td className="px-4 py-3">
                <span className="font-medium text-gray-900 text-sm whitespace-nowrap">{lead.name}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">{lead.company}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-500 whitespace-nowrap">{lead.industry}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-500 truncate block max-w-[160px]">{lead.email}</span>
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(lead.status)}>{statusLabel(lead.status)}</Badge>
              </td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", scoreColor(lead.score))}>
                  {lead.score}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-600 whitespace-nowrap">{lead.owner}</span>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-gray-500 whitespace-nowrap">{formatRelativeDate(lead.lastContact)}</span>
              </td>
              <td className="px-4 py-3">
                <button className="flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
