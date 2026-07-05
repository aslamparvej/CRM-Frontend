import { create } from "zustand";

import { getLeadStatuses } from "@/services/api/leadStatus.api";

interface Status {
  _id: string;
  name: string;
  color: string;
  isActive: boolean;
  isClosed: boolean;
  isDefault: boolean;
  order: number;
  createdBy: string;
  createdAt: string;
}

interface LeadStatusState {
  statuses: Status[];
  isLoading: boolean;
  error: string | null;
  loadStatuses: () => Promise<void>;
  setStatuses: (statuses: Status[]) => void;
  addStatus: (status: Status) => Promise<void>;
  editStatus: (id: string, payload: any) => Promise<void>;
  removeStatus: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useLeadStatusStore = create<LeadStatusState>((set) => ({
  statuses: [],
  isLoading: false,
  error: null,

  loadStatuses: async () => {
    set({ isLoading: true });
    try {
      const response = await getLeadStatuses();
      set({ statuses: response.data });
    } catch (error) {
      console.error(error);
    } finally {
        set({ isLoading: false });
    }
  },

  setStatuses: (statuses: Status[]) => {},
  addStatus: async (status: Status) => {},
  editStatus: async (id: string, payload: any) => {},
  removeStatus: async (id: string) => {},
  setLoading: async (loading: boolean) => {},
}));
