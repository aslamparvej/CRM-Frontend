import { create } from "zustand";

import { Followup } from "@/types/followup.types";
import {
  getFollowupByLeadId,
  fetchFollowupById,
  updateFollowUp,
} from "@/services/api/followups.api";

interface FollowupState {
  followups: Followup[];
  isLoading: boolean;
  error: string | null;
  setFollowups: (followups: Followup[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addFollowup: (followup: Followup) => void;
  updateFollowup: (id: string, data: Partial<Followup>) => void;
  getFollowupById: (id: string) => Promise<Followup | undefined>;
  fetchFollowupByLeadId: (leadId: string) => Promise<Followup | undefined>;
  editFollowup: (id: string, payload: Followup) => Promise<void>;
}

export const useFollowupStore = create<FollowupState>((set, get) => ({
  followups: [],
  isLoading: false,
  error: null,
  setFollowups: (followups) => set({ followups }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addFollowup: (followup) =>
    set((state) => ({ followups: [followup, ...state.followups] })),
  updateFollowup: (id, data) =>
    set((s) => ({
      followups: s.followups.map((f) => (f.id === id ? { ...f, ...data } : f)),
    })),

  getFollowupById: async (id: string) => {
    set({ isLoading: true });
    try {
      // Check cache first
      const existing = get().followups.find((f) => f.id === id);

      if (existing) {
        return existing;
      }

      // Not found, fetch from API
      const response = await fetchFollowupById(id);

      set((state) => ({
        followups: [...state.followups, response.data],
      }));

      return response.data;
    } catch (error) {
      console.error("Error fetching followup by ID:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFollowupByLeadId: async (leadId: string) => {
    set({ isLoading: true });
    set({ error: null });
    try {
      // Check cache first
      const existing = get().followups.find((f) => f.leadId === leadId);

      if (existing) {
        return existing;
      }

      // Not found, fetch from API
      const response = await getFollowupByLeadId(leadId);

      set((state) => ({
        followups: [...state.followups, response.data],
      }));

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return undefined;
      }

      set({ error: error.message });
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  },

  editFollowup: async (id: string, payload: Followup) => {
    try {
      const response = await updateFollowUp(id, payload);
      const updated = response.data;
      set((s) => ({
        followups: s.followups.map((f) =>
          f.id === id ? { ...f, ...updated } : f,
        ),
      }));
    } catch (error) {
      console.error("Error updating followup:", error);
    }
  },
}));
