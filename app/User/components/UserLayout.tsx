"use client";

import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/app/services/user";
import AccountSuspendedScreen from "@/app/components/AccountSuspendedScreen";

export default function UserLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["my-student-profile"],
    queryFn: getMyProfile,
  });

  const isHelpPage = pathname.startsWith("/User/Help");
  const isSuspended = profile?.status === "suspended";

  if (!isLoading && isSuspended && !isHelpPage) {
    return (
      <div className="flex min-h-screen bg-background font-sans text-text">
        <UserSidebar isSuspended />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <AccountSuspendedScreen
            helpHref="/User/Help"
            reason={profile.suspension?.reason}
            suspendedUntil={profile.suspension?.suspendedUntil}
            isPermanent={profile.suspension?.isPermanent}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-sans text-text">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
