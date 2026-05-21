import React from "react";
import { AlertCircle } from "lucide-react-native";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerClassName,
  ...props
}) => {
  return (
    <View className={`mb-4  ${containerClassName || ""}`}>
      {label && (
        <Text className="text-slate-400 text-sm font-medium mb-1.5">
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center border rounded-xl px-3 ${error ? "border-red-500" : "border-gray-300"}`}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className="flex-1 text-gray-800 py-3 text-base"
          placeholderTextColor="#64748B"
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>

      {error && (
        <View className="flex-row items-center mt-1 gap-1">
          <AlertCircle size={12} color="#EF4444" />
          <Text className="text-red-400 text-xs">{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
