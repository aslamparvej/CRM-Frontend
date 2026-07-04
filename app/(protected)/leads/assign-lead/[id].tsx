import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import AppHeader from "@/components/ui/Header";

import { useUserStore } from "@/store/users.store";
import { useLeadStore } from "@/store/leads.store";

const AssignLeadScreen = () => {
  const router = useRouter();
  const { users } = useUserStore();
  const { assignLead } = useLeadStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [assignedTo, setAssignedTo] = useState("");

  const handleAssingTo = async () => {
    try {
      const response = await assignLead(id, assignedTo);
      if(response) {
        router.push("/(protected)/(tabs)/leads");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Assign lead" showBack />

      <View className="flex px-4 py-3">
        <Select
          label="Assign To"
          value={assignedTo}
          options={users.map((user) => ({ value: user._id, label: user.name }))}
          onValueChange={(v) => setAssignedTo(v)}
        />

        <Button label="Assign To" onPress={() => handleAssingTo()} />
      </View>
    </SafeAreaView>
  );
};

export default AssignLeadScreen;
