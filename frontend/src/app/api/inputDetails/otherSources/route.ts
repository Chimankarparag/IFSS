import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import OtherSources from "@/models/inputDetails/otherSourcesModel";
import User from "@/models/userModel";

export async function PUT(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { otherSources, email } = await request.json();

        if (!otherSources || !email) {
            return NextResponse.json({ message: "All details are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        // Create a new OtherSources document with all the provided fields
        const otherSourcesDetails = new OtherSources({
            user: user._id,

            // Other Sources Income Details
            interestSavings: otherSources.interestSavings,
            interestSecurities: otherSources.interestSecurities,
            otherInterest: otherSources.otherInterest,
            commissionIncome: otherSources.commissionIncome,
            dividendIncome: otherSources.dividendIncome,
            lotteryWinnings: otherSources.lotteryWinnings,
            familyPension: otherSources.familyPension,
            unexplainedIncome: otherSources.unexplainedIncome,
            patentRoyalty: otherSources.patentRoyalty,
            carbonCredit: otherSources.carbonCredit,
            prematurePF: otherSources.prematurePF,

            // Completion and Progress
            completed: otherSources.completed,
            progress: otherSources.progress,
        });

        // Save the other sources document to the database
        await otherSourcesDetails.save();

        return NextResponse.json({ message: "Other sources details saved successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error saving other sources details:", error);
        return NextResponse.json({ error: "An error occurred while saving other sources details" }, { status: 500 });
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

        const otherSourcesDetails = await OtherSources.findOne({ user: user._id }).select('-user'); // Fetch other sources details excluding the user field

        if (!otherSourcesDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(otherSourcesDetails, { status: 200 }); // Return the other sources details
    } catch (error) {
        console.error("Error fetching other sources details:", error);
        return NextResponse.json({ error: "An error occurred while fetching other sources details" }, { status: 500 });
    }
}