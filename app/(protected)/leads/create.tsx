import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLeadStore } from "@/store/leads.store";

import AppHeader from "@/components/ui/Header";
import LeadForm from "@/components/forms/LeadForm";

const CreateLeadScreen = () => {
  const router = useRouter();
  const { createLead } = useLeadStore();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createLead(data);
      router.back();
      console.log("Lead created successfully");
    } catch (error) {
      console.log("Error when submit create lead form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="New Lead" showBack />

      <View className="flex-1 px-4 pt-4">
        <LeadForm onSubmit={handleSubmit} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};

export default CreateLeadScreen;