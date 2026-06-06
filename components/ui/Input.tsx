import React, { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react-native";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";

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
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

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
          className={`flex-1 text-gray-800 text-base ${
            props.multiline ? "min-h-[80px]" : "py-3"
          }`}
          textAlignVertical={props.multiline ? "top" : "center"}
          placeholderTextColor="#64748B"
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <EyeOff size={20} color="#64748B" />
            ) : (
              <Eye size={20} color="#64748B" />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View className="ml-2">{rightIcon}</View>
        )}
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
