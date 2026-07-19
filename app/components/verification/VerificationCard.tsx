"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  OtpPurpose,
  sendEmailOtp,
  sendPhoneOtp,
  verifyOtp,
} from "@/app/services/verification";
import OtpVerificationModal from "./OtpVerificationModal";

type VerificationType = "email" | "phone";

export default function VerificationCard({
  type,
  title,
  description,
  isVerified,
  queryKeyToRefresh,
}: {
  type: VerificationType;
  title: string;
  description: string;
  isVerified: boolean;
  queryKeyToRefresh: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState<string | undefined>();

  const queryClient = useQueryClient();

  const Icon = type === "email" ? Mail : Phone;

  const purpose: OtpPurpose =
    type === "email" ? "email_verification" : "phone_verification";

  const sendMutation = useMutation({
    mutationFn: type === "email" ? sendEmailOtp : sendPhoneOtp,
    onSuccess: (data) => {
      toast.success(data.message || "OTP sent successfully.");
      setDevOtp(data.devOtp);
      setOtp("");
      setIsModalOpen(true);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      toast.success(data.message || "Verified successfully.");
      setIsModalOpen(false);
      setOtp("");
      setDevOtp(undefined);

      queryClient.invalidateQueries({
        queryKey: [queryKeyToRefresh],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-account"],
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Invalid OTP.");
    },
  });

  return (
    <>
      <div
        className={`rounded-2xl border p-4 transition ${
          isVerified
            ? "border-green-200 bg-green-50/70"
            : "border-border-soft bg-surface"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-white text-primary border border-border-soft"
            }`}
          >
            {isVerified ? <CheckCircle2 size={20} /> : <Icon size={20} />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-text leading-snug">
                {title}
              </h3>

              {isVerified ? (
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-green-700 border border-green-200">
                  <ShieldCheck size={12} />
                  Verified
                </span>
              ) : (
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-amber-700 border border-amber-200">
                  <AlertCircle size={12} />
                  Pending
                </span>
              )}
            </div>

            <p
              className={`text-xs mt-1.5 leading-relaxed ${
                isVerified ? "text-green-700" : "text-text-muted"
              }`}
            >
              {isVerified ? "This detail has been verified." : description}
            </p>

            {!isVerified && (
              <button
                type="button"
                disabled={sendMutation.isPending}
                onClick={() => sendMutation.mutate()}
                className="mt-3 w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sendMutation.isPending ? "Sending OTP..." : "Send OTP"}
              </button>
            )}
          </div>
        </div>
      </div>

      <OtpVerificationModal
        isOpen={isModalOpen}
        title={`Verify ${type === "email" ? "email" : "phone"}`}
        description={`Enter the 6-digit OTP sent to your ${
          type === "email" ? "email address" : "phone number"
        }.`}
        otp={otp}
        devOtp={devOtp}
        isPending={verifyMutation.isPending}
        onChange={setOtp}
        onClose={() => setIsModalOpen(false)}
        onVerify={() =>
          verifyMutation.mutate({
            purpose,
            otp,
          })
        }
      />
    </>
  );
}
