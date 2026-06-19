import React from "react";
import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from "react-native";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmVariant?: 'danger' | 'primary';
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  confirmVariant = "danger",
  isLoading,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <View className="bg-gray-100 rounded-2xl p-6 w-full max-w-sm border border-gray-300">
          <Text className="text-gray-800 text-lg font-bold mb-2">{title}</Text>
          <Text className="text-gray-600 text-sm leading-5 mb-6">
            {message}
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-gray-300 py-3 rounded-xl items-center"
              activeOpacity={0.8}
            >
              <Text className="text-gray-600 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              disabled={isLoading}
              className={`flex-1 py-3 rounded-xl items-center ${confirmVariant === "danger" ? "bg-red-500" : "bg-indigo-500"}`}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-semibold">{confirmLabel}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
