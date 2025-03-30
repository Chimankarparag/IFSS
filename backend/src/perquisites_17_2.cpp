#include "perquisites_17_2.h"

using namespace std;

// Constructor initializes all values to 0
Perquisites::Perquisites()
    : rentFreeAccommodation(0), concessionInRent(0), companyCar(0), freeUtilities(0),
      medicalFacilities(0), interestFreeLoans(0), stockOptions(0), educationForChildren(0) {}

// Function to take perquisite input
void Perquisites::inputPerquisitesDetails() {
    cout << "Rent-Free Accommodation provided by employer: ";
    cin >> rentFreeAccommodation;
    cout << "Concession in Rent provided by employer: ";
    cin >> concessionInRent;
    cout << "Company Car provided for personal use: ";
    cin >> companyCar;
    cout << "Free Utilities (electricity, water, etc.): ";
    cin >> freeUtilities;
    cout << "Medical Facilities provided: ";
    cin >> medicalFacilities;
    cout << "Interest-Free Loans provided: ";
    cin >> interestFreeLoans;
    cout << "Stock Options (ESOPs) taxable: ";
    cin >> stockOptions;
    cout << "Education Expenses paid by employer: ";
    cin >> educationForChildren;
}

double Perquisites::checkMedicalLimit(double medicalFacilities)const {
    if (medicalFacilities > 15000) {
        return medicalFacilities - 15000;
    }
    return 0;
}

double Perquisites::checkLoanLimit(double interestFreeLoans)const {
    if (interestFreeLoans > 20000) {
        return interestFreeLoans - 20000;
    }
    return 0;
}

// Function to calculate total taxable perquisites under Section 17(2)
double Perquisites::calculatePerquisites17_2() const{
    return rentFreeAccommodation + concessionInRent + companyCar + 
           freeUtilities + checkMedicalLimit(medicalFacilities) + checkLoanLimit(interestFreeLoans) + 
           stockOptions + educationForChildren;
}

// Function to display perquisite breakup
void Perquisites::displayPerquisitesBreakup() {
    cout << "\nPerquisites Breakdown (Section 17(2)):\n";
    cout << "---------------------------------\n";
    cout << "Rent-Free Accommodation: " << rentFreeAccommodation << endl;
    cout << "Concession in Rent: " << concessionInRent << endl;
    cout << "Company Car (personal use): " << companyCar << endl;
    cout << "Free Utilities (Electricity, Water, Gas): " << freeUtilities << endl;
    cout << "Medical Facilities (Taxable above ₹15,000): " << medicalFacilities << endl;
    cout << "Interest-Free Loans (Taxable above ₹20,000): " << interestFreeLoans << endl;
    cout << "Stock Options (ESOPs): " << stockOptions << endl;
    cout << "Education for Children: " << educationForChildren << endl;
    cout << "---------------------------------\n";
    cout << "Total Taxable Perquisites (Section 17(2)): " << calculatePerquisites17_2() << endl;
}
