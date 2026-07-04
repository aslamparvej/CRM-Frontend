import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  CheckCircle,
  Clock,
  MessageCircle,
  AlertCircle,
  UserPlus,
  Trash2,
} from "lucide-react-native";

import { COLORS } from "@/constants/colors";
import { formatDate } from "@/utils/formatDate";
import { Notification } from "@/types/notification.types";

type NotifType = "lead-assigned" | "followup" | "message" | "system" | "user";
const typeConfig: Record<NotifType, { icon: any; color: string; bg: string }> =
  {
    "lead-assigned": {
      icon: CheckCircle,
      color: "#6366F1",
      bg: "bg-indigo-500/20",
    },
    followup: { icon: Clock, color: "#F59E0B", bg: "bg-amber-500/20" },
    message: { icon: MessageCircle, color: "#10B981", bg: "bg-emerald-500/20" },
    system: { icon: AlertCircle, color: "#3B82F6", bg: "bg-blue-500/20" },
    user: { icon: UserPlus, color: "#EC4899", bg: "bg-pink-500/20" },
  };

const NotifItem = ({
  notif,
  onPress,
  onDelete,
}: {
  notif: Notification;
  onPress: () => void;
  onDelete: () => void;
}) => {
  const config = typeConfig[notif.type];
  const Icon = config.icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-start px-4 py-4 border-b border-gray-300 ${
        !notif.readAt ? "bg-gray-400/60" : "bg-white"
      }`}
      activeOpacity={0.7}
    >
      <View className={`${config.bg} p-2.5 rounded-xl mr-3 mt-0.5`}>
        <Icon size={18} color={config.color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className={`font-semibold text-sm ${!notif.readAt ? "text-gray-700" : "text-gray-600"}`}
          >
            {notif.title}
          </Text>
          {!notif.readAt && (
            <View className="w-2 h-2 rounded-full bg-indigo-500 ml-2" />
          )}
        </View>
        <Text className="text-slate-400 text-sm mt-0.5">{notif.message}</Text>
        <Text className="text-slate-600 text-xs mt-1">
          {formatDate(notif.createdAt, "relative")}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onDelete}
        className="ml-2 p-1"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Trash2 size={14} color={COLORS.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotifItem;
