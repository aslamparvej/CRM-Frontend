import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { LeadFilters } from "@/types/lead.types";
import { LEAD_STATUSES, LEAD_PRIORITIES } from "@/constants/status";

import AppModal from "../ui/AppModal";

interface LeadFilterProps {
  visible: boolean;
  onClose: () => void;
  filters: LeadFilters;
  onApply: (f: LeadFilters) => void;
}

const LeadFiltersSheet: React.FC<LeadFilterProps> = ({
  visible,
  onClose,
  filters,
  onApply,
}) => {
  const [local, setLocal] = useState<LeadFilters>(filters);

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  return (
    <AppModal visible={visible} onClose={onClose} title="Filter Leads">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Status
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {LEAD_STATUSES.map((s) => (
            <TouchableOpacity
              key={s.value}
              onPress={() =>
                setLocal((f) => ({
                  ...f,
                  status: f.status === s.value ? undefined : (s.value as any),
                }))
              }
              style={{
                backgroundColor:
                  local.status === s.value
                    ? `${s.color}30`
                    : "rgba(30,41,59,1)",
                borderColor: local.status === s.value ? s.color : "#334155",
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: local.status === s.value ? s.color : "#94A3B8",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Priority
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {LEAD_PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p.value}
              onPress={() =>
                setLocal((f) => ({
                  ...f,
                  priority:
                    f.priority === p.value ? undefined : (p.value as any),
                }))
              }
              style={{
                backgroundColor:
                  local.priority === p.value
                    ? `${p.color}30`
                    : "rgba(30,41,59,1)",
                borderColor: local.priority === p.value ? p.color : "#334155",
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: local.priority === p.value ? p.color : "#94A3B8",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => {
              setLocal({});
              onApply({});
              onClose();
            }}
            className="flex-1 bg-slate-700 py-3 rounded-xl items-center"
            activeOpacity={0.8}
          >
            <Text className="text-slate-300 font-semibold">Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleApply}
            className="flex-1 bg-indigo-500 py-3 rounded-xl items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppModal>
  );
};

export default LeadFiltersSheet;
