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

        // Ensure all fields in housing have default values of 0 or false
        const defaultHousing = {
            interestSelfOccupied: housing.interestSelfOccupied || 0,
            rentalIncome: housing.rentalIncome || 0,
            municipalTaxes: housing.municipalTaxes || 0,
            unrealisedRent: housing.unrealisedRent || 0,
            interestLetOut: housing.interestLetOut || 0,
            completed: housing.completed || false,
            progress: housing.progress || 0,
        };

        // Find and update existing housing details or create a new one
        const updatedHousing = await Housing.findOneAndUpdate(
            { user: user._id }, // Find housing details by user ID
            {
                user: user._id,
                ...defaultHousing, // Use the default housing object
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        return NextResponse.json({ message: "Housing details saved successfully!", data: updatedHousing }, { status: 200 });
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

        const housingDetails = await Housing.findOne({ user: user._id }).select('-user -_id -__v'); // Fetch housing details excluding the user field

        if (!housingDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(housingDetails, { status: 200 }); // Return the housing details
    } catch (error) {
        console.error("Error fetching housing details:", error);
        return NextResponse.json({ error: "An error occurred while fetching housing details" }, { status: 500 });
    }
}