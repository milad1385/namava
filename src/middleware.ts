import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const profileId = request.cookies.get("profile")?.value;
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/plans") ||
    pathname.startsWith("/p-user") ||
    pathname.startsWith("/profile-list-edit") ||
    pathname.startsWith("/paymentStatus")
  ) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      NextResponse.next();
    }
  }

  if (
    pathname === "/" ||
    pathname.includes("/movie") ||
    pathname.includes("/series")
  ) {
    if (profileId && accessToken) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profile?id=${profileId}`,
          {
            headers: {
              Cookie: request.headers.get("cookie") || "",
            },
          },
        );

        if (!res.ok) {
          console.error("Failed to fetch profile");
          return NextResponse.next();
        }

        const data = await res.json();
        console.log("Profile type on home page:", data?.profile?.type);

        // اگه نوع پروفایل بزرگسال نیست (یعنی کودک هست) و مسیر kids نیست
        if (data?.profile?.type !== "adult") {
          return NextResponse.redirect(new URL("/kids", request.url));
        }

        // اگه بزرگسال هست، اجازه بده بمونه تو صفحه اصلی
        return NextResponse.next();
      } catch (error) {
        console.error("Middleware error on home page:", error);
        return NextResponse.next();
      }
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
    "/",
    "/plans/:path*",
    "/p-user/:path*",
    "/login",
    "/register",
    "/profile-list-edit/:path*",
    "/movie/:path*",
    "/series/:path*",
  ],
};
