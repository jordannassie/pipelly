import type {
  Workspace,
  Lead,
  Deal,
  Contact,
  Thread,
  Automation,
  Task,
  KPIStat,
  AIActivity,
  User,
  Invoice,
} from "./types";

// ── Workspaces ─────────────────────────────────────────────────────────────
export const mockWorkspaces: Workspace[] = [
  {
    id: "ws-1",
    name: "Apex Growth",
    industry: "Marketing Agency",
    leads: 142,
    bookedCalls: 28,
    activeCampaigns: 4,
    health: "excellent",
    lastUpdated: "2026-04-18",
    revenue: 48000,
    avatar: "AG",
    color: "bg-violet-500",
  },
  {
    id: "ws-2",
    name: "Northstar Media",
    industry: "Media Buying",
    leads: 98,
    bookedCalls: 14,
    activeCampaigns: 2,
    health: "good",
    lastUpdated: "2026-04-17",
    revenue: 31500,
    avatar: "NM",
    color: "bg-blue-500",
  },
  {
    id: "ws-3",
    name: "Elevate Roofing",
    industry: "Home Services",
    leads: 207,
    bookedCalls: 41,
    activeCampaigns: 6,
    health: "excellent",
    lastUpdated: "2026-04-18",
    revenue: 72000,
    avatar: "ER",
    color: "bg-emerald-500",
  },
  {
    id: "ws-4",
    name: "BrightPath Consulting",
    industry: "Business Consulting",
    leads: 64,
    bookedCalls: 8,
    activeCampaigns: 1,
    health: "fair",
    lastUpdated: "2026-04-15",
    revenue: 18200,
    avatar: "BP",
    color: "bg-amber-500",
  },
  {
    id: "ws-5",
    name: "Solaris Solar",
    industry: "Clean Energy",
    leads: 53,
    bookedCalls: 6,
    activeCampaigns: 1,
    health: "poor",
    lastUpdated: "2026-04-10",
    revenue: 9600,
    avatar: "SS",
    color: "bg-orange-500",
  },
];

// ── Leads ──────────────────────────────────────────────────────────────────
export const mockLeads: Lead[] = [
  { id: "l-1", name: "Marcus Reid", company: "Apex Growth", industry: "Marketing", email: "marcus@apexgrowth.io", phone: "+1 (512) 000-1234", status: "qualified", score: 92, owner: "Jordan N.", lastContact: "2026-04-17", source: "LinkedIn", workspace: "Apex Growth" },
  { id: "l-2", name: "Sophia Chen", company: "TechVault Inc.", industry: "SaaS", email: "sophia@techvault.com", phone: "+1 (415) 000-5678", status: "contacted", score: 74, owner: "Jordan N.", lastContact: "2026-04-16", source: "Cold Email", workspace: "Northstar Media" },
  { id: "l-3", name: "Derek Wallace", company: "Pinnacle Roofing", industry: "Home Services", email: "derek@pinnacle.co", phone: "+1 (972) 000-9012", status: "new", score: 61, owner: "Jordan N.", lastContact: "2026-04-15", source: "Ads", workspace: "Elevate Roofing" },
  { id: "l-4", name: "Priya Nair", company: "BrightPath", industry: "Consulting", email: "priya@brightpath.com", phone: "+1 (646) 000-3456", status: "nurturing", score: 55, owner: "Jordan N.", lastContact: "2026-04-14", source: "Referral", workspace: "BrightPath Consulting" },
  { id: "l-5", name: "Liam Torres", company: "Solaris Solar", industry: "Clean Energy", email: "liam@solarissolar.com", phone: "+1 (310) 000-7890", status: "contacted", score: 68, owner: "Jordan N.", lastContact: "2026-04-13", source: "Website", workspace: "Solaris Solar" },
  { id: "l-6", name: "Amara Osei", company: "Greenleaf Media", industry: "Media", email: "amara@greenleaf.tv", phone: "+1 (404) 000-2345", status: "qualified", score: 85, owner: "Jordan N.", lastContact: "2026-04-18", source: "LinkedIn", workspace: "Northstar Media" },
  { id: "l-7", name: "Jackson Mercer", company: "CoreBuild Ltd.", industry: "Construction", email: "jackson@corebuild.co", phone: "+1 (713) 000-6789", status: "new", score: 49, owner: "Jordan N.", lastContact: "2026-04-12", source: "Cold Email", workspace: "Elevate Roofing" },
  { id: "l-8", name: "Nina Kowalski", company: "FlowState Agency", industry: "Marketing", email: "nina@flowstate.agency", phone: "+1 (312) 000-0123", status: "converted", score: 96, owner: "Jordan N.", lastContact: "2026-04-18", source: "Referral", workspace: "Apex Growth" },
  { id: "l-9", name: "Omar Hassan", company: "SkyHigh Ads", industry: "Advertising", email: "omar@skyhigh.io", phone: "+1 (469) 000-4567", status: "unqualified", score: 22, owner: "Jordan N.", lastContact: "2026-04-11", source: "Ads", workspace: "Northstar Media" },
  { id: "l-10", name: "Elena Park", company: "Luminary Design", industry: "Design", email: "elena@luminary.co", phone: "+1 (503) 000-8901", status: "contacted", score: 71, owner: "Jordan N.", lastContact: "2026-04-16", source: "Organic", workspace: "Apex Growth" },
];

