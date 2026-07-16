import React, { use } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import {
  CheckCircle2,
  Phone,
  Mail,
  Trash2,
  Edit2,
  MessageCircle,
  User,
  Clock,
} from "lucide-react-native";

import { Lead } from "@/types/lead.types";
import { formatDate } from "@/utils/formatDate";
import { useAuthStore } from "@/store/auth.store";

import Avatar from "../ui/Avatar";
import LeadStatusBadge from "./LeadStatusBadge";
import LeadCategoryBadge from "./LeadCategoryBadge";
import getPriorityColor from "@/utils/getPriorityColor";
import getCategoryColor from "@/utils/getCategoryColor";

import { Dropdown, DropdownItem } from "../ui/Dropdown";

interface LeadCardProps {
  lead: Lead;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  selected?: boolean;
  onSelect?: () => void;
  selectionMode?: boolean;
  onCall?: () => void;
  onWhatsApp?: () => void;
  onEmail?: () => void;
  onUpdateStatus?: () => void;
  onFollowUp?: () => void;
  onAssignLead?: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onPress,
  onEdit,
  onDelete,
  selected,
  onSelect,
  selectionMode,
  onCall,
  onWhatsApp,
  onEmail,
  onUpdateStatus,
  onFollowUp,
  onAssignLead,
}) => {
  const { user } = useAuthStore();

  const categoryColor = getCategoryColor(lead.category);

  let MENU: DropdownItem[] = [
    {
      key: "call",
      label: "Call",
      icon: <Phone size={16} color="#10B981" />,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: <MessageCircle size={16} color="#25D366" />,
    },
    {
      key: "email",
      label: "Email",
      icon: <Mail size={16} color="#25D366" />,
    },
    { key: "div1", label: "", divider: true },
    {
      key: "followup",
      label: "Follow-Up",
      icon: <Clock size={16} color="#6366F1" />,
    },
    {
      key: "updateStatus",
      label: "Update Status",
      icon: <CheckCircle2 size={16} color="#6366F1" />,
    },
  ];

  if (
    !lead.assignedTo &&
    user?.role === "executive" &&
    user?._id === lead.createdBy._id
  ) {
    MENU.push({
      key: "assignLead",
      label: "Assign Lead",
      icon: <User size={16} color="#6366F1" />,
    });
  }

  if (user?.role === "sub-admin") {
    MENU.push({
      key: "assignLead",
      label: "Assign Lead",
      icon: <User size={16} color="#6366F1" />,
    });
  }

  if (user?.role === "admin") {
    MENU.push(
      {
        key: "assignLead",
        label: "Assign Lead",
        icon: <User size={16} color="#6366F1" />,
      },
      { key: "div2", label: "", divider: true },
      {
        key: "edit",
        label: "Edit",
        icon: <Edit2 size={16} color="#64748B" />,
      },
      {
        key: "delete",
        label: "Delete",
        danger: true,
        icon: <Trash2 size={16} color="#EF4444" />,
      },
    );
  }

  const handleMenuSelect = (item: DropdownItem) => {
    switch (item.key) {
      case "call":
        onCall?.();
        break;
      case "whatsapp":
        onWhatsApp?.();
        break;
      case "email":
        onEmail?.();
        break;
      case "updateStatus":
        onUpdateStatus?.();
        break;
      case "assignLead":
        onAssignLead?.();
        break;
      case "followup":
        onFollowUp?.();
        break;
      case "edit":
        onEdit?.();
        break;
      case "delete":
        onDelete?.();
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={selectionMode ? onSelect : onPress}
      onLongPress={onSelect}
      className={`bg-white rounded-2xl p-4 mb-3 border ${selected ? "border-indigo-500" : "border-gray-300"}`}
      activeOpacity={0.85}
    >
      {selectionMode && (
        <View
          className={`absolute top-3 left-3 w-5 h-5 rounded-full border-2 items-center justify-center ${selected ? "bg-indigo-500 border-indigo-500" : "border-slate-600"}`}
        >
          {selected && <CheckCircle2 size={12} color="#FFF" />}
        </View>
      )}

      <View className="flex-row items-start">
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            {/* Lead Name  */}
            <Text
              className="text-gray-800 font-bold text-base"
              numberOfLines={1}
              style={{ flex: 1, marginRight: 8 }}
            >
              {lead.name}
            </Text>
            <View className="flex-row items-center gap-2">
              {!selectionMode && (
                <Dropdown
                  items={MENU}
                  align="end"
                  onSelect={(item) => handleMenuSelect(item)}
                />
              )}
            </View>
          </View>

          {/* Phone Number */}
          <View className="flex-row items-center gap-1 mt-1">
            <Phone size={12} color="#64748B" />
            <Text className="text-slate-400 text-xs">{lead.phone}</Text>
          </View>

          {/* Lead Creaded By And Assign To */}
          <View className="flex gap-2 mt-4">
            {lead.createdBy && (
              <View className="flex-row items-center gap-2">
                <Avatar name={lead.createdBy.name} size={20} />
                <Text className="text-slate-400 text-xs">
                  Created by {lead.createdBy.name}
                </Text>
              </View>
            )}
            {lead.assignedTo && (
              <View className="flex-row items-center gap-2">
                <Avatar name={lead.assignedTo.name} size={20} />
                <Text className="text-slate-400 text-xs">
                  Assigned to {lead.assignedTo.name}
                </Text>
              </View>
            )}
          </View>

          {/* Meta Data */}
          <View className="flex-row items-center justify-between mt-6">
            <View className="flex-row gap-1 items-center">
              {lead.status && (
                <LeadStatusBadge
                  status={lead.status?.name}
                  color={lead.status.color}
                />
              )}
              <View
                style={{
                  backgroundColor: `${getPriorityColor(lead.priority)}20`,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: getPriorityColor(lead.priority),
                    fontSize: 11,
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {lead.priority}
                </Text>
              </View>
              {lead.category && <LeadCategoryBadge category={lead.category} />}
            </View>

            <Text className="text-slate-500 text-xs ml-auto">
              {formatDate(lead.createdAt, "relative")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LeadCard;
