import Link from "next/link";

export default function Home() {
  return (
    <main>
        <h1>Dummy Landing Page</h1>
      <Link href="/login-signup/login">
        Go To Login
      </Link>
    </main>
  );
}