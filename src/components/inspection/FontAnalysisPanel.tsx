import React from 'react';
import { FontAnalysisItem } from '../../types/inspection';
import { StatusBadge } from '../shared/StatusBadge';
import { AlertTriangle, Box } from 'lucide-react';

interface FontAnalysisPanelProps {
  items: FontAnalysisItem[];
  productName?: string;
}

export const FontAnalysisPanel: React.FC<FontAnalysisPanelProps> = ({ items }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Calibration Notice Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.85rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--status-warning-bg)',
          border: '1px solid var(--status-warning-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)'
        }}
      >
        <AlertTriangle size={20} color="var(--status-warning-text)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--status-warning-text)' }}>
            Calibration & Dimension Advisory
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Font dimensions are estimated from bounding-box geometry and pixel density relative to detected package boundaries.
            <strong> Physical font-size verification requires calibrated image/package dimensions</strong> before statutory enforcement proceedings.
          </span>
        </div>
      </div>

      {/* Font Analysis Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Box size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.field}</span>
                </div>
                <StatusBadge status={item.status} size="sm" />
              </div>

              {/* Detected Text Snippet */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)'
                }}
              >
                "{item.detectedText}"
              </div>

              {/* Measurement Matrix */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.65rem',
                  fontSize: '0.78rem',
                  padding: '0.65rem 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Estimated Font Height:</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                    ≈ {item.estimatedHeightMm.toFixed(1)} mm
                  </div>
                </div>

                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Statutory Min Requirement:</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {item.minRequiredMm.toFixed(1)} mm
                  </div>
                </div>
              </div>

              {/* Geometry & Rule Detail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.74rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Bounding Box:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>
                    [{item.boundingBox.x}, {item.boundingBox.y}, {item.boundingBox.width}x{item.boundingBox.height}px]
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Measurement Status:</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{item.measurementStatus}</span>
                </div>

                <div style={{ marginTop: '0.3rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Rule Reference: </strong>
                  {item.applicableRule}
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                  {item.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
