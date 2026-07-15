import API from "./axios";
import { ActivityFilter } from "@/types/activity.types";

export const getActivities = async (
  userId: string,
  filters: ActivityFilter,
) => {
  const { data } = await API.get(`/activities`, { params: {userId, ...filters} });
  return data;
};
