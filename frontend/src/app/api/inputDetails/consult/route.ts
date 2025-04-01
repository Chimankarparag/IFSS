import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbConfig';
import Message from "@/models/messageModel";
import CA from "@/models/caModel";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
import { OpenAI } from "openai";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
    try {

        await connect(); // Connect to the database

        const { email, itrSummary, itrDetails } = await request.json();

        // Validate request data
        if (!email) {
            return NextResponse.json({ 
                success: false, 
                message: "Email is required" 
            }, { status: 400 });
        }

        if (!itrSummary || !itrDetails) {
            return NextResponse.json({ 
                success: false, 
                message: "ITR summary and details are required" 
            }, { status: 400 });
        }

        // Verify user exists and has permission to perform this action
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ 
                success: false, 
                message: "User not found" 
            }, { status: 404 });
        }

        // Get user's full name and contact information for the email
        const userName = user.firstName || "Client";
        const userContact = user.phone || email;

        // Find available CA with the lowest workload
        const ca = await CA.aggregate([
            {
                $match: { status: "active" }
            },
            {
                $addFields: {
                    workRatio: {
                        $cond: {
                            if: { $eq: [{ $add: ["$work", "$workdone"] }, 0] },
                            then: 0,
                            else: { $divide: ["$work", { $add: ["$work", "$workdone"] }] }
                        }
                    }
                }
            },
            {
                $sort: { workRatio: 1 }
            },
            {
                $limit: 1
            }
        ]).then(result => result[0]);

        if (!ca) {
            return NextResponse.json({ 
                success: false, 
                message: "All CAs are currently busy. Please try again later." 
            }, { status: 503 });
        }

        // Calculate deadline date (15 days from now)
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 15);
        const formattedDeadline = deadlineDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Get financial year based on current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-11
        let financialYearStart, financialYearEnd;
        
        // In India, financial year runs from April 1 to March 31
        if (currentMonth >= 3) { // April (3) onwards
            financialYearStart = currentDate.getFullYear();
            financialYearEnd = currentDate.getFullYear() + 1;
        } else { // January to March
            financialYearStart = currentDate.getFullYear() - 1;
            financialYearEnd = currentDate.getFullYear();
        }

        // Generate email content with user data and deadline
        const mailerData = await generateMailerForCA(
            itrDetails, 
            itrSummary, 
            userName, 
            userContact, 
            formattedDeadline,
            financialYearStart,
            financialYearEnd
        );

        // Create new message
        const msg = new Message({
            sender: user._id,
            recipient: ca._id,
            subject: mailerData.subject,
            content: mailerData.content,
            status: "unread",
            createdAt: new Date()
        });

        await msg.save();

        // Update CA's workload
        await CA.findByIdAndUpdate(ca._id, {
            $inc: { work: 1 }
        });

        return NextResponse.json({ 
            success: true, 
            message: "Your request has been sent to a Chartered Accountant. They will review your ITR and contact you soon.",
            caName: ca.name
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error sending message to CA:", error);
        
        // Provide detailed error message based on error type
        const errorMessage = error.code === 11000 ? 
            "A duplicate record exists" : 
            "An error occurred while processing your request";
            
        return NextResponse.json({ 
            success: false, 
            message: errorMessage,
            detail: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}

async function generateMailerForCA(
    itrDetails: any, 
    itrSummary: any, 
    userName: string, 
    userContact: string,
    deadlineDate: string,
    financialYearStart: number,
    financialYearEnd: number
) {
    try {
        // Format currency for better readability
        const formatCurrency = (amount: number) => {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amount).replace('₹', '₹ ');
        };

        // Extract key information from the summary
        const totalIncome = itrSummary.breakdown["Total Income"]["Gross Total Income"];
        const totalDeductions = itrSummary.breakdown["Total Deductions"]["Total Deductions"];
        const taxableIncome = itrSummary.breakdown["Taxable Income"];
        const taxLiability = itrSummary.breakdown["Tax Liability"];
        const taxPaid = itrSummary.breakdown["Tax Paid"];
        const refundAmount = itrSummary.breakdown["Refund Amount"];

        // Identify potential tax saving opportunities
        const taxSavingOpportunities = itrSummary.breakdown["Tax Saving Opportunities"];
        const hasTaxSavingOpportunities = Object.keys(taxSavingOpportunities).length > 0;

        // Identify areas that might need CA's special attention
        const needsSpecialAttention = [];

        // Check if taxpayer is close to tax bracket boundary
        if (taxableIncome > 700000 && taxableIncome < 750000) {
            needsSpecialAttention.push("Income is near tax bracket boundary");
        }

        // Check for high income with low deductions ratio
        if (totalIncome > 1000000 && totalDeductions < totalIncome * 0.1) {
            needsSpecialAttention.push("Potential under-utilization of deductions");
        }

        // Check if there's house property income
        if (itrDetails.housing.rentalIncome && Number(itrDetails.housing.rentalIncome) > 0) {
            needsSpecialAttention.push("Has rental income");
        }

        // Check if there are investments or capital gains
        if (itrDetails.investments.stocks || itrDetails.investments.mutualFunds) {
            needsSpecialAttention.push("Has investment income that might need detailed scrutiny");
        }

        // Check if it's a government employee
        if (itrDetails.income.isGovernmentEmployee) {
            needsSpecialAttention.push("Government employee with special tax considerations");
        }

        // Check if retiring in this FY
        if (itrDetails.income.isRetiring) {
            needsSpecialAttention.push("Retiring this year with special considerations for gratuity and leave encashment");
        }

        // Check tax regime
        const taxRegime = itrDetails.income.underOldTaxRegime ? "Old Tax Regime" : "New Tax Regime";

        // Generate subject line
        const subject = `Request for Professional Review - ITR Filing FY ${financialYearStart}-${financialYearEnd} [Taxable Income: ${formatCurrency(taxableIncome)}]`;

        // Generate email content
        const content = `
Dear CA,

I hope this email finds you well. I'm reaching out to request your professional review of my Income Tax Return (ITR) for the Financial Year ${financialYearStart}-${financialYearEnd} before final submission. I've prepared my tax filing based on my understanding but would greatly value your expert assessment to ensure compliance and optimize my tax position.

**Key Details of My ITR Filing:**

**Tax Regime:** ${taxRegime}

**Income Summary:**
- Gross Salary: ${formatCurrency(itrSummary.breakdown["Total Income"]["Gross Salary"])}
- Income Under Head Salaries: ${formatCurrency(itrSummary.breakdown["Total Income"]["Income Under Head Salaries"])}
- Income from House Property: ${formatCurrency(itrSummary.breakdown["Total Income"]["Income Under House Property"])}
- Income from Other Sources: ${formatCurrency(itrSummary.breakdown["Total Income"]["Other Income"])}
- Gross Total Income: ${formatCurrency(totalIncome)}

**Deductions Claimed:**
- Standard Deduction: ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Standard Deduction"])}
- Professional Tax: ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Professional Tax"])}
- Section 80C: ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Section 80C"])}
- Section 80D: ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Section 80D"])}
${itrSummary.breakdown["Total Deductions"]["Section 80CCD1B"] > 0 ? `- Section 80CCD(1B): ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Section 80CCD1B"])}\n` : ''}
${itrSummary.breakdown["Total Deductions"]["Section 80E"] > 0 ? `- Section 80E: ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Section 80E"])}\n` : ''}
${itrSummary.breakdown["Total Deductions"]["Section 80G"] > 0 ? `- Section 80G: ${formatCurrency(itrSummary.breakdown["Total Deductions"]["Section 80G"])}\n` : ''}
- Total Deductions: ${formatCurrency(totalDeductions)}

**Tax Computation:**
- Taxable Income: ${formatCurrency(taxableIncome)}
- Tax Liability: ${formatCurrency(taxLiability)}
- Total Tax Paid: ${formatCurrency(taxPaid)}
${refundAmount > 0 ? `- Refund Due: ${formatCurrency(refundAmount)}` : ''}
${refundAmount < 0 ? `- Tax Due: ${formatCurrency(Math.abs(refundAmount))}` : ''}

**Areas Requiring Your Expert Review:**
${needsSpecialAttention.length > 0 ? needsSpecialAttention.map(item => `- ${item}`).join('\n') : '- General verification of all claims and calculations'}
${hasTaxSavingOpportunities ? '\n**Potential Tax Saving Opportunities Identified:**\n' +
                Object.entries(taxSavingOpportunities).map(([section, description]) => `- ${section}: ${description}`).join('\n') : ''}

**Specific Questions:**
1. Are there any deductions or exemptions I might have missed?
2. Is my selection of tax regime (${taxRegime}) optimal for my financial situation?
3. Are there any red flags or areas of concern in my filing that might trigger scrutiny?
4. Can you suggest any legitimate tax planning strategies for the next financial year?

I've attached my detailed income and deduction information for your review. Please let me know if you need any additional documentation or clarification on any aspect of my filing.

I would appreciate your review at your earliest convenience, as I'm planning to finalize my ITR submission by ${deadlineDate}.

Thank you for your professional assistance.

Warm regards,
${userName}
${userContact}
        `;

        return {
            subject,
            content
        };
    } catch (error) {
        console.error("Error generating CA mailer:", error);
        return {
            subject: "Request for ITR Review - Tax Filing Assistance Needed",
            content: `Dear CA,\n\nI'm writing to request your professional review of my Income Tax Return. I've prepared my ITR but would appreciate your expert assessment before final submission. Unfortunately, I couldn't generate the detailed summary due to a technical issue, but I would still value your guidance on optimizing my tax position.\n\nPlease let me know what information you need from me to proceed with the review.\n\nThank you for your assistance.\n\nRegards,\n${userName}\n${userContact}`
        };
    }
}