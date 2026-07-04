import { create } from "zustand";

import { Lead, LeadFilters, LeadNote, LeadHistory } from "@/types/lead.types";
import {
  createLead,
  getLeadById,
  getLeads,
  updateLead,
  deleteLead,
  getNotes,
  addNote,
  deleteNote,
  getHistory,
  bulkDelete,
  bulkAssign,
  bulkUpdateStatus,
  addHistory,
  assignLead
} from "@/services/api/lead.api";

interface LeadStore {
  leads: Lead[];
  selectedLeads: Lead[] | null;
  notes: LeadNote[];
  history: LeadHistory[];
  filters: LeadFilters;
  total: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  selectedIds: string[];
  fetchLeads: (reset?: boolean) => Promise<void>;
  fetchLeadById: (id: string) => Promise<void>;
  createLead: (data: Partial<Lead>) => Promise<void>;
  updateLead: (id: string, data: Partial<Lead>) => Promise<void>;
  removeLead: (id: string) => Promise<void>;
  assignLead: (id: string, userId: string)=> Promise<boolean>;
  fetchNotes: (id: string) => Promise<void>;
  addNote: (id: string, content: string) => Promise<void>;
  fetchHistory: (id: string) => Promise<void>;
  addHistory: (id: string, action: string) => Promise<void>;
  setFilters: (filters: LeadFilters) => void;
  toggleSelect: (id: string) => void;
  clearSelected: () => void;
  clearFilters: () => void;
  bulkDelete: () => Promise<void>;
  bulkAssign: (userId: string) => Promise<void>;
  bulkStatus: (status: string) => Promise<void>;
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],
  selectedLeads: null,
  notes: [],
  history: [],
  filters: {},
  total: 0,
  page: 1,
  isLoading: false,
  error: null,
  selectedIds: [],

  fetchLeads: async (reset = false) => {
    const { filters, page } = get();
    const nextPage = reset ? 1 : page;
    set({ isLoading: true });
    try {
      const { data } = await getLeads(filters, nextPage);
      set((state) => ({
        leads: reset ? data : [...state.leads, ...data],
        total: data.total,
        page: nextPage + 1,
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false, error: "Failed to fetch leads" });
    }
  },

  fetchLeadById: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await getLeadById(id);
      set({ isLoading: false });
      return data;
    } catch {
      set({ isLoading: false });
    }
  },

  createLead: async (data) => {
    const res = await createLead(data);
    set((state) => ({ leads: [res, ...state.leads] }));
  },

  updateLead: async (id, data) => {
    const res = await updateLead(id, data);
    set((state) => ({
      leads: state.leads.map((l) => (l._id === id ? res : l)),
      selectedLead: res,
    }));
  },

  removeLead: async (id) => {
    await deleteLead(id);
    set((state) => ({ leads: state.leads.filter((l) => l._id !== id) }));
  },

  assignLead: async(id, userId) => {
    const res = await assignLead(id, userId);
    set((state)=> ({leads: state.leads.map((l)=> l._id === id ? res.data : l)}))
    return res.success;
  },

  fetchNotes: async (id) => {
    const { data } = await getNotes(id);
    set({ notes: data });
  },

  addNote: async (id, content) => {
    const { data } = await addNote(id, content);
    set((state) => ({ notes: [data, ...state.notes] }));
  },

  deleteNote: async (id: string, noteId: string) => {
    await deleteNote(id, noteId);
    set((state) => ({ notes: state.notes.filter((n) => n.id !== noteId) }));
  },

  fetchHistory: async (id) => {
    const { data } = await getHistory(id);
    set({ history: data });
  },

  addHistory: async (id, action) => {
    const { data } = await addHistory(id, action);
    set((state) => ({ history: [...state.history, data] }));
  },

  setFilters: (filters) => set({ filters }),

  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),

  clearSelected: () => set({ selectedIds: [] }),

  clearFilters: () => set({ filters: {} }),

  bulkDelete: async () => {
    const { selectedIds } = get();
    await bulkDelete(selectedIds);
    set((state) => ({
      leads: state.leads.filter((l) => !selectedIds.includes(l._id)),
      selectedIds: [],
    }));
  },

  bulkAssign: async (userId) => {
    const { selectedIds } = get();
    await bulkAssign(selectedIds, userId);
    set({ selectedIds: [] });
    await get().fetchLeads(true);
  },

  bulkStatus: async (status) => {
    const { selectedIds } = get();
    await bulkUpdateStatus(selectedIds, status);
    set({ selectedIds: [] });
    await get().fetchLeads(true);
  },
}));
