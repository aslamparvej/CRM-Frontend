import React from "react";
import { useRouter } from "expo-router";
import { CheckCircle2, Clock } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

import { Followup } from "@/types/followup.types";
import { formatDate } from "@/utils/formatDate";

interface TodayFollowupsProps {
  followups: Followup[];
  onComplete?: (id: string) => void;
}

const FOLLOWUP_STATUS_COLOR: Record<Followup["status"], string> = {
    pending: "#F59E0B",
    completed: "#10B981",
    missed: "#EF4444",
    rescheduled: ""
};

const FOLLOWUP_TYPE_ICONS: Record<Followup['type'], string> = {
  call: '📞',
  whatsapp: '💬',
  email: '📧',
  visit: '📅',
  sms: '',
};

const TodayFollowups: React.FC<TodayFollowupsProps> = ({
  followups,
  onComplete,
}) => {
  const router = useRouter();

  console.log(followups);

  if (!followups.length) {
    return (
      <View className="bg-gray-50 rounded-2xl p-6 border border-gray-300 items-center">
        <Text className="text-slate-400 text-sm">No follow-ups today yet</Text>
      </View>
    );
  }
  return (
    <View className="gap-3">
      {followups.slice(0, 5).map((followup) => {
        const isOverdue =
          followup.status === "pending" &&
          new Date(`${followup.scheduledAt}T${followup.scheduledAt}`) < new Date();
        const statusColor = isOverdue
          ? "#EF4444"
          : FOLLOWUP_STATUS_COLOR[followup.status];

        return (
          <TouchableOpacity
            key={followup.id}
            onPress={() =>
              router.push(`/(protected)/leads/details/${followup.leadId}`)
            }
            className="bg-white rounded-xl p-3.5 border border-gray-300 flex-row items-center gap-3"
            activeOpacity={0.8}
          >
            <View
              className={`w-11 h-11 rounded-xl items-center justify-center ${isOverdue ? "bg-red-500/15" : "bg-indigo-500/15"}`}
            >
              <Text className="text-lg">
                {FOLLOWUP_TYPE_ICONS[followup.type] || "📋"}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-semibold text-sm">
                {followup.leadName}
              </Text>
              <View className="flex-row items-center gap-1 mt-0.5">
                <Clock size={11} color={isOverdue ? "#EF4444" : "#64748B"} />
                <Text
                  className={`text-xs ${isOverdue ? "text-red-400" : "text-slate-400"}`}
                >
                  {isOverdue ? "Overdue · " : ""}
                  {formatDate(followup.scheduledAt, "time")}
                  &nbsp;&nbsp;
                  {formatDate(followup.scheduledAt, "short")}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: `${statusColor}20`,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: statusColor,
                  fontSize: 11,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {isOverdue ? "Overdue" : followup.status}
              </Text>
            </View>
            {followup.status === "pending" && onComplete && (
              <TouchableOpacity
                onPress={() => onComplete(followup.id)}
                className="bg-emerald-500/20 p-2 rounded-xl ml-1"
                activeOpacity={0.8}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <CheckCircle2 size={18} color="#10B981" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TodayFollowups;
