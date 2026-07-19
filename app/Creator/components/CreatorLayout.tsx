"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { AlertCircle, Clock, Lock, ShieldAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CreatorSidebar from "./CreatorSidebar";
import { getMyCreatorProfile } from "@/app/services/creator";
import { usePathname } from "next/navigation";
import AccountSuspendedScreen from "@/app/components/AccountSuspendedScreen";

export default function CreatorLayout({ children }: { children: ReactNode }) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["creator-profile"],
    queryFn: getMyCreatorProfile,
  });

  const pathname = usePathname();

  const creatorUser = profile?.user as any;

  const isApproved = profile?.profileStatus === "approved";
  const isProfilePage = pathname.startsWith("/Creator/Profile");
  const isHelpPage = pathname.startsWith("/Creator/Help");

  const isAccountSuspended = creatorUser?.status === "suspended";

  const shouldLockContent =
    !isLoading &&
    profile &&
    !isAccountSuspended &&
    !isApproved &&
    !isProfilePage;

  if (!isLoading && isAccountSuspended && !isHelpPage) {
    return (
      <div className="flex min-h-screen bg-background font-sans text-text">
        <CreatorSidebar isSuspended />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <AccountSuspendedScreen
            helpHref="/Creator/Help"
            reason={creatorUser?.suspension?.reason}
            suspendedUntil={creatorUser?.suspension?.suspendedUntil}
            isPermanent={creatorUser?.suspension?.isPermanent}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-sans text-text">
      <CreatorSidebar
        isLocked={!isLoading && profile ? !isApproved : false}
        isSuspended={isAccountSuspended}
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {!isLoading &&
          profile &&
          !isAccountSuspended &&
          !isApproved &&
          !isProfilePage && (
            <CreatorStatusBar
              status={profile.profileStatus}
              rejectionReason={profile.rejectionReason}
            />
          )}

        {shouldLockContent ? <LockedCreatorContent /> : children}
      </main>
    </div>
  );
}

function LockedCreatorContent() {
  return (
    <div className="min-h-[55vh] bg-white border border-border-soft rounded-2xl flex flex-col items-center justify-center text-center px-6">
      <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center mb-4">
        <Lock className="text-text-muted" size={26} />
      </div>

      <h2 className="text-xl font-bold text-text">Creator access locked</h2>

      <p className="text-text-muted mt-2 max-w-md text-sm leading-relaxed">
        Complete your creator profile and wait for admin approval before using
        creator tools like courses, analytics, students, and payouts.
      </p>
    </div>
  );
}

function CreatorStatusBar({
  status,
  rejectionReason,
}: {
  status: string;
  rejectionReason?: string;
}) {
  const statusConfig = {
    incomplete: {
      icon: AlertCircle,
      title: "Complete your creator profile",
      description:
        "Add your phone number, bio, location, and categories before submitting your profile for review.",
      action: "Complete profile",
      href: "/Creator/Profile",
      className: "bg-amber-50 border-amber-200 text-amber-800",
    },
    pending_verification: {
      icon: Clock,
      title: "Complete verification and bank details",
      description:
        "Verify your email and phone, then add your bank details to submit your profile for admin approval.",
      action: "Continue setup",
      href: "/Creator/Profile",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    },
    pending_admin_review: {
      icon: Clock,
      title: "Your creator profile is under admin review",
      description:
        "Your profile is complete and submitted. Creator tools will unlock after admin approval.",
      action: "View profile",
      href: "/Creator/Profile",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    },
    rejected: {
      icon: ShieldAlert,
      title: "Your creator profile needs changes",
      description:
        rejectionReason ||
        "Your profile was rejected. Please update your details and submit it again.",
      action: "Update profile",
      href: "/Creator/Profile",
      className: "bg-red-50 border-red-200 text-red-700",
    },
    suspended: {
      icon: ShieldAlert,
      title: "Creator access suspended",
      description:
        "Your creator access has been suspended. Please contact support for more information.",
      action: "View profile",
      href: "/Creator/Profile",
      className: "bg-red-50 border-red-200 text-red-700",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig.incomplete;

  const Icon = config.icon;

  return (
    <div
      className={`mb-6 rounded-2xl border px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${config.className}`}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className="mt-0.5 flex-shrink-0" />

        <div>
          <h3 className="text-sm font-semibold">{config.title}</h3>
          <p className="text-sm opacity-90 mt-1">{config.description}</p>
        </div>
      </div>

      <Link href={config.href}>
        <button className="bg-white/80 hover:bg-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
          {config.action}
        </button>
      </Link>
    </div>
  );
}
