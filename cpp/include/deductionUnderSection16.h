#ifndef DEDUCTION_UNDER_SECTION_16_H
#define DEDUCTION_UNDER_SECTION_16_H

#include "netIncome.h"
#include "details.h"
#include "salary_17_1.h"

class DeductionUnderSection16 {
public:
    DeductionUnderSection16(const NetIncome* netIncome, const EmployeeDetails* employeeDetails, const Salary* salary);
    double calculateStandardDeduction() const;
    double calculateEntertainmentAllowance() const;
    double calculateProfessionalTax() const;
    double calculateTotalDeductions() const;
    void displayNetIncomeAfterDeductions() const;

private:
    const NetIncome* netIncome;
    const EmployeeDetails* employeeDetails;
    const Salary* salary;
};

#endif // DEDUCTION_UNDER_SECTION_16_H