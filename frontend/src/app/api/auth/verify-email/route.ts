import { NextRequest, NextResponse, userAgent } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import OTP from "@/models/otpModel";
import { sendEmail, generateOTP } from "@/utils/emailUtils";
import { hashPassword, generateToken } from "@/utils/authUtils";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { email, password, pan } = body;

        if (password) {
            const hashedPassword = await hashPassword(password);

            // Check if email already exists
            const existingUser = await User.findOne({ pan_number: pan });

            if (existingUser?.isVerfied) {
                return NextResponse.json({ success: false, message: "Email is already verified" }, { status: 409 });
            } else if (existingUser) {

                existingUser.email = email;
                // existingUser.isRegistered = true;
                existingUser.password = hashedPassword;

                await existingUser.save();
            }
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP in the database
        await OTP.findOneAndUpdate(
            { email },
            { otp, expiresAt: new Date(Date.now() + 2 * 60 * 1000) },
            { upsert: true, new: true }
        );
        console.log(email)
        // Send OTP via email
        await sendEmail(email, otp);

        return NextResponse.json({ success: true, message: "Verification email sent" });
    } catch (error) {
        console.error("Error sending verification email:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
