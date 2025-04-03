#ifndef FOREIGNRETIREMENT_INGROSSINCOME_H
#define FOREIGNRETIREMENT_INGROSSINCOME_H

#include <iostream>

class ForeignRetirement {
public:
    ForeignRetirement();
    void inputRetirementDetails();
    double calculateTaxableIncome();
    void displayRetirementDetails();
    double getAmountFrom89ACountry() const; // Method to get the amount from 89A country
    double getAmountFromNon89ACountry() const ;

private:
    double AmountFrom89ACountry;
    double AmountFromNon89ACountry;
};

#endif // FOREIGNRETIREMENT_INGROSSINCOME_H
