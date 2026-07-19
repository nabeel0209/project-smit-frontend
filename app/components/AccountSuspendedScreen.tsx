"use client";

import Link from "next/link";
import { AlertTriangle, HelpCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/services/auth.store";

export default function AccountSuspendedScreen({
  reason,
  suspendedUntil,
  isPermanent,
  helpHref,
}: {
  reason?: string;
  suspendedUntil?: string;
  isPermanent?: boolean;
  helpHref: string;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white border border-red-200 rounded-3xl p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="text-red-600" size={32} />
        </div>

        <h1 className="text-2xl font-bold text-text">Account suspended</h1>

        <p className="text-sm text-text-muted mt-3 leading-relaxed">
          Your account has been suspended due to a violation of platform
          policies. If you believe this was a mistake, please contact support
          for further assistance.
        </p>

        {reason && (
          <div className="mt-5 rounded-xl bg-red-50 border border-red-100 p-4 text-left">
            <p className="text-xs font-semibold text-red-700 uppercase">
              Reason
            </p>
            <p className="text-sm text-red-700 mt-1">{reason}</p>
          </div>
        )}

        <div className="mt-4 rounded-xl bg-surface border border-border-soft p-4 text-left">
          <p className="text-xs font-semibold text-text-muted uppercase">
            Suspension duration
          </p>
          <p className="text-sm font-semibold text-text mt-1">
            {isPermanent
              ? "Permanent"
              : suspendedUntil
                ? `Until ${new Date(suspendedUntil).toLocaleDateString()}`
                : "Temporarily suspended"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <Link
            href={helpHref}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-sm font-semibold"
          >
            <HelpCircle size={17} />
            Go to Help
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-surface text-text-muted text-sm font-semibold"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
