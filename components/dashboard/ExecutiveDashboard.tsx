import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Users, Target } from "lucide-react-native";

import { DashboardProps } from "@/types/dashboard.types";

import StatsCard from "./StatsCard";
import TodayLeads from "./TodayLeads";

const ExecutiveDashboard: React.FC<DashboardProps> = ({
  stats,
  todayLeads,
  onNavigate,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
        <Text className="text-slate-400 text-xs mb-1">Conversion Rate</Text>
        <Text className="text-slate-100 text-3xl font-bold">
          {stats?.conversionRate || 0}%
        </Text>
        <View className="mt-3 bg-slate-700 h-2 rounded-full overflow-hidden">
          <View
            className="bg-indigo-500 h-full rounded-full"
            style={{ width: `${stats?.conversionRate || 0}%` }}
          />
        </View>
      </View>
      <View className="flex-row flex-wrap gap-3 mb-6">
        <StatsCard
          title="My Leads"
          value={stats?.totalLeads || 0}
          icon={<Target size={20} color="#6366F1" />}
          color="#6366F1"
          bgColor="rgba(99,102,241,0.15)"
          onPress={() => onNavigate("/(protected)/(tabs)/leads")}
        />
        <StatsCard
          title="Today's Leads"
          value={stats?.todayLeads || 0}
          icon={<Users size={20} color="#10B981" />}
          color="#10B981"
          bgColor="rgba(16,185,129,0.15)"
        />
      </View>
      <TodayLeads leads={todayLeads} />
    </ScrollView>
  );
};

export default ExecutiveDashboard;
