#ifndef LESS_UNDER_10_H
#define LESS_UNDER_10_H

#include <iostream>
#include "salary_17_1.h"
#include "details.h"

class Section10Exemptions {
public:
    Section10Exemptions(const Salary* salary, const EmployeeDetails* employeeDetails);
    void inputDetails();
    double calculateHRA();
    double calculateLTA();
    double calculateChildrenEducationAllowance();
    double calculateHostelAllowance();
    double calculateTransportAllowance();
    double calculateSpecialAllowance();
    double calculateGratuity();
    double calculateCommutedPension();
    double calculateLeaveEncashment();
    double calculateVRSCompensation();
    void displayExemptions();

private:
    const Salary* salary;
    const EmployeeDetails* employeeDetails;
    double hraReceived;
    double rentPaid;
    bool metroCity;
    double ltaAmount;
    double childrenEduAllowance;
    double hostelAllowance;
    double transportAllowance;
    double specialAllowance;
    // double gratuityReceived;
    // double leaveEncashment;
    double vrsCompensation;
    double totalPension;
    double commutedPension;
};

#endif // LESS_UNDER_10_H
