#include "taxCalculation.h"
using namespace std;

double TaxCalculation::taxAtSpecialRates = 0;
double TaxCalculation::slabTaxableIncome = 0;

// Constructor initializes values to 0 and sets the reference to grossTotalIncome
TaxCalculation::TaxCalculation(const GrossTotalIncome& grossTotalIncome, const EmployeeDetails& details, const TaxDeductions& taxDeductions,const Salary& salary)
: grossTotalIncome(grossTotalIncome), details(details), taxDeductions(taxDeductions), salary(salary), TDS(0), advanceTaxJune15(0), advanceTaxSeptember15(0), advanceTaxDecember15(0), advanceTaxMarch15(0), monthsDelayed(0) {}

// Function to take input details
void TaxCalculation::inputIncomeDetails() {
    cout << "\nEnter TDS paid(Tax Deducted at Source) :";
    cin>>TDS;
    cout << "\nEnter Advance Tax paid :\n June 15 :";
    cin>>advanceTaxJune15;
    cout << "\nSeptember 15 :";
    cin>>advanceTaxSeptember15;
    cout << "\nDecember 15 :";
    cin>>advanceTaxDecember15;
    cout << "\nMarch 15 :";
    cin>>advanceTaxMarch15;
    cout << "\nEnter Month of ITR filing (1-12):";
    cin>>ITRFilingMonth;
    monthsDelayed = max(0,ITRFilingMonth -7);

    taxAtSpecialRates = 0.78 * otherIncome.getUnexplainedIncome() + 
                        0.10 * otherIncome.getRoyaltyIncome() + 
                        0.10 * otherIncome.getCarbonCreditIncome() + 
                        0.30 * otherIncome.getWinningsOtherIncome();
    slabTaxableIncome = grossTotalIncome.calculateGrossTotalIncome() + 
                       otherIncome.calculateTaxableOtherIncome() - 
                       otherIncome.calculateTotalOtherIncome() - taxDeductions.calculateTotalDeduction();

    slabTaxableIncome = max(0.0, slabTaxableIncome);
}

double TaxCalculation::taxCalculationCaller() const {
    double preTax = 0;
    if(details.isOldTaxRegime()){
        if(details.getAge() <= 60){
            preTax = OTRA(slabTaxableIncome);
        } else if(details.getAge() > 60 && details.getAge() <= 80){
            preTax = OTRB(slabTaxableIncome);
        } else {
            preTax = OTRB(slabTaxableIncome);
        }
    } else {
        preTax = NTR(slabTaxableIncome);
    }

    cout << "Pre-Tax Amount: " << preTax << endl;
    return preTax;
}

double TaxCalculation::OTRA(double slabTaxableIncome) const {
    double tax = 0.0;

    if (slabTaxableIncome <= 250000) {
        tax = 0;  // No tax for income up to ₹2,50,000
    } 
    else if (slabTaxableIncome <= 500000) {
        tax = (slabTaxableIncome - 250000) * 0.05;  // 5% above ₹2,50,000
    } 
    else if (slabTaxableIncome <= 1000000) {
        tax = 12500 + (slabTaxableIncome - 500000) * 0.20;  // ₹12,500 + 20% above ₹5,00,000
    } 
    else if (slabTaxableIncome <= 50000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  // ₹1,12,500 + 30% above ₹10,00,000
    } 
    else if (slabTaxableIncome <= 100000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.10;  // 10% surcharge for ₹50L - ₹1Cr
    } 
    else if (slabTaxableIncome <= 200000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.15;  // 15% surcharge for ₹1Cr - ₹2Cr
    } 
    else if (slabTaxableIncome <= 500000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.25;  // 25% surcharge for ₹2Cr - ₹5Cr
    } 
    else {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.37;  // 37% surcharge for above ₹5Cr
    }

    return tax;
}

double TaxCalculation::OTRB(double slabTaxableIncome) const {
    double tax = 0.0;

    if (slabTaxableIncome <= 300000) {
        tax = 0;  // No tax for income up to ₹3,00,000
    } 
    else if (slabTaxableIncome <= 500000) {
        tax = (slabTaxableIncome - 300000) * 0.05;  // 5% above ₹3,00,000
    } 
    else if (slabTaxableIncome <= 1000000) {
        tax = 10000 + (slabTaxableIncome - 500000) * 0.20;  // ₹10,000 + 20% above ₹5,00,000
    } 
    else if (slabTaxableIncome <= 50000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  // ₹1,12,500 + 30% above ₹10,00,000
    } 
    else if (slabTaxableIncome <= 100000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.10;  // 10% surcharge for ₹50L - ₹1Cr
    } 
    else if (slabTaxableIncome <= 200000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.15;  // 15% surcharge for ₹1Cr - ₹2Cr
    } 
    else if (slabTaxableIncome <= 500000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.25;  // 25% surcharge for ₹2Cr - ₹5Cr
    } 
    else {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.37;  // 37% surcharge for above ₹5Cr
    }

    return tax;
}

