export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxCalculationResult {
  grossIncome: number;
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  marginalRate: number;
}

export interface TaxInputs {
  annualIncome: number;
  filingStatus: FilingStatus;
  state: string;
  dependents: number;
  age: number;
  blindness: boolean;
}

export type FilingStatus = 'single' | 'marriedFilingJointly' | 'marriedFilingSeparately' | 'headOfHousehold';

export interface StateInfo {
  name: string;
  code: string;
  hasTax: boolean;
  brackets?: TaxBracket[];
  standardDeduction?: number;
}