import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import Admin from "@/models/adminModel";
import CA from "@/models/caModel";
import Message from "@/models/messageModel";

export async function PUT(request: NextRequest){
    try {
        await connect();

        const body = await request.json();
        const { newMsg, Id, admin } = body;

        if (!newMsg || !Id || !admin){
            return NextResponse.json({ message: "CA ID, admin and message are required" }, { status: 400 });
        }

        const ca = await CA.findById(Id);

        if(!ca){
            return NextResponse.json({ message: "CA not found!" }, { status: 401 });
        }

        const adm = await Admin.findOne({ adminId: admin });

        if (!adm) {
            return NextResponse.json({ message: "Unauthorized admin" }, { status: 401 });
        }

        const msg = new Message({
            sender: adm._id,
            recipient: ca._id,
            subject: newMsg.subject,
            content: newMsg.content,
        })

        await msg.save()

        return NextResponse.json({success: "Message sent successfully!"}, { status: 200 });

    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}