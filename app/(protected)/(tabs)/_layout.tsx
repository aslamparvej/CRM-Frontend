import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ClipboardList,
  BellRing,
  Bell,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/auth.store";
import { useNotificationStore } from "@/store/notification.store";

const TabsLayout = () => {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();

  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#EEB30D",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "400",
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="users"
        options={{
          href: user?.role === "executive" ? null : undefined,
          title: "Users",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="leads"
        options={{
          title: "Leads",
          tabBarIcon: ({ color, size }) => (
            <ClipboardList color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="followups"
        options={{
          title: "Followups",
          tabBarIcon: ({ color, size }) => (
            <BellRing color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserCircle color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
