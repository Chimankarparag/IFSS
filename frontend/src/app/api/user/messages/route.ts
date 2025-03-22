import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Inbox from "@/models/inboxModel";
import CA from "@/models/caModel";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { email } = body;
        
        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        let query: any = { email: email };

        const userId = await User.find(query).select('_id');
        query = { recipient: userId };
        
        const messages = await Inbox.find({ ...query, deletedBy: null })
            .sort({ createdAt: -1 })
            .lean();
        
        const populatedMessages = await Promise.all(messages.map(async (message) => {
                    const sender = await CA.findById(message.sender);
                    return {
                        ...message,
                        sender,
                    };
                }));
            
        return NextResponse.json(populatedMessages, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