// ── Deals ──────────────────────────────────────────────────────────────────
export const mockDeals: Deal[] = [
  { id: "d-1", company: "Apex Growth", contact: "Marcus Reid", value: 12000, stage: "Qualified", owner: "Jordan N.", dueDate: "2026-04-25", nextTask: "Send intro email", tags: ["high-value", "agency"], probability: 20 },
  { id: "d-2", company: "TechVault Inc.", contact: "Sophia Chen", value: 8500, stage: "Contact Made", owner: "Jordan N.", dueDate: "2026-04-22", nextTask: "Schedule discovery call", tags: ["saas"], probability: 35 },
  { id: "d-3", company: "FlowState Agency", contact: "Nina Kowalski", value: 18000, stage: "Demo Scheduled", owner: "Jordan N.", dueDate: "2026-04-20", nextTask: "Prepare demo deck", tags: ["high-value", "agency"], probability: 55 },
  { id: "d-4", company: "BrightPath", contact: "Priya Nair", value: 6000, stage: "Proposal Made", owner: "Jordan N.", dueDate: "2026-04-21", nextTask: "Follow up on proposal", tags: ["consulting"], probability: 65 },
  { id: "d-5", company: "Elevate Roofing", contact: "Derek Wallace", value: 24000, stage: "Negotiation", owner: "Jordan N.", dueDate: "2026-04-19", nextTask: "Review revised terms", tags: ["high-value", "services"], probability: 75 },
  { id: "d-6", company: "Greenleaf Media", contact: "Amara Osei", value: 9600, stage: "Closed Won", owner: "Jordan N.", dueDate: "2026-04-15", nextTask: "Send contract", tags: ["media"], probability: 100 },
  { id: "d-7", company: "SkyHigh Ads", contact: "Omar Hassan", value: 3200, stage: "Closed Lost", owner: "Jordan N.", dueDate: "2026-04-14", nextTask: "Archive deal", tags: ["ads"], probability: 0 },
  { id: "d-8", company: "CoreBuild Ltd.", contact: "Jackson Mercer", value: 15500, stage: "Contact Made", owner: "Jordan N.", dueDate: "2026-04-28", nextTask: "Send intro sequence", tags: ["construction"], probability: 30 },
  { id: "d-9", company: "Luminary Design", contact: "Elena Park", value: 7200, stage: "Demo Scheduled", owner: "Jordan N.", dueDate: "2026-04-23", nextTask: "Send calendar invite", tags: ["design"], probability: 50 },
  { id: "d-10", company: "Solaris Solar", contact: "Liam Torres", value: 11000, stage: "Qualified", owner: "Jordan N.", dueDate: "2026-04-30", nextTask: "Research company", tags: ["energy"], probability: 25 },
];

