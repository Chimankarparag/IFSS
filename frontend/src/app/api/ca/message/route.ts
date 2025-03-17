import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Message from "@/models/messageModel";
import Inbox from "@/models/inboxModel";
import CA from "@/models/caModel";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { caId } = body;

        if (!caId) {
            return NextResponse.json({ message: "CA ID is required" }, { status: 400 });
        }

        const caExists = await CA.findOne({ caid: caId });

        if (!caExists) {
            return NextResponse.json({ message: "CA ID not found" }, { status: 404 });
        }

        const messages = await Message.find({ recipient: caExists._id }).sort({ createdAt: -1 });

        if (!messages) {
            return NextResponse.json({ message: "No messages found" }, { status: 304 });
        }

        const populatedMessages = await Promise.all(messages.map(async (message) => {
            const sender = await User.findById(message.sender);
            return {
                ...message.toObject(),
                sender,
            };
        }));

        const sentMessages = await Inbox.find({ sender: caExists._id }).sort({ createdAt: -1 }) || [];

        const populatedSentMessages = await Promise.all(sentMessages.map(async (message) => {
            const recipient = await User.findById(message.recipient);
            return { ...message.toObject(), recipient };
        }));

        return NextResponse.json({populatedMessages,populatedSentMessages}, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}