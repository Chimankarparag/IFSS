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

        // Ensure all fields in deductions have default values of 0
        const defaultDeductions = {
            section80C: deductions.section80C || 0,
            section80CCC: deductions.section80CCC || 0,
            section80CCD1: deductions.section80CCD1 || 0,
            section80CCD1B: deductions.section80CCD1B || 0,
            section80CCD2: deductions.section80CCD2 || 0,
            section80D: deductions.section80D || 0,
            section80DD: deductions.section80DD || 0,
            section80DDB: deductions.section80DDB || 0,
            section80E: deductions.section80E || 0,
            section80EE: deductions.section80EE || 0,
            section80EEA: deductions.section80EEA || 0,
            section80EEB: deductions.section80EEB || 0,
            section80G: deductions.section80G || 0,
            section80GG: deductions.section80GG || 0,
            section80GGA: deductions.section80GGA || 0,
            section80GGC: deductions.section80GGC || 0,
            section80TTA: deductions.section80TTA || 0,
            section80TTB: deductions.section80TTB || 0,
            section80U: deductions.section80U || 0,
            completed: deductions.completed,
            progress: deductions.progress,
        };

        // Find and update existing deductions or create a new one
        const updatedDeductions = await Deductions.findOneAndUpdate(
            { user: user._id }, // Find deductions by user ID
            {
                user: user._id,
                ...defaultDeductions, // Use the default deductions object
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

        const deductionDetails = await Deductions.findOne({ user: user._id }).select('-user -_id -__v'); // Fetch deduction details excluding the user field

        if (!deductionDetails) {
            return NextResponse.json({ message: "Unable to fetch Data" }, { status: 404 });
        }

        return NextResponse.json(deductionDetails, { status: 200 }); // Return the deduction details
    } catch (error) {
        console.error("Error fetching income details:", error);
        return NextResponse.json({ error: "An error occurred while fetching deduction details" }, { status: 500 });
    }
}