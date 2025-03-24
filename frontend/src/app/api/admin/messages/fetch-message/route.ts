import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import { verifyToken } from '@/utils/authUtils';
import Admin from "@/models/adminModel";
import CA from "@/models/caModel";
import Message from "@/models/messageModel";

export async function GET(request: NextRequest){
    try {

        const token = request.cookies.get('adminToken')?.value;
        
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = verifyToken(token); 

        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        await connect();

        const admin = await Admin.findById(decoded.id).select('-password');

        if (!admin) {
            return NextResponse.json({ message: "Admin not found" }, { status: 404 });
        }

        const messages = await Message.find({sender: admin._id}).sort({ createdAt: -1 });

        if (!messages) {
            return NextResponse.json({ message: "No messages found" }, { status: 304 });
        }

        const populatedMessages = await Promise.all(messages.map(async (message) => {
            const recipient = await CA.findById(message.recipient);

            return {
                to: { id:recipient._id, name: recipient.name, caId: recipient.caid },
                subject: message.subject,
                content: message.content,
                date: message.createdAt,
                status: message.isRead ? 'delivered' : 'unread',
            };
        }));
        
        return NextResponse.json(populatedMessages, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