double TaxCalculation::OTRC(double slabTaxableIncome) const {
    double tax = 0.0;

    if (slabTaxableIncome <= 500000) {
        tax = 0;  // No tax for income up to ₹5,00,000
    } 
    else if (slabTaxableIncome <= 1000000) {
        tax = (slabTaxableIncome - 500000) * 0.20;  // 20% above ₹5,00,000
    } 
    else if (slabTaxableIncome <= 50000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  // ₹1,12,500 + 30% above ₹10,00,000
    } 
    else if (slabTaxableIncome <= 100000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.10;  // 10% surcharge for ₹50L - ₹1Cr
    } 
    else if (slabTaxableIncome <= 200000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.15;  // 15% surcharge for ₹1Cr - ₹2Cr
    } 
    else if (slabTaxableIncome <= 500000000) {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.25;  // 25% surcharge for ₹2Cr - ₹5Cr
    } 
    else {
        tax = 112500 + (slabTaxableIncome - 1000000) * 0.30;  
        tax += tax * 0.37;  // 37% surcharge for above ₹5Cr
    }

    return tax;
}
double TaxCalculation::NTR(double slabTaxableIncome) const {
    double tax = 0.0;

    if (slabTaxableIncome <= 400000) {
        tax = 0;  
    } 
    else if (slabTaxableIncome <= 800000) {
        tax = (slabTaxableIncome - 400000) * 0.05;  
    } 
    else if (slabTaxableIncome <= 1200000) {
        tax = 20000 + (slabTaxableIncome - 800000) * 0.10; 
    } 
    else if (slabTaxableIncome <= 1600000) {
        tax = 60000 + (slabTaxableIncome - 1200000) * 0.15;  
    } 
    else if (slabTaxableIncome <=2000000) {
        tax = 120000 + (slabTaxableIncome - 1600000) * 0.20;  
    } 
    else if (slabTaxableIncome <= 24000000) {
        tax = 200000 + (slabTaxableIncome - 2000000) * 0.25;  
    }  
    else {
        tax = 300000 + (slabTaxableIncome - 2400000) * 0.30;  
    } 

     // Apply surcharge
        if (slabTaxableIncome > 5000000 && slabTaxableIncome <= 10000000) {
            tax += tax * 0.10;  // 10% surcharge for ₹50L - ₹1Cr
        } 
        else if (slabTaxableIncome > 10000000 && slabTaxableIncome <= 20000000) {
            tax += tax * 0.15;  // 15% surcharge for ₹1Cr - ₹2Cr
        } 
        else if (slabTaxableIncome > 20000000) {
            tax += tax * 0.25;  // 25% surcharge for above ₹2Cr
        }

    return tax;
}

double TaxCalculation::totalTaxesPaid() const {
    return TDS + advanceTaxJune15 + advanceTaxSeptember15 + advanceTaxDecember15 + advanceTaxMarch15;
}

double TaxCalculation::rebateUnderSec87A(double slabTaxableIncome) const {
    double rebate = 0.0;

    if (!details.isOldTaxRegime()) {
        // New Tax Regime: Rebate applicable for income up to ₹7,00,000
        if (slabTaxableIncome <= 1200000) {
            rebate = min(60000.0, taxCalculationCaller());
        }else if (slabTaxableIncome > 1200000) {
            double excessIncome = slabTaxableIncome - 1200000;
            double normalTax = NTR(slabTaxableIncome);
            if(normalTax > excessIncome){
                rebate = normalTax - excessIncome;
            }
        }
    } else {
        // Old Tax Regime: Rebate applicable for income up to ₹5,00,000
        if (slabTaxableIncome <= 500000) {
            rebate = min(12500.0, taxCalculationCaller());
        }
    }

    return rebate;
}

double TaxCalculation::taxAfterRebate(double slabTaxableIncome) const {
    return taxCalculationCaller() - rebateUnderSec87A(slabTaxableIncome);
}


// Function to calculate total income
double TaxCalculation::calculateTotalTaxBeforeCess() const {
    return taxAtSpecialRates + taxAfterRebate(slabTaxableIncome);
}

double TaxCalculation::calculateCess() const {
    return (0.04 * calculateTotalTaxBeforeCess());
}

double TaxCalculation::reliefUnderSec89() const{
    cout<<"Submit form 10E to claim these relief\nEnter the relief amount under section 89: ";
    double relief;
    cin>>relief;
    return min(relief, (salary.getAdvanceSalary() + salary.getArrears() ));
}
double TaxCalculation::taxBeforeInterest() const{
    return calculateTotalTaxBeforeCess() + calculateCess() - reliefUnderSec89();
}

