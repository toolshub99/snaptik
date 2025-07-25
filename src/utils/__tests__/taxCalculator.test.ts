import { calculateTax } from '../taxCalculator';
import { TaxInputs } from '../../types';

describe('Tax Calculator', () => {
  const defaultInputs: TaxInputs = {
    annualIncome: 50000,
    filingStatus: 'single',
    state: 'CA',
    dependents: 0,
    age: 30,
    blindness: false,
  };

  it('should calculate taxes correctly for single filer with $50,000 income', () => {
    const result = calculateTax(defaultInputs);
    
    expect(result.grossIncome).toBe(50000);
    expect(result.federalTax).toBeGreaterThan(0);
    expect(result.socialSecurityTax).toBeCloseTo(3100, -1); // 6.2% of 50000
    expect(result.medicareTax).toBeCloseTo(725, -1); // 1.45% of 50000
    expect(result.netIncome).toBeLessThan(result.grossIncome);
    expect(result.effectiveRate).toBeGreaterThan(0);
    expect(result.effectiveRate).toBeLessThan(100);
  });

  it('should calculate higher taxes for higher income', () => {
    const lowIncomeResult = calculateTax({ ...defaultInputs, annualIncome: 30000 });
    const highIncomeResult = calculateTax({ ...defaultInputs, annualIncome: 100000 });
    
    expect(highIncomeResult.totalTax).toBeGreaterThan(lowIncomeResult.totalTax);
    expect(highIncomeResult.effectiveRate).toBeGreaterThan(lowIncomeResult.effectiveRate);
  });

  it('should apply additional deductions for age 65+', () => {
    const youngerResult = calculateTax({ ...defaultInputs, age: 30 });
    const olderResult = calculateTax({ ...defaultInputs, age: 70 });
    
    // Older person should have lower federal tax due to higher standard deduction
    expect(olderResult.federalTax).toBeLessThan(youngerResult.federalTax);
  });

  it('should apply additional deductions for blindness', () => {
    const sightedResult = calculateTax({ ...defaultInputs, blindness: false });
    const blindResult = calculateTax({ ...defaultInputs, blindness: true });
    
    // Blind person should have lower federal tax due to higher standard deduction
    expect(blindResult.federalTax).toBeLessThan(sightedResult.federalTax);
  });

  it('should handle married filing jointly with higher standard deduction', () => {
    const singleResult = calculateTax({ ...defaultInputs, filingStatus: 'single' });
    const marriedResult = calculateTax({ ...defaultInputs, filingStatus: 'marriedFilingJointly' });
    
    // Married filing jointly should have lower federal tax due to higher standard deduction
    expect(marriedResult.federalTax).toBeLessThan(singleResult.federalTax);
  });

  it('should cap Social Security tax at wage base', () => {
    const highIncomeResult = calculateTax({ ...defaultInputs, annualIncome: 200000 });
    
    // Social Security tax should be capped at 6.2% of $160,200 = $9,932.40
    expect(highIncomeResult.socialSecurityTax).toBeCloseTo(9932.40, 0);
  });

  it('should apply additional Medicare tax for high earners', () => {
    const lowIncomeResult = calculateTax({ ...defaultInputs, annualIncome: 150000 });
    const highIncomeResult = calculateTax({ ...defaultInputs, annualIncome: 250000 });
    
    // High earner should pay additional 0.9% Medicare tax on income over $200,000
    const expectedAdditionalMedicare = (250000 - 200000) * 0.009;
    const actualAdditionalMedicare = highIncomeResult.medicareTax - (250000 * 0.0145);
    
    expect(actualAdditionalMedicare).toBeCloseTo(expectedAdditionalMedicare, 0);
  });

  it('should handle zero income', () => {
    const result = calculateTax({ ...defaultInputs, annualIncome: 0 });
    
    expect(result.grossIncome).toBe(0);
    expect(result.federalTax).toBe(0);
    expect(result.stateTax).toBe(0);
    expect(result.socialSecurityTax).toBe(0);
    expect(result.medicareTax).toBe(0);
    expect(result.totalTax).toBe(0);
    expect(result.netIncome).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });
});