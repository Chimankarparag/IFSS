import mongoose from "mongoose";

const otherSourcesSchema = new mongoose.Schema({
    interestSavings: {
        type: Number,
        required: true,
    },
    interestSecurities: {
        type: Number,
        required: true,
    },
    otherInterest: {
        type: Number,
        required: true,
    },
    commissionIncome: {
        type: Number,
        required: true,
    },
    dividendIncome: {
        type: Number,
        required: true,
    },
    lotteryWinnings: {
        type: Number,
        required: true,
    },
    familyPension: {
        type: Number,
        required: true,
    },
    unexplainedIncome: {
        type: Number,
        required: true,
    },
    patentRoyalty: {
        type: Number,
        required: true,
    },
    carbonCredit: {
        type: Number,
        required: true,
    },
    prematurePF: {
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

const OtherSources = mongoose.models.OtherSources || mongoose.model("OtherSources", otherSourcesSchema);

export default OtherSources;