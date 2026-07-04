import { socket } from "./socket";
import { showNotificationToast } from "@/utils/toast";
import { useNotificationStore } from "@/store/notification.store";

let initialized = false;

export const initializeSocketListeners = () => {
  if (initialized) return;

  initialized = true;

  socket.on("notification:new", (notification) => {
    useNotificationStore.getState().addNotification(notification);

    showNotificationToast(notification);
  });
};
