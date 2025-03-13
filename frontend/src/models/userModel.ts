import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    pan_number: {
        type: String,
        required: [true, "PAN is required"],
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
    },
    middleName: {
        type: String,
        required: [true, "Middle Name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
    },
    gender: { 
        type: String, 
        required: true 
    },
    phone: {
        type: String,
        trim: true,
    },
    dob: {
        type: String, 
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    password: {
        type: String,
    },
    isRegistered: {
        type: Boolean,
        default: false,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
    collection: 'Users'  // Updated to match the exact collection name in MongoDB
});

// Clear the model if it exists to prevent overwriting
delete mongoose.models.Users;

const User = mongoose.model("Users", userSchema);

export default User;