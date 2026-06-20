import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

import { useAuthStore } from "@/store/auth.store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login, isLoading, error, setError, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        setError("Please enter a valid email address");
        return;
      }

      if (password.trim() === "") {
        setError("Please enter valid password");
        return;
      }

      const success = await login(email, password);

      if (success) {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log("Error in login handler", error);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <View className="flex-1  px-8 py-4">
        <View className="flex justify-center items-center">
          <Image
            source={require("@/assets/images/dev-center-logo.png")}
            className="w-1/2"
            resizeMode="contain"
          />
        </View>

        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800">Login</Text>
          <Text className="text-lg text-gray-500">Manage your team.</Text>
        </View>

        {error && (
          <View className="mb-4">
            <Text className="text-red-500">{error}</Text>
          </View>
        )}

        {/* Input fields  */}
        <View className="mb-4">
          <Text className="text-xl text-gray-600 mb-1">Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            className="px-3 py-4 border border-gray-400 rounded-lg focus:border-primary-color"
          />
        </View>
        <View className="mb-8">
          <Text className="text-xl text-gray-600 mb-1">Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            className="px-3 py-4 border border-gray-400 rounded-lg focus:border-primary-color"
          />
          <TouchableOpacity
            className="absolute right-4 top-1/2"
            style={{ transform: [{ translateY: -10 }] }}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View className="flex items-end">
            <Text className="text-sm mt-1 text-red-500">
              <Link href="/forgot-password">Forgot password</Link>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          className="py-4 px-3 mb-4 rounded-lg items-center bg-primary-color hover:text-primary-color disabled:opacity-50"
          activeOpacity={0.7}
        >
          <Text className="text-lg text-white font-medium">
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center hidden">
          <Text className="text-gray-500">Don&apos;t have an account? </Text>
          <Link href="/register">
            <Text className="text-primary-color font-semibold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
