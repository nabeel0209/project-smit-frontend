import { create } from "zustand";
import api from "../services/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "creator" | "admin" | "moderator";
  dob?: string;
  gender?: string;
  status?: "active" | "suspended";
  suspension?: {
    isPermanent?: boolean;
    reason?: string;
    duration?: "3_days" | "7_days" | "1_month" | "3_months" | "permanent";
    suspendedAt?: string;
    suspendedUntil?: string;
    suspendedBy?: string;
  };
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthLoading: true,

  setUser: (user) => set({ user, isAuthLoading: false }),

  fetchUser: async () => {
    try {
      const res = await api.get("/user/me");

      set({
        user: res.data.user,
        isAuthLoading: false,
      });
    } catch (err) {
      set({
        user: null,
        isAuthLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout API failed, continuing anyway", err);
    } finally {
      set({
        user: null,
        isAuthLoading: false,
      });
    }
  },
}));
