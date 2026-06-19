import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  CheckCircle2,
  XCircle,
  Save,
  ShieldCheck,
  ShieldOff,
  RotateCcw,
  Info,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUserStore } from '@/store/users.store';
import { getUser, updatePermissions } from '@/services/api/user.api';

import AppHeader from '@/components/ui/Header';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import UserRoleBadge from '@/components/users/UserRoleBadge';


// ─── Types ────────────────────────────────────────────────────────────────────

type PermKey =
  | 'CREATE_LEAD'
  | 'EDIT_LEAD'
  | 'DELETE_LEAD'
  | 'VIEW_ALL_LEADS'
  | 'MANAGE_USERS'
  | 'SEND_MESSAGES'
  | 'VIEW_REPORTS'
  | 'MANAGE_SETTINGS';

type PermState = Record<PermKey, boolean>;

// ─── Permission groups & metadata ─────────────────────────────────────────────

const PERMISSION_GROUPS: {
  group: string;
  color: string;
  items: { key: PermKey; label: string; desc: string; risk?: 'high' | 'medium' }[];
}[] = [
  {
    group: 'Leads',
    color: '#6366F1',
    items: [
      { key: 'CREATE_LEAD',    label: 'Create Lead',    desc: 'Add new leads to the system'         },
      { key: 'EDIT_LEAD',      label: 'Edit Lead',      desc: 'Modify existing lead details'        },
      { key: 'DELETE_LEAD',    label: 'Delete Lead',    desc: 'Permanently remove leads', risk: 'high' },
      { key: 'VIEW_ALL_LEADS', label: 'View All Leads', desc: "Access every agent's lead list", risk: 'medium' },
    ],
  },
  {
    group: 'Team',
    color: '#F59E0B',
    items: [
      { key: 'MANAGE_USERS', label: 'Manage Users', desc: 'Create, edit and deactivate agents', risk: 'high' },
    ],
  },
  {
    group: 'Communication',
    color: '#10B981',
    items: [
      { key: 'SEND_MESSAGES', label: 'Send Messages', desc: 'WhatsApp / SMS to leads & bulk send' },
    ],
  },
  {
    group: 'Analytics',
    color: '#3B82F6',
    items: [
      { key: 'VIEW_REPORTS', label: 'View Reports', desc: 'Access sales & performance reports' },
    ],
  },
  {
    group: 'Configuration',
    color: '#EC4899',
    items: [
      { key: 'MANAGE_SETTINGS', label: 'Manage Settings', desc: 'WhatsApp, SMS & app configuration', risk: 'high' },
    ],
  },
];

const ALL_KEYS: PermKey[] = [
  'CREATE_LEAD', 'EDIT_LEAD', 'DELETE_LEAD', 'VIEW_ALL_LEADS',
  'MANAGE_USERS', 'SEND_MESSAGES', 'VIEW_REPORTS', 'MANAGE_SETTINGS',
];

// ─── Role default permissions ─────────────────────────────────────────────────

const ROLE_DEFAULTS: Record<string, PermState> = {
  admin: {
    CREATE_LEAD: true, EDIT_LEAD: true, DELETE_LEAD: true, VIEW_ALL_LEADS: true,
    MANAGE_USERS: true, SEND_MESSAGES: true, VIEW_REPORTS: true, MANAGE_SETTINGS: true,
  },
  sub_admin: {
    CREATE_LEAD: true, EDIT_LEAD: true, DELETE_LEAD: false, VIEW_ALL_LEADS: true,
    MANAGE_USERS: false, SEND_MESSAGES: true, VIEW_REPORTS: true, MANAGE_SETTINGS: false,
  },
  agent: {
    CREATE_LEAD: true, EDIT_LEAD: true, DELETE_LEAD: false, VIEW_ALL_LEADS: false,
    MANAGE_USERS: false, SEND_MESSAGES: true, VIEW_REPORTS: false, MANAGE_SETTINGS: false,
  },
};

