import { Suspense } from "react";
import LoginPage from "../login-signup/login";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
