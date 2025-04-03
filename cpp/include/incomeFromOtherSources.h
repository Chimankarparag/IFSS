#ifndef INCOME_FROM_OTHER_SOURCES_H
#define INCOME_FROM_OTHER_SOURCES_H

class OtherIncome {
public:
    OtherIncome();
    void inputOtherIncomeDetails();
    double calculateTaxableOtherIncome() const;
    double calculateTotalOtherIncome() const;
    void displayOtherIncomeDetails() const;

    // Getter functions
    double getInterestFromSavingsBank() const;
    double getInterestOnSecurities() const;
    double getInterestOtherThanSecurites() const;
    double getIncomeFromCommission() const;
    double getDividendIncome() const;
    double getWinningsOtherIncome() const;
    double getFamilyPension() const;
    double getUnexplainedIncome() const;
    double getRoyaltyIncome() const;
    double getCarbonCreditIncome() const;
    double getPrematurePFWithdrawal() const;

    // Make calculateFamilyPensionDeduction public
    double calculateFamilyPensionDeduction() const;

private:
    double interestFromSavingsBank;
    double interestOnSecurities;
    double interestOtherThanSecurites;
    double incomeFromCommission;
    double dividendIncome;
    double winningsOtherIncome;
    double familyPension;
    double unexplainedIncome;
    double royaltyIncome;
    double carbonCreditIncome;
    double prematurePFWithdrawal;
};

#endif // INCOME_FROM_OTHER_SOURCES_H