#include "incomeUnderHouseProperty.h"
#include <iostream>


using namespace std;
// Constructor initializes values to 0
IncomeUnderHouseProperty::IncomeUnderHouseProperty()
    : selfOccupiedInterestOnBorowedCapital(0), rentalIncome(0), municipalTaxes(0), unrealisedRent(0), letOutInterestOnBorowedCapital(0) {}

    // Function to take input details
void IncomeUnderHouseProperty::inputHousePropertyDetails() {
    cout << "Enter Rental Income: ";
    cin >> rentalIncome;
    cout << "Enter Municipal Taxes: ";
    cin >> municipalTaxes;
    cout << "Enter Unrealised Rent: ";
    cin >> unrealisedRent;
    cout << "Enter Interest on Borrowed Capital (Self-Occupied Property): ";
    cin >> selfOccupiedInterestOnBorowedCapital;
    cout << "Enter Interest on Borrowed Capital (Let-Out Property): ";
    cin >> letOutInterestOnBorowedCapital;
}
// Function to calculate income from self-occupied property
double IncomeUnderHouseProperty::calculateIncomeFromSelfOccupiedProperty() const {
    return -min(200000.0, selfOccupiedInterestOnBorowedCapital);
}

// Function to calculate income from let-out property
double IncomeUnderHouseProperty::calculateIncomeFromLetOutProperty() const {
    double netAnnualValue = rentalIncome - municipalTaxes - unrealisedRent;
    if(netAnnualValue <= 0) {
        if(rentalIncome-municipalTaxes <= 0) {

            municipalTaxes = rentalIncome;
            unrealisedRent = 0;
        }else if(rentalIncome <= unrealisedRent) {
            
            unrealisedRent = rentalIncome;
            municipalTaxes = 0;
        }
        netAnnualValue = 0;
        return 0;
    }
    double standardDeduction = 0.30 * netAnnualValue;
    return netAnnualValue - standardDeduction - letOutInterestOnBorowedCapital;
}

// Function to calculate total income under house property
double IncomeUnderHouseProperty::calculateIncomeUnderHouseProperty() const {
    double incomeFromSelfOccupiedProperty = calculateIncomeFromSelfOccupiedProperty();
    double incomeFromLetOutProperty = max(-200000.0,calculateIncomeFromLetOutProperty());
    double totalIncomeUnderHouseProperty = incomeFromSelfOccupiedProperty + incomeFromLetOutProperty;
    return (totalIncomeUnderHouseProperty>=(-200000))?totalIncomeUnderHouseProperty:-200000;
}

// Function to display income from self-occupied property
void IncomeUnderHouseProperty::displayIncomeFromSelfOccupiedProperty() const {
    cout << "\nIncome from Self-Occupied Property:\n";
    cout << "-----------------------------------\n";
    cout << "Interest on Borrowed Capital (Self-Occupied Property): " << selfOccupiedInterestOnBorowedCapital << endl;
    cout << "Income from Self-Occupied Property: " << calculateIncomeFromSelfOccupiedProperty() << endl;
}

// Function to display income from let-out property
void IncomeUnderHouseProperty::displayIncomeFromLetOutProperty() const {
    double netAnnualValue = rentalIncome - municipalTaxes - unrealisedRent;
    double standardDeduction = 0.30 * netAnnualValue;
    double incomeFromLetOutProperty = calculateIncomeFromLetOutProperty();

    cout << "\nIncome from Let-Out Property:\n";
    cout << "-----------------------------\n";
    cout << "Rental Income: " << rentalIncome << endl;
    cout << "Municipal Taxes: " << municipalTaxes << endl;
    cout << "Unrealised Rent: " << unrealisedRent << endl;
    cout << "Net Annual Value: " << netAnnualValue << endl;
    cout << "Standard Deduction (30% of Net Annual Value): " << standardDeduction << endl;
    cout << "Interest on Borrowed Capital (Let-Out Property): " << letOutInterestOnBorowedCapital << endl;
    cout << "Income from Let-Out Property: " << incomeFromLetOutProperty << endl;
}

// Function to display total income under house property
void IncomeUnderHouseProperty::displayIncomeUnderHouseProperty() const {
    displayIncomeFromSelfOccupiedProperty();
    displayIncomeFromLetOutProperty();
    cout << "\nTotal Income Under House Property: " << calculateIncomeUnderHouseProperty() << endl;
}