#ifndef LESS_UNDER_10_H
#define LESS_UNDER_10_H

#include <iostream>
#include "salary_17_1.h"
#include "details.h"

class Section10Exemptions {
public:
    Section10Exemptions(const Salary* salary, const EmployeeDetails* employeeDetails);
    void inputDetails();
    double calculateHRA()const;
    double calculateLTA()const;
    double calculateChildrenEducationAllowance()const;
    double calculateHostelAllowance()const;
    double calculateTransportAllowance()const;
    double calculateSpecialAllowance()const;
    double calculateGratuity()const;
    double calculateCommutedPension()const;
    double calculateLeaveEncashment()const;
    double calculateVRSCompensation()const;
    double calculateTotalExemptions() const ; // New method to calculate total exemptions
    void displayExemptions();

private:
    const Salary* salary;
    const EmployeeDetails* employeeDetails;
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
