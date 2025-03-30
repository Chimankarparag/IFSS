import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import Deductions from "@/models/inputDetails/deductionsModel";
import Salary from "@/models/inputDetails/salaryModel";
import Housing from "@/models/inputDetails/houseModel";
import Investments from "@/models/inputDetails/stocksModel";
import OtherSources from "@/models/inputDetails/otherSourcesModel";
import TaxSaving from "@/models/inputDetails/tdsAndAdvanceTaxModel";
import User from "@/models/userModel";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { email, cppServerUrl } = await request.json();


        if (!email || !cppServerUrl) {
            return NextResponse.json({ message: "Email and C++ server URL are required!" }, { status: 400 });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User Doesn't Exist" }, { status: 404 });
        }

        // Fetch data from all collections for the user
        const deductions = await Deductions.findOne({ user: user._id }).select('-user');
        const salary = await Salary.findOne({ user: user._id }).select('-user');
        const housing = await Housing.findOne({ user: user._id }).select('-user');
        const investments = await Investments.findOne({ user: user._id }).select('-user');
        const otherSources = await OtherSources.findOne({ user: user._id }).select('-user');
        const taxSaving = await TaxSaving.findOne({ user: user._id }).select('-user');

        // Combine all data into a single object
        const userData = {
            deductions: deductions || {},
            salary: salary || {},
            housing: housing || {},
            investments: investments || {},
            otherSources: otherSources || {},
            taxSaving: taxSaving || {},
        };

        console.log("Current userData:", userData);

        // Send the data to the C++ server
        const cppResponse = await axios.post(
            "http://127.0.0.1:5000/api/calculate",
            userData
          );

        console.log("C++ server response:", cppResponse.data);

        // Return the response from the C++ server
        return NextResponse.json({ message: "Data processed successfully!", cppResponse: cppResponse.data }, { status: 200 });
    } catch (error) {
        console.error("Error processing data:", error);
        return NextResponse.json({ error: "An error occurred while processing data" }, { status: 500 });
    }
}