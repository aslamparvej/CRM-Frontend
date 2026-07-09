import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import { showSuccess, showError } from "@/utils/toast";
import { useFollowupStore } from "@/store/followup.store";
import { createFollowup } from "@/services/api/followups.api";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import EmptyState from "@/components/ui/EmptyState";
import FollowupForm from "@/components/forms/FollowupForm";
import ExistingFollowup from "@/components/followups/ExistingFollowup";

const FollowUpScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addFollowup, fetchFollowupByLeadId, error, isLoading } =
    useFollowupStore();
  const [followupLoading, setFollowupLoading] = useState(false);

  // Fetch existing follow-up for the lead when the component mounts
  useEffect(() => {
    if (id) {
      fetchFollowupByLeadId(id);
    }
  }, [fetchFollowupByLeadId, id]);

  const existingFollowup = useFollowupStore((state) =>
    state.followups.find((f) => f.leadId === id),
  );

  const handleSubmit = async (data: any) => {
    setFollowupLoading(true);

    try {
      const response = await createFollowup(data);
      if (response.success) {
        addFollowup(response.data);
        showSuccess(response.message);
        router.replace("/(protected)/(tabs)/followups");
      }
    } catch (error: any) {
      console.error("Error creating followup", error);
      showError(error.message || "Error creating followup");
    } finally {
      setFollowupLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Schedule Follow-up" showBack />
      <View className="flex-1 px-4 py-3">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <EmptyState title={error} />
        ) : existingFollowup ? (
          <ExistingFollowup followup={existingFollowup} />
        ) : (
          <FollowupForm
            leadId={id}
            onSubmit={handleSubmit}
            isLoading={followupLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FollowUpScreen;
