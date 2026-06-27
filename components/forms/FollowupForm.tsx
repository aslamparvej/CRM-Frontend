import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Phone,
  MessageCircle,
  Mail,
  Car,
  MessageSquare,
} from "lucide-react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import Input from "../ui/Input";
import Button from "../ui/Button";

const FollowupForm: React.FC<{
  leadId?: string;
  onSubmit: (d: any) => void;
  isLoading?: boolean;
}> = ({ leadId, onSubmit, isLoading }) => {
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(new Date());
  const [followUpTime, SetfollowUpTime] = useState(new Date());

  const [form, setForm] = useState({
    type: "call",
    scheduledAt: new Date(),
    note: "",
  });

  const types = [
    { value: "call", label: "Call", icon: <Phone size={14} /> },
    { value: "whatsapp", label: "WhatsApp", icon: <MessageCircle size={14} /> },
    { value: "email", label: "Email", icon: <Mail size={14} /> },
    { value: "visit", label: "Visit", icon: <Car size={14} /> },
    { value: "sms", label: "SMS", icon: <MessageSquare size={14} /> },
  ];

  const createFollowUpAt = () => {
    const followUpAt = new Date(followUpDate);

    followUpAt.setHours(
      followUpTime.getHours(),
      followUpTime.getMinutes(),
      0,
      0,
    );

    console.log(followUpAt);

    return followUpAt;
  };

  const handleSubmit = () => {
    const followUpAt = createFollowUpAt();
    const payload = {
      ...form,
      scheduledAt: followUpAt,
      leadId,
    };
    console.log(form);
    onSubmit(payload);

    setForm({
      type: "call",
      scheduledAt: new Date(),
      note: "",
    });

    setFollowUpDate(new Date());
    SetfollowUpTime(new Date());
  };

  return (
    <View>
      {/* Follow-up Type  */}
      <Text className="text-gray-400 text-sm font-medium mb-2">
        Follow-up Type
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <View className="flex-row gap-2">
          {types.map((t) => (
            <TouchableOpacity
              key={t.value}
              onPress={() => setForm((f) => ({ ...f, type: t.value }))}
              className={`px-3 py-2 rounded-xl border flex-row items-center gap-1.5 ${form.type === t.value ? "border-primary-color bg-primary-color" : "border-gray-300 bg-transparemt"}`}
              activeOpacity={0.8}
            >
              <Text>{t.icon}</Text>
              <Text
                className={`text-xs font-medium ${form.type === t.value ? "text-gray-800" : "text-gray-600"}`}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Follow-up Date  */}
      <Input
        label="Scheduled Date"
        value={new Date(followUpDate).toLocaleDateString()}
        onPress={() => setShowDate(true)}
        placeholder="DD/MM/YYYY"
      />
      {showDate && (
        <DateTimePicker
          value={followUpDate}
          mode="date"
          onChange={(_, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setFollowUpDate(selectedDate);
          }}
        />
      )}

      {/* Follow-up Time  */}
      <Input
        label="Scheduled Time"
        value={new Date(followUpTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        onPress={() => setShowTime(true)}
        placeholder="HH:MM"
      />
      {showTime && (
        <DateTimePicker
          value={followUpTime}
          mode="time"
          onChange={(_, selectedTime) => {
            setShowTime(false);
            if (selectedTime) SetfollowUpTime(selectedTime);
          }}
        />
      )}

      {/* Notes  */}
      <Input
        label="Note (optional)"
        value={form.note}
        onChangeText={(v) => setForm((f) => ({ ...f, note: v }))}
        placeholder="Add a note..."
        multiline
        numberOfLines={3}
      />
      <Button
        label="Schedule Follow-up"
        onPress={handleSubmit}
        loading={isLoading}
        fullWidth
        className="mt-2"
      />
    </View>
  );
};

export default FollowupForm;
