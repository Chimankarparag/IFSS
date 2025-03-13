#include "salary_17_1.h"
#include <iostream>

using namespace std;

// Constructor initializes all values to 0
Salary::Salary()
    : basicSalary(0), dearnessAllowance(0), bonusCommissions(0), advanceSalary(0),
      arrears(0), leaveEncashment(0), gratuity(0), pension(0), otherComponents(0),
      hra(0), entertainmentAllowance(0), professionalTax(0) {}

// Function to take salary input
void Salary::inputSalaryDetails() {
    cout << "Enter basic salary: ";
    cin >> basicSalary;
    cout << "Enter pension: ";
    cin >> pension;
    cout << "Enter dearness allowance: ";
    cin >> dearnessAllowance;
    cout << "Enter Bonus & Commissions: ";
    cin >> bonusCommissions;
    cout << "Enter Advance Salary: ";
    cin >> advanceSalary;
    cout << "Enter Arrears of Salary: ";
    cin >> arrears;
    cout << "Enter Leave Encashment: ";
    cin >> leaveEncashment;
    cout << "Enter Gratuity: ";
    cin >> gratuity;
    cout << "Enter Other Components (for 10C deductions): ";
    cin >> otherComponents;
    cout << "Enter HRA received: ";
    cin >> hra;
    cout << "Enter Entertainment Allowance: ";
    cin >> entertainmentAllowance;
    cout << "Enter Professional Tax: ";
    cin >> professionalTax;
}

double Salary::getBasicSalary() const {
    return basicSalary;
}

double Salary::getPension() const {
    return pension;
}

double Salary::getGratuity() const {
    return gratuity;
}

double Salary::getLeaveEncashment() const {
    return leaveEncashment;
}

double Salary::getDearnessAllowance() const {
    return dearnessAllowance;
}

double Salary::getHRA() const {
    return hra;
}

double Salary::getEntertainmentAllowance() const {
    return entertainmentAllowance;
}

double Salary::getProfessionalTax() const {
    return professionalTax;
}

// Function to calculate salary as per Section 17(1)
double Salary::calculateSalary17_1() const {
    return basicSalary + dearnessAllowance + bonusCommissions +
           advanceSalary + arrears + leaveEncashment + gratuity +
           pension + otherComponents;
}

// Function to display salary breakup
void Salary::displaySalaryBreakup() const {
    cout << "\nSalary Breakdown (Section 17(1)):\n";
    cout << "---------------------------------\n";
    cout << "Basic Salary: " << basicSalary << endl;
    cout << "HRA: " << hra << endl;
    cout << "Dearness Allowance: " << dearnessAllowance << endl;
    cout << "Bonus & Commissions: " << bonusCommissions << endl;
    cout << "Advance Salary: " << advanceSalary << endl;
    cout << "Arrears of Salary: " << arrears << endl;
    cout << "Leave Encashment: " << leaveEncashment << endl;
    cout << "Gratuity: " << gratuity << endl;
    cout << "Pension in FY (Commuted + Normal): " << pension << endl;
    cout << "Entertainment Allowance: " << entertainmentAllowance << endl;
    cout << "Professional Tax: " << professionalTax << endl;
    cout << "Other Components: " << otherComponents << endl;
    cout << "---------------------------------\n";
    cout << "Total Salary under Section 17(1): " << calculateSalary17_1() << endl;
}
