import { create } from "zustand";
import { User, PermKey } from '../types/user.types';


interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  permissions: PermKey[];
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  permissions: [],
  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addUser: (user) => set((s) => ({ users: [user, ...s.users] })),
  updateUser: (id, data) =>
    set((s) => ({ users: s.users.map((u) => (u._id === id ? { ...u, ...data } : u)) })),
  removeUser: (id) => set((s) => ({ users: s.users.filter((u) => u._id !== id) })),
}));