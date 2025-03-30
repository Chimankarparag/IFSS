import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import Deductions from "@/models/inputDetails/deductionsModel";
import User from "@/models/userModel";

export async function PUT(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { deductions, email } = await request.json();

        if (!deductions || !email) {
            return NextResponse.json({ message: "All details are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 401 });
        }

        // Find and update existing deductions or create a new one
        const updatedDeductions = await Deductions.findOneAndUpdate(
            { user: user._id }, // Find deductions by user ID
            {
                // Update fields
                user: user._id,
                section80C: deductions.section80C,
                section80CCC: deductions.section80CCC,
                section80CCD1: deductions.section80CCD1,
                section80CCD1B: deductions.section80CCD1B,
                section80CCD2: deductions.section80CCD2,
                section80D: deductions.section80D,
                section80DD: deductions.section80DD,
                section80DDB: deductions.section80DDB,
                section80E: deductions.section80E,
                section80EE: deductions.section80EE,
                section80EEA: deductions.section80EEA,
                section80EEB: deductions.section80EEB,
                section80G: deductions.section80G,
                section80GG: deductions.section80GG,
                section80GGA: deductions.section80GGA,
                section80GGC: deductions.section80GGC,
                section80TTA: deductions.section80TTA,
                section80TTB: deductions.section80TTB,
                section80U: deductions.section80U,
                completed: deductions.completed,
                progress: deductions.progress,
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        return NextResponse.json({ message: "Deductions details saved successfully!", data: updatedDeductions }, { status: 200 });
    } catch (error) {
        console.error("Error saving deductions details:", error);
        return NextResponse.json({ error: "An error occurred while saving deductions details" }, { status: 500 });
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

        const deductionDetails = await Deductions.findOne({ user: user._id }).select('-user'); // Fetch deduction details excluding the user field

        if (!deductionDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(deductionDetails, { status: 200 }); // Return the deduction details
    } catch (error) {
        console.error("Error fetching income details:", error);
        return NextResponse.json({ error: "An error occurred while fetching deduction details" }, { status: 500 });
    }
}