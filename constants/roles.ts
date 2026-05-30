export const ROLES = {
  ADMIN: 'admin',
  SUB_ADMIN: 'sub_admin',
  AGENT: 'agent',
} as const;
 
export const ROLE_LABELS: Record<string, string> = {
  "admin": 'Admin',
 "sub-admin": 'Sub Admin',
  "agent": 'Agent',
};