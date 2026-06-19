import React from "react";
import { TrendingUp } from "lucide-react-native";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  onPress?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  bgColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-white rounded-2xl p-4 border border-gray-300"
      style={{ width: (width - 48) / 2 }}
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="p-2.5 rounded-xl" style={{ backgroundColor: bgColor }}>
          {icon}
        </View>

        {change !== undefined && (
          <View
            className={`flex-row items-center gap-0.5 px-1.5 py-0.5 rounded-full ${change >= 0 ? "bg-emerald-500/20" : "bg-red-500/20"}`}
          >
            <TrendingUp size={10} color={change >= 0 ? "#10B981" : "#EF4444"} />
            <Text
              className={`text-xs font-semibold ${change >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {Math.abs(change)}%
            </Text>
          </View>
        )}
      </View>

      <Text className="text-gray-600 text-2xl font-bold mb-0.5">{value}</Text>
      <Text className="text=gray-400 text-xs">{title}</Text>
    </TouchableOpacity>
  );
};

export default StatsCard;
