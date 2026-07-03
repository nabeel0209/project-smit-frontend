"use client";

import { useRef } from "react";
import axios from "axios";
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
        className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 cursor-pointer"
      >
        <GoogleIcon />
      </button>

      <div ref={hiddenBtnRef} className="hidden">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) return;

            try {
              const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
                { idToken: credentialResponse.credential },
              );

              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              await useAuthStore.getState().fetchUser();
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
