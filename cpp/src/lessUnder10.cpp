#include "lessUnder10.h"
#include <algorithm> // Include the algorithm header for std::min

using namespace std;

// Constructor initializes pointers
Section10Exemptions::Section10Exemptions(const Salary* salary, const EmployeeDetails* employeeDetails)
    : salary(salary), employeeDetails(employeeDetails),rentPaid(0), metroCity(false),
      ltaAmount(0), childrenEduAllowance(0), hostelAllowance(0), transportAllowance(0), specialAllowance(0),
      vrsCompensation(0), totalPension(0), commutedPension(0) {}

// Function to take input for all allowances
void Section10Exemptions::inputDetails() {
    cout << "Enter rent paid: ";
    cin >> rentPaid;
    cout << "Is it a metro city? (1 for yes, 0 for no): ";
    cin >> metroCity;
    cout << "Enter LTA Amount Claimed: ";
    cin >> ltaAmount;
    cout << "Enter Children Education Allowance: ";
    cin >> childrenEduAllowance;
    cout << "Enter Hostel Allowance: ";
    cin >> hostelAllowance;
    cout << "Enter Transport Allowance: ";
    cin >> transportAllowance;
    cout << "Enter Special Allowance: ";
    cin >> specialAllowance;
    cout << "Enter Total Pension: ";
    cin >> totalPension;
    cout << "Enter Commuted Pension: ";
    cin >> commutedPension;
    cout << "Enter VRS Compensation: ";
    cin >> vrsCompensation;
}

// Calculate HRA exemption
double Section10Exemptions::calculateHRA() const {
    double hraReceived = salary->getHRA(); // Get the HRA received from Salary object
    double basicSalary = salary->getBasicSalary(); // Get the basic salary from Salary object
    double hra50_40 = metroCity ? 0.50 * basicSalary : 0.40 * basicSalary;
    double rentExcess = rentPaid - (0.10 * basicSalary);
    double hraExemption = min(min(hraReceived, hra50_40), rentExcess);

    if (hraExemption < 0) {
        return 0;
    }
    return hraExemption;
}

// Calculate Leave Travel Allowance (LTA)
double Section10Exemptions::calculateLTA() const {
    return ltaAmount;
    // Assuming travels Inside India
}

// Calculate Children Education Allowance
double Section10Exemptions::calculateChildrenEducationAllowance() const {
    return min(childrenEduAllowance, 100.0 * 2); // ₹100 per child, max 2 children
}

// Calculate Hostel Expenditure Allowance
double Section10Exemptions::calculateHostelAllowance() const {
    return min(hostelAllowance, 300.0 * 2); // ₹300 per child, max 2 children
}

// Calculate Transport Allowance for Handicapped Employee
double Section10Exemptions::calculateTransportAllowance() const {
    return min(transportAllowance, 3200.0 * 12); // ₹3,200 per month
}

// Calculate Special Allowances
double Section10Exemptions::calculateSpecialAllowance() const {
    return specialAllowance; // Exempt up to actual expenses incurred
}

// Calculate Gratuity Exemption
double Section10Exemptions::calculateGratuity() const {
    bool isGovernmentEmployee = employeeDetails->isGovernmentEmployee(); // Get government employee status
    bool withGratuity = employeeDetails->isWithGratuity(); // Get gratuity status
    double gratuityReceived = salary->getGratuity(); // Get gratuity from Salary object

    if (isGovernmentEmployee) {
        return gratuityReceived; // Fully exempt for government employees
    } else if (withGratuity) {
        return min(gratuityReceived, 2000000.0); // ₹20 lakh max exemption for private sector employees covered under Gratuity Act
    } else {
        return min(gratuityReceived, 1000000.0); // ₹10 lakh max exemption for private sector employees not covered under Gratuity Act
    }
}

// Calculate Commuted Pension Exemption
double Section10Exemptions::calculateCommutedPension() const {
    bool isGovernmentEmployee = employeeDetails->isGovernmentEmployee(); // Get government employee status
    bool withGratuity = employeeDetails->isWithGratuity(); // Get gratuity status

    if (isGovernmentEmployee) {
        return commutedPension; // Fully exempt for government employees
    } else if (withGratuity) {
        double exemptedAmount = totalPension / 3;
        return max(0.0,exemptedAmount); // 1/3rd exempt if gratuity received
    } else {
        double exemptedAmount = totalPension / 2;
        return max(0.0,exemptedAmount); // 1/2 exempt if not
    }
    //returns exemption pension.
}

// Calculate Leave Encashment Exemption
double Section10Exemptions::calculateLeaveEncashment() const {
    double leaveEncashment = salary->getLeaveEncashment();
    if (!employeeDetails->isRetiring()) {
        return 0;
    }

    double basicSalary = salary->getBasicSalary();
    double dearnessAllowance = salary->getDearnessAllowance();
    double monthlySalary = (basicSalary + dearnessAllowance) / 12;
    double tenMonthsSalary = 10 * monthlySalary;
    double unusedLeaveEncashment = employeeDetails->getUnusedLeavesInMonths() * monthlySalary;

    return min(min(leaveEncashment, 2500000.0), min(tenMonthsSalary, unusedLeaveEncashment));
}

// Calculate VRS Compensation Exemption
double Section10Exemptions::calculateVRSCompensation() const {
    return min(vrsCompensation, 5000000.0); // ₹5 lakh max exemption
}

// Calculate Total Exemptions under Section 10
double Section10Exemptions::calculateTotalExemptions() const {
    return calculateHRA() +
           calculateLTA() +
           calculateChildrenEducationAllowance() +
           calculateHostelAllowance() +
           calculateTransportAllowance() +
           calculateSpecialAllowance() +
           calculateGratuity() +
           calculateCommutedPension() +
           calculateLeaveEncashment() +
           calculateVRSCompensation();
}

// Display all exemptions
void Section10Exemptions::displayExemptions() {
    cout << "\n======= Section 10 Exemptions =======\n";
    cout << "HRA Exemption: ₹" << calculateHRA() << endl;
    cout << "LTA Exemption: ₹" << calculateLTA() << endl;
    cout << "Children Education Allowance: ₹" << calculateChildrenEducationAllowance() << endl;
    cout << "Hostel Allowance: ₹" << calculateHostelAllowance() << endl;
    cout << "Transport Allowance: ₹" << calculateTransportAllowance() << endl;
    cout << "Special Allowance: ₹" << calculateSpecialAllowance() << endl;
    cout << "Gratuity Exemption: ₹" << calculateGratuity() << endl;
    cout << "Commuted Pension Exemption: ₹" << calculateCommutedPension() << endl;
    cout << "Leave Encashment Exemption: ₹" << calculateLeaveEncashment() << endl;
    cout << "VRS Compensation Exemption: ₹" << calculateVRSCompensation() << endl;
    cout << "Total Exemptions under Section 10: ₹" << calculateTotalExemptions() << endl;
}

