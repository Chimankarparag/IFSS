import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CA',
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
        mimetype: String
    }],
    category: {
        type: String,
        enum: ['inbox', 'sent', 'query', 'notification'],
        default: 'inbox'
    }
}, {
    timestamps: true
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
