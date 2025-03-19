import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import OTP from "@/models/otpModel";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { email, code } = body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (existingUser.isVerfied) {
            return NextResponse.json({ success: false, message: "Email is already verified" }, { status: 409 });
        }

        const otpEntry = await OTP.findOne({ email });

        if (!otpEntry || otpEntry.expiresAt.getTime() < Date.now()) {
            return NextResponse.json({ success: false, message: "Verification time over. Try resending OTP" }, { status: 400 });
        }

        if (otpEntry.otp !== code) {
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }

        // Mark user as verified & save
        existingUser.isVerfied = true;
        await existingUser.save();

        // Delete OTP after successful verification
        await OTP.deleteOne({ email });

        return NextResponse.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        console.error("Error verifying email:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