// ── Contacts ───────────────────────────────────────────────────────────────
export const mockContacts: Contact[] = [
  { id: "c-1", name: "Marcus Reid", company: "Apex Growth", email: "marcus@apexgrowth.io", phone: "+1 (512) 000-1234", role: "CEO", industry: "Marketing Agency", owner: "Jordan N.", labels: ["client", "vip"], lastActivity: "2026-04-18", deals: 2, notes: "Interested in full-service acquisition system. Follow up by Friday.", address: "Austin, TX", website: "apexgrowth.io", linkedin: "linkedin.com/in/marcusreid" },
  { id: "c-2", name: "Sophia Chen", company: "TechVault Inc.", email: "sophia@techvault.com", phone: "+1 (415) 000-5678", role: "VP of Sales", industry: "SaaS", owner: "Jordan N.", labels: ["prospect"], lastActivity: "2026-04-16", deals: 1, notes: "Looking for outbound automation. Demo scheduled.", address: "San Francisco, CA", website: "techvault.com", linkedin: "linkedin.com/in/sophiachen" },
  { id: "c-3", name: "Amara Osei", company: "Greenleaf Media", email: "amara@greenleaf.tv", phone: "+1 (404) 000-2345", role: "Founder", industry: "Media Buying", owner: "Jordan N.", labels: ["client", "referral"], lastActivity: "2026-04-18", deals: 3, notes: "Closed won. Onboarding next week.", address: "Atlanta, GA", website: "greenleaf.tv", linkedin: "linkedin.com/in/amaraosei" },
];

// ── Inbox Threads ──────────────────────────────────────────────────────────
export const mockThreads: Thread[] = [
  { id: "t-1", from: "Marcus Reid", company: "Apex Growth", subject: "Re: Proposal — Pipelly AI System", preview: "Sounds good, Jordan. Let me review this with my team and get back by Thursday...", timestamp: "2026-04-18T10:24:00Z", read: false, starred: true, label: "proposal", replies: 4 },
  { id: "t-2", from: "Sophia Chen", company: "TechVault", subject: "Demo Confirmation — April 22nd", preview: "Looking forward to the demo! Should we include our Head of Ops on the call?", timestamp: "2026-04-18T08:45:00Z", read: false, starred: false, label: "demo", replies: 2 },
  { id: "t-3", from: "Priya Nair", company: "BrightPath", subject: "Quick question about onboarding", preview: "Hi Jordan — just had a quick Q about how the workspace setup works for agencies...", timestamp: "2026-04-17T17:12:00Z", read: true, starred: false, label: "support", replies: 1 },
  { id: "t-4", from: "Liam Torres", company: "Solaris Solar", subject: "Interested in learning more", preview: "A colleague referred me to you. We're scaling outreach for solar and looking for...", timestamp: "2026-04-17T14:03:00Z", read: true, starred: false, label: "inbound", replies: 0 },
  { id: "t-5", from: "Jackson Mercer", company: "CoreBuild Ltd.", subject: "Re: Cold outreach — Pipelly", preview: "Thanks for reaching out. This looks interesting, can you send a short overview?", timestamp: "2026-04-16T09:58:00Z", read: true, starred: false, label: "cold-reply", replies: 1 },
  { id: "t-6", from: "Elena Park", company: "Luminary Design", subject: "Following up from last week", preview: "Jordan, hope you're well. Did you get a chance to look at the details I sent?", timestamp: "2026-04-15T16:22:00Z", read: true, starred: false, label: "follow-up", replies: 3 },
];

