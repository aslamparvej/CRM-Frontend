export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'lead-assigned' | 'followup' | 'message' | 'system';
  readAt: string;
  data?: Record<string, string>;
  createdAt: string;
}
 