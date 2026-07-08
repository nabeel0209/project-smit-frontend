"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/services/auth.store";

export default function AuthBootstrap() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;
}
