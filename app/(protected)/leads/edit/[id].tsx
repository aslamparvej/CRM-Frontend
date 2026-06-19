import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Lead } from "@/types/lead.types";
import { getLeadById, updateLead } from "@/services/api/lead.api";

import LeadForm from "@/components/forms/LeadForm";
import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";

const EditLeadScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (id) fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await getLeadById(id);
      setLead(response.data);
      console.log(lead);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { data: res } = await updateLead(id!, data);
      console.log(res);
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Edit Lead" showBack />
      <View className="flex-1 px-4 pt-4">
        {fetchLoading ? (
          <Loader />
        ) : (
          <LeadForm
            initialData={lead || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditLeadScreen;
