import { create } from "zustand";

import {
  markAsReadNotification,
  markAllAsReadNotification,
  deleteNotification,
  deleteAllNotifications,
} from "@/services/api/notification.api";
import { Notification } from "@/types/notification.types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => Promise<void>;
  removeAllNotifications: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  setNotifications: (notifications) =>
    set({
      notifications: notifications ?? [],
      unreadCount: notifications?.filter((n) => !n.readAt).length || 0,
    }),

  markAsRead: async (id) => {
    try {
      const response = await markAsReadNotification(id);
      const updatedNotification = response.data;

      set((s) => ({
        notifications: s.notifications.map((n) =>
          n._id === id ? updatedNotification : n,
        ),
        unreadCount: s.notifications.filter((n) => n._id !== id && !n.readAt)
          .length,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  markAllAsRead: async () => {
    try {
      await markAllAsReadNotification();

      set((state) => ({
        notifications: state.notifications.map((notification) => ({
          ...notification,
          readAt: new Date().toISOString(),
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  addNotification: (notification) =>
    set((s) => ({
      notifications: [notification, ...s.notifications],
      unreadCount: s.unreadCount + (notification.readAt ? 0 : 1),
    })),

  removeNotification: async (id) => {
    try {
      await deleteNotification(id);
      set((s) => ({
        notifications: s.notifications.filter((n) => n._id !== id),
        unreadCount: s.notifications.filter((n) => n._id !== id && !n.readAt)
          .length,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  removeAllNotifications: async () => {
    try {
      await deleteAllNotifications();
      set({
        notifications: [],
        unreadCount: 0,
      });
    } catch (error) {
      console.log(error);
    }
  },

  setLoading: (isLoading) => set({ isLoading }),
}));
