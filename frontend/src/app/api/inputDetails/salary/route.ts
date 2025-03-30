import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import Income from "@/models/inputDetails/salaryModel";
import User from "@/models/userModel";

export async function PUT(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { income, email } = await request.json();

        if (!income || !email) {
            return NextResponse.json({ message: "All details are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        // Ensure all fields in income have default values of 0 or false
        const defaultIncome = {
            basicSalary: income.basicSalary || 0,
            pension: income.pension || 0,
            dearnessAllowance: income.dearnessAllowance || 0,
            bonusCommissions: income.bonusCommissions || 0,
            advanceSalary: income.advanceSalary || 0,
            arrearsSalary: income.arrearsSalary || 0,
            leaveEncashment: income.leaveEncashment || 0,
            gratuity: income.gratuity || 0,
            hraReceived: income.hraReceived || 0,
            entertainmentAllowance: income.entertainmentAllowance || 0,
            professionalTax: income.professionalTax || 0,
            otherComponents: income.otherComponents || 0,

            // Section 10 Exemptions
            rentPaid: income.rentPaid || 0,
            isMetro: income.isMetro || false,
            ltaClaimed: income.ltaClaimed || 0,
            childrenEducation: income.childrenEducation || 0,
            hostelAllowance: income.hostelAllowance || 0,
            transportAllowance: income.transportAllowance || 0,
            totalPension: income.totalPension || 0,
            commutedPension: income.commutedPension || 0,
            vrsCompensation: income.vrsCompensation || 0,

            // Perquisites
            rentFreeAccommodation: income.rentFreeAccommodation || 0,
            concessionInRent: income.concessionInRent || 0,
            companyCar: income.companyCar || 0,
            freeUtilities: income.freeUtilities || 0,
            medicalFacilities: income.medicalFacilities || 0,
            interestFreeLoans: income.interestFreeLoans || 0,
            esops: income.esops || 0,
            educationExpenses: income.educationExpenses || 0,

            // Profits in Lieu
            terminationCompensation: income.terminationCompensation || 0,
            retirementCompensation: income.retirementCompensation || 0,
            vrsAmount: income.vrsAmount || 0,
            keymanInsurance: income.keymanInsurance || 0,
            preEmploymentPayments: income.preEmploymentPayments || 0,
            postResignationPayments: income.postResignationPayments || 0,

            // Foreign Retirement
            foreignRetirementNotified: income.foreignRetirementNotified || 0,
            foreignRetirementNonNotified: income.foreignRetirementNonNotified || 0,
            section89AWithdrawal: income.section89AWithdrawal || 0,

            // Additional Details
            isGovernmentEmployee: income.isGovernmentEmployee || false,
            employeeAge: income.employeeAge || 0,
            hasGratuity: income.hasGratuity || false,
            unusedLeaves: income.unusedLeaves || 0,
            isRetiring: income.isRetiring || false,
            underOldTaxRegime: income.underOldTaxRegime || false,

            // Completion and Progress
            completed: income.completed || false,
            progress: income.progress || 0,
        };

        // Find and update existing income details or create a new one
        const updatedIncome = await Income.findOneAndUpdate(
            { user: user._id }, // Find income details by user ID
            {
                user: user._id,
                ...defaultIncome, // Use the default income object
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        return NextResponse.json({ message: "Income details saved successfully!", data: updatedIncome }, { status: 200 });
    } catch (error) {
        console.error("Error saving income details:", error);
        return NextResponse.json({ error: "An error occurred while saving income details" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { email } = await request.json(); // Parse the request body to get the email

        if (!email) {
            return NextResponse.json({ message: "User Data required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email }); // Find the user by email

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        const incomeDetails = await Income.findOne({ user: user._id }).select('-user'); // Fetch income details excluding the user field

        if (!incomeDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(incomeDetails, { status: 200 }); // Return the income details
    } catch (error) {
        console.error("Error fetching income details:", error);
        return NextResponse.json({ error: "An error occurred while fetching income details" }, { status: 500 });
    }
}