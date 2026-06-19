import { Lead } from "./lead.types";

export interface DashboardProps {
  stats: DashboardStats | null;
  todayLeads: Lead[];
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
}

export interface ChartData {
  labels: string[];
  datasets: { data: number[]; color?: string }[];
}