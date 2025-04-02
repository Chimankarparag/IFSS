#include "salary_17_1.h"
#include "perquisites_17_2.h"
#include "profitsInLieu_17_3.h"
#include "foreignRetirement_InGrossIncome.h"
#include "lessUnder10.h"
#include "details.h"
#include "lessUnder89A.h"
#include "grossSalary.h"
#include "netIncome.h"
#include "grossTotalIncome.h"
#include "taxDeduction.h"
#include "incomeFromOtherSources.h"
#include "deductionUnderSection16.h"
#include "incomeUnderHeadSalaries.h"
#include "incomeUnderHouseProperty.h"
#include "taxCalculation.h"

int main() {
    // Input salary details
    Salary salary;
    salary.inputSalaryDetails();

    // Input employee details
    EmployeeDetails employeeDetails;
    employeeDetails.inputDetails();

    // Input Section 10 exemptions
    Section10Exemptions exemptions(&salary, &employeeDetails);
    exemptions.inputDetails();
    exemptions.displayExemptions();

    // Input perquisites details
    Perquisites perq;
    perq.inputPerquisitesDetails();

    // Input profits in lieu details
    ProfitsInLieu profits;
    profits.inputProfitsDetails();

    // Input foreign retirement details
    ForeignRetirement foreignRetirement;
    foreignRetirement.inputRetirementDetails();

    // Calculate and display gross salary
    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);
    grossSalary.displayGrossSalary();

    // Input and display less under 89A
    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.inputWithdrawal();
    lessUnder89A.displayLess();

    // Calculate and display net income
    NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &employeeDetails);
    netIncome.displayNetIncome();

    // Calculate and display deductions under Section 16
    DeductionUnderSection16 deductions(&netIncome, &employeeDetails, &salary);
    deductions.displayNetIncomeAfterDeductions();

    // Calculate and display income under head salaries
    IncomeUnderHeadSalaries incomeUnderHeadSalaries(&netIncome, &deductions);
    incomeUnderHeadSalaries.displayIncomeUnderHeadSalaries();

    // Input and display income under house property
    IncomeUnderHouseProperty incomeUnderHouseProperty;
    incomeUnderHouseProperty.inputHousePropertyDetails();
    incomeUnderHouseProperty.displayIncomeUnderHouseProperty();

    OtherIncome otherIncome;
    otherIncome.inputOtherIncomeDetails();
    otherIncome.displayOtherIncomeDetails();

    // Calculate and display tax details
    GrossTotalIncome grossTotalIncome(incomeUnderHeadSalaries, incomeUnderHouseProperty, otherIncome);
    grossTotalIncome.displayGrossTotalIncome();

    TaxDeductions taxDeductions;
    taxDeductions.inputDeductionsDetails();
    taxDeductions.displayTotalDeduction();

    TaxCalculation taxCalculation(grossTotalIncome, employeeDetails, taxDeductions, salary);
    taxCalculation.inputIncomeDetails();
    taxCalculation.displayIncomeDetails();

    return 0;
}
