import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

// Clear the model if it exists to prevent overwriting
delete mongoose.models.OTP;

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
