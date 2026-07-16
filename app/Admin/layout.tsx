import { ReactNode } from "react";
import AdminLayout from "./components/AdminLayout";

export default function RootAdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
