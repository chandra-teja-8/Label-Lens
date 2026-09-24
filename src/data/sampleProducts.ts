import { SampleProduct } from '../types/inspection';

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  // =========================================================================
  // PRODUCT 1: Kurkure Masala Munch
  // =========================================================================
  {
    id: 'kurkure-masala-munch',
    name: 'Kurkure Masala Munch',
    brand: 'Kurkure (PepsiCo)',
    category: 'Snack / Namkeen',
    subCategory: 'Proprietary Food — Namkeen (15.1)',
    foodType: 'Vegetarian',
    foodTypeConfidence: {
      tier: 'High',
      percentageText: 'High (Sample / Illustrative)',
      source: 'Front Principal Display Panel & Back Panel (Standardized Green Dot in Square)'
    },
    surfaces: {
      front: '/assets/kurkure_front.png',
      back: '/assets/kurkure_back.png',
      innovationIngredients: '/assets/kurkure_ingredients.png'
    },
    extractedFields: {
      productName: {
        label: 'Product Name',
        rawValue: 'Kurkure MASALA MUNCH NAMKEEN',
        structuredValue: 'Kurkure Masala Munch',
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front PDP' },
        status: 'Detected'
      },
      brand: {
        label: 'Brand / Trademark',
        rawValue: 'Kurkure is a Registered Trade Mark of PepsiCo, Inc.',
        structuredValue: 'PepsiCo / Kurkure',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back declaration' },
        status: 'Detected'
      },
      category: {
        label: 'Food Category',
        rawValue: 'PROPRIETARY FOOD — NAMKEEN (15.1)',
        structuredValue: 'Proprietary Food — Namkeen (Cat 15.1)',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back panel' },
        status: 'Detected'
      },
      mrp: {
        label: 'Maximum Retail Price (MRP)',
        rawValue: 'MRP Rs. 20/- (INCL. OF ALL TAXES)',
        structuredValue: '₹20.00 (Incl. of all taxes)',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back pricing panel' },
        status: 'Detected'
      },
      netQuantity: {
        label: 'Net Quantity',
        rawValue: 'NET QTY: 20 g (Serve Size 20g** Pack<20 g is a single consumption pack)',
        structuredValue: '20 g',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back panel / Nutrition note' },
        status: 'Detected'
      },
      unitSalePrice: {
        label: 'Unit Sale Price',
        rawValue: 'UNIT SALE PRICE: ₹1.00 / g',
        structuredValue: '₹1.00 per gram',
        sourceSurface: 'Back',
        confidence: { tier: 'Medium', percentageText: 'Medium (Sample / Illustrative)', source: 'Back declaration panel' },
        status: 'Needs Review'
      },
      manufacturer: {
        label: 'Manufacturer & Packer',
        rawValue: 'MFD. BY: PepsiCo India Holdings Pvt. Ltd., Lic. No. 10012063000110 / Daawat Foods / Heemankshi Bakers / AFP Mfg / JDB Steel',
        structuredValue: 'PepsiCo India Holdings Pvt. Ltd., DLF Qutab Enclave, Gurugram, Haryana - 122002',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back manufacturer roster' },
        status: 'Detected'
      },
      consumerCare: {
        label: 'Consumer Care Redressal',
        rawValue: 'THE CONSUMER SERVICES MANAGER, PEPSICO INDIA HOLDINGS PVT. LTD., P.O. BOX 27, DLF QUTAB ENCLAVE, PHASE-1, GURUGRAM - 122002, HARYANA, INDIA. CALL: 1800 22 4020, EMAIL: CONSUMER.FEEDBACK@PEPSICO.COM',
        structuredValue: 'Toll Free: 1800 22 4020 | Email: consumer.feedback@pepsico.com | PO Box 27, Gurugram 122002',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back consumer block' },
        status: 'Detected'
      },
      fssaiLicense: {
        label: 'FSSAI License Number',
        rawValue: 'fssai Mkt. Lic. No. 10014064000435',
        structuredValue: '10014064000435',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back FSSAI emblem' },
        status: 'Detected'
      },
      dates: {
        label: 'Date Declarations',
        rawValue: 'MFD & USE BY: Refer batch stamp area',
        structuredValue: 'Use by declaration referenced; batch stamp verification required',
        sourceSurface: 'Back',
        confidence: { tier: 'Medium', percentageText: 'Medium (Sample / Illustrative)', source: 'Back batch imprint' },
        status: 'Needs Review'
      }
    },
    fontAnalysis: [
      {
        id: 'fa-1',
        field: 'Net Quantity Numeral',
        detectedText: '20 g',
        estimatedHeightMm: 3.2,
        minRequiredMm: 2.0,
        areaPdpCm2: 240,
        applicableRule: 'Legal Metrology Rules 2011, First Schedule Table I (Weight <= 50g requires min 2.0mm)',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 68, y: 790, width: 95, height: 28 },
        note: 'Physical font-size verification requires calibrated image/package dimensions.'
      },
      {
        id: 'fa-2',
        field: 'MRP Declaration',
        detectedText: 'MRP Rs. 20/-',
        estimatedHeightMm: 2.6,
        minRequiredMm: 2.0,
        areaPdpCm2: 240,
        applicableRule: 'Legal Metrology Rules 2011, Rule 9(1) - Minimum font height proportional to PDP area',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 65, y: 670, width: 230, height: 32 },
        note: 'Estimated font height complies with minimum threshold for package area.'
      },
      {
        id: 'fa-3',
        field: 'Consumer Care Details',
        detectedText: 'OR CALL US AT 1800 22 4020',
        estimatedHeightMm: 1.8,
        minRequiredMm: 1.5,
        areaPdpCm2: 240,
        applicableRule: 'Rule 6(1)(e) - Legibility and prominent visibility of consumer grievance contact',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 550, y: 770, width: 220, height: 22 },
        note: 'Phone and email printed in clear uppercase contrasting font.'
      }
    ],
    complianceChecks: [
      {
        id: 'comp-1',
        category: 'Mandatory Declarations',
        title: 'Maximum Retail Price (MRP) & Tax Declaration',
        ruleReference: 'Rule 6(1)(da) - Legal Metrology (Packaged Commodities) Rules, 2011',
        status: 'PASS',
        detectedValue: 'MRP Rs. 20/- (INCL. OF ALL TAXES)',
        evidenceSnippet: '"MRP Rs. 20/- (INCL. OF ALL TAXES)" printed on lower left back panel.',
        source: 'Back panel OCR region 3',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR bounding box' },
        explanation: 'MRP clearly includes statutory statement "inclusive of all taxes" without ambiguity.'
      },
      {
        id: 'comp-2',
        category: 'Net Quantity',
        title: 'Nominal Net Quantity & Standard Unit',
        ruleReference: 'Rule 6(1)(b) & Seventh Schedule - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: '20 g',
        evidenceSnippet: '"Serve Size 20g** Pack<20 g is a single consumption pack" & NET QTY: 20 g',
        source: 'Back nutrition & lower left declaration',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back panel' },
        explanation: 'Net weight declared in standard metric units (g) compliant with specified commodity packaging.'
      },
      {
        id: 'comp-3',
        category: 'Manufacturer / Packer',
        title: 'Complete Name and Address of Registered Packer/Manufacturer',
        ruleReference: 'Rule 6(1)(a) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'PepsiCo India Holdings Pvt. Ltd., DLF Qutab Enclave, Gurugram, Haryana - 122002',
        evidenceSnippet: '"MARKETED BY: PepsiCo India Holdings Pvt. Ltd... Gurugram - 122002, Haryana, India."',
        source: 'Back panel right column',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Complete marketing entity address and state pincode explicitly stated with multiple manufacturing unit licenses.'
      },
      {
        id: 'comp-4',
        category: 'Consumer Care',
        title: 'Consumer Redressal Contact Details',
        ruleReference: 'Rule 6(1)(e) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'Toll-free 1800 22 4020, consumer.feedback@pepsico.com, PO Box 27 Gurugram',
        evidenceSnippet: '"OR CALL US AT 1800 22 4020 OR EMAIL US AT CONSUMER.FEEDBACK@PEPSICO.COM"',
        source: 'Back panel consumer care box',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Designation of official (Consumer Services Manager), telephone number, postal address, and email are all present.'
      },
      {
        id: 'comp-5',
        category: 'Date Declarations',
        title: 'Manufacturing & Use By / Expiry Date Verification',
        ruleReference: 'Rule 6(1)(d) - Month and Year of Manufacture/Pre-packaging',
        status: 'WARNING',
        detectedValue: 'Label template placeholder: "MFD & USE BY:" (Specific ink-jet stamp requires batch inspection)',
        evidenceSnippet: '"MFD & USE BY:" section relies on secondary thermal batch stamping in retail distribution.',
        source: 'Back panel lower left stamp area',
        confidence: { tier: 'Medium', percentageText: 'Medium (Sample / Illustrative)', source: 'Visual inspection' },
        explanation: 'Pre-printed label contains statutory prompt; inspector must verify legibility of the active printed ink-jet date stamp on the physical lot.',
        recommendation: 'Manual verification recommended to confirm date stamping is readable and unsmudged on the physical production run.'
      },
      {
        id: 'comp-6',
        category: 'Food Classification',
        title: 'Standardized Food Classification Symbol (Veg / Non-Veg)',
        ruleReference: 'Food Safety and Standards (Packaging and Labelling) Regulations & LM Rule 6',
        status: 'PASS',
        detectedValue: 'Green filled circle inside green square outline',
        evidenceSnippet: 'Standardized green dot symbol detected on both Front PDP (bottom left) and Back panel (top).',
        source: 'Front & Back package surfaces',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Vision symbol matcher' },
        explanation: 'Vegetarian classification symbol strictly complies with dimensions and contrasting background rules.'
      }
    ],
    overallCompliance: {
      status: 'WARNING',
      summary: '5 mandatory declarations pass Legal Metrology screening; 1 review required for physical batch date stamping verification.',
      passedCount: 5,
      warningCount: 1,
      violationCount: 0,
      notDetectedCount: 0
    },
    nutrition: {
      servingSizeG: 20,
      defaultServingLabel: 'Per Serve (20g)',
      items: [
        { name: 'Energy (Calories)', unit: 'kcal', per100g: 554, perServe: 111, rdaPercent: 6, thresholdCategory: 'calories', thresholdStatus: 'amber', thresholdExplanation: '111 kcal per 20g serve represents ~6% adult RDA.' },
        { name: 'Protein', unit: 'g', per100g: 6.0, perServe: 1.2, rdaPercent: 2, thresholdCategory: 'neutral' },
        { name: 'Carbohydrates', unit: 'g', per100g: 57.5, perServe: 11.5, thresholdCategory: 'neutral' },
        { name: 'Total Sugars', unit: 'g', per100g: 1.4, perServe: 0.3, thresholdCategory: 'sugar', thresholdStatus: 'green', thresholdExplanation: 'Low sugar profile (<1g per serve).' },
        { name: 'Added Sugars', unit: 'g', per100g: 0.8, perServe: 0.16, rdaPercent: 0.3, thresholdCategory: 'sugar', thresholdStatus: 'green' },
        { name: 'Total Fat', unit: 'g', per100g: 33.4, perServe: 6.7, rdaPercent: 10, thresholdCategory: 'fat', thresholdStatus: 'amber', thresholdExplanation: 'Moderate fat contribution per single serve.' },
        { name: 'Saturated Fat', unit: 'g', per100g: 15.1, perServe: 3.0, rdaPercent: 14, thresholdCategory: 'fat', thresholdStatus: 'amber' },
        { name: 'Trans Fat', unit: 'g', per100g: 0.1, perServe: 0.02, rdaPercent: 1, thresholdCategory: 'fat', thresholdStatus: 'green', thresholdExplanation: 'Well within the regulatory limit of <0.2g trans fat per serve.' },
        { name: 'Sodium', unit: 'mg', per100g: 694, perServe: 139, rdaPercent: 7, thresholdCategory: 'sodium', thresholdStatus: 'amber', thresholdExplanation: 'Moderate sodium content (139 mg per serve).' }
      ]
    },
    ingredientsList: 'Cereal Products (67%) (Rice Meal (44%), Corn Meal (23%)), Edible Vegetable Oil (Palmolein / Rice Bran Oil), *Seasoning (Spices and Condiments, Iodised Salt, Sugar, Flavour (Natural and Nature Identical Flavouring Substances), Black Salt, Tomato Powder, Acidity Regulators (330, 296, 334), Colour (160c), Maltodextrin), Gram Meal (0.5%). *As flavouring agent.',
    additivesAndPreservatives: [
      {
        name: 'Citric Acid, Malic Acid, Tartaric Acid',
        insCode: 'INS 330, 296, 334',
        category: 'Acidity Regulator',
        detectedOnLabel: 'Acidity Regulators (330, 296, 334)',
        technicalFunction: 'Maintains tartness and shelf stability in snack seasoning',
        regulatoryStatus: 'Permitted food additive under FSSAI Standards',
        notes: 'Naturally occurring organic acids commonly used in savory spice blends; detected on label without regulatory breach.'
      },
      {
        name: 'Paprika Oleoresin',
        insCode: 'INS 160c',
        category: 'Coloring',
        detectedOnLabel: 'Colour (160c)',
        technicalFunction: 'Provides natural reddish-orange hue derived from paprika',
        regulatoryStatus: 'Permitted natural coloring substance',
        notes: 'Plant-derived food colorant; not an artificial coal-tar dye.'
      },
      {
        name: 'Maltodextrin',
        category: 'Flavor Enhancer',
        detectedOnLabel: 'Maltodextrin',
        technicalFunction: 'Seasoning carrier and flavor dispersant',
        regulatoryStatus: 'Standard food ingredient (carbohydrate polysaccharide)',
        notes: 'Used to ensure uniform adherence of spice powder on extruded crisps.'
      }
    ],
    allergens: [
      {
        allergen: 'Gram Meal (Chickpea / Besan)',
        detectedSource: 'Detected in ingredient declaration (0.5%)',
        riskLevel: 'Present in Ingredients',
        note: 'Relevant for individuals with specific legume allergies.'
      },
      {
        allergen: 'Vegetable Oil Derivatives',
        detectedSource: 'Palmolein / Rice Bran Oil',
        riskLevel: 'Present in Ingredients',
        note: 'Specified on back label with dual-source disclosure mark.'
      }
    ],
    consumerGuidance: [
      {
        targetGroup: 'General',
        status: 'Standard',
        summary: 'Savory extruded snack intended for occasional consumption within balanced daily calorie intake.',
        details: [
          'Serving size is calibrated to 20g (approx 111 kcal, 10% daily fat).',
          'Low added sugar (<0.2g per serve).',
          'Nutritional indicators are informational; please review full ingredient list.'
        ]
      },
      {
        targetGroup: 'Children',
        status: 'Moderate Concern',
        summary: 'Contains sodium (139 mg per serve) and moderate spice level.',
        details: [
          'High palatability seasoning; recommended to supervise portion sizes for young children.',
          'Informational note: Not a replacement for staple nutritional meals.'
        ]
      },
      {
        targetGroup: 'Pregnancy',
        status: 'Informational Notice',
        summary: 'Standard packaged snack without contraindicated ingredients.',
        details: [
          'Check sodium intake in dietary planning as recommended by personal healthcare providers.',
          'Health insights are informational and are not medical advice.'
        ]
      }
    ],
    priceQuantity: {
      hasReference: true,
      currentQuantity: '20 g',
      referenceQuantity: '23 g (Historical Benchmark)',
      currentMrp: '₹20.00',
      referenceMrp: '₹20.00',
      unitPriceCurrent: '₹1.00 / g',
      unitPriceReference: '₹0.87 / g',
      status: 'POTENTIAL_VARIATION',
      note: 'Reference comparison: Net weight reduced from 23g to 20g at constant MRP ₹20 (+14.9% effective unit price increase). AI screening flags as quantity variation; verify batch lot.'
    }
  },

  // =========================================================================
  // PRODUCT 2: Lay's American Style Cream & Onion
  // =========================================================================
  {
    id: 'lays-cream-onion',
    name: "Lay's American Style Cream & Onion",
    brand: "Lay's (PepsiCo)",
    category: 'Potato Chips',
    subCategory: 'Proprietary Food — Potato Chips (15.1)',
    foodType: 'Vegetarian',
    foodTypeConfidence: {
      tier: 'High',
      percentageText: 'High (Sample / Illustrative)',
      source: 'Front PDP bottom left & Back panel top (Standardized Green Dot in Square)'
    },
    surfaces: {
      front: '/assets/lays_front.png',
      back: '/assets/lays_back.png',
      innovationNutrition: '/assets/lays_nutrition.png'
    },
    extractedFields: {
      productName: {
        label: 'Product Name',
        rawValue: "Lay's American Style Cream & Onion Flavour Potato Chips",
        structuredValue: "Lay's American Style Cream & Onion",
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front PDP' },
        status: 'Detected'
      },
      brand: {
        label: 'Brand / Trademark',
        rawValue: "Lay's is the Registered Trade Mark of PepsiCo, Inc.",
        structuredValue: "Lay's / PepsiCo",
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back copyright' },
        status: 'Detected'
      },
      category: {
        label: 'Category',
        rawValue: 'PROPRIETARY FOOD — POTATO CHIPS (15.1)',
        structuredValue: 'Proprietary Food — Potato Chips',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back panel' },
        status: 'Detected'
      },
      mrp: {
        label: 'Maximum Retail Price (MRP)',
        rawValue: "'MRP (Print stamp area blank in pre-printed foil mockup)",
        structuredValue: '₹10.00 / ₹20.00 (Requires physical lot stamp verification)',
        sourceSurface: 'Back',
        confidence: { tier: 'Low', percentageText: 'Low (Sample / Illustrative)', source: 'Back price stamp box' },
        status: 'Needs Review'
      },
      netQuantity: {
        label: 'Net Quantity',
        rawValue: 'N.QTY: [Refer thermal batch box] / SERVE SIZE 20 g (1.2 SERVES IN THIS PACK)',
        structuredValue: '24 g (calculated: 1.2 serves x 20g) / Promoted with 25% MORE CHIPS~',
        sourceSurface: 'Back',
        confidence: { tier: 'Medium', percentageText: 'Medium (Sample / Illustrative)', source: 'Nutrition panel serve ratio' },
        status: 'Needs Review'
      },
      manufacturer: {
        label: 'Manufacturer & Packer',
        rawValue: 'Mfg. & Mkt. by: PEPSICO INDIA HOLDINGS PVT. LTD., P.O. BOX 27, DLF QUTAB ENCLAVE, PHASE -1, GURUGRAM - 122002, HARYANA, INDIA.',
        structuredValue: 'PepsiCo India Holdings Pvt. Ltd., Gurugram, Haryana - 122002',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back declaration' },
        status: 'Detected'
      },
      consumerCare: {
        label: 'Consumer Care Redressal',
        rawValue: 'THE CONSUMER SERVICES MANAGER, PEPSICO INDIA HOLDINGS PVT. LTD., CALL US AT 1800 22 4020, EMAIL: CONSUMER.FEEDBACK@PEPSICO.COM',
        structuredValue: 'Phone: 1800 22 4020 | Email: consumer.feedback@pepsico.com | PO Box 27, Gurugram',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back header box' },
        status: 'Detected'
      },
      fssaiLicense: {
        label: 'FSSAI License Number',
        rawValue: 'fssai Mkt. Lic. No. 10014064000435',
        structuredValue: '10014064000435',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back FSSAI emblem' },
        status: 'Detected'
      },
      dates: {
        label: 'Date Declarations',
        rawValue: 'B. NO: / MFD: / USE BY: [Unprinted white stamp box on sample package]',
        structuredValue: 'Requires physical ink-jet batch stamp check',
        sourceSurface: 'Back',
        confidence: { tier: 'Low', percentageText: 'Low (Sample / Illustrative)', source: 'Back batch box' },
        status: 'Needs Review'
      }
    },
    fontAnalysis: [
      {
        id: 'fa-l1',
        field: 'FSSAI License Text',
        detectedText: 'Mkt. Lic. No. 10014064000435',
        estimatedHeightMm: 1.6,
        minRequiredMm: 1.5,
        areaPdpCm2: 320,
        applicableRule: 'FSSAI Packaging Regulations, Rule 2.2.1 - Contrast and minimum legibility',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 580, y: 240, width: 230, height: 24 },
        note: 'Physical font-size verification requires calibrated image/package dimensions.'
      },
      {
        id: 'fa-l2',
        field: 'Consumer Care Toll-Free Phone',
        detectedText: '1800 22 4020',
        estimatedHeightMm: 2.4,
        minRequiredMm: 1.5,
        areaPdpCm2: 320,
        applicableRule: 'Rule 6(1)(e) - Legibility and prominent visibility of consumer grievance contact',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 575, y: 155, width: 240, height: 30 },
        note: 'Bold sans-serif typography provides high visual contrast against white back panel.'
      },
      {
        id: 'fa-l3',
        field: 'MRP & Batch Stamp Area Box',
        detectedText: "'MRP / N.QTY / B. NO: / MFD: / USE BY:",
        estimatedHeightMm: 2.1,
        minRequiredMm: 2.0,
        areaPdpCm2: 320,
        applicableRule: 'Legal Metrology Rules 2011, Rule 9(1) - Minimum numeral font height',
        status: 'WARNING',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 100, y: 640, width: 340, height: 220 },
        note: 'Pre-printed template box height is adequate, but retail batch stamping is unpopulated on this sample foil.'
      }
    ],
    complianceChecks: [
      {
        id: 'comp-l1',
        category: 'Mandatory Declarations',
        title: 'MRP Stamping Verification',
        ruleReference: 'Rule 6(1)(da) - Legal Metrology Rules, 2011',
        status: 'WARNING',
        detectedValue: "'MRP [Unprinted stamp box on pre-printed foil]",
        evidenceSnippet: 'White rectangular lot-stamp area is unpopulated in sample package imagery.',
        source: 'Back lower left declaration field',
        confidence: { tier: 'Low', percentageText: 'Low (Sample / Illustrative)', source: 'Vision detection' },
        explanation: 'The pre-printed substrate has designated area for MRP, but numerical values must be verified on finished physical package.',
        recommendation: 'Manual verification recommended: inspect online production printer for active batch stamping.'
      },
      {
        id: 'comp-l2',
        category: 'Net Quantity',
        title: 'Net Quantity Specification & Promotional Claim',
        ruleReference: 'Rule 6(1)(b) & Rule 12 - Quantity Disclosures & Offers',
        status: 'PASS',
        detectedValue: '25% MORE CHIPS~ promotional banner on Front PDP; 1.2 serves of 20g in nutrition table',
        evidenceSnippet: '"25% MORE CHIPS~" prominent top red arc; back nutrition specifies 1.2 serves (24g total pack).',
        source: 'Front PDP & Back Nutrition panel',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Multimodal vision' },
        explanation: 'Promotional quantity statement contains qualifying tilde (~) referencing comparative standard baseline.'
      },
      {
        id: 'comp-l3',
        category: 'Manufacturer / Packer',
        title: 'Manufacturer & Packer Declarations',
        ruleReference: 'Rule 6(1)(a) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'PepsiCo India Holdings Pvt. Ltd., Gurugram, Haryana - 122002',
        evidenceSnippet: '"Mfg. & Mkt. by: PEPSICO INDIA HOLDINGS PVT. LTD... GURUGRAM - 122002, HARYANA, INDIA."',
        source: 'Back panel address zone',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Registered corporate office and unit code mapping (N1, N2, N3, N4) clearly declared.'
      },
      {
        id: 'comp-l4',
        category: 'Consumer Care',
        title: 'Consumer Redressal Communication',
        ruleReference: 'Rule 6(1)(e) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'Toll-free 1800 22 4020, consumer.feedback@pepsico.com',
        evidenceSnippet: '"FOR FEEDBACK OR QUERIES, WRITE TO: THE CONSUMER SERVICES MANAGER... CALL US AT 1800 22 4020"',
        source: 'Back panel top right',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Designated redressal manager with working telephone and electronic mail channel.'
      },
      {
        id: 'comp-l5',
        category: 'Food Classification',
        title: 'Standardized Green Dot Food Symbol',
        ruleReference: 'FSSAI Packaging Regulations & LM Rule 6',
        status: 'PASS',
        detectedValue: 'Green circular dot inside green square outline',
        evidenceSnippet: 'Vegetarian symbol prominently located on Front PDP (bottom left) and Back panel (top center).',
        source: 'Front & Back package surfaces',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Vision symbol matcher' },
        explanation: 'Color, symbol geometry, and boundary ratios align with statutory vegetarian icon specs.'
      }
    ],
    overallCompliance: {
      status: 'WARNING',
      summary: '4 declarations compliant; 1 warning issued for unprinted batch/MRP stamping on sample package foil.',
      passedCount: 4,
      warningCount: 1,
      violationCount: 0,
      notDetectedCount: 0
    },
    nutrition: {
      servingSizeG: 20,
      defaultServingLabel: 'Per Serve (20g)',
      items: [
        { name: 'Energy (Calories)', unit: 'kcal', per100g: 532, perServe: 106, rdaPercent: 5, thresholdCategory: 'calories', thresholdStatus: 'amber', thresholdExplanation: '106 kcal per 20g serve (5% of 2000 kcal standard daily intake).' },
        { name: 'Protein', unit: 'g', per100g: 6.4, perServe: 1.3, thresholdCategory: 'neutral' },
        { name: 'Carbohydrates', unit: 'g', per100g: 52.0, perServe: 10.4, thresholdCategory: 'neutral' },
        { name: 'Total Sugars', unit: 'g', per100g: 3.3, perServe: 0.66, thresholdCategory: 'sugar', thresholdStatus: 'green', thresholdExplanation: 'Low sugar profile (<1g per 20g serve).' },
        { name: 'Added Sugars', unit: 'g', per100g: 2.6, perServe: 0.52, rdaPercent: 1, thresholdCategory: 'sugar', thresholdStatus: 'green' },
        { name: 'Total Fat', unit: 'g', per100g: 33.2, perServe: 6.6, rdaPercent: 10, thresholdCategory: 'fat', thresholdStatus: 'amber', thresholdExplanation: 'Moderate fat contribution per single serve.' },
        { name: 'Saturated Fat', unit: 'g', per100g: 12.5, perServe: 2.5, rdaPercent: 11, thresholdCategory: 'fat', thresholdStatus: 'amber' },
        { name: 'Trans Fat', unit: 'g', per100g: 0.1, perServe: 0.02, rdaPercent: 1, thresholdCategory: 'fat', thresholdStatus: 'green', thresholdExplanation: 'Meets trans fat reduction guidelines (<0.2g).' },
        { name: 'Sodium', unit: 'mg', per100g: 977, perServe: 195, rdaPercent: 10, thresholdCategory: 'sodium', thresholdStatus: 'amber', thresholdExplanation: 'Contains 195 mg sodium per serve (10% adult RDA).' }
      ]
    },
    ingredientsList: "Potato, Edible Vegetable Oil (Palmolein, Rice Bran Oil), *Seasoning (Sugar, Iodised Salt, Flavour (Natural and Nature Identical Flavouring Substances), ~Spices & Condiments, Maltodextrin, Lime Juice Powder, Anticaking agent (551), Edible Vegetable Oil (Sunflower Seed Oil), Flavour Enhancers (627, 631), Corn Syrup Solids). *As flavouring agent. ~Contains Onion and Garlic.",
    additivesAndPreservatives: [
      {
        name: 'Silicon Dioxide',
        insCode: 'INS 551',
        category: 'Anticaking',
        detectedOnLabel: 'Anticaking agent (551)',
        technicalFunction: 'Prevents seasoning powder clumping under packaging pressure and humidity',
        regulatoryStatus: 'Permitted food additive under FSSAI Standards',
        notes: 'Inert mineral substance approved for food application.'
      },
      {
        name: 'Disodium Guanylate & Disodium Inosinate',
        insCode: 'INS 627, 631',
        category: 'Flavor Enhancer',
        detectedOnLabel: 'Flavour Enhancers (627, 631)',
        technicalFunction: 'Synergistic savory umami enhancer',
        regulatoryStatus: 'Permitted flavor enhancers',
        notes: 'Widely used nucleotides in snack flavoring; declared accurately on label.'
      }
    ],
    allergens: [
      {
        allergen: 'Allium Species (Onion & Garlic)',
        detectedSource: 'Explicit disclosure: "~Contains Onion and Garlic"',
        riskLevel: 'Present in Ingredients',
        note: 'Crucial for dietary preference and specific allium sensitivities.'
      },
      {
        allergen: 'Milk Solids / Cream derivatives',
        detectedSource: 'Flavor title: American Style Cream & Onion',
        riskLevel: 'May Contain',
        note: 'Flavouring substances may contain dairy derivatives.'
      }
    ],
    consumerGuidance: [
      {
        targetGroup: 'General',
        status: 'Standard',
        summary: 'Savory fried potato crisps. Best consumed occasionally as part of a varied lifestyle.',
        details: [
          'High calorie density (~532 kcal / 100g); adhere to single serve recommendation (20g).',
          'Contains onion and garlic seasoning.',
          'Nutritional indicators are informational; please review full ingredient list.'
        ]
      },
      {
        targetGroup: 'Children',
        status: 'Moderate Concern',
        summary: 'Higher sodium density (977 mg / 100g, 195 mg per serve).',
        details: [
          'Monitor portion consumption; encourage water hydration.',
          'Informational note: Not a replacement for balanced whole foods.'
        ]
      },
      {
        targetGroup: 'Pregnancy',
        status: 'Informational Notice',
        summary: 'Packaged snack with standard permissible food grade additives.',
        details: [
          'Consider total daily sodium budget in prenatal nutrition.',
          'Health insights are informational and are not medical advice.'
        ]
      }
    ],
    priceQuantity: {
      hasReference: true,
      currentQuantity: '24 g (approx net fill)',
      referenceQuantity: '20 g (Standard Baseline)',
      currentMrp: '₹10.00',
      referenceMrp: '₹10.00',
      unitPriceCurrent: '₹0.42 / g',
      unitPriceReference: '₹0.50 / g',
      status: 'NORMAL',
      note: 'Promotional 25% extra fill verified against standard 20g ₹10 package. Favorable unit price reduction.'
    }
  },

  // =========================================================================
  // PRODUCT 3: Parle Happy Happy Choco-Chip Cookies
  // =========================================================================
  {
    id: 'parle-happy-happy',
    name: 'Parle Happy Happy Choco-Chip Cookies',
    brand: 'Parle',
    category: 'Biscuits / Cookies',
    subCategory: 'Baked Goods — Choco-Chip Biscuits',
    foodType: 'Vegetarian',
    foodTypeConfidence: {
      tier: 'High',
      percentageText: 'High (Sample / Illustrative)',
      source: 'Back panel right side above barcode (Standardized Green Dot in Square)'
    },
    surfaces: {
      front: '/assets/parle_happy_front.png',
      back: '/assets/parle_happy_back.png',
      innovationIngredients: '/assets/parle_happy_ingredients.png',
      innovationNutrition: '/assets/parle_happy_nutrition.png'
    },
    extractedFields: {
      productName: {
        label: 'Product Name',
        rawValue: 'HAPPY HAPPY Choco-Chip Cookies (4 STAY FRESH PACKS INSIDE)',
        structuredValue: 'Parle Happy Happy Choco-Chip Cookies',
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front PDP' },
        status: 'Detected'
      },
      brand: {
        label: 'Brand / Trademark',
        rawValue: 'PARLE',
        structuredValue: 'Parle Products Pvt. Ltd.',
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front red logo pennant' },
        status: 'Detected'
      },
      category: {
        label: 'Category',
        rawValue: 'HAPPY HAPPY BISCUITS',
        structuredValue: 'Biscuits / Cookies',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back panel' },
        status: 'Detected'
      },
      mrp: {
        label: 'Maximum Retail Price (MRP)',
        rawValue: 'MRP ₹ 100.00 INCL. OF ALL TAXES',
        structuredValue: '₹100.00 (Incl. of all taxes)',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back declaration row' },
        status: 'Detected'
      },
      netQuantity: {
        label: 'Net Quantity',
        rawValue: 'NET WEIGHT: 400 g *This combination pack consists of four individual packs and the net weight of combination pack is 400 g',
        structuredValue: '400 g (4 x 100g multipack)',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back declaration strip' },
        status: 'Detected'
      },
      manufacturer: {
        label: 'Manufacturer & Packer',
        rawValue: 'MANUFACTURED BY: PARLE PRODUCTS PVT. LTD., NORTH LEVEL CROSSING, VILE PARLE EAST, MUMBAI MH-400057',
        structuredValue: 'Parle Products Pvt. Ltd., Vile Parle East, Mumbai - 400057',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back manufacturer list' },
        status: 'Detected'
      },
      consumerCare: {
        label: 'Consumer Care Redressal',
        rawValue: 'CONSUMER CARE CELL, PARLE PRODUCTS PVT. LTD., NORTH LEVEL CROSSING, VILE PARLE EAST, MUMBAI MH-400057. PHONE NO: 022-6691 6929, EMAIL: CS@PARLE.BIZ, VISIT US AT WWW.PARLEPRODUCTS.COM',
        structuredValue: 'Phone: 022-6691 6929 | Email: cs@parle.biz | Web: www.parleproducts.com',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back consumer box' },
        status: 'Detected'
      },
      fssaiLicense: {
        label: 'FSSAI License Number',
        rawValue: 'fssai Lic. No.: 10013022002253 / Multi-unit licenses listed',
        structuredValue: '10013022002253',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back FSSAI roster' },
        status: 'Detected'
      },
      dates: {
        label: 'Date Declarations',
        rawValue: 'BEST BEFORE SIX MONTHS FROM PACKAGING',
        structuredValue: 'Best before 6 months from packaging (Batch stamp imprint area provided)',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back upper declaration' },
        status: 'Detected'
      }
    },
    fontAnalysis: [
      {
        id: 'fa-p1',
        field: 'Net Weight Numeral Height',
        detectedText: 'NET WEIGHT: 400 g',
        estimatedHeightMm: 4.5,
        minRequiredMm: 4.0,
        areaPdpCm2: 450,
        applicableRule: 'Legal Metrology Rules 2011, First Schedule Table I (Weight 200g-500g requires min 4.0mm)',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 180, y: 575, width: 210, height: 35 },
        note: 'Physical font-size verification requires calibrated image/package dimensions.'
      },
      {
        id: 'fa-p2',
        field: 'MRP Font Height',
        detectedText: 'MRP ₹ 100.00',
        estimatedHeightMm: 4.2,
        minRequiredMm: 4.0,
        areaPdpCm2: 450,
        applicableRule: 'Rule 9(1) - Minimum numeral height for packaged commodities',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 370, y: 575, width: 180, height: 35 },
        note: 'Clear high-contrast white text on dark chocolate background.'
      },
      {
        id: 'fa-p3',
        field: 'Combination Pack Explanation Clause',
        detectedText: '*This combination pack consists of four individual packs...',
        estimatedHeightMm: 2.1,
        minRequiredMm: 1.5,
        areaPdpCm2: 450,
        applicableRule: 'Rule 24 - Packaging of combination or multi-piece packages',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 180, y: 625, width: 340, height: 26 },
        note: 'Multipack disclaimer is clearly legible beneath the principal declaration.'
      }
    ],
    complianceChecks: [
      {
        id: 'comp-p1',
        category: 'Mandatory Declarations',
        title: 'Maximum Retail Price Declaration & Tax Inclusivity',
        ruleReference: 'Rule 6(1)(da) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'MRP ₹ 100.00 INCL. OF ALL TAXES',
        evidenceSnippet: '"MRP ₹ 100.00 INCL. OF ALL TAXES" printed on bottom declaration band.',
        source: 'Back panel lower deck',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Statutory Indian rupee symbol (₹) and full tax inclusion stated cleanly.'
      },
      {
        id: 'comp-p2',
        category: 'Net Quantity',
        title: 'Combination Multi-Pack Net Quantity Disclosure',
        ruleReference: 'Rule 6(1)(b) & Rule 24 - Provisions regarding wholesale & multi-piece packs',
        status: 'PASS',
        detectedValue: 'NET WEIGHT: 400 g (4 Stay Fresh Packs Inside)',
        evidenceSnippet: 'Combination pack clause: "*This combination pack consists of four individual packs and the net weight of combination pack is 400 g"',
        source: 'Back declaration & Front PDP callout',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front & Back multimodal check' },
        explanation: 'Strictly satisfies Rule 24: individual pieces count (4) and cumulative nominal weight (400g) both explicitly declared.'
      },
      {
        id: 'comp-p3',
        category: 'Manufacturer / Packer',
        title: 'Registered Manufacturer Identity & Manufacturing Locations',
        ruleReference: 'Rule 6(1)(a) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'Parle Products Pvt. Ltd., Mumbai MH-400057 with detailed unit license mapping',
        evidenceSnippet: '"MANUFACTURED FOR: PARLE PRODUCTS PVT. LTD... MUMBAI MH-400057"',
        source: 'Back manufacturer matrix',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Principal brand owner and manufacturing facility codes (BS, MB, LI, NP, etc.) fully documented.'
      },
      {
        id: 'comp-p4',
        category: 'Consumer Care',
        title: 'Consumer Redressal Multi-Channel Access',
        ruleReference: 'Rule 6(1)(e) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'Phone: 022-6691 6929, Email: cs@parle.biz, Postal: Vile Parle East, Mumbai',
        evidenceSnippet: '"CONSUMER CARE CELL... PHONE NO: 022-6691 6929 EMAIL: CS@PARLE.BIZ"',
        source: 'Back consumer box',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Exemplary compliance with all 4 required consumer contact modes: postal, phone, email, website.'
      },
      {
        id: 'comp-p5',
        category: 'Date Declarations',
        title: 'Best Before Declaration',
        ruleReference: 'Rule 6(1)(d) & FSSAI Labelling Regulations',
        status: 'PASS',
        detectedValue: 'BEST BEFORE SIX MONTHS FROM PACKAGING',
        evidenceSnippet: '"BEST BEFORE SIX MONTHS FROM PACKAGING" printed on upper back panel.',
        source: 'Back panel upper text',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Durability period clearly stated relative to packaging date.'
      },
      {
        id: 'comp-p6',
        category: 'Food Classification',
        title: 'Standardized Vegetarian Symbol Verification',
        ruleReference: 'FSSAI Packaging Regulations & LM Rule 6',
        status: 'PASS',
        detectedValue: 'Green dot in square box',
        evidenceSnippet: 'Standardized green dot visible on back panel right side next to barcode.',
        source: 'Back surface vision inspection',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Vision symbol matcher' },
        explanation: 'Conforms to food safety green dot specification for 100% vegetarian bakery products.'
      }
    ],
    overallCompliance: {
      status: 'PASS',
      summary: 'All 6 Legal Metrology mandatory declarations pass screening with complete statutory evidence.',
      passedCount: 6,
      warningCount: 0,
      violationCount: 0,
      notDetectedCount: 0
    },
    nutrition: {
      servingSizeG: 25,
      defaultServingLabel: 'Per Serve (25g approx 3 cookies)',
      items: [
        { name: 'Energy (Calories)', unit: 'kcal', per100g: 489, perServe: 122, rdaPercent: 6, thresholdCategory: 'calories', thresholdStatus: 'amber', thresholdExplanation: '122 kcal per 25g serve (~6% adult daily energy intake).' },
        { name: 'Protein', unit: 'g', per100g: 5.8, perServe: 1.45, thresholdCategory: 'neutral' },
        { name: 'Carbohydrates', unit: 'g', per100g: 71.3, perServe: 17.8, thresholdCategory: 'neutral' },
        { name: 'Total Sugars', unit: 'g', per100g: 30.4, perServe: 7.6, thresholdCategory: 'sugar', thresholdStatus: 'amber', thresholdExplanation: 'Higher sugar density typical of chocolate chip baked cookies (7.6g sugar per 25g serve).' },
        { name: 'Total Fat', unit: 'g', per100g: 20.1, perServe: 5.0, rdaPercent: 7, thresholdCategory: 'fat', thresholdStatus: 'amber', thresholdExplanation: 'Moderate fat from shortening and choco chips.' },
        { name: 'Saturated Fat', unit: 'g', per100g: 10.6, perServe: 2.65, rdaPercent: 12, thresholdCategory: 'fat', thresholdStatus: 'amber' },
        { name: 'Trans Fat', unit: 'g', per100g: 0.0, perServe: 0.0, rdaPercent: 0, thresholdCategory: 'fat', thresholdStatus: 'green', thresholdExplanation: 'Zero trans fat declared on certified panel.' },
        { name: 'Sodium (est.)', unit: 'mg', per100g: 280, perServe: 70, thresholdCategory: 'sodium', thresholdStatus: 'green', thresholdExplanation: 'Low sodium profile (<100 mg per serve).' }
      ]
    },
    ingredientsList: 'Refined Wheat Flour (Maida), Sugar, Refined Palm Oil, Choco Chips (8%) [Sugar, Edible Vegetable Fat (Hydrogenated Oils), Cocoa Solids, Emulsifier of Vegetable Origin (Soya Lecithin) and Artificial Flavouring Substances (Vanilla)], Cocoa Solids (2%), Invert Sugar Syrup, Raising Agents [503(ii), 500(ii)], Iodised Salt and Emulsifier of Vegetable Origin (Diacetyltartaric and Fatty Acid Esters of Glycerol). Contains Permitted Natural Food Colour [150d] and Added Flavours (Artificial Flavouring Substances - Chocolate).',
    additivesAndPreservatives: [
      {
        name: 'Caramel IV (Sulphite Ammonia Caramel)',
        insCode: 'INS 150d',
        category: 'Coloring',
        detectedOnLabel: 'Permitted Natural Food Colour [150d]',
        technicalFunction: 'Imparts rich deep cocoa color to baked biscuit dough',
        regulatoryStatus: 'Permitted food coloring substance under FSSAI Regulations',
        notes: 'Statutory declaration present on label; widely used in bakery confections.'
      },
      {
        name: 'Ammonium Bicarbonate & Sodium Bicarbonate',
        insCode: 'INS 503(ii), 500(ii)',
        category: 'Acidity Regulator',
        detectedOnLabel: 'Raising Agents [503(ii), 500(ii)]',
        technicalFunction: 'Leavening agents for aerated crisp biscuit texture',
        regulatoryStatus: 'Permitted baking agents',
        notes: 'Standard baking sodas decomposed during high-temperature baking oven pass.'
      },
      {
        name: 'Soya Lecithin & DATEM',
        category: 'Emulsifier',
        detectedOnLabel: 'Emulsifier of Vegetable Origin (Soya Lecithin, Diacetyltartaric and Fatty Acid Esters of Glycerol)',
        technicalFunction: 'Stabilizes lipid emulsion and cocoa fat dispersion',
        regulatoryStatus: 'Permitted food emulsifier',
        notes: 'Plant-derived food emulsifier ensuring uniform cookie structure.'
      }
    ],
    allergens: [
      {
        allergen: 'Refined Wheat Flour (Maida / Gluten)',
        detectedSource: 'Primary ingredient (Refined Wheat Flour)',
        riskLevel: 'Present in Ingredients',
        note: 'Contains Gluten; contraindicated for Celiac disease or gluten intolerance.'
      },
      {
        allergen: 'Soy Derivatives (Soya Lecithin)',
        detectedSource: 'Emulsifier of vegetable origin',
        riskLevel: 'Present in Ingredients',
        note: 'Soy allergen disclosure; declared on label.'
      }
    ],
    consumerGuidance: [
      {
        targetGroup: 'General',
        status: 'Standard',
        summary: 'Sweet baked confectionery containing choco chips and refined flour.',
        details: [
          'High carbohydrate and sugar density (30.4g sugar / 100g).',
          'Recommended serving: 25g (approx 3 cookies).',
          'Nutritional indicators are informational; please review full ingredient list.'
        ]
      },
      {
        targetGroup: 'Children',
        status: 'Moderate Concern',
        summary: 'Appealing taste profile; moderation advised regarding daily refined sugar thresholds.',
        details: [
          'Limit intake between meals to maintain oral dental hygiene.',
          'Informational note: Sweet snack treat, not intended as a meal substitute.'
        ]
      },
      {
        targetGroup: 'Pregnancy',
        status: 'Informational Notice',
        summary: 'Conventional baked biscuit; verify personal dietary sugar targets with physician.',
        details: [
          'Monitor gestational glucose tolerances if applicable.',
          'Health insights are informational and are not medical advice.'
        ]
      }
    ],
    priceQuantity: {
      hasReference: false,
      currentQuantity: '400 g',
      currentMrp: '₹100.00',
      unitPriceCurrent: '₹0.25 / g',
      status: 'UNAVAILABLE',
      note: 'Reference comparison unavailable. No historical 400g multipack benchmark found in database; baseline established as ₹0.25/g.'
    }
  },

  // =========================================================================
  // PRODUCT 4: MTR Special Garam Masala
  // =========================================================================
  {
    id: 'mtr-garam-masala',
    name: 'MTR Special Garam Masala',
    brand: 'MTR',
    category: 'Spices / Masala',
    subCategory: 'Proprietary Food — Spice Mix (Powder)',
    foodType: 'Vegetarian',
    foodTypeConfidence: {
      tier: 'High',
      percentageText: 'High (Sample / Illustrative)',
      source: 'Front PDP bottom right & Back panel top left (Standardized Green Dot in Square)'
    },
    surfaces: {
      front: '/assets/mtr_garam_masala_front.png',
      back: '/assets/mtr_garam_masala_back.png',
      innovationIngredients: '/assets/mtr_garam_masala_ingredients.png'
    },
    extractedFields: {
      productName: {
        label: 'Product Name',
        rawValue: 'MTR *Special Garam Masala Powder Meal Time',
        structuredValue: 'MTR Special Garam Masala',
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front PDP' },
        status: 'Detected'
      },
      brand: {
        label: 'Brand / Trademark',
        rawValue: 'MTR PURE AND PERFECT SINCE 1924',
        structuredValue: 'MTR Foods Pvt. Ltd.',
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front oval badge' },
        status: 'Detected'
      },
      category: {
        label: 'Category',
        rawValue: 'Proprietary Food: Spice Mix',
        structuredValue: 'Proprietary Food — Spice Mix',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back panel lower left' },
        status: 'Detected'
      },
      mrp: {
        label: 'Maximum Retail Price (MRP)',
        rawValue: 'MRP: ₹ (incl. of all taxes) [White stamp box]',
        structuredValue: '₹ (Print stamp box blank on sample foil)',
        sourceSurface: 'Back',
        confidence: { tier: 'Low', percentageText: 'Low (Sample / Illustrative)', source: 'Back white stamp box' },
        status: 'Needs Review'
      },
      netQuantity: {
        label: 'Net Quantity',
        rawValue: 'Net Quantity: 50 g',
        structuredValue: '50 g',
        sourceSurface: 'Front',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front PDP bottom left & Back' },
        status: 'Detected'
      },
      manufacturer: {
        label: 'Manufacturer & Packer',
        rawValue: 'Manufactured & Packed by: MTR FOODS PVT. LTD., #80, Bommasandra Indl. Area, Hebbagodi, Anekal Taluk, Bengaluru-560 099, INDIA. BRC Certified Company',
        structuredValue: 'MTR Foods Pvt. Ltd., Hebbagodi, Bengaluru - 560099, India',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back declaration' },
        status: 'Detected'
      },
      consumerCare: {
        label: 'Consumer Care Redressal',
        rawValue: 'Feedback and Queries: Write to "Customer Care Cell" at Manufacturer\'s Address or call on toll free customer care no. 1800-103-7455, Email us at feedback@mtrfoods.com, Visit us at www.mtrfoods.com',
        structuredValue: 'Toll-free: 1800-103-7455 | Email: feedback@mtrfoods.com | Web: www.mtrfoods.com',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back consumer card' },
        status: 'Detected'
      },
      fssaiLicense: {
        label: 'FSSAI License Number',
        rawValue: 'fssai Lic. No. 10012043000145',
        structuredValue: '10012043000145',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back FSSAI emblem' },
        status: 'Detected'
      },
      dates: {
        label: 'Date Declarations',
        rawValue: 'BEST BEFORE 12 MONTHS FROM MANUFACTURE / Lot No.: / Mfd: [Thermal imprint box]',
        structuredValue: 'Best before 12 months from manufacture (Lot stamp verification required)',
        sourceSurface: 'Back',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Back declaration box' },
        status: 'Detected'
      }
    },
    fontAnalysis: [
      {
        id: 'fa-m1',
        field: 'Front Net Quantity Font Height',
        detectedText: 'Net Quantity: 50 g',
        estimatedHeightMm: 3.5,
        minRequiredMm: 2.0,
        areaPdpCm2: 260,
        applicableRule: 'Legal Metrology Rules 2011, Table I - Minimum numeral height for solid products <= 50g',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 110, y: 865, width: 170, height: 26 },
        note: 'Physical font-size verification requires calibrated image/package dimensions.'
      },
      {
        id: 'fa-m2',
        field: 'Toll-Free Phone Number Height',
        detectedText: '1800-103-7455',
        estimatedHeightMm: 2.8,
        minRequiredMm: 1.5,
        areaPdpCm2: 260,
        applicableRule: 'Rule 6(1)(e) - Consumer Care telephone legibility',
        status: 'PASS',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 585, y: 535, width: 200, height: 28 },
        note: 'Prominent bold dark red text on high-contrast white card container.'
      },
      {
        id: 'fa-m3',
        field: 'Batch & MRP Thermal Stamping Box',
        detectedText: 'BEST BEFORE 12 MONTHS FROM MANUFACTURE | Lot No: | Mfd: | MRP: ₹',
        estimatedHeightMm: 2.2,
        minRequiredMm: 2.0,
        areaPdpCm2: 260,
        applicableRule: 'Rule 9(1) - Minimum numeral height for retail sale price',
        status: 'WARNING',
        measurementStatus: 'Estimated from image geometry',
        boundingBox: { x: 715, y: 610, width: 170, height: 340 },
        note: 'Pre-printed template box is compliant; live numerical values must be verified on packaged retail lot.'
      }
    ],
    complianceChecks: [
      {
        id: 'comp-m1',
        category: 'Mandatory Declarations',
        title: 'MRP Stamping & Inclusion of All Taxes',
        ruleReference: 'Rule 6(1)(da) - Legal Metrology Rules, 2011',
        status: 'WARNING',
        detectedValue: 'Pre-printed template: "MRP: ₹ (incl. of all taxes)"',
        evidenceSnippet: 'Thermal stamp window on lower right has pre-printed prompt with unprinted actual price value on sample.',
        source: 'Back panel lower right white card',
        confidence: { tier: 'Low', percentageText: 'Low (Sample / Illustrative)', source: 'Visual OCR' },
        explanation: 'Mandatory statutory phrase "(incl. of all taxes)" is pre-printed, but actual retail figure must be verified on stamped lot.',
        recommendation: 'Manual verification recommended to confirm active batch stamping on retail units.'
      },
      {
        id: 'comp-m2',
        category: 'Net Quantity',
        title: 'Net Quantity Declaration in Metric Units',
        ruleReference: 'Rule 6(1)(b) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'Net Quantity: 50 g',
        evidenceSnippet: '"Net Quantity: 50 g" printed conspicuously on Front PDP lower left and Back panel above crossed box.',
        source: 'Front & Back package surfaces',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Front & Back OCR' },
        explanation: 'Metric symbol "g" declared in accordance with Seventh Schedule commodities standards.'
      },
      {
        id: 'comp-m3',
        category: 'Manufacturer / Packer',
        title: 'Complete Registered Manufacturer Address',
        ruleReference: 'Rule 6(1)(a) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'MTR Foods Pvt. Ltd., #80, Bommasandra Indl. Area, Hebbagodi, Bengaluru-560 099',
        evidenceSnippet: '"Manufactured & Packed by: MTR FOODS PVT. LTD., #80, Bommasandra Indl. Area... Bengaluru-560 099, INDIA."',
        source: 'Back vertical declaration panel',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Full industrial plot address, taluk, city, and pincode provided.'
      },
      {
        id: 'comp-m4',
        category: 'Consumer Care',
        title: 'Customer Care Cell Direct Access',
        ruleReference: 'Rule 6(1)(e) - Legal Metrology Rules, 2011',
        status: 'PASS',
        detectedValue: 'Toll-free 1800-103-7455, feedback@mtrfoods.com, www.mtrfoods.com',
        evidenceSnippet: '"Feedback and Queries: Write to Customer Care Cell... call on toll free customer care no. 1800-103-7455"',
        source: 'Back customer card box',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Toll-free telephone line, email address, postal address, and web portal all present.'
      },
      {
        id: 'comp-m5',
        category: 'Date Declarations',
        title: 'Best Before Declaration Relative to Manufacture',
        ruleReference: 'Rule 6(1)(d) & FSSAI Labelling Regulations',
        status: 'PASS',
        detectedValue: 'BEST BEFORE 12 MONTHS FROM MANUFACTURE',
        evidenceSnippet: '"BEST BEFORE 12 MONTHS FROM MANUFACTURE" printed vertically in bold black uppercase in stamp box.',
        source: 'Back batch imprint box',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'OCR extraction' },
        explanation: 'Validity period is explicit and compliant with dry spice shelf stability rules.'
      },
      {
        id: 'comp-m6',
        category: 'Food Classification',
        title: 'Vegetarian Food Symbol Verification',
        ruleReference: 'FSSAI Packaging Regulations & LM Rule 6',
        status: 'PASS',
        detectedValue: 'Green dot in square box',
        evidenceSnippet: 'Standardized green dot visible on Front PDP (bottom right) and Back panel (top left).',
        source: 'Front & Back package surfaces',
        confidence: { tier: 'High', percentageText: 'High (Sample / Illustrative)', source: 'Vision symbol matcher' },
        explanation: 'Conforms to food safety green dot specification for 100% vegetarian culinary spice blends.'
      }
    ],
    overallCompliance: {
      status: 'WARNING',
      summary: '5 declarations compliant; 1 review required for retail thermal batch stamping verification on physical lot.',
      passedCount: 5,
      warningCount: 1,
      violationCount: 0,
      notDetectedCount: 0
    },
    nutrition: {
      servingSizeG: 5,
      defaultServingLabel: 'Per Serve (5g approx 1 tsp)',
      items: [
        { name: 'Energy (Calories)', unit: 'kcal', per100g: 335, perServe: 16.7, thresholdCategory: 'calories', thresholdStatus: 'green', thresholdExplanation: 'Minimal caloric impact per single culinary portion (~17 kcal).' },
        { name: 'Protein', unit: 'g', per100g: 11.2, perServe: 0.56, thresholdCategory: 'neutral' },
        { name: 'Carbohydrates', unit: 'g', per100g: 48.0, perServe: 2.4, thresholdCategory: 'neutral' },
        { name: 'Total Sugars', unit: 'g', per100g: 2.1, perServe: 0.1, thresholdCategory: 'sugar', thresholdStatus: 'green', thresholdExplanation: 'Negligible natural sugar from spices.' },
        { name: 'Total Fat', unit: 'g', per100g: 10.5, perServe: 0.52, thresholdCategory: 'fat', thresholdStatus: 'green', thresholdExplanation: 'Natural essential plant oils from whole spices.' },
        { name: 'Saturated Fat', unit: 'g', per100g: 1.8, perServe: 0.09, thresholdCategory: 'fat', thresholdStatus: 'green' },
        { name: 'Trans Fat', unit: 'g', per100g: 0.0, perServe: 0.0, thresholdCategory: 'fat', thresholdStatus: 'green' },
        { name: 'Sodium', unit: 'mg', per100g: 1150, perServe: 57.5, thresholdCategory: 'sodium', thresholdStatus: 'green', thresholdExplanation: 'Contains small amount of salt as natural spice carrier.' }
      ]
    },
    ingredientsList: 'Coriander (34%), Cumin, Cassia, Red Chilli, Black Pepper, Bay Leaves, Clove, Cardamom, Star Anise, Fennel, Dry Ginger, Salt, Caraway, Triphal.',
    additivesAndPreservatives: [],
    allergens: [
      {
        allergen: 'Coriander & Spices',
        detectedSource: 'Detected in ingredients (Coriander 34%, Cumin, Cassia)',
        riskLevel: 'Present in Ingredients',
        note: 'Pure blend of whole ground aromatic spices; free from synthetic additives.'
      }
    ],
    consumerGuidance: [
      {
        targetGroup: 'General',
        status: 'Standard',
        summary: 'Traditional whole-spice aromatic masala blend for culinary seasoning.',
        details: [
          '100% natural spice formulation with 0 synthetic additives or preservatives.',
          'Culinary seasoning typically dispersed across 4 to 6 servings per dish.',
          'Nutritional indicators are informational; please review full ingredient list.'
        ]
      },
      {
        targetGroup: 'Children',
        status: 'Standard',
        summary: 'Contains warm spices (Red Chilli, Black Pepper, Ginger).',
        details: [
          'Adjust pinch quantities in home cooking according to mild heat tolerance of children.',
          'Informational note: Seasoning spice powder, not consumed directly.'
        ]
      },
      {
        targetGroup: 'Pregnancy',
        status: 'Standard',
        summary: 'Traditional culinary seasoning spices.',
        details: [
          'Standard food grade spices in regular culinary dishes are generally well tolerated.',
          'Health insights are informational and are not medical advice.'
        ]
      }
    ],
    priceQuantity: {
      hasReference: false,
      currentQuantity: '50 g',
      currentMrp: '₹ (Unstamped on sample)',
      unitPriceCurrent: 'Reference comparison unavailable',
      status: 'UNAVAILABLE',
      note: 'Reference comparison unavailable. No historical benchmark data exists for this specific batch code in database.'
    }
  }
];

