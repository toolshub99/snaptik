import { TaxBracket, TaxCalculationResult, TaxInputs, FilingStatus } from '../types';

// 2024 Federal Tax Brackets
const FEDERAL_TAX_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191625, rate: 0.24 },
    { min: 191625, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: null, rate: 0.37 },
  ],
  marriedFilingJointly: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383250, rate: 0.24 },
    { min: 383250, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: null, rate: 0.37 },
  ],
  marriedFilingSeparately: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191625, rate: 0.24 },
    { min: 191625, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: null, rate: 0.37 },
  ],
  headOfHousehold: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191650, rate: 0.24 },
    { min: 191650, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: null, rate: 0.37 },
  ],
};

// 2024 Standard Deductions
const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 14600,
  marriedFilingJointly: 29200,
  marriedFilingSeparately: 14600,
  headOfHousehold: 21900,
};

// Social Security and Medicare rates for 2024
const SOCIAL_SECURITY_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const SOCIAL_SECURITY_WAGE_BASE = 160200;
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MARRIED = 250000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

function calculateTaxFromBrackets(income: number, brackets: TaxBracket[]): number {
  let tax = 0;
  
  for (const bracket of brackets) {
    if (income > bracket.min) {
      const taxableInRange = Math.min(
        income - bracket.min,
        (bracket.max || income) - bracket.min
      );
      tax += taxableInRange * bracket.rate;
    }
  }
  
  return tax;
}

function calculatePayrollTaxes(income: number, filingStatus: FilingStatus): {
  socialSecurity: number;
  medicare: number;
} {
  // Social Security tax (6.2% up to wage base)
  const socialSecurityWages = Math.min(income, SOCIAL_SECURITY_WAGE_BASE);
  const socialSecurity = socialSecurityWages * SOCIAL_SECURITY_RATE;
  
  // Medicare tax (1.45% on all income + 0.9% additional on high earners)
  let medicare = income * MEDICARE_RATE;
  
  const additionalMedicareThreshold = 
    filingStatus === 'marriedFilingJointly' 
      ? ADDITIONAL_MEDICARE_THRESHOLD_MARRIED 
      : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
      
  if (income > additionalMedicareThreshold) {
    medicare += (income - additionalMedicareThreshold) * ADDITIONAL_MEDICARE_RATE;
  }
  
  return { socialSecurity, medicare };
}

export function calculateTax(inputs: TaxInputs): TaxCalculationResult {
  const { annualIncome, filingStatus, dependents, age, blindness } = inputs;
  
  // Calculate standard deduction with additional amounts for age/blindness
  let standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
  
  // Additional standard deduction for age 65+ and blindness
  const additionalDeductionAmount = filingStatus === 'marriedFilingJointly' ? 1550 : 1950;
  if (age >= 65) standardDeduction += additionalDeductionAmount;
  if (blindness) standardDeduction += additionalDeductionAmount;
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, annualIncome - standardDeduction);
  
  // Calculate federal income tax
  const federalTax = calculateTaxFromBrackets(taxableIncome, FEDERAL_TAX_BRACKETS[filingStatus]);
  
  // Calculate payroll taxes
  const { socialSecurity: socialSecurityTax, medicare: medicareTax } = calculatePayrollTaxes(annualIncome, filingStatus);
  
  // State tax (simplified - using average state tax rate of 5% for states with income tax)
  // In a real app, this would use specific state tax brackets
  const stateTax = taxableIncome * 0.05; // Simplified state tax calculation
  
  const totalTax = federalTax + stateTax + socialSecurityTax + medicareTax;
  const netIncome = annualIncome - totalTax;
  const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;
  
  // Calculate marginal rate (rate on next dollar earned)
  const brackets = FEDERAL_TAX_BRACKETS[filingStatus];
  let marginalRate = 0;
  for (const bracket of brackets) {
    if (taxableIncome >= bracket.min && (bracket.max === null || taxableIncome < bracket.max)) {
      marginalRate = bracket.rate * 100;
      break;
    }
  }
  
  return {
    grossIncome: annualIncome,
    federalTax,
    stateTax,
    socialSecurityTax,
    medicareTax,
    totalTax,
    netIncome,
    effectiveRate,
    marginalRate,
  };
}