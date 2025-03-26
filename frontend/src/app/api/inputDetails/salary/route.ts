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

        // Create a new Income document with all the provided fields
        const incomeDetails = new Income({
            user: user._id,

            // Basic Salary Details
            basicSalary: income.basicSalary,
            pension: income.pension,
            dearnessAllowance: income.dearnessAllowance,
            bonusCommissions: income.bonusCommissions,
            advanceSalary: income.advanceSalary,
            arrearsSalary: income.arrearsSalary,
            leaveEncashment: income.leaveEncashment,
            gratuity: income.gratuity,
            hraReceived: income.hraReceived,
            entertainmentAllowance: income.entertainmentAllowance,
            professionalTax: income.professionalTax,
            otherComponents: income.otherComponents,

            // Section 10 Exemptions
            rentPaid: income.rentPaid,
            isMetro: income.isMetro,
            ltaClaimed: income.ltaClaimed,
            childrenEducation: income.childrenEducation,
            hostelAllowance: income.hostelAllowance,
            transportAllowance: income.transportAllowance,
            totalPension: income.totalPension,
            commutedPension: income.commutedPension,
            vrsCompensation: income.vrsCompensation,

            // Perquisites
            rentFreeAccommodation: income.rentFreeAccommodation,
            concessionInRent: income.concessionInRent,
            companyCar: income.companyCar,
            freeUtilities: income.freeUtilities,
            medicalFacilities: income.medicalFacilities,
            interestFreeLoans: income.interestFreeLoans,
            esops: income.esops,
            educationExpenses: income.educationExpenses,

            // Profits in Lieu
            terminationCompensation: income.terminationCompensation,
            retirementCompensation: income.retirementCompensation,
            vrsAmount: income.vrsAmount,
            keymanInsurance: income.keymanInsurance,
            preEmploymentPayments: income.preEmploymentPayments,
            postResignationPayments: income.postResignationPayments,

            // Foreign Retirement
            foreignRetirementNotified: income.foreignRetirementNotified,
            foreignRetirementNonNotified: income.foreignRetirementNonNotified,
            section89AWithdrawal: income.section89AWithdrawal,

            // Additional Details
            isGovernmentEmployee: income.isGovernmentEmployee,
            employeeAge: income.employeeAge,
            hasGratuity: income.hasGratuity,
            unusedLeaves: income.unusedLeaves,
            isRetiring: income.isRetiring,
            underOldTaxRegime: income.underOldTaxRegime,

            // Completion and Progress
            completed: income.completed,
            progress: income.progress,
        });

        // Save the income document to the database
        await incomeDetails.save();

        return NextResponse.json({ message: "Income details saved successfully!" }, { status: 201 });
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