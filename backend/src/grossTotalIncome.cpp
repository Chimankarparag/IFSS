#include "grossTotalIncome.h"
#include <iostream>

using namespace std;

// Constructor initializes references to the income objects
GrossTotalIncome::GrossTotalIncome(const IncomeUnderHeadSalaries& salaries, const IncomeUnderHouseProperty& houseProperty, const OtherIncome& otherIncome)
    : salaries(salaries), houseProperty(houseProperty), otherIncome(otherIncome) {}

// Function to calculate gross total income
double GrossTotalIncome::calculateGrossTotalIncome() const {
    return salaries.calculateIncomeUnderHeadSalaries() + houseProperty.calculateIncomeUnderHouseProperty() + otherIncome.calculateTotalOtherIncome();
}

// Function to display gross total income
void GrossTotalIncome::displayGrossTotalIncome() const {
    cout << "\nGross Total Income:\n";
    cout << "-------------------\n";
    cout << "Income Under Head Salaries: " << salaries.calculateIncomeUnderHeadSalaries() << endl;
    cout << "Income Under House Property: " << houseProperty.calculateIncomeUnderHouseProperty() << endl;
    cout << "Other Income: " << otherIncome.calculateTotalOtherIncome() << endl;
    cout << "Gross Total Income: " << calculateGrossTotalIncome() << endl;
    cout << "-------------------\n\n";
}