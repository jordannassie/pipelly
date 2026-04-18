"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Sparkles } from "lucide-react";
import { useAICopilot } from "@/lib/ai-copilot-context";

type PageMeta = { title: string; breadcrumb: string[]; aiHint: string };

const PAGE_META: Record<string, PageMeta> = {
  // Agency routes
  "/demo/agency":          { title: "Agency Home",    breadcrumb: [],                         aiHint: "Create a new business workspace"     },
  "/demo/agency/clients":  { title: "Clients",        breadcrumb: ["Agency", "Clients"],       aiHint: "Which clients need attention?"       },
  "/demo/agency/setup":    { title: "Setup",           breadcrumb: ["Agency", "Setup"],         aiHint: "Show setups in progress"             },
  "/demo/agency/settings": { title: "Settings",        breadcrumb: ["Agency", "Settings"],      aiHint: "Update account settings"             },

  // Business routes
  "/demo/business":          { title: "Home",         breadcrumb: [],                          aiHint: "Who needs a follow-up today?"        },
  "/demo/business/leads":    { title: "Leads",        breadcrumb: ["Leads"],                   aiHint: "Show my hottest leads"               },
  "/demo/business/messages": { title: "Messages",     breadcrumb: ["Messages"],                aiHint: "Write a reply for this lead"         },
  "/demo/business/jobs":     { title: "Jobs",         breadcrumb: ["Jobs"],                    aiHint: "What jobs are waiting on me?"        },
  "/demo/business/calendar": { title: "Calendar",     breadcrumb: ["Calendar"],                aiHint: "What's on my calendar this week?"    },
  "/demo/business/settings": { title: "Settings",     breadcrumb: ["Settings"],                aiHint: "Update my business settings"         },
  "/demo/business/contacts": { title: "Contacts",     breadcrumb: ["Contacts"],                aiHint: "Find a contact"                      },

  // Legacy / unchanged routes
  "/demo/leads":        { title: "Leads",        breadcrumb: ["Leads"],              aiHint: "Score and segment leads with AI"     },
  "/demo/pipeline":     { title: "Pipeline",     breadcrumb: ["Pipeline"],           aiHint: "Analyze stuck deals"                 },
  "/demo/contacts":     { title: "Contacts",     breadcrumb: ["Contacts"],           aiHint: "Summarize this contact"              },
  "/demo/inbox":        { title: "Inbox",        breadcrumb: ["Inbox"],              aiHint: "Summarize and draft replies"         },
  "/demo/automations":  { title: "Automations",  breadcrumb: ["Automations"],        aiHint: "Recommend an automation"             },
  "/demo/analytics":    { title: "Analytics",    breadcrumb: ["Analytics"],          aiHint: "Explain what changed this week"      },
  "/demo/tasks":        { title: "Tasks",        breadcrumb: ["Tasks"],              aiHint: "Generate follow-up tasks"            },
  "/demo/settings":     { title: "Settings",     breadcrumb: ["Settings"],           aiHint: "Update workspace settings"           },
  "/demo/messages":     { title: "Messages",     breadcrumb: ["Messages"],           aiHint: "Write a text reply"                  },
  "/demo/jobs":         { title: "Jobs",         breadcrumb: ["Jobs"],               aiHint: "What jobs are waiting on me?"        },
};

function getPageMeta(pathname: string): PageMeta {
  if (PAGE_META[pathname]) return PAGE_META[pathname];
  // partial match for nested routes
  const match = Object.keys(PAGE_META)
    .filter((k) => pathname.startsWith(k) && k !== "/demo")
    .sort((a, b) => b.length - a.length)[0];
  return match ? PAGE_META[match] : { title: "Pipelly.ai", breadcrumb: [], aiHint: "Ask AI anything" };
}

export default function AppTopbar() {
  const pathname = usePathname();
  const { openWithQuery, setOpen } = useAICopilot();
  const meta = getPageMeta(pathname);

  const isAgency = pathname.startsWith("/demo/agency");
  const searchPlaceholder = isAgency
    ? "Search clients, setups…"
    : "Search leads, jobs, messages…";

  return (
    <header className="h-14 border-b border-gray-100 bg-white flex items-center px-6 gap-4 shrink-0">
      {/* Title / breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-0 mr-4">
        {meta.breadcrumb.length > 0 && (
          <>
            {meta.breadcrumb.map((crumb, i) => (
              <span key={i} className="text-xs text-gray-400">
                {crumb} {i < meta.breadcrumb.length - 1 && "/"}&nbsp;
              </span>
            ))}
          </>
        )}
        <h1 className="text-sm font-semibold text-gray-900 truncate">{meta.title}</h1>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full h-8 pl-8 pr-3 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-gray-300 text-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Ask AI */}
        <button
          onClick={() => { openWithQuery(meta.aiHint); }}
          className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </button>

        {/* Copilot panel trigger */}
        <button
          onClick={() => setOpen(true)}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          title="AI Copilot"
        >
          <Sparkles className="h-4 w-4 text-gray-400" />
        </button>

        {/* Notifications */}
        <button className="relative h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <Bell className="h-4 w-4 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
          J
        </div>
      </div>
    </header>
  );
}
