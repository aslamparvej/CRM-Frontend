import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/auth.store";
import { useDashboardStore } from "@/store/dashboard.store";
import { getDashboardOverview, getTodayLeads } from "@/services/api/dashboard.api";

import Avatar from "@/components/ui/Avatar";
import Loader from "@/components/ui/Loader";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SubAdminDashboard from "@/components/dashboard/SubAdminDashboard";
import ExecutiveDashboard from "@/components/dashboard/ExecutiveDashboard";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { stats, isLoading, setStats, setLoading, setError } =
    useDashboardStore();

  const [todayLeads, setTodayLeads] = useState([]);
  const [todayFollowups, setTodayFollowups] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboardOverview();
      setStats(res.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    loadTodayLeads();
  }, []);

  const loadTodayLeads = async ()=> {
    try {
      setLoading(true);
      const res = await getTodayLeads();
      setTodayLeads(res.data.todayLeads);
      setTodayFollowups(res.data.todayFollowUps);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const getGreeting = () => {
    const h = new Date().getHours();

    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";

    return "Good Evening";
  };

  const DashboardComponent =
    user?.role === "admin"
      ? AdminDashboard
      : user?.role === "sub_admin"
        ? SubAdminDashboard
        : ExecutiveDashboard;

  return (
    <SafeAreaView className="flex-1 bg-gray-100" >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-300 bg-white">
        <View>
          <Text className="text-gray-600 text-sm">{getGreeting()},</Text>
          <Text className="text-gray-800 text-xl font-black">{user?.name}</Text>
        </View>
        <Avatar name={user?.name} size={42} />
      </View>

      <View className="flex-1 px-4 pt-4">
        {isLoading && !stats ? (
          <Loader text="Loading Dashboard" />
        ) : (
          <DashboardComponent
          
            stats={stats}
            todayLeads={todayLeads}
            todayFollowups={todayFollowups}
            onNavigate={(path: string) => router.push(path as any)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
