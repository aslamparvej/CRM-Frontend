import API from "./axios";
import { Followup } from "@/types/followup.types";

export const createFollowup = async (payload: Partial<Followup>) => {
  const response = await API.post("followups", payload);
  return response.data;
};

export const getFollowups = async (params?: {
  status?: string;
  date?: Date;
  leadId?: string;
}) => {
  const reponse = await API.get("/followups", { params });
  return reponse.data;
};

export const fetchFollowupById = async (id: string) => {
  const response = await API.get(`/followups/${id}`);
  return response.data;
};

export const getFollowupByLeadId = async (leadId: string) => {
  const response = await API.get(`/followups/lead/${leadId}`);
  return response.data;
};

export const completeFollowup = async (id: string) => {
  const response = await API.patch(`/followups/${id}/done`);
  return response.data;
};

export const updateFollowUp = async (id: string, payload: Partial<Followup>) => {
  const response = await API.put(`/followups/${id}`, payload);
  return response.data;
};