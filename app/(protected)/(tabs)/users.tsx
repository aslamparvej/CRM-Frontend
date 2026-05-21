import { useRouter } from "expo-router";
import { Plus, Search, Filter } from "lucide-react-native";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "@/components/ui/Header";

const USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    phone: "+91 9876543210",
  },
  {
    id: "2",
    name: "Sarah Khan",
    email: "sarah@example.com",
    role: "Sub-admin",
    phone: "+91 9876543211",
  },
  {
    id: "3",
    name: "Michael Roy",
    email: "michael@example.com",
    role: "Agent",
    phone: "+91 9876543212",
  },
];

export default function UsersPage() {
  const router = useRouter();

  const renderUserCard = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push(`/(protected)/users/details/${item.id}`)}
        className="mb-4 rounded-2xl bg-white p-4 shadow-sm"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">{item.name}</Text>

            <Text className="mt-1 text-sm text-gray-500">{item.email}</Text>

            <Text className="mt-1 text-sm text-gray-500">{item.phone}</Text>
          </View>

          <View className="rounded-full bg-blue-100 px-3 py-1">
            <Text className="text-xs font-semibold text-blue-700">
              {item.role}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-end">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/(protected)/users/edit/${item.id}`)}
            className="rounded-xl bg-gray-100 px-4 py-2"
          >
            <Text className="font-medium text-gray-700">Edit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRightElement = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/(protected)/users/create")}
        className="p-2 items-center justify-center rounded-xl bg-blue-600"
      >
        <Plus color="#FFFFFF" size={20} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Users" subtitle="Manage admins, sub-admins & agents" showBack showSearch rightElement={renderRightElement()} />

      {/* SEARCH & FILTER */}
      {/* <View className="mt-5 flex-row items-center px-5">
        <View className="mr-3 flex-1 flex-row items-center rounded-2xl bg-white px-4">
          <Search color="#9CA3AF" size={20} />

          <TextInput
            placeholder="Search users..."
            placeholderTextColor="#9CA3AF"
            className="ml-3 flex-1 py-4 text-base text-gray-900"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          className="h-14 w-14 items-center justify-center rounded-2xl bg-white"
        >
          <Filter color="#374151" size={22} />
        </TouchableOpacity>
      </View> */}

      {/* USER LIST */}
      {/* <FlatList
        data={USERS}
        keyExtractor={(item) => item.id}
        renderItem={renderUserCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <Text className="text-lg font-semibold text-gray-700">
              No Users Found
            </Text>

            <Text className="mt-2 text-center text-gray-500">
              Create users to manage your CRM system
            </Text>
          </View>
        }
      /> */}
    </SafeAreaView>
  );
}
