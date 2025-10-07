# Calculator Implementation Guide

This guide explains how the tax deduction calculators work and how to update them when tax rates or regulations change.

## Overview

The website includes three interactive calculators:

1. **R&D Super Deduction Calculator** (`/vyskum-a-vyvoj`)
2. **Industry 4.0 Investment Calculator** (`/investicie`)
3. **Patent Box Calculator** (`/patent-box`)

**Current Status**: Calculators are placeholders showing "Kalkulačka bude implementovaná v ďalšej fáze" (Calculator will be implemented in the next phase).

## Where Calculators Will Be Located

Each calculator section is already defined in the page files:

- `src/pages/vyskum-a-vyvoj.astro` - Lines 90-104
- `src/pages/investicie.astro` - Lines 90-101
- `src/pages/patent-box.astro` - Lines 93-104

## Planned Calculator Structure

### R&D Super Deduction Calculator

**Purpose**: Calculate tax savings from R&D super deduction

**Inputs**:
- Annual R&D expenses (€)
- Company type (small/medium/large)
- Tax year (2024/2025)

**Calculation**:
- Deduction rate: 200% for small companies, 150% for medium, 125% for large
- Corporate tax rate: 21% (2024), potentially adjusted for 2025
- Tax savings = R&D expenses × (deduction rate - 100%) × tax rate

**Example**:
```
R&D expenses: €50,000
Company: Small (200% deduction)
Extra deduction: €50,000 (100% additional)
Tax savings: €50,000 × 0.21 = €10,500
```

### Industry 4.0 Investment Calculator

**Purpose**: Calculate tax savings from Industry 4.0 investment super deduction

**Inputs**:
- Investment amount (€)
- Investment type (eligible technologies)
- Tax year (2024/2025)

**Calculation**:
- Deduction rate: 150% (as per § 30e)
- Corporate tax rate: 21%
- Minimum investment: Must verify threshold
- Tax savings = Investment × 50% × tax rate

**Example**:
```
Investment: €100,000
Extra deduction: €50,000 (50% additional)
Tax savings: €50,000 × 0.21 = €10,500
```

### Patent Box Calculator

**Purpose**: Calculate tax savings from Patent Box income reduction

**Inputs**:
- Annual IP income (€)
- Qualifying IP type (patent, utility model, etc.)
- Nexus ratio (R&D expenses ratio)

**Calculation**:
- Tax reduction: Effective rate of 5.25% instead of 21%
- Savings rate: 75% reduction on qualifying income
- Tax savings = IP income × nexus ratio × (21% - 5.25%)

**Example**:
```
IP income: €200,000
Nexus ratio: 100% (fully qualifying)
Regular tax: €200,000 × 0.21 = €42,000
Patent Box tax: €200,000 × 0.0525 = €10,500
Tax savings: €31,500
```

## Implementation Plan

### Step 1: Create Calculator Components

Create interactive calculator components using Astro islands (or vanilla JavaScript):

```
src/components/calculators/
├── VavCalculator.astro
├── InvesticieCalculator.astro
└── PatentBoxCalculator.astro
```

### Step 2: Replace Placeholder Content

In each page file, replace:

```astro
<div class="bg-white rounded-lg shadow-md p-8">
  <p class="text-center text-gray-600">
    Kalkulačka bude implementovaná v ďalšej fáze.
  </p>
</div>
```

With:

```astro
<div class="bg-white rounded-lg shadow-md p-8">
  <VavCalculator />
</div>
```

### Step 3: Add Tax Rate Configuration

Create a configuration file for tax rates and deduction percentages:

```typescript
// src/config/tax-rates.ts
export const TAX_RATES = {
  2024: {
    corporate: 0.21,
    patentBox: 0.0525,
  },
  2025: {
    corporate: 0.21, // Update when 2025 rates announced
    patentBox: 0.0525,
  },
};

export const DEDUCTION_RATES = {
  vav: {
    small: 2.0,    // 200%
    medium: 1.5,   // 150%
    large: 1.25,   // 125%
  },
  investicie: 1.5, // 150%
};
```

## Updating Tax Rates

When tax rates change (typically announced in December for the following year):

1. **Open** `src/config/tax-rates.ts`
2. **Update** the rates for the new year
3. **Test** all three calculators with example values
4. **Commit** the changes with a clear message:
   ```bash
   git add src/config/tax-rates.ts
   git commit -m "Update tax rates for 2026"
   git push
   ```

## Calculator Features

### Basic Features
- Real-time calculation as user types
- Input validation (positive numbers only)
- Clear formatting of currency values
- Responsive design for mobile/tablet

### Advanced Features (Future)
- Multi-year comparison
- Export results to PDF
- Save calculations for later
- Email results to consultant

## Testing Calculators

Before deploying calculator updates:

1. **Test with known values**:
   - Use examples from Slovak tax authority documentation
   - Verify calculations match official examples

2. **Test edge cases**:
   - Zero values
   - Very large numbers
   - Maximum deduction limits

3. **Test on multiple devices**:
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Android Chrome)
   - Tablet

## Calculator Validation Rules

### R&D Calculator
- Expenses must be > 0
- Company type is required
- Year must be current or future

### Investment Calculator
- Investment amount must meet minimum threshold
- Must select eligible technology category
- Cannot exceed annual maximum (if applicable)

### Patent Box Calculator
- IP income must be > 0
- Nexus ratio must be between 0-100%
- Must have qualifying IP type selected

## Troubleshooting

### Calculator not updating
**Issue**: Results don't change when inputs change
**Fix**: Check browser console for JavaScript errors

### Wrong calculation results
**Issue**: Results don't match manual calculations
**Fix**:
1. Verify tax rates in `tax-rates.ts`
2. Check calculation formula in calculator component
3. Ensure input values are being parsed correctly (string to number)

### Mobile layout issues
**Issue**: Calculator looks broken on mobile
**Fix**: Test responsive classes in Tailwind, ensure proper container sizing

## Resources

- **Slovak Tax Authority**: https://www.financnasprava.sk/
- **VaV Superodpočet Law**: § 30c of Income Tax Act
- **Industry 4.0 Law**: § 30e of Income Tax Act
- **Patent Box Law**: § 12a of Income Tax Act

## Getting Help

If you need to modify calculator logic:
1. Review the calculation examples in this guide
2. Consult with tax consultant for regulatory changes
3. Test thoroughly before deploying
4. Ask senior developer for code review

**Note**: Calculator logic should always be reviewed by a tax professional to ensure accuracy and compliance with current Slovak tax law.
