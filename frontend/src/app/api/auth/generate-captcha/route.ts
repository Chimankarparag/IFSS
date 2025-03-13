import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    // Generate random captcha text
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captchaText = '';
    for (let i = 0; i < 6; i++) {
      captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Create a session ID to validate the captcha later
    const sessionId = crypto.randomBytes(16).toString('hex');
    
    // Generate a simple SVG captcha image
    const svg = generateCaptchaImage(captchaText);
    const image = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    
    // Store captcha text in a cookie
    const response = NextResponse.json({ 
      image,
      sessionId 
    });
    
    response.cookies.set({
      name: `captcha_${sessionId}`,
      value: captchaText,
      httpOnly: true,
      maxAge: 300, // 5 minutes
      path: '/',
      sameSite: 'strict'
    });
    
    return response;
  } catch (error) {
    console.error("Error generating captcha:", error);
    return NextResponse.json({ error: "Failed to generate captcha" }, { status: 500 });
  }
}

// Generate a simple SVG captcha image
function generateCaptchaImage(text: string) {
  // Create SVG with text and some visual noise
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
    <rect width="120" height="40" fill="#1C1C1C"/>
    ${generateNoise()}
    <text fill="#fff" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" x="60" y="27">${text}</text>
  </svg>`;
}

// Generate visual noise to make captcha harder to read by bots
function generateNoise() {
  let noise = '';
  for (let i = 0; i < 10; i++) {
    const x1 = Math.floor(Math.random() * 120);
    const y1 = Math.floor(Math.random() * 40);
    const x2 = Math.floor(Math.random() * 120);
    const y2 = Math.floor(Math.random() * 40);
    const color = `rgb(${Math.floor(Math.random() * 100) + 100},${Math.floor(Math.random() * 100) + 100},${Math.floor(Math.random() * 100) + 100})`;
    noise += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
  }
  return noise;
}
