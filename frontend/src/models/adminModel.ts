import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
    },
    adminId: {
        type: String,
        required: [true, "AdminID is required"],
        unique: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;