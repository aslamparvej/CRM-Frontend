import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Send, Mail } from "lucide-react-native";

import { forgotPassword } from "@/services/api/auth.api";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ForgotPasswordScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (error: any) {
      setError(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 pt-14 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-amber-600 w-10 h-10 rounded-xl items-center justify-center mb-6"
          >
            <ArrowLeft size={20} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-800 text-3xl font-black mb-2">
            Reset password
          </Text>
          <Text className="text-slate-400 text-base">
            Enter your email and we&apos;ll send you an OTP
          </Text>
        </View>
        <View className="px-6 flex-1">
          {sent ? (
            <View className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-5 items-center mt-4">
              <View className="bg-emerald-500/20 p-4 rounded-full mb-3">
                <Send size={28} color="#10B981" />
              </View>
              <Text className="text-emerald-400 text-lg font-bold mb-1">
                Check your email
              </Text>
              <Text className="text-slate-400 text-sm text-center">
                We&apos;ve sent an OTP to {email}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(auth)/verify-otp",
                    params: { email },
                  })
                }
                className="mt-4 bg-emerald-500 px-6 py-3 rounded-xl"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold">Enter OTP</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {error ? (
                <View className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
                  <Text className="text-red-400 text-sm">{error}</Text>
                </View>
              ) : null}
              <Input
                label="Email Address"
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setError("");
                }}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={18} color="#64748B" />}
                error={error}
              />
              <Button
                label="Send OTP"
                onPress={handleSubmit}
                loading={isLoading}
                fullWidth
                className="mt-2"
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
