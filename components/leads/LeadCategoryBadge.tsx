import React from "react";
import { Text, View } from "react-native";
import getCategoryColor from "@/utils/getCategoryColor";

const LeadCategoryBadge: React.FC<{
  category: string;
  size?: "sm" | "md";
  color?: string;
}> = ({ category, size = "md", color }) => {
  color = color ? color : getCategoryColor(category);
  const label = category
    ? category?.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";
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

export default LeadCategoryBadge;
