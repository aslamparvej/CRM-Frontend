import { getNotifications } from "../api/notification.api";
import { useNotificationStore } from "@/store/notification.store";

export const initializeNotifications = async () => {
  const {
    setNotifications,
    setLoading,
  } = useNotificationStore.getState();

  try {
    setLoading(true);

    const res = await getNotifications();

    setNotifications(res.data);
  } finally {
    setLoading(false);
  }
};