import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hash password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}

// Generate JWT token
export function generateToken(user: any): string {
    const payload = {
        id: user._id,
        pan: user.pan_number,
    };
    const secret = process.env.TOKEN_SECRET || 'IFSSproject';
    const options = { expiresIn: 3600 }; // 1 hr 
    return jwt.sign(payload, secret, options);
}

// Verify JWT token
export function verifyToken(token: string): any {
    const secret = process.env.TOKEN_SECRET || 'IFSSproject';
    return jwt.verify(token, secret);
}
