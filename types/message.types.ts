export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  type: "whatsapp" | "sms";
  variables?: string[];
  createdAt: string;
}

export interface BulkMessage {
  id: string;
  templateId: string;
  type: "whatsapp" | "sms";
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  status: "pending" | "sending" | "completed" | "failed";
  createdAt: string;
}
