import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import Housing from "@/models/inputDetails/houseModel";
import User from "@/models/userModel";

export async function PUT(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { housing, email } = await request.json();

        if (!housing || !email) {
            return NextResponse.json({ message: "All details are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        // Create a new Housing document with all the provided fields
        const housingDetails = new Housing({
            user: user._id,

            // Housing Details
            interestSelfOccupied: housing.interestSelfOccupied,
            rentalIncome: housing.rentalIncome,
            municipalTaxes: housing.municipalTaxes,
            unrealisedRent: housing.unrealisedRent,
            interestLetOut: housing.interestLetOut,

            // Completion and Progress
            completed: housing.completed,
            progress: housing.progress,
        });

        // Save the housing document to the database
        await housingDetails.save();

        return NextResponse.json({ message: "Housing details saved successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error saving housing details:", error);
        return NextResponse.json({ error: "An error occurred while saving housing details" }, { status: 500 });
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

        const housingDetails = await Housing.findOne({ user: user._id }).select('-user'); // Fetch housing details excluding the user field

        if (!housingDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(housingDetails, { status: 200 }); // Return the housing details
    } catch (error) {
        console.error("Error fetching housing details:", error);
        return NextResponse.json({ error: "An error occurred while fetching housing details" }, { status: 500 });
    }
}