import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Car,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Smartphone,
  Calendar,
  User,
  FileText,
  Contact,
  CalendarPlus,
  CheckCircle2,
  Eye,
} from "lucide-react-native";

import { Followup } from "@/types/followup.types";
import { formatDate } from "@/utils/formatDate";

import Button from "../ui/Button";

const FOLLOWUP_ICONS: Record<string, React.ReactNode> = {
  call: <Phone size={18} />,
  whatsapp: <MessageCircle size={18} />,
  email: <Mail size={18} />,
  visit: <Car size={18} />,
  sms: <Smartphone size={18} />,
};

interface FollowupDetailsCardProps {
  followup: Followup;
  onComplete?: (id: string) => void;
  onEdit?: (followup: Followup) => void;
  onViewLead?: (followup: Followup) => void;
}

const FollowupDetailsCard: React.FC<FollowupDetailsCardProps> = ({
  followup,
  onComplete,
  onEdit,
  onViewLead,
}) => {
  const isOverdue =
    ["pending", "rescheduled"].includes(followup.status) &&
    new Date(followup.scheduledAt) < new Date();
  return (
    <View className=" bg-white rounded-2xl p-4 mb-3 border border-gray-300">
      <View className="mb-4">
        {/* Follow-up Header */}
        <View className="flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <View className=" w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
            {FOLLOWUP_ICONS[followup.type] || <FileText size={18} />}
          </View>

          <View className="flex-1 flex flex-row items-start justify-between">
            <View className="flex items-start">
              <Text className="text-lg font-bold text-gray-900">
                Existing Follow-up
              </Text>

              <View
                className={`px-2 py-0.5 rounded-full ${followup.status === "completed" ? "bg-emerald-500/20" : isOverdue ? "bg-red-500/20" : "bg-amber-500/20"}`}
              >
                <Text
                  className={`text-xs font-semibold ${followup.status === "completed" ? "text-emerald-400" : isOverdue ? "text-red-400" : "text-amber-400"}`}
                >
                  {followup.status.charAt(0).toUpperCase() +
                    followup.status.slice(1)}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              {followup.status === "pending" || followup.status === "rescheduled" ? (
                <TouchableOpacity
                  onPress={() => onComplete?.(followup.id)}
                  className="bg-emerald-100 p-2 rounded-xl"
                  activeOpacity={0.8}
                >
                  <CheckCircle2 size={20} color="#10B981" />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => onViewLead?.(followup)}
                className="p-2 rounded-xl bg-gray-200"
                activeOpacity={0.8}
              >
                <Eye size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Lead Details */}
        <View className="">
          <View className="py-3 flex flex-row items-center gap-4 border-b border-gray-200">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <User size={18} />
            </View>

            <View>
              <Text className="text-sm text-gray-600">Lead</Text>
              <Text className="text-[1rem] font-semibold text-gray-800">
                {followup.leadName}
              </Text>
              <Text className="text-sm text-gray-600">
                {followup.leadPhone}
              </Text>
            </View>
          </View>

          <View className="py-3 flex flex-row items-center gap-4 border-b border-gray-200">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <Phone size={18} />
            </View>

            <View>
              <Text className="text-sm text-gray-600">Follow-up Type</Text>
              <Text className="text-[1rem] font-semibold text-gray-800">
                {followup.type.charAt(0).toUpperCase() + followup.type.slice(1)}
              </Text>
            </View>
          </View>

          <View className="py-3 flex flex-row items-center gap-4 border-b border-gray-200">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <Calendar size={18} color={isOverdue ? "#EF4444" : "#64748B"} />
            </View>

            <View>
              <Text className="text-sm text-gray-600">Scheduled Date</Text>
              <Text
                className={`text-[1rem] font-semibold ${isOverdue ? "text-red-400" : "text-gray-800"}`}
              >
                {formatDate(followup.scheduledAt, "long")}
              </Text>
            </View>
          </View>

          <View className="py-3 flex flex-row items-center gap-4 border-b border-gray-200">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <Clock size={18} color={isOverdue ? "#EF4444" : "#64748B"} />
            </View>

            <View>
              <Text className="text-sm text-gray-600">Scheduled Time</Text>
              <Text
                className={`text-[1rem] font-semibold ${isOverdue ? "text-red-400" : "text-gary-800"}`}
              >
                {formatDate(followup.scheduledAt, "time")}
              </Text>
            </View>
          </View>

          <View className="py-3 flex flex-row items-center gap-4 border-b border-gray-200">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <FileText size={18} />
            </View>

            <View className="flex-1">
              <Text className="text-sm text-gray-600">Note</Text>
              <Text className="flex-shrink text-[1rem] font-semibold text-gray-800 ">
                {followup.note}
              </Text>
            </View>
          </View>

          <View className="py-3 flex flex-row items-center gap-4 border-b border-gray-200">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <Contact size={18} />
            </View>

            <View>
              <Text className="text-sm text-gray-600">Created By</Text>
              <Text className="text-[1rem] font-semibold text-gray-800">
                {followup.createdByName}
              </Text>
            </View>
          </View>

          <View className="py-3 flex flex-row items-center gap-4">
            <View className=" w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl">
              <CalendarPlus size={18} />
            </View>

            <View>
              <Text className="text-sm text-gray-600">Created By</Text>
              <Text className="text-[1rem] font-semibold text-gray-800">
                {formatDate(followup.createdAt, "long")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Button label="Edit Follow-up" onPress={() => onEdit?.(followup)} />
    </View>
  );
};

export default FollowupDetailsCard;
