#include "lessUnder89A.h"
#include "foreignRetirement_InGrossIncome.h"

using namespace std;

// Constructor initializes values
LessUnder89A::LessUnder89A(const ForeignRetirement* foreignRetirement)
    : withdrawalAmount(0), foreignRetirement(foreignRetirement) {}

// Function to take user input for withdrawal amount
void LessUnder89A::inputWithdrawal() {
    cout << "Enter withdrawal amount from Section 89A country: ";
    cin >> withdrawalAmount;
}

// Function to calculate the difference
double LessUnder89A::calculateLess() const {
    double amountFrom89ACountry = foreignRetirement->getAmountFrom89ACountry();
    return amountFrom89ACountry - withdrawalAmount;
    
}

// Function to display the difference
void LessUnder89A::displayLess() const {
    cout << "\nLess Amount from Section 89A Country:\n";
    cout << "--------------------------------------------------------\n";
    cout << "Amount from 89A Country: " << foreignRetirement->getAmountFrom89ACountry() << endl;
    cout << "Withdrawal Amount: " << withdrawalAmount << endl;
    cout << "Less: " << calculateLess() << endl;
}