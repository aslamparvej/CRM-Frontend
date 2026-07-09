import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { showError, showSuccess } from "@/utils/toast";
import { useFollowupStore } from "@/store/followup.store";
import { completeFollowup } from "@/services/api/followups.api";

import AppHeader from "@/components/ui/Header";
import EmptyState from "@/components/ui/EmptyState";
import FollowupDetailsCard from "@/components/followups/FollowupDetailsCard";

const FollowupDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();
  const { getFollowupById, updateFollowup } = useFollowupStore();

  const followup = useFollowupStore((state) =>
    state.followups.find((f) => f.id === id),
  );

  useEffect(() => {
    if (!followup) {
      getFollowupById(id);
    }
  }, [id, followup, getFollowupById]);

  const handleCompleteFollowup = async (id: string) => {
    try {
      const response = await completeFollowup(id);
      if (response.success) {
        updateFollowup(id, { status: "completed" });
        showSuccess(response.message);
      }
    } catch (error: any) {
      console.error("Error to mark done", error.message);
      showError(error.message || "Error to mark done");
    }
  };

  const handleEditFollowup = () => {
    router.push(`/(protected)/followup/edit/${followup?.id}`);
  };

  const handleViewLead = () => {
    router.push(`/(protected)/leads/details/${followup?.leadId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Follow-up" showBack />

      <View className="flex-1 px-4 py-3">
        {followup ? (
          <FollowupDetailsCard
            followup={followup}
            onComplete={handleCompleteFollowup}
            onEdit={handleEditFollowup}
            onViewLead={handleViewLead}
          />
        ) : (
          <EmptyState
            title="Followup Not Found."
            description="The requested followup could not be found."
            action={{ label: "Go Back", onPress: () => router.back() }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FollowupDetailsScreen;
