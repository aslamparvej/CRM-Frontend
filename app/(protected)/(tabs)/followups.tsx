import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react-native";

import { useFollowupStore } from "@/store/followup.store";
import { getFollowups, completeFollowup } from "@/services/api/followups.api";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import EmptyState from "@/components/ui/EmptyState";
import FollowupCard from "@/components/followups/FollowupCard";
import { showError, showSuccess } from "@/utils/toast";

type FilterType = "all" | "pending" | "completed" | "rescheduled";

export default function FollowupsPage() {
  const router = useRouter();
  const { followups, isLoading, setFollowups, setLoading, updateFollowup } =
    useFollowupStore();

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    loadFollowups();
  }, [activeFilter]);

  const loadFollowups = async () => {
    try {
      setLoading(true);
      const response = await getFollowups({
        status: activeFilter === "all" ? undefined : activeFilter,
      });

      setFollowups(response.data);
    } catch (error) {
      console.log("Error in followup screen", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const response = await completeFollowup(id);
      console.log(response);
      if (response.success) {
        updateFollowup(id, { status: "completed" });
        showSuccess(response.message);
      }
    } catch (error: any) {
      console.log("Error to mark done", error.message);
      showError(error.message || "Error to mark done");
    }
  };

  const filters: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    {
      key: "all",
      label: "All",
      icon: (
        <Clock size={13} color={activeFilter === "all" ? "#000" : "#000"} />
      ),
    },
    {
      key: "pending",
      label: "Pending",
      icon: (
        <AlertCircle
          size={13}
          color={activeFilter === "pending" ? "#F59E0B" : "#000"}
        />
      ),
    },
    {
      key: "rescheduled",
      label: "Rescheduled",
      icon: (
        <AlertCircle
          size={13}
          color={activeFilter === "rescheduled" ? "#EF4444" : "#000"}
        />
      ),
    },
    {
      key: "completed",
      label: "Completed",
      icon: (
        <CheckCircle2
          size={13}
          color={activeFilter === "completed" ? "#10B981" : "#000"}
        />
      ),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="Follow-ups"
        subtitle="Manage follow-up leads"
        showSearch
      />
      <View className="flex-row gap-2 p-2">
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setActiveFilter(f.key)}
            className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border ${activeFilter === f.key ? "border-primary-color bg-primary-color" : "border-gray-300 bg-transparent"}`}
            activeOpacity={0.8}
          >
            {f.icon}
            <Text
              className={`text-xs font-semibold ${activeFilter === f.key ? "text-gray-800" : "text-gray-800"}`}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={followups}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <FollowupCard
              followup={item}
              onComplete={() => handleComplete(item.id)}
              onPress={() =>
                router.push(`/(protected)/followup/details/${item.id}`)
              }
            />
          )}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onRefresh={loadFollowups}
          refreshing={isLoading}
          ListEmptyComponent={
            <EmptyState
              title="No follow-ups"
              description="Your scheduled follow-ups will appear here"
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
