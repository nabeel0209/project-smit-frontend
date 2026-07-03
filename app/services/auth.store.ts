// app/store/auth.store.ts
import { create } from "zustand";
import axios from "axios";
import api from "./axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  dob?: string;
  gender?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  fetchUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      set({ user: res.data });
    } catch (err) {
      console.error(err);
      set({ user: null });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
