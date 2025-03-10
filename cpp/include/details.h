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

private:
    bool governmentEmployee;
    int age;
    bool withGratuity;
    int unusedLeavesInMonths; // New variable for unused leaves in months
    bool retiring; // New variable for retirement status
};

#endif // DETAILS_H