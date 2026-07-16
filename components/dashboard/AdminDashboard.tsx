import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Target,
  Users,
  CheckCircle2,
  Clock,
  LucideUserSquare2,
} from "lucide-react-native";

import { DashboardProps } from "@/types/dashboard.types";

import StatsCard from "./StatsCard";
import TodayLeads from "./TodayLeads";
import TodayFollowups from "./TodayFollowups";
import StatusBreakdownChart from "./StatusBreakdownChart";

const AdminDashboard: React.FC<DashboardProps> = ({
  stats,
  todayLeads,
  todayFollowups,
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
          value={stats?.todayLeads || 0}
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
        <StatsCard
          title="Sub Admin"
          value={stats?.subAdminCount || 0}
          change={0}
          icon={<LucideUserSquare2 size={20} color="#8B5CF6" />}
          color="#8B5CF6"
          bgColor="rgba(139,92,246,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/users")}
        />
        <StatsCard
          title="Executive"
          value={stats?.executiveCount || 0}
          change={0}
          icon={<Clock size={20} color="#06B6D4" />}
          color="#06B6D4"
          bgColor="rgba(6,182,212,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/users")}
        />
      </View>

      {/* Status Breakdown Pie Chart */}
      <StatusBreakdownChart statusBreakDown={stats?.statusBreakdown} />

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-gray-600 text-base font-bold">
          Today&apos;s Leads
        </Text>
        <TouchableOpacity
          onPress={() => onNavigate("/(protected)/(tabs)/leads")}
        >
          <Text className="text-indigo-400 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>
      <TodayLeads leads={todayLeads} />

      <View className="mb-4 flex-row items-center justify-between mt-8">
        <Text className="text-gray-600 text-base font-bold">
          Today&apos;s Follow-Ups
        </Text>
        <TouchableOpacity
          onPress={() => onNavigate("/(protected)/(tabs)/followups")}
        >
          <Text className="text-indigo-400 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>

      <TodayFollowups followups={todayFollowups} />
    </ScrollView>
  );
};

export default AdminDashboard;
