import React from "react";
import { ArrowLeft, Search, Bell } from "lucide-react-native";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface AppHeaderprops {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  onSearch?: () => void;
  rightElement?: React.ReactNode;
  onBack?: () => void;
}

const AppHeader: React.FC<AppHeaderprops> = ({
  title,
  subtitle,
  showBack,
  showSearch,
  showNotification,
  onSearch,
  rightElement,
  onBack,
}) => {
  const router = useRouter();
  // Will get value from notification store
  const unreadCount = 10;

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-300">
      <View className="flex-row items-center gap-3 flex-1">
        {showBack && (
          <TouchableOpacity
            onPress={onBack || (() => router.back())}
            className="bg-gray-100 p-2 rounded-xl"
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}

        <View className="flex-1">
          <Text className="text-gray-800 text-lg font-bold" numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-gray-600 text-xs">{subtitle}</Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        {showSearch && (
          <TouchableOpacity
            onPress={onSearch}
            className="bg-gray-100 p-2 rounded-xl"
            bg-slate-800
            p-2
            rounded-xl
          >
            <Search size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            onPress={() => router.push("/(protected)/notifications")}
            className="bg-gray-100 p-2 rounded-xl relative"
            activeOpacity={0.7}
          >
            <Bell size={20} color="#94A3B8" />
            {unreadCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                <Text className="text-white text-[10px] font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {rightElement}
      </View>
    </View>
  );
};

export default AppHeader;