// ── Automations ────────────────────────────────────────────────────────────
export const mockAutomations: Automation[] = [
  { id: "a-1", name: "Calendly → Move to Booked", description: "When a Calendly meeting is booked, move the deal to 'Demo Scheduled' stage automatically.", trigger: "Calendly meeting created", action: "Move deal stage + notify owner", status: "active", runs: 214, lastRun: "2026-04-18", category: "Pipeline" },
  { id: "a-2", name: "5-Day No Reply Follow-up", description: "If a lead hasn't replied in 5 days, automatically send a follow-up email sequence.", trigger: "No reply after 5 days", action: "Send follow-up email", status: "active", runs: 89, lastRun: "2026-04-17", category: "Outreach" },
  { id: "a-3", name: "Proposal Sent → Slack Alert", description: "Send a Slack alert to the team channel when a proposal is marked as sent.", trigger: "Deal stage = Proposal Made", action: "Send Slack notification", status: "active", runs: 36, lastRun: "2026-04-16", category: "Notifications" },
  { id: "a-4", name: "Lead Reply → Create Task", description: "When a lead replies to an email, automatically create a follow-up task for the owner.", trigger: "Lead email reply received", action: "Create task for owner", status: "active", runs: 127, lastRun: "2026-04-18", category: "Tasks" },
  { id: "a-5", name: "Stalled Deal Notification", description: "Notify the deal owner when a deal hasn't had activity in 7 days.", trigger: "No deal activity for 7 days", action: "Notify owner via email", status: "paused", runs: 52, lastRun: "2026-04-12", category: "Pipeline" },
  { id: "a-6", name: "New Lead → Google Sheets Sync", description: "Sync all new leads to a designated Google Sheet in real time.", trigger: "New lead created", action: "Add row to Google Sheets", status: "active", runs: 318, lastRun: "2026-04-18", category: "Integrations" },
  { id: "a-7", name: "Deal Won → Create Workspace", description: "When a deal is marked Closed Won, auto-create a new client workspace.", trigger: "Deal stage = Closed Won", action: "Create workspace + onboarding task", status: "draft", runs: 0, lastRun: "—", category: "Workspaces" },
];

// ── Tasks ──────────────────────────────────────────────────────────────────
export const mockTasks: Task[] = [
  { id: "tk-1", title: "Follow up with Marcus Reid — Apex Growth", description: "Proposal was sent 3 days ago. High-value deal — follow up now.", due: "2026-04-18", priority: "high", status: "pending", workspace: "Apex Growth", type: "follow-up", aiGenerated: true },
  { id: "tk-2", title: "Review proposal for Northstar Media", description: "Finalize and review the proposal document before sending.", due: "2026-04-18", priority: "high", status: "pending", workspace: "Northstar Media", type: "review", aiGenerated: false },
  { id: "tk-3", title: "Re-engage 12 cold leads", description: "AI identified 12 leads that went cold 14+ days ago and may be ready to re-engage.", due: "2026-04-19", priority: "medium", status: "pending", workspace: "Apex Growth", type: "outreach", aiGenerated: true },
  { id: "tk-4", title: "Launch new outreach campaign — Elevate Roofing", description: "Start the April cold email campaign for roofing prospects in Dallas.", due: "2026-04-20", priority: "medium", status: "pending", workspace: "Elevate Roofing", type: "outreach", aiGenerated: false },
  { id: "tk-5", title: "Approve workspace automation for BrightPath", description: "Review and activate the Calendly → Deal Stage automation for BrightPath.", due: "2026-04-21", priority: "low", status: "pending", workspace: "BrightPath Consulting", type: "admin", aiGenerated: false },
  { id: "tk-6", title: "Schedule discovery call with Sophia Chen", description: "TechVault deal is in Contact Made stage. Discovery call not yet scheduled.", due: "2026-04-17", priority: "high", status: "overdue", workspace: "Northstar Media", type: "call", aiGenerated: true },
  { id: "tk-7", title: "Update pipeline stages for Solaris Solar", description: "Several deals are in wrong stages. Clean up the pipeline view.", due: "2026-04-16", priority: "medium", status: "overdue", workspace: "Solaris Solar", type: "admin", aiGenerated: false },
  { id: "tk-8", title: "Generate Q1 performance report", description: "Compile pipeline stats and outreach metrics for Q1 review.", due: "2026-04-22", priority: "medium", status: "pending", workspace: "Apex Growth", type: "admin", aiGenerated: false },
];

// ── Analytics Data ─────────────────────────────────────────────────────────
export const mockKPIs: KPIStat[] = [
  { label: "Leads Added", value: 312, change: 18, trend: "up" },
  { label: "Positive Replies", value: 84, change: 12, trend: "up" },
  { label: "Booked Calls", value: 41, change: -3, trend: "down" },
  { label: "Open Deals", value: 28, change: 5, trend: "up", prefix: "" },
  { label: "Revenue Influenced", value: "$148k", change: 22, trend: "up" },
  { label: "Workspace Health", value: "87%", change: 4, trend: "up" },
];

