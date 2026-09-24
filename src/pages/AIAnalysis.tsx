import React from 'react';
import { useProduct } from '../context/ProductContext';
import { useInspection } from '../context/InspectionContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { FoodTypeBadge } from '../components/shared/FoodTypeBadge';
import { Play, Loader2 } from 'lucide-react';

export const AIAnalysis: React.FC = () => {
  const { selectedProduct, products, selectProduct } = useProduct();
  const { pipelineStages, analysisProgress, isAnalyzing, runAnalysis } = useInspection();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.25rem 1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
              Multi-Stage Architecture
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Inference Orchestration
            </span>
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            AI Vision & Compliance Pipeline
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Sequential breakdown of neural models, OCR extraction, bounding-box geometry, and Legal Metrology rules.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={selectedProduct.id}
            onChange={(e) => selectProduct(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => runAnalysis(selectedProduct)}
            disabled={isAnalyzing}
            className="btn btn-primary"
            style={{ fontSize: '0.82rem', fontWeight: 600 }}
          >
            {isAnalyzing ? (
              <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
            {isAnalyzing ? 'Executing Pipeline...' : 'Run Pipeline Simulation'}
          </button>
        </div>
      </div>

      {/* Real-time Progress Bar */}
      {isAnalyzing && (
        <div className="card" style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Live Inference Execution</span>
            <span style={{ fontWeight: 700 }}>{analysisProgress}%</span>
          </div>
          <div
            style={{
              height: '8px',
              backgroundColor: 'var(--bg-app)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${analysisProgress}%`,
                backgroundColor: 'var(--primary)',
                transition: 'width 250ms ease'
              }}
            />
          </div>
        </div>
      )}

      {/* Pipeline Stages Vertical Tree */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Stage 1: Quality Check */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[0]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[0]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">01</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Image Quality & Planar Assessment</h4>
            </div>
            {pipelineStages[0]?.status === 'active' ? (
              <span className="badge badge-warning">ANALYZING...</span>
            ) : (
              <StatusBadge status="PASS" size="sm" />
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            High-resolution frontal and dorsal surfaces verified. Contrast ratio 94.2%, illumination variance minimal, zero specular glare over mandatory statutory panels.
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Surfaces Evaluated: Front ({selectedProduct.id}_front.png) & Back ({selectedProduct.id}_back.png)
          </div>
        </div>

        {/* Stage 2: Computer Vision Region Detection */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[1]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[1]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">02</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Computer Vision Region Segmentation</h4>
            </div>
            {pipelineStages[1]?.status === 'active' ? (
              <span className="badge badge-warning">SEGMENTING...</span>
            ) : (
              <StatusBadge status="PASS" size="sm" />
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Segmented Principal Display Panel (PDP), declaration block, barcode zone, ingredients matrix, and nutritional facts panel into discrete spatial coordinate zones.
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Spatial Bounding: 5 discrete functional declaration zones identified.
          </div>
        </div>

        {/* Stage 3: OCR Text Recognition */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[2]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[2]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">03</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Optical Character Recognition (OCR) Engine</h4>
            </div>
            {pipelineStages[2]?.status === 'active' ? (
              <span className="badge badge-warning">EXTRACTING...</span>
            ) : (
              <StatusBadge status="PASS" size="sm" />
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Extracted text tokens with baseline angle normalization and punctuation recovery.
          </p>
          <div
            style={{
              padding: '0.65rem',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            Tokens extracted: MRP, NET QTY, MFD BY, CONSUMER CARE, FSSAI, INGREDIENTS, NUTRITION.
          </div>
        </div>

        {/* Stage 4: NLP / Information Extraction */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[3]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[3]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">04</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>NLP Semantic Information Extraction</h4>
            </div>
            {pipelineStages[3]?.status === 'active' ? (
              <span className="badge badge-warning">PARSING...</span>
            ) : (
              <StatusBadge status="PASS" size="sm" />
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Mapped unformatted OCR strings to structured statutory attributes: MRP ({selectedProduct.extractedFields.mrp?.structuredValue}),
            Net Qty ({selectedProduct.extractedFields.netQuantity?.structuredValue}), Manufacturer, and FSSAI License ({selectedProduct.extractedFields.fssaiLicense?.structuredValue}).
          </p>
        </div>

        {/* Stage 5: Food Symbol Detection */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[4]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[4]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">05</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Standardized Food Classification Symbol</h4>
            </div>
            <FoodTypeBadge foodType={selectedProduct.foodType} confidence={selectedProduct.foodTypeConfidence} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Detected standardized FSSAI food symbol: green circle within square border. Classified without relying solely on textual ingredient inference.
          </p>
        </div>

        {/* Stage 6: Font Geometry & Dimension Analysis */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[5]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[5]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">06</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Font Dimension & Geometry Estimation</h4>
            </div>
            <span className="badge badge-warning">Advisory Note</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Numeral heights evaluated against Legal Metrology Rules 2011 First Schedule Table I.
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            * Note: Estimated from image geometry. Physical font-size verification requires calibrated image/package dimensions.
          </div>
        </div>

        {/* Stage 7: Legal Metrology Compliance Engine */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[6]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[6]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">07</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Legal Metrology (Packaged Commodities) Rules, 2011</h4>
            </div>
            <StatusBadge status={selectedProduct.overallCompliance.status} size="sm" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Screened all 6 statutory clauses: MRP, Net Quantity, Registered Manufacturer, Consumer Care, Date declarations, and Food Classification.
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            AI-assisted screening; final regulatory determination requires appropriate manual verification.
          </div>
        </div>

        {/* Stage 8: Health & Nutrition Analysis */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            borderLeft: `4px solid ${
              pipelineStages[7]?.status === 'completed'
                ? 'var(--status-pass-text)'
                : pipelineStages[7]?.status === 'active'
                ? 'var(--primary)'
                : 'var(--border-subtle)'
            }`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-pass">08</span>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Health & Nutrition Consumer Innovation Layer</h4>
            </div>
            <StatusBadge status="PASS" size="sm" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Extracted nutritional table and calculated portion scaling across calories, sugars, fats, and sodium. Configured traffic-light indicators active.
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Health insights are informational and are not medical advice.
          </div>
        </div>
      </div>
    </div>
  );
};
