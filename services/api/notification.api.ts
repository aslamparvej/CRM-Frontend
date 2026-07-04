import API from "./axios";

export const getNotifications = async () => {
  const response = await API.get("/notifications");
  return response.data;
};

export const markAsReadNotification = async (id: string) => {
  const response = await API.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsReadNotification = async () => {
  const response = await API.patch("/notifications/read-all");
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await API.delete(`/notifications/${id}`);
  return response.data;
};

export const deleteAllNotifications = async () => {
  await API.delete("/notifications");
};
