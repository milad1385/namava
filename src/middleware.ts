import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const profileId = request.cookies.get("profile")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/plans") ||
    pathname.startsWith("/p-user") ||
    pathname.startsWith("/profile-list-edit")
  ) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      NextResponse.next();
    }
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/plans/:path*",
    "/p-user/:path*",
    "/login",
    "/register",
    "/profile-list-edit/:path*",
  ],
};
