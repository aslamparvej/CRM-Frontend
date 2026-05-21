import { useEffect, useState } from "react";
import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { getToken } from "@/services/storage/secureStorage";

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await getToken();

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("AUTH CHECK ERROR:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // NOT AUTHENTICATED
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // AUTHENTICATED
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* TABS */}
      <Stack.Screen name="(tabs)" />

      {/* LEADS */}
      <Stack.Screen name="leads/create/index" />
      <Stack.Screen name="leads/edit/[id]" />
      <Stack.Screen name="leads/details/[id]" />
      <Stack.Screen name="leads/history/[id]" />
      <Stack.Screen name="leads/notes/[id]" />

      {/* USERS */}
      <Stack.Screen name="users/create/index" />
      <Stack.Screen name="users/edit/[id]" />
      <Stack.Screen name="users/details/[id]" />

      {/* SETTINGS */}
      <Stack.Screen name="settings/index" />

      {/* REPORTS */}
      <Stack.Screen name="reports/index" />

      {/* NOTIFICATIONS */}
      <Stack.Screen name="notifications/index" />
    </Stack>
  );
}
