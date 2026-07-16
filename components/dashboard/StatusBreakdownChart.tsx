import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { StatusBreakdown } from "@/types/dashboard.types";

interface StatusBreakdownChartProps {
  statusBreakDown: StatusBreakdown[] | undefined;
}

const StatusBreakdownChart: React.FC<StatusBreakdownChartProps> = ({
  statusBreakDown,
}) => {
  if (statusBreakDown && statusBreakDown.length === 0) return;

  const pieData = statusBreakDown?.map((item) => ({
    value: item.count,
    color: item.color,
    text: `${item.count}`,
    label: item.name,
  }));
  return (
    <View className="rounded-2xl p-4 border border-gray-300 bg-white mb-6">
      <View className="flex items-center justify-center">
        {pieData && (
          <PieChart data={pieData} showText textColor="white" textSize={14} />
        )}
      </View>
      <View className="mt-4">
        {statusBreakDown?.map((item) => (
          <View
            key={item.statusId}
            className="flex-row items-center justify-between mb-2"
          >
            <View className="flex-row items-center">
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: item.color,
                  marginRight: 8,
                }}
              />
              <Text>{item.name}</Text>
            </View>

            <Text>{item.count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StatusBreakdownChart;
