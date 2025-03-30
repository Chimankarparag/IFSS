#include "incomeFromOtherSources.h"
#include <iostream>
#include <algorithm> // For std::min

using namespace std;

// Constructor initializes values to 0
OtherIncome::OtherIncome()
    : interestFromSavingsBank(0), interestOnSecurities(0), interestOtherThanSecurites(0),
      incomeFromCommission(0), dividendIncome(0), winningsOtherIncome(0), familyPension(0),
      unexplainedIncome(0), royaltyIncome(0), carbonCreditIncome(0), prematurePFWithdrawal(0) {}

// Function to take input details
void OtherIncome::inputOtherIncomeDetails() {
    cout << "Enter Interest from Savings Bank Account: ";
    cin >> interestFromSavingsBank;
    cout << "Enter Interest on Securities (Government Securities, Corporate Bonds, Deep Discount Bonds): ";
    cin >> interestOnSecurities;
    cout << "Enter Other Interest Income (Interest other than 'Interest on securities'): ";
    cin >> interestOtherThanSecurites;
    cout << "Enter Income from Commission, Brokerage, Sale on lottery: ";
    cin >> incomeFromCommission;
    cout << "Enter Dividend Income Taxable at Normal rates: ";
    cin >> dividendIncome;
    cout << "Enter Winnings from Lotteries, Crossword Puzzles, Races, Card Games, etc.: ";
    cin >> winningsOtherIncome;
    cout << "Enter Family Pension: ";
    cin >> familyPension;
    cout << "Enter Unexplained Income (Section 115BBE): ";
    cin >> unexplainedIncome;
    cout << "Enter Royalty Income from Patents (Section 115BBF): ";
    cin >> royaltyIncome;
    cout << "Enter Income from Carbon Credit Trading (Section 115BBG): ";
    cin >> carbonCreditIncome;
    cout << "Enter Premature Withdrawal of PF (Before 5 years of service): ";
    cin >> prematurePFWithdrawal;
}

// Function to calculate the deduction for Family Pension
double OtherIncome::calculateFamilyPensionDeduction() const {
    return min(15000.0, 0.33 * familyPension);
}

// Function to calculate total income
double OtherIncome::calculateTaxableOtherIncome() const {
    double familyPensionDeduction = calculateFamilyPensionDeduction();
    return interestFromSavingsBank + interestOnSecurities + interestOtherThanSecurites +
           incomeFromCommission + dividendIncome + (familyPension - familyPensionDeduction) +
           prematurePFWithdrawal;
}

double OtherIncome::calculateTotalOtherIncome() const {
    return calculateTaxableOtherIncome() + unexplainedIncome + royaltyIncome + carbonCreditIncome + winningsOtherIncome;
}

// Function to display income details
void OtherIncome::displayOtherIncomeDetails() const {
    double familyPensionDeduction = calculateFamilyPensionDeduction();
    cout << "\nOther Income Details:\n";
    cout << "---------------------\n";
    cout << "Interest from Savings Bank Account: " << interestFromSavingsBank << endl;
    cout << "Interest on Securities: " << interestOnSecurities << endl;
    cout << "Other Interest Income: " << interestOtherThanSecurites << endl;
    cout << "Income from Commission, Brokerage, Sale on lottery: " << incomeFromCommission << endl;
    cout << "Dividend Income: " << dividendIncome << endl;
    cout << "Winnings from Lotteries, Crossword Puzzles, Races, Card Games, etc.: " << winningsOtherIncome << endl;
    cout << "Family Pension: " << familyPension << endl;
    cout << "Family Pension Deduction (Section 57(iia)): " << familyPensionDeduction << endl;
    cout << "Unexplained Income (Section 115BBE): " << unexplainedIncome << endl;
    cout << "Royalty Income from Patents (Section 115BBF): " << royaltyIncome << endl;
    cout << "Income from Carbon Credit Trading (Section 115BBG): " << carbonCreditIncome << endl;
    cout << "Premature Withdrawal of PF: " << prematurePFWithdrawal << endl;
    cout << "Total Other Income: " << calculateTaxableOtherIncome() << endl;
}

// Getter functions
double OtherIncome::getInterestFromSavingsBank() const { return interestFromSavingsBank; }
double OtherIncome::getInterestOnSecurities() const { return interestOnSecurities; }
double OtherIncome::getInterestOtherThanSecurites() const { return interestOtherThanSecurites; }
double OtherIncome::getIncomeFromCommission() const { return incomeFromCommission; }
double OtherIncome::getDividendIncome() const { return dividendIncome; }
double OtherIncome::getWinningsOtherIncome() const { return winningsOtherIncome; }
double OtherIncome::getFamilyPension() const { return familyPension; }
double OtherIncome::getUnexplainedIncome() const { return unexplainedIncome; }
double OtherIncome::getRoyaltyIncome() const { return royaltyIncome; }
double OtherIncome::getCarbonCreditIncome() const { return carbonCreditIncome; }
double OtherIncome::getPrematurePFWithdrawal() const { return prematurePFWithdrawal; }