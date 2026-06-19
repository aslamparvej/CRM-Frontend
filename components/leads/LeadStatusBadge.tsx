import React from "react";
import { Text, View } from "react-native";

import getLeadStatusColor from "@/utils/getLeadStatusColor";

const LeadStatusBadge: React.FC<{ status: string; size?: "sm" | "md" }> = ({
  status,
  size = "md",
}) => {
  const color = getLeadStatusColor(status);
  const label = status ? status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";
  return (
    <View
      style={{
        backgroundColor: `${color}20`,
        paddingHorizontal: size === "sm" ? 6 : 8,
        paddingVertical: size === "sm" ? 2 : 4,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          color,
          fontSize: size === "sm" ? 10 : 11,
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default LeadStatusBadge;
