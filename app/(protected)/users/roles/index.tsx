import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShieldCheck, UserCheck, Users, Info, CheckCircle2, XCircle, Save } from "lucide-react-native";

import { PERMISSIONS } from "@/utils/permissions";

import Button from "@/components/ui/Button";
import AppHeader from "@/components/ui/Header";


type Role = "admin" | "sub_admin" | "executive";
type PermKey = keyof typeof PERMISSIONS;

const PERMISSION_GROUPS: {
  group: string;
  items: { key: PermKey; label: string; desc: string }[];
}[] = [
  {
    group: "Leads",
    items: [
      {
        key: "CREATE_LEAD",
        label: "Create Lead",
        desc: "Add new leads to the system",
      },
      {
        key: "EDIT_LEAD",
        label: "Edit Lead",
        desc: "Modify existing lead details",
      },
      {
        key: "DELETE_LEAD",
        label: "Delete Lead",
        desc: "Permanently remove leads",
      },
      {
        key: "VIEW_ALL_LEADS",
        label: "View All Leads",
        desc: "Access every agent's lead list",
      },
    ],
  },
  {
    group: "Team",
    items: [
      {
        key: "MANAGE_USERS",
        label: "Manage Users",
        desc: "Create, edit and deactivate agents",
      },
    ],
  },
  {
    group: "Communication",
    items: [
      {
        key: "SEND_MESSAGES",
        label: "Send Messages",
        desc: "WhatsApp / SMS to leads & bulk send",
      },
    ],
  },
  {
    group: "Analytics",
    items: [
      {
        key: "VIEW_REPORTS",
        label: "View Reports",
        desc: "Access sales & performance reports",
      },
    ],
  },
  {
    group: "Configuration",
    items: [
      {
        key: "MANAGE_SETTINGS",
        label: "Manage Settings",
        desc: "WhatsApp, SMS & app configuration",
      },
    ],
  },
];

const DEFAULT_MATRIX: Record<Role, Record<PermKey, boolean>> = {
  admin: {
    CREATE_LEAD: true,
    EDIT_LEAD: true,
    DELETE_LEAD: true,
    VIEW_ALL_LEADS: true,
    MANAGE_USERS: true,
    VIEW_REPORTS: true,
    SEND_MESSAGES: true,
    MANAGE_SETTINGS: true,
  },
  sub_admin: {
    CREATE_LEAD: true,
    EDIT_LEAD: true,
    DELETE_LEAD: false,
    VIEW_ALL_LEADS: true,
    MANAGE_USERS: false,
    VIEW_REPORTS: true,
    SEND_MESSAGES: true,
    MANAGE_SETTINGS: false,
  },
  executive: {
    CREATE_LEAD: true,
    EDIT_LEAD: true,
    DELETE_LEAD: false,
    VIEW_ALL_LEADS: false,
    MANAGE_USERS: false,
    VIEW_REPORTS: false,
    SEND_MESSAGES: true,
    MANAGE_SETTINGS: false,
  },
};

const ROLE_CONFIG: Record<
  Role,
  { label: string; icon: any; color: string; bg: string }
> = {
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    color: "#6366F1",
    bg: "bg-indigo-500/20",
  },
  sub_admin: {
    label: "Sub Admin",
    icon: UserCheck,
    color: "#F59E0B",
    bg: "bg-amber-500/20",
  },
  executive: {
    label: "Agent",
    icon: Users,
    color: "#10B981",
    bg: "bg-emerald-500/20",
  },
};

const ALL_ROLES: Role[] = ["admin", "sub_admin", "executive"];

