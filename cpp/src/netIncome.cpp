#include "netIncome.h"
#include <iostream>

using namespace std;

// Constructor initializes pointers
NetIncome::NetIncome(const GrossSalary* grossSalary, const Section10Exemptions* section10Exemptions, const LessUnder89A* lessUnder89A, const EmployeeDetails* employeeDetails)
    : grossSalary(grossSalary), section10Exemptions(section10Exemptions), lessUnder89A(lessUnder89A), employeeDetails(employeeDetails) {}

// Function to calculate net income
double NetIncome::calculateNetIncome() const {
    double netIncome = grossSalary->calculateGrossSalary();
    if (employeeDetails->isOldTaxRegime()) {
        double exemptions = section10Exemptions->calculateTotalExemptions();
        double less89A = lessUnder89A->calculateLess();
        return netIncome - exemptions - less89A;
    }
    return netIncome;
}

// Function to display net income
void NetIncome::displayNetIncome() const {
    cout << "\nNet Income Calculation:\n";
    cout << "-----------------------\n";
    cout << "Gross Salary: " << grossSalary->calculateGrossSalary() << endl;
    if (employeeDetails->isOldTaxRegime()) {
        cout << "Total Exemptions under Section 10: " << section10Exemptions->calculateTotalExemptions() << endl;
        cout << "Less Amount from Section 89A: " << lessUnder89A->calculateLess() << endl;
        cout << "Net Income Old Regime: " << calculateNetIncome() << endl;
        return;
    }
    cout << "Net Income New Regime: " << calculateNetIncome() << endl;
}
