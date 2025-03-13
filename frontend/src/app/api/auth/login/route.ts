import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    await connect();
    
    const { panNumber, password, captcha, captchaSessionId } = await request.json();
    
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
    const user = await User.findOne({ pan_number: panNumber });
    
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    
    // Clear captcha cookie
    const response = NextResponse.json({ 
      success: true,
      message: "Login successful" 
    });
    
    response.cookies.delete(`captcha_${captchaSessionId}`);
    
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