double TaxCalculation::interest234A() const {
    if(monthsDelayed >11){
        return 0;
    }
    return max( (taxBeforeInterest() - totalTaxesPaid())* 0.01 * monthsDelayed, 0.0);
}

double TaxCalculation::interest234B() const {
    if(monthsDelayed >11){
        return 0;
    }
    double unpaidAdvanceTax = taxBeforeInterest() - totalTaxesPaid();
    double assessedTax = taxBeforeInterest() - TDS;
    if(unpaidAdvanceTax <= 0.1* assessedTax){
        return 0;
    }else{
        return (unpaidAdvanceTax * 0.01 * (ITRFilingMonth - 3));
    }

}

double TaxCalculation::interest234C() const {
    double assessedTax = taxBeforeInterest() - TDS;
    double requiredJune15 = 0.15 * assessedTax;
    double requiredSeptember15 = 0.45 * assessedTax;
    double requiredDecember15 = 0.75 * assessedTax;
    double requiredMarch15 = assessedTax;

    double interest = 0.0;
    double cumulativeAdvanceTax = advanceTaxJune15;

    if (cumulativeAdvanceTax < requiredJune15) {
        interest += (requiredJune15 - cumulativeAdvanceTax) * 0.01 * 3;
    }
    cumulativeAdvanceTax += advanceTaxSeptember15;
    if (cumulativeAdvanceTax < requiredSeptember15) {
        interest += (requiredSeptember15 - cumulativeAdvanceTax) * 0.01 * 3;
    }
    cumulativeAdvanceTax += advanceTaxDecember15;
    if (cumulativeAdvanceTax < requiredDecember15) {
        interest += (requiredDecember15 - cumulativeAdvanceTax) * 0.01 * 3;
    }
    cumulativeAdvanceTax += advanceTaxMarch15;
    if (cumulativeAdvanceTax < requiredMarch15) {
        interest += (requiredMarch15 - cumulativeAdvanceTax) * 0.01 * 1;
    }

    return interest;
}

double TaxCalculation::fee234F() const {
    double grosstotalincome = grossTotalIncome.calculateGrossTotalIncome();
    if (grosstotalincome <= 250000) return 0; // No penalty for incomes below exemption limit
    if (monthsDelayed <= 0) return 0; // No delay, no penalty

    if (grosstotalincome <= 500000) {
        return 1000; // Maximum penalty for income ≤ ₹5L
    } else {
        return (monthsDelayed <= 5) ? 5000 : 10000; // ₹5K if before Dec, else ₹10K
    }
}

double TaxCalculation::computeTotalTax() const{
    return calculateTotalTaxBeforeCess() + calculateCess() + interest234A() + interest234B() + interest234C() + fee234F();
}

double TaxCalculation::amountPayable() const{
    if(computeTotalTax() < totalTaxesPaid()){
        return 0;
    }
    return computeTotalTax() - totalTaxesPaid();
}
double TaxCalculation::refundableAmount() const{
    if(computeTotalTax() > totalTaxesPaid()){
        return 0;
    }
    return totalTaxesPaid() - computeTotalTax();
}


// Function to display income details
void TaxCalculation::displayIncomeDetails() const {
    cout << "\nTDS Paid: " << TDS << endl;
    cout << "Advance Tax Paid: " << advanceTaxJune15 + advanceTaxSeptember15 + advanceTaxDecember15 + advanceTaxMarch15 << endl;
    cout << "Pre-calculated Tax (Special Rates): " << taxAtSpecialRates << endl;
    cout << "Taxable Income (Normal Rates): " << slabTaxableIncome << endl;
    cout << "Tax Before rebate: " << taxCalculationCaller()<< endl;
    cout << "Rebate under Section 87A: " << rebateUnderSec87A(slabTaxableIncome) << endl;
    cout << "Tax After rebate: " << taxAfterRebate(slabTaxableIncome) << endl;
    cout << "Total Tax Before Cess: " << calculateTotalTaxBeforeCess() << endl;
    cout << "Total Cess: " << calculateCess() << endl;
    cout << "Interest under Section 234A: " << interest234A() << endl;
    cout << "Interest under Section 234B: " << interest234B() << endl;
    cout << "Interest under Section 234C: " << interest234C() << endl;
    cout << "Fee under Section 234F: " << fee234F() << endl;
    cout << "Total Tax (including interest and fees): " << computeTotalTax() << endl;
    cout << "Amount Payable: " << amountPayable() << endl;
    cout << "Refundable Amount: " << refundableAmount() << endl;


}

