import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import CA from "@/models/caModel";
import { connect } from "@/dbconfig/dbConfig";
import { generateToken } from "@/utils/authUtils";


export async function POST(request: NextRequest) {
  try {
    await connect();
    
    const { caId, password, captcha, captchaSessionId } = await request.json();
    
    // Validate captcha
    const captchaCookie = request.cookies.get(`captcha_${captchaSessionId}`);
    
    if (!captchaCookie) {
      return NextResponse.json({ message: "Captcha session expired" }, { status: 400 });
    }
    
    // Verify captcha text
    if (captcha !== captchaCookie.value) {
      return NextResponse.json({ message: "Invalid captcha" }, { status: 400 });
    }

    // Find user by PAN number
    const ca = await CA.findOne({ caid: caId });
    
    if (!ca) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    if (ca.status !== "active") {
      return NextResponse.json({ message: "Account is inactive" }, { status: 402 });
    }
    
    // Verify password
    const isPasswordValid = ca.password ? await bcrypt.compare(password, ca.password) : false;
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const CAtoken = generateToken(ca); //Generate token

    // ✅ Store token in HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful"
    });

    response.cookies.set("CAtoken", CAtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      path: "/",
      maxAge: 3600, // 1 hour
      sameSite: "strict",
    });

    response.cookies.delete(`captcha_${captchaSessionId}`);
    
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
