import UserLayout from "./components/UserLayout";
import HomeContent from "./Home/HomeUser";

export default function UserRootPage() {
  return (
    <UserLayout>
      <HomeContent />
    </UserLayout>
  );
}
