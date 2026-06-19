import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import {
  CheckCircle,
  Clock,
  MessageCircle,
  AlertCircle,
  UserPlus,
  Trash2,
  Bell
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";

import AppHeader from "@/components/ui/Header";

type NotifType = "lead" | "followup" | "message" | "system" | "user";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "lead",
    title: "New Lead Assigned",
    body: "Vikram Nair has been assigned to you",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "followup",
    title: "Follow-up Due",
    body: "Call with Priya Patel is due now",
    time: "10m ago",
    read: false,
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    body: "WhatsApp reply from Arun Kumar",
    time: "1h ago",
    read: false,
  },
  {
    id: "4",
    type: "system",
    title: "System Update",
    body: "App updated to version 2.1.0",
    time: "3h ago",
    read: true,
  },
  {
    id: "5",
    type: "lead",
    title: "Lead Status Changed",
    body: "Deepa Menon moved to Negotiation",
    time: "5h ago",
    read: true,
  },
  {
    id: "6",
    type: "user",
    title: "New Agent Added",
    body: "Karan Mehta joined your team",
    time: "1d ago",
    read: true,
  },
  {
    id: "7",
    type: "followup",
    title: "Follow-up Overdue",
    body: "Missed follow-up with Suresh Babu",
    time: "2d ago",
    read: true,
  },
  {
    id: "8",
    type: "lead",
    title: "Lead Converted",
    body: "Ananya Singh converted successfully",
    time: "3d ago",
    read: true,
  },
];

const typeConfig: Record<NotifType, { icon: any; color: string; bg: string }> =
  {
    lead: { icon: CheckCircle, color: "#6366F1", bg: "bg-indigo-500/20" },
    followup: { icon: Clock, color: "#F59E0B", bg: "bg-amber-500/20" },
    message: { icon: MessageCircle, color: "#10B981", bg: "bg-emerald-500/20" },
    system: { icon: AlertCircle, color: "#3B82F6", bg: "bg-blue-500/20" },
    user: { icon: UserPlus, color: "#EC4899", bg: "bg-pink-500/20" },
  };

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="Notifications"
        rightElement={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllRead}>
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
                    key={notif.id}
                    notif={notif}
                    onPress={() => markRead(notif.id)}
                    onDelete={() => deleteNotif(notif.id)}
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
                    key={notif.id}
                    notif={notif}
                    onPress={() => {}}
                    onDelete={() => deleteNotif(notif.id)}
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

function NotifItem({
  notif,
  onPress,
  onDelete,
}: {
  notif: Notification;
  onPress: () => void;
  onDelete: () => void;
}) {
  const config = typeConfig[notif.type];
  const Icon = config.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-start px-4 py-4 border-b border-gray-300 ${
        !notif.read ? "bg-gray-400/60" : "bg-white"
      }`}
      activeOpacity={0.7}
    >
      <View className={`${config.bg} p-2.5 rounded-xl mr-3 mt-0.5`}>
        <Icon size={18} color={config.color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className={`font-semibold text-sm ${!notif.read ? "text-gray-700" : "text-gray-600"}`}
          >
            {notif.title}
          </Text>
          {!notif.read && (
            <View className="w-2 h-2 rounded-full bg-indigo-500 ml-2" />
          )}
        </View>
        <Text className="text-slate-400 text-sm mt-0.5">{notif.body}</Text>
        <Text className="text-slate-600 text-xs mt-1">{notif.time}</Text>
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
}
