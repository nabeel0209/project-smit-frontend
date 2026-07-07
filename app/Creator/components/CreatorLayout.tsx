import { ReactNode } from "react";
import CreatorSidebar from "./CreatorSidebar";

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background font-sans text-text">
      <CreatorSidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
    </div>
  );
}
