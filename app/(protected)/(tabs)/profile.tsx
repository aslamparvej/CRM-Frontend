import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch
} from "react-native";

import { useAuthStore } from "@/store/auth.store";

const initials = (name?: string) =>
  (name ?? "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

type IconVariant = "purple" | "blue" | "green" | "red";

const RowIcon = ({
  emoji,
  variant = "purple",
}: {
  emoji: string;
  variant?: IconVariant;
}) => {
  const bg: Record<IconVariant, string> = {
    purple: "bg-violet-50",
    blue: "bg-blue-50",
    green: "bg-emerald-50",
    red: "bg-red-50",
  };
  return (
    <View
      className={`w-8 h-8 rounded-[9px] items-center justify-center mr-3 ${bg[variant]}`}
    >
      <Text className="text-sm">{emoji}</Text>
    </View>
  );
};

const stats = [
  { label: "Leads", value: 248, color: "text-violet-700" },
  { label: "Converted", value: 61, color: "text-emerald-600" },
  { label: "Agents", value: 12, color: "text-blue-600" },
];

const Row = ({
  emoji,
  label,
  value,
  onPress,
  danger,
  right,
  iconVariant,
}: {
  emoji: string;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
  iconVariant?: IconVariant;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={onPress ? 0.5 : 1}
    className="flex-row items-center px-3.5 py-3 bg-white border-b border-zinc-100"
  >
    <RowIcon emoji={emoji} variant={iconVariant} />
    <Text
      className={`flex-1 text-[13px] font-medium ${danger ? "text-red-500" : "text-zinc-800"}`}
    >
      {label}
    </Text>
    {value && <Text className="text-[12px] text-zinc-400 mr-1">{value}</Text>}
    {right}
    {onPress && !right && <Text className="text-zinc-300 text-base">›</Text>}
  </TouchableOpacity>
);

const SectionLabel = ({ title }: { title: string }) => (
  <Text className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase px-4 pt-4 pb-2">
    {title}
  </Text>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <View className="mx-4 rounded-[14px] overflow-hidden border border-zinc-100">
    {children}
  </View>
);

export default function Profile({ navigation }: { navigation?: any }) {
  const { user, logout } = useAuthStore();
  const [notifications, setNotifications] = useState(true);

  const handleLogOut = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.log("Error in logout handler", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Hero ── */}
        <View className="bg-white px-4 pt-4 pb-6 border-b border-zinc-100">
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              className="w-9 h-9 rounded-[10px] bg-zinc-100 items-center justify-center"
            >
              <Text className="text-zinc-500 text-lg">‹</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation?.navigate("EditProfile")}
              className="bg-amber-50 border border-primary-color px-3.5 py-2 rounded-[10px]"
            >
              <Text className="text-primary-color text-xs font-semibold">
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-center gap-2.5">
            <View className="relative">
              <View className="w-[76px] h-[76px] rounded-[22px] bg-amber-50 border-2 border-primary-color items-center justify-center">
                <Text className="text-primary-color text-3xl font-bold">
                  {initials(user?.name)}
                </Text>
              </View>
              {user?.isActive && (
                <View className="absolute bottom-[-3px] right-[-3px] w-3.5 h-3.5 rounded-full bg-emerald-500 border-[2.5px] border-white" />
              )}
            </View>

            <View className="items-center">
              <Text className="text-zinc-900 text-[18px] font-bold">
                {user?.name}
              </Text>
              <Text className="text-zinc-400 text-xs mt-0.5">
                {user?.email}
              </Text>
              <View className="flex-row gap-1.5 mt-2">
                <View className="bg-violet-50 border border-violet-200 rounded-full px-2.5 py-[3px]">
                  <Text className="text-violet-700 text-[10px] font-semibold capitalize">
                    {user?.role}
                  </Text>
                </View>
                <View className="bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-[3px]">
                  <Text className="text-emerald-700 text-[10px] font-semibold">
                    ● Active
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ── Stats ── */}
        <View className="flex-row gap-2 mx-4 mt-4">
          {stats.map((s) => (
            <View
              key={s.label}
              className="flex-1 bg-white rounded-[14px] border border-zinc-100 px-3 py-3.5 items-center"
            >
              <Text className={`text-[22px] font-bold ${s.color}`}>
                {s.value}
              </Text>
              <Text className="text-zinc-400 text-[10px] mt-0.5 font-medium">
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Account ── */}
        <SectionLabel title="Account" />
        <Card>
          <Row emoji="👤" label="Full name" value={user?.name} />
          <Row emoji="📧" label="Email" value="aslamparvej2@…" />
          <Row emoji="🛡️" label="Role" value={user?.role} />
          <Row
            emoji="📅"
            label="Member since"
            value={fmtDate(user?.createdAt)}
          />
          <Row
            emoji="🔑"
            label="User ID"
            right={
              <View className="bg-zinc-100 rounded-md px-2 py-0.5">
                <Text className="text-zinc-400 text-[10px] font-mono">
                  …{user?._id.slice(-6)}
                </Text>
              </View>
            }
          />
        </Card>

        {/* ── Admin Tools ── */}
        <SectionLabel title="Admin tools" />
        <Card>
          <Row
            emoji="👥"
            label="Manage sub-admins"
            iconVariant="blue"
            onPress={() => navigation?.navigate("SubAdmins")}
          />
          <Row
            emoji="🧑‍💼"
            label="Manage agents"
            iconVariant="blue"
            onPress={() => navigation?.navigate("Agents")}
          />
          <Row
            emoji="📊"
            label="View reports"
            iconVariant="green"
            onPress={() => navigation?.navigate("Reports")}
          />
          <Row
            emoji="⚙️"
            label="System settings"
            onPress={() => navigation?.navigate("Settings")}
          />
        </Card>

        {/* ── Security ── */}
        <SectionLabel title="Security" />
        <Card>
          <Row
            emoji="🔒"
            label="Change password"
            onPress={() => navigation?.navigate("ChangePassword")}
          />
          <Row
            emoji="📱"
            label="Two-factor auth"
            value="On"
            iconVariant="green"
            onPress={() => navigation?.navigate("TwoFactor")}
          />
        </Card>

        {/* ── Preferences ── */}
        <SectionLabel title="Preferences" />
        <Card>
          <Row
            emoji="🔔"
            label="Push notifications"
            right={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#e4e4e7", true: "#7c3aed" }}
                thumbColor="#ffffff"
              />
            }
          />
          <Row emoji="🌐" label="Language"   value="English" onPress={() => Alert.alert("Language")} />
          <Row emoji="☀️" label="Appearance" value="Light"   onPress={() => Alert.alert("Appearance")} />
        </Card>

         {/* ── Support ── */}
        <SectionLabel title="Support" />
        <Card>
          <Row emoji="❓" label="Help & FAQ"      onPress={() => Alert.alert("Help")} />
          <Row emoji="📄" label="Terms & Privacy" onPress={() => Alert.alert("Terms")} />
          <Row emoji="ℹ️" label="App version"     value="v1.0.0" />
        </Card>

        {/* ── Logout ── */}
        <View className="mx-4 mt-4 rounded-[14px] overflow-hidden border border-red-100">
          <Row
            emoji="🚪"
            label="Log out"
            danger
            iconVariant="red"
            onPress={() =>
              Alert.alert("Log out", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log out",
                  style: "destructive",
                  onPress: () => handleLogOut(),
                },
              ])
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
