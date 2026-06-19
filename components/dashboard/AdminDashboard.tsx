import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Target, Users, CheckCircle2, Clock } from "lucide-react-native";

import { DashboardProps } from "@/types/dashboard.types";

import StatsCard from "./StatsCard";
import TodayLeads from "./TodayLeads";

const AdminDashboard: React.FC<DashboardProps> = ({
  stats,
  todayLeads,
  onNavigate,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="flex-row flex-wrap gap-3 mb-6">
        <StatsCard
          title="Total Leads"
          value={stats?.totalLeads || 0}
          change={12}
          icon={<Target size={20} color="#6366F1" />}
          color="#6366F1"
          bgColor="rgba(99,102,241,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/leads")}
        />
        <StatsCard
          title="New Leads"
          value={stats?.newLeads || 0}
          change={8}
          icon={<Users size={20} color="#10B981" />}
          color="#10B981"
          bgColor="rgba(16,185,129,0.15)"
        />
        <StatsCard
          title="Closed Won"
          value={stats?.closedLeads || 0}
          change={5}
          icon={<CheckCircle2 size={20} color="#F59E0B" />}
          color="#F59E0B"
          bgColor="rgba(245,158,11,0.15)"
        />
        <StatsCard
          title="Follow-ups"
          value={stats?.pendingFollowups || 0}
          change={-3}
          icon={<Clock size={20} color="#EC4899" />}
          color="#EC4899"
          bgColor="rgba(236,72,153,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/followups")}
        />
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-slate-100 text-base font-bold">
          Today&apos;s Leads
        </Text>
        <TouchableOpacity
          onPress={() => onNavigate("/(protected)/(tabs)/leads")}
        >
          <Text className="text-indigo-400 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>

      <TodayLeads leads={todayLeads} />
    </ScrollView>
  );
};

export default AdminDashboard;
