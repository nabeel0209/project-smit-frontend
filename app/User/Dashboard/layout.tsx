import { ReactNode } from "react";
import UserSidebar from "../components/UserSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-text">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
