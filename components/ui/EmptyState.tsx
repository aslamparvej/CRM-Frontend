import React from "react";
import { Inbox } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

import Button from "./Button";

interface emptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { label: string; onPress: () => void };
}

const EmptyState: React.FC<emptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <View className="flex-1 items-center justify-center py-16 px-6">
      <View className="rounded-full mb-2">
        {icon || <Inbox size={32} color="#000" />}
      </View>
      <Text className="text-gray-900 text-lg font-semibold text-center mb-2">
        {title}
      </Text>

      {description && (
        <Text className="text-slate-400 text-sm text-center leading-5">
          {description}
        </Text>
      )}

      {action && (
        <Button label={action.label} onPress={action.onPress} size="sm" className="mt-4" />
      )}
    </View>
  );
};

export default EmptyState;
