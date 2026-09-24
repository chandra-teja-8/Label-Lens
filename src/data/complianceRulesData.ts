export interface RegulatoryRule {
  id: string;
  ruleCode: string;
  category: 'Mandatory Declarations' | 'MRP & Pricing' | 'Net Quantity' | 'Manufacturer / Packer' | 'Consumer Care' | 'Date Declarations' | 'Font & Dimensions' | 'Food Classification';
  title: string;
  clauseSummary: string;
  statutoryReference: string;
  applicability: string;
  penaltyClause?: string;
}

export const LEGAL_METROLOGY_RULES: RegulatoryRule[] = [
  {
    id: 'lmr-1',
    ruleCode: 'Rule 6(1)(a)',
    category: 'Manufacturer / Packer',
    title: 'Name and Complete Address of Manufacturer / Packer / Importer',
    clauseSummary: 'Every package shall bear the name and complete address of the manufacturer, or where the manufacturer is not the packer, the name and address of the manufacturer and packer, or on imported packages, the name and address of the importer with country of origin.',
    statutoryReference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Chapter II, Rule 6(1)(a)',
    applicability: 'All pre-packaged commodities sold, distributed, or delivered in India.',
    penaltyClause: 'Section 36(1) of Legal Metrology Act, 2009 — Fine up to ₹25,000 for first offence, ₹50,000 for second.'
  },
  {
    id: 'lmr-2',
    ruleCode: 'Rule 6(1)(b)',
    category: 'Net Quantity',
    title: 'Nominal Net Quantity of the Commodity Contained in the Package',
    clauseSummary: 'The net quantity in terms of standard unit of weight or measure (g, kg, ml, l, or number) shall be declared on the principal display panel. Non-standard units or qualifying terms like "approximate" or "when packed" are strictly prohibited.',
    statutoryReference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Chapter II, Rule 6(1)(b) & Second Schedule',
    applicability: 'All solid, semi-solid, and liquid packaged commodities.',
    penaltyClause: 'Section 36(1) of Legal Metrology Act, 2009.'
  },
  {
    id: 'lmr-3',
    ruleCode: 'Rule 6(1)(d)',
    category: 'Date Declarations',
    title: 'Month and Year of Manufacture / Pre-packing',
    clauseSummary: 'Every package shall bear the month and year in which the commodity is manufactured or pre-packed or imported, using standard month abbreviations or numerical formats (MM/YYYY or MMM YYYY).',
    statutoryReference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Chapter II, Rule 6(1)(d)',
    applicability: 'All packaged commodities subject to shelf-life limitations or statutory tracking.',
    penaltyClause: 'Section 36(1) of Legal Metrology Act, 2009.'
  },
  {
    id: 'lmr-4',
    ruleCode: 'Rule 6(1)(da)',
    category: 'MRP & Pricing',
    title: 'Maximum Retail Price (MRP) Inclusive of All Taxes & Unit Sale Price',
    clauseSummary: 'The retail sale price of the package shall clearly state "Maximum or Max. Retail Price Rs. ...... / ₹ ...... inclusive of all taxes" or "MRP Rs. / ₹ ...... incl. of all taxes". Where net quantity is greater than 1kg/1L, or <= 1kg/1L, unit sale price in rupees per gram/kg/ml/liter must also be explicitly stated.',
    statutoryReference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Rule 6(1)(da) & Rule 6(11)',
    applicability: 'All consumer retail packaged goods across general retail and modern trade.',
    penaltyClause: 'Section 36(2) of Legal Metrology Act, 2009.'
  },
  {
    id: 'lmr-5',
    ruleCode: 'Rule 6(1)(e)',
    category: 'Consumer Care',
    title: 'Consumer Redressal Information',
    clauseSummary: 'Every package shall bear the name, address, telephone number, and e-mail address of the person who can be or the office which can be contacted, in case of consumer complaints or queries.',
    statutoryReference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Rule 6(1)(e)',
    applicability: 'Mandatory on all consumer packs without exception.',
    penaltyClause: 'Section 36(1) of Legal Metrology Act, 2009.'
  },
  {
    id: 'lmr-6',
    ruleCode: 'Rule 9 & Table I',
    category: 'Font & Dimensions',
    title: 'Minimum Height of Numerals and Letters in Declarations',
    clauseSummary: 'The height of letters and numerals shall be proportional to the area of the principal display panel (PDP). For PDP area <= 50 cm², min height 1.0mm (blown/moulded 2.0mm); PDP 50-100 cm², min height 1.5mm; PDP 100-500 cm², min height 2.5mm for weight 50-200g, 4.0mm for weight 200g-1kg.',
    statutoryReference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Rule 9(1) and First Schedule Table I',
    applicability: 'All font declarations printed on package faces.',
    penaltyClause: 'Provisions for non-standard declaration layout.'
  },
  {
    id: 'lmr-7',
    ruleCode: 'FSSAI Reg. 2.2.2',
    category: 'Food Classification',
    title: 'Standardized Vegetarian and Non-Vegetarian Logo Specification',
    clauseSummary: 'Every package of "Vegetarian" food shall bear a symbol consisting of a green colour filled circle inside a green border square outline. Every package of "Non-Vegetarian" food shall bear a symbol consisting of a brown/red colour filled triangle inside a brown border square outline.',
    statutoryReference: 'Food Safety and Standards (Packaging and Labelling) Regulations & LM Rule 6 cross-compliance',
    applicability: 'All processed and packaged food commodities marketed in India.',
    penaltyClause: 'FSSAI Act 2006, Section 52 (Penalty for misbranded food).'
  }
];

export const FONT_REQUIREMENTS_TABLE = [
  { areaPdp: 'A <= 50 cm²', netQtyRange: 'Up to 50 g / ml', normalMinHeightMm: 1.0, blownMouldedMinMm: 2.0 },
  { areaPdp: '50 cm² < A <= 100 cm²', netQtyRange: '50 g to 100 g / ml', normalMinHeightMm: 1.5, blownMouldedMinMm: 3.0 },
  { areaPdp: '100 cm² < A <= 500 cm²', netQtyRange: '100 g to 500 g / ml', normalMinHeightMm: 2.5, blownMouldedMinMm: 4.0 },
  { areaPdp: '500 cm² < A <= 2500 cm²', netQtyRange: '500 g to 1 kg / l', normalMinHeightMm: 4.0, blownMouldedMinMm: 6.0 },
  { areaPdp: 'A > 2500 cm²', netQtyRange: 'Above 1 kg / l', normalMinHeightMm: 6.0, blownMouldedMinMm: 6.0 }
];