export const SAMPLE_INSPECTION_HISTORY: Array<{
  id: string;
  date: string;
  productId: string;
  productName: string;
  brand: string;
  category: string;
  foodType: string;
  complianceStatus: 'PASS' | 'WARNING' | 'POTENTIAL_VIOLATION';
  reviewItemsCount: number;
  inspectorRole: string;
  summary: string;
}> = [
  {
    id: 'INS-2026-0920-001',
    date: '20 Sep 2026, 11:20 AM',
    productId: 'kurkure-masala-munch',
    productName: 'Kurkure Masala Munch',
    brand: 'Kurkure (PepsiCo)',
    category: 'Snack / Namkeen',
    foodType: 'Vegetarian',
    complianceStatus: 'WARNING',
    reviewItemsCount: 1,
    inspectorRole: 'Packaged Commodity Inspector',
    summary: 'Batch imprint legibility verification required on physical retail unit.'
  },
  {
    id: 'INS-2026-0920-002',
    date: '20 Sep 2026, 11:45 AM',
    productId: 'parle-happy-happy',
    productName: 'Parle Happy Happy Choco-Chip Cookies',
    brand: 'Parle',
    category: 'Biscuits / Cookies',
    foodType: 'Vegetarian',
    complianceStatus: 'PASS',
    reviewItemsCount: 0,
    inspectorRole: 'Packaged Commodity Inspector',
    summary: 'Full compliance verified under Legal Metrology Rules 2011; combination multipack rules met.'
  },
  {
    id: 'INS-2026-0920-003',
    date: '20 Sep 2026, 12:15 PM',
    productId: 'lays-cream-onion',
    productName: "Lay's American Style Cream & Onion",
    brand: "Lay's (PepsiCo)",
    category: 'Potato Chips',
    foodType: 'Vegetarian',
    complianceStatus: 'WARNING',
    reviewItemsCount: 1,
    inspectorRole: 'Packaged Commodity Inspector',
    summary: 'Unprinted thermal stamping box requires offline physical batch check.'
  },
  {
    id: 'INS-2026-0920-004',
    date: '20 Sep 2026, 12:40 PM',
    productId: 'mtr-garam-masala',
    productName: 'MTR Special Garam Masala',
    brand: 'MTR',
    category: 'Spices / Masala',
    foodType: 'Vegetarian',
    complianceStatus: 'WARNING',
    reviewItemsCount: 1,
    inspectorRole: 'Packaged Commodity Inspector',
    summary: 'Spice packaging rules verified; active retail stamp inspection recommended.'
  }
];
