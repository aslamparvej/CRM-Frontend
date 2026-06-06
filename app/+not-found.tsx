import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertTriangle, Home } from "lucide-react-native";

import Button from "@/components/ui/Button";

const NotFoundScreen = () => {
  const router = useRouter();

  const onPressHandler = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center px-8">
      <View className="bg-amber-500/10 p-6 rounded-full mb-6">
        <AlertTriangle size={56} color="#F59E0B" />
      </View>

      <Text className="text-gray-800 text-3xl font-bold mb-2">404</Text>
      <Text className="text-gray-800 text-xl font-semibold mb-2">
        Page Not Found
      </Text>

      <Text className="text-gray-600 text-center text-base mb-10">
        The screen you&apos;re looking for doesn&apos;t exist or has been moved.
      </Text>

      <Button
        onPress={onPressHandler}
        icon={<Home size={18} color="#000" />}
        label="Go Home"
      ></Button>
    </SafeAreaView>
  );
};

export default NotFoundScreen;
