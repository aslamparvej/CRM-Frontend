import API from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterPayload) => {
  const response = await API.post("/auth/register", data);

  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout");

  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await API.post("/auth/forgot-password", { email });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await API.post("/auth/verify-otp", { email, otp });
  return response.data;
};

export const resetPassword = async (data: any) => {
  const response = await API.post("/auth/reset-password", data);
  return response.data;
};