const RolesScreen = () => {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);
  const [selectedRole, setSelectedRole] = useState<Role>("sub_admin");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const toggle = (role: Role, key: PermKey) => {
    // Admin always has all permissions — guard
    if (role === "admin") {
      Alert.alert(
        "Admin Role",
        "Admin always has full access and cannot be restricted.",
      );
      return;
    }
    setMatrix((prev) => ({
      ...prev,
      [role]: { ...prev[role], [key]: !prev[role][key] },
    }));
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    setSaving(false);
    setDirty(false);
    Alert.alert("Saved", "Role permissions updated successfully.");
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Permissions",
      "Restore all roles to their default permissions?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            setMatrix(DEFAULT_MATRIX);
            setDirty(false);
          },
        },
      ],
    );
  };

  // Count enabled perms for a role
  const enabledCount = (role: Role) =>
    Object.values(matrix[role]).filter(Boolean).length;

  const totalPerms = Object.keys(PERMISSIONS).length;

  const cfg = ROLE_CONFIG[selectedRole];
  const RoleIcon = cfg.icon;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="Roles & Permissions"
        showBack
        rightElement={
          dirty ? (
            <TouchableOpacity onPress={handleReset}>
              <Text className="text-slate-400 text-sm font-semibold">
                Reset
              </Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ── Role selector cards ─────────────────────────────────────────── */}
        <View className="px-4 pt-4 mb-5">
          <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Select Role to Configure
          </Text>
          <View className="flex-row gap-x-3">
            {ALL_ROLES.map((role) => {
              const rc = ROLE_CONFIG[role];
              const Icon = rc.icon;
              const isSelected = selectedRole === role;
              return (
                <TouchableOpacity
                  key={role}
                  onPress={() => setSelectedRole(role)}
                  activeOpacity={0.75}
                  className={`flex-1 rounded-2xl p-3 border items-center ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-600/15"
                      : "border-slate-700 bg-slate-800"
                  }`}
                >
                  <View className={`${rc.bg} p-2 rounded-xl mb-2`}>
                    <Icon size={18} color={rc.color} />
                  </View>
                  <Text
                    className={`text-xs font-bold text-center ${
                      isSelected ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {rc.label}
                  </Text>
                  <Text
                    className={`text-xs mt-0.5 ${
                      isSelected ? "text-indigo-400" : "text-slate-600"
                    }`}
                  >
                    {enabledCount(role)}/{totalPerms}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Selected role summary banner ────────────────────────────────── */}
        <View className="mx-4 mb-5 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 flex-row items-center">
          <View className={`${cfg.bg} p-2.5 rounded-xl mr-3`}>
            <RoleIcon size={20} color={cfg.color} />
          </View>
          <View className="flex-1">
            <Text className="text-white font-semibold text-sm">
              {cfg.label}
            </Text>
            <Text className="text-slate-400 text-xs mt-0.5">
              {enabledCount(selectedRole)} of {totalPerms} permissions enabled
            </Text>
          </View>
          {selectedRole === "admin" && (
            <View className="flex-row items-center bg-indigo-500/20 px-2 py-1 rounded-lg">
              <Info size={12} color="#6366F1" />
              <Text className="text-indigo-400 text-xs ml-1">Full access</Text>
            </View>
          )}
        </View>

        {/* ── Permission group list ───────────────────────────────────────── */}
        <View className="px-4 gap-y-4 mb-6">
          {PERMISSION_GROUPS.map(({ group, items }) => (
            <View key={group}>
              {/* Group header */}
              <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2 px-1">
                {group}
              </Text>

              <View className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                {items.map(({ key, label, desc }, index) => {
                  const isEnabled = matrix[selectedRole][key];
                  const isAdmin = selectedRole === "admin";
                  const isLast = index === items.length - 1;

                  return (
                    <TouchableOpacity
                      key={String(key)}
                      onPress={() => toggle(selectedRole, key)}
                      activeOpacity={isAdmin ? 1 : 0.7}
                      className={`flex-row items-center px-4 py-4 ${
                        !isLast ? "border-b border-slate-700" : ""
                      }`}
                    >
                      {/* Toggle indicator */}
                      <View
                        className={`w-9 h-9 rounded-xl items-center justify-center mr-4 ${
                          isEnabled ? "bg-indigo-500/20" : "bg-slate-700/60"
                        }`}
                      >
                        {isEnabled ? (
                          <CheckCircle2 size={20} color="#6366F1" />
                        ) : (
                          <XCircle size={20} color="#475569" />
                        )}
                      </View>

                      {/* Label + description */}
                      <View className="flex-1">
                        <Text
                          className={`text-sm font-semibold ${
                            isEnabled ? "text-white" : "text-slate-500"
                          }`}
                        >
                          {label}
                        </Text>
                        <Text className="text-slate-500 text-xs mt-0.5">
                          {desc}
                        </Text>
                      </View>

                      {/* Role comparison pills — all 3 roles at a glance */}
                      <View className="flex-row gap-x-1 ml-2">
                        {ALL_ROLES.map((r) => {
                          const on = matrix[r][key];
                          const rc2 = ROLE_CONFIG[r];
                          return (
                            <View
                              key={r}
                              className="w-5 h-5 rounded-full items-center justify-center"
                              style={{
                                backgroundColor: on
                                  ? `${rc2.color}25`
                                  : "#1E293B",
                              }}
                            >
                              <View
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: on ? rc2.color : "#334155",
                                }}
                              />
                            </View>
                          );
                        })}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        {/* ── Comparison legend ───────────────────────────────────────────── */}
        <View className="mx-4 mb-6 bg-slate-800 rounded-2xl border border-slate-700 px-4 py-3">
          <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
            Role Comparison Legend
          </Text>
          <View className="flex-row justify-around">
            {ALL_ROLES.map((r) => {
              const rc2 = ROLE_CONFIG[r];
              return (
                <View key={r} className="items-center gap-y-1">
                  <View
                    className="w-5 h-5 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${rc2.color}25` }}
                  >
                    <View
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: rc2.color }}
                    />
                  </View>
                  <Text className="text-slate-400 text-xs">{rc2.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Save button ─────────────────────────────────────────────────── */}
        <View className="px-4 mb-10">
          <Button
            label="Save Permissions"
            onPress={handleSave}
            loading={saving}
            icon={<Save size={16} color="#fff" />}
            fullWidth
            disabled={!dirty}
          />
          {!dirty && (
            <Text className="text-slate-600 text-xs text-center mt-2">
              No unsaved changes
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RolesScreen;
