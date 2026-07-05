import API from "./axios";

export const getLeadStatuses = async () => {
  const response = await API.get("/statuses");
  return response.data;
};
