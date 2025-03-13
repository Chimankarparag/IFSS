#ifndef GROSS_SALARY_H
#define GROSS_SALARY_H

#include "salary_17_1.h"
#include "perquisites_17_2.h"
#include "profitsInLieu_17_3.h"
#include "foreignRetirement_InGrossIncome.h"

class GrossSalary {
public:
    GrossSalary(const Salary* salary, const Perquisites* perquisites, const ProfitsInLieu* profits, const ForeignRetirement* foreignRetirement);
    double calculateGrossSalary() const;
    void displayGrossSalary() const;

private:
    const Salary* salary;
    const Perquisites* perquisites;
    const ProfitsInLieu* profits;
    const ForeignRetirement* foreignRetirement;
};

#endif // GROSS_SALARY_H