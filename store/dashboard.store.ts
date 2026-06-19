import { create } from "zustand";

import { DashboardStats } from "@/types/dashboard.types";

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  setStats: (stats: DashboardStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,
  setStats: (stats) => set({ stats }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
