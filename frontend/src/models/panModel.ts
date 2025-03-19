// panModel.ts
import mongoose from "mongoose";

const panSchema = new mongoose.Schema({
    pan_number: {
        type: String,
        required: [true, "PAN is required"],
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
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
    isRegistered: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
    collection: 'PAN'  // Updated to match the exact collection name in MongoDB
});

// Clear the model if it exists to prevent overwriting
delete mongoose.models.PAN;

const PAN = mongoose.model("PAN", panSchema);

export default PAN;
