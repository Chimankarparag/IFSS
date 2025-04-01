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

        // Ensure all fields in otherSources have default values of 0
        const defaultOtherSources = {
            interestSavings: otherSources.interestSavings || 0,
            interestSecurities: otherSources.interestSecurities || 0,
            otherInterest: otherSources.otherInterest || 0,
            commissionIncome: otherSources.commissionIncome || 0,
            dividendIncome: otherSources.dividendIncome || 0,
            lotteryWinnings: otherSources.lotteryWinnings || 0,
            familyPension: otherSources.familyPension || 0,
            unexplainedIncome: otherSources.unexplainedIncome || 0,
            patentRoyalty: otherSources.patentRoyalty || 0,
            carbonCredit: otherSources.carbonCredit || 0,
            prematurePF: otherSources.prematurePF || 0,
            completed: otherSources.completed || false,
            progress: otherSources.progress || 0,
        };

        // Find and update existing other sources details or create a new one
        const updatedOtherSources = await OtherSources.findOneAndUpdate(
            { user: user._id }, // Find other sources details by user ID
            {
                user: user._id,
                ...defaultOtherSources, // Use the default other sources object
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        return NextResponse.json({ message: "Other sources details saved successfully!", data: updatedOtherSources }, { status: 200 });
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

        const otherSourcesDetails = await OtherSources.findOne({ user: user._id }).select('-user -_id -__v'); // Fetch other sources details excluding the user field

        if (!otherSourcesDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(otherSourcesDetails, { status: 200 }); // Return the other sources details
    } catch (error) {
        console.error("Error fetching other sources details:", error);
        return NextResponse.json({ error: "An error occurred while fetching other sources details" }, { status: 500 });
    }
}