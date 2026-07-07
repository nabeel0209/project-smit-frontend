import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background font-sans text-text">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
