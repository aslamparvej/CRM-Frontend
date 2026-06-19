import React from "react";
import { X } from "lucide-react-native";
import { View, TextInput, TouchableOpacity } from "react-native";

interface LeadSearchProps {
  value: string;
  onChangeText: (t: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

const LeadSearch: React.FC<LeadSearchProps> = ({
  value,
  onChangeText,
  onFocus,
  placeholder,
}) => {
  return (
    <View className="flex-row items-center bg-gray-200 border border-gray-300 rounded-xl px-3 mb-4 gap-2">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholder={placeholder || "Search leads..."}
        placeholderTextColor="#64748B"
        className="flex-1 text-slate-100 py-3 text-sm"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <X size={16} color="#64748B" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LeadSearch;
