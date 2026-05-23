import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/session";

const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/api/admin/login",
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminPath) return NextResponse.next();
  if (PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await verifyAdminSession(token);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
