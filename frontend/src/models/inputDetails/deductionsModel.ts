import mongoose from "mongoose";

const deductionsSchema = new mongoose.Schema({
    section80C: {
        type: Number,
        required: true,
        trim : true,
    },
    section80CCC: {
        type: Number,
        required: true,
        trim : true,
    },
    section80CCD1: {
        type: Number,
        required: true,
        trim : true,
    },
    section80CCD1B: {
        type: Number,
        required: true,
        trim : true,
    },
    section80CCD2: {
        type: Number,
        required: true,
        trim : true,
    },
    section80D: {
        type: Number,
        required: true,
        trim : true,
    },
    section80DD: {
        type: Number,
        required: true,
        trim : true,
    },
    section80DDB: {
        type: Number,
        required: true,
        trim : true,
    },
    section80E: {
        type: Number,
        required: true,
        trim : true,
    },
    section80EE: {
        type: Number,
        required: true,
        trim : true,
    },
    section80EEA: {
        type: Number,
        required: true,
        trim : true,
    },
    section80EEB: {
        type: Number,
        required: true,
        trim : true,
    },
    section80G: {
        type: Number,
        required: true,
        trim : true,
    },
    section80GG: {
        type: Number,
        required: true,
        trim : true,
    },
    section80GGA: {
        type: Number,
        required: true,
        trim : true,
    },
    section80GGC: {
        type: Number,
        required: true,
        trim : true,
    },
    section80TTA: {
        type: Number,
        required: true,
        trim : true,
    },
    section80TTB: {
        type: Number,
        required: true,
        trim : true,
    },
    section80U: {
        type: Number,
        required: true,
        trim : true,
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

const Deductions = mongoose.models.Deductions ||mongoose.model("Deductions", deductionsSchema);

export default Deductions;