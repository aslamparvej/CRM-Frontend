import { useEffect } from "react";
import { router } from "expo-router";

import { useAuthStore } from "@/store/auth.store";

export const useProtectedRoute = () => {
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token]);
};
