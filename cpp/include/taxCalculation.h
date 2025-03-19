#ifndef TAX_CALCULATION_H
#define TAX_CALCULATION_H

#include<algorithm>
#include<iostream>

#include "incomeFromOtherSources.h"
#include "taxDeduction.h"
#include "details.h"
#include "salary_17_1.h"

class GrossTotalIncome;

class TaxCalculation {
public:
    TaxCalculation(const GrossTotalIncome& grossTotalIncome, const EmployeeDetails& details, const TaxDeductions& taxDeductions,const Salary& salary);
    void inputIncomeDetails() ;
    double calculateTotalTaxBeforeCess() const;
    double calculateCess() const;
    void displayIncomeDetails() const;
    double taxCalculationCaller() const;
    double totalTaxesPaid() const;
    double reliefUnderSec89() const;
    double rebateUnderSec87A(double slabTaxableIncome) const;
    double taxAfterRebate(double slabTaxableIncome) const;
    double taxBeforeInterest() const;
    double interest234A() const;
    double interest234B() const;
    double interest234C() const;
    double fee234F() const;
    double computeTotalTax() const;
    double amountPayable() const;
    double refundableAmount() const;

private:
    const GrossTotalIncome& grossTotalIncome;
    const EmployeeDetails& details;
    const TaxDeductions& taxDeductions;
    const Salary& salary;
    OtherIncome otherIncome;
    static double taxAtSpecialRates;
    static double slabTaxableIncome;

    double TDS;
    double advanceTaxJune15;
    double advanceTaxSeptember15;
    double advanceTaxDecember15;
    double advanceTaxMarch15;
    double monthsDelayed;
    int ITRFilingMonth;
    double relief;

    double OTRA(double slabTaxableIncome) const;
    double OTRB(double slabTaxableIncome) const;
    double OTRC(double slabTaxableIncome) const;
    double NTR(double slabTaxableIncome) const;



};

#endif // TAX_CALCULATION_H