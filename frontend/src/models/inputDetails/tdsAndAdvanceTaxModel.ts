import mongoose from "mongoose";

const taxSavingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    TDSpaid: {
        type: Number,
        required: true,
    },
    advancetaxJune: {
        type: Number,
        required: true,
    },
    advancetaxSept: {
        type: Number,
        required: true,
    },
    advancetaxDec: {
        type: Number,
        required: true,
    },
    advancetaxMar: {
        type: Number,
        required: true,
    },
    monthOfItrFiling: {
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

const TaxSaving = mongoose.models.TaxSaving || mongoose.model("TaxSaving", taxSavingSchema);

export default TaxSaving;