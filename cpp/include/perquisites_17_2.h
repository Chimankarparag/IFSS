#ifndef PERQUISITES_17_1H
#define PERQUISITES_17_1H

#include <iostream>

class Perquisites {
private:
    double rentFreeAccommodation;
    double concessionInRent;
    double companyCar;
    double freeUtilities;
    double medicalFacilities;
    double interestFreeLoans;
    double stockOptions;
    double educationForChildren;

public:
    // Constructor
    Perquisites();

    // Input Function
    void inputPerquisitesDetails();

    // Calculation Function
    double calculatePerquisites17_2() const;

    // Display Function
    void displayPerquisitesBreakup();

    double checkMedicalLimit(double medicalFacilities) const;
    double checkLoanLimit(double interestFreeLoans)const;
};

#endif
