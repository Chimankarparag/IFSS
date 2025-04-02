#ifndef INCOME_UNDER_HOUSE_PROPERTY_H
#define INCOME_UNDER_HOUSE_PROPERTY_H

class IncomeUnderHouseProperty {
public:
    IncomeUnderHouseProperty();
    void inputHousePropertyDetails();
    double calculateIncomeUnderHouseProperty() const;
    double calculateIncomeFromSelfOccupiedProperty() const;
    double calculateIncomeFromLetOutProperty() const;
    void displayIncomeUnderHouseProperty() const;
    void displayIncomeFromSelfOccupiedProperty() const;
    void displayIncomeFromLetOutProperty() const;

private:
    double selfOccupiedInterestOnBorowedCapital;
    double rentalIncome;
    double mutable municipalTaxes;
    double mutable unrealisedRent;
    double letOutInterestOnBorowedCapital;
};

#endif // INCOME_UNDER_HOUSE_PROPERTY_H