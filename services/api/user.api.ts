import API from "./axios";
import { RegisterPayload } from "@/types/user.types";

export const createUser = async (data: RegisterPayload) => {
  try {
    console.log("Creating user sending data", data);
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
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error when calling get user api", error);
  }
};

// getUsers: (params?: { role?: string; page?: number; search?: string }) =>
//     api.get<ApiResponse<PaginatedResponse<UserProfile>>>('/users', { params }),
//   getUser: (id: string) => api.get<ApiResponse<UserProfile>>(`/users/${id}`),
//   createUser: (payload: CreateUserPayload) =>
//     api.post<ApiResponse<UserProfile>>('/users', payload),
//   updateUser: (id: string, payload: Partial<CreateUserPayload>) =>
//     api.put<ApiResponse<UserProfile>>(`/users/${id}`, payload),
//   deleteUser: (id: string) => api.delete(`/users/${id}`),
//   toggleActive: (id: string) =>
//     api.patch<ApiResponse<UserProfile>>(`/users/${id}/toggle-active`),
//   updatePermissions: (id: string, permissions: string[]) =>
//     api.put(`/users/${id}/permissions`, { permissions }),
//   getRoles: () => api.get<ApiResponse<{ roles: string[] }>>('/users/roles'),
