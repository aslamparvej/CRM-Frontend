import { useState } from "react";
import { useRouter } from "expo-router";
import { View, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/ui/Header";
import UserForm from "@/components/forms/UserForm";
import { RegisterPayload } from "@/types/user.types";
import { createUser } from "@/services/api/user.api";

const CreateUserScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();


  const handleSubmit = async (data: RegisterPayload) => {
    setLoading(true);
    try {
      console.log("User creation data", data)
      const response = await createUser(data);
      const responseData = response.data;

      if (!responseData.success) {
        setError(responseData.message || "Failed to create user. Please try again.");
        return;
      }
      setError(null);
      router.back();
    } catch (error) {
      console.log("Error creating user:", error);
      setError("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="New User" showBack />
      <View className="flex-1 px-4 pt-4">
        <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
        {error && <Text className="text-red-500 mt-2">{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default CreateUserScreen;
