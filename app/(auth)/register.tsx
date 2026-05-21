import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Link, router } from "expo-router";
import { useState } from "react";
import { registerUser } from "@/services/api/auth.api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      role: "",
    };

    if (name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (role.trim() === "") {
      newErrors.role = "Role is required";
      isValid = false;
    }

    setError(newErrors);

    return isValid;
  };

  const handleRegister = async () => {
    try {
      if (!validate()) return;
      setLoading(true);

      const response = await registerUser({name, email, password, role});
      console.log(response);

      Alert.alert(
        "Success",
        "User registered successfully"
      );

       router.replace("/login");
    } catch (error) {
      alert(`Error to register user ${error}`);
      console.log("Error to register user", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 px-8 py-4"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex justify-center items-center">
        <Image
          source={require("@/assets/images/dev-center-logo.png")}
          className="w-1/2"
          resizeMode="contain"
        />
      </View>

      <View className="mb-8">
        <Text className="text-3xl font-bold text-gray-800">Sign up</Text>
        <Text className="text-lg text-gray-500">
          Register to manage your team.
        </Text>
      </View>

      {/* Input fields  */}
      <View className="mb-4">
        <Text className="text-xl text-gray-600 mb-1">Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="px-3 py-4 border border-gray-400 rounded-lg focus:border-primary-color"
        />
        {error.name && (
          <Text className="text-sm text-red-500">{error.name}</Text>
        )}
      </View>
      <View className="mb-4">
        <Text className="text-xl text-gray-600 mb-1">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="px-3 py-4 border border-gray-400 rounded-lg focus:border-primary-color"
        />
        {error.email && (
          <Text className="text-sm text-red-500">{error.email}</Text>
        )}
      </View>
      <View className="mb-4">
        <Text className="text-xl text-gray-600 mb-1">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="px-3 py-4 border border-gray-400 rounded-lg focus:border-primary-color"
          placeholder=""
        />
        {error.password && (
          <Text className="text-sm text-red-500">{error.password}</Text>
        )}
      </View>
      <View className="mb-8">
        <Text className="text-xl text-gray-600 mb-1">Role</Text>
        <View className="border border-gray-400 rounded-lg">
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Sub Admin" value="sub-admin" />
            <Picker.Item label="Agent" value="agent" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        className="py-4 px-3 mb-4 rounded-lg items-center bg-primary-color hover:text-primary-color disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Text className="text-lg text-white font-medium">
          {loading ? "Submiting..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-500">Already have an account? </Text>
        <Link href="/login">
          <Text className="text-primary-color font-semibold">{}Sign In</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default Register;
