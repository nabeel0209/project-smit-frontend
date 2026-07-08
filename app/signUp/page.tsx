import { Suspense } from "react";
import SignUpPage from "../login-signup/signUp";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignUpPage />
    </Suspense>
  );
}
