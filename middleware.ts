import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PATHS = ["/User"];
const AUTH_PATHS = ["/login", "/signUp"];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function isTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const valid = await isTokenValid(token);
    if (!valid) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      if (token) response.cookies.delete("token");
      return response;
    }
    return NextResponse.next();
  }

  if (isAuthPage) {
    const valid = await isTokenValid(token);
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
