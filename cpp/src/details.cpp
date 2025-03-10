#include "details.h"

using namespace std;

// Constructor initializes values
EmployeeDetails::EmployeeDetails()
    : governmentEmployee(false), age(0), withGratuity(false), unusedLeavesInMonths(0), retiring(false) {}

// Function to take user input
void EmployeeDetails::inputDetails() {
    char choice;
    cout << "Is the employee a government employee? (y/n): ";
    cin >> choice;
    governmentEmployee = (choice == 'y' || choice == 'Y');

    cout << "Enter the age of the employee: ";
    cin >> age;

    cout << "Is the employee with gratuity? (y/n): ";
    cin >> choice;
    withGratuity = (choice == 'y' || choice == 'Y');

    cout << "Enter the number of unused leaves (in months): ";
    cin >> unusedLeavesInMonths;

    cout << "Is the employee retiring? (y/n): ";
    cin >> choice;
    retiring = (choice == 'y' || choice == 'Y');
}

// Function to check if the employee is a government employee
bool EmployeeDetails::isGovernmentEmployee() const {
    return governmentEmployee;
}

// Function to get the age of the employee
int EmployeeDetails::getAge() const {
    return age;
}

// Function to check if the employee is with gratuity
bool EmployeeDetails::isWithGratuity() const {
    return withGratuity;
}

// Function to get the number of unused leaves
int EmployeeDetails::getUnusedLeavesInMonths() const {
    return unusedLeavesInMonths;
}

// Function to check if the employee is retiring
bool EmployeeDetails::isRetiring() const {
    return retiring;
}