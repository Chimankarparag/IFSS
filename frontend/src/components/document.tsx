import React, { JSX, useState } from 'react';
import { Check, AlertCircle, ArrowRight, ArrowLeft, Home, Briefcase, GraduationCap, Leaf, PiggyBank, Library } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TaxFilingDashboard = () => {
  // State for handling active modal, selected category, and completion status
  const [activeModal, setActiveModal] = useState<keyof typeof formData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    income: {
      salary: '',
      otherIncome: '',
      rentalIncome: '',
      businessIncome: '',
      completed: false,
      progress: 0
    },
    deductions: {
      section80C: '',
      section80D: '',
      housingLoan: '',
      educationLoan: '',
      completed: false,
      progress: 0
    },
    housing: {
      propertyType: '',
      rentalValue: '',
      interestPaid: '',
      municipalTaxes: '',
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
    education: {
      tuitionFees: '',
      educationLoan: '',
      completed: false,
      progress: 0
    },
    taxSaving: {
      elss: '',
      nps: '',
      sukanya: '',
      completed: false,
      progress: 0
    }
  });

  // Function to update form data
  const updateFormData = (category: keyof typeof formData, field: string, value: string | number) => {
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
      title: "Income Details",
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
      description: "Stocks, mutual funds & deposits",
      icon: <CustomLibrary className="h-8 w-8 text-yellow-500" />,
      formSteps: 2
    },
    {
      id: "education",
      title: "Education",
      description: "Education expenses & loan interest",
      icon: <GraduationCap className="h-8 w-8 text-red-500" />,
      formSteps: 1
    },
    {
      id: "taxSaving",
      title: "Tax Saving Investments",
      description: "ELSS, NPS & other tax saving options",
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
                  formData[category.id].completed ? 'bg-green-600' : 
                  formData[category.id].progress > 0 ? 'bg-amber-600' : 'bg-slate-600'
                }`}>
                  {formData[category.id].completed ? 'Completed' : 
                   formData[category.id].progress > 0 ? 'In Progress' : 'Not Started'}
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
                      className="bg-blue-600 h-2 rounded-full" 
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
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Income Details</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Fill in your income details from all sources
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs value={`step-${currentStep}`}>
              <TabsList className="grid grid-cols-3 mb-6 bg-[#252525]">
                <TabsTrigger 
                  value="step-1"
                  disabled={currentStep !== 1}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Salary Income
                </TabsTrigger>
                <TabsTrigger 
                  value="step-2"
                  disabled={currentStep !== 2}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Business Income
                </TabsTrigger>
                <TabsTrigger 
                  value="step-3"
                  disabled={currentStep !== 3}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Other Income
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Income (per annum)</Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="Enter your total salary"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.income.salary}
                      onChange={(e) => updateFormData('income', 'salary', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessIncome">Business Income (per annum)</Label>
                    <Input
                      id="businessIncome"
                      type="number"
                      placeholder="Enter your business income"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.income.businessIncome}
                      onChange={(e) => updateFormData('income', 'businessIncome', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otherIncome">Interest Income</Label>
                    <Input
                      id="otherIncome"
                      type="number"
                      placeholder="Enter interest income"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.income.otherIncome}
                      onChange={(e) => updateFormData('income', 'otherIncome', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rentalIncome">Rental Income</Label>
                    <Input
                      id="rentalIncome"
                      type="number"
                      placeholder="Enter rental income"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.income.rentalIncome}
                      onChange={(e) => updateFormData('income', 'rentalIncome', e.target.value)}
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
              {currentStep < 3 ? (
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
                    <Label htmlFor="section80C">Section 80C Investments</Label>
                    <Input
                      id="section80C"
                      type="number"
                      placeholder="Enter Section 80C amount"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.deductions.section80C}
                      onChange={(e) => updateFormData('deductions', 'section80C', e.target.value)}
                    />
                    <p className="text-xs text-zinc-400 mt-1">Maximum limit: ₹1,50,000</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="section80D">Section 80D (Health Insurance)</Label>
                    <Input
                      id="section80D"
                      type="number"
                      placeholder="Enter health insurance premium"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.deductions.section80D}
                      onChange={(e) => updateFormData('deductions', 'section80D', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="housingLoan">Housing Loan Interest</Label>
                    <Input
                      id="housingLoan"
                      type="number"
                      placeholder="Enter housing loan interest paid"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.deductions.housingLoan}
                      onChange={(e) => updateFormData('deductions', 'housingLoan', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationLoan">Education Loan Interest</Label>
                    <Input
                      id="educationLoan"
                      type="number"
                      placeholder="Enter education loan interest paid"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.deductions.educationLoan}
                      onChange={(e) => updateFormData('deductions', 'educationLoan', e.target.value)}
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
      {/* Housing Modal */}
      <Dialog open={activeModal === 'housing'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Housing & Property</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter details about your house property
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
                  Property Type
                </TabsTrigger>
                <TabsTrigger 
                  value="step-2"
                  disabled={currentStep !== 2}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Property Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <RadioGroup 
                      defaultValue={formData.housing.propertyType || "self_occupied"}
                      onValueChange={(value) => updateFormData('housing', 'propertyType', value)}
                    >
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#252525]">
                        <RadioGroupItem value="self_occupied" id="self_occupied" className="border-[#333333]" />
                        <Label htmlFor="self_occupied" className="cursor-pointer">Self Occupied</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#252525]">
                        <RadioGroupItem value="let_out" id="let_out" className="border-[#333333]" />
                        <Label htmlFor="let_out" className="cursor-pointer">Let Out</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#252525]">
                        <RadioGroupItem value="deemed_let_out" id="deemed_let_out" className="border-[#333333]" />
                        <Label htmlFor="deemed_let_out" className="cursor-pointer">Deemed Let Out</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2">
                <div className="space-y-4">
                  {formData.housing.propertyType === 'self_occupied' ? (
                    <div className="space-y-2">
                      <Label htmlFor="interestPaid">Interest Paid on Housing Loan</Label>
                      <Input
                        id="interestPaid"
                        type="number"
                        placeholder="Enter interest amount"
                        className="bg-[#252525] border-[#333333] text-zinc-300"
                        value={formData.housing.interestPaid}
                        onChange={(e) => updateFormData('housing', 'interestPaid', e.target.value)}
                      />
                      <p className="text-xs text-zinc-400 mt-1">Maximum deduction: ₹2,00,000</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="rentalValue">Annual Rental Value</Label>
                        <Input
                          id="rentalValue"
                          type="number"
                          placeholder="Enter annual rent received"
                          className="bg-[#252525] border-[#333333] text-zinc-300"
                          value={formData.housing.rentalValue}
                          onChange={(e) => updateFormData('housing', 'rentalValue', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="municipalTaxes">Municipal Taxes Paid</Label>
                        <Input
                          id="municipalTaxes"
                          type="number"
                          placeholder="Enter municipal taxes"
                          className="bg-[#252525] border-[#333333] text-zinc-300"
                          value={formData.housing.municipalTaxes}
                          onChange={(e) => updateFormData('housing', 'municipalTaxes', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interestPaid">Interest Paid on Housing Loan</Label>
                        <Input
                          id="interestPaid"
                          type="number"
                          placeholder="Enter interest amount"
                          className="bg-[#252525] border-[#333333] text-zinc-300"
                          value={formData.housing.interestPaid}
                          onChange={(e) => updateFormData('housing', 'interestPaid', e.target.value)}
                        />
                      </div>
                    </>
                  )}
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
      {/* Education Modal */}
      <Dialog open={activeModal === 'education'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Education</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter education-related expenses
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs value="step-1">
              <TabsList className="grid grid-cols-1 mb-6 bg-[#252525]">
                <TabsTrigger 
                  value="step-1"
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Education Expenses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tuitionFees">Tuition Fees (for children)</Label>
                    <Input
                      id="tuitionFees"
                      type="number"
                      placeholder="Enter tuition fees paid"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.education.tuitionFees}
                      onChange={(e) => updateFormData('education', 'tuitionFees', e.target.value)}
                    />
                    <p className="text-xs text-zinc-400 mt-1">Eligible under Section 80C</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationLoan">Education Loan Interest</Label>
                    <Input
                      id="educationLoan"
                      type="number"
                      placeholder="Enter education loan interest"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.education.educationLoan}
                      onChange={(e) => updateFormData('education', 'educationLoan', e.target.value)}
                    />
                    <p className="text-xs text-zinc-400 mt-1">Deduction under Section 80E</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tax Saving Modal */}
      <Dialog open={activeModal === 'taxSaving'} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-[#1e1e1e] border-[#333333] text-zinc-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tax Saving Investments</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your tax-saving investments
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
                  ELSS & NPS
                </TabsTrigger>
                <TabsTrigger 
                  value="step-2"
                  disabled={currentStep !== 2}
                  className="data-[state=active]:bg-[#333333] data-[state=active]:text-white"
                >
                  Other Tax Savings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="elss">ELSS Mutual Funds</Label>
                    <Input
                      id="elss"
                      type="number"
                      placeholder="Enter ELSS investment amount"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.taxSaving.elss}
                      onChange={(e) => updateFormData('taxSaving', 'elss', e.target.value)}
                    />
                    <p className="text-xs text-zinc-400 mt-1">Eligible under Section 80C</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nps">National Pension Scheme (NPS)</Label>
                    <Input
                      id="nps"
                      type="number"
                      placeholder="Enter NPS contribution"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.taxSaving.nps}
                      onChange={(e) => updateFormData('taxSaving', 'nps', e.target.value)}
                    />
                    <p className="text-xs text-zinc-400 mt-1">Additional deduction under Section 80CCD(1B)</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sukanya">Sukanya Samriddhi Yojana</Label>
                    <Input
                      id="sukanya"
                      type="number"
                      placeholder="Enter SSY contribution"
                      className="bg-[#252525] border-[#333333] text-zinc-300"
                      value={formData.taxSaving.sukanya}
                      onChange={(e) => updateFormData('taxSaving', 'sukanya', e.target.value)}
                    />
                    <p className="text-xs text-zinc-400 mt-1">Eligible under Section 80C</p>
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

export default TaxFilingDashboard;