#ifndef LESS_UNDER_89A_H
#define LESS_UNDER_89A_H

#include <iostream>
#include "foreignRetirement_InGrossIncome.h" // Include the ForeignRetirement header

class LessUnder89A {
public:
    LessUnder89A(const ForeignRetirement* foreignRetirement);
    void inputWithdrawal();
    double calculateLess() const;
    void displayLess() const;

private:
    double withdrawalAmount;
    const ForeignRetirement* foreignRetirement; // Pointer to ForeignRetirement object
};

#endif // LESS_UNDER_89A_H