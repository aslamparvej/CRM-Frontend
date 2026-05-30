import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { User, Mail, Phone, Lock } from "lucide-react-native";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";

import Input from "../ui/Input";
import Button from "../ui/Button";

interface UserFormProps {
  initialData?: any;
  onSubmit: (d: any) => void;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "agent",
    agentType: initialData?.agentType || "",
    password: "",
  });


  const update = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));
  const roles = [
    { value: "agent", label: "Agent" },
    { value: "sub-admin", label: "Sub Admin" },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      {/* Name */}
      <Input
        label="Full Name *"
        value={form.name}
        onChangeText={(v) => update("name", v)}
        placeholder="User's full name"
        leftIcon={<User size={18} color="#64748B" />}
      />
      {/* EMail  */}
      <Input
        label="Email *"
        value={form.email}
        onChangeText={(v) => update("email", v)}
        placeholder="user@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={<Mail size={18} color="#64748B" />}
      />
      {/* Phoone */}
      <Input
        label="Phone *"
        value={form.phone}
        onChangeText={(v) => update("phone", v)}
        placeholder="+91 978 567 8900"
        keyboardType="phone-pad"
        leftIcon={<Phone size={18} color="#64748B" />}
      />

      {/* Roles  */}
      <Text className="text-slate-400 text-sm font-medium mb-2">Role</Text>
      <View className="border rounded-lg mb-4 border-gray-300 justify-center">
        <Picker
          selectedValue={form.role}
          onValueChange={(itemValue) => update("role", itemValue)}
          style={{
            height: 60,
            marginVertical: -8,
          }}
        >
          {roles.map((r) => (
            <Picker.Item key={r.value} label={r.label} value={r.value} />
          ))}
        </Picker>
      </View>

      {/* If role is agent then show agent type   */}
      {form.role === "agent" && (
        <Input
          label="Agent Type *"
          value={form.agentType}
          onChangeText={(v) => update("agentType", v)}
          placeholder="Enter agent type"
        />
      )}

      {/* Check Add or Edit User */}
      {!initialData?.id && (
        <>
          <Input
            label="Password *"
            value={form.password}
            onChangeText={(v) => update("password", v)}
            secureTextEntry
            placeholder="Min 8 characters"
            leftIcon={<Lock size={18} color="#64748B" />}
          />
          {/* <Input
            label="Confirm Password *"
            value={form.confirmPassword}
            onChangeText={(v) => update("confirmPassword", v)}
            secureTextEntry
            placeholder="Re-enter password"
            leftIcon={<Lock size={18} color="#64748B" />}
          /> */}
        </>
      )}

      <Button
        label={initialData?.id ? "Update User" : "Create User"}
        onPress={() => onSubmit(form)}
        loading={isLoading}
        fullWidth
        className="mt-4 mb-8"
      />
    </ScrollView>
  );
};

export default UserForm;
