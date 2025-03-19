import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Inbox from "@/models/inboxModel";
import Message from "@/models/messageModel";
import User from "@/models/userModel";
import CA from "@/models/caModel";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { replyMsg, caId } = body;

        if (!replyMsg || !caId) {
            return NextResponse.json({ message: "CA ID and reply message are required" }, { status: 400 });
        }

        const caExists = await CA.findOne({ caid: caId });

        if (!caExists) {
            return NextResponse.json({ message: "CA ID not found" }, { status: 404 });
        }

        const user = await User.findOne({ pan_number: replyMsg.to.panNumber });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const replyMessage = new Inbox({
            sender: caExists._id,
            recipient: user._id,
            subject: replyMsg.subject,
            content: replyMsg.content,
            date: replyMsg.date,
        });

        await replyMessage.save();

        const message = await Message.findOne({ recipient: caExists._id });

        if (!message) {
            return NextResponse.json({ message: "No messages found" }, { status: 404 });
        }
        
        message.isRead = true;

        await message.save();

        return NextResponse.json({success: "Reply sent successfully!"}, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
