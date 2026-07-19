"use client";

import { X, ShieldCheck } from "lucide-react";

export default function OtpVerificationModal({
  isOpen,
  title,
  description,
  otp,
  isPending,
  devOtp,
  onChange,
  onClose,
  onVerify,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  otp: string;
  isPending: boolean;
  devOtp?: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onVerify: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-border-soft p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-text">{title}</h2>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface"
          >
            <X size={18} />
          </button>
        </div>

        {devOtp && (
          <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-semibold text-amber-800">
              Development OTP
            </p>
            <p className="text-lg font-bold tracking-[0.3em] text-amber-900 mt-1">
              {devOtp}
            </p>
          </div>
        )}

        <div className="mt-5">
          <label className="text-sm font-semibold text-text-muted">
            Enter OTP
          </label>

          <input
            value={otp}
            onChange={(e) =>
              onChange(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            maxLength={6}
            inputMode="numeric"
            placeholder="123456"
            className="mt-2 w-full px-4 py-3 rounded-xl border border-border-soft outline-none focus:border-primary text-center text-xl font-bold tracking-[0.35em]"
          />
        </div>

        <button
          type="button"
          disabled={isPending || otp.length !== 6}
          onClick={onVerify}
          className="mt-5 w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
