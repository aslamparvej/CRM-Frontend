import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Plus, X, SearchX } from "lucide-react-native";

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDebounce } from "@/hooks/useDebounce";
import { getUsers } from "@/services/api/user.api";
import { useUserStore } from "@/store/users.store";

import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import UserCard from "@/components/users/UserCard";
import EmptyState from "@/components/ui/EmptyState";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("");

  const router = useRouter();
  const debounced = useDebounce(search, 400);
  const { users, isLoading, setUsers, setLoading } = useUserStore();

  useEffect(() => {
    loadUsers();
  }, [debounced, roleFilter]);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers({
        search: debounced || undefined,
        role: roleFilter || undefined,
      });
      setUsers(response.data.data);
    } catch (error) {
      console.log("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const roleFilters = [
    { value: "", label: "All" },
    { value: "sub-admin", label: "Sub Admin" },
    { value: "executive", label: "Executive" },
  ];

  const renderRightElement = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(protected)/users/create")}
          className="p-2 items-center justify-center rounded-xl bg-primary-color"
        >
          <Plus color="#000" size={20} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        title="Users"
        subtitle="Manage sub-admins & agents"
        showSearch
        onSearch={() => setShowSearch((prev) => !prev)}
        rightElement={renderRightElement()}
      />
      <View className="px-4 pt-3">
        <View className="flex-row gap-2">
          {roleFilters.map((r) => (
            <TouchableOpacity
              key={r.value}
              onPress={() => setRoleFilter(r.value)}
              className={`px-3 py-1.5 rounded-full border ${roleFilter === r.value ? "border-primary-color bg-primary-color" : "border-gray-700 bg-transparent"}`}
              activeOpacity={0.8}
            >
              <Text
                className={`text-xs font-semibold ${roleFilter === r.value ? "text-gray-800" : "text-gray-600"}`}
              >
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
       <View className="px-4 pt-4">
       <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search users..."
          containerClassName="mb-0"
          rightIcon={ search ? <X size={18} onPress={() => setSearch("") }/> : null}
        />
        </View>
      )}

      {isLoading ? (
        <View className="flex-1 flex items-center justify-center">
          <Loader size="large" />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(i) => i._id}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onPress={() =>
                router.push(`/(protected)/users/details/${item._id}`)
              }
              onDelete={() => console.log("Working on it...")}
            />
          )}
          contentContainerStyle={{ padding: 16, }}
          showsVerticalScrollIndicator={false}
          onRefresh={loadUsers}
          refreshing={isLoading}
          ListEmptyComponent={
            <EmptyState
              title="No users found"
              action={{
                label: "Add User",
                onPress: () => router.push("/(protected)/users/create"),
              }}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
