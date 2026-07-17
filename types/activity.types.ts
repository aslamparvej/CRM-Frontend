export interface Activity {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  module: "Lead" | "FollowUp" | "User" | "Note" | "Notification" | "Auth" | "Communication";
  action: string;
  leadId?: string;
  targetId?: string;
  targetName?: string;
  description: string;
  ip: string;
  platform: "android" | "ios" | "web";
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ActivityFilter {
  page: number;
  limit: number;
  search: string;
  period: "all" | "today" | "week" | "month" | "custom";
  module?: string;
  action?: string;
  from?: string;
  to?: string;
}
