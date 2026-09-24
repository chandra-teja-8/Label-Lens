import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { InspectionRecord, SampleProduct } from '../types/inspection';
import { inspectionService } from '../services/inspectionService';

export type InspectionStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface PipelineStage {
  id: string;
  name: string;
  detail: string;
  status: 'pending' | 'active' | 'completed';
}

interface InspectionContextType {
  currentStep: InspectionStep;
  setCurrentStep: (step: InspectionStep) => void;
  isAnalyzing: boolean;
  pipelineStages: PipelineStage[];
  analysisProgress: number;
  runAnalysis: (product?: SampleProduct) => Promise<InspectionRecord | null>;
  resetInspection: () => void;
  activeInspection: InspectionRecord | null;
  setActiveInspection: (record: InspectionRecord | null) => void;
  lastCreatedInspection: InspectionRecord | null;
  inspections: InspectionRecord[];
  refreshInspections: () => void;
  loadInspectionById: (id: string) => InspectionRecord | undefined;
}

const INITIAL_STAGES: PipelineStage[] = [
  { id: 'quality', name: 'Image Quality Assessment', detail: 'Verifying resolution, illumination, and planar alignment...', status: 'pending' },
  { id: 'cv_region', name: 'Computer Vision Region Detection', detail: 'Detecting Principal Display Panel (PDP) and label segments...', status: 'pending' },
  { id: 'ocr', name: 'Optical Character Recognition (OCR)', detail: 'Extracting text tokens, bounding coordinates, and numeral values...', status: 'pending' },
  { id: 'nlp', name: 'NLP & Information Extraction', detail: 'Mapping raw text tokens to statutory packaged commodity fields...', status: 'pending' },
  { id: 'symbol', name: 'Food Classification Detection', detail: 'Verifying standardized FSSAI Vegetarian / Non-Vegetarian symbol...', status: 'pending' },
  { id: 'font', name: 'Font Geometry & Dimension Analysis', detail: 'Estimating numeral heights against First Schedule thresholds...', status: 'pending' },
  { id: 'rules', name: 'Legal Metrology Compliance Engine', detail: 'Evaluating mandatory declarations under Rules 2011...', status: 'pending' },
  { id: 'nutrition', name: 'Health & Nutrition Analysis', detail: 'Calculating portion ratios and nutritional reference thresholds...', status: 'pending' }
];

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export const InspectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<InspectionStep>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(INITIAL_STAGES);

  const [activeInspection, setActiveInspection] = useState<InspectionRecord | null>(null);
  const [lastCreatedInspection, setLastCreatedInspection] = useState<InspectionRecord | null>(null);
  const [inspections, setInspections] = useState<InspectionRecord[]>(() =>
    inspectionService.getInspections()
  );

  const refreshInspections = useCallback(() => {
    setInspections(inspectionService.getInspections());
  }, []);

  useEffect(() => {
    if (inspectionService.getInspections().length === 0) {
      inspectionService.loadSampleInspections();
    }
    refreshInspections();
    const unsubscribe = inspectionService.subscribe(() => {
      refreshInspections();
    });
    return unsubscribe;
  }, [refreshInspections]);

  const resetInspection = useCallback(() => {
    setCurrentStep(1);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setPipelineStages(INITIAL_STAGES.map((s) => ({ ...s, status: 'pending' as const })));
  }, []);

  const runAnalysis = useCallback(async (product?: SampleProduct): Promise<InspectionRecord | null> => {
    setIsAnalyzing(true);
    setCurrentStep(2);
    setAnalysisProgress(5);

    const stagesCopy: PipelineStage[] = INITIAL_STAGES.map((s) => ({ ...s, status: 'pending' }));

    for (let i = 0; i < stagesCopy.length; i++) {
      stagesCopy[i].status = 'active';
      setPipelineStages([...stagesCopy]);
      setAnalysisProgress(Math.round(((i + 0.5) / stagesCopy.length) * 100));

      await new Promise((resolve) => setTimeout(resolve, 340));

      stagesCopy[i].status = 'completed';
      setPipelineStages([...stagesCopy]);
      setAnalysisProgress(Math.round(((i + 1) / stagesCopy.length) * 100));
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    let createdRecord: InspectionRecord | null = null;
    if (product) {
      try {
        createdRecord = inspectionService.createInspection(product);
        setLastCreatedInspection(createdRecord);
        setActiveInspection(createdRecord);
      } catch (err) {
        console.error('Error creating inspection record:', err);
      }
    }

    setIsAnalyzing(false);
    setCurrentStep(3); // Progress directly to Extracted Information
    return createdRecord;
  }, []);

  const loadInspectionById = useCallback((id: string) => {
    const record = inspectionService.getInspection(id);
    if (record) {
      setActiveInspection(record);
    }
    return record;
  }, []);

  return (
    <InspectionContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        isAnalyzing,
        pipelineStages,
        analysisProgress,
        runAnalysis,
        resetInspection,
        activeInspection,
        setActiveInspection,
        lastCreatedInspection,
        inspections,
        refreshInspections,
        loadInspectionById
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
};

export const useInspection = (): InspectionContextType => {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
};