function buildInitialPerms(userPermissions: string[], role: string): PermState {
  // If the user already has custom permissions stored, use those;
  // otherwise fall back to their role's defaults.
  if (userPermissions && userPermissions.length > 0) {
    const base: PermState = {} as PermState;
    ALL_KEYS.forEach((k) => { base[k] = userPermissions.includes(k); });
    return base;
  }
  return { ...(ROLE_DEFAULTS[role] ?? ROLE_DEFAULTS.agent) };
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function UserRolesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateUser } = useUserStore();

  const [user, setUser]           = useState<any>(null);
  const [perms, setPerms]         = useState<PermState | null>(null);
  const [original, setOriginal]   = useState<PermState | null>(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // ── Fetch user ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data: res } = await getUser(id);
        const u = res.data;
        setUser(u);
        const initial = buildInitialPerms(u.permissions ?? [], u.role);
        setPerms(initial);
        setOriginal(initial);
      } catch {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isDirty = perms && original
    ? ALL_KEYS.some((k) => perms[k] !== original[k])
    : false;

  const enabledCount = perms ? ALL_KEYS.filter((k) => perms[k]).length : 0;

  const toggle = (key: PermKey) => {
    if (!perms) return;

    // Warn before granting high-risk permissions
    const allItems = PERMISSION_GROUPS.flatMap((g) => g.items);
    const item = allItems.find((i) => i.key === key);
    if (item?.risk === 'high' && !perms[key]) {
      Alert.alert(
        'High-Risk Permission',
        `Granting "${item.label}" gives this user significant control. Are you sure?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant', style: 'destructive', onPress: () => apply(key) },
        ],
      );
      return;
    }
    apply(key);
  };

  const apply = (key: PermKey) => {
    setPerms((prev) => prev ? { ...prev, [key]: !prev[key] } : prev);
  };

  const handleResetToRole = () => {
    if (!user) return;
    Alert.alert(
      'Reset to Role Defaults',
      `This will reset permissions to the default for "${user.role}". Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => {
            const defaults = { ...ROLE_DEFAULTS[user.role] };
            setPerms(defaults);
          },
        },
      ],
    );
  };

  const handleGrantAll = () => {
    const all: PermState = {} as PermState;
    ALL_KEYS.forEach((k) => { all[k] = true; });
    setPerms(all);
  };

  const handleRevokeAll = () => {
    Alert.alert(
      'Revoke All Permissions',
      'This will remove every permission from this user. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Revoke All',
          style: 'destructive',
          onPress: () => {
            const none: PermState = {} as PermState;
            ALL_KEYS.forEach((k) => { none[k] = false; });
            setPerms(none);
          },
        },
      ],
    );
  };

  const handleSave = async () => {
    if (!perms || !id) return;
    const enabled = ALL_KEYS.filter((k) => perms[k]);
    setSaving(true);
    try {
      const { data: res } = await updatePermissions(id, enabled);
      updateUser(id, { permissions: enabled } as any);
      setOriginal({ ...perms });
      Alert.alert('Saved', `Permissions updated for ${user?.name}.`);
    } catch {
      Alert.alert('Error', 'Failed to save permissions. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── Loading / Error states ─────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <AppHeader title="User Permissions" showBack />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366F1" />
          <Text className="text-slate-400 text-sm mt-3">Loading user…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (fetchError || !user || !perms) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <AppHeader title="User Permissions" showBack />
        <View className="flex-1 items-center justify-center px-8">
          <ShieldOff size={48} color="#475569" />
          <Text className="text-red-400 text-base font-semibold mt-4">Failed to load user</Text>
          <Text className="text-slate-500 text-sm mt-1 text-center">Please go back and try again.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <AppHeader
        title="User Permissions"
        showBack
        rightElement={
          isDirty ? (
            <TouchableOpacity onPress={handleResetToRole}>
              <Text className="text-slate-400 text-sm font-semibold">Reset</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* ── User identity card ─────────────────────────────────────────── */}
        <View className="mx-4 mt-4 mb-5 bg-slate-800 rounded-2xl border border-slate-700 p-4 flex-row items-center">
          <Avatar name={user.name} size={48} />
          <View className="flex-1 ml-3">
            <Text className="text-white font-bold text-base">{user.name}</Text>
            <Text className="text-slate-400 text-sm">{user.email}</Text>
            <View className="mt-1.5">
              <UserRoleBadge role={user.role} />
            </View>
          </View>
          {/* Permission count ring */}
          <View className="items-center">
            <View className="w-14 h-14 rounded-full border-2 border-indigo-500 items-center justify-center bg-indigo-500/10">
              <Text className="text-indigo-400 font-black text-lg leading-none">{enabledCount}</Text>
              <Text className="text-indigo-400 text-xs leading-none">/{ALL_KEYS.length}</Text>
            </View>
            <Text className="text-slate-500 text-xs mt-1">perms</Text>
          </View>
        </View>

        {/* ── Custom vs role notice ──────────────────────────────────────── */}
        {user.permissions?.length > 0 && (
          <View className="mx-4 mb-4 flex-row items-start bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-3 gap-x-2">
            <Info size={14} color="#F59E0B" style={{ marginTop: 1 }} />
            <Text className="text-amber-400 text-xs flex-1 leading-5">
              This user has <Text className="font-bold">custom permissions</Text> that override
              their role defaults. Changes here are saved per-user.
            </Text>
          </View>
        )}

        {/* ── Quick actions ──────────────────────────────────────────────── */}
        <View className="mx-4 mb-5 flex-row gap-x-2">
          <TouchableOpacity
            onPress={handleGrantAll}
            className="flex-1 flex-row items-center justify-center bg-indigo-600/20 border border-indigo-600/40 rounded-xl py-2.5 gap-x-1.5"
          >
            <ShieldCheck size={14} color="#6366F1" />
            <Text className="text-indigo-400 text-xs font-semibold">Grant All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRevokeAll}
            className="flex-1 flex-row items-center justify-center bg-red-500/10 border border-red-500/25 rounded-xl py-2.5 gap-x-1.5"
          >
            <ShieldOff size={14} color="#EF4444" />
            <Text className="text-red-400 text-xs font-semibold">Revoke All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResetToRole}
            className="flex-1 flex-row items-center justify-center bg-slate-700 border border-slate-600 rounded-xl py-2.5 gap-x-1.5"
          >
            <RotateCcw size={14} color="#94A3B8" />
            <Text className="text-slate-400 text-xs font-semibold">Role Default</Text>
          </TouchableOpacity>
        </View>

        {/* ── Permission groups ──────────────────────────────────────────── */}
        <View className="px-4 gap-y-4 mb-6">
          {PERMISSION_GROUPS.map(({ group, color, items }) => {
            const groupEnabled = items.filter((i) => perms[i.key]).length;
            return (
              <View key={group}>
                {/* Group header with mini count */}
                <View className="flex-row items-center justify-between mb-2 px-1">
                  <View className="flex-row items-center gap-x-2">
                    <View className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <Text className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                      {group}
                    </Text>
                  </View>
                  <Text className="text-slate-600 text-xs">
                    {groupEnabled}/{items.length} on
                  </Text>
                </View>

                <View className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                  {items.map(({ key, label, desc, risk }, index) => {
                    const isEnabled = perms[key];
                    const isLast    = index === items.length - 1;

                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => toggle(key)}
                        activeOpacity={0.7}
                        className={`flex-row items-center px-4 py-4 ${
                          !isLast ? 'border-b border-slate-700/80' : ''
                        } ${isEnabled ? 'bg-slate-800' : 'bg-slate-800/40'}`}
                      >
                        {/* Toggle icon */}
                        <View
                          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                          style={{
                            backgroundColor: isEnabled ? `${color}20` : '#1E293B',
                          }}
                        >
                          {isEnabled ? (
                            <CheckCircle2 size={20} color={color} />
                          ) : (
                            <XCircle size={20} color="#334155" />
                          )}
                        </View>

                        {/* Label + description */}
                        <View className="flex-1">
                          <View className="flex-row items-center gap-x-2">
                            <Text
                              className={`text-sm font-semibold ${
                                isEnabled ? 'text-white' : 'text-slate-500'
                              }`}
                            >
                              {label}
                            </Text>
                            {risk === 'high' && (
                              <View className="bg-red-500/15 px-1.5 py-0.5 rounded-md">
                                <Text className="text-red-400 text-xs font-semibold">High risk</Text>
                              </View>
                            )}
                            {risk === 'medium' && (
                              <View className="bg-amber-500/15 px-1.5 py-0.5 rounded-md">
                                <Text className="text-amber-400 text-xs font-semibold">Sensitive</Text>
                              </View>
                            )}
                          </View>
                          <Text className="text-slate-500 text-xs mt-0.5">{desc}</Text>
                        </View>

                        {/* Pill toggle */}
                        <View
                          className={`ml-3 px-3 py-1 rounded-full ${
                            isEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                          }`}
                        >
                          <Text
                            className={`text-xs font-bold ${
                              isEnabled ? 'text-white' : 'text-slate-500'
                            }`}
                          >
                            {isEnabled ? 'ON' : 'OFF'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Changed permissions diff summary ───────────────────────────── */}
        {isDirty && original && (
          <View className="mx-4 mb-5 bg-slate-800 rounded-2xl border border-slate-700 p-4">
            <Text className="text-white text-sm font-semibold mb-3">Unsaved Changes</Text>
            {ALL_KEYS.filter((k) => perms[k] !== original[k]).map((k) => {
              const allItems = PERMISSION_GROUPS.flatMap((g) => g.items);
              const item = allItems.find((i) => i.key === k);
              const granting = perms[k];
              return (
                <View key={k} className="flex-row items-center gap-x-2 mb-2">
                  <View
                    className="w-5 h-5 rounded-full items-center justify-center"
                    style={{ backgroundColor: granting ? '#10B98120' : '#EF444420' }}
                  >
                    {granting
                      ? <CheckCircle2 size={12} color="#10B981" />
                      : <XCircle      size={12} color="#EF4444" />}
                  </View>
                  <Text className="text-slate-300 text-sm flex-1">{item?.label ?? k}</Text>
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: granting ? '#10B981' : '#EF4444' }}
                  >
                    {granting ? '+ Granted' : '− Revoked'}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* ── Save ──────────────────────────────────────────────────────── */}
        <View className="px-4 mb-10">
          <Button
            label="Save Permissions"
            onPress={handleSave}
            loading={saving}
            disabled={!isDirty}
            icon={<Save size={16} color="#fff" />}
            fullWidth
          />
          {!isDirty && (
            <Text className="text-slate-600 text-xs text-center mt-2">
              No unsaved changes
            </Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}