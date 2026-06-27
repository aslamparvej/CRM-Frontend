import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useCallback } from "react";
import { UserCog, Trash2, Plus, Filter } from "lucide-react-native";
// import { useFocusEffect } from "@react-navigation/native";

import { useLeadStore } from "@/store/leads.store";
import { useDebounce } from "@/hooks/useDebounce";
import { useLeadFilters } from "@/hooks/useLeadFilters";
import { call, whatsApp } from "@/utils/communication";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import LeadCard from "@/components/leads/LeadCard";
import EmptyState from "@/components/ui/EmptyState";
import LeadSearch from "@/components/leads/LeadSearch";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import LeadFiltersSheet from "@/components/leads/LeadFiltersSheet";

export default function LeadsScreen() {
  const router = useRouter();
  const {
    leads,
    fetchLeads,
    removeLead,
    bulkDelete,
    isLoading,
    selectedLeads,
    selectedIds,
    clearSelected,
    addHistory,
  } = useLeadStore();
  const { filters, setFilters, activeFilterCount } = useLeadFilters();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const loadLeads = useCallback(async () => {
    await fetchLeads(true);
  }, [fetchLeads]);

  // useFocusEffect(
  //   useCallback(() => {
  //     loadLeads();
  //   }, [loadLeads]),
  // );

  useCallback(() => {
    loadLeads();
  }, [loadLeads]);

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearch });
  }, [debouncedSearch]);

  useEffect(() => {
    loadLeads();
  }, [debouncedSearch, filters, loadLeads]);

  const handleBulkDelete = async () => {
    await bulkDelete();
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setShowDeleteConfirm(false);
    setPendingDeleteId(null);
    await removeLead(id);
  };

  const onDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowDeleteConfirm(true);
  };

  // Communication Handler
  const HandleOnCall = async (leadId: string, phone: string) => {
    await addHistory(leadId, "call_made");
    call(phone);
  };

  const handleOnWhatsApp = async (leadId: string, phone: string) => {
    await addHistory(leadId, "message_send");

    const message = "Hello,\nThank you for your interest.";
    whatsApp(phone, message);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="Leads"
        subtitle="Manage your leads"
        showSearch
        onSearch={() => setShowSearch((prev) => !prev)}
        rightElement={
          <View className="flex-row gap-2">
            {selectionMode && selectedIds?.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => router.push("/(protected)/leads/bulk-actions")}
                  className="bg-indigo-500/20 p-2 rounded-xl"
                  activeOpacity={0.8}
                >
                  <UserCog size={20} color="#818CF8" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowBulkDeleteConfirm(true)}
                  className="bg-red-500/20 p-2 rounded-xl"
                  activeOpacity={0.8}
                >
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              onPress={() => setShowFilters(true)}
              className={`p-2 rounded-xl relative ${activeFilterCount > 0 ? "bg-indigo-500" : "bg-gray-100"}`}
              activeOpacity={0.8}
            >
              <Filter
                size={20}
                color={activeFilterCount > 0 ? "#fff" : "#94A3B8"}
              />
              {activeFilterCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-white text-[9px] font-bold">
                    {activeFilterCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(protected)/leads/create")}
              className="bg-primary-color p-2 rounded-xl"
              activeOpacity={0.8}
            >
              <Plus size={20} color="#000" />
            </TouchableOpacity>
          </View>
        }
      />

      {showSearch && (
        <View className=" px-4 my-4">
          <LeadSearch value={search} onChangeText={setSearch} />
        </View>
      )}

      {selectionMode && (
        <View className="flex-row items-center justify-between px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20">
          <Text className="text-indigo-400 text-sm font-semibold">
            {selectedLeads?.length} selected
          </Text>
          <TouchableOpacity
            onPress={() => {
              clearSelected();
              setSelectionMode(false);
            }}
          >
            <Text className="text-slate-400 text-sm">Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading && !leads?.length ? (
        <Loader text="Loading leads..." />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <LeadCard
              lead={item}
              onPress={() =>
                router.push(`/(protected)/leads/details/${item._id}`)
              }
              onEdit={() => router.push(`/(protected)/leads/edit/${item._id}`)}
              onDelete={() => onDelete(item._id)}
              // selected={selectedLeads?.includes(item.id)}
              onSelect={() => {
                setSelectionMode(true);
                useLeadStore.getState().toggleSelect(item._id);
              }}
              selectionMode={selectionMode}
              onCall={() => HandleOnCall(item._id, item.phone)}
              onWhatsApp={() => handleOnWhatsApp(item._id, item.phone)}
              onUpdateStatus={() => {
                // Implementation for updating lead status
              }}
              onFollowUp={() =>
                router.push(`/(protected)/leads/follow-up/${item._id}`)
              }
            />
          )}
          contentContainerStyle={{ padding: 16, paddingTop: 12 }}
          showsVerticalScrollIndicator={false}
          onRefresh={loadLeads}
          refreshing={isLoading}
          ListEmptyComponent={
            <EmptyState
              title="No leads found"
              description="Tap + to add your first lead or adjust filters"
              action={{
                label: "Add Lead",
                onPress: () => router.push("/(protected)/leads/create"),
              }}
            />
          }
        />
      )}

      <LeadFiltersSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApply={setFilters}
      />
      <ConfirmDialog
        visible={showDeleteConfirm}
        title="Delete Lead"
        message={`Are you sure you want to delete lead? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
      <ConfirmDialog
        visible={showBulkDeleteConfirm}
        title="Delete Leads"
        message={`Are you sure you want to delete ${selectedLeads?.length} lead(s)? This cannot be undone.`}
        onConfirm={handleBulkDelete}
        onCancel={() => setShowBulkDeleteConfirm(false)}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </SafeAreaView>
  );
}
   