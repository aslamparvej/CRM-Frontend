import React from "react";
import { View, Text } from "react-native";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  size = "md",
  dot,
  color,
}) => {
  const variants: Record<
    BadgeVariant,
    { bg: string; text: string; dot: string }
  > = {
    default: {
      bg: "bg-slate-700",
      text: "text-slate-300",
      dot: "bg-slate-400",
    },
    success: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    warning: {
      bg: "bg-amber-500/20",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
    danger: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-400" },
    info: { bg: "bg-blue-500/20", text: "text-blue-400", dot: "bg-blue-400" },
    purple: {
      bg: "bg-purple-500/20",
      text: "text-purple-400",
      dot: "bg-purple-400",
    },
  };
  const v = variants[variant];
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";
  const textSize = size === "sm" ? "text-xs" : "text-xs font-medium";

  return (
    <View
      className={`flex-row items-center ${v.bg} rounded-full ${padding} gap-1`}
    >
      {dot && <View className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />}
      <Text className={`${v.text} ${textSize}`}>{label}</Text>
    </View>
  );
};

export default Badge;
