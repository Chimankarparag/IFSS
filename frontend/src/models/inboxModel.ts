import mongoose from "mongoose";
import path from "path";

const inboxSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CA',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    attachments: [{
        filename: String, 
        path: String,
        mimetype: String,
    }],
    category: {
        type: String,
        enum: ['general', 'document', 'query', 'notification'],
        default: 'general'
    },
    deletedBy: {
        type: String,
        enum: ['sender', 'recipient', null],
        default: null
    }
}, {
    timestamps: true,
});

const Inbox = mongoose.models.Inbox || mongoose.model("Inbox", inboxSchema);

export default Inbox;