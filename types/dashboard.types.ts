import { Lead } from "./lead.types";
import { Followup } from "./followup.types";

export interface DashboardProps {
  stats: DashboardStats | null;
  todayLeads: Lead[];
  todayFollowups: Followup[];
  onNavigate: (path: string) => void;
}

export interface StatusBreakdown {
  statusId: string;
  name: string;
  color: string;
  order: number;
  isClosed: boolean;
  count: number;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  closedLeads: number;
  pendingFollowups: number;
  todayLeads: number;
  conversionRate: number;
  monthlyRevenue?: number;
  subAdminCount?:  number;
  executiveCount?: number;
  totalFollowups?: number;
  todayFollowups?: number;
  statusBreakdown: StatusBreakdown[],
}

export interface ChartData {
  labels: string[];
  datasets: { data: number[]; color?: string }[];
}