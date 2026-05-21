import React from "react";
import { TouchableOpacity, ActivityIndicator, Text } from "react-native";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  icon,
  fullWidth,
  className,
}) => {
  const base = "flex-row items-center justify-center rounded-xl font-semibold";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary-color active:bg-amber-500",
    secondary: "bg-slate-700 active:bg-slate-600",
    outline: "border border-indigo-500 bg-transparent active:bg-indigo-500/10",
    ghost: "bg-transparent active:bg-slate-700",
    danger: "bg-red-500 active:bg-red-600",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 gap-1",
    md: "px-4 py-3 gap-2",
    lg: "px-6 py-4 gap-2",
  };
  const textSizes: Record<ButtonSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };
  const textColor =
    variant === "outline" || variant === "ghost"
      ? "text-indigo-400"
      : "text-white";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50" : ""} ${className || ""} }`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {icon}
          <Text className={`${textColor} ${textSizes[size]} font-semibold`}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
