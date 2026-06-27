import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Phone,
  MessageCircle,
  Mail,
  Car,
  Smartphone,
  Clock,
  CheckCircle2,
} from "lucide-react-native";

import { Followup } from "@/types/followup.types";
import { formatDate } from "@/utils/formatDate";

interface FollowupCardProps {
  followup: Followup;
  onComplete: () => void;
  onPress: () => void;
}

const FOLLOWUP_ICONS: Record<string, React.ReactNode> = {
  call: <Phone size={18} />,
  whatsapp: <MessageCircle size={18} />,
  email: <Mail size={18} />,
  visit: <Car size={18} />,
  sms: <Smartphone size={18} />,
};

const FollowupCard: React.FC<FollowupCardProps> = ({
  followup,
  onComplete,
  onPress,
}) => {
  const isOverdue =
    new Date(followup.scheduledAt) < new Date() &&
    followup.status === "pending";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-300"
      activeOpacity={0.85}
    >
      <View className="flex-row items-start gap-3">
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${isOverdue ? "bg-red-500/15" : "bg-indigo-500/15"}`}
        >
          <Text className="text-xl">
            {FOLLOWUP_ICONS[followup.type] || "📋"}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-800 font-bold text-sm">
            {followup.leadName}
          </Text>
          <Text className="text-slate-400 text-xs mt-0.5">
            {followup.leadPhone}
          </Text>
          <View className="flex-row items-center gap-2 mt-1.5">
            <View className="flex-row items-center gap-1">
              <Clock size={11} color={isOverdue ? "#EF4444" : "#64748B"} />
              <Text
                className={`text-xs ${isOverdue ? "text-red-400" : "text-slate-400"}`}
              >
                {formatDate(followup.scheduledAt, "short")}
              </Text>
              <Text
                className={`text-xs ${isOverdue ? "text-red-400" : "text-slate-400"}`}
              >
                {formatDate(followup.scheduledAt, "time")}
              </Text>
            </View>
            <View
              className={`px-2 py-0.5 rounded-full ${followup.status === "completed" ? "bg-emerald-500/20" : isOverdue ? "bg-red-500/20" : "bg-amber-500/20"}`}
            >
              <Text
                className={`text-xs font-semibold ${followup.status === "completed" ? "text-emerald-400" : isOverdue ? "text-red-400" : "text-amber-400"}`}
              >
                {followup.status.charAt(0).toUpperCase() +
                  followup.status.slice(1)}
              </Text>
            </View>
          </View>
          {followup.note && (
            <Text className="text-slate-500 text-xs mt-1" numberOfLines={1}>
              {followup.note}
            </Text>
          )}
        </View>
        {followup.status === "pending" && (
          <TouchableOpacity
            onPress={onComplete}
            className="bg-emerald-500/20 p-2 rounded-xl"
            activeOpacity={0.8}
          >
            <CheckCircle2 size={20} color="#10B981" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FollowupCard;
