import { SAMPLE_PRODUCTS, SAMPLE_INSPECTION_HISTORY } from '../data/sampleProducts';
import { SampleProduct, FoodType, ConfidenceRating, InspectionRecord, ComplianceStatus } from '../types/inspection';
import { notificationService } from './notificationService';

const STORAGE_KEY = 'labellens_inspections';
const EVENT_NAME = 'labellens:inspections_updated';

/**
 * Format timestamp into exact local date, local time, and canonical ISO string.
 * Example:
 *   Date: "24 Sep 2026"
 *   Time: "4:18 PM"
 *   createdAt: "2026-09-24T16:18:32.000Z"
 */
export function formatInspectionTimestamp(date: Date = new Date()): {
  inspectionDate: string;
  inspectionTime: string;
  createdAt: string;
} {
  const day = date.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const inspectionDate = `${day} ${month} ${year}`;

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const inspectionTime = `${hours}:${minutesStr} ${ampm}`;

  const createdAt = date.toISOString();

  return { inspectionDate, inspectionTime, createdAt };
}

/**
 * Generate a unique inspection ID in format LL-YYYYMMDD-XXX
 * Example: LL-20260924-001
 */
export function generateInspectionId(existingCount: number, date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const seq = String(existingCount + 1).padStart(3, '0');
  return `LL-${year}${month}${day}-${seq}`;
}

function getStoredInspections(): InspectionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read inspections from localStorage:', error);
    return [];
  }
}

function saveInspections(inspections: InspectionRecord[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
    notifyListeners();
    return true;
  } catch (error) {
    console.error('Failed to save inspections to localStorage:', error);
    return false;
  }
}

function notifyListeners(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }
}

