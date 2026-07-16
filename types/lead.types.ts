import { User } from "./user.types";

interface Status {
    _id: string,
    name: string,
    color: string,
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address?: string;

  status: Status;
  priority: string;
  category: string;
  source: string;

  notes?: string;
  assignedTo: User;
  createdBy: User;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
  followupDate?: string;
  expectedCloseDate?: string
}

export interface LeadNote {
    id: string,
    leadId: string,
    content: string,
    text?: string, // for backward compatibility
    createdBy: string,
    createdByName: string,
    createdAt: string,
}



export interface LeadHistory {
    _id: string,
    leadId: string,
    action: string,
    oldValue?: string,
    newValue?: string,
    changedBy: User,
    createdAt: string
}

export interface LeadFilters {
    status?: string,
    priority?: string,
    category?: string,
    assignedTo?: string,
    dateFrom?: string,
    dateTo?: string,
    search?: string
}