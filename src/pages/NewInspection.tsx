import React from 'react';
import { useProduct } from '../context/ProductContext';
import { useInspection, InspectionStep } from '../context/InspectionContext';
import { InspectionStepper } from '../components/inspection/InspectionStepper';
import { PackageImageCard } from '../components/inspection/PackageImageCard';
import { AIProcessingStage } from '../components/inspection/AIProcessingStage';
import { OCRTransformTable } from '../components/inspection/OCRTransformTable';
import { FontAnalysisPanel } from '../components/inspection/FontAnalysisPanel';
import { ComplianceChecklist } from '../components/inspection/ComplianceChecklist';
import { NutritionSlider } from '../components/inspection/NutritionSlider';
import { ReportPreview } from '../components/inspection/ReportPreview';
import { Play, ArrowLeft, ArrowRight, RotateCcw, PackageCheck } from 'lucide-react';

export const NewInspection: React.FC = () => {
  const { products, selectedProduct, selectProduct } = useProduct();
  const {
    currentStep,
    setCurrentStep,
    isAnalyzing,
    runAnalysis,
    resetInspection
  } = useInspection();

  const handleNext = () => {
    if (currentStep === 1) {
      runAnalysis(selectedProduct);
    } else if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as InspectionStep);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as InspectionStep);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Product Selection Toolbar */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
          >
            <img
              src={selectedProduct.surfaces.front}
              alt={selectedProduct.name}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Selected Target Product:
              </span>
              <span className="badge badge-pass" style={{ fontSize: '0.65rem' }}>Authoritative Sample</span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedProduct.name}
            </h2>
          </div>
        </div>

        {/* Product Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Switch Product:
          </label>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              selectProduct(e.target.value);
              resetInspection();
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>

          <button
            onClick={resetInspection}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
            title="Reset inspection workflow"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* 6-Step Workflow Stepper */}
      <InspectionStepper currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />

      {/* Step Content Rendering */}
      <div style={{ minHeight: '400px' }}>
        {currentStep === 1 && <PackageImageCard product={selectedProduct} />}

        {currentStep === 2 && <AIProcessingStage />}

        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <OCRTransformTable product={selectedProduct} />
            <FontAnalysisPanel items={selectedProduct.fontAnalysis} productName={selectedProduct.name} />
          </div>
        )}

        {currentStep === 4 && <ComplianceChecklist product={selectedProduct} />}

        {currentStep === 5 && <NutritionSlider product={selectedProduct} />}

        {currentStep === 6 && <ReportPreview product={selectedProduct} />}
      </div>

      {/* Bottom Step Navigation Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-card)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <button
          onClick={handlePrev}
          disabled={currentStep === 1 || isAnalyzing}
          className="btn btn-secondary"
          style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
        >
          <ArrowLeft size={16} />
          Previous Step
        </button>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Inspection Step {currentStep} of 6
        </div>

        {currentStep === 1 ? (
          <button
            onClick={() => runAnalysis(selectedProduct)}
            disabled={isAnalyzing}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.35rem', fontWeight: 600 }}
          >
            <Play size={16} fill="currentColor" />
            Run AI Analysis
          </button>
        ) : currentStep < 6 ? (
          <button
            onClick={handleNext}
            disabled={isAnalyzing}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.35rem', fontWeight: 600 }}
          >
            Proceed to Step {currentStep + 1}
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={resetInspection}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.35rem' }}
          >
            <PackageCheck size={16} />
            Start Another Inspection
          </button>
        )}
      </div>
    </div>
  );
};
