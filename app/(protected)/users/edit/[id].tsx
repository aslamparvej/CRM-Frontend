import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUserStore } from "@/store/users.store";
import { getUser, updateUser as us } from "@/services/api/user.api";

import Loader from "@/components/ui/Loader";
import AppHeader from "@/components/ui/Header";
import UserForm from "@/components/forms/UserForm";

const EditUserScreen = () => {
  const router = useRouter();
  const { updateUser } = useUserStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [user, setuser] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (id) loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      const res = await getUser(id);
      setuser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await us(id!, data);
      updateUser(id!, res.data);
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader title="Edit User" showBack />
      <View className="flex-1 px-4 pt-4">
        {fetchLoading ? (
          <Loader />
        ) : (
          <UserForm
            initialData={user}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditUserScreen;
