import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { getNotes, addNote } from "@/services/api/lead.api";
import { SafeAreaView } from "react-native-safe-area-context";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import LeadNotes from "@/components/leads/LeadNotes";

const LeadNotesScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    if (id) loadNotes();
  }, [id]);

  const loadNotes = async () => {
    try {
      const res = await getNotes(id);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (content: string) => {
    setAddLoading(true);
    try {
      console.log("Add Note", content);
      const res = await addNote(id!, content);
      setNotes((n) => [res.data, ...n]);
    } catch (error) {
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Lead Notes" showBack />
      <View className="flex-1 px-1 pt-4">
        {loading ? (
          <Loader />
        ) : (
          <LeadNotes notes={notes} onAdd={handleAdd} isLoading={addLoading} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LeadNotesScreen;
