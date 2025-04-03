#ifndef TAX_DEDUCTION_H
#define TAX_DEDUCTION_H

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

#endif // TAX_DEDUCTION_H