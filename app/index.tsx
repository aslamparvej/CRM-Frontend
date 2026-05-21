import { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

import { getProfile } from "@/services/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { getToken } from "@/services/storage/secureStorage";

export default function Index() {
  const { accessToken, user, setAuth, isLoading, setLoading } = useAuthStore();

  const checkLogin = async () => {
    try {
      const savedToken = await getToken();

      // NO TOKEN
      if (!savedToken) {
        setLoading(false);
        router.replace("/(auth)/login");
        return;
      }

      const response = await getProfile(savedToken);
      setAuth(response.data, savedToken);
      router.replace("/(protected)/(tabs)/dashboard");
    } catch (error) {
      console.log(error);
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

  if(accessToken){
     return <Redirect href="/(protected)/(tabs)/dashboard" />;
  }

  return <Redirect href="/(auth)/login" />;
}
