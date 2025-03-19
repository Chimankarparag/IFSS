import mongoose from "mongoose";

const caSchema = new mongoose.Schema({
    caid: {
        type: String,
        required: [true, "CAID is required"],
        unique: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
});

const CA = mongoose.models.CA || mongoose.model("CA", caSchema);

export default CA;
