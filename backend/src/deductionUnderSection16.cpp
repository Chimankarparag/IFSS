#include "deductionUnderSection16.h"
#include <iostream>
#include <algorithm> // Include the algorithm header for std::min
#include "details.h"

using namespace std;

// Constructor initializes pointers
DeductionUnderSection16::DeductionUnderSection16(const NetIncome* netIncome, const EmployeeDetails* employeeDetails, const Salary* salary)
    : netIncome(netIncome), employeeDetails(employeeDetails), salary(salary) {}

// Function to calculate standard deduction
double DeductionUnderSection16::calculateStandardDeduction() const {
    if(employeeDetails->isOldTaxRegime()) {
        return min(50000.0, netIncome->calculateNetIncome());
    }else{
        return min(75000.0, netIncome->calculateNetIncome()); // ₹75,000 or Net Income, whichever is lower
    }
}

// Function to calculate entertainment allowance
double DeductionUnderSection16::calculateEntertainmentAllowance() const {
    if (employeeDetails->isGovernmentEmployee()) {
        double actualEntertainmentAllowance = salary->getEntertainmentAllowance();
        double basicSalary = salary->getBasicSalary();
        double twentyPercentOfBasic = 0.20 * basicSalary;
        return min(actualEntertainmentAllowance, min(5000.0, twentyPercentOfBasic));
    }
    return 0.0;
}

// Function to calculate professional tax
double DeductionUnderSection16::calculateProfessionalTax() const {
    return min(2500.0,salary->getProfessionalTax()); // Example: ₹2,500 professional tax
}

// Function to calculate total deductions under Section 16
double DeductionUnderSection16::calculateTotalDeductions() const {
    return calculateStandardDeduction() +
           calculateEntertainmentAllowance() +
           calculateProfessionalTax();
}


// Function to display net income after deductions
void DeductionUnderSection16::displayNetIncomeAfterDeductions() const {
    cout << "\nNet Income After Deductions Under Section 16:\n";
    cout << "---------------------------------------------\n";
    cout << "Net Income Before Deductions: " << netIncome->calculateNetIncome() << endl;
    cout << "Standard Deduction: " << calculateStandardDeduction() << endl;
    cout << "Entertainment Allowance: " << calculateEntertainmentAllowance() << endl;
    cout << "Professional Tax: " << calculateProfessionalTax() << endl;
    cout << "Total Deductions: " << calculateTotalDeductions() << endl;

}