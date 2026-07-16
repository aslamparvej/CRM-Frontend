import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Users, Target, Bell, BellDot } from "lucide-react-native";

import { DashboardProps } from "@/types/dashboard.types";

import StatsCard from "./StatsCard";
import TodayLeads from "./TodayLeads";
import TodayFollowups from "./TodayFollowups";
import StatusBreakdownChart from "./StatusBreakdownChart";

const ExecutiveDashboard: React.FC<DashboardProps> = ({
  stats,
  todayLeads,
  todayFollowups,
  onNavigate,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="bg-white rounded-2xl p-4 border border-gray-300 mb-6">
        <Text className="text-gray-800 text-xs mb-1">Conversion Rate</Text>
        <Text className="text-gray-900 text-3xl font-bold">
          {stats?.conversionRate || 0}%
        </Text>
        <View className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
          <View
            className="bg-amber-500 h-full rounded-full"
            style={{ width: `${stats?.conversionRate || 0}%` }}
          />
        </View>
      </View>

      <View className="flex-row flex-wrap gap-3 mb-6">
        <StatsCard
          title="Today's Follow-ups"
          value={stats?.todayFollowups || 0}
          icon={<BellDot size={21} color="#6366F1" />}
          color="#6366F1"
          bgColor="rgba(99,102,241,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/leads")}
        />
        <StatsCard
          title="Today's Leads"
          value={stats?.todayLeads || 0}
          icon={<Target size={20} color="#6366F1" />}
          color="#10B981"
          bgColor="rgba(16,185,129,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/leads")}
        />
        <StatsCard
          title="Active Follow-ups"
          value={stats?.totalFollowups || 0}
          icon={<Bell size={20} color="#10B981" />}
          color="#10B981"
          bgColor="rgba(16,185,129,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/followups")}
        />

        <StatsCard
          title="Total Leads"
          value={stats?.totalLeads || 0}
          icon={<Users size={20} color="#10B981" />}
          color="#10B981"
          bgColor="rgba(16,185,129,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/followups")}
        />
      </View>

      {/* Status Breakdown Pie Chart */}
      <StatusBreakdownChart statusBreakDown={stats?.statusBreakdown} />

      <View className="my-4 flex-row items-center justify-between">
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

      <View className="mt-8 flex-row items-center justify-between">
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
    </ScrollView>
  );
};

export default ExecutiveDashboard;
