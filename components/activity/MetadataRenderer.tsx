import React from "react";
import { View, Text } from "react-native";
import { ArrowRight, Calendar, File } from "lucide-react-native";

import { Activity } from "@/types/activity.types";
import { formatDate } from "@/utils/formatDate";

interface MetadataRendererProps {
  activity: Activity;
}

const Row = ({
  label,
  oldValue,
  newValue,
}: {
  label: string;
  oldValue?: string;
  newValue?: string;
}) => (
  <View className="mt-3 rounded-xl bg-slate-50 p-3">
    <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </Text>

    <View className="flex-row items-center justify-between">
      <View className="flex-1 rounded-lg bg-white px-3 py-2">
        <Text className="text-center text-sm text-slate-700">
          {oldValue || "-"}
        </Text>
      </View>

      <ArrowRight size={18} color="#94A3B8" />

      <View className="flex-1 rounded-lg bg-green-50 px-3 py-2">
        <Text className="text-center font-semibold text-green-700">
          {newValue || "-"}
        </Text>
      </View>
    </View>
  </View>
);

const MetadataRenderer: React.FC<MetadataRendererProps> = ({ activity }) => {
  const meta = activity.metadata ?? {};
  switch (activity.action) {
    case "LEAD_STATUS_CHANGED":
      return (
        <Row
          label="Status"
          oldValue={meta.oldStatus?.name}
          newValue={meta.newStatus?.name}
        />
      );
    case "LEAD_PRIORITY_CHANGED":
      return (
        <Row
          label="Priority"
          oldValue={meta.oldPriority}
          newValue={meta.newPriority}
        />
      );
    case "LEAD_ASSIGNED":
      return (
        <Row
          label="Assigned To"
          oldValue={meta.oldAssignedTo}
          newValue={meta.newAssignedTo}
        />
      );
    case "USER_ROLE_CHANGED":
      return (
        <Row label="Role" oldValue={meta.oldRole} newValue={meta.newRole} />
      );
    case "FOLLOWUP_CREATED":
      return (
        <View className="mt-3 rounded-xl bg-slate-50 p-3">
          <Text className="text-xs font-semibold uppercase text-slate-500">
            Follow-up
          </Text>

          <Text className="mt-2 text-sm text-slate-700"><Calendar size={14} color="#334155" /> {formatDate(meta.scheduledAt, "short")} - {formatDate(meta.scheduledAt, "time")}</Text>

          {meta.type && (
            <Text className="mt-1 text-sm text-slate-700"><File size={14} color="#334155" /> {meta.type}</Text>
          )}
        </View>
      );
    case "NOTE_CREATED":
      return (
        <View className="mt-3 rounded-xl bg-amber-50 p-3">
          <Text className="text-xs font-semibold uppercase text-amber-700">
            Note
          </Text>

          <Text className="mt-2 text-sm text-slate-700">{meta.content}</Text>
        </View>
      );
    case "LOGIN":
      return (
        <View className="mt-3 rounded-xl bg-blue-50 p-3">
          <Text className="text-xs font-semibold uppercase text-blue-700">
            Login
          </Text>

          <Text className="mt-2 text-sm text-slate-700">
            Platform: {activity.platform}
          </Text>

          {!!activity.ip && (
            <Text className="mt-1 text-sm text-slate-700">
              IP: {activity.ip}
            </Text>
          )}
        </View>
      );

    default:
      return null;
  }
};

export default MetadataRenderer;
