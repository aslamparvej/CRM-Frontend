export interface Followup {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  type: "call" | "whatsapp" | "email" | "visit" | "sms";
  scheduledAt: string;
  note?: string;
  status: "pending" | "completed" | "missed" | "rescheduled";
  completedAt?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}
