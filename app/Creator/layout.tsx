import { ReactNode } from "react";
import CreatorLayout from "./components/CreatorLayout";

export default function RootCreatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <CreatorLayout>{children}</CreatorLayout>;
}
