import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("Base URL", process.env.EXPO_PUBLIC_API_URL);

// Request Interceptor
API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle Unauthorized
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");
    }

    return Promise.reject(error);
  },
);

export default API;
