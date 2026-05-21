export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'sub_admin' | 'agent';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}