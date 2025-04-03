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

        // Send the data to the C++ server
        const cppResponse = await axios.post(
            "http://backend:5000/api/calculate",
            userData
        );

        // Generate ITR Summary using OpenAI GPT
        const itrSummary = await generateITRSummaryWithOpenAI(cppResponse.data, salary.underOldTaxRegime);

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

async function generateITRSummaryWithOpenAI(cppData: any, underOldTaxRegime: boolean) {
    try {
        const regimeSpecificPrompt = underOldTaxRegime 
            ? "Analyze this tax data under the old tax regime with applicable deductions."
            : "Analyze this tax data under the new tax regime where standard deductions are NOT applicable. Include a note in the summary that deductions cannot be claimed under the new tax regime.";
        
        const prompt = `
            ${regimeSpecificPrompt}
            Tax data:
            ${JSON.stringify(cppData)}
            
            You must return a JSON object with EXACTLY this structure:
            {
                "summary": "A concise paragraph summarizing key deductions claimed, total income, and tax status",
                "breakdown": {
                    "Total Income": {
                        "Gross Salary": [number],
                        "Income Under Head Salaries": [number],
                        "Income Under House Property": [number],
                        "Other Income": [number],
                        "Gross Total Income": [number]
                    },
                    "Total Deductions": {
                        ${underOldTaxRegime ? `
                        "Standard Deduction": [number],
                        "Professional Tax": [number],
                        "Section 80C": [number],
                        "Section 80CCD1": [number],
                        "Section 80CCD1B": [number],
                        "Section 80D": [number],
                        "Section 80E": [number],
                        "Section 80EE": [number],
                        "Section 80G": [number],
                        "Section 80TTA": [number],
                        "Total Deductions": [number]
                        ` : `
                        "Message": "Deductions cannot be claimed under the new tax regime",
                        "Total Deductions": 0
                        `}
                    },
                    "Taxable Income": [number],
                    "Tax Liability": [number],
                    "Tax Paid": [number],
                    "Refund Amount": [number],
                    ${underOldTaxRegime ? `
                    "Tax Saving Opportunities": {
                        "Section 80C": "Description of opportunities",
                        "Section 80D": "Description of opportunities",
                        "Section 80E": "Description of opportunities"
                    }
                    ` : `
                    "Tax Saving Opportunities": {
                        "Message": "No tax saving opportunities available under the new tax regime"
                    }
                    `}
                }
            }
            
            Important rules:
            1. All monetary values MUST be numbers only (no currency symbols, commas, or strings)
            2. Use 0 for any values that are not applicable or missing
            3. The "summary" field should be a clear, concise paragraph
            4. ${underOldTaxRegime ? "Only include sections in 'Tax Saving Opportunities' that are relevant" : "Make sure to mention that deductions cannot be claimed under the new tax regime in the summary"}
            5. Return ONLY valid JSON without markdown formatting or additional text
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.2, // Lower temperature for more consistent results
        });

        const summary = response.choices[0]?.message?.content || "Unable to generate summary.";
        const parsedSummary = JSON.parse(summary);
        
        // Validate and ensure all required fields exist with proper types
        const validatedSummary = {
            summary: parsedSummary.summary || "No summary available.",
            breakdown: {
                "Total Income": {
                    "Gross Salary": Number(parsedSummary.breakdown?.["Total Income"]?.["Gross Salary"]) || 0,
                    "Income Under Head Salaries": Number(parsedSummary.breakdown?.["Total Income"]?.["Income Under Head Salaries"]) || 0,
                    "Income Under House Property": Number(parsedSummary.breakdown?.["Total Income"]?.["Income Under House Property"]) || 0,
                    "Other Income": Number(parsedSummary.breakdown?.["Total Income"]?.["Other Income"]) || 0,
                    "Gross Total Income": Number(parsedSummary.breakdown?.["Total Income"]?.["Gross Total Income"]) || 0
                },
                "Total Deductions": underOldTaxRegime ? {
                    "Standard Deduction": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Standard Deduction"]) || 0,
                    "Professional Tax": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Professional Tax"]) || 0,
                    "Section 80C": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80C"]) || 0,
                    "Section 80CCD1": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80CCD1"]) || 0,
                    "Section 80CCD1B": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80CCD1B"]) || 0,
                    "Section 80D": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80D"]) || 0,
                    "Section 80E": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80E"]) || 0,
                    "Section 80EE": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80EE"]) || 0,
                    "Section 80G": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80G"]) || 0,
                    "Section 80TTA": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Section 80TTA"]) || 0,
                    "Total Deductions": Number(parsedSummary.breakdown?.["Total Deductions"]?.["Total Deductions"]) || 0
                } : {
                    "Message": "Deductions cannot be claimed under the new tax regime",
                    "Total Deductions": 0
                },
                "Taxable Income": Number(parsedSummary.breakdown?.["Taxable Income"]) || 0,
                "Tax Liability": Number(parsedSummary.breakdown?.["Tax Liability"]) || 0,
                "Tax Paid": Number(parsedSummary.breakdown?.["Tax Paid"]) || 0,
                "Refund Amount": Number(parsedSummary.breakdown?.["Refund Amount"]) || 0,
                "Tax Saving Opportunities": underOldTaxRegime ? 
                    (parsedSummary.breakdown?.["Tax Saving Opportunities"] || {}) : 
                    { "Message": "No tax saving opportunities available under the new tax regime" }
            }
        };
        
        return validatedSummary;
    } catch (error) {
        console.error("Error generating ITR summary with OpenAI:", error);
        return { 
            error: "Error generating ITR summary.",
            summary: "Unable to generate summary data.",
            breakdown: {
                "Total Income": {
                    "Gross Salary": 0,
                    "Income Under Head Salaries": 0,
                    "Income Under House Property": 0,
                    "Other Income": 0,
                    "Gross Total Income": 0
                },
                "Total Deductions": underOldTaxRegime ? {
                    "Standard Deduction": 0,
                    "Professional Tax": 0,
                    "Section 80C": 0,
                    "Section 80CCD1": 0,
                    "Section 80CCD1B": 0,
                    "Section 80D": 0,
                    "Section 80E": 0,
                    "Section 80EE": 0,
                    "Section 80G": 0,
                    "Section 80TTA": 0,
                    "Total Deductions": 0
                } : {
                    "Message": "Deductions cannot be claimed under the new tax regime",
                    "Total Deductions": 0
                },
                "Taxable Income": 0,
                "Tax Liability": 0,
                "Tax Paid": 0,
                "Refund Amount": 0,
                "Tax Saving Opportunities": underOldTaxRegime ? 
                    {} : 
                    { "Message": "No tax saving opportunities available under the new tax regime" }
            } 
        };
    }
}