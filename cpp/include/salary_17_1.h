#ifndef SALARY_17_1_H
#define SALARY_17_1_H

#include <iostream>

class Salary {
public:
    Salary();
    void inputSalaryDetails();
    double getBasicSalary() const;
    double getPension() const;
    double getDearnessAllowance() const;
    double calculateSalary17_1() const;
    void displaySalaryBreakup() const;
    double getGratuity() const;
    double getLeaveEncashment() const;

private:
    double basicSalary;
    double dearnessAllowance;
    double bonusCommissions;
    double advanceSalary;
    double arrears;
    double leaveEncashment;
    double gratuity;
    double pension;
    double otherComponents;
};

#endif // SALARY_17_1_H
