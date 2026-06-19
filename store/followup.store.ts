import { create } from "zustand";

import { Followup } from "@/types/followup.types";

interface FollowupState {
  followups: Followup[];
  isLoading: boolean;
  error: string | null;
  setFollowups: (followups: Followup[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addFollowup: (followup: Followup)=> void;
  updateFollowup: (id: string, data: Partial<Followup>) => void;
}

export const useFollowupStore = create<FollowupState>((set) => ({
  followups: [],
  isLoading: false,
  error: null,
  setFollowups: (followups) => set({ followups }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addFollowup: (followup)=> set((state)=>({followups: [followup, ...state.followups]})),
  updateFollowup: (id, data) =>
    set((s) => ({
      followups: s.followups.map((f) => (f.id === id ? { ...f, ...data } : f)),
    })),
}));
