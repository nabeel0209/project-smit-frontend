import { ReactNode } from "react";
import UserLayout from "./components/UserLayout";
import HomeContent from "./Home/HomeUser"; // Temporary, just for testing

export default function UserRootPage() {
  return (
    <UserLayout>
      <HomeContent />
    </UserLayout>
  );
}
