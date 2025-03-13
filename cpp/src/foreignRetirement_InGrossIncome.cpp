#include "foreignRetirement_InGrossIncome.h"

using namespace std;

// Constructor initializes values
ForeignRetirement::ForeignRetirement()
    : AmountFrom89ACountry(0), AmountFromNon89ACountry(0) {}

// Function to take user input
void ForeignRetirement::inputRetirementDetails() {
    cout << "Enter amount from foreign retirement account in notified country: ";
    cin >> AmountFrom89ACountry;

    cout << "Enter amount from foreign retirement account in non-notified country: ";
    cin >> AmountFromNon89ACountry;
}

// Function to calculate taxable foreign retirement income
double ForeignRetirement::calculateTaxableIncome() {
    return AmountFrom89ACountry + AmountFromNon89ACountry;
}

// Function to display retirement income details
void ForeignRetirement::displayRetirementDetails() {
    cout << "\nForeign Retirement Account Income Details:\n";
    cout << "------------------------------------------\n";
    cout << "Amount from Notified Country: " << AmountFrom89ACountry << endl;
    cout << "Amount from Non-Notified Country: " << AmountFromNon89ACountry << endl;
    cout << "------------------------------------------\n";
    cout << "Taxable Foreign Retirement Income: " << calculateTaxableIncome() << endl;
}

// Function to get the amount from 89A country
double ForeignRetirement::getAmountFrom89ACountry() const {
    return AmountFrom89ACountry;
}
double ForeignRetirement::getAmountFromNon89ACountry() const {
    return AmountFromNon89ACountry;
}
