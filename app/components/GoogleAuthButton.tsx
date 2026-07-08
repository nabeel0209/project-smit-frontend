"use client";

import api from "@/app/services/axios";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/services/auth.store";
import GoogleIcon from "@/public/icons/googleIcon";

type GoogleAuthButtonProps = {
  role?: "user" | "creator";
};

const getDashboardPath = (role?: string) => {
  if (role === "creator") return "/Creator";
  if (role === "admin") return "/Admin";
  return "/User";
};

const GoogleAuthButton = ({ role = "user" }: GoogleAuthButtonProps) => {
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    prompt: "select_account",
    scope: "openid email profile",
    include_granted_scopes: false,

    onSuccess: async (tokenResponse) => {
      if (!tokenResponse.access_token) {
        toast.error("Google login failed. No access token received.");
        return;
      }

      try {
        const res = await api.post("/auth/google", {
          accessToken: tokenResponse.access_token,
          role,
        });

        useAuthStore.getState().setUser(res.data.user);
        toast.success("Logged in successfully!");

        router.push(getDashboardPath(res.data.user.role));
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          "Google authentication failed. Try again.";

        toast.error(msg);
      }
    },

    onError: () => {
      toast.error("Google login failed. Try again.");
    },
  });

  return (
    <button
      type="button"
      onClick={() => googleLogin()}
      className="w-full flex items-center justify-center gap-2 border border-border-soft text-text text-sm font-medium py-3 rounded-full hover:border-primary hover:bg-surface transition-colors cursor-pointer"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
