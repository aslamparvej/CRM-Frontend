import API from "./axios";
import { Followup } from "@/types/followup.types";

export const createFollowup = async (payload: Partial<Followup>) => {
  try {
    const response = await API.post("followups", payload);
    return response.data;
  } catch (error) {
    console.log("Error to creating followups", error);
  }
};

export const getFollowups = async (params?: {
  status?: string;
  date?: Date;
  leadId?: string;
}) => {
  try {
    const reponse = await API.get("/followups", { params });

    return reponse.data;
  } catch (error) {
    console.log("Error to fetching followups", error);
  }
};

export const completeFollowup = async (id: string, note?: string) => {
  try {
    const response = await API.patch(`/followups/${id}/done`);

    return response.data;
  } catch (error) {
    console.log("Error to mark complete followups", error);
  }
};
