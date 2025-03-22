import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Admin from "@/models/adminModel";
import {generateToken , verifyPassword } from "@/utils/authUtils";

export async function POST(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const body = await request.json();
        const { adminId, password } = body;

        // Validate input
        if (!adminId || !password) {
            return NextResponse.json({ message: "Admin ID and password are required" }, { status: 400 });
        }

        // Find the admin by adminId
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await verifyPassword(password, admin.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const adminToken = generateToken(admin); // Generate a JWT token

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            status: 200
          }); 

        response.cookies.set("adminToken", adminToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure only in production
            path: "/",
            maxAge: 3600, // 1 hour
            sameSite: "strict",
          });

        return response;
    } catch (error) {
        console.error("Error during admin login:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}