import React, { useState } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import { showSuccess, showError } from "@/utils/toast";
import { createFollowup } from "@/services/api/followups.api";
import { useFollowupStore } from "@/store/followup.store";

import AppHeader from "@/components/ui/Header";
import FollowupForm from "@/components/forms/FollowupForm";

const FollowUpScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addFollowup } = useFollowupStore();
  const router = useRouter();

  const [followupLoading, setFollowupLoading] = useState(false);

  const handleFollowupSubmit = async (data: any) => {
    setFollowupLoading(true);

    try {
      const response = await createFollowup(data);
      if (response.success) {
        addFollowup(response.data);
        showSuccess(response.message);
        router.replace("/(protected)/(tabs)/followups");
      }
    } catch (error: any) {
      console.log("Error creating followup", error);
      showError(error.message || "Error creating followup");
    } finally {
      setFollowupLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Schedule Follow-up" showBack />
      <View className="flex px-4 py-3">
        <FollowupForm
          leadId={id}
          onSubmit={handleFollowupSubmit}
          isLoading={followupLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default FollowUpScreen;
