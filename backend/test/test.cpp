#define CATCH_CONFIG_MAIN  
#include "catch_amalgamated.hpp"
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

// Global variable to store parsed JSON data
static json formData;

// Mock input JSON
const std::string mockInput = R"({
    "salary": {
        "advanceSalary": 20000,
        "arrearsSalary": 15000,
        "basicSalary": 2000000,
        "bonusCommissions": 120000,
        "childrenEducation": 4800,
        "commutedPension": 0,
        "companyCar": 36000,
        "concessionInRent": 0,
        "dearnessAllowance": 50000,
        "educationExpenses": 0,
        "employeeAge": 35,
        "entertainmentAllowance": 12000,
        "esops": 50000,
        "foreignRetirementNonNotified": 0,
        "foreignRetirementNotified": 0,
        "freeUtilities": 12000,
        "gratuity": 0,
        "hasGratuity": true,
        "hostelAllowance": 7200,
        "hraReceived": 180000,
        "interestFreeLoans": 0,
        "isGovernmentEmployee": false,
        "isMetro": true,
        "isRetiring": false,
        "keymanInsurance": 0,
        "leaveEncashment": 25000,
        "ltaClaimed": 30000,
        "medicalFacilities": 15000,
        "otherComponents": 8000,
        "pension": 0,
        "postResignationPayments": 0,
        "preEmploymentPayments": 0,
        "professionalTax": 2400,
        "rentFreeAccommodation": 0,
        "rentPaid": 240000,
        "retirementCompensation": 0,
        "section89AWithdrawal": 0,
        "terminationCompensation": 0,
        "totalPension": 0,
        "transportAllowance": 19200,
        "underOldTaxRegime": true,
        "unusedLeaves": 2,
        "vrsAmount": 0,
        "vrsCompensation": 0
    },
    "deductions": {
        "section80C": 150000,
        "section80CCC": 0,
        "section80CCD1": 50000,
        "section80CCD1B": 50000,
        "section80CCD2": 0,
        "section80D": 25000,
        "section80DD": 0,
        "section80DDB": 0,
        "section80E": 35000,
        "section80EE": 50000,
        "section80EEA": 0,
        "section80EEB": 0,
        "section80G": 10000,
        "section80GG": 0,
        "section80GGA": 0,
        "section80GGC": 0,
        "section80TTA": 10000,
        "section80TTB": 0,
        "section80U": 0
    },
    "housing": {
        "interestLetOut": 0,
        "interestSelfOccupied": 180000,
        "municipalTaxes": 15000,
        "rentalIncome": 200000,
        "unrealisedRent": 0
    },
    "investments": {
        "fd": 0,
        "mutualFunds": 0,
        "ppf": 0,
        "stocks": 0
    },
    "otherSources": {
        "carbonCredit": 0,
        "commissionIncome": 0,
        "dividendIncome": 12000,
        "familyPension": 0,
        "interestSavings": 8500,
        "interestSecurities": 1500,
        "lotteryWinnings": 0,
        "otherInterest": 5000,
        "patentRoyalty": 0,
        "prematurePF": 0,
        "unexplainedIncome": 0
    },
    "taxSaving": {
        "TDSpaid": 0,
        "advancetaxDec": 25000,
        "advancetaxJune": 25000,
        "advancetaxMar": 25000,
        "advancetaxSept": 25000,
        "monthOfItrFiling": 7
    }
})";

// --- JSON Parsing Tests ---
TEST_CASE("JSON Parsing Validity", "[JSON]") {
    REQUIRE_NOTHROW(json::parse(mockInput)); // Validate parsing

    // Validate the structure of the parsed JSON
    json parsedJson = json::parse(mockInput);
    REQUIRE(parsedJson.contains("salary"));
    REQUIRE(parsedJson.contains("deductions"));
    REQUIRE(parsedJson.contains("housing"));
    REQUIRE(parsedJson.contains("investments"));
    REQUIRE(parsedJson.contains("otherSources"));
    REQUIRE(parsedJson.contains("taxSaving"));

    // Validate specific fields within the JSON structure
    REQUIRE(parsedJson["salary"].contains("basicSalary"));
    REQUIRE(parsedJson["salary"]["basicSalary"].is_number());
    REQUIRE(parsedJson["deductions"].contains("section80C"));
    REQUIRE(parsedJson["deductions"]["section80C"].is_number());
    REQUIRE(parsedJson["housing"].contains("interestSelfOccupied"));
    REQUIRE(parsedJson["housing"]["interestSelfOccupied"].is_number());
    REQUIRE(parsedJson["investments"].contains("fd"));
    REQUIRE(parsedJson["investments"]["fd"].is_number());
    REQUIRE(parsedJson["otherSources"].contains("dividendIncome"));
    REQUIRE(parsedJson["otherSources"]["dividendIncome"].is_number());
    REQUIRE(parsedJson["taxSaving"].contains("advancetaxDec"));
    REQUIRE(parsedJson["taxSaving"]["advancetaxDec"].is_number());
}

TEST_CASE("Invalid JSON Handling", "[JSON]") {
    std::string invalidJson = "{ invalid: json }";
    REQUIRE_THROWS_AS(json::parse(invalidJson), json::parse_error);

    // Additional invalid JSON examples
    std::string missingBrace = "{ \"key\": \"value\" ";
    REQUIRE_THROWS_AS(json::parse(missingBrace), json::parse_error);

    std::string invalidStructure = "{ \"key\": { \"nested\": \"value\" }";
    REQUIRE_THROWS_AS(json::parse(invalidStructure), json::parse_error);
}

// Setup function to parse JSON data
void setup() {
    const std::string mockInput = R"({
        "salary": {
            "advanceSalary": 20000,
            "arrearsSalary": 15000,
            "basicSalary": 2000000,
            "bonusCommissions": 120000,
            "childrenEducation": 4800,
            "commutedPension": 0,
            "companyCar": 36000,
            "concessionInRent": 0,
            "dearnessAllowance": 50000,
            "educationExpenses": 0,
            "employeeAge": 35,
            "entertainmentAllowance": 12000,
            "esops": 50000,
            "foreignRetirementNonNotified": 0,
            "foreignRetirementNotified": 0,
            "freeUtilities": 12000,
            "gratuity": 0,
            "hasGratuity": true,
            "hostelAllowance": 7200,
            "hraReceived": 180000,
            "interestFreeLoans": 0,
            "isGovernmentEmployee": false,
            "isMetro": true,
            "isRetiring": false,
            "keymanInsurance": 0,
            "leaveEncashment": 25000,
            "ltaClaimed": 30000,
            "medicalFacilities": 15000,
            "otherComponents": 8000,
            "pension": 0,
            "postResignationPayments": 0,
            "preEmploymentPayments": 0,
            "professionalTax": 2400,
            "rentFreeAccommodation": 0,
            "rentPaid": 240000,
            "retirementCompensation": 0,
            "section89AWithdrawal": 0,
            "terminationCompensation": 0,
            "totalPension": 0,
            "transportAllowance": 19200,
            "underOldTaxRegime": true,
            "unusedLeaves": 2,
            "vrsAmount": 0,
            "vrsCompensation": 0
        },
        "deductions": {
            "section80C": 150000,
            "section80CCC": 0,
            "section80CCD1": 50000,
            "section80CCD1B": 50000,
            "section80CCD2": 0,
            "section80D": 25000,
            "section80DD": 0,
            "section80DDB": 0,
            "section80E": 35000,
            "section80EE": 50000,
            "section80EEA": 0,
            "section80EEB": 0,
            "section80G": 10000,
            "section80GG": 0,
            "section80GGA": 0,
            "section80GGC": 0,
            "section80TTA": 10000,
            "section80TTB": 0,
            "section80U": 0
        },
        "housing": {
            "interestLetOut": 0,
            "interestSelfOccupied": 180000,
            "municipalTaxes": 15000,
            "rentalIncome": 200000,
            "unrealisedRent": 0
        },
        "investments": {
            "fd": 0,
            "mutualFunds": 0,
            "ppf": 0,
            "stocks": 0
        },
        "otherSources": {
            "carbonCredit": 0,
            "commissionIncome": 0,
            "dividendIncome": 12000,
            "familyPension": 0,
            "interestSavings": 8500,
            "interestSecurities": 1500,
            "lotteryWinnings": 0,
            "otherInterest": 5000,
            "patentRoyalty": 0,
            "prematurePF": 0,
            "unexplainedIncome": 0
        },
        "taxSaving": {
            "TDSpaid": 0,
            "advancetaxDec": 25000,
            "advancetaxJune": 25000,
            "advancetaxMar": 25000,
            "advancetaxSept": 25000,
            "monthOfItrFiling": 7
        }
    })";

    std::istringstream inputStream(mockInput);
    std::string input;
    for (std::string line; std::getline(inputStream, line); input += line);
    formData = json::parse(input);
}


// --- Salary Class Tests ---
TEST_CASE("Salary Initialization from JSON", "[Salary]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    // Verify Salary fields
    REQUIRE(salary.basicSalary == 2000000);
    REQUIRE(salary.pension == 0);
    REQUIRE(salary.dearnessAllowance == 50000);
    REQUIRE(salary.bonusCommissions == 120000);
    REQUIRE(salary.advanceSalary == 20000);
    REQUIRE(salary.arrears == 15000);
    REQUIRE(salary.leaveEncashment == 25000);
    REQUIRE(salary.gratuity == 0);
    REQUIRE(salary.hra == 180000);
    REQUIRE(salary.entertainmentAllowance == 12000);
    REQUIRE(salary.professionalTax == 2400);
    REQUIRE(salary.otherComponents == 8000);
}

// --- EmployeeDetails Class Tests ---
TEST_CASE("EmployeeDetails Initialization from JSON", "[EmployeeDetails]") {
    setup();
    EmployeeDetails empDetails;
    const auto& income = formData["salary"];
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

    // Verify EmployeeDetails fields
    REQUIRE(empDetails.governmentEmployee == false);
    REQUIRE(empDetails.age == 35);
    REQUIRE(empDetails.withGratuity == true);
    REQUIRE(empDetails.unusedLeavesInMonths == 2);
    REQUIRE(empDetails.retiring == false);
    REQUIRE(empDetails.oldTaxRegime == true);
}

// --- Section10Exemptions Class Tests ---
TEST_CASE("Section10Exemptions Initialization from JSON", "[Section10Exemptions]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    EmployeeDetails empDetails;
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

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

    // Verify Section10Exemptions fields
    REQUIRE(exemptions.rentPaid == 240000);
    REQUIRE(exemptions.metroCity == true);
    REQUIRE(exemptions.ltaAmount == 30000);
    REQUIRE(exemptions.childrenEduAllowance == 4800);
    REQUIRE(exemptions.hostelAllowance == 7200);
    REQUIRE(exemptions.transportAllowance == 19200);
    REQUIRE(exemptions.totalPension == 0);
    REQUIRE(exemptions.commutedPension == 0);
    REQUIRE(exemptions.vrsCompensation == 0);

    SECTION("HRA Calculation") {
        double basic = 2000000;
        double expectedHRA = std::min({
            180000.0,                   // Actual HRA received
            240000.0 - 0.1*basic,        // Rent paid - 10% basic (240000 - 200000 = 40000)
            0.5*basic                    // 50% of basic (metro)
        });
        REQUIRE(exemptions.calculateHRA() == Catch::Approx(expectedHRA));
    }

    SECTION("Children Education Allowance") {
        // ₹100/month/child * 2 children * 12 months = 2400
        REQUIRE(exemptions.calculateChildrenEducationAllowance() == Catch::Approx(200));
    }

    SECTION("Hostel Allowance") {
        // ₹300/month/child * 2 children * 12 months = 7200
        REQUIRE(exemptions.calculateHostelAllowance() == Catch::Approx(600));
    }

    SECTION("Transport Allowance") {
        // Actual (19200) < Limit (3200*12=38400)
        REQUIRE(exemptions.calculateTransportAllowance() == Catch::Approx(19200));
    }

    SECTION("Leave Encashment") {
        // Not retiring → exemption = 0
        REQUIRE(exemptions.calculateLeaveEncashment() == Catch::Approx(0));
    }

    SECTION("Gratuity") {
        // Not government employee + hasGratuity → cap at ₹20L, but received 0
        REQUIRE(exemptions.calculateGratuity() == Catch::Approx(0));
    }

    SECTION("Total Exemptions") {
        double expected = 40000 +  // HRA
                          30000 +  // LTA
                          200 +   // Children Education
                          600 +    // Hostel
                          19200;    // Transport
                          
        REQUIRE(exemptions.calculateTotalExemptions() == Catch::Approx(expected));
    }

    SECTION("Edge Case: Non-Metro HRA") {
        exemptions.metroCity = false;
        double expectedHRA = std::min({
            180000.0,
            240000.0 - 200000.0,  // 40000
            0.4*2000000           // 800000 (40% of basic)
        });
        REQUIRE(exemptions.calculateHRA() == Catch::Approx(expectedHRA));
    }
}

    


// --- Perquisites Class Tests ---
TEST_CASE("Perquisites Initialization from JSON", "[Perquisites]") {
    setup();
    const auto& income = formData["salary"];
    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    // Verify Perquisites fields
    REQUIRE(perq.rentFreeAccommodation == 0);
    REQUIRE(perq.concessionInRent == 0);
    REQUIRE(perq.companyCar == 36000);
    REQUIRE(perq.freeUtilities == 12000);
    REQUIRE(perq.medicalFacilities == 15000);
    REQUIRE(perq.interestFreeLoans == 0);
    REQUIRE(perq.stockOptions == 50000);
    REQUIRE(perq.educationForChildren == 0);

    SECTION("checkMedicalLimit Function") {
        REQUIRE(perq.checkMedicalLimit(10000) == 0);
        REQUIRE(perq.checkMedicalLimit(15000) == 0);
        REQUIRE(perq.checkMedicalLimit(20000) == 5000);
        REQUIRE(perq.checkMedicalLimit(30000) == 15000);
    }

    SECTION("checkLoanLimit Function") {
        REQUIRE(perq.checkLoanLimit(10000) == 0);
        REQUIRE(perq.checkLoanLimit(20000) == 0);
        REQUIRE(perq.checkLoanLimit(25000) == 5000);
        REQUIRE(perq.checkLoanLimit(30000) == 10000);
    }

    SECTION("calculatePerquisites17_2 Function") {
        REQUIRE(perq.calculatePerquisites17_2() == Catch::Approx(98000)); // Adjust the expected value as needed
    }
}

// --- ProfitsInLieu Class Tests ---
TEST_CASE("ProfitsInLieu Initialization from JSON", "[ProfitsInLieu]") {
    setup();
    const auto& income = formData["salary"];
    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    // Verify ProfitsInLieu fields
    REQUIRE(profits.terminationCompensation == 0);
    REQUIRE(profits.retirementCompensation == 0);
    REQUIRE(profits.goldenHandshake == 0);
    REQUIRE(profits.keymanInsurancePayout == 0);
    REQUIRE(profits.preEmploymentPayments == 0);
    REQUIRE(profits.postResignationPayments == 0);

    SECTION("Calculate ProfitsInLieu Function") {
        REQUIRE(profits.calculateTotalProfits17_3() == Catch::Approx(0)); // Adjust the expected value as needed
    }

}

// --- ForeignRetirement Class Tests ---
TEST_CASE("ForeignRetirement Initialization from JSON", "[ForeignRetirement]") {
    setup();
    const auto& income = formData["salary"];
    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    // Verify ForeignRetirement fields
    REQUIRE(foreignRetirement.AmountFrom89ACountry == 0);
    REQUIRE(foreignRetirement.AmountFromNon89ACountry == 0);

    SECTION("calculateTaxableIncome Function") {
        REQUIRE(foreignRetirement.calculateTaxableIncome() == 0);
    
        // Test with non-zero values
        foreignRetirement.AmountFrom89ACountry = 10000;
        foreignRetirement.AmountFromNon89ACountry = 5000;
        REQUIRE(foreignRetirement.calculateTaxableIncome() == 15000);
    
        // Test with another set of non-zero values
        foreignRetirement.AmountFrom89ACountry = 20000;
        foreignRetirement.AmountFromNon89ACountry = 30000;
        REQUIRE(foreignRetirement.calculateTaxableIncome() == 50000);
    }
    

}


// --- LessUnder89A Class Tests ---
TEST_CASE("LessUnder89A Initialization from JSON", "[LessUnder89A]") {
    setup();
    const auto& income = formData["salary"];
    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

    // Verify LessUnder89A fields
    REQUIRE(lessUnder89A.withdrawalAmount == 0);
    SECTION("calculateLess Function") {
        // Test with zero withdrawal amount
        REQUIRE(lessUnder89A.calculateLess() == 0);
    
        // Test with non-zero withdrawal amount
        lessUnder89A.withdrawalAmount = 5000;
        REQUIRE(lessUnder89A.calculateLess() == 0);
    
        // Test with another set of non-zero values
        foreignRetirement.AmountFrom89ACountry = 10000;
        lessUnder89A.withdrawalAmount = 3000;
        REQUIRE(lessUnder89A.calculateLess() == 7000);
    
        // Test with another set of non-zero values
        foreignRetirement.AmountFrom89ACountry = 20000;
        lessUnder89A.withdrawalAmount = 15000;
        REQUIRE(lessUnder89A.calculateLess() == 5000);
    }
    

}

// --- GrossSalary Class Tests ---
TEST_CASE("GrossSalary Initialization from JSON", "[GrossSalary]") {

    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);

    SECTION("calculateGrossSalary Function") {
        // Test with initial values
        REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(2336000)); // Adjust the expected value as needed
        // Test with modified salary values
        salary.basicSalary = 1000000;
        salary.pension = 0;
        salary.dearnessAllowance = 0;
        salary.bonusCommissions = 0;
        salary.advanceSalary = 0;
        salary.arrears = 0;
        salary.leaveEncashment = 0;
        salary.gratuity =0;
        salary.hra =0;
        salary.entertainmentAllowance = 
        salary.professionalTax = 0;
        salary.otherComponents = 0;
        perq.rentFreeAccommodation = 0;
        perq.concessionInRent = 0;
        perq.companyCar = 0;
        perq.freeUtilities = 0;
        perq.medicalFacilities = 0;
        perq.interestFreeLoans = 0;
        perq.stockOptions = 0;
        perq.educationForChildren = 0;
        profits.terminationCompensation = 0;
        profits.retirementCompensation = 0;
        profits.goldenHandshake = 0;
        profits.keymanInsurancePayout = 0;
        profits.preEmploymentPayments = 0;
        profits.postResignationPayments = 0;
        foreignRetirement.AmountFrom89ACountry = 0;
        foreignRetirement.AmountFromNon89ACountry = 0;

        REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(1000000)); // Adjust the expected value as needed

        // Test with modified salary values
        salary.basicSalary = 1000000;
        salary.pension = 50000;
        salary.dearnessAllowance = 25000;
        salary.bonusCommissions = 60000;

        REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(1135000)); // Adjust the expected value as needed
    
        // Test with modified perquisites values
        perq.rentFreeAccommodation = 10000;
        perq.concessionInRent = 5000;
        perq.companyCar = 20000;
        perq.freeUtilities = 6000;
        perq.medicalFacilities = 7500;
        perq.interestFreeLoans = 10000;
        perq.stockOptions = 25000;
        perq.educationForChildren = 3000;
        REQUIRE(perq.calculatePerquisites17_2() == Catch::Approx(69000));
        REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(1204000)); // Adjust the expected value as needed
    
        // Test with modified profits values
        profits.terminationCompensation = 10000;
        profits.retirementCompensation = 5000;
        profits.goldenHandshake = 2000;
        profits.keymanInsurancePayout = 3000;
        profits.preEmploymentPayments = 1500;
        profits.postResignationPayments = 2500;
        REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(1228000)); // Adjust the expected value as needed
    
        // Test with modified foreign retirement values
        foreignRetirement.AmountFrom89ACountry = 10000;
        foreignRetirement.AmountFromNon89ACountry = 5000;
        REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(1243000)); // Adjust the expected value as needed
    }
    
}


// --- NetIncome Class Tests ---
TEST_CASE("NetIncome Initialization from JSON", "[NetIncome]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    EmployeeDetails empDetails;
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

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

    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);

    NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &empDetails);

   SECTION("calculateNetIncome Function") {
            // Test with initial values
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(2246000)); // Adjust the expected value as needed
    
            // Test with modified salary values
            salary.basicSalary = 1000000;
            salary.pension = 0;
            salary.dearnessAllowance = 0;
            salary.bonusCommissions = 0;
            salary.advanceSalary = 0;
            salary.arrears = 0;
            salary.leaveEncashment = 0;
            salary.gratuity = 0;
            salary.hra = 0;
            salary.entertainmentAllowance = 0;
            salary.professionalTax = 0;
            salary.otherComponents = 0;
            perq.rentFreeAccommodation = 0;
            perq.concessionInRent = 0;
            perq.companyCar = 0;
            perq.freeUtilities = 0;
            perq.medicalFacilities = 0;
            perq.interestFreeLoans = 0;
            perq.stockOptions = 0;
            perq.educationForChildren = 0;
            profits.terminationCompensation = 0;
            profits.retirementCompensation = 0;
            profits.goldenHandshake = 0;
            profits.keymanInsurancePayout = 0;
            profits.preEmploymentPayments = 0;
            profits.postResignationPayments = 0;
            foreignRetirement.AmountFrom89ACountry = 0;
            foreignRetirement.AmountFromNon89ACountry = 0;
            empDetails.oldTaxRegime = false;

            REQUIRE(grossSalary.calculateGrossSalary() == Catch::Approx(1000000));
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1000000)); // Adjust the expected value as needed
    
            // Test with modified salary values
            salary.basicSalary = 1000000;
            salary.pension = 50000;
            salary.dearnessAllowance = 25000;
            salary.bonusCommissions = 60000;
    
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1135000)); // Adjust the expected value as needed
    
            // Test with modified perquisites values
            perq.rentFreeAccommodation = 10000;
            perq.concessionInRent = 5000;
            perq.companyCar = 20000;
            perq.freeUtilities = 6000;
            perq.medicalFacilities = 7500;
            perq.interestFreeLoans = 10000;
            perq.stockOptions = 25000;
            perq.educationForChildren = 3000;
            REQUIRE(perq.calculatePerquisites17_2() == Catch::Approx(69000));
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1204000)); // Adjust the expected value as needed
    
            // Test with modified profits values
            profits.terminationCompensation = 10000;
            profits.retirementCompensation = 5000;
            profits.goldenHandshake = 2000;
            profits.keymanInsurancePayout = 3000;
            profits.preEmploymentPayments = 1500;
            profits.postResignationPayments = 2500;
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1228000)); // Adjust the expected value as needed
    
            // Test with modified foreign retirement values
            foreignRetirement.AmountFrom89ACountry = 10000;
            foreignRetirement.AmountFromNon89ACountry = 5000;
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1243000)); // Adjust the expected value as needed
    
            // Test with old tax regime
            empDetails.oldTaxRegime = true;
            exemptions.rentPaid = 240000;
            exemptions.metroCity = true;
            exemptions.ltaAmount = 30000;
            exemptions.childrenEduAllowance = 4800;
            exemptions.hostelAllowance = 7200;
            exemptions.transportAllowance = 19200;
            exemptions.totalPension = 0;
            exemptions.commutedPension = 0;
            exemptions.vrsCompensation = 0;
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1243000 - exemptions.calculateTotalExemptions() - lessUnder89A.calculateLess())); // Adjust the expected value as needed
    
            // Test with new tax regime
            empDetails.oldTaxRegime = false;
            REQUIRE(netIncome.calculateNetIncome() == Catch::Approx(1243000)); // Adjust the expected value as needed
        }
    }
   


// --- DeductionUnderSection16 Class Tests ---
TEST_CASE("DeductionUnderSection16 Initialization from JSON", "[DeductionUnderSection16]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    EmployeeDetails empDetails;
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

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

    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);

    NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &empDetails);

    DeductionUnderSection16 deductions(&netIncome, &empDetails, &salary);

    SECTION("DeductionUnderSection16 Function Tests") {
        // Test calculateStandardDeduction function
        SECTION("calculateStandardDeduction Function") {
            // Test with old tax regime
            empDetails.oldTaxRegime = true;
            REQUIRE(deductions.calculateStandardDeduction() == Catch::Approx(50000.0));
    
            // Test with new tax regime
            empDetails.oldTaxRegime = false;
            REQUIRE(deductions.calculateStandardDeduction() == Catch::Approx(75000.0));
    
            // Test with net income less than standard deduction

        }
    
        // Test calculateEntertainmentAllowance function
        SECTION("calculateEntertainmentAllowance Function") {
            // Test with government employee
            empDetails.governmentEmployee = true;
            salary.entertainmentAllowance = 10000.0;
            salary.basicSalary = 200000.0;
            REQUIRE(deductions.calculateEntertainmentAllowance() == Catch::Approx(5000.0));
    
            // Test with non-government employee
            empDetails.governmentEmployee = false;
            REQUIRE(deductions.calculateEntertainmentAllowance() == Catch::Approx(0.0));
    
            // Test with entertainment allowance greater than 5000
            salary.entertainmentAllowance = 6000.0;
            REQUIRE(deductions.calculateEntertainmentAllowance() == Catch::Approx(0.0));
    
            // Test with basic salary such that 20% of basic is less than 5000
            salary.basicSalary = 24000.0;
            REQUIRE(deductions.calculateEntertainmentAllowance() == Catch::Approx(0.0));
        }
    
        // Test calculateProfessionalTax function
        SECTION("calculateProfessionalTax Function") {
            // Test with professional tax less than 2500
            salary.professionalTax = 2000.0;
            REQUIRE(deductions.calculateProfessionalTax() == Catch::Approx(2000.0));
    
            // Test with professional tax greater than 2500
            salary.professionalTax = 3000.0;
            REQUIRE(deductions.calculateProfessionalTax() == Catch::Approx(2500.0));
        }
    
        // Test calculateTotalDeductions function
        SECTION("calculateTotalDeductions Function") {
            // Test with all deductions
            empDetails.oldTaxRegime = true;
            empDetails.governmentEmployee = true;
            salary.entertainmentAllowance = 10000.0;
            salary.basicSalary = 200000.0;
            salary.professionalTax = 3000.0;
            REQUIRE(deductions.calculateTotalDeductions() == Catch::Approx(57500.0));
    
            // Test with new tax regime
            empDetails.oldTaxRegime = false;
            REQUIRE(deductions.calculateTotalDeductions() == Catch::Approx(82500.0));
    
            // Test with non-government employee
            empDetails.governmentEmployee = false;
            REQUIRE(deductions.calculateTotalDeductions() == Catch::Approx(77500.0));
        }
    }
    
    
}
/*

// --- IncomeUnderHeadSalaries Class Tests ---
TEST_CASE("IncomeUnderHeadSalaries Initialization from JSON", "[IncomeUnderHeadSalaries]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    EmployeeDetails empDetails;
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

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

    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);

    NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &empDetails);

    DeductionUnderSection16 deductions(&netIncome, &empDetails, &salary);

    IncomeUnderHeadSalaries incomeSalaries(&netIncome, &deductions);

    // Verify IncomeUnderHeadSalaries fields (if any)
    // Add REQUIRE statements as needed
}

// --- IncomeUnderHouseProperty Class Tests ---
TEST_CASE("IncomeUnderHouseProperty Initialization from JSON", "[IncomeUnderHouseProperty]") {
    setup();
    const auto& housing = formData["housing"];
    IncomeUnderHouseProperty houseProperty;
    houseProperty.selfOccupiedInterestOnBorowedCapital = housing["interestSelfOccupied"].get<double>();
    houseProperty.rentalIncome = housing["rentalIncome"].get<double>();
    houseProperty.municipalTaxes = housing["municipalTaxes"].get<double>();
    houseProperty.unrealisedRent = housing["unrealisedRent"].get<double>();
    houseProperty.letOutInterestOnBorowedCapital = housing["interestLetOut"].get<double>();

    // Verify IncomeUnderHouseProperty fields
    REQUIRE(houseProperty.selfOccupiedInterestOnBorowedCapital == 180000);
    REQUIRE(houseProperty.rentalIncome == 200000);
    REQUIRE(houseProperty.municipalTaxes == 15000);
    REQUIRE(houseProperty.unrealisedRent == 0);
    REQUIRE(houseProperty.letOutInterestOnBorowedCapital == 0);
}

// --- OtherIncome Class Tests ---
TEST_CASE("OtherIncome Initialization from JSON", "[OtherIncome]") {
    setup();
    const auto& otherSources = formData["otherSources"];
    OtherIncome otherIncome;
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

    // Verify OtherIncome fields
    REQUIRE(otherIncome.interestFromSavingsBank == 8500);
    REQUIRE(otherIncome.interestOnSecurities == 1500);
    REQUIRE(otherIncome.incomeFromCommission == 0);
    REQUIRE(otherIncome.dividendIncome == 12000);
    REQUIRE(otherIncome.winningsOtherIncome == 0);
    REQUIRE(otherIncome.familyPension == 0);
    REQUIRE(otherIncome.unexplainedIncome == 0);
    REQUIRE(otherIncome.royaltyIncome == 0);
    REQUIRE(otherIncome.carbonCreditIncome == 0);
    REQUIRE(otherIncome.prematurePFWithdrawal == 0);
}

// --- GrossTotalIncome Class Tests ---
TEST_CASE("GrossTotalIncome Initialization from JSON", "[GrossTotalIncome]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    EmployeeDetails empDetails;
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

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

    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);

    NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &empDetails);

    DeductionUnderSection16 deductions(&netIncome, &empDetails, &salary);

    IncomeUnderHeadSalaries incomeSalaries(&netIncome, &deductions);

    const auto& housing = formData["housing"];
    IncomeUnderHouseProperty houseProperty;
    houseProperty.selfOccupiedInterestOnBorowedCapital = housing["interestSelfOccupied"].get<double>();
    houseProperty.rentalIncome = housing["rentalIncome"].get<double>();
    houseProperty.municipalTaxes = housing["municipalTaxes"].get<double>();
    houseProperty.unrealisedRent = housing["unrealisedRent"].get<double>();
    houseProperty.letOutInterestOnBorowedCapital = housing["interestLetOut"].get<double>();

    const auto& otherSources = formData["otherSources"];
    OtherIncome otherIncome;
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

    GrossTotalIncome grossTotalIncome(incomeSalaries, houseProperty, otherIncome);

    // Verify GrossTotalIncome fields (if any)
    // Add REQUIRE statements as needed
}

// --- TaxDeductions Class Tests ---
TEST_CASE("TaxDeductions Initialization from JSON", "[TaxDeductions]") {
    setup();
    const auto& deductionsData = formData["deductions"];
    TaxDeductions taxDeductions;
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

    // Verify TaxDeductions fields
    REQUIRE(taxDeductions.sec80C == 150000);
    REQUIRE(taxDeductions.sec80CCC == 0);
    REQUIRE(taxDeductions.sec80CCD1 == 50000);
    REQUIRE(taxDeductions.sec80CCD1B == 50000);
    REQUIRE(taxDeductions.sec80CCD2 == 0);
    REQUIRE(taxDeductions.sec80D == 25000);
    REQUIRE(taxDeductions.sec80DD == 0);
    REQUIRE(taxDeductions.sec80DDB == 0);
    REQUIRE(taxDeductions.sec80E == 35000);
    REQUIRE(taxDeductions.sec80EE == 50000);
    REQUIRE(taxDeductions.sec80EEA == 0);
    REQUIRE(taxDeductions.sec80EEB == 0);
    REQUIRE(taxDeductions.sec80G == 10000);
    REQUIRE(taxDeductions.sec80GG == 0);
    REQUIRE(taxDeductions.sec80GGA == 0);
    REQUIRE(taxDeductions.sec80GGC == 0);
    REQUIRE(taxDeductions.sec80TTA == 10000);
    REQUIRE(taxDeductions.sec80TTB == 0);
    REQUIRE(taxDeductions.sec80U == 0);
}

// --- TaxCalculation Class Tests ---
TEST_CASE("TaxCalculation Initialization from JSON", "[TaxCalculation]") {
    setup();
    Salary salary;
    const auto& income = formData["salary"];
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

    EmployeeDetails empDetails;
    empDetails.governmentEmployee = income["isGovernmentEmployee"].get<bool>();
    empDetails.age = income["employeeAge"].get<int>();
    empDetails.withGratuity = income["hasGratuity"].get<bool>();
    empDetails.unusedLeavesInMonths = income["unusedLeaves"].get<int>();
    empDetails.retiring = income["isRetiring"].get<bool>();
    empDetails.oldTaxRegime = income["underOldTaxRegime"].get<bool>();

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

    ForeignRetirement foreignRetirement;
    foreignRetirement.AmountFrom89ACountry = income["foreignRetirementNotified"].get<double>();
    foreignRetirement.AmountFromNon89ACountry = income["foreignRetirementNonNotified"].get<double>();

    LessUnder89A lessUnder89A(&foreignRetirement);
    lessUnder89A.withdrawalAmount = income["section89AWithdrawal"].get<double>();

    Perquisites perq;
    perq.rentFreeAccommodation = income["rentFreeAccommodation"].get<double>();
    perq.concessionInRent = income["concessionInRent"].get<double>();
    perq.companyCar = income["companyCar"].get<double>();
    perq.freeUtilities = income["freeUtilities"].get<double>();
    perq.medicalFacilities = income["medicalFacilities"].get<double>();
    perq.interestFreeLoans = income["interestFreeLoans"].get<double>();
    perq.stockOptions = income["esops"].get<double>();
    perq.educationForChildren = income["educationExpenses"].get<double>();

    ProfitsInLieu profits;
    profits.terminationCompensation = income["terminationCompensation"].get<double>();
    profits.retirementCompensation = income["retirementCompensation"].get<double>();
    profits.goldenHandshake = income["vrsAmount"].get<double>();
    profits.keymanInsurancePayout = income["keymanInsurance"].get<double>();
    profits.preEmploymentPayments = income["preEmploymentPayments"].get<double>();
    profits.postResignationPayments = income["postResignationPayments"].get<double>();

    GrossSalary grossSalary(&salary, &perq, &profits, &foreignRetirement);

    NetIncome netIncome(&grossSalary, &exemptions, &lessUnder89A, &empDetails);

    DeductionUnderSection16 deductions(&netIncome, &empDetails, &salary);

    IncomeUnderHeadSalaries incomeSalaries(&netIncome, &deductions);

    const auto& housing = formData["housing"];
    IncomeUnderHouseProperty houseProperty;
    houseProperty.selfOccupiedInterestOnBorowedCapital = housing["interestSelfOccupied"].get<double>();
    houseProperty.rentalIncome = housing["rentalIncome"].get<double>();
    houseProperty.municipalTaxes = housing["municipalTaxes"].get<double>();
    houseProperty.unrealisedRent = housing["unrealisedRent"].get<double>();
    houseProperty.letOutInterestOnBorowedCapital = housing["interestLetOut"].get<double>();

    const auto& otherSources = formData["otherSources"];
    OtherIncome otherIncome;
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

    GrossTotalIncome grossTotalIncome(incomeSalaries, houseProperty, otherIncome);

    const auto& deductionsData = formData["deductions"];
    TaxDeductions taxDeductions;
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

    TaxCalculation taxCalc(grossTotalIncome, empDetails, taxDeductions, salary);
    const auto& taxSavingData = formData["taxSaving"];
    taxCalc.TDS = taxSavingData["TDSpaid"].get<double>();
    taxCalc.advanceTaxJune15 = taxSavingData["advancetaxJune"].get<double>();
    taxCalc.advanceTaxSeptember15 = taxSavingData["advancetaxSept"].get<double>();
    taxCalc.advanceTaxDecember15 = taxSavingData["advancetaxDec"].get<double>();
    taxCalc.advanceTaxMarch15 = taxSavingData["advancetaxMar"].get<double>();
    taxCalc.ITRFilingMonth = taxSavingData["monthOfItrFiling"].get<int>();

    // Verify TaxCalculation fields
    REQUIRE(taxCalc.TDS == 0);
    REQUIRE(taxCalc.advanceTaxJune15 == 25000);
    REQUIRE(taxCalc.advanceTaxSeptember15 == 25000);
    REQUIRE(taxCalc.advanceTaxDecember15 == 25000);
    REQUIRE(taxCalc.advanceTaxMarch15 == 25000);
    REQUIRE(taxCalc.ITRFilingMonth == 7);
}

// --- JSON Parsing Tests ---

*/