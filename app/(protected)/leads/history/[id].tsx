import React, { useEffect, useState } from "react";
import { View, StatusBar, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { getHistory } from "@/services/api/lead.api";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import EmptyState from "@/components/ui/EmptyState";
import LeadHistoryList from "@/components/leads/LeadHistoryList";

const LeadHistoryScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadHistory();
  }, [id]);

  const loadHistory = async () => {
    try {
      const res = await getHistory(id);
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Lead History" showBack />

      <View className="px-4 pt-4 flex-1">
        {loading ? (
          <Loader />
        ) : history.length ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <LeadHistoryList history={history} />
          </ScrollView>
        ) : (
          <EmptyState
            title="No History yet"
            description="Changes to this lead will appear here"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LeadHistoryScreen;
