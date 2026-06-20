import { Lead } from "./lead.types";
import { Followup } from "./followup.types";

export interface DashboardProps {
  stats: DashboardStats | null;
  todayLeads: Lead[];
  todayFollowups: Followup[];
  onNavigate: (path: string) => void;
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
}

export interface ChartData {
  labels: string[];
  datasets: { data: number[]; color?: string }[];
}