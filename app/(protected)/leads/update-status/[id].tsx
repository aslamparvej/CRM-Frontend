import { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useLeadStatusStore } from "@/store/leadStatus.store";
import { useLeadStore } from "@/store/leads.store";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import AppHeader from "@/components/ui/Header";
import { updateStatus } from "@/services/api/lead.api";
import { showSuccess, showError } from "@/utils/toast";

const UpdateStatus = () => {
  const router = useRouter();
  const { fetchLeadById } = useLeadStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const { statuses, loadStatuses } = useLeadStatusStore();
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (statuses.length === 0) {
      loadStatuses();
    }
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const lead = await fetchLeadById(id);
      setNewStatus(lead?.status._id);
    } catch (error: any) {
      console.error(error);
      showError(error.message);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const success = await updateStatus(id, newStatus);
      if (success) {
        showSuccess("Status updated successfully");
        router.push("/(protected)/(tabs)/leads");
      }
    } catch (error:any) {
      console.error("Error updating status:", error);
      showError(error.message || "Error updating status");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Update Lead Status" showBack />

      <View className="flex px-4 py-3">
        <Select
          label="Update Status"
          value={newStatus}
          options={statuses.map((s) => ({
            value: s._id,
            label: s.name,
            color: s.color,
          }))}
          onValueChange={(v) => setNewStatus(v)}
          placeholder="Select status"
        />

        <Button label="Update Status" onPress={() => handleUpdateStatus()} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateStatus;
