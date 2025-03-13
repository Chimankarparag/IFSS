#include "grossSalary.h"
#include <iostream>

using namespace std;

// Constructor initializes pointers
GrossSalary::GrossSalary(const Salary* salary, const Perquisites* perquisites, const ProfitsInLieu* profits, const ForeignRetirement* foreignRetirement)
    : salary(salary), perquisites(perquisites), profits(profits), foreignRetirement(foreignRetirement) {}

// Function to calculate gross salary
double GrossSalary::calculateGrossSalary() const {
    double salary17_1 = salary->calculateSalary17_1();
    double perquisites17_2 = perquisites->calculatePerquisites17_2();
    double profits17_3 = profits->calculateTotalProfits17_3();
    double incomeFromNotifiedCountry = foreignRetirement->getAmountFrom89ACountry();
    double incomeFromNonNotifiedCountry = foreignRetirement->getAmountFromNon89ACountry();

    return salary17_1 + perquisites17_2 + profits17_3 + incomeFromNotifiedCountry + incomeFromNonNotifiedCountry;
}

// Function to display gross salary
void GrossSalary::displayGrossSalary() const {
    cout << "\nGross Salary Breakdown:\n";
    cout << "-----------------------\n";
    cout << "Salary as per Section 17(1): " << salary->calculateSalary17_1() << endl;
    cout << "Value of Perquisites as per Section 17(2): " << perquisites->calculatePerquisites17_2() << endl;
    cout << "Profit in lieu of salary as per Section 17(3): " << profits->calculateTotalProfits17_3() << endl;
    cout << "Income from retirement benefit account in notified country u/s 89A: " << foreignRetirement->getAmountFrom89ACountry() << endl;
    cout << "Income from retirement benefit account in non-notified country u/s 89A: " << foreignRetirement->getAmountFromNon89ACountry() << endl;
    cout << "-----------------------\n";
    cout << "Total Gross Salary: " << calculateGrossSalary() << endl;
}