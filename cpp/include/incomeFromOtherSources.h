#ifndef OTHER_INCOME_H
#define OTHER_INCOME_H

class OtherIncome {
public:
    OtherIncome();
    void inputIncomeDetails();
    double calculateTotalIncome() const;
    void displayIncomeDetails() const;

private:
    double interestFromSavingsBank;
    double interestOnSecurities;
    double otherInterestIncome;
    double winningsFromLottery;
    double winningsFromHorseRace;
    double familyPension;
    double commissionOnLotteryTickets;
    double commissionOrBrokerage;
    double otherIncome;
};

#endif // OTHER_INCOME_H