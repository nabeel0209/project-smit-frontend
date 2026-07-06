import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background font-sans text-text">
      <UserSidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
