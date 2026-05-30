import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Edit2, Power, Trash2 } from "lucide-react-native";

import { formatDate } from "@/utils/formatDate";
import { getUser } from "@/services/api/user.api";

import Avatar from "@/components/ui/Avatar";
import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import UserRoleBadge from "@/components/users/UserRoleBadge";

const UserDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(()=>{if (id) load();}, [id]);

  const load = async () => {
    try {
        const response = await getUser(id);
        console.log("User data", response.data);
        setUser(response.data);
    } catch (error: any) {
        console.log("Error fetching user details, ", error);
    }finally {
        setLoading(false)
    }
  }

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row justify-between py-3 border-b border-gray-200">
      <Text className="text-gray-400 text-sm">{label}</Text>
      <Text className="text-gray-500 text-sm font-medium">{value}</Text>
    </View>
  );

  if (loading) return <Loader fullScreen />;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="User Details"
        showBack
        rightElement={
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => router.push(`/(protected)/users/edit/${id}`)}
              className="bg-amber-300 p-2 rounded-xl"
              activeOpacity={0.8}
            >
              <Edit2 size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-2 rounded-xl ${user?.isActive ? "bg-amber-500/15" : "bg-emerald-500/15"}`}
              activeOpacity={0.8}
            >
              <Power size={18} color={user?.isActive ? "#F59E0B" : "#10B981"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDelete(true)}
              className="bg-red-500/15 p-2 rounded-xl"
              activeOpacity={0.8}
            >
              <Trash2 size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <View className="items-center py-6">
          <Avatar name={user.name} uri={user?.avatar} size={76} />
          <Text className="text-gray-800 text-xl font-bold mt-3">
            {user?.name}
          </Text>
          <Text className="text-slate-400 text-sm">{user?.email}</Text>
          <View className="flex-row items-center gap-2 mt-2">
            <UserRoleBadge role={user?.role} />
            <View
              className={`px-2.5 py-1 rounded-full ${user?.isActive ? "bg-emerald-500/20" : "bg-red-500/20"}`}
            >
              <Text
                className={`text-xs font-semibold ${user?.isActive ? "text-emerald-400" : "text-red-400"}`}
              >
                {user?.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row bg-gray-100 rounded-2xl border border-gray-300 mb-6 overflow-hidden">
          {[
            { l: "Total Leads", v: user?.totalLeads || 0 },
            { l: "Closed", v: user?.closedLeads || 0 },
          ].map((s, i) => (
            <View
              key={s.l}
              className={`flex-1 items-center py-4 ${i === 0 ? "border-r border-gray-300" : ""}`}
            >
              <Text className="text-gray-700 text-xl font-bold">{s.v}</Text>
              <Text className="text-slate-800 text-xs">{s.l}</Text>
            </View>
          ))}
        </View>

        <InfoRow label="Phone" value={user?.phone || "N/A"} />
        <InfoRow label="Joined" value={formatDate(user?.createdAt, "long")} />
        <TouchableOpacity
          onPress={() => router.push(`/(protected)/users/roles`)}
          className="mt-4 bg-indigo-500/15 border border-indigo-500/30 py-3 rounded-xl items-center mb-8"
          activeOpacity={0.8}
        >
          <Text className="text-indigo-400 font-semibold">
            Manage Permissions
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* <ConfirmDialog
        visible={showDelete}
        title="Delete User"
        message={`Delete ${user.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        confirmLabel="Delete"
        confirmVariant="danger"
      /> */}
    </SafeAreaView>
  );
};

export default UserDetailsScreen;
