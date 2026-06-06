import React from "react";
import { X } from "lucide-react-native";
import { Modal, Pressable, View, Text, TouchableOpacity } from "react-native";

interface AppModalProps {
    visible: boolean;
    onClose: ()=> void;
    title?: string;
    children: React.ReactNode;
}

const AppModal:React.FC<AppModalProps> = ({visible, onClose, title, children}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-end px-4" onPress={onClose}>
         <View className="flex-row items-center justify-between mb-5">
          {title && <Text className="text-gray-800 text-lg font-bold">{title}</Text>}
          <TouchableOpacity onPress={onClose} className="bg-gray-800 p-1.5 rounded-full ml-auto">
            <X size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
        {children}
      </Pressable>
    </Modal>
  )
}

export default AppModal;
