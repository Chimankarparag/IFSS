import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const CAtoken = req.cookies.get("CAtoken")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;

  const pathname = req.nextUrl.pathname;

  // Redirect Users to Login if They Are Not Authenticated
  if (pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect CAs to Login if They Are Not Authenticated
  if (pathname.startsWith("/ca") && !CAtoken) {
    return NextResponse.redirect(new URL("/auth/ca-login", req.url));
  }

  // Redirect Admins to Login if They Are Not Authenticated
  if (pathname.startsWith("/admin") && !adminToken) {
    return NextResponse.redirect(new URL("/auth/admin-login", req.url));
  }

  // Continue if the user has the correct token
  return NextResponse.next();
}

// 🌟 Apply Middleware to Specific Routes
export const config = {
  matcher: ["/profile/:path*", "/ca/:path*", "/admin/:path*"],
};
