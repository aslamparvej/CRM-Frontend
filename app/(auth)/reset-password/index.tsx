import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, KeyRound, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react-native";

import { resetPassword } from "@/services/api/auth.api";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// ─── Password strength helpers ────────────────────────────────────────────────

type Strength = 0 | 1 | 2 | 3 | 4;

function getStrength(pwd: string): Strength {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score as Strength;
}

const STRENGTH_CONFIG: Record<
  Strength,
  { label: string; color: string; bars: number }
> = {
  0: { label: "", color: "#334155", bars: 0 },
  1: { label: "Weak", color: "#EF4444", bars: 1 },
  2: { label: "Fair", color: "#F59E0B", bars: 2 },
  3: { label: "Good", color: "#3B82F6", bars: 3 },
  4: { label: "Strong", color: "#10B981", bars: 4 },
};

const RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  {
    label: "One special character",
    test: (p: string) => /[^A-Za-z0-9]/.test(p),
  },
];

const ResetPaswordScreen = () => {
  const router = useRouter();
  const { email = "", otp = "", resetToken } = useLocalSearchParams<{
    email?: string;
    otp?: string;
    resetToken?: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getStrength(password);
  const strengthCfg = STRENGTH_CONFIG[strength];

  const validate = (): string | null => {
    if (!password) return "Please enter a new password.";
    if (strength < 2) return "Password is too weak. Follow the rules below.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await resetPassword({ email, otp, password, resetToken });
      setSuccess(true);
      console.log(res);
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

    // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center px-8">
        <View className="bg-emerald-500/15 p-7 rounded-full mb-6">
          <ShieldCheck size={60} color="#10B981" />
        </View>
        <Text className="text-white text-2xl font-black mb-2 text-center">
          Password Updated!
        </Text>
        <Text className="text-slate-400 text-base text-center mb-10 leading-6">
          Your password has been changed successfully.{'\n'}You can now log in with your new password.
        </Text>
        <Button
          label="Back to Login"
          onPress={() => router.replace('/(auth)/login')}
          fullWidth
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View className="px-6 pt-14 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-amber-600 w-10 h-10 rounded-xl items-center justify-center mb-6"
          >
            <ArrowLeft size={20} color="#000" />
          </TouchableOpacity>

          <View className="bg-indigo-500/15 self-start p-4 rounded-2xl mb-5">
            <KeyRound size={32} color="#6366F1" />
          </View>

          <Text className="text-gray-800 text-3xl font-black mb-2">
            New password
          </Text>
          <Text className="text-gray-600 text-base leading-6">
            {email
              ? `Create a new password for\n${email}`
              : "Create a strong new password for your account."}
          </Text>
        </View>

        {/* ── Form ────────────────────────────────────────────────────────── */}
        <View className="px-6 flex-1">
          {/* Error banner */}
          {!!error && (
            <View className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mb-5">
              <Text className="text-red-400 text-sm">{error}</Text>
            </View>
          )}

          {/* New password */}
          <Input
            label="New Password"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              setError("");
            }}
            placeholder="Create a strong password"
            secureTextEntry={!showPwd}
            autoCapitalize="none"
            leftIcon={<Lock size={16} color="#64748B" />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPwd((v) => !v)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {showPwd ? (
                  <EyeOff size={16} color="#64748B" />
                ) : (
                  <Eye size={16} color="#64748B" />
                )}
              </TouchableOpacity>
            }
          />

          {/* Strength meter */}
          {password.length > 0 && (
            <View className="mt-3 mb-1">
              <View className="flex-row gap-x-1.5 mb-1.5">
                {[1, 2, 3, 4].map((bar) => (
                  <View
                    key={bar}
                    className="flex-1 h-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        bar <= strengthCfg.bars ? strengthCfg.color : "#dddddd",
                    }}
                  />
                ))}
              </View>
              {strength > 0 && (
                <Text
                  className="text-xs font-semibold"
                  style={{ color: strengthCfg.color }}
                >
                  {strengthCfg.label}
                </Text>
              )}
            </View>
          )}

          {/* Password rules checklist */}
          {password.length > 0 && (
            <View className="bg-gray-200 rounded-xl px-4 py-3 mb-4 mt-2 border border-gray-300 gap-y-2">
              {RULES.map((rule) => {
                const passed = rule.test(password);
                return (
                  <View
                    key={rule.label}
                    className="flex-row items-center gap-x-2"
                  >
                    <View
                      className="w-4 h-4 rounded-full items-center justify-center"
                      style={{
                        backgroundColor: passed ? "#10B98120" : "#dddddd",
                      }}
                    >
                      <View
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: passed ? "#10B981" : "#334155",
                        }}
                      />
                    </View>
                    <Text
                      className="text-xs"
                      style={{ color: passed ? "#94A3B8" : "#475569" }}
                    >
                      {rule.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* Confirm password */}
          <View className={password.length > 0 ? "" : "mt-4"}>
            <Input
              label="Confirm Password"
              value={confirm}
              onChangeText={(v) => {
                setConfirm(v);
                setError("");
              }}
              placeholder="Re-enter your password"
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
              leftIcon={<Lock size={16} color="#64748B" />}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowConfirm((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  {showConfirm ? (
                    <EyeOff size={16} color="#64748B" />
                  ) : (
                    <Eye size={16} color="#64748B" />
                  )}
                </TouchableOpacity>
              }
              // inline match hint
              error={
                confirm.length > 0 && confirm !== password
                  ? "Passwords do not match"
                  : ""
              }
            />
          </View>

          {/* Match success hint */}
          {confirm.length > 0 && confirm === password && (
            <Text className="text-emerald-400 text-xs mt-1 ml-1">
              ✓ Passwords match
            </Text>
          )}

          {/* Submit */}
          <Button
            label="Set New Password"
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            className="mt-6"
          />

          {/* Back to login */}
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login")}
            className="mt-4 mb-10 items-center"
          >
            <Text className="text-gray-600 text-sm">
              Remembered it?{" "}
              <Text className="text-amber-500 font-semibold">Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPaswordScreen;
