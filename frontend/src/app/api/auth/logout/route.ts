import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });

    // Clear the token by setting an expired cookie
    response.cookies.set('token', '', {
        expires: new Date(0), // Expire immediately
        path: '/', // Ensure it covers all routes
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
    });

    return response;
}
