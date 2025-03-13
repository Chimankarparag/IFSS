#ifndef INCOME_UNDER_HEAD_SALARIES_H
#define INCOME_UNDER_HEAD_SALARIES_H

#include "netIncome.h"
#include "deductionUnderSection16.h"

class IncomeUnderHeadSalaries {
public:
    IncomeUnderHeadSalaries(const NetIncome* netIncome, const DeductionUnderSection16* deductions);
    double calculateIncomeUnderHeadSalaries() const;
    void displayIncomeUnderHeadSalaries() const;

private:
    const NetIncome* netIncome;
    const DeductionUnderSection16* deductions;
};

#endif // INCOME_UNDER_HEAD_SALARIES_H