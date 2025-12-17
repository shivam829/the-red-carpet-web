import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow login page always
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔒 Protect other admin routes
  if (pathname.startsWith("/admin")) {
    const isLoggedIn = req.cookies.get("admin");

    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}
