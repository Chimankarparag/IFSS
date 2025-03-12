#include "incomeFromOtherSources.h"
#include <iostream>

using namespace std;

// Constructor initializes values to 0
OtherIncome::OtherIncome()
    : interestFromSavingsBank(0), interestOnSecurities(0), otherInterestIncome(0),
      winningsFromLottery(0), winningsFromHorseRace(0), familyPension(0), commissionOnLotteryTickets(0),
      commissionOrBrokerage(0), otherIncome(0) {}

// Function to take input details
void OtherIncome::inputIncomeDetails() {
    cout << "Enter Interest from Savings Bank Account: ";
    cin >> interestFromSavingsBank;
    cout << "Enter Interest on Securities (Government Securities (G-Secs, Treasury Bills, RBI Bonds),Corporate Bonds (Debentures, Private Company Bonds)\n,Tax-Free Bonds (Issued by NHAI, REC, PFC, etc.), Municipal Bonds ,Deep Discount Bonds): ";
    cin >> interestOnSecurities;
    cout << "Enter Other Interest Income (Interest other than 'Interest on securities'): ";
    cout << "Fixed Deposits (FDs), Recurring Deposits (RDs), Bank Deposits(other than Savings & FDs), Loans to Friends, Monthly Income Schemes (MIS), Post Office Time Deposits, etc.";
    cin >> otherInterestIncome;
    cout << "Enter Winnings Lottery, Betting, Online Games Winnings: ";
    cin >> winningsFromLottery;
    cout << "Enter Winnings from Horse Race: ";
    cin >> winningsFromHorseRace;
    cout << "Enter Income from Family Pension: ";
    cin >> familyPension;
    cout << "Enter Commission on Sale of Lottery Tickets: ";
    cin >> commissionOnLotteryTickets;
    cout << "Enter Commission or Brokerage: ";
    cin >> commissionOrBrokerage;
    cout << "Enter Other Income: ";
    cin >> otherIncome;
}

// Function to calculate total income

//this is obviously wrong

// double OtherIncome::calculateTotalIncome() const {
//     return interestFromSavingsBank + interestOnSecurities + otherInterestIncome +
//            winningsFromLottery + winningsFromHorseRace + familyPension + commissionOnLotteryTickets +
//            commissionOrBrokerage + otherIncome;
// }

// Function to display income details
void OtherIncome::displayIncomeDetails() const {
    cout << "\nOther Income Details:\n";
    cout << "---------------------\n";
    cout << "Interest from Savings Bank Account: " << interestFromSavingsBank << endl;
    cout << "Interest on Securities: " << interestOnSecurities << endl;
    cout << "Other Interest Income: " << otherInterestIncome << endl;
    cout << "Winnings from Lottery or Crossword Puzzle: " << winningsFromLottery << endl;
    cout << "Winnings from Horse Race: " << winningsFromHorseRace << endl;
    cout << "Commission on Sale of Lottery Tickets: " << commissionOnLotteryTickets << endl;
    cout << "Commission or Brokerage: " << commissionOrBrokerage << endl;
    cout << "Other Income: " << otherIncome << endl;
    cout << "Total Other Income: " << calculateTotalIncome() << endl;
}