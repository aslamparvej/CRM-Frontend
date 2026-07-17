import React, { useEffect, useRef } from "react";
import { Filter } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useActivityStore } from "@/store/activity.store";

import AppHeader from "@/components/ui/Header";
import EmptyState from "@/components/ui/EmptyState";
import PeriodTabs from "@/components/activity/PeriodTabs";
import ActivityCard from "@/components/activity/ActivityCard";
import FilterBottomSheet from "@/components/activity/FilterBottomSheet";
import Loader from "@/components/ui/Loader";

const ActivityScreen = () => {
  const {
    activities,
    refreshing,
    fetchActivities,
    refresh,
    loadMore,
    loading,
    error,
    filters,
  } = useActivityStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    fetchActivities(id, true);
  }, [
    id,
    filters.period,
    filters.search,
    filters.module,
    filters.action,
    filters.from,
    filters.to,
    fetchActivities,
  ]);

  const handleRefresh = () => {
    if (!id) return;
    refresh(id);
  };

  const handleLoadMore = () => {
    if (!id) return;

    loadMore(id);
  };

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="User Activities"
        showBack
        rightElement={
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.present()}
            activeOpacity={0.7}
            className="h-11 w-11 items-center justify-center rounded-xl bg-slate-100"
          >
            <Filter size={20} color="#0F172A" />
          </TouchableOpacity>
        }
      />
      <View className="flex-1">
        {/* Period Filter */}
        <View>
          <PeriodTabs />
        </View>
        {loading ? (
          <Loader fullScreen text="Loading activities." />
        ) : (
          <FlatList
            data={activities}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ActivityCard activity={item} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 100,
              flexGrow: activities.length === 0 ? 1 : undefined,
            }}
            ListEmptyComponent={<EmptyState title="No Activities." />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews
          />
        )}
      </View>
      <FilterBottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

export default ActivityScreen;