export const mockFunnelData = [
  { stage: "Leads", count: 312 },
  { stage: "Contacted", count: 184 },
  { stage: "Replied", count: 84 },
  { stage: "Booked", count: 41 },
  { stage: "Proposal", count: 18 },
  { stage: "Closed", count: 9 },
];

export const mockTrendData = [
  { month: "Nov", leads: 180, calls: 22, replies: 48 },
  { month: "Dec", leads: 210, calls: 28, replies: 56 },
  { month: "Jan", leads: 240, calls: 31, replies: 62 },
  { month: "Feb", leads: 265, calls: 38, replies: 71 },
  { month: "Mar", leads: 290, calls: 35, replies: 79 },
  { month: "Apr", leads: 312, calls: 41, replies: 84 },
];

export const mockWorkspacePerformance = [
  { name: "Apex Growth", leads: 142, calls: 28, revenue: 48000 },
  { name: "Northstar", leads: 98, calls: 14, revenue: 31500 },
  { name: "Elevate", leads: 207, calls: 41, revenue: 72000 },
  { name: "BrightPath", leads: 64, calls: 8, revenue: 18200 },
  { name: "Solaris", leads: 53, calls: 6, revenue: 9600 },
];

// ── AI Activity ────────────────────────────────────────────────────────────
export const mockAIActivity: AIActivity[] = [
  { id: "ai-1", message: "AI drafted 3-step outreach sequence for 24 Elevate Roofing leads — awaiting approval", time: "2 min ago", type: "outreach" },
  { id: "ai-2", message: "47 qualified leads imported from LinkedIn — scored and added to Apex Growth workspace", time: "18 min ago", type: "import" },
  { id: "ai-3", message: "Follow-up task created for Marcus Reid — proposal follow-up due Thursday", time: "1h ago", type: "task" },
  { id: "ai-4", message: "Automation fired: Sophia Chen booked via Calendly → deal moved to Demo Scheduled", time: "2h ago", type: "automation" },
  { id: "ai-5", message: "Pipeline analysis complete: 3 deals at risk, $41k in deals with no recent activity", time: "3h ago", type: "analysis" },
  { id: "ai-6", message: "Outreach campaign sent to 12 BrightPath prospects — reply rate tracking started", time: "5h ago", type: "outreach" },
];

export const mockAISuggestions = [
  { id: "s-1", message: "Elevate Roofing ($24k) hasn't had activity in 6 days — at risk of going cold", action: "Draft follow-up", urgency: "high" },
  { id: "s-2", message: "Marcus Reid replied to your proposal — respond before Thursday meeting", action: "View thread", urgency: "high" },
  { id: "s-3", message: "12 leads went quiet 14+ days ago — AI can re-engage them automatically", action: "Re-engage now", urgency: "medium" },
  { id: "s-4", message: "Booked call rate is down 3% — consider testing a new outreach subject line", action: "View analytics", urgency: "medium" },
  { id: "s-5", message: "Calendly → Deal Stage automation is recommended based on your pipeline", action: "Enable automation", urgency: "low" },
];

// ── Users ──────────────────────────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: "u-1", name: "Jordan Nassie", email: "jordan@daily.church", role: "Admin", status: "active", workspace: "All Workspaces", lastActive: "2026-04-18", avatar: "JN" },
  { id: "u-2", name: "Ava Thompson", email: "ava@daily.church", role: "Manager", status: "active", workspace: "Apex Growth", lastActive: "2026-04-17", avatar: "AT" },
  { id: "u-3", name: "Kai Williams", email: "kai@daily.church", role: "Member", status: "active", workspace: "Elevate Roofing", lastActive: "2026-04-16", avatar: "KW" },
  { id: "u-4", name: "Zoe Martinez", email: "zoe@daily.church", role: "Member", status: "invited", workspace: "Northstar Media", lastActive: "—", avatar: "ZM" },
  { id: "u-5", name: "Ben Carter", email: "ben@daily.church", role: "Viewer", status: "deactivated", workspace: "BrightPath Consulting", lastActive: "2026-03-22", avatar: "BC" },
];

