import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Mail, Shield } from "lucide-react-native";

import { User } from "@/types/user.types";
import { ROLE_LABELS } from "@/constants/roles";

import Avatar from "../ui/Avatar";

interface UserCardProps {
  user: User;
  onPress: () => void;
  onEdit?: () => void;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onPress,
  onEdit,
  onDelete,
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-50 rounded-2xl p-4 mb-3 border border-slate-300"
      activeOpacity={0.85}
    >
      <View className="flex-row items-center gap-3">
        <Avatar name={user.name} uri={user.avatar} size={50} />

        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-gray-800 font-bold text-base">
              {user.name}
            </Text>
            <View
              className={`px-2 py-0.5 rounded-full ${user.isActive ? "bg-emerald-500/20" : "bg-red-500/20"}`}
            >
              <Text
                className={`text-xs font-semibold ${user.isActive ? "text-emerald-400" : "text-red-400"}`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1 mt-0.5">
            <Mail size={12} color="#64748B" />
            <Text className="text-slate-400 text-xs">{user.email}</Text>
          </View>
          <View className="flex-row items-center gap-2 mt-1.5">
            <View className="flex-row items-center gap-1 bg-indigo-500/15 px-2 py-0.5 rounded-full">
              <Shield size={10} color="#818CF8" />
              <Text className="text-indigo-400 text-xs font-medium">
                {ROLE_LABELS[user.role]}
              </Text>
            </View>
            {user.totalLeads !== undefined && (
              <Text className="text-slate-500 text-xs">
                {user.totalLeads} leads
              </Text>
            )}
            {(user.role === "sub-admin") && user.totalUsers !== undefined && (
              <Text className="text-slate-500 text-xs">
                {user.totalUsers} users
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
