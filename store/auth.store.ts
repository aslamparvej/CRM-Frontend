import { create } from "zustand";

import { socket } from "@/services/socket/socket";
import { loginUser } from "@/services/api/auth.api";
import { initializeNotifications } from "@/services/notifications/notification";
import { initializeSocketListeners } from "@/services/socket/socketListeners";
import { saveToken, removeToken } from "@/services/storage/secureStorage";

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;

  setAuth: (user: User, token: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,

  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
    }),

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await loginUser({ email, password });

      const { accessToken, user } = response.data;
      await saveToken(accessToken);

      set({
        user,
        accessToken,
        isLoading: false,
      });

      // Get ALl notification
      initializeNotifications();
      // Connect socket after login
      socket.connect();
      socket.emit("join", user._id);
      initializeSocketListeners();

      return true;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      set({
        isLoading: false,
        error: message,
      });

      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await removeToken();
      socket.off("notification:new");
      socket.disconnect();
    } catch (error: any) {
      console.log("Error to logout", error.message);
    } finally {
      set({
        user: null,
        accessToken: null,
        error: null,
        isLoading: false,
      });
    }
  },

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (e) => {
    set({ error: e });
  },
}));
