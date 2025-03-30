import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import Investments from "@/models/inputDetails/stocksModel";
import User from "@/models/userModel";

export async function PUT(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { investments, email } = await request.json();

        if (!investments || !email) {
            return NextResponse.json({ message: "All details are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        // Ensure all fields in investments have default values of 0
        const defaultInvestments = {
            stocks: investments.stocks || 0,
            mutualFunds: investments.mutualFunds || 0,
            fd: investments.fd || 0,
            ppf: investments.ppf || 0,
            completed: investments.completed || false,
            progress: investments.progress || 0,
        };

        // Find and update existing investment details or create a new one
        const updatedInvestments = await Investments.findOneAndUpdate(
            { user: user._id }, // Find investment details by user ID
            {
                user: user._id,
                ...defaultInvestments, // Use the default investments object
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        return NextResponse.json({ message: "Investment details saved successfully!", data: updatedInvestments }, { status: 200 });
    } catch (error) {
        console.error("Error saving investment details:", error);
        return NextResponse.json({ error: "An error occurred while saving investment details" }, { status: 500 });
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

        const investmentDetails = await Investments.findOne({ user: user._id }).select('-user'); // Fetch investment details excluding the user field

        if (!investmentDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(investmentDetails, { status: 200 }); // Return the investment details
    } catch (error) {
        console.error("Error fetching investment details:", error);
        return NextResponse.json({ error: "An error occurred while fetching investment details" }, { status: 500 });
    }
}