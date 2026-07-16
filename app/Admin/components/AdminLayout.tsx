"use client";

import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      <main className="flex-1 min-w-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
