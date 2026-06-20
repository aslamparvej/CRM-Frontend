import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Phone } from "lucide-react-native";

import { Lead } from "@/types/lead.types";
import getLeadStatusColor from "@/utils/getLeadStatusColor";

import EmptyState from "../ui/EmptyState";

interface TodayLeadsProps {
  leads: Lead[];
}

const TodayLeads: React.FC<TodayLeadsProps> = ({ leads }) => {
  const router = useRouter();

  if (!leads?.length) return <EmptyState title="No leads today yet" />;

  return (
    <View className="gap-3">
      {leads.slice(0, 5).map((lead) => (
        <TouchableOpacity
          key={lead._id}
          onPress={() => router.push(`/(protected)/leads/details/${lead._id}`)}
          className="bg-white rounded-xl p-3.5 border border-gray-300 flex-row items-center gap-3"
          activeOpacity={0.8}
        >
          <View className="flex-1">
            <Text className="text-gray-800 font-semibold text-sm">
              {lead.name}
            </Text>
            <View className="flex-row items-center gap-1 mt-0.5">
              <Phone size={11} color="#64748B" />
              <Text className="text-gray-400 text-xs">{lead.phone}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: `${getLeadStatusColor(lead.status)}20`,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: getLeadStatusColor(lead.status),
                fontSize: 11,
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {lead.status.replace("_", " ")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TodayLeads;
