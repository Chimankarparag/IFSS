import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { pan, firstName, middleName, lastName, dateOfBirth, gender, address } = body;

        const existingUser = await User.findOne({ pan_number: pan });
        
        if (existingUser) {
            if (!existingUser.isRegistered) {
                existingUser.firstName = firstName;
                existingUser.middleName = middleName;
                existingUser.lastName = lastName;
                existingUser.dob = dateOfBirth.split("T")[0]; // Format date
                existingUser.gender = gender;
                existingUser.address = address;

                await existingUser.save();

                return NextResponse.json({ success: true, message: "User data updated successfully" });
            } else {
                return NextResponse.json({ success: false, message: "PAN is already registered" }, { status: 400 });
            }
        }

        // Create a new user document
        const newUser = new User({
            pan_number: pan,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            dob: dateOfBirth.split("T")[0], // Format date
            gender: gender,
            address: address,
            isRegistered: true, // Mark as registered
        });

        await newUser.save();

        // Send verification email or handle verification logic
        // For example, you can generate a verification token and send an email

        return NextResponse.json({ success: true, message: "Registration successful" });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
