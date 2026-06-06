import React from "react";
import { View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";

import { Picker } from "@react-native-picker/picker";


interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
  enabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  error,
  leftIcon,
  containerClassName,
  enabled = true,
}) => {
  return (
    <View className={`mb-4 ${containerClassName || ""}`}>
      {label && (
        <Text className="text-slate-400 text-sm font-medium mb-1.5">
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center border rounded-xl px-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}

        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          enabled={enabled}
          style={{ flex: 1 }}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" enabled={false} />
          )}

          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
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

export default Select;
