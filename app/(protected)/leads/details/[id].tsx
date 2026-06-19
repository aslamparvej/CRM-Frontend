import React, { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  Clipboard,
  MessageCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  InfoIcon,
  Tag,
  CalendarPlus,
  Calendar,
  User,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  StatusBar
} from "react-native";

import { Lead } from "@/types/lead.types";
import { formatDate } from "@/utils/formatDate";
import { useLeadStore } from "@/store/leads.store";
import getPriorityColor from "@/utils/getPriorityColor";
import { createFollowup } from "@/services/api/followups.api";
import generateWhatsappLink from "@/utils/generateWhatsappLink";

import Avatar from "@/components/ui/Avatar";
import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import AppModal from "@/components/ui/AppModal";
import EmptyState from "@/components/ui/EmptyState";
import LeadActions from "@/components/leads/LeadActions";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import FollowupForm from "@/components/forms/FollowupForm";
import LeadStatusBadge from "@/components/leads/LeadStatusBadge";
import { getHistory, getNotes } from "@/services/api/lead.api";
import LeadHistoryList from "@/components/leads/LeadHistoryList";

const LeadDetailsScreen = () => {
  console.log("Debugging start in Lead Details page ---->");
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { fetchLeadById, removeLead } = useLeadStore();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showFollowup, setShowFollowup] = useState(false);
  const [followupLoading, setFollowupLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "notes" | "history" | "followup"
  >("details");

  const [history, setHistory] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    if (id) fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const data = await fetchLeadById(id);
      console.log(data);
      setLead(data || null);
    } catch (error) {
      console.log("Error fetching lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await removeLead(id);
      setShowDelete(false);
      router.push("/(protected)/(tabs)/leads");
    } catch (error) {
      console.log("Error deleting lead", error);
    }
  };

  const handleFollowupSubmit = async (data: any) => {
    setFollowupLoading(true);

    try {
      await createFollowup(data);
      setShowFollowup(false);
    } catch (error) {
      console.log("Error creating followup", error);
    } finally {
      setFollowupLoading(false);
    }
  };

  // Lead History
  useEffect(() => {
    if (id) loadHistory();
  }, [id]);
  const loadHistory = async () => {
    try {
      const res = await getHistory(id);
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Lead Notes
  useEffect(() => {
    if (id) loadNotes();
  }, [id]);

  const loadNotes = async () => {
    try {
      const res = await getNotes(id);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (!lead)
    return (
      <EmptyState
        title="Lead not found"
        action={{ onPress: () => router.back(), label: "Go back" }}
      />
    );

  const InfoRow = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }) => (
    <View className="flex-row justify-between py-3 border-b border-gray-300">
      {icon}
      <Text className="text-gray-800 text-sm ms-2">{label}</Text>
      <Text className="text-gray-600 text-sm font-medium text-right flex-1 ml-4">
        {value}
      </Text>
    </View>
  );

  const tabs = [
    {
      key: "details",
      label: "Details",
      icon: (
        <Clipboard
          size={14}
          color={activeTab === "details" ? "#818CF8" : "#64748B"}
        />
      ),
    },
    {
      key: "notes",
      label: "Notes",
      icon: (
        <MessageCircle
          size={14}
          color={activeTab === "notes" ? "#818CF8" : "#64748B"}
        />
      ),
    },
    {
      key: "history",
      label: "History",
      icon: (
        <Clock
          size={14}
          color={activeTab === "history" ? "#818CF8" : "#64748B"}
        />
      ),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="New Lead"
        showBack
        rightElement={
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => router.push(`/(protected)/leads/edit/${id}`)}
              className="bg-primary-color p-2 rounded-xl"
              activeOpacity={0.8}
            >
              <Edit2 size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDelete(true)}
              className="bg-red-500/15 p-2 rounded-xl"
              activeOpacity={0.8}
            >
              <Trash2 size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center gap-3 mb-3">
            <Avatar name={lead.name} size={60} />
            <View className="flex-1">
              <Text className="text-gray-800 text-xl font-bold">
                {lead.name}
              </Text>
              <View className="flex-row items-center gap-2 mt-1">
                <LeadStatusBadge status={lead.status} />
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
              </View>
            </View>
          </View>

          <LeadActions
            lead={lead}
            onCallPress={() => Linking.openURL(`tel:${lead.phone}`)}
            onWhatsAppPress={() =>
              Linking.openURL(generateWhatsappLink(lead.phone))
            }
            onEmailPress={() => Linking.openURL(`mailto:${lead.email}`)}
          />

          <TouchableOpacity
            // onPress={() => setShowFollowup(true)}
            onPress={()=> router.push(`/(protected)/leads/follow-up/${id}`)}
            className="bg-indigo-500/15 border border-indigo-500/30 py-3 rounded-xl items-center flex-row justify-center gap-2"
            activeOpacity={0.8}
          >
            <Clock size={18} color="#818CF8" />
            <Text className="text-indigo-400 font-semibold">
              Schedule Follow-up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row px-4 pt-2 gap-1 border-b border-gray-300">
          {tabs.map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setActiveTab(t.key as any)}
              className={`flex-row items-center gap-1.5 px-4 py-2.5 border-b-2 ${activeTab === t.key ? "border-amber-500" : "border-transparent"}`}
              activeOpacity={0.8}
            >
              {t.icon}
              <Text
                className={`text-sm font-semibold ${activeTab === t.key ? "text-amber-400" : "text-slate-400"}`}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="px-4 pt-3 pb-8">
          {activeTab === "details" && (
            <>
              <InfoRow
                label="Phone"
                value={lead.phone}
                icon={<Phone size={16} />}
              />
              {lead.alternatePhone && (
                <InfoRow
                  label="Alt. Phone"
                  value={lead.alternatePhone}
                  icon={<Phone size={16} />}
                />
              )}
              <InfoRow
                label="Email"
                value={lead.email || "N/A"}
                icon={<Mail size={16} />}
              />
              {lead.address && (
                <InfoRow
                  label="Address"
                  value={lead.address}
                  icon={<MapPin size={16} />}
                />
              )}
              <InfoRow
                label="Source"
                value={lead.source}
                icon={<InfoIcon size={16} />}
              />
              <InfoRow
                label="Category"
                value={lead.category}
                icon={<Tag size={16} />}
              />
              {lead.expectedCloseDate && (
                <InfoRow
                  label="Expected Close"
                  value={formatDate(lead.expectedCloseDate)}
                  icon={<Calendar size={16} />}
                />
              )}
              <InfoRow
                label="Assigned To"
                value={lead.assignedTo?.name || "N/A"}
                icon={<User size={16} />}
              />
              <InfoRow
                label="Created By"
                value={lead.createdBy?.name || "N/A"}
                icon={<User size={16} />}
              />
              <InfoRow
                label="Created At"
                value={formatDate(lead.createdAt, "long")}
                icon={<CalendarPlus size={16} />}
              />
              <InfoRow
                label="Last Updated"
                value={formatDate(lead.updatedAt, "relative")}
                icon={<Calendar size={16} />}
              />
              {lead.notes && (
                <View className="mt-3">
                  <Text className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">
                    Notes
                  </Text>
                  <Text className="text-slate-300 text-sm leading-6">
                    {lead.notes}
                  </Text>
                </View>
              )}
            </>
          )}
          {activeTab === "notes" && (
            <>
              {notes.slice(0,4).map((note) => (
                <View
                  key={note.id}
                  className="bg-white rounded-xl p-3.5 mb-2 border border-gray-300"
                >
                  <View className="flex-row items-center gap-2 mb-2">
                    <Avatar name={note.createdByName} size={24} />
                    <Text className="text-gray-800 text-xs font-medium">
                      {note.createdByName}
                    </Text>
                    <Text className="text-slate-500 text-xs ml-auto">
                      {formatDate(note.createdAt, "relative")}
                    </Text>
                  </View>
                  <Text className="text-gray-600 text-sm leading-5">
                    {note.content ? note.content : note.text}
                  </Text>
                </View>
              ))}
              <View className="mt-4">
                <TouchableOpacity
                  onPress={() => router.push(`/(protected)/leads/notes/${id}`)}
                  className="bg-amber-500 py-3 rounded-xl items-center"
                  activeOpacity={0.8}
                >
                  <Text className="text-black font-semibold">
                    Add and View Notes
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {activeTab === "history" && (
            <>
              <View className="flex-1 px-4 mt-4">
                {history.length ? (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <LeadHistoryList history={history.slice(0, 3)} />
                  </ScrollView>
                ) : (
                  <EmptyState
                    title="No History yet"
                    description="Changes to this lead will appear here"
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() => router.push(`/(protected)/leads/history/${id}`)}
                className="bg-primary-color py-3 rounded-xl items-center"
                activeOpacity={0.8}
              >
                <Text className="text-gray-800 font-semibold">
                  View Full History
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <AppModal
        visible={showFollowup}
        onClose={() => setShowFollowup(false)}
        title="Schedule Follow-up"
      >
        <FollowupForm
          leadId={id}
          onSubmit={handleFollowupSubmit}
          isLoading={followupLoading}
        />
      </AppModal>
      <ConfirmDialog
        visible={showDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete ${lead.name}? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </SafeAreaView>
  );
};

export default LeadDetailsScreen;