export const inspectionService = {
  getInspections(): InspectionRecord[] {
    const list = getStoredInspections();
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getInspection(id: string): InspectionRecord | undefined {
    const list = getStoredInspections();
    return list.find((item) => item.id === id);
  },

  getRecentInspections(limit = 4): InspectionRecord[] {
    const list = this.getInspections();
    return list.slice(0, limit);
  },

  getInspectionStats(): {
    total: number;
    compliant: number;
    reviewRequired: number;
    violations: number;
  } {
    const list = getStoredInspections();
    const total = list.length;
    const compliant = list.filter((i) => i.complianceStatus === 'PASS').length;
    const reviewRequired = list.filter(
      (i) => i.complianceStatus === 'REVIEW_REQUIRED' || i.complianceStatus === 'WARNING' || i.reviewItems > 0
    ).length;
    const violations = list.filter((i) => i.complianceStatus === 'POTENTIAL_VIOLATION').length;

    return { total, compliant, reviewRequired, violations };
  },

  createInspection(
    product: SampleProduct,
    customImages?: { front?: string; back?: string; side?: string; topBottom?: string }
  ): InspectionRecord {
    const existing = getStoredInspections();
    const id = generateInspectionId(existing.length);
    const { inspectionDate, inspectionTime, createdAt } = formatInspectionTimestamp();

    // Map compliance status to standard format
    let complianceStatus: ComplianceStatus = 'PASS';
    if (product.overallCompliance.status === 'WARNING') {
      complianceStatus = 'REVIEW_REQUIRED';
    } else if (product.overallCompliance.status === 'POTENTIAL_VIOLATION') {
      complianceStatus = 'POTENTIAL_VIOLATION';
    } else if (product.overallCompliance.status === 'NOT_DETECTED') {
      complianceStatus = 'NOT_DETECTED';
    } else {
      complianceStatus = 'PASS';
    }

    const reviewItems = product.overallCompliance.warningCount || 0;
    const reportId = `LL-REP-${id.replace('LL-', '')}`;

    const newRecord: InspectionRecord = {
      id,
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      category: product.category,
      foodType: product.foodType,
      foodTypeConfidence: product.foodTypeConfidence,
      inspectionDate,
      inspectionTime,
      createdAt,
      complianceStatus,
      reviewItems,
      reviewItemsCount: reviewItems,
      findings: product.complianceChecks.length,
      packageImages: {
        front: customImages?.front || product.surfaces.front,
        back: customImages?.back || product.surfaces.back,
        side: customImages?.side || product.surfaces.side,
        topBottom: customImages?.topBottom || product.surfaces.topBottom
      },
      reportId,
      reportRefId: reportId,
      summary: product.overallCompliance.summary,
      inspectorRole: 'Packaged Commodity Inspector',
      isSample: false,
      snapshot: JSON.parse(JSON.stringify(product))
    };

    const updated = [newRecord, ...existing];
    const saved = saveInspections(updated);

    if (!saved) {
      throw new Error('Inspection could not be saved. Please try again.');
    }

    // Automatically generate notification from real application event
    try {
      if (complianceStatus === 'PASS') {
        notificationService.createNotification({
          type: 'inspection_completed',
          title: 'Inspection completed',
          message: `${product.name} inspection completed successfully.`,
          inspectionId: id,
          productId: product.id,
          createdAt
        });
      } else if (complianceStatus === 'REVIEW_REQUIRED') {
        const warningCheck = product.complianceChecks.find((c) => c.status === 'WARNING');
        const warningMessage = warningCheck
          ? `${warningCheck.title} for ${product.name} requires manual verification.`
          : `Declarations for ${product.name} require manual verification.`;

        notificationService.createNotification({
          type: 'review_required',
          title: 'Review required',
          message: warningMessage,
          inspectionId: id,
          productId: product.id,
          createdAt
        });
      } else if (complianceStatus === 'POTENTIAL_VIOLATION') {
        notificationService.createNotification({
          type: 'potential_violation',
          title: 'Potential violation detected',
          message: `One or more declarations require attention in the latest inspection for ${product.name}.`,
          inspectionId: id,
          productId: product.id,
          createdAt
        });
      }
    } catch (notifErr) {
      console.warn('Notification creation failed, but inspection was saved:', notifErr);
    }

    return newRecord;
  },

  deleteInspection(id: string): void {
    const list = getStoredInspections();
    const updated = list.filter((item) => item.id !== id);
    saveInspections(updated);
  },

  clearAllInspections(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      notifyListeners();
    } catch (e) {
      console.error('Failed to clear inspections:', e);
    }
  },

  /**
   * Load the 4 sample demonstration inspections (clearly marked as sample inspections)
   */
  loadSampleInspections(): void {
    const existing = getStoredInspections();
    // Only load if not already loaded
    const sampleIds = SAMPLE_INSPECTION_HISTORY.map((s) => s.id);
    const hasSamples = existing.some((e) => sampleIds.includes(e.id));
    if (hasSamples) return;

    const formattedSamples: InspectionRecord[] = SAMPLE_INSPECTION_HISTORY.map((sample, idx) => {
      const product = SAMPLE_PRODUCTS.find((p) => p.id === sample.productId);
      const [datePart, timePart] = sample.date.includes(',')
        ? sample.date.split(',').map((s) => s.trim())
        : [sample.date, '12:00 PM'];

      return {
        id: sample.id,
        productId: sample.productId,
        productName: sample.productName,
        brand: sample.brand,
        category: sample.category,
        foodType: sample.foodType as FoodType,
        foodTypeConfidence: product?.foodTypeConfidence,
        inspectionDate: datePart,
        inspectionTime: timePart,
        createdAt: new Date(Date.now() - (idx + 1) * 3600000 * 24).toISOString(),
        complianceStatus: sample.complianceStatus === 'WARNING' ? 'REVIEW_REQUIRED' : sample.complianceStatus,
        reviewItems: sample.reviewItemsCount,
        reviewItemsCount: sample.reviewItemsCount,
        findings: product?.complianceChecks.length || 6,
        packageImages: product?.surfaces,
        reportId: `LL-REP-${sample.id.replace('INS-', '')}`,
        reportRefId: `LL-REP-${sample.id.replace('INS-', '')}`,
        summary: sample.summary,
        inspectorRole: sample.inspectorRole,
        isSample: true,
        snapshot: product ? JSON.parse(JSON.stringify(product)) : undefined
      };
    });

    saveInspections([...existing, ...formattedSamples]);
  },

  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        callback();
      }
    });

    return () => {
      window.removeEventListener(EVENT_NAME, handler);
    };
  }
};

/**
 * Service abstraction for Computer Vision & OCR pipeline.
 * In a future phase, this connects to backend CV/OCR/NLP microservices (FastAPI / PyTorch).
 */
export async function analyzePackage(productId: string): Promise<SampleProduct> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with ID "${productId}" not found in authoritative dataset.`);
  }

  return JSON.parse(JSON.stringify(product));
}

export function detectFoodType(product: SampleProduct): {
  type: FoodType;
  confidence: ConfidenceRating;
  symbolAsset: string;
} {
  return {
    type: product.foodType,
    confidence: product.foodTypeConfidence,
    symbolAsset: product.foodType === 'Vegetarian' ? '/assets/veg_symbol.png' : '/assets/nonveg_symbol.png'
  };
}

export function generateReportSummary(product: SampleProduct, inspectionId: string) {
  const { inspectionDate, inspectionTime } = formatInspectionTimestamp();
  return {
    reportId: `LL-REP-${inspectionId}`,
    generatedAt: `${inspectionDate}, ${inspectionTime}`,
    productName: product.name,
    brand: product.brand,
    category: product.category,
    foodType: product.foodType,
    overallStatus: product.overallCompliance.status,
    totalChecks: product.complianceChecks.length,
    passedChecks: product.overallCompliance.passedCount,
    warningChecks: product.overallCompliance.warningCount,
    violationChecks: product.overallCompliance.violationCount,
    disclaimer: 'AI-assisted screening; final regulatory determination requires appropriate manual verification.'
  };
}
