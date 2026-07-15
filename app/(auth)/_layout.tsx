import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";

import { getToken } from "@/services/storage/secureStorage";

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = await getToken();

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("AUTH LAYOUT ERROR:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

   // LOADING
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // IF ALREADY LOGGED IN
  if (isLoggedIn) {
    return <Redirect href="/(protected)/(tabs)/dashboard" />;
  }


  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
};

export default AuthLayout;
