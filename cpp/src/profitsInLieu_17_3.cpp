#include "profitsInLieu_17_3.h"

using namespace std;

// Constructor initializes all values to 0
ProfitsInLieu::ProfitsInLieu()
    : terminationCompensation(0), retirementCompensation(0), goldenHandshake(0),
      keymanInsurancePayout(0), preEmploymentPayments(0), postResignationPayments(0) {}

// Function to take user input for Profits in Lieu of Salary
void ProfitsInLieu::inputProfitsDetails() {
    cout << "Enter Termination Compensation received: ";
    cin >> terminationCompensation;
    cout << "Enter Retirement Compensation received: ";
    cin >> retirementCompensation;
    cout << "Enter Golden Handshake (VRS) amount: ";
    cin >> goldenHandshake;
    cout << "Enter Keyman Insurance Payout received: ";
    cin >> keymanInsurancePayout;
    cout << "Enter Payments received before actual employment: ";
    cin >> preEmploymentPayments;
    cout << "Enter Payments received after resignation: ";
    cin >> postResignationPayments;
}

// Function to calculate total taxable profits under Section 17(3)
double ProfitsInLieu::calculateTotalProfits17_3() const {
    return terminationCompensation + retirementCompensation + goldenHandshake +
           keymanInsurancePayout + preEmploymentPayments + postResignationPayments;
}

// Function to display Profits in Lieu breakup
void ProfitsInLieu::displayProfitsBreakup() {
    cout << "\nProfits in Lieu of Salary Breakdown (Section 17(3)):\n";
    cout << "---------------------------------\n";
    cout << "Termination Compensation: " << terminationCompensation << endl;
    cout << "Retirement Compensation: " << retirementCompensation << endl;
    cout << "Golden Handshake (VRS): " << goldenHandshake << endl;
    cout << "Keyman Insurance Payout: " << keymanInsurancePayout << endl;
    cout << "Payments Before Employment: " << preEmploymentPayments << endl;
    cout << "Payments After Resignation: " << postResignationPayments << endl;
    cout << "---------------------------------\n";
    cout << "Total Taxable Profits in Lieu of Salary (Section 17(3)): " << calculateTotalProfits17_3() << endl;
}
