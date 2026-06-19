export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'lead' | 'followup' | 'message' | 'system';
  isRead: boolean;
  data?: Record<string, string>;
  createdAt: string;
}
 