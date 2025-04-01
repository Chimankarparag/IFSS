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
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
    try {
        await connect(); // Connect to the database

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required!" }, { status: 400 });
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

        // Generate ITR Summary using OpenAI GPT
        const itrSummary = await generateITRSummaryWithOpenAI(cppResponse.data);

        // Return the response from the C++ server along with the ITR summary
        return NextResponse.json(
            {
                message: "Data processed successfully!",
                cppResponse: cppResponse.data,
                itrSummary: itrSummary,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing data:", error);
        return NextResponse.json({ error: "An error occurred while processing data" }, { status: 500 });
    }
}

// Helper function to generate ITR Summary using OpenAI GPT
async function generateITRSummaryWithOpenAI(cppData: any) {
    try {
        const prompt = `
            Based on the following tax calculation data, generate a concise ITR summary:
            Data: ${JSON.stringify(cppData)}
            Provide the summary in the following format:
            - Total Income: [value]
            - Total Deductions: [value]
            - Taxable Income: [value]
            - Tax Liability: [value]
            - Tax Paid: [value]
            - Refund: [value]
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        const summary = response.choices[0]?.message?.content || "Unable to generate summary.";
        return summary;
    } catch (error) {
        console.error("Error generating ITR summary with OpenAI:", error);
        return "Error generating ITR summary.";
    }
}