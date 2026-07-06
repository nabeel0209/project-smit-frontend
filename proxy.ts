// proxy.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/User"];
const AUTH_PATHS = ["/login", "/signUp"];

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("token")?.value;
  if (!token) return false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
      headers: { Cookie: `token=${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const valid = await checkAuth(request);
    if (!valid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (isAuthPage) {
    const valid = await checkAuth(request);
    if (valid) {
      return NextResponse.redirect(new URL("/User", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/User/:path*", "/login", "/signUp"],
};
