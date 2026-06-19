export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'sub_admin' | 'agent';
  avatar?: string;
  isActive: boolean;
  leadsCount?: number;
  conversionRate?: number;
  createdAt: string;
  totalLeads?: number
}

export interface UserPermission {
  id: string;
  userId: string;
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  agentType?: string;
}

export const ALL_KEYS = [
  "CREATE_LEAD",
  "EDIT_LEAD",
  "DELETE_LEAD",
  "VIEW_ALL_LEADS",
  "MANAGE_USERS",
  "SEND_MESSAGES",
  "VIEW_REPORTS",
  "MANAGE_SETTINGS",
] as const;

export type PermKey = typeof ALL_KEYS[number];

