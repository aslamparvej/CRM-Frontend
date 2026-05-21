export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'sub_admin' | 'agent';
  avatar?: string;
  isActive: boolean;
  leadsCount?: number;
  conversionRate?: number;
  createdAt: string;
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
