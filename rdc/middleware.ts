import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ ALWAYS allow API routes (CRITICAL)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Allow admin login page always
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
