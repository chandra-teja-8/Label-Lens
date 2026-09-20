# Implementation Plan: LabelLens AI-Powered Product Label Inspection Platform

Build a completely new, production-grade frontend application from scratch called **LabelLens** ("AI-Powered Product Label Inspection"). LabelLens automates packaged commodity inspection against the **Legal Metrology (Packaged Commodities) Rules, 2011** using Computer Vision, OCR, NLP information extraction, font/dimension estimation, compliance rule checking, and an innovative consumer health & nutrition layer.

## User Review Required

> [!IMPORTANT]
> - **Asset Mapping Confirmed**: All 15 authentic product images and FSSAI veg/non-veg symbols discovered in your local screenshots from today have been verified and mapped directly (Kurkure Masala Munch, Lay's American Style Cream & Onion, Parle Happy Happy Cookies, MTR Special Garam Masala, plus veg and non-veg symbols).
> - **Branding Cleanse**: 100% free of hackathon / SIH / COMPLY.AI / fake government authority references. All sample inspection metrics and regulatory references are transparently framed as AI-assisted screening for packaged commodities.
> - **Dual Theme System**: Full parity for **Dark Professional** (Option 4 style: deep navy, dark cards, gold/orange accents, green compliance pills) and **Light Clean & Modern** (Option 5 style: clean white/light slate, soft blue accents, navy text) with persistent theme switcher in `Settings -> Appearance`.

---

## Proposed Architecture & Workflow

### 1. Technology Stack
- **Framework**: React 18 / 19 + TypeScript + Vite.
- **Icons**: `lucide-react` for consistent, professional SaaS iconography.
- **Styling**: Modern CSS Design System utilizing CSS Variables / Design Tokens mapped for Dark Professional and Light Clean & Modern themes. Smooth transitions, glassmorphism cards, and traffic-light indicator system.
- **State Management**: React Context (`ProductContext`, `ThemeContext`, `InspectionContext`) providing persistent state, active product synchronicity across all views, and step-by-step inspection progression.
- **Service Layer (Abstraction for Future APIs)**:
  - `inspectionService.ts` (`analyzePackage`, `generateReport`)
  - `ocrService.ts` (`extractRawOCR`, `extractStructuredData`)
  - `foodClassificationService.ts` (`detectFoodType` with standardized FSSAI symbol matching)
  - `fontAnalysisService.ts` (`analyzeDeclarationDimensions`, `calculateEstimatedFontHeight`)
  - `complianceService.ts` (`checkLegalMetrologyRules`, `evaluatePriceQuantity`)
  - `nutritionService.ts` (`calculatePortionNutrition`, `getTrafficLightStatus`, `getConsumerInsights`)

---

## Proposed File Structure

```
d:/Projects/LabelLens/
├── public/
│   ├── assets/
│   │   ├── kurkure_front.png
│   │   ├── kurkure_back.png
│   │   ├── kurkure_ingredients.png
│   │   ├── lays_front.png
│   │   ├── lays_back.png
│   │   ├── lays_nutrition.png
│   │   ├── parle_happy_front.png
│   │   ├── parle_happy_back.png
│   │   ├── parle_happy_ingredients.png
│   │   ├── parle_happy_nutrition.png
│   │   ├── mtr_garam_masala_front.png
│   │   ├── mtr_garam_masala_back.png
│   │   ├── mtr_garam_masala_ingredients.png
│   │   ├── veg_symbol.png
│   │   └── nonveg_symbol.png
│   └── favicon.svg
├── src/
│   ├── types/
│   │   └── inspection.ts             # Complete domain model & types
│   ├── data/
│   │   ├── sampleProducts.ts         # 4 authoritative products with full extracted data
│   │   └── complianceRulesData.ts    # Legal Metrology Rules 2011 rulebook
│   ├── services/
│   │   ├── complianceService.ts      # Rule engine & price/quantity comparison
│   │   ├── nutritionService.ts       # Portion scaling & traffic-light thresholds
│   │   ├── fontAnalysisService.ts    # Bounding box & font size estimation
│   │   └── inspectionService.ts      # Pipeline orchestration
│   ├── context/
│   │   ├── ThemeContext.tsx          # Dark / Light theme provider & localStorage persistence
│   │   ├── ProductContext.tsx        # Active product state & updater
│   │   └── InspectionContext.tsx     # 6-step workflow state & running analysis
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Professional navigation with 8 routes
│   │   │   ├── Header.tsx            # Search, Inspector role badge, notifications
│   │   │   └── AppLayout.tsx         # Main layout wrapper with responsive grid
│   │   ├── shared/
│   │   │   ├── StatusBadge.tsx       # PASS / WARNING / POTENTIAL VIOLATION / NOT DETECTED
│   │   │   ├── FoodTypeBadge.tsx     # 🟢 Vegetarian / 🔴 Non-Vegetarian with symbol
│   │   │   ├── ProductSelector.tsx   # Switch between 4 sample products
│   │   │   └── Modal.tsx             # Image zoom & preview modal
│   │   ├── inspection/
│   │   │   ├── InspectionStepper.tsx # 6-stage linear stepper
│   │   │   ├── PackageImageCard.tsx  # Multi-surface card (Front, Back, Side Opt, Top Opt)
│   │   │   ├── AIProcessingStage.tsx # Live pipeline simulation with progress
│   │   │   ├── OCRTransformTable.tsx # Raw OCR text -> Structured data
│   │   │   ├── FontAnalysisPanel.tsx # Bounding box visualizer & dimension check
│   │   │   ├── ComplianceChecklist.tsx# Legal Metrology checklist with evidence & confidence
│   │   │   ├── NutritionSlider.tsx   # Dynamic 20g - 100g portion slider with traffic lights
│   │   │   └── ReportPreview.tsx     # Full inspection report with print/export
│   ├── pages/
│   │   ├── Dashboard.tsx             # Overview, recent inspections, compliance metrics
│   │   ├── NewInspection.tsx         # 6-step end-to-end inspection flow
│   │   ├── ScanPackage.tsx           # Camera viewport & multi-surface capture
│   │   ├── AIAnalysis.tsx            # Pipeline visualization
│   │   ├── ProductDetails.tsx        # In-depth package catalog view
│   │   ├── ComplianceRules.tsx       # Rulebook viewer (Rules 2011)
│   │   ├── InspectionHistory.tsx     # Searchable inspection log table
│   │   ├── Reports.tsx               # Report repository
│   │   └── Settings.tsx              # Appearance (Dark/Light preview cards)
│   ├── index.css                     # Design tokens for Dark Professional & Clean Light
│   ├── App.tsx                       # Route & page switcher
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Detailed Component & Feature Specifications

### 1. The 4 Authoritative Products
- **Kurkure Masala Munch** (Snack / Namkeen, ₹20, 20g, PepsiCo India Holdings, Vegetarian, FSSAI 10014064000435).
- **Lay's American Style Cream & Onion** (Potato Chips, ₹10/₹20, 26.5g/50g, PepsiCo India Holdings, Vegetarian, FSSAI 10014064000435).
- **Parle Happy Happy Choco-Chip Cookies** (Biscuits / Cookies, ₹100, 400g, Parle Products Pvt Ltd, Vegetarian, FSSAI 10013022002253).
- **MTR Special Garam Masala** (Spices / Masala, ₹125 (or detected MRP), 50g, MTR Foods Pvt Ltd, Vegetarian, FSSAI 10012043000145).
- *Strict Rule*: Switching the selected product updates all metadata, front/back/innovation images, nutrition facts, ingredients, compliance findings, and report sections immediately.

### 2. Multi-Surface Package Handling
- **Front View**: Displays authentic front image.
- **Back View**: Displays authentic back label image.
- **Side View**: Displays "Side View (Optional) - No side image available (Not required if no declarations)".
- **Top / Bottom View**: Displays "Top / Bottom View (Optional) - No top/bottom image available (Not required if no declarations)".

### 3. Food Type & FSSAI Standardized Symbol
- Standardized symbol display using `veg_symbol.png` and `nonveg_symbol.png`.
- High-confidence verification (`98% confidence`, source: `Front label / Back label`).
- Displays "🟢 Vegetarian" or "🔴 Non-Vegetarian", or "⚪ Not Detected" when unverified.

### 4. Legal Metrology (Packaged Commodities) Rules 2011 Compliance Engine
- Checks:
  - **MRP (Maximum Retail Price)**: Inclusive of all taxes, unit sale price presence.
  - **Net Quantity**: Standard units of measurement, area of principal display panel (PDP) vs minimum numeral font size.
  - **Manufacturer & Packer Details**: Full registered name, complete physical address, pin code, state.
  - **Consumer Care**: Toll-free phone, email address, physical postal contact for customer grievance redressal.
  - **Date Declarations**: Month & year of manufacture / packaging, Best Before / Expiry date formatting.
  - **Food Classification Symbol**: Presence in conspicuous area of PDP.
  - **Price / Quantity Analysis**: Unit price calculation, comparison against reference/benchmark.
- Status values: `PASS`, `WARNING / REVIEW REQUIRED`, `POTENTIAL VIOLATION`, `NOT DETECTED`.
- Every finding includes: `Evidence (source label snippet)`, `Confidence Score`, `Applicable Rule Clause`, `Recommendation`.

### 5. Innovation Layer: Health & Nutrition
- Dynamic portion-size slider (interactive range e.g. 10g to 100g, or serve size).
- Values dynamically re-calculate: Calories, Protein, Carbohydrates, Added Sugars, Total Fat, Saturated Fat, Trans Fat, Sodium.
- Traffic-light health indicators (Green: Low, Amber: Moderate, Red: High) based on ICMR / FSSAI daily reference thresholds.
- Informational guidance filters: `General`, `Children`, `Pregnancy` with non-diagnostic, informational advice.

### 6. Settings & Appearance
- Two interactive preview cards:
  1. **Dark Professional**: Deep navy (`#0B1120`), slate card surfaces (`#131D31`), gold/amber highlights (`#F59E0B`), emerald badges (`#10B981`).
  2. **Clean & Modern**: Clean white/light zinc (`#F8FAFC`), crisp white cards (`#FFFFFF`), ocean blue accents (`#2563EB`), emerald badges (`#059669`).
- Selection persisted in `localStorage`.

## Approved Refinements & Governance Rules

1. **Confidence Display**: Label confidence levels clearly as High/Medium/Low with illustrative sample notation (e.g. `High (Sample / Illustrative)`) to avoid misleading AI certainty.
2. **Font Analysis Calibration Warning**: Explicitly show `Estimated font height ≈ X mm`, `Measurement status: Estimated from image geometry`, and note: `Physical font-size verification requires calibrated image/package dimensions`.
3. **Explicit Ingredient & Additive/Preservative Analysis**: Separate "detected on label" from health interpretations. Highlight preservatives (e.g., INS numbers / acidity regulators), relevant allergens, and non-alarmist, evidence-backed explanations.
4. **Informational Health Insights & Disclaimers**: Clarify that indicators are based on configured reference thresholds. Display: `Health insights are informational and are not medical advice`, with clear non-medical context for Children / Pregnancy.
5. **Regulatory Screening Disclaimer**: Add `AI-assisted screening; final regulatory determination requires appropriate manual verification` across compliance sections.
6. **9 Primary Navigation Destinations**:
   1. Dashboard
   2. New Inspection
   3. Scan Package
   4. AI Analysis
   5. Product Details
   6. Compliance Rules
   7. Inspection History
   8. Reports
   9. Settings
7. **Price/Quantity Comparison**: Display `Reference comparison unavailable` when historical/reference benchmark data does not exist, rather than generating ungrounded alerts.
8. **Restrained Enterprise SaaS Aesthetics**: Avoid heavy glassmorphism or flashy effects. Employ crisp, clean cards, subtle borders, high contrast typography, and restrained accents suitable for an enterprise inspection platform.

---

## Verification Plan

### Automated Verification
1. Run `cmd.exe /c npm run build` to verify TypeScript compile and Vite bundling without any errors or warnings.
2. Verify all asset paths in `public/assets/` load with HTTP 200 via local dev server.

### Manual & Interactive Browser Verification
1. Launch Vite dev server on local port.
2. Open LabelLens in browser subagent.
3. Test theme switching between **Dark Professional** and **Light Clean & Modern**; verify persistence across page refresh.
4. Test product switching between Kurkure, Lay's, Parle Happy Happy, and MTR; verify zero cross-contamination of images, ingredients, or compliance data.
5. Walk through the 6-step New Inspection flow:
   - Capture / Review images (Front + Back + Optional Side/Top placeholders).
   - Trigger AI Processing pipeline simulation.
   - Inspect Raw OCR -> Structured NLP transformation table.
   - Verify Font & Bounding-box analysis with calibration disclaimer.
   - Review Legal Metrology compliance results with evidence & confidence.
   - Review Ingredient & Additive / Preservative / Allergen analysis.
   - Adjust Portion Size slider in Health Insights; verify dynamic nutrient calculation & non-medical disclaimers.
   - View printable Compliance Report.
6. Verify all 9 navigation routes: Dashboard, New Inspection, Scan Package, AI Analysis, Product Details, Compliance Rules, Inspection History, Reports, Settings.

