import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useFollowupStore } from "@/store/followup.store";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import FollowupForm from "@/components/forms/FollowupForm";

const EditFollowupScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getFollowupById, editFollowup, isLoading } = useFollowupStore();

  const followup = useFollowupStore((state) =>
    state.followups.find((f) => f.id === id),
  );

  useEffect(() => {
    if (!followup) {
      getFollowupById(id);
    }
  }, [id, followup, getFollowupById]);

  const handleSubmit = async (payload: any) => {
    try {
      await editFollowup(payload.id, payload);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Edit Follow-up" showBack />
      <View className="flex-1 px-4 pt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <FollowupForm
            followup={followup || undefined}
            leadId={followup?.leadId}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditFollowupScreen;