// ── Lite: Small-Business Jobs ───────────────────────────────────────────────
export type JobStage = "New Lead" | "Contacted" | "Estimate Sent" | "Booked" | "Job Done" | "Paid";

export interface LiteJob {
  id: string;
  customer: string;
  phone: string;
  service: string;
  value: number | null;
  stage: JobStage;
  address: string;
  nextAction: string;
  daysInStage: number;
  source: string;
}

export const JOB_STAGES: JobStage[] = [
  "New Lead", "Contacted", "Estimate Sent", "Booked", "Job Done", "Paid",
];

export const mockLiteJobs: LiteJob[] = [
  { id: "j-1",  customer: "Dave Mitchell",    phone: "(214) 555-0182", service: "Roof Replacement",    value: 8500,  stage: "New Lead",      address: "2314 Oak Ln, Dallas TX",     nextAction: "Call back",           daysInStage: 0, source: "Google Ads" },
  { id: "j-2",  customer: "Linda Perez",      phone: "(214) 555-0391", service: "Gutter Cleaning",    value: null,  stage: "New Lead",      address: "587 Maple Dr, Dallas TX",    nextAction: "Send intro text",     daysInStage: 1, source: "Referral" },
  { id: "j-3",  customer: "Sarah Johnson",    phone: "(972) 555-0247", service: "Storm Damage Repair", value: 4200,  stage: "Contacted",     address: "910 Cedar Ct, Plano TX",     nextAction: "Schedule estimate",   daysInStage: 2, source: "Facebook Ads" },
  { id: "j-4",  customer: "Mike Torres",      phone: "(214) 555-0554", service: "Leak Repair",        value: 1200,  stage: "Contacted",     address: "132 Birch St, Garland TX",   nextAction: "Send estimate",       daysInStage: 3, source: "Google Ads" },
  { id: "j-5",  customer: "Jessica Kim",      phone: "(469) 555-0718", service: "Roof Replacement",   value: 11000, stage: "Estimate Sent", address: "45 Walnut Ave, Frisco TX",   nextAction: "Follow up on quote",  daysInStage: 3, source: "Referral" },
  { id: "j-6",  customer: "Ray Dominguez",    phone: "(972) 555-0885", service: "Gutter Replacement", value: 2800,  stage: "Estimate Sent", address: "778 Elm Blvd, McKinney TX",  nextAction: "Call — quote pending", daysInStage: 5, source: "Door Knock" },
  { id: "j-7",  customer: "Carol Stevens",    phone: "(214) 555-0133", service: "Skylight Install",   value: 3600,  stage: "Estimate Sent", address: "209 Pine Rd, Allen TX",      nextAction: "Follow up — 5 days",  daysInStage: 5, source: "Facebook Ads" },
  { id: "j-8",  customer: "Tom Nguyen",       phone: "(972) 555-0467", service: "Full Roof Replace",  value: 14500, stage: "Booked",        address: "56 Spruce Dr, Irving TX",    nextAction: "Confirm Tuesday",     daysInStage: 1, source: "Google Ads" },
  { id: "j-9",  customer: "Angela Brooks",    phone: "(214) 555-0629", service: "Flat Roof Repair",   value: 2100,  stage: "Booked",        address: "881 Hickory Ln, Denton TX",  nextAction: "Confirm materials",   daysInStage: 2, source: "Referral" },
  { id: "j-10", customer: "Frank Osei",       phone: "(972) 555-0993", service: "Storm Damage Repair", value: 6800, stage: "Job Done",       address: "334 Aspen Way, Mesquite TX", nextAction: "Collect payment",     daysInStage: 1, source: "Google Ads" },
  { id: "j-11", customer: "Maria Castillo",   phone: "(214) 555-0281", service: "Gutter Cleaning",    value: 350,   stage: "Job Done",       address: "17 Poplar St, Garland TX",   nextAction: "Send invoice",        daysInStage: 0, source: "Referral" },
  { id: "j-12", customer: "Derek Wade",       phone: "(469) 555-0745", service: "Roof Replacement",   value: 9200,  stage: "Paid",          address: "600 Chestnut Dr, Plano TX",  nextAction: "Ask for review",      daysInStage: 2, source: "Facebook Ads" },
  { id: "j-13", customer: "Pam Harrison",     phone: "(972) 555-0314", service: "Leak Repair",        value: 1100,  stage: "Paid",          address: "74 Magnolia Ct, Frisco TX",  nextAction: "Request referral",    daysInStage: 3, source: "Referral" },
];

// ── Lite: Small-Business Leads ──────────────────────────────────────────────
export type LiteLeadStatus = "new" | "contacted" | "quote-sent" | "booked" | "closed";

export interface LiteLead {
  id: string;
  name: string;
  phone: string;
  service: string;
  status: LiteLeadStatus;
  source: string;
  lastContact: string;
  notes: string;
}

export const mockLiteLeads: LiteLead[] = [
  { id: "ll-1",  name: "Dave Mitchell",   phone: "(214) 555-0182", service: "Roof Replacement",    status: "new",       source: "Google Ads",   lastContact: "Today",      notes: "Filled out form — said shingles are missing" },
  { id: "ll-2",  name: "Linda Perez",     phone: "(214) 555-0391", service: "Gutter Cleaning",    status: "new",       source: "Referral",     lastContact: "Today",      notes: "Friend recommended us — hasn't been called yet" },
  { id: "ll-3",  name: "Sarah Johnson",   phone: "(972) 555-0247", service: "Storm Damage Repair", status: "contacted", source: "Facebook Ads", lastContact: "Yesterday",  notes: "Spoke briefly, wants estimate this week" },
  { id: "ll-4",  name: "Mike Torres",     phone: "(214) 555-0554", service: "Leak Repair",        status: "contacted", source: "Google Ads",   lastContact: "2 days ago", notes: "Active leak in master bedroom — urgent" },
  { id: "ll-5",  name: "Jessica Kim",     phone: "(469) 555-0718", service: "Roof Replacement",   status: "quote-sent", source: "Referral",    lastContact: "3 days ago", notes: "Quote sent $11k — following up today" },
  { id: "ll-6",  name: "Ray Dominguez",   phone: "(972) 555-0885", service: "Gutter Replacement", status: "quote-sent", source: "Door Knock",  lastContact: "5 days ago", notes: "No response to quote — needs follow up" },
  { id: "ll-7",  name: "Carol Stevens",   phone: "(214) 555-0133", service: "Skylight Install",   status: "quote-sent", source: "Facebook Ads", lastContact: "5 days ago", notes: "Quote sent 5 days ago — no reply" },
  { id: "ll-8",  name: "Tom Nguyen",      phone: "(972) 555-0467", service: "Full Roof Replace",  status: "booked",    source: "Google Ads",   lastContact: "1 day ago",  notes: "Booked for Tuesday — confirmed via text" },
  { id: "ll-9",  name: "Angela Brooks",   phone: "(214) 555-0629", service: "Flat Roof Repair",   status: "booked",    source: "Referral",     lastContact: "2 days ago", notes: "Booked for Thursday morning" },
  { id: "ll-10", name: "Frank Osei",      phone: "(972) 555-0993", service: "Storm Damage",       status: "closed",    source: "Google Ads",   lastContact: "4 days ago", notes: "Job completed, collecting payment" },
];

// ── Lite: Messages/Conversations ────────────────────────────────────────────
export interface LiteMessage {
  id: string;
  from: string;
  phone: string;
  preview: string;
  time: string;
  unread: boolean;
  service: string;
  messages: { sender: "them" | "me"; text: string; time: string }[];
}

export const mockLiteMessages: LiteMessage[] = [
  {
    id: "m-1", from: "Dave Mitchell", phone: "(214) 555-0182", service: "Roof Replacement",
    preview: "Hey, I filled out your form about the roof. Is someone available this week?",
    time: "10 min ago", unread: true,
    messages: [
      { sender: "them", text: "Hey, I filled out your form about the roof. Is someone available this week?", time: "10:14 AM" },
    ],
  },
  {
    id: "m-2", from: "Jessica Kim", phone: "(469) 555-0718", service: "Roof Replacement",
    preview: "I got the quote. Can you explain what the 30-year shingles option includes?",
    time: "1h ago", unread: true,
    messages: [
      { sender: "them", text: "I got the quote. Can you explain what the 30-year shingles option includes?", time: "9:22 AM" },
      { sender: "me",   text: "Hi Jessica! The 30-year option includes architectural shingles, new underlayment, and a full ridge cap. Want me to send a comparison sheet?", time: "9:35 AM" },
      { sender: "them", text: "Yes please! Also does that include cleanup?", time: "9:48 AM" },
    ],
  },
  {
    id: "m-3", from: "Tom Nguyen", phone: "(972) 555-0467", service: "Full Roof Replace",
    preview: "Confirmed for Tuesday. What time will your crew arrive?",
    time: "2h ago", unread: false,
    messages: [
      { sender: "them", text: "Confirmed for Tuesday. What time will your crew arrive?", time: "8:05 AM" },
      { sender: "me",   text: "Hey Tom! Planning on 7:30 AM start. We'll text you 30 min before we head over.", time: "8:12 AM" },
      { sender: "them", text: "Perfect, thank you!", time: "8:14 AM" },
    ],
  },
  {
    id: "m-4", from: "Sarah Johnson", phone: "(972) 555-0247", service: "Storm Damage Repair",
    preview: "When can you come out for an estimate? Mornings work best for me.",
    time: "Yesterday", unread: false,
    messages: [
      { sender: "them", text: "When can you come out for an estimate? Mornings work best for me.", time: "Apr 17, 3:45 PM" },
      { sender: "me",   text: "Hi Sarah! We can do Monday or Wednesday morning. Which works better?", time: "Apr 17, 4:02 PM" },
    ],
  },
  {
    id: "m-5", from: "Ray Dominguez", phone: "(972) 555-0885", service: "Gutter Replacement",
    preview: "Still thinking about it. What's your warranty on the gutters?",
    time: "3 days ago", unread: false,
    messages: [
      { sender: "me",   text: "Hi Ray, just following up on the estimate we sent. Any questions?", time: "Apr 13, 9:00 AM" },
      { sender: "them", text: "Still thinking about it. What's your warranty on the gutters?", time: "Apr 13, 2:30 PM" },
    ],
  },
];

// ── Lite: KPIs ──────────────────────────────────────────────────────────────
export const mockLiteKPIs = [
  { label: "New Leads",          value: 12,      change: 4,   trend: "up"   as const },
  { label: "Follow Ups Needed",  value: 4,       change: -2,  trend: "down" as const },
  { label: "Booked Jobs",        value: 7,       change: 2,   trend: "up"   as const },
  { label: "Revenue This Month", value: "$8,400", change: 18, trend: "up"   as const },
];

// ── Lite: Today's Tasks ──────────────────────────────────────────────────────
export const mockLiteTasks = [
  { id: "lt-1", text: "Call Dave Mitchell back — new roof lead",            urgency: "high",   done: false },
  { id: "lt-2", text: "Follow up on Jessica Kim's estimate (3 days no reply)", urgency: "high", done: false },
  { id: "lt-3", text: "Confirm Tuesday job details with Tom Nguyen",        urgency: "medium", done: false },
  { id: "lt-4", text: "Send invoice to Frank Osei — job completed",        urgency: "medium", done: false },
  { id: "lt-5", text: "Reply to Carol Stevens about skylight quote",        urgency: "low",    done: false },
];

// ── Invoices ───────────────────────────────────────────────────────────────
export const mockInvoices: Invoice[] = [
  { id: "inv-001", date: "2026-04-01", amount: 297, status: "paid" },
  { id: "inv-002", date: "2026-03-01", amount: 297, status: "paid" },
  { id: "inv-003", date: "2026-02-01", amount: 297, status: "paid" },
  { id: "inv-004", date: "2026-01-01", amount: 197, status: "paid" },
];
