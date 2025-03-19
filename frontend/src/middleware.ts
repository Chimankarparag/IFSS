import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if token is missing
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  console.log("Logged in with token:", token);

  // Continue if token exists
  return NextResponse.next();
}

// Define which routes the middleware should apply to
export const config = {
  matcher: ['/profile/:path*'],
};