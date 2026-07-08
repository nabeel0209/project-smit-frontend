import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

type UserRole = "user" | "creator" | "admin";

type TokenPayload = {
  id: string;
  role: UserRole;
};

const AUTH_PATHS = ["/login", "/signUp"];

const ROLE_DASHBOARD: Record<UserRole, string> = {
  user: "/User",
  creator: "/Creator",
  admin: "/Admin",
};

const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  "/User": ["user"],
  "/Creator": ["creator", "admin"],
  "/Admin": ["admin"],
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function getTokenPayload(
  token: string | undefined,
): Promise<TokenPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (
      typeof payload.id !== "string" ||
      !["user", "creator", "admin"].includes(payload.role as string)
    ) {
      return null;
    }

    return {
      id: payload.id,
      role: payload.role as UserRole,
    };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const user = await getTokenPayload(token);

  const matchedProtectedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
    pathname.startsWith(route),
  );

  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (matchedProtectedRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const allowedRoles = PROTECTED_ROUTES[matchedProtectedRoute];

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.redirect(
        new URL(ROLE_DASHBOARD[user.role], request.url),
      );
    }

    return NextResponse.next();
  }

  if (isAuthPage) {
    if (user) {
      return NextResponse.redirect(
        new URL(ROLE_DASHBOARD[user.role], request.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/User/:path*",
    "/Creator/:path*",
    "/Admin/:path*",
    "/login",
    "/signUp",
  ],
};
