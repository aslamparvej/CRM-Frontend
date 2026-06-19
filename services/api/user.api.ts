import API from "./axios";
import { RegisterPayload } from "@/types/user.types";

export const createUser = async (data: RegisterPayload) => {
  try {
    const response = await API.post("/users", data);
    return response;
  } catch (error) {
    console.log("Error sending user creation request...", error);
    throw error;
  }
};

export const getUsers = async (params?: {
  role?: string;
  page?: number;
  search?: string;
}) => {
  const response = await API.get("/users", { params });
  return response;
};

export const getUser = async (id: string) => {
  try {
    const response = await API.get(`/users/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error when calling get user api", error);
  }
};

export const updateUser = async (id: string, payload: RegisterPayload) => {
  try {
    const response = await API.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    console.log("Error when calling update user api", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error when calling delete user api", error);
  }
};

export const toggleActive = async (id: string) => {
  try {
    const response = await API.patch(`/users/${id}/status`);
    return response.data;
  } catch (error) {
    console.log("Error when calling toggle active user api", error);
  }
};

export const updatePermissions = async (id: string, permissions: string[]) => {
  try {
    const response = await API.put(`/users/${id}/permissions`, { permissions });
    return response.data;
  } catch (error) {
    console.log("Error when calling update user permissions api", error);
  }
};

export const getRoles = async () => {
  try {
    const response = await API.get("/users/roles");
    return response.data.roles;
  } catch (error) {
    console.log("Error when calling get user roles api", error);
  }
};
