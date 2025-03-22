import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/authUtils';
import CA from '@/models/caModel';
import { connect } from '@/dbconfig/dbConfig';

export async function GET(req: NextRequest) {
  try {
    // Get token from cookies
    const token = req.cookies.get('CAtoken')?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token); // Use verifyToken function you created earlier

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Connect to the database
    await connect();

    // Find user from the database
    const ca = await CA.findById(decoded.id).select('-password'); // Exclude password

    if (!ca) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(ca, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}