import React from "react";
import { View, Text } from "react-native";
import { Smartphone, Apple, Globe, Circle } from "lucide-react-native";

import { formatDate } from "@/utils/formatDate";
import { Activity } from "@/types/activity.types";
import {
  getActivityColor,
  getActivityIcon,
  formatAction,
} from "@/utils/activity";

import MetadataRenderer from "@/components/activity/MetadataRenderer";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const color = getActivityColor(activity);
  return (
    <View className="flex-row">
      {/* Timeline */}
      <View className="items-center mr-4">
        <View
          className="h-11 w-11 rounded-full items-center justify-center"
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          {getActivityIcon(activity)}
        </View>
        <View className="flex-1 w-[2px] bg-slate-200 mt-2" />
      </View>

      <View className="flex-1 mb-5 rounded-2xl bg-white border border-slate-200 p-4">
        {/* Header */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-base font-semibold text-slate-900">
              {formatAction(activity.action)}
            </Text>

            {!!activity.targetName && (
              <Text
                numberOfLines={1}
                className="mt-1 text-sm font-medium text-slate-700"
              >
                {activity.targetName}
              </Text>
            )}
          </View>

          <View
            className="rounded-full px-2.5 py-1"
            style={{
              backgroundColor: `${color}15`,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color,
              }}
            >
              {activity.module}
            </Text>
          </View>
        </View>

        {/* Description */}
        {!!activity.description && (
          <Text className="mt-3 text-sm leading-6 text-slate-500">
            {activity.description}
          </Text>
        )}

        {!!activity.metadata && <MetadataRenderer activity={activity} />}

        {/* Footer */}
        <View className="mt-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            {activity.platform === "android" && (
              <Smartphone size={14} color="#16A34A" />
            )}
            {activity.platform === "ios" && <Apple size={14} color="#111827" />}
            {activity.platform === "web" && <Globe size={14} color="#2563EB" />}
            {!activity.platform && <Circle size={14} color="#94A3B8" />}

            <Text className="ml-2 text-xs capitalize text-slate-500">
              {activity.platform}
            </Text>
          </View>

          <Text className="text-xs text-slate-400">
            {formatDate(activity.createdAt, "relative")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
