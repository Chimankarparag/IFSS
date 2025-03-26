import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    // Basic Salary Details
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    pension: {
        type: Number,
        required: true,
    },
    dearnessAllowance: {
        type: Number,
        required: true,
    },
    bonusCommissions: {
        type: Number,
        required: true,
    },
    advanceSalary: {
        type: Number,
        required: true,
    },
    arrearsSalary: {
        type: Number,
        required: true,
    },
    leaveEncashment: {
        type: Number,
        required: true,
    },
    gratuity: {
        type: Number,
        required: true,
    },
    hraReceived: {
        type: Number,
        required: true,
    },
    entertainmentAllowance: {
        type: Number,
        required: true,
    },
    professionalTax: {
        type: Number,
        required: true,
    },
    otherComponents: {
        type: Number,
        required: true,
    },

    // Section 10 Exemptions
    rentPaid: {
        type: Number,
        required: true,
    },
    isMetro: {
        type: Boolean,
        required: true,
    },
    ltaClaimed: {
        type: Number,
        required: true,
    },
    childrenEducation: {
        type: Number,
        required: true,
    },
    hostelAllowance: {
        type: Number,
        required: true,
    },
    transportAllowance: {
        type: Number,
        required: true,
    },
    totalPension: {
        type: Number,
        required: true,
    },
    commutedPension: {
        type: Number,
        required: true,
    },
    vrsCompensation: {
        type: Number,
        required: true,
    },

    // Perquisites
    rentFreeAccommodation: {
        type: Number,
        required: true,
    },
    concessionInRent: {
        type: Number,
        required: true,
    },
    companyCar: {
        type: Number,
        required: true,
    },
    freeUtilities: {
        type: Number,
        required: true,
    },
    medicalFacilities: {
        type: Number,
        required: true,
    },
    interestFreeLoans: {
        type: Number,
        required: true,
    },
    esops: {
        type: Number,
        required: true,
    },
    educationExpenses: {
        type: Number,
        required: true,
    },

    // Profits in Lieu
    terminationCompensation: {
        type: Number,
        required: true,
    },
    retirementCompensation: {
        type: Number,
        required: true,
    },
    vrsAmount: {
        type: Number,
        required: true,
    },
    keymanInsurance: {
        type: Number,
        required: true,
    },
    preEmploymentPayments: {
        type: Number,
        required: true,
    },
    postResignationPayments: {
        type: Number,
        required: true,
    },

    // Foreign Retirement
    foreignRetirementNotified: {
        type: Number,
        required: true,
    },
    foreignRetirementNonNotified: {
        type: Number,
        required: true,
    },
    section89AWithdrawal: {
        type: Number,
        required: true,
    },

    // Additional Details
    isGovernmentEmployee: {
        type: Boolean,
        required: true,
    },
    employeeAge: {
        type: Number,
        required: true,
    },
    hasGratuity: {
        type: Boolean,
        required: true,
    },
    unusedLeaves: {
        type: Number,
        required: true,
    },
    isRetiring: {
        type: Boolean,
        required: true,
    },
    underOldTaxRegime: {
        type: Boolean,
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

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;