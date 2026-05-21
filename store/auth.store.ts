import { create } from "zustand";

import { loginUser, logoutUser } from "@/services/api/auth.api";
import { saveToken, removeToken } from "@/services/storage/secureStorage";

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean,
  createdAt: string
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;

  setAuth: (user: User, token: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
    }),

  login: async (email, password) => {
    try {
      set({ isLoading: true });
      const response = await loginUser({ email, password });

      const { accessToken, user } = response.data;
      console.log("Users data", user);
      await saveToken(accessToken);

      set({
        user,
        accessToken,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      console.log("Error to login", error);
    }
  },

  logout: async () => {
    try {
      await removeToken();
      set({
        user: null,
        accessToken: null,
      });
    } catch (error) {
      console.log("Error to logout", error);
    }
  },

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}));
