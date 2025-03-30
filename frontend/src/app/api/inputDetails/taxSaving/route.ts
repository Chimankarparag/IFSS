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

        // Ensure all fields in taxSaving have default values of 0 or false
        const defaultTaxSaving = {
            TDSpaid: taxSaving.TDSpaid || 0,
            advancetaxJune: taxSaving.advancetaxJune || 0,
            advancetaxSept: taxSaving.advancetaxSept || 0,
            advancetaxDec: taxSaving.advancetaxDec || 0,
            advancetaxMar: taxSaving.advancetaxMar || 0,
            monthOfItrFiling: taxSaving.monthOfItrFiling || 0,
            completed: taxSaving.completed || false,
            progress: taxSaving.progress || 0,
        };

        // Find and update existing tax saving details or create a new one
        const updatedTaxSaving = await TaxSaving.findOneAndUpdate(
            { user: user._id }, // Find tax saving details by user ID
            {
                user: user._id,
                ...defaultTaxSaving, // Use the default tax saving object
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        return NextResponse.json({ message: "Tax saving details saved successfully!", data: updatedTaxSaving }, { status: 200 });
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