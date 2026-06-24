export const ROLES = {
  ADMIN: 'admin',
  SUB_ADMIN: 'sub_admin',
  EXECUTIVE: 'executive',
} as const;
 
export const ROLE_LABELS: Record<string, string> = {
  "admin": 'Admin',
 "sub-admin": 'Sub Admin',
  "executive": 'Executive',
};