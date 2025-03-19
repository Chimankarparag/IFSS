import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import PAN from "@/models/panModel";

export async function POST(request: NextRequest) {
  try {
    await connect(); // Ensure the database connection is established

    const body = await request.json();
    const { pan } = body;

    if (!pan) {
      return NextResponse.json(
        { success: false, message: "PAN is required" },
        { status: 400 }
      );
    }

    console.log("Received PAN:", pan);

    // Check if PAN exists in your MongoDB database
    const panExists = await PAN.findOne({ pan_number : pan });

    if (!panExists) {
      return NextResponse.json(
        { success: false, message: "PAN not found in our records" },
        { status: 404 }
      );
    }

    // If PAN is found but user already exists with completed registration
    if (panExists.isRegistered) {
      return NextResponse.json(
        { success: false, message: "An account with this PAN already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "PAN verified successfully",

      panDetails: {
        pan: panExists.pan_number,
        name: panExists.name,
        dob: panExists.dob
      }
    });
  } catch (error) {
    console.error("PAN verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}