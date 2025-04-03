#ifndef PROFITS_IN_LIEU_H
#define PROFITS_IN_LIEU_H

#include <iostream>

class ProfitsInLieu {
private:
    double terminationCompensation;
    double retirementCompensation;
    double goldenHandshake;
    double keymanInsurancePayout;
    double preEmploymentPayments;
    double postResignationPayments;

public:
    // Constructor
    ProfitsInLieu();

    // Input Function
    void inputProfitsDetails();

    // Calculation Function
    double calculateTotalProfits17_3() const;

    // Display Function
    void displayProfitsBreakup();
};

#endif
