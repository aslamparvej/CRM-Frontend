import React, { forwardRef, useMemo, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { CalendarDays, RotateCcw } from "lucide-react-native";

import { useActivityStore } from "@/store/activity.store";

const periods = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Custom",
    value: "custom",
  },
];
const modules = ["Lead", "FollowUp", "User", "Note", "Notification", "Auth"];
const actions = [
  {
    label: "Created",
    value: "CREATE",
  },
  {
    label: "Updated",
    value: "UPDATE",
  },
  {
    label: "Deleted",
    value: "DELETE",
  },
  {
    label: "Assigned",
    value: "ASSIGN",
  },
  {
    label: "Status",
    value: "STATUS",
  },
  {
    label: "Login",
    value: "LOGIN",
  },
];

// eslint-disable-next-line react/display-name
const FilterBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const snapPoints = useMemo(() => ["60%"], []);
  const { filters, updateFilters, clearFilters } = useActivityStore();

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [from, setFrom] = useState<Date>(
    filters.from ? new Date(filters.from) : new Date(),
  );
  const [to, setTo] = useState<Date>(
    filters.to ? new Date(filters.to) : new Date(),
  );

  const applyFilters = () => {
    updateFilters({
      period: "custom",
      from: from.toISOString(),
      to: to.toISOString(),
    });

    ref?.current?.dismiss();
  };

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPoints} enablePanDownToClose>
      <BottomSheetView className="flex-1 px-5 ">
        <Text className="text-xl font-bold text-slate-900 mb-6">
          Filter Activities
        </Text>

        {/* Quick Filters */}
        <Text className="text-sm font-semibold text-slate-700 mb-3">
          Quick Filter
        </Text>
        <View className="flex-row ">
          {periods.map((item) => {
            const active = filters.period === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                onPress={() => {
                  updateFilters({
                    period: item.value as any,
                  });

                  ref?.current?.dismiss();
                }}
                className={`mr-3 mb-3 rounded-full px-5 py-2 ${
                  active ? "bg-primary-color" : "bg-slate-100"
                }`}
              >
                <Text
                  className={`font-medium ${
                    active ? "text-gray-800" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date Range */}
        <Text className="mt-4 mb-3 text-sm font-semibold text-slate-700">
          Custom Range
        </Text>

        <TouchableOpacity
          onPress={() => setShowFromPicker(true)}
          className="h-14 mb-4 rounded-xl border border-slate-200 bg-white px-4 flex-row items-center justify-between"
        >
          <Text>{from.toDateString()}</Text>

          <CalendarDays size={18} color="#64748B" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowToPicker(true)}
          className="h-14 rounded-xl border border-slate-200 bg-white px-4 flex-row items-center justify-between"
        >
          <Text>{to.toDateString()}</Text>
          <CalendarDays size={18} color="#64748B" />
        </TouchableOpacity>

        {showFromPicker && (
          <DateTimePicker
            value={from}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, date) => {
              setShowFromPicker(false);

              if (date) setFrom(date);
            }}
          />
        )}
        {showToPicker && (
          <DateTimePicker
            value={to}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, date) => {
              setShowToPicker(false);

              if (date) setTo(date);
            }}
          />
        )}
        {/* Buttons */}

        {/* Module Filter */}
        <Text className="mt-6 mb-3 text-sm font-semibold text-slate-700">
          Module
        </Text>
        <View className="flex-row flex-wrap">
          {modules.map((item) => {
            const active = filters.module === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() =>
                  updateFilters({
                    module: active ? "" : item,
                  })
                }
                className={`mr-2 mb-2 rounded-full px-4 py-2 ${
                  active ? "bg-primary-color" : "bg-slate-100"
                }`}
              >
                <Text
                  className={`${active ? "text-gray-800" : "text-slate-700"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Filter */}
        <Text className="mt-6 mb-3 text-sm font-semibold text-slate-700">
          Action
        </Text>
        <View className="flex-row flex-wrap">
          {actions.map((item) => {
            const active = filters.action === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                onPress={() =>
                  updateFilters({
                    action: active ? "" : item.value,
                  })
                }
                className={`mr-2 mb-2 rounded-full px-4 py-2 ${
                  active ? "bg-primary-color" : "bg-slate-100"
                }`}
              >
                <Text
                  className={`${active ? "text-gray-800" : "text-slate-700"}`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="my-8 flex-row">
          <TouchableOpacity
            onPress={clearFilters}
            className="flex-1 mr-3 h-12 rounded-xl border border-slate-200 items-center justify-center flex-row"
          >
            <RotateCcw size={16} color="#64748B" />

            <Text className="ml-2 font-medium text-slate-700">Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={applyFilters}
            className="flex-1 h-12 rounded-xl bg-primary-color items-center justify-center"
          >
            <Text className="font-semibold text-gray-800">Apply</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default FilterBottomSheet;
