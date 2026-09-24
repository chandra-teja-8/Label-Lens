export type FoodType = 'Vegetarian' | 'Non-Vegetarian' | 'Not Detected';

export type ComplianceStatus = 'PASS' | 'WARNING' | 'REVIEW_REQUIRED' | 'POTENTIAL_VIOLATION' | 'NOT_DETECTED';

export type ConfidenceTier = 'High' | 'Medium' | 'Low';

export interface ConfidenceRating {
  tier: ConfidenceTier;
  percentageText: string; // e.g. "High (Illustrative / Sample)"
  source: string; // e.g. "Front label", "Back panel OCR"
}

export interface ExtractedField {
  label: string;
  rawValue: string;
  structuredValue: string;
  sourceSurface: 'Front' | 'Back' | 'Side' | 'Top/Bottom';
  confidence: ConfidenceRating;
  status: 'Detected' | 'Not Detected' | 'Needs Review';
}

export interface FontAnalysisItem {
  id: string;
  field: string;
  detectedText: string;
  estimatedHeightMm: number;
  minRequiredMm: number;
  areaPdpCm2: number;
  applicableRule: string;
  status: 'PASS' | 'WARNING' | 'NEEDS_CALIBRATION';
  measurementStatus: 'Estimated from image geometry' | 'Calibrated measurement';
  boundingBox: { x: number; y: number; width: number; height: number };
  note: string;
}

export interface ComplianceCheckItem {
  id: string;
  category: 'Mandatory Declarations' | 'MRP & Pricing' | 'Net Quantity' | 'Manufacturer / Packer' | 'Consumer Care' | 'Date Declarations' | 'Food Classification' | 'Font & Dimensions';
  title: string;
  ruleReference: string; // e.g., "Rule 6(1)(e) - Legal Metrology (Packaged Commodities) Rules, 2011"
  status: ComplianceStatus;
  detectedValue: string;
  evidenceSnippet: string;
  source: string;
  confidence: ConfidenceRating;
  explanation: string;
  recommendation?: string;
}

export interface NutritionItem {
  name: string;
  unit: string;
  per100g: number;
  perServe: number;
  rdaPercent?: number;
  thresholdCategory?: 'sugar' | 'sodium' | 'fat' | 'calories' | 'neutral';
  thresholdStatus?: 'green' | 'amber' | 'red';
  thresholdExplanation?: string;
}

export interface AdditivePreservativeItem {
  name: string;
  insCode?: string;
  category: 'Preservative' | 'Acidity Regulator' | 'Flavor Enhancer' | 'Coloring' | 'Anticaking' | 'Emulsifier';
  detectedOnLabel: string;
  technicalFunction: string;
  regulatoryStatus: string;
  notes: string;
}

export interface AllergenItem {
  allergen: string;
  detectedSource: string;
  riskLevel: 'Present in Ingredients' | 'May Contain' | 'None Detected';
  note: string;
}

export interface ConsumerGuidance {
  targetGroup: 'General' | 'Children' | 'Pregnancy';
  status: 'Standard' | 'Moderate Concern' | 'Informational Notice';
  summary: string;
  details: string[];
}

export interface PriceQuantityComparison {
  hasReference: boolean;
  currentQuantity: string;
  referenceQuantity?: string;
  currentMrp: string;
  referenceMrp?: string;
  unitPriceCurrent: string;
  unitPriceReference?: string;
  status: 'NORMAL' | 'POTENTIAL_VARIATION' | 'UNAVAILABLE';
  note: string;
}

export interface ProductPackageSurfaces {
  front: string;
  back: string;
  side?: string;
  topBottom?: string;
  innovationIngredients?: string;
  innovationNutrition?: string;
}

export interface SampleProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  foodType: FoodType;
  foodTypeConfidence: ConfidenceRating;
  surfaces: ProductPackageSurfaces;
  extractedFields: Record<string, ExtractedField>;
  fontAnalysis: FontAnalysisItem[];
  complianceChecks: ComplianceCheckItem[];
  overallCompliance: {
    status: ComplianceStatus;
    summary: string;
    passedCount: number;
    warningCount: number;
    violationCount: number;
    notDetectedCount: number;
  };
  nutrition: {
    servingSizeG: number;
    defaultServingLabel: string;
    items: NutritionItem[];
  };
  ingredientsList: string;
  additivesAndPreservatives: AdditivePreservativeItem[];
  allergens: AllergenItem[];
  consumerGuidance: ConsumerGuidance[];
  priceQuantity: PriceQuantityComparison;
}

export type NotificationType =
  | 'inspection_completed'
  | 'review_required'
  | 'potential_violation'
  | 'analysis_completed'
  | 'error';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  inspectionId?: string;
  productId?: string;
  createdAt: string;
  read: boolean;
}

export interface InspectionRecord {
  id: string;
  productId: string;
  productName: string;
  brand?: string;
  category?: string;
  foodType?: FoodType;
  foodTypeConfidence?: ConfidenceRating;

  inspectionDate: string; // e.g. "24 Sep 2026"
  inspectionTime: string; // e.g. "4:18 PM"
  createdAt: string; // machine-readable ISO 8601

  complianceStatus: ComplianceStatus;
  reviewItems: number;
  reviewItemsCount?: number; // alias for backwards compatibility
  findings?: number;

  packageImages?: {
    front?: string;
    back?: string;
    side?: string;
    topBottom?: string;
  };

  reportId?: string;
  reportRefId?: string; // alias
  summary?: string;
  inspectorRole?: string;
  isSample?: boolean;
  snapshot?: SampleProduct;
}
