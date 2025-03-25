#include "incomeUnderHeadSalaries.h"
#include <iostream>

using namespace std;

// Constructor initializes pointers
IncomeUnderHeadSalaries::IncomeUnderHeadSalaries(const NetIncome* netIncome, const DeductionUnderSection16* deductions)
    : netIncome(netIncome), deductions(deductions) {}

// Function to calculate income under head salaries
double IncomeUnderHeadSalaries::calculateIncomeUnderHeadSalaries() const {
    double netIncomeValue = netIncome->calculateNetIncome();
    double totalDeductions = deductions->calculateTotalDeductions();
    return netIncomeValue - totalDeductions;
}

// Function to display income under head salaries
void IncomeUnderHeadSalaries::displayIncomeUnderHeadSalaries() const {
    cout << "\nIncome Under Head Salaries:\n";
    cout << "---------------------------\n";
    cout << "Net Income Before Deductions: " << netIncome->calculateNetIncome() << endl;
    cout << "Total Deductions Under Section 16: " << deductions->calculateTotalDeductions() << endl;
    cout << "Income Under Head Salaries: " << calculateIncomeUnderHeadSalaries() << endl;
    cout << "---------------------------\n\n";
}