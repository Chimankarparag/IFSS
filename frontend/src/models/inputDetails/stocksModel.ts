import mongoose from "mongoose";

const investmentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stocks: {
        type: Number,
        required: true,
    },
    mutualFunds: {
        type: Number,
        required: true,
    },
    fd: {
        type: Number,
        required: true,
    },
    ppf: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    progress: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Investments = mongoose.models.Investments || mongoose.model("Investments", investmentsSchema);

export default Investments;