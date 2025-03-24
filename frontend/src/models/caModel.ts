import { stat } from "fs";
import mongoose from "mongoose";

const caSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
    },
    caid: {
        type: String,
        required: [true, "CAID is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"],
    },
});

const CA = mongoose.models.CA || mongoose.model("CA", caSchema);

export default CA;
