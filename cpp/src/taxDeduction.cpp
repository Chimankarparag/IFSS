#include "taxDeduction.h"
#include <iostream>

using namespace std;

class TaxDeductions {
private:
    // Investment & Retirement
    double sec80C, sec80CCC, sec80CCD1, sec80CCD1B, sec80CCD2;
    // Health & Disability
    double sec80D, sec80DD, sec80DDB;
    // Education & Loans
    double sec80E, sec80EE, sec80EEA, sec80EEB;
    // Donations & Rent
    double sec80G, sec80GG, sec80GGA, sec80GGC;
    // Interest Income
    double sec80TTA, sec80TTB;
    // Disability
    double sec80U;
    // Total Deduction
    double totalDeduction;

public:
    // Constructor to initialize all deduction values to 0
    TaxDeductions();

    // Function to take user input
    void inputDeductionsDetails();

    // Function to calculate total deductions
    double calculateTotalDeduction() const;

    // Function to display final eligible deduction
    void displayTotalDeduction();
};

// Constructor to initialize all deduction values to 0
TaxDeductions::TaxDeductions() {
    sec80C = sec80CCC = sec80CCD1 = sec80CCD1B = sec80CCD2 = 0;
    sec80D = sec80DD = sec80DDB = 0;
    sec80E = sec80EE = sec80EEA = sec80EEB = 0;
    sec80G = sec80GG = sec80GGA = sec80GGC = 0;
    sec80TTA = sec80TTB = sec80U = 0;
    totalDeduction = 0;
}

// Function to take user input
void TaxDeductions::inputDeductionsDetails() {
    cout << "Enter deductions under different sections:\n";

    // Investment & Retirement Deductions
    cout << "80C (Max ₹1,50,000) - PPF, ELSS, Life Insurance, etc.: ₹";
    cin >> sec80C;
    if (sec80C > 150000) sec80C = 150000;

    cout << "80CCC (Max ₹1,50,000) - Annuity Plans (LIC, etc.): ₹";
    cin >> sec80CCC;
    if (sec80CCC > 150000) sec80CCC = 150000;

    cout << "80CCD(1) (Included in 80C Limit) - NPS Contribution: ₹";
    cin >> sec80CCD1;
    if (sec80CCD1 > 150000) sec80CCD1 = 150000;

    cout << "80CCD(1B) (Max ₹50,000) - Additional NPS Contribution: ₹";
    cin >> sec80CCD1B;
    if (sec80CCD1B > 50000) sec80CCD1B = 50000;

    cout << "80CCD(2) (Employer NPS Contribution) - No Limit: ₹";
    cin >> sec80CCD2;

    // Health & Disability Deductions
    cout << "80D (₹25K (<60yrs), ₹50K (Senior Citizens)) - Health Insurance: ₹";
    cin >> sec80D;
    if (sec80D > 50000) sec80D = 50000;

    cout << "80DD (₹75K - ₹1.25L) - Dependent Disability: ₹";
    cin >> sec80DD;
    if (sec80DD > 125000) sec80DD = 125000;

    cout << "80DDB (₹40K - ₹1L) - Medical Treatment of Critical Illness: ₹";
    cin >> sec80DDB;
    if (sec80DDB > 100000) sec80DDB = 100000;

    // Education & Loans
    cout << "80E (No Limit) - Education Loan Interest: ₹";
    cin >> sec80E;

    cout << "80EE (Max ₹50,000) - First Home Loan Interest: ₹";
    cin >> sec80EE;
    if (sec80EE > 50000) sec80EE = 50000;

    cout << "80EEA (Max ₹1.5L) - Affordable Housing Loan Interest: ₹";
    cin >> sec80EEA;
    if (sec80EEA > 150000) sec80EEA = 150000;

    cout << "80EEB (Max ₹1.5L) - Electric Vehicle Loan Interest: ₹";
    cin >> sec80EEB;
    if (sec80EEB > 150000) sec80EEB = 150000;

    // Donations & Rent
    cout << "80G - Donations (Enter Deductible Amount): ₹";
    cin >> sec80G;

    cout << "80GG (Max ₹60,000) - Rent (If No HRA): ₹";
    cin >> sec80GG;
    if (sec80GG > 60000) sec80GG = 60000;

    cout << "80GGA - Donations to Scientific Research: ₹";
    cin >> sec80GGA;

    cout << "80GGC - Donations to Political Parties: ₹";
    cin >> sec80GGC;

    // Interest Income
    cout << "80TTA (Max ₹10,000) - Savings Account Interest: ₹";
    cin >> sec80TTA;
    if (sec80TTA > 10000) sec80TTA = 10000;

    cout << "80TTB (Max ₹50,000) - Senior Citizen Interest (Savings & FD): ₹";
    cin >> sec80TTB;
    if (sec80TTB > 50000) sec80TTB = 50000;

    // Disability Deduction
    cout << "80U (₹75K - ₹1.25L) - Self-Disability Deduction: ₹";
    cin >> sec80U;
    if (sec80U > 125000) sec80U = 125000;
}

// Function to calculate total deductions
double TaxDeductions::calculateTotalDeduction() const{
    return sec80C + sec80CCC + sec80CCD1 + sec80CCD1B + sec80CCD2 +
                     sec80D + sec80DD + sec80DDB +
                     sec80E + sec80EE + sec80EEA + sec80EEB +
                     sec80G + sec80GG + sec80GGA + sec80GGC +
                     sec80TTA + sec80TTB + sec80U;
}

// Function to display final eligible deduction
void TaxDeductions::displayTotalDeduction() {
    cout << "\n================ Tax Deduction Summary =================\n";
    cout << "80C   (Investments)         : ₹" << sec80C << "\n";
    cout << "80CCC (Annuity Plans)       : ₹" << sec80CCC << "\n";
    cout << "80CCD(1) (NPS)             : ₹" << sec80CCD1 << "\n";
    cout << "80CCD(1B) (Extra NPS)      : ₹" << sec80CCD1B << "\n";
    cout << "80CCD(2) (Employer NPS)    : ₹" << sec80CCD2 << "\n";
    cout << "80D   (Health Insurance)   : ₹" << sec80D << "\n";
    cout << "80DD  (Dependent Disability): ₹" << sec80DD << "\n";
    cout << "80DDB (Critical Illness)   : ₹" << sec80DDB << "\n";
    cout << "80E   (Education Loan)     : ₹" << sec80E << "\n";
    cout << "80EE  (Home Loan)          : ₹" << sec80EE << "\n";
    cout << "80TTA (Savings Interest)   : ₹" << sec80TTA << "\n";
    cout << "80TTB (Sr. Citizen Interest): ₹" << sec80TTB << "\n";
    cout << "------------------------------------------------------\n";
    cout << "Total Eligible Deduction   : ₹" << totalDeduction << "\n";
    cout << "======================================================\n";
}

// Main function
int main() {
    TaxDeductions tax;
    tax.inputDeductionsDetails();
    tax.calculateTotalDeduction();
    tax.displayTotalDeduction();
    return 0;
}
