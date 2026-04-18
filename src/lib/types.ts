export type WorkspaceHealth = "excellent" | "good" | "fair" | "poor";

export interface Workspace {
  id: string;
  name: string;
  industry: string;
  leads: number;
  bookedCalls: number;
  activeCampaigns: number;
  health: WorkspaceHealth;
  lastUpdated: string;
  revenue: number;
  avatar: string;
  color: string;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "unqualified" | "nurturing" | "converted";
export type LeadSource = "LinkedIn" | "Cold Email" | "Referral" | "Website" | "Ads" | "Organic";

export interface Lead {
  id: string;
  name: string;
  company: string;
  industry: string;
  email: string;
  phone: string;
  status: LeadStatus;
  score: number;
  owner: string;
  lastContact: string;
  source: LeadSource;
  workspace: string;
}

export type DealStage =
  | "Qualified"
  | "Contact Made"
  | "Demo Scheduled"
  | "Proposal Made"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

export interface Deal {
  id: string;
  company: string;
  contact: string;
  value: number;
  stage: DealStage;
  owner: string;
  dueDate: string;
  nextTask: string;
  tags: string[];
  probability: number;
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  industry: string;
  owner: string;
  labels: string[];
  lastActivity: string;
  deals: number;
  notes: string;
  address: string;
  website: string;
  linkedin: string;
}

export interface Thread {
  id: string;
  from: string;
  company: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  label: string;
  replies: number;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: "active" | "paused" | "draft";
  runs: number;
  lastRun: string;
  category: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed" | "overdue";
  workspace: string;
  type: "follow-up" | "review" | "outreach" | "admin" | "call";
  aiGenerated: boolean;
}

export interface KPIStat {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "flat";
  prefix?: string;
  suffix?: string;
}

export interface AIActivity {
  id: string;
  message: string;
  time: string;
  type: "outreach" | "import" | "task" | "automation" | "analysis";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Member" | "Viewer";
  status: "active" | "invited" | "deactivated";
  workspace: string;
  lastActive: string;
  avatar: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
}
