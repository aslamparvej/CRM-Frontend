import React from "react";
import { View, Text } from "react-native";

import { DashboardProps } from "@/types/dashboard.types";

import AdminDashboard from "./AdminDashboard";

const SubAdminDashboard: React.FC<DashboardProps> = ({
  stats,
  todayLeads,
  onNavigate,
}) => {
  return (
    <AdminDashboard
      stats={stats}
      todayLeads={todayLeads}
      onNavigate={onNavigate}
    />
  );
};

export default SubAdminDashboard;
