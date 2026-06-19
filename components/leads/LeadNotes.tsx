import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { LeadNote } from "@/types/lead.types";
import { formatDate } from "@/utils/formatDate";

import Input from "../ui/Input";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

const LeadNotes: React.FC<{
  notes: LeadNote[];
  onAdd: (content: string) => void;
  isLoading: boolean;
}> = ({ notes, onAdd, isLoading }) => {
  const [text, setText] = useState("");

  console.log("Notes", notes)
  return (
    <View className="px-4">
      <View className="flex gap-2 mb-4">
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Add a note..."
          multiline
        />
        <Button
          label="Add Note"
          onPress={() => {
            if (text.trim()) {
              onAdd(text.trim());
              setText("");
            }
          }}
          disabled={!text.trim() || isLoading}
        />
      </View>
      {notes.map((note) => (
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
    </View>
  );
};

export default LeadNotes;
