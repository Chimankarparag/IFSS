import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import { hashPassword, verifyPassword } from '@/utils/authUtils';

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { adminId, email, name, currentPassword, confirmPassword } = body;

        if (!adminId) {
            return NextResponse.json({ error: 'Admin ID must be provided.' }, { status: 400 });
        }

        if (!confirmPassword) {
            return NextResponse.json({ error: 'New password is required.' }, { status: 400 });
        }

        const updatedAdmin = await Admin.findOne({ adminId });

        if (!updatedAdmin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Verify current password
        const isPasswordCorrect = await verifyPassword(currentPassword, updatedAdmin.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Current password is invalid" }, { status: 402 });
        }

        // Hash new password
        const hashedPassword = await hashPassword(confirmPassword);

        // Update admin details
        updatedAdmin.email = email || updatedAdmin.email;
        updatedAdmin.password = hashedPassword;
        updatedAdmin.name = name || updatedAdmin.name;

        await updatedAdmin.save();

        // Return success response
        return NextResponse.json({ message: 'Admin credentials updated successfully.', updatedAdmin }, { status: 200 });

    } catch (error) {
        console.error('Error updating admin credentials:', error);
        return NextResponse.json({ error: 'Failed to update admin credentials.' }, { status: 500 });
    }
}
