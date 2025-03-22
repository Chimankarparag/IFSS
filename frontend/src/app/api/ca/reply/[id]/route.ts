import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Inbox from "@/models/inboxModel";
import Message from "@/models/messageModel";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        
        const messageId = params.id;

        if (!messageId) {
            return NextResponse.json({ message: "Message ID required" }, { status: 400 });
        }

        const deletedMessage = await Inbox.findById(messageId);

        if(!deletedMessage) {
            await Message.findByIdAndDelete(messageId);
        } else {
            if (deletedMessage.deletedBy === "recipient") {
                await Inbox.findByIdAndDelete(messageId);
            } else {
                deletedMessage.deletedBy = "sender";
                await deletedMessage.save();
            }
        }

        if (!deletedMessage) {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
