import { ScrollView, TouchableOpacity, Text } from "react-native";

import { useActivityStore } from "@/store/activity.store";

const periods = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Custom", value: "custom" },
];

type Period = "all" | "today" | "week" | "month" | "custom";

const PeriodTabs = () => {
  const { filters, updateFilters } = useActivityStore();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4"
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
    >
      {periods.map((item) => {
        const active = filters.period === item.value;

        return (
          <TouchableOpacity
            key={item.value}
            onPress={() =>
              updateFilters({
                period: item.value as Period,
              })
            }
            className={`mr-3 rounded-full px-5 py-2 ${
              active ? "bg-primary-color" : "bg-white border border-slate-200"
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
    </ScrollView>
  );
};

export default PeriodTabs;
