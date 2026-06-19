import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Phone, MessageCircle, Mail } from "lucide-react-native";

import { Lead } from "@/types/lead.types";

interface LeadActionsProps {
  lead: Lead;
  onCallPress: () => void;
  onWhatsAppPress: () => void;
  onEmailPress: () => void;
}

const LeadActions: React.FC<LeadActionsProps> = ({
  lead,
  onCallPress,
  onWhatsAppPress,
  onEmailPress,
}) => {
  return (
    <View className="flex-row gap-3 py-3">
      {[
        {
          icon: <Phone size={20} color="#10B981" />,
          label: "Call",
          onPress: onCallPress,
          bg: "bg-emerald-500/15",
        },
        {
          icon: <MessageCircle size={20} color="#25D366" />,
          label: "WhatsApp",
          onPress: onWhatsAppPress,
          bg: "bg-green-500/15",
        },
        {
          icon: <Mail size={20} color="#6366F1" />,
          label: "Email",
          onPress: onEmailPress,
          bg: "bg-indigo-500/15",
        },
      ].map((a) => (
        <TouchableOpacity
          key={a.label}
          onPress={a.onPress}
          className={`flex-1 ${a.bg} py-3 rounded-xl items-center gap-1`}
          activeOpacity={0.8}
        >
          {a.icon}
          <Text className="text-gray-700 text-xs font-medium">{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LeadActions;
