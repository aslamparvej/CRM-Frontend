import API from "./axios";
import { Lead, LeadFilters } from "@/types/lead.types";

export const createLead = async (data: Partial<Lead>) => {
  try {
    const response = await API.post("/leads", data);
    return response.data;
  } catch (error) {
    console.log("Error when calling create lead api", error);
  }
};

export const getLeads = async (
  filters?: LeadFilters & { page?: number; perPage?: number },
  nextPage?: number,
) => {
  try {
    const response = await API.get("/leads", { params: filters });
    return response.data;
  } catch (error) {
    console.log("Error sending get leads request...", error);
  }
};

export const getLeadById = async (id: string) => {
  try {
    const response = await API.get(`/leads/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error when calling get lead api by Id", error);
  }
};

export const updateLead = async (id: string, payload: Partial<Lead>) => {
    try {
    const response = await API.put(`/leads/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log("Error when update lead", error);
  }
};

export const deleteLead = async (id: string) => {
  try {
    await API.delete(`/leads/${id}`);
  } catch (error) {
    console.log("Error when calling delete lead api", error);
  }
};

export const bulkDelete = async (ids: string[]) => {
  try {
    await API.post("/leads/bulk-delete", { ids });
  } catch (error) {
    console.log("Error when calling bulk delete lead api", error);
  }
};

export const bulkAssign = async (ids: string[], userId: string) => {
  try {
    await API.post("/leads/bulk-assign", { ids, userId });
  } catch (error) {
    console.log("Error when calling bulk assign lead api", error);
  }
};

export const bulkUpdateStatus = async (ids: string[], status: string) => {
  try {
    await API.post("/leads/bulk-status", { ids, status });
  } catch (error) {
    console.log("Error when calling bulk update status lead api", error);
  }
};

export const getNotes = async (leadId: string) => {
  try {
    const response = await API.get(`/leads/${leadId}/notes`);
    return response.data;
  }
  catch (error) {
    console.log("Error when calling get lead notes api", error);
  }
};

export const addNote = async (leadId: string, content: string) => {
  try {
    const response = await API.post(`/leads/${leadId}/notes`, { content });
    return response.data;
  }
  catch (error) {
    console.log("Error when calling add lead note api", error);
  }
};

export const deleteNote = async (leadId: string, noteId: string) => {
  try {
    await API.delete(`/leads/${leadId}/notes/${noteId}`);
  }
  catch (error) {
    console.log("Error when calling delete lead note api", error);
  }
};

export const getHistory = async (leadId: string) => {
  try {
    const response = await API.get(`/leads/${leadId}/history`);
    return response.data;
  }
  catch (error) {
    console.log("Error when calling get lead history api", error);
  }
};

