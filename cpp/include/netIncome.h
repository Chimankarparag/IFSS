#ifndef NET_INCOME_H
#define NET_INCOME_H

#include "grossSalary.h"
#include "lessUnder10.h"
#include "lessUnder89A.h"
#include "details.h"

class NetIncome {
public:
    NetIncome(const GrossSalary* grossSalary, const Section10Exemptions* section10Exemptions, const LessUnder89A* lessUnder89A, const EmployeeDetails* employeeDetails);
    double calculateNetIncome() const;
    void displayNetIncome() const;

private:
    const GrossSalary* grossSalary;
    const Section10Exemptions* section10Exemptions;
    const LessUnder89A* lessUnder89A;
    const EmployeeDetails* employeeDetails;
};

#endif // NET_INCOME_H