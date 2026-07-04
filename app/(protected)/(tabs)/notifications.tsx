import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Bell } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";
import { useNotificationStore } from "@/store/notification.store";

import AppHeader from "@/components/ui/Header";
import NotifItem from "@/components/notification/NotifItem";
import Loader from "@/components/ui/Loader";
import { initializeNotifications } from "@/services/notifications/notification";

const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
    removeNotification,
    isLoading,
  } = useNotificationStore();



  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await initializeNotifications();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  // Memorize the unread and read notifications
  const unread = useMemo(
    () => notifications.filter((n) => !n.readAt),
    [notifications],
  );
  const read = useMemo(
    () => notifications.filter((n) => n.readAt),
    [notifications],
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="Notifications"
        rightElement={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={() => markAllAsRead()}>
              <Text className="text-indigo-400 text-sm font-semibold">
                Mark all read
              </Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {unreadCount === 0 && notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center py-24">
            <Bell size={48} color={COLORS.textMuted} />
            <Text className="text-slate-400 text-base mt-4">
              No notifications
            </Text>
          </View>
        ) : (
          <>
            {unread.length > 0 && (
              <>
                <View className="px-4 py-2 flex-row items-center justify-between">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                    New
                  </Text>
                  <View className="bg-indigo-600 rounded-full px-2 py-0.5">
                    <Text className="text-white text-xs font-bold">
                      {unread.length}
                    </Text>
                  </View>
                </View>
                {unread.map((notif) => (
                  <NotifItem
                    key={notif._id}
                    notif={notif}
                    onPress={() => markAsRead(notif._id)}
                    onDelete={() => removeNotification(notif._id)}
                  />
                ))}
              </>
            )}

            {read.length > 0 && (
              <>
                <View className="px-4 py-2">
                  <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                    Earlier
                  </Text>
                </View>
                {read.map((notif) => (
                  <NotifItem
                    key={notif._id}
                    notif={notif}
                    onPress={() => {}}
                    onDelete={() => removeNotification(notif._id)}
                  />
                ))}
              </>
            )}
          </>
        )}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
