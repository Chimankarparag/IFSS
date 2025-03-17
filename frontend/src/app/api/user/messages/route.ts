import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Message from "@/models/messageModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
    try {
        await connect();
        
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        const userId = session.user.id;
        const searchParams = request.nextUrl.searchParams;
        const unreadOnly = searchParams.get('unread') === 'true';
        const category = searchParams.get('category');
        
        let query: any = { recipient: userId };
        
        if (unreadOnly) {
            query.isRead = false;
        }
        
        if (category) {
            query.category = category;
        }
        
        const messages = await Message.find(query)
            .populate('sender', 'name email')
            .sort({ createdAt: -1 })
            .lean();
            
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ca') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        const { recipient, subject, content, category } = await request.json();
        
        const newMessage = await Message.create({
            sender: session.user.id,
            recipient,
            subject,
            content,
            category
        });
        
        return NextResponse.json({ 
            success: true, 
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
