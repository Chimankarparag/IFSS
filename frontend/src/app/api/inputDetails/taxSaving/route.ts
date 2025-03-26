import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import TaxSaving from "@/models/inputDetails/tdsAndAdvanceTaxModel";
import User from "@/models/userModel";

export async function PUT(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { taxSaving, email } = await request.json();

        if (!taxSaving || !email) {
            return NextResponse.json({ message: "All details are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        // Create a new TaxSaving document with all the provided fields
        const taxSavingDetails = new TaxSaving({
            user: user._id,

            // Tax Saving Details
            TDSpaid: taxSaving.TDSpaid,
            advancetaxJune: taxSaving.advancetaxJune,
            advancetaxSept: taxSaving.advancetaxSept,
            advancetaxDec: taxSaving.advancetaxDec,
            advancetaxMar: taxSaving.advancetaxMar,
            monthOfItrFiling: taxSaving.monthOfItrFiling,

            // Completion and Progress
            completed: taxSaving.completed,
            progress: taxSaving.progress,
        });

        // Save the tax saving document to the database
        await taxSavingDetails.save();

        return NextResponse.json({ message: "Tax saving details saved successfully!" }, { status: 201 });
    } catch (error) {
        console.error("Error saving tax saving details:", error);
        return NextResponse.json({ error: "An error occurred while saving tax saving details" }, { status: 500 });
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

        const taxSavingDetails = await TaxSaving.findOne({ user: user._id }).select('-user'); // Fetch tax saving details excluding the user field

        if (!taxSavingDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(taxSavingDetails, { status: 200 }); // Return the tax saving details
    } catch (error) {
        console.error("Error fetching tax saving details:", error);
        return NextResponse.json({ error: "An error occurred while fetching tax saving details" }, { status: 500 });
    }
}