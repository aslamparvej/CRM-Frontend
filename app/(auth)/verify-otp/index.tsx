import React, { useRef, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { verifyOtp } from "@/services/api/auth.api";

import Button from "@/components/ui/Button";

const VerifyOTPScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/\D/g, "").slice(-1);
    setOtp(newOtp);

    if (text && index < 5) inputs.current[index + 1]?.focus();
    if (!text && index > 0) inputs.current[index - 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Enter all 6 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOtp(email, code);
      console.log(res);
      // router.replace("/(auth)/reset-password");
      router.replace({
        pathname: "/(auth)/reset-password",
        params: { resetToken: res.resetToken, email, otp: code },
      });
    } catch (error: any) {
      setError(error?.response?.data?.message || "Invalid OTP");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100"
    >
      <View className="px-6 pt-14 pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-amber-600 w-10 h-10 rounded-xl items-center justify-center mb-6"
        >
          <ArrowLeft size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-800 text-3xl font-black mb-2">
          Verify OTP
        </Text>
        <Text className="text-gray-600 text-base">
          Enter the 6-digit code sent to{"\n"}
          {email || "your email"}
        </Text>
      </View>
      <View className="px-6">
        {error ? (
          <View className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
            <Text className="text-red-400 text-sm">{error}</Text>
          </View>
        ) : null}
        <View className="flex-row gap-3 mb-8 justify-center">
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
              value={digit}
              onChangeText={(t) => handleChange(t, i)}
              keyboardType="numeric"
              maxLength={1}
              className={`w-12 h-14 bg-gray-100 rounded-xl text-center text-gray-700 text-xl font-bold border ${digit ? "border-amber-500" : "border-gray-300"}`}
            />
          ))}
        </View>
        <Button
          label="Verify OTP"
          onPress={handleVerify}
          loading={isLoading}
          fullWidth
        />
        <TouchableOpacity className="mt-4 items-center">
          <Text className="text-gray-600 text-sm">
            Didn&apos;t receive?{" "}
            <Text className="text-amber-500 font-semibold">Resend OTP</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTPScreen;
