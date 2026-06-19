import React from "react";
import { View, Text } from "react-native";

import { LeadHistory } from "@/types/lead.types";
import ACTION_CONFIG from "@/constants/actions";

import Avatar from "../ui/Avatar";

const LeadHistoryList: React.FC<{ history: LeadHistory[] }> = ({ history }) => {
  const formatDateAsLocal = (val: string): string => {
    const date = new Date(val);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeAsLocal = (val: string): string => {
    const date = new Date(val);
    return date.toLocaleTimeString("en-IN");
  };

  return (
    <View className="">
      {history.map((item, index) => {
        const config =
          ACTION_CONFIG[
            item.action.toUpperCase() as keyof typeof ACTION_CONFIG
          ] || ACTION_CONFIG.NOTE_ADDED;

        const Icon = config.icon;
        return (
          <View key={item._id} className="flex-row gap-4">
            {/* Timeline */}
            <View className="items-center">
              {/* Circle */}
              <View
                style={{ backgroundColor: config.bg }}
                className="w-10 h-10 rounded-full items-center justify-center"
              >
                <Icon size={18} color={config.color} strokeWidth={2.5} />
              </View>

              {/* Line */}
              {index !== history.length - 1 && (
                <View className="w-[2px] flex-1 bg-gray-300" />
              )}
            </View>

            {/* Content */}
            <View className="flex-1 pb-10">
              {/* Date & Time */}
              <View className="flex-row flex-wrap items-center gap-2">
                <Text className="text-base font-bold text-gray-900">
                  {formatDateAsLocal(item.createdAt)}
                </Text>

                <Text className="text-base text-gray-600">
                  {formatTimeAsLocal(item.createdAt)}
                </Text>
              </View>

              {/* Action */}
              <Text className="mt-3 text-lg font-semibold text-gray-800">
                {item.action.replaceAll("_", " ")}
              </Text>

              {/* User */}
              <View className="mt-4 flex-row items-center gap-2">
                <Avatar name={item.changedBy?.name || "Unknown"} size={26} />

                <Text className="text-sm text-gray-700">
                  by{" "}
                  <Text className="font-semibold">
                    {item.changedBy?.name || "Unknown User"}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LeadHistoryList;
