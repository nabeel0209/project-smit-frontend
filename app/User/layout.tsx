import { ReactNode } from "react";
import UserLayout from "./components/UserLayout";

export default function RootUserLayout({ children }: { children: ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}
