"use client";

import { useRef } from "react";
import api from "@/app/services/axios";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/services/auth.store";
import GoogleIcon from "@/public/icons/googleIcon";

const GoogleAuthButton = () => {
  const router = useRouter();
  const hiddenBtnRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const btn = hiddenBtnRef.current?.querySelector(
      'div[role="button"]',
    ) as HTMLElement;
    btn?.click();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 border border-border-soft text-text text-sm font-medium py-3 rounded-full hover:border-primary hover:bg-surface transition-colors cursor-pointer"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div ref={hiddenBtnRef} className="hidden">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) return;

            try {
              const res = await api.post("/api/auth/google", {
                idToken: credentialResponse.credential,
              });

              useAuthStore.getState().setUser(res.data.user);
              router.push("/User");
            } catch (err: any) {
              const msg =
                err.response?.data?.message ||
                "Google authentication failed. Try again.";
              toast.error(msg);
            }
          }}
          onError={() => console.log("Google Login Failed")}
        />
      </div>
    </>
  );
};

export default GoogleAuthButton;
