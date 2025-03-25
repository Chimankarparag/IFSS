import React, { JSX, useState } from 'react';
import { Check, AlertCircle, ArrowRight, ArrowLeft, Home, Briefcase, DollarSign, Leaf, PiggyBank, Library } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { number } from 'zod';

const TaxFilingDashboard = () => {
  // State for handling active modal, selected category, and completion status
  const [activeModal, setActiveModal] = useState<keyof typeof formData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    income: {
      // Basic Salary Details
      basicSalary: '',
      pension: '',
      dearnessAllowance: '',
      bonusCommissions: '',
      advanceSalary: '',
      arrearsSalary: '',
      leaveEncashment: '',
      gratuity: '',
      hraReceived: '',
      entertainmentAllowance: '',
      professionalTax: '',
      otherComponents: '',

      // Section 10 Exemptions

      rentPaid: '',
      isMetro: false,
      ltaClaimed: '',
      childrenEducation: '',
      hostelAllowance: '',
      transportAllowance: '',
      totalPension: '',
      commutedPension: '',
      vrsCompensation: '',
      
      // Perquisites
      rentFreeAccommodation: '',
      concessionInRent: '',
      companyCar: '',
      freeUtilities: '',
      medicalFacilities: '',
      interestFreeLoans: '',
      esops: '',
      educationExpenses: '',
      
      // Profits in Lieu
      terminationCompensation: '',
      retirementCompensation: '',
      vrsAmount: '',
      keymanInsurance: '',
      preEmploymentPayments: '',
      postResignationPayments: '',
      
      // Foreign Retirement
      foreignRetirementNotified: '',
      foreignRetirementNonNotified: '',
      section89AWithdrawal: '',
      
      // Additional Details
      isGovernmentEmployee: false,
      employeeAge: '',
      hasGratuity: false,
      unusedLeaves: '',
      isRetiring: false,
      underOldTaxRegime: false,
      
      completed: false,
      progress: 0
    },
    deductions: {
      section80C: '',
      section80CCC: '',
      section80CCD1: '',
      section80CCD1B: '',
      section80CCD2: '',
      section80D: '',
      section80DD: '',
      section80DDB: '',
      section80E: '',
      section80EE: '',
      section80EEA: '',
      section80EEB: '',
      section80G: '',
      section80GG: '',
      section80GGA: '',
      section80GGC: '',
      section80TTA: '',
      section80TTB: '',
      section80U: '',
      completed: false,
      progress: 0
    },
    housing: {
        interestSelfOccupied: '',    // For self-occupied property
        rentalIncome: '',           // For let-out property
        municipalTaxes: '',
        unrealisedRent: '',
        interestLetOut: '',          // For let-out property
        completed: false,
        progress: 0
    },
    investments: {
      stocks: '',
      mutualFunds: '',
      fd: '',
      ppf: '',
      completed: false,
      progress: 0
    },
    otherSources: {
      interestSavings: '',
      interestSecurities: '',
      otherInterest: '',
      commissionIncome: '',
      dividendIncome: '',
      lotteryWinnings: '',
      familyPension: '',
      unexplainedIncome: '',
      patentRoyalty: '',
      carbonCredit: '',
      prematurePF: '',
      completed: false,
      progress: 0
    },
    taxSaving: {
      TDSpaid:'',
      advancetaxJune: '',
      advancetaxSept: '',
      advancetaxDec: '',
      advancetaxMar: '',
      monthOfItrFiling: '',
      completed: false,
      progress: 0
    }
  });
  const [displayOutput, setDisplayOutput] = useState({
    salary: number,
    deductions: number,
    housing: number,
    investments: number,
    taxPaid: number,
    otherSources: number,
  });

  const calculateSalary = async () => {
    try {
      // const response = await fetch('/api/blah/blah',{mehtod: 'GET' }, body: JSON.Parse(formData.Salary))
      // 
    } catch (error) {
      
    }
  }

  const fetchData = async () => {
    try {
      // 
    } catch (error) {
      
    }
  }

  // Function to update form data
  const updateFormData = (category: keyof typeof formData, field: string, value: string | number |boolean) => {
    setFormData(prev => ({
      ...prev, 
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // Function to calculate progress for a category
  const calculateProgress = (category: keyof typeof formData) => {
    const fields = Object.keys(formData[category]).filter((key) => key !== 'completed' && key !== 'progress');
    const filledFields = fields.filter((field) => {
      const value = formData[category][field as keyof typeof formData[typeof category]];
      return (typeof value === 'string' && value !== '') || (typeof value === 'number' && !isNaN(value)) || (typeof value === 'boolean' && value !== null);
    });
    const progress = Math.round((filledFields.length / fields.length) * 100);
    
    updateFormData(category, 'progress', progress);
    updateFormData(category, 'completed', progress === 100 ? 'true' : 'false');
    
    return progress;
  };

  // Function to open modal and set active category
  const openModal = (category: keyof typeof formData | null) => {
    setActiveModal(category);
    setCurrentStep(1);
  };

  // Function to handle next step in modal
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Function to handle previous step in modal
  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Function to close modal and update progress
  const handleCloseModal = () => {
    if (activeModal) {
      calculateProgress(activeModal);
    }
    setActiveModal(null);
    setCurrentStep(1);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (activeModal) {
        calculateProgress(activeModal);
      }
    // Here you would typically save data via API
    if (activeModal) {
      if (activeModal) {
        console.log(`Submitting data for ${activeModal}:`, formData[activeModal]);
      }
    }
    setActiveModal(null);
    setCurrentStep(1);
  };

  // Define the tax category cards
  type FormDataCategory = keyof typeof formData;

  const taxCategories: { id: FormDataCategory; title: string; description: string; icon: JSX.Element; formSteps: number }[] = [
    {
      id: "income",
      title: "Salary",
      description: "Salary, business & other income sources",
      icon: <Briefcase className="h-8 w-8 text-blue-500" />,
      formSteps: 3
    },
    {
      id: "deductions",
      title: "Deductions",
      description: "Section 80C, 80D & other deductions",
      icon: <PiggyBank className="h-8 w-8 text-green-500" />,
      formSteps: 2
    },
    {
      id: "housing",
      title: "Housing & Property",
      description: "House property income & deductions",
      icon: <Home className="h-8 w-8 text-purple-500" />,
      formSteps: 2
    },
    {
      id: "investments",
      title: "Investments",
      description: "Stocks, mutual funds returns ",
      icon: <CustomLibrary className="h-8 w-8 text-yellow-500" />,
      formSteps: 2
    },
    {
      id: "otherSources",
      title: "Other Sources",
      description: "Income from Lottery, Gifts and Winnings",
      icon: <DollarSign className="h-8 w-8 text-red-500" />,
      formSteps: 1
    },
    {
      id: "taxSaving",
      title: "TDS & Advance Tax",
      description: "TDS and Advance Tax paid in the FY",
      icon: <Leaf className="h-8 w-8 text-emerald-500" />,
      formSteps: 2
    }
  ];

  // Render the card grid
  return (
    <div className="w-full min-h-screen text-zinc-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {taxCategories.map((category) => (
          <Card 
            key={category.id}
            className="bg-[#1e1e1e] border-[#333333] hover:border-blue-600 transition-all duration-200 cursor-pointer"
            onClick={() => openModal(category.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                {category.icon}
                <span className={`text-white text-xs px-2 py-1 rounded ${
                  formData[category.id].progress === 100 ? 'bg-green-600' : 'bg-amber-600'
                }`}>
                  {formData[category.id].progress === 100 ? 'Completed' : 'Pending'}
                </span>
              </div>
              <CardTitle className="text-zinc-100 text-lg">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-3">{category.description}</p>
              
              {formData[category.id].progress > 0 ? (
                <div className="bg-[#252525] p-3 rounded border border-[#333333]">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Completion:</span>
                    <span className="text-zinc-300">{formData[category.id].progress}%</span>
                  </div>
                  <div className="w-full bg-[#333333] rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        formData[category.id].progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                      }`} 
                      style={{ width: `${formData[category.id].progress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center bg-[#252525] p-3 rounded border border-[#333333]">
                  <AlertCircle size={16} className="text-amber-500 mr-2" />
                  <span className="text-sm text-zinc-400">Complete form to see summary</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Income Modal */}
      <Dialog open={activeModal === 'income'} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-4xl">
        <DialogHeader>
          <DialogTitle>Salary Details</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Comprehensive salary breakdown with tax components
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs value={`step-${currentStep}`}>
            <TabsList className="grid grid-cols-6 mb-6 bg-[#252525] gap-1">
              {['Basic', 'Exempt', 'Perqs', 'Profits', 'Foreign', 'Addl'].map((label, index) => (
                <TabsTrigger 
                  key={label}
                  value={`step-${index + 1}`}
                  disabled={currentStep !== index + 1}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white text-xs p-2"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Basic Salary Details */}
            <TabsContent value="step-1">
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Basic Salary" 
                  id="basicSalary"
                  value={formData.income.basicSalary}
                  onChange={(value) => updateFormData('income', 'basicSalary', value)}
                />
                <InputField 
                  label="Pension" 
                  id="pension"
                  value={formData.income.pension}
                  onChange={(value) => updateFormData('income', 'pension', value)}
                />
                <InputField 
                  label="Dearness Allowance" 
                  id="dearnessAllowance"
                  value={formData.income.dearnessAllowance}
                  onChange={(value) => updateFormData('income', 'dearnessAllowance', value)}
                />
                <InputField 
                  label="Bonus & Commissions" 
                  id="bonusCommissions"
                  value={formData.income.bonusCommissions}
                  onChange={(value) => updateFormData('income', 'bonusCommissions', value)}
                />
                <InputField 
                  label="Advance Salary" 
                  id="advanceSalary"
                  value={formData.income.advanceSalary}
                  onChange={(value) => updateFormData('income', 'advanceSalary', value)}
                />
                <InputField 
                  label="Arrears of Salary" 
                  id="arrearsSalary"
                  value={formData.income.arrearsSalary}
                  onChange={(value) => updateFormData('income', 'arrearsSalary', value)}
                />
                <InputField 
                  label="Leave Encashment" 
                  id="leaveEncashment"
                  value={formData.income.leaveEncashment}
                  onChange={(value) => updateFormData('income', 'leaveEncashment', value)}
                />
                <InputField 
                  label="Gratuity" 
                  id="gratuity"
                  value={formData.income.gratuity}
                  onChange={(value) => updateFormData('income', 'gratuity', value)}
                />
                <InputField 
                  label="HRA Received" 
                  id="hraReceived"
                  value={formData.income.hraReceived}
                  onChange={(value) => updateFormData('income', 'hraReceived', value)}
                />
                <InputField
                  label="Entertainment Allowance" 
                  id="entertainmentAllowance"
                  value={formData.income.entertainmentAllowance}
                  onChange={(value) => updateFormData('income', 'entertainmentAllowance', value)}
                />
                <InputField 
                  label="Professional Tax" 
                  id="professionalTax"
                  value={formData.income.professionalTax}
                  onChange={(value) => updateFormData('income', 'professionalTax', value)}
                />
                <InputField
                  label="Other Components (10C)" 
                  id="otherComponents"
                  value={formData.income.otherComponents}
                  onChange={(value) => updateFormData('income', 'otherComponents', value)}
                />  
              </div>
            </TabsContent>
            {/* Section 10 Exemptions */}
            <TabsContent value="step-2">
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Rent Paid" 
                  id="rentPaid"
                  value={formData.income.rentPaid}
                  onChange={(value) => updateFormData('income', 'rentPaid', value)}
                />
                <div className="space-y-2">
                  <Label>Metro City?</Label>
                  <Select
                    value={formData.income.isMetro ? "1" : "0"}
                    onValueChange={(v) => updateFormData('income', 'isMetro', v === "1")}
                  >
                    <SelectTrigger className="bg-[#252525] border-[#333333]">
                      <SelectValue placeholder="Select city type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <InputField 
                  label="LTA Claimed" 
                  id="ltaClaimed"
                  value={formData.income.ltaClaimed}
                  onChange={(value) => updateFormData('income', 'ltaClaimed', value)}
                />
                <InputField 
                  label="Children Education" 
                  id="childrenEducation"
                  value={formData.income.childrenEducation}
                  onChange={(value) => updateFormData('income', 'childrenEducation', value)}
                />
                <InputField 
                  label="Hostel Allowance" 
                  id="hostelAllowance"
                  value={formData.income.hostelAllowance}
                  onChange={(value) => updateFormData('income', 'hostelAllowance', value)}
                />
                <InputField 
                  label="Transport Allowance" 
                  id="transportAllowance"
                  value={formData.income.transportAllowance}
                  onChange={(value) => updateFormData('income', 'transportAllowance', value)}
                />
                <InputField 
                  label="Total Pension" 
                  id="totalPension"
                  value={formData.income.totalPension}
                  onChange={(value) => updateFormData('income', 'totalPension', value)}  
                />
                <InputField
                  label="Commuted Pension" 
                  id="commutedPension"
                  value={formData.income.commutedPension}
                  onChange={(value) => updateFormData('income', 'commutedPension', value)} 
                />
                <InputField
                  label="VRS Compensation" 
                  id="vrsCompensation"
                  value={formData.income.vrsCompensation}
                  onChange={(value) => updateFormData('income', 'vrsCompensation', value)}
                />
              </div>
            </TabsContent>

            {/* Perquisites */}
            <TabsContent value="step-3">
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Rent-Free Accommodation" 
                  id="rentFreeAccommodation"
                  value={formData.income.rentFreeAccommodation}
                  onChange={(value) => updateFormData('income', 'rentFreeAccommodation', value)}
                />
                <InputField 
                  label="Concession in Rent" 
                  id="concessionInRent"
                  value={formData.income.concessionInRent}
                  onChange={(value) => updateFormData('income', 'concessionInRent', value)}
                />
                <InputField 
                  label="Company Car Value" 
                  id="companyCar"
                  value={formData.income.companyCar}
                  onChange={(value) => updateFormData('income', 'companyCar', value)}
                />
                <InputField 
                  label="Free Utilities" 
                  id="freeUtilities"
                  value={formData.income.freeUtilities}
                  onChange={(value) => updateFormData('income', 'freeUtilities', value)}
                />
                <InputField 
                  label="Medical Facilities" 
                  id="medicalFacilities"
                  value={formData.income.medicalFacilities}
                  onChange={(value) => updateFormData('income', 'medicalFacilities', value)}
                />
                <InputField 
                  label="Interest-Free Loans" 
                  id="interestFreeLoans"
                  value={formData.income.interestFreeLoans}
                  onChange={(value) => updateFormData('income', 'interestFreeLoans', value)}
                />
                <InputField 
                  label="ESOPs Value" 
                  id="esops"
                  value={formData.income.esops}
                  onChange={(value) => updateFormData('income', 'esops', value)}
                />
                <InputField 
                  label="Education Expenses" 
                  id="educationExpenses"
                  value={formData.income.educationExpenses}
                  onChange={(value) => updateFormData('income', 'educationExpenses', value)}
                />
              </div>
            </TabsContent>

            {/* Profits in Lieu */}
            <TabsContent value="step-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Termination Compensation" 
                  id="terminationCompensation"
                  value={formData.income.terminationCompensation}
                  onChange={(value) => updateFormData('income', 'terminationCompensation', value)}
                />
                <InputField 
                  label="Retirement Compensation" 
                  id="retirementCompensation"
                  value={formData.income.retirementCompensation}
                  onChange={(value) => updateFormData('income', 'retirementCompensation', value)}
                />
                <InputField 
                  label="VRS Amount" 
                  id="vrsAmount"
                  value={formData.income.vrsAmount}
                  onChange={(value) => updateFormData('income', 'vrsAmount', value)}
                />
                <InputField 
                  label="Keyman Insurance" 
                  id="keymanInsurance"
                  value={formData.income.keymanInsurance}
                  onChange={(value) => updateFormData('income', 'keymanInsurance', value)}
                />
                <InputField 
                  label="Pre-Employment Payments" 
                  id="preEmploymentPayments"
                  value={formData.income.preEmploymentPayments}
                  onChange={(value) => updateFormData('income', 'preEmploymentPayments', value)}
                />
                <InputField 
                  label="Post-Resignation Payments" 
                  id="postResignationPayments"
                  value={formData.income.postResignationPayments}
                  onChange={(value) => updateFormData('income', 'postResignationPayments', value)}
                />
              </div>
            </TabsContent>

            {/* Foreign Retirement */}
            <TabsContent value="step-5">
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Notified Country Retirement" 
                  id="foreignRetirementNotified"
                  value={formData.income.foreignRetirementNotified}
                  onChange={(value) => updateFormData('income', 'foreignRetirementNotified', value)}
                />
                <InputField 
                  label="Non-Notified Country Retirement" 
                  id="foreignRetirementNonNotified"
                  value={formData.income.foreignRetirementNonNotified}
                  onChange={(value) => updateFormData('income', 'foreignRetirementNonNotified', value)}
                />
                <InputField 
                  label="Section 89A Withdrawal" 
                  id="section89AWithdrawal"
                  value={formData.income.section89AWithdrawal}
                  onChange={(value) => updateFormData('income', 'section89AWithdrawal', value)}
                />
              </div>
            </TabsContent>

            {/* Additional Details */}
            <TabsContent value="step-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Government Employee?</Label>
                  <Select
                    value={formData.income.isGovernmentEmployee ? "1" : "0"}
                    onValueChange={(v) => updateFormData('income', 'isGovernmentEmployee', v === "1")}
                  >
                    <SelectTrigger className="bg-[#252525] border-[#333333]">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <InputField 
                  label="Employee Age" 
                  id="employeeAge"
                  type="number"
                  value={formData.income.employeeAge}
                  onChange={(value) => updateFormData('income', 'employeeAge', value)}
                />
                
                <div className="space-y-2">
                  <Label>Has Gratuity?</Label>
                  <Select
                    value={formData.income.hasGratuity ? "1" : "0"}
                    onValueChange={(v) => updateFormData('income', 'hasGratuity', v === "1")}
                  >
                    <SelectTrigger className="bg-[#252525] border-[#333333]">
                      <SelectValue placeholder="Select gratuity status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <InputField 
                  label="Unused Leaves (months)" 
                  id="unusedLeaves"
                  type="number"
                  value={formData.income.unusedLeaves}
                  onChange={(value) => updateFormData('income', 'unusedLeaves', value)}
                />
                
                <div className="space-y-2">
                  <Label>Retiring?</Label>
                  <Select
                    value={formData.income.isRetiring ? "1" : "0"}
                    onValueChange={(v) => updateFormData('income', 'isRetiring', v === "1")}
                  >
                    <SelectTrigger className="bg-[#252525] border-[#333333]">
                      <SelectValue placeholder="Select retirement status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Old Tax Regime?</Label>
                  <Select
                    value={formData.income.underOldTaxRegime ? "1" : "0"}
                    onValueChange={(v) => updateFormData('income', 'underOldTaxRegime', v === "1")}
                  >
                    <SelectTrigger className="bg-[#252525] border-[#333333]">
                      <SelectValue placeholder="Select tax regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            
          </Tabs>
        </div>
        
        <DialogFooter className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                className="border-[#333333] hover:bg-[#252525] text-zinc-300"
                onClick={handlePreviousStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>
          <div>
            {currentStep < 6 ? (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                <Check className="mr-2 h-4 w-4" />
                Submit
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      {/* Deductions Modal */}
      <Dialog open={activeModal === 'deductions'} onOpenChange={handleCloseModal}>
      <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
        <DialogHeader>
          <DialogTitle>Deductions</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter details for various tax deductions
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Tabs value={`step-${currentStep}`}>
            <TabsList className="grid grid-cols-2 mb-6 bg-[#252525]">
              <TabsTrigger
                value="step-1"
                disabled={currentStep !== 1}
                className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
              >
                80C Deductions
              </TabsTrigger>
              <TabsTrigger
                value="step-2"
                disabled={currentStep !== 2}
                className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
              >
                Other Deductions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section80C">
                    Section 80C (Max ₹1,50,000) - PPF, ELSS, Life Insurance, etc.
                  </Label>
                  <Input
                    id="section80C"
                    type="number"
                    placeholder="Enter Section 80C amount (Max ₹1,50,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80C}
                    onChange={(e) => updateFormData('deductions', 'section80C', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹1,50,000</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section80CCC">
                    Section 80CCC (Max ₹1,50,000) - Annuity Plans (LIC, etc.)
                  </Label>
                  <Input
                    id="section80CCC"
                    type="number"
                    placeholder="Enter Section 80CCC amount (Max ₹1,50,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80CCC}
                    onChange={(e) => updateFormData('deductions', 'section80CCC', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹1,50,000</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section80CCD1">
                    Section 80CCD(1) (Included in 80C Limit) - NPS Contribution
                  </Label>
                  <Input
                    id="section80CCD1"
                    type="number"
                    placeholder="Enter Section 80CCD(1) amount"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80CCD1}
                    onChange={(e) => updateFormData('deductions', 'section80CCD1', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section80CCD1B">
                    Section 80CCD(1B) (Max ₹50,000) - Additional NPS Contribution
                  </Label>
                  <Input
                    id="section80CCD1B"
                    type="number"
                    placeholder="Enter Section 80CCD(1B) amount (Max ₹50,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80CCD1B}
                    onChange={(e) => updateFormData('deductions', 'section80CCD1B', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹50,000</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section80CCD2">
                    Section 80CCD(2) - Employer NPS Contribution (No Limit)
                  </Label>
                  <Input
                    id="section80CCD2"
                    type="number"
                    placeholder="Enter Section 80CCD(2) amount"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80CCD2}
                    onChange={(e) => updateFormData('deductions', 'section80CCD2', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="step-2">
              <div className="space-y-4">
                <ScrollArea className="h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="section80D">
                    Section 80D (&#8377;25K (&lt;60yrs), &#8377;50K (Senior Citizens)) - Health Insurance
                  </Label>
                  <Input
                    id="section80D"
                    type="number"
                    placeholder="Enter health insurance premium (₹25K (<60yrs), ₹50K (Senior Citizens))"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80D}
                    onChange={(e) => updateFormData('deductions', 'section80D', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80DD">
                    Section 80DD (₹75K - ₹1.25L) - Dependent Disability
                  </Label>
                  <Input
                    id="section80DD"
                    type="number"
                    placeholder="Enter Section 80DD amount (₹75K - ₹1.25L)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80DD}
                    onChange={(e) => updateFormData('deductions', 'section80DD', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80DDB">
                    Section 80DDB (₹40K - ₹1L) - Medical Treatment of Critical Illness
                  </Label>
                  <Input
                    id="section80DDB"
                    type="number"
                    placeholder="Enter Section 80DDB amount (₹40K - ₹1L)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80DDB}
                    onChange={(e) => updateFormData('deductions', 'section80DDB', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80E">
                    Section 80E (No Limit) - Education Loan Interest
                  </Label>
                  <Input
                    id="section80E"
                    type="number"
                    placeholder="Enter Section 80E amount"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80E}
                    onChange={(e) => updateFormData('deductions', 'section80E', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80EE">
                    Section 80EE (Max ₹50,000) - First Home Loan Interest
                  </Label>
                  <Input
                    id="section80EE"
                    type="number"
                    placeholder="Enter Section 80EE amount (Max ₹50,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80EE}
                    onChange={(e) => updateFormData('deductions', 'section80EE', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹50,000</p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80EEA">
                    Section 80EEA (Max ₹1.5L) - Affordable Housing Loan Interest
                  </Label>
                  <Input
                    id="section80EEA"
                    type="number"
                    placeholder="Enter Section 80EEA amount (Max ₹1.5L)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80EEA}
                    onChange={(e) => updateFormData('deductions', 'section80EEA', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹1,50,000</p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80EEB">
                    Section 80EEB (Max ₹1.5L) - Electric Vehicle Loan Interest
                  </Label>
                  <Input
                    id="section80EEB"
                    type="number"
                    placeholder="Enter Section 80EEB amount (Max ₹1.5L)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80EEB}
                    onChange={(e) => updateFormData('deductions', 'section80EEB', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹1,50,000</p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80G">
                    Section 80G - Donations (Enter Deductible Amount)
                  </Label>
                  <Input
                    id="section80G"
                    type="number"
                    placeholder="Enter Section 80G amount"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80G}
                    onChange={(e) => updateFormData('deductions', 'section80G', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80GG">
                    Section 80GG (Max ₹60,000) - Rent (If No HRA)
                  </Label>
                  <Input
                    id="section80GG"
                    type="number"
                    placeholder="Enter Section 80GG amount (Max ₹60,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80GG}
                    onChange={(e) => updateFormData('deductions', 'section80GG', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹60,000</p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80GGA">
                    Section 80GGA - Donations to Scientific Research
                  </Label>
                  <Input
                    id="section80GGA"
                    type="number"
                    placeholder="Enter Section 80GGA amount"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80GGA}
                    onChange={(e) => updateFormData('deductions', 'section80GGA', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80GGC">
                    Section 80GGC - Donations to Political Parties
                  </Label>
                  <Input
                    id="section80GGC"
                    type="number"
                    placeholder="Enter Section 80GGC amount"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80GGC}
                    onChange={(e) => updateFormData('deductions', 'section80GGC', e.target.value)}
                  />
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80TTA">
                    Section 80TTA (Max ₹10,000) - Savings Account Interest
                  </Label>
                  <Input
                    id="section80TTA"
                    type="number"
                    placeholder="Enter Section 80TTA amount (Max ₹10,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80TTA}
                    onChange={(e) => updateFormData('deductions', 'section80TTA', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹10,000</p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80TTB">
                    Section 80TTB (Max ₹50,000) - Senior Citizen Interest (Savings & FD)
                  </Label>
                  <Input
                    id="section80TTB"
                    type="number"
                    placeholder="Enter Section 80TTB amount (Max ₹50,000)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80TTB}
                    onChange={(e) => updateFormData('deductions', 'section80TTB', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹50,000</p>
                </div>
                <Separator className="my-2" />
                <div className="space-y-2">
                  <Label htmlFor="section80U">
                    Section 80U (₹75K - ₹1.25L) - Self-Disability Deduction
                  </Label>
                  <Input
                    id="section80U"
                    type="number"
                    placeholder="Enter Section 80U amount (₹75K - ₹1.25L)"
                    className="bg-[#252525] border-[#333333] text-zinc-300"
                    value={formData.deductions.section80U}
                    onChange={(e) => updateFormData('deductions', 'section80U', e.target.value)}
                  />
                  <p className="text-xs text-zinc-400 mt-1">Range: ₹75,000 - ₹1,25,000</p>
                </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <Button
                variant="outline"
                className="border-[#333333] hover:bg-[#252525] text-zinc-300"
                onClick={handlePreviousStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>
          <div>
            {currentStep < 2 ? (
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                <Check className="mr-2 h-4 w-4" />
                Submit
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      {/* Housing Modal */}
      <Dialog open={activeModal === 'housing'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Housing & Property Details</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter details for all properties (self-occupied and let-out)
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {/* Self-Occupied Property Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Self-Occupied Property</h3>
              <InputField 
                label="Interest on Housing Loan (Self-Occupied)"
                id="interestSelfOccupied"
                value={formData.housing.interestSelfOccupied}
                onChange={(value) => updateFormData('housing', 'interestSelfOccupied', value)}
              />
              <p className="text-xs text-zinc-400">
                Maximum deductible interest: ₹2,00,000 (Section 24)
              </p>
            </div>

            {/* Let-Out Property Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Let-Out Property</h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Annual Rental Income" 
                  id="rentalIncome"
                  value={formData.housing.rentalIncome}
                  onChange={(value) => updateFormData('housing', 'rentalIncome', value)}
                />
                <InputField 
                  label="Municipal Taxes Paid" 
                  id="municipalTaxes"
                  value={formData.housing.municipalTaxes}
                  onChange={(value) => updateFormData('housing', 'municipalTaxes', value)}
                />
                <InputField 
                  label="Unrealised Rent" 
                  id="unrealisedRent"
                  value={formData.housing.unrealisedRent}
                  onChange={(value) => updateFormData('housing', 'unrealisedRent', value)}
                />
                <InputField 
                  label="Interest on Housing Loan (Let-Out)"
                  id="interestLetOut"
                  value={formData.housing.interestLetOut}
                  onChange={(value) => updateFormData('housing', 'interestLetOut', value)}
                />
              </div>
              <p className="text-xs text-zinc-400">
                Note: No upper limit for interest deduction on let-out properties
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Investments Modal */}
      <Dialog open={activeModal === 'investments'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Investments</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your investment details
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs value={`step-${currentStep}`}>
              <TabsList className="grid grid-cols-2 mb-6 bg-[#252525]">
                <TabsTrigger 
                  value="step-1"
                  disabled={currentStep !== 1}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Market Investments
                </TabsTrigger>
                <TabsTrigger 
                  value="step-2"
                  disabled={currentStep !== 2}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Fixed Investments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stocks">Stocks (Total Value)</Label>
                    <Input
                      id="stocks"
                      type="number"
                      placeholder="Enter total stock value"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.investments.stocks}
                      onChange={(e) => updateFormData('investments', 'stocks', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mutualFunds">Mutual Funds (Total Value)</Label>
                    <Input
                      id="mutualFunds"
                      type="number"
                      placeholder="Enter total mutual fund value"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.investments.mutualFunds}
                      onChange={(e) => updateFormData('investments', 'mutualFunds', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fd">Fixed Deposits (Total Value)</Label>
                    <Input
                      id="fd"
                      type="number"
                      placeholder="Enter total FD value"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.investments.fd}
                      onChange={(e) => updateFormData('investments', 'fd', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ppf">PPF Investment</Label>
                    <Input
                      id="ppf"
                      type="number"
                      placeholder="Enter PPF investment amount"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.investments.ppf}
                      onChange={(e) => updateFormData('investments', 'ppf', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  className="border-[#333333] hover:bg-[#252525] text-zinc-300"
                  onClick={handlePreviousStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
            </div>
            <div>
              {currentStep < 2 ? (
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
                  <Check className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Other Sources Modal */}
      <Dialog open={activeModal === 'otherSources'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Other Income Sources</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter income from various other sources
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Interest from Savings Bank Account" 
                id="interestSavings"
                value={formData.otherSources.interestSavings}
                onChange={(value) => updateFormData('otherSources', 'interestSavings', value)}
              />
              <InputField 
                label="Interest on Securities" 
                id="interestSecurities"
                value={formData.otherSources.interestSecurities}
                onChange={(value) => updateFormData('otherSources', 'interestSecurities', value)}
              />
              <InputField 
                label="Other Interest Income" 
                id="otherInterest"
                value={formData.otherSources.otherInterest}
                onChange={(value) => updateFormData('otherSources', 'otherInterest', value)}
              />
              <InputField 
                label="Commission/Brokerage Income" 
                id="commissionIncome"
                value={formData.otherSources.commissionIncome}
                onChange={(value) => updateFormData('otherSources', 'commissionIncome', value)}
              />
              <InputField 
                label="Dividend Income (Taxable)" 
                id="dividendIncome"
                value={formData.otherSources.dividendIncome}
                onChange={(value) => updateFormData('otherSources', 'dividendIncome', value)}
              />
              <InputField 
                label="Lottery/Racing Winnings" 
                id="lotteryWinnings"
                value={formData.otherSources.lotteryWinnings}
                onChange={(value) => updateFormData('otherSources', 'lotteryWinnings', value)}
              />
              <InputField 
                label="Family Pension" 
                id="familyPension"
                value={formData.otherSources.familyPension}
                onChange={(value) => updateFormData('otherSources', 'familyPension', value)}
              />
              <InputField 
                label="Unexplained Income (115BBE)" 
                id="unexplainedIncome"
                value={formData.otherSources.unexplainedIncome}
                onChange={(value) => updateFormData('otherSources', 'unexplainedIncome', value)}
              />
              <InputField 
                label="Royalty from Patents (115BBF)" 
                id="patentRoyalty"
                value={formData.otherSources.patentRoyalty}
                onChange={(value) => updateFormData('otherSources', 'patentRoyalty', value)}
              />
              <InputField 
                label="Carbon Credit Income (115BBG)" 
                id="carbonCredit"
                value={formData.otherSources.carbonCredit}
                onChange={(value) => updateFormData('otherSources', 'carbonCredit', value)}
              />
              <InputField 
                label="Premature PF Withdrawal" 
                id="prematurePF"
                value={formData.otherSources.prematurePF}
                onChange={(value) => updateFormData('otherSources', 'prematurePF', value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tax Payment Modal */}
      <Dialog open={activeModal === 'taxSaving'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tax Payments</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your tax payments and filing details
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs defaultValue="tax-payments">
              <TabsContent value="tax-payments">
                <div className="space-y-6">
                  {/* TDS Paid */}
                  <InputField
                    label="TDS Paid (Tax Deducted at Source)"
                    id="tds-paid"
                    value={formData.taxSaving.TDSpaid}
                    onChange={(value) => updateFormData('taxSaving', 'TDSpaid', value)}
                  />

                  {/* Advance Tax Payments */}
                  <div className="space-y-4">
                    <Label className="text-zinc-300 text-base">Advance Tax Paid</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="June 15"
                        id="advance-tax-june"
                        value={formData.taxSaving.advancetaxJune}
                        onChange={(value) => updateFormData('taxSaving', 'advancetaxJune', value)}
                      />
                      <InputField
                        label="September 15"
                        id="advance-tax-sept"
                        value={formData.taxSaving.advancetaxSept}
                        onChange={(value) => updateFormData('taxSaving', 'advancetaxSept', value)}
                      />
                      <InputField
                        label="December 15"
                        id="advance-tax-dec"
                        value={formData.taxSaving.advancetaxDec}
                        onChange={(value) => updateFormData('taxSaving', 'advancetaxDec', value)}
                      />
                      <InputField
                        label="March 15"
                        id="advance-tax-mar"
                        value={formData.taxSaving.advancetaxMar}
                        onChange={(value) => updateFormData('taxSaving', 'advancetaxMar', value)}
                      />
                    </div>
                  </div>

                  {/* ITR Filing Month */}
                  <div className="space-y-2">
                    <Label htmlFor="filing-month" className="text-zinc-300">Month of ITR Filing</Label>
                    <Select
                      value={formData.taxSaving.monthOfItrFiling}
                      onValueChange={(value) => updateFormData('taxSaving', 'monthOfItrFiling', value)}
                    >
                      <SelectTrigger className="bg-[#252525] border-[#333333] text-zinc-300">
                        <SelectValue placeholder="Select filing month" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#252525] border-[#333333] text-zinc-300">
                        {Array.from({length: 12}, (_, i) => (
                          <SelectItem key={i+1} value={(i+1).toString()}>
                            {new Date(0, i).toLocaleString('default', {month: 'long'})}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={() => {
                updateFormData('taxSaving', 'completed', true);
                updateFormData('taxSaving', 'progress', 100);
                handleCloseModal();
              }}
            >
              <Check className="mr-2 h-4 w-4" />
              Save Tax Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// The missing icon components
const CustomPiggyBank = ({ className }: { className: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <path d="M16 11h0" />
    </svg>
  );
};

const CustomLibrary = ({ className }: { className: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
};

const InputField = ({ 
  label, 
  id, 
  type = "number",
  value,
  onChange,
  decimal = true // New prop for decimal support
}: { 
  label: string, 
  id: string, 
  type?: string,
  value: string | number,
  onChange: (value: string) => void,
  decimal?: boolean
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (type === "number") {
      // Allow decimal point and numbers
      const validInput = newValue.match(/^\d*\.?\d*$/);
      if (!validInput) return;

      const numericValue = parseFloat(newValue);
      
      // Handle empty input or single decimal point
      if (newValue === "" || newValue === ".") {
        newValue = "0";
      }
      // Clamp value to 0 or higher
      else if (numericValue < 0) {
        newValue = "0";
      }
      // Format to 2 decimal places if needed
      else if (decimal && newValue.includes(".")) {
        const [whole, fraction] = newValue.split(".");
        newValue = `${whole}.${fraction.slice(0, 2)}`;
      }
    }
    
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">{label}</Label>
      <Input
        id={id}
        type={type}
        className="bg-[#252525] border-[#333333] text-zinc-300"
        value={value}
        onChange={handleChange}
        min="0"
        step={decimal ? "0.01" : "1"}
        onKeyDown={(e) => {
          // Block negative symbols and multiple decimals
          if (type === "number") {
            if (e.key === '-' || e.key === '+') e.preventDefault();
            if (e.key === '.' && (e.target as HTMLInputElement).value.includes('.')) {
              e.preventDefault();
            }
          }
        }}
        onBlur={(e) => {
          // Format to 2 decimal places on blur
          if (decimal && type === "number") {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
              onChange(value.toFixed(2));
            }
          }
        }}
      />
    </div>
  );
};

export default TaxFilingDashboard;