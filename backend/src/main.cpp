#include <iostream>
#include <string>


#include <nlohmann/json.hpp>


#include "salary_17_1.h"
#include "perquisites_17_2.h"
#include "profitsInLieu_17_3.h"
#include "foreignRetirement_InGrossIncome.h"
#include "lessUnder10.h"
#include "details.h"
#include "lessUnder89A.h"
#include "incomeUnderHeadSalaries.h"
#include "incomeUnderHouseProperty.h"
#include "grossSalary.h"
#include "netIncome.h"
#include "grossTotalIncome.h"

#include "incomeFromOtherSources.h"
#include "deductionUnderSection16.h"
#include "taxDeduction.h"
#include "taxCalculation.h"

using json = nlohmann::json;

int main() {
    try {
        // Read JSON input from stdin
        std::string input;
        for (std::string line; std::getline(std::cin, line); input += line);
        json formData = json::parse(input);

        // Populate Salary from income data
        Salary salary;
        const auto& income = formData["income"];
        salary.basicSalary = income["basicSalary"].get<double>();
        salary.pension = income["pension"].get<double>();
        salary.dearnessAllowance = income["dearnessAllowance"].get<double>();
        salary.bonusCommissions = income["bonusCommissions"].get<double>();
        salary.advanceSalary = income["advanceSalary"].get<double>();
        salary.arrears = income["arrearsSalary"].get<double>();
        salary.leaveEncashment = income["leaveEncashment"].get<double>();
        salary.gratuity = income["gratuity"].get<double>();
        salary.hra = income["hraReceived"].get<double>();
        salary.entertainmentAllowance = income["entertainmentAllowance"].get<double>();
        salary.professionalTax = income["professionalTax"].get<double>();
        salary.otherComponents = income["otherComponents"].get<double>();

        // Populate EmployeeDetails
        EmployeeDetails empDetails;
        empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
        empDetails.age = income["employeeAge"].get<int>();
        empDetails.withGratuity = income["hasGratuity"].get<bool>();
        empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
        empDetails.retiring = income["isRetiring"].get<bool>();
        empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

        // Populate Section10Exemptions
        Section10Exemptions exemptions(&salary, &empDetails);
        exemptions.rentPaid = income["rentPaid"].get<double>();
        exemptions.metroCity = income["isMetro"].get<bool>();
        exemptions.ltaAmount = income["ltaClaimed"].get<double>();
        exemptions.childrenEduAllowance = income["childrenEducation"].get<double>();
        exemptions.hostelAllowance = income["hostelAllowance"].get<double>();
        exemptions.transportAllowance = income["transportAllowance"].get<double>();
        exemptions.totalPension = income["totalPension"].get<double>();
        exemptions.commutedPension = income["commutedPension"].get<double>();
        exemptions.vrsCompensation = income["vrsCompensation"].get<double>();

        // Populate Perquisites
        Perquisites perq;
        const auto& perquisites = income;
        perq.rentFreeAccommodation = perquisites["rentFreeAccommodation"].get<double>();
        perq.concessionInRent = perquisites["concessionInRent"].get<double>();
        perq.companyCar = perquisites["companyCar"].get<double>();
        perq.freeUtilities = perquisites["freeUtilities"].get<double>();
        perq.medicalFacilities = perquisites["medicalFacilities"].get<double>();
        perq.interestFreeLoans = perquisites["interestFreeLoans"].get<double>();
        perq.stockOptions = perquisites["esops"].get<double>();
        perq.educationForChildren = perquisites["educationExpenses"].get<double>();

        // Populate ProfitsInLieu
        ProfitsInLieu profits;
        const auto& profitsData = income;
        profits.terminationCompensation = profitsData["terminationCompensation"].get<double>();
        profits.retirementCompensation = profitsData["retirementCompensation"].get<double>();
        profits.goldenHandshake = profitsData["vrsAmount"].get<double>();
        profits.keymanInsurancePayout = profitsData["keymanInsurance"].get<double>();
        profits.preEmploymentPayments = profitsData["preEmploymentPayments"].get<double>();
        profits.postResignationPayments = profitsData["postResignationPayments"].get<double>();

        // Populate ForeignRetirement
        ForeignRetirement foreignRetirement;
        foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
        foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();
        

        // Calculate Less Under 89A
        LessUnder89A lessUnder89A(&foreignRetirement);// Calculate Gross Salary
        lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

        GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);
        
        // Calculate Net Income
        NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &empDetails);
        
        // Calculate Deductions
        DeductionUnderSection16 deductions(&netIncome, &empDetails, &salary);
        
        // Calculate Income Under Head Salaries
        IncomeUnderHeadSalaries incomeSalaries(&netIncome, &deductions);
        
        // Calculate House Property Income
        IncomeUnderHouseProperty houseProperty;
        const auto& housing = formData["housing"];
        houseProperty.selfOccupiedInterestOnBorowedCapital = housing["interestSelfOccupied"].get<double>();
        houseProperty.rentalIncome = housing["rentalIncome"].get<double>();
        houseProperty.municipalTaxes = housing["municipalTaxes"].get<double>();
        houseProperty.unrealisedRent = housing["unrealisedRent"].get<double>();
        houseProperty.letOutInterestOnBorowedCapital = housing["interestLetOut"].get<double>();
        
        // Calculate Other Income
        OtherIncome otherIncome;
        const auto& otherSources = formData["otherSources"];
        otherIncome.interestFromSavingsBank = otherSources["interestSavings"].get<double>();
        otherIncome.interestOnSecurities = otherSources["interestSecurities"].get<double>();
        otherIncome.incomeFromCommission = otherSources["commissionIncome"].get<double>();
        otherIncome.dividendIncome = otherSources["dividendIncome"].get<double>();
        otherIncome.winningsOtherIncome = otherSources["lotteryWinnings"].get<double>();
        otherIncome.familyPension = otherSources["familyPension"].get<double>();
        otherIncome.unexplainedIncome = otherSources["unexplainedIncome"].get<double>();
        otherIncome.royaltyIncome = otherSources["patentRoyalty"].get<double>();
        otherIncome.carbonCreditIncome = otherSources["carbonCredit"].get<double>();
        otherIncome.prematurePFWithdrawal = otherSources["prematurePF"].get<double>();
        
        // Calculate Gross Total Income
        GrossTotalIncome grossTotalIncome(incomeSalaries, houseProperty, otherIncome);
        
        // Calculate Tax Deductions
        TaxDeductions taxDeductions;
        const auto& deductionsData = formData["deductions"];
        taxDeductions.sec80C = deductionsData["section80C"].get<double>();
        taxDeductions.sec80CCC = deductionsData["section80CCC"].get<double>();
        taxDeductions.sec80CCD1 = deductionsData["section80CCD1"].get<double>();
        taxDeductions.sec80CCD1B = deductionsData["section80CCD1B"].get<double>();
        taxDeductions.sec80CCD2 = deductionsData["section80CCD2"].get<double>();
        taxDeductions.sec80D = deductionsData["section80D"].get<double>();
        taxDeductions.sec80DD = deductionsData["section80DD"].get<double>();
        taxDeductions.sec80DDB = deductionsData["section80DDB"].get<double>();
        taxDeductions.sec80E = deductionsData["section80E"].get<double>();
        taxDeductions.sec80EE = deductionsData["section80EE"].get<double>();
        taxDeductions.sec80EEA = deductionsData["section80EEA"].get<double>();
        taxDeductions.sec80EEB = deductionsData["section80EEB"].get<double>();
        taxDeductions.sec80G = deductionsData["section80G"].get<double>();
        taxDeductions.sec80GG = deductionsData["section80GG"].get<double>();
        taxDeductions.sec80GGA = deductionsData["section80GGA"].get<double>();
        taxDeductions.sec80GGC = deductionsData["section80GGC"].get<double>();
        taxDeductions.sec80TTA = deductionsData["section80TTA"].get<double>();
        taxDeductions.sec80TTB = deductionsData["section80TTB"].get<double>();
        taxDeductions.sec80U = deductionsData["section80U"].get<double>();
        

        
        // Final Tax Calculation
        TaxCalculation taxCalc(grossTotalIncome, empDetails, taxDeductions, salary);
        
// Prepare Output
json output = {
    {"section10exemptions", {
        {"hra", exemptions.calculateHRA()},
        {"lta", exemptions.calculateLTA()},
        {"childrenEducation", exemptions.calculateChildrenEducationAllowance()},
        {"hostelAllowance", exemptions.calculateHostelAllowance()},
        {"transportAllowance", exemptions.calculateTransportAllowance()},
        {"specialAllowance", exemptions.calculateSpecialAllowance()},
        {"gratuity", exemptions.calculateGratuity()},
        {"commutedPension", exemptions.calculateCommutedPension()},
        {"leaveEncashment", exemptions.calculateLeaveEncashment()},
        {"vrsCompensation", exemptions.calculateVRSCompensation()},
        {"totalExemptions", exemptions.calculateTotalExemptions()}
    }},
    {"grossSalary", {
        {"total", grossSalary.calculateGrossSalary()},
        {"breakdown", {
            {"section17_1", grossSalary.salary->calculateSalary17_1()},
            {"section17_2", grossSalary.perquisites->calculatePerquisites17_2()},
            {"section17_3", grossSalary.profits->calculateTotalProfits17_3()},
            {"foreignNotified", grossSalary.foreignRetirement->getAmountFrom89ACountry()},
            {"foreignNonNotified", grossSalary.foreignRetirement->getAmountFromNon89ACountry()}
        }}
    }},
    {"lessUnder89A", {
        {"total", lessUnder89A.calculateLess()},
        {"withdrawalAmount", lessUnder89A.withdrawalAmount},
        {"amountFrom89ACountry", lessUnder89A.foreignRetirement->getAmountFrom89ACountry()},
        {"amountFromNon89ACountry", lessUnder89A.foreignRetirement->getAmountFromNon89ACountry()}
    }},
    {"netIncome", {
        {"total", netIncome.calculateNetIncome()},
        {"breakdown", {
            {"grossSalary", grossSalary.calculateGrossSalary()},
            {"section10Exemptions", exemptions.calculateTotalExemptions()},
            {"lessUnder89A", lessUnder89A.calculateLess()}
        }}
    }},
    {"deductionsSection16", {
        {"section16", deductions.calculateTotalDeductions()},
        {"breakdown", {
            {"standardDeduction", deductions.calculateStandardDeduction()},
            {"entertainmentAllowance", deductions.calculateEntertainmentAllowance()},
            {"professionalTax", deductions.calculateProfessionalTax()}
        }}
        
    }},
    {"incomeUnderHeadSalaries", {
        {"total", incomeSalaries.calculateIncomeUnderHeadSalaries()}
    }},
    {"incomeUnderHouseProperty", {
        {"total", houseProperty.calculateIncomeUnderHouseProperty()}
    }},
    {"otherIncome", {
        {"total", otherIncome.calculateTaxableOtherIncome()},
        {"breakdown", {
            {"interestFromSavingsBank", otherIncome.interestFromSavingsBank},
            {"interestOnSecurities", otherIncome.interestOnSecurities},
            {"incomeFromCommission", otherIncome.incomeFromCommission},
            {"dividendIncome", otherIncome.dividendIncome},
            {"winningsOtherIncome", otherIncome.winningsOtherIncome},
            {"familyPension", otherIncome.familyPension},
            {"unexplainedIncome", otherIncome.unexplainedIncome},
            {"royaltyIncome", otherIncome.royaltyIncome},
            {"carbonCreditIncome", otherIncome.carbonCreditIncome},
            {"prematurePFWithdrawal", otherIncome.prematurePFWithdrawal}
        }}
    }},
    {"grossTotalIncome", {
        {"total", grossTotalIncome.calculateGrossTotalIncome()}
    }},
    {"taxDeduction",{
        {"total", taxDeductions.calculateTotalDeduction()},
        {"breakdown", {
            {"section80C", taxDeductions.sec80C},
            {"section80CCC", taxDeductions.sec80CCC},
            {"section80CCD1", taxDeductions.sec80CCD1},
            {"section80CCD1B", taxDeductions.sec80CCD1B},
            {"section80CCD2", taxDeductions.sec80CCD2},
            {"section80D", taxDeductions.sec80D},
            {"section80DD", taxDeductions.sec80DD},
            {"section80DDB", taxDeductions.sec80DDB},
            {"section80E", taxDeductions.sec80E},
            {"section80EE", taxDeductions.sec80EE},
            {"section80EEA", taxDeductions.sec80EEA},
            {"section80EEB", taxDeductions.sec80EEB},
            {"section80G", taxDeductions.sec80G},
            {"section80GG", taxDeductions.sec80GG},
            {"section80GGA", taxDeductions.sec80GGA},
            {"section80GGC", taxDeductions.sec80GGC},
            {"section80TTA", taxDeductions.sec80TTA},
            {"section80TTB", taxDeductions.sec80TTB},
            {"section80U", taxDeductions.sec80U}
        }}
    }},
    {"taxCalculation", {
        {"totalTaxBeforeCess", taxCalc.calculateTotalTaxBeforeCess()},
        {"cess", taxCalc.calculateCess()},
        {"totalTaxesPaid", taxCalc.totalTaxesPaid()},
        {"reliefUnderSec89", taxCalc.reliefUnderSec89()},
        {"rebateUnderSec87A", taxCalc.rebateUnderSec87A(taxCalc.slabTaxableIncome)},
        {"taxAfterRebate", taxCalc.taxAfterRebate(taxCalc.slabTaxableIncome)},
        {"interest234A", taxCalc.interest234A()},
        {"interest234B", taxCalc.interest234B()},
        {"interest234C", taxCalc.interest234C()},
        {"fee234F", taxCalc.fee234F()},
        {"computeTotalTax", taxCalc.computeTotalTax()},
        {"amountPayable", taxCalc.amountPayable()},
        {"refundableAmount", taxCalc.refundableAmount()}
    }}
};     
    std::cout << output.dump(4);
        
    } catch (const std::exception& e) {
        json error = {{"error", e.what()}};
        std::cerr << error.dump();
        return 1;
    }
    return 0;
}