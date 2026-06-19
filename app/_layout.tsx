import "./global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        >
          <Stack.Screen name="index" />
          {/* AUTH */}
          <Stack.Screen name="(auth)" />

          {/* PROTECTED */}
          <Stack.Screen name="(protected)" />
        </Stack>

        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
