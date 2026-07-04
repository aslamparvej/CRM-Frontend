import { useEffect } from "react";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

import { getProfile } from "@/services/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { getToken, removeToken } from "@/services/storage/secureStorage";
import { socket } from "@/services/socket/socket";
import { initializeNotifications } from "@/services/notifications/notification";
import { initializeSocketListeners } from "@/services/socket/socketListeners";

export default function Index() {
  const { accessToken, setAuth, isLoading, setLoading } = useAuthStore();

  const checkLogin = async () => {
    setLoading(true);
    try {
      const savedToken = await getToken();

      // NO TOKEN
      if (!savedToken) return;
      const response = await getProfile(savedToken);
      setAuth(response.data, savedToken);

      initializeNotifications();
      socket.connect();
      socket.emit("join", response.data._id);
      initializeSocketListeners();
    } catch (error) {
      console.log(error);
      await removeToken();

      setAuth(null as any, "");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // LOADING
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return accessToken ? (
    <Redirect href="/(protected)/(tabs)/dashboard" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
