#ifndef DETAILS_H
#define DETAILS_H

#include <iostream>

class EmployeeDetails {
public:
    EmployeeDetails();
    void inputDetails();
    bool isGovernmentEmployee() const;
    int getAge() const;
    bool isWithGratuity() const;
    int getUnusedLeavesInMonths() const;
    bool isRetiring() const;
    bool isOldTaxRegime() const;

private:
    bool governmentEmployee;
    int age;
    bool withGratuity;
    int unusedLeavesInMonths;
    bool retiring;
    bool oldTaxRegime;
};

#endif // DETAILS_H