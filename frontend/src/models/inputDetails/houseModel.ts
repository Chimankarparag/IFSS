import mongoose from "mongoose";

const housingSchema = new mongoose.Schema({
    interestSelfOccupied: {
        type: Number,
        required: true,
    },
    rentalIncome: {
        type: Number,
        required: true,
    },
    municipalTaxes: {
        type: Number,
        required: true,
    },
    unrealisedRent: {
        type: Number,
        required: true,
    },
    interestLetOut: {
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

const Housing = mongoose.models.Housing || mongoose.model("Housing", housingSchema);

export default Housing;