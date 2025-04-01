import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, InfoIcon, TrendingUpIcon, ReceiptIcon, ChevronRightIcon } from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const ITRSummaryCard = ({ summaryData }) => {
  if (!summaryData) return null;
  
  // Check if there was an error in generating summary
  if (summaryData.error) {
    return (
      <Card className="w-full max-w-3xl bg-gray-950 border-red-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-400">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-300">{summaryData.error}</p>
        </CardContent>
      </Card>
    );
  }

  const refundAmount = summaryData.refundAmount || (summaryData.taxPaid - summaryData.taxLiability);
  const isRefund = refundAmount > 0;
  
  return (
    <Card className="w-full bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 shadow-xl rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-green-900/20 opacity-30"></div>
      
      <CardHeader className="relative pb-2 border-b border-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Income Tax Return Summary
            </CardTitle>
            <CardDescription className="text-gray-400">
              Financial Year {new Date().getFullYear() - 1}-{new Date().getFullYear()}
            </CardDescription>
          </div>
          {isRefund ? (
            <Badge className="self-start sm:self-center bg-green-900/60 text-green-300 border border-green-500/30 px-3 py-1">
              REFUND DUE
            </Badge>
          ) : (
            <Badge className="self-start sm:self-center bg-red-900/60 text-red-300 border border-red-500/30 px-3 py-1">
              TAX DUE
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-6 pt-4">
        {/* Main Figures Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-400">Total Income</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(summaryData.totalIncome)}</p>
          </div>
          
          <div className="space-y-1 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-400">Taxable Income</p>
            <p className="text-lg font-semibold text-yellow-400">{formatCurrency(summaryData.taxableIncome)}</p>
          </div>
          
          <div className="space-y-1 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-400">Tax Liability</p>
            <p className="text-lg font-semibold text-red-400">{formatCurrency(summaryData.taxLiability)}</p>
          </div>
          
          <div className="space-y-1 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-400">Tax Paid</p>
            <p className="text-lg font-semibold text-blue-400">{formatCurrency(summaryData.taxPaid)}</p>
          </div>
        </div>
        
        {/* Refund/Due Section */}
        <div className={`p-4 rounded-lg border ${isRefund ? 'bg-green-900/20 border-green-800/50' : 'bg-red-900/20 border-red-800/50'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">{isRefund ? "Refund Amount" : "Tax Amount Due"}</p>
              <p className="text-2xl font-bold mt-1" 
                style={{ color: isRefund ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)' }}>
                {formatCurrency(Math.abs(refundAmount))}
              </p>
            </div>
            <div className={`p-3 rounded-full ${isRefund ? 'bg-green-800/50' : 'bg-red-800/50'}`}>
              {isRefund ? 
                <ArrowDownIcon size={24} className="text-green-300" /> : 
                <ArrowUpIcon size={24} className="text-red-300" />
              }
            </div>
          </div>
        </div>
        
        {/* Deductions Summary Section */}
        <div className="space-y-3">
          <h3 className="text-sm text-gray-300 flex items-center gap-2">
            <ReceiptIcon size={16} className="text-blue-400" />
            DEDUCTIONS CLAIMED
          </h3>
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-300">Total Deductions</p>
              <p className="text-lg font-semibold text-green-400">{formatCurrency(summaryData.totalDeductions)}</p>
            </div>
            <p className="text-sm text-gray-400">
              {summaryData.deductionsSummary}
            </p>
          </div>
        </div>
        
        {/* Tax Saving Opportunities */}
        {summaryData.taxSavingOpportunities && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-300 flex items-center gap-2">
              <TrendingUpIcon size={16} className="text-purple-400" />
              TAX SAVING OPPORTUNITIES
            </h3>
            <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/40">
              <p className="text-sm text-gray-300">
                {summaryData.taxSavingOpportunities}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 border-t border-gray-800 mt-2">
        <div className="flex items-center text-xs text-gray-500 gap-1">
          <InfoIcon size={12} />
          <span>This is a computer-generated summary. For official purposes, please refer to your filed ITR documents.</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ITRSummaryCard;