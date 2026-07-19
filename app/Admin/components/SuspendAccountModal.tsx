"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { SuspensionDuration } from "@/app/services/admin";

const durationOptions: {
  label: string;
  value: SuspensionDuration;
}[] = [
  { label: "3 days", value: "3_days" },
  { label: "7 days", value: "7_days" },
  { label: "1 month", value: "1_month" },
  { label: "3 months", value: "3_months" },
  { label: "Permanent", value: "permanent" },
];

export default function SuspendAccountModal({
  isOpen,
  accountName,
  isPending,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  accountName: string;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (payload: {
    duration: SuspensionDuration;
    reason: string;
  }) => void;
}) {
  const [duration, setDuration] = useState<SuspensionDuration>("3_days");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border-soft max-w-md w-full p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-red-600" size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-text">Suspend account</h2>
              <p className="text-sm text-text-muted mt-1">
                Suspend {accountName}. They will only be able to access Help.
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

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-semibold text-text-muted">
              Suspension duration
            </label>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDuration(option.value)}
                  className={`px-3 py-2 rounded-xl border text-sm font-semibold transition ${
                    duration === option.value
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-border-soft text-text-muted hover:border-red-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-muted">
              Suspension reason
            </label>

            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Example: Violation of platform rules, spam activity, abusive behavior..."
              className="w-full mt-2 px-4 py-3 rounded-xl border border-border-soft text-sm outline-none focus:border-red-500 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-surface text-text-muted text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isPending || !reason.trim()}
            onClick={() => onConfirm({ duration, reason })}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Suspending..." : "Suspend"}
          </button>
        </div>
      </div>
    </div>
  );
}
