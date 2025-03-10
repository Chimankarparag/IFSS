#include "salary_17_1.h"
#include "perquisites_17_2.h"
#include "profitsInLieu_17_3.h"
#include "foreignRetirement_InGrossIncome.h"
#include "lessUnder10.h"
#include "details.h"
#include "lessUnder89A.h"
#include "grossSalary.h"

int main() {
    Salary salary;
    salary.inputSalaryDetails();

    EmployeeDetails employeeDetails;
    employeeDetails.inputDetails();

    Section10Exemptions exemptions(&salary, &employeeDetails);

    Perquisites perq;
    perq.inputPerquisitesDetails();

    ProfitsInLieu profits;
    profits.inputProfitsDetails();

    ForeignRetirement foreignRetirement;
    foreignRetirement.inputRetirementDetails();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);
    grossSalary.displayGrossSalary();

    exemptions.inputDetails();
    exemptions.displayExemptions();
    
    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.inputWithdrawal();
    lessUnder89A.displayLess();


    return 0;
}
