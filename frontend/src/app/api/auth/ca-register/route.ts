import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig/dbConfig';
import CARegModel from '@/models/caRegModel';

export async function POST(request: NextRequest) {
  try {
    await connect(); // Ensure the database connection is established

    const body = await request.json();
    const { caId, lastName, middleName, firstName, dateOfBirth, gender, email, address } = body;

    // Validate the input data
    if (!caId || !lastName || !middleName || !firstName || !dateOfBirth || !gender || !email || !address) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if CA ID already exists
    const existingCA = await CARegModel.findOne({ caId });
    if (existingCA) {
      return NextResponse.json(
        { success: false, message: 'CA ID already exists' },
        { status: 409 }
      );
    }

    // Create a new CA registration document
    const newCAReg = new CARegModel({
      caId,
      lastName,
      middleName,
      firstName,
      dateOfBirth: dateOfBirth.split('T')[0], // Format date
      gender,
      email,
      address,
    });

    // Save the document to the database
    await newCAReg.save();

    return NextResponse.json(
      { success: true, message: 'CA registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('CA registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}