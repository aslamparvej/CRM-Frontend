import { create } from "zustand";

import { getActivities } from "@/services/api/activity.api";
import { Activity, ActivityFilter } from "@/types/activity.types";

interface ActivityState {
  activities: Activity[];
  pagination: any;
  filters: ActivityFilter;
  loading: boolean;
  refreshing: boolean;
  error: string | null;

  fetchActivities: (userId: string, reset?: boolean) => Promise<void>;
  loadMore: (userId: string) => Promise<void>;
  refresh: (userId: string) => Promise<void>;
  updateFilters: (filters: Partial<ActivityFilter>) => void;
  clearFilters: () => void;
}

const defaultFilters: ActivityFilter = {
  page: 1,
  limit: 20,
  search: "",
  period: "all",
};

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  pagination: null,
  filters: defaultFilters,
  loading: false,
  refreshing: false,
  error: null,
  fetchActivities: async (userId, reset = false) => {
    try {
      set({
        loading: true,
      });
      const currentFilters = get().filters;
      const filters = reset ? { ...currentFilters, page: 1 } : currentFilters;

      const res = await getActivities(userId, filters);

      set({
        activities: reset ? res.data : [...get().activities, ...res.data],
        pagination: res.pagination,
        filters,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
  loadMore: async (userId) => {
    const { pagination, filters } = get();
    if (!pagination) return;
    if (filters.page >= pagination.totalPages) return;

    const next = {
      ...filters,
      page: filters.page + 1,
    };

    set({
      filters: next,
    });
    await get().fetchActivities(userId);
  },
  refresh: async (userId) => {
    set({
      refreshing: true,
    });
    await get().fetchActivities(userId, true);
    set({
      refreshing: false,
    });
  },
  updateFilters: (filters) => {
    set({
      filters: {
        ...get().filters,
        ...filters,
        page: 1,
      },
    });
  },
  clearFilters: () => {
    set({ filters: defaultFilters });
  },
}));
