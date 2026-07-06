import { create } from "zustand";
import api from "../services/axios";

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
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await api.get("/user/me");
      set({ user: res.data });
    } catch (err) {
      console.error(err);
      set({ user: null });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout API failed, continuing anyway", err);
    } finally {
      set({ user: null });
    }
  },
}));
