#ifndef GROSS_TOTAL_INCOME_H
#define GROSS_TOTAL_INCOME_H

#include "incomeUnderHeadSalaries.h"
#include "incomeUnderHouseProperty.h"
#include "taxCalculation.h"

class GrossTotalIncome {
public:
    GrossTotalIncome(const IncomeUnderHeadSalaries& salaries, const IncomeUnderHouseProperty& houseProperty, const OtherIncome& otherIncome);
    double calculateGrossTotalIncome() const;
    void displayGrossTotalIncome() const;

private:
    const IncomeUnderHeadSalaries& salaries;
    const IncomeUnderHouseProperty& houseProperty;
    const OtherIncome& otherIncome;
};

#endif // GROSS_TOTAL_INCOME_H