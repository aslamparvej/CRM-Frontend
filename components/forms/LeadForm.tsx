import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Phone, User, Mail, Tag, Radio, CircleDot } from "lucide-react-native";

import { useUserStore } from "@/store/users.store";
import { getUsers } from "@/services/api/user.api";
import { LEAD_PRIORITIES } from "@/constants/status";
import { DEFAULT_CATEGORIES } from "@/constants/categories";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";

interface LeadFormProps {
  initialData?: Partial<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  executive?: { id: string; name: string }[];
}

const LeadForm: React.FC<LeadFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  executive,
}) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    alternatePhone: initialData?.alternatePhone || "",
    address: initialData?.address || "",
    status: initialData?.status || "new",
    priority: initialData?.priority || "medium",
    category: initialData?.category || DEFAULT_CATEGORIES[1],
    source: initialData?.source || "manual",
    notes: initialData?.notes || null,
    assignedTo: initialData?.assignedTo || null,
  });

  const { users, setUsers, setLoading } = useUserStore();

  useEffect(()=>{
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.log("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Debugging starts ---> Lead Form", users);

  const update = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const SectionTitle = ({ title }: { title: string }) => (
    <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider my-2">
      {title}
    </Text>
  );

  const SelectChips = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: { value: string; label: string; color?: string }[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <View className="mb-4">
      <Text className="text-slate-400 text-sm font-medium mb-2">{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onChange(opt.value)}
              className={`px-3 py-1.5 rounded-xl border text-gray-800 ${value === opt.value ? "border-primary-color" : "border-gray-300"}`}
              style={{
                backgroundColor:
                  value === opt.value ? "rgb(245,158,11)" : "transparent",
              }}
              activeOpacity={0.8}
            >
              {opt.color && (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: opt.color,
                    }}
                  />
                  <Text
                    style={{
                      color: value === opt.value ? "#000" : "#000",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    {opt.label}
                  </Text>
                </View>
              )}
              {!opt.color && (
                <Text
                  style={{
                    color: value === opt.value ? "#818CF8" : "#94A3B8",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  {opt.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <SectionTitle title="Contact Info" />
      <Input
        label="Full Name *"
        value={form.name}
        onChangeText={(v) => update("name", v)}
        placeholder="Lead's full name"
        leftIcon={<User size={18} color="#64748B" />}
      />
      <Input
        label="Phone *"
        value={form.phone}
        onChangeText={(v) => update("phone", v)}
        placeholder="+1 234 567 8900"
        keyboardType="phone-pad"
        leftIcon={<Phone size={18} color="#64748B" />}
      />
      <Input
        label="Alternate Phone"
        value={form.alternatePhone}
        onChangeText={(v) => update("alternatePhone", v)}
        placeholder="Optional"
        keyboardType="phone-pad"
        leftIcon={<Phone size={18} color="#64748B" />}
      />
      <Input
        label="Email"
        value={form.email}
        onChangeText={(v) => update("email", v)}
        placeholder="lead@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<Mail size={18} color="#64748B" />}
      />
      <Input
        label="Address"
        value={form.address}
        onChangeText={(v) => update("address", v)}
        placeholder="Full address"
        multiline
      />

      <SectionTitle title="Lead Details" />
      <Input
        label="Status"
        value={form.status}
        onChangeText={(v) => update("status", v)}
        placeholder="e.g. New, Contacted, Qualified"
        leftIcon={<CircleDot size={18} color="#64748B" />}
      />
      <SelectChips
        label="Priority"
        options={LEAD_PRIORITIES}
        value={form.priority}
        onChange={(v) => update("priority", v)}
      />
      <Input
        label="Category"
        value={form.category}
        onChangeText={(v) => update("category", v)}
        placeholder="e.g. Finance, Insurance"
        leftIcon={<Tag size={18} color="#64748B" />}
      />
      <Input
        label="Source"
        value={form.source}
        onChangeText={(v) => update("source", v)}
        placeholder="e.g. Website, Referral"
        leftIcon={<Radio size={18} color="#64748B" />}
      />
      {/* <Input
        label="Notes"
        value={form.notes}
        onChangeText={(v) => update("notes", v)}
        placeholder="Add initial notes..."
        multiline
        numberOfLines={3}
      /> */}

      <Select
        label="Assign To"
        value={form.assignedTo || ""}
        options={users.map((user) => ({ value: user._id, label: user.name }))}
        onValueChange={(v) => update("assignedTo", v)}
      />

      <Button
        label={initialData?.id ? "Update Lead" : "Create Lead"}
        onPress={() => onSubmit(form)}
        loading={isLoading}
        fullWidth
        className="mt-4 mb-8"
      />
    </ScrollView>
  );
};

export default LeadForm;
