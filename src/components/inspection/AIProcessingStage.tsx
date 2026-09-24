import React from 'react';
import { CheckCircle2, Loader2, Clock, Cpu } from 'lucide-react';
import { useInspection } from '../../context/InspectionContext';

export const AIProcessingStage: React.FC = () => {
  const { pipelineStages, analysisProgress, isAnalyzing } = useInspection();

  return (
    <div
      className="card"
      style={{
        padding: '2rem',
        maxWidth: '850px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}
        >
          {isAnalyzing ? (
            <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <Cpu size={24} />
          )}
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          {isAnalyzing ? 'Executing AI Inspection Pipeline...' : 'Analysis Pipeline Completed'}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Processing multi-surface images using Computer Vision, OCR, NLP extraction, font geometry estimation,
          and statutory Legal Metrology compliance rules.
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Pipeline Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{analysisProgress}%</span>
        </div>
        <div
          style={{
            height: '8px',
            width: '100%',
            backgroundColor: 'var(--bg-card-subtle)',
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
              borderRadius: 'var(--radius-full)',
              transition: 'width 250ms ease'
            }}
          />
        </div>
      </div>

      {/* Pipeline Stages Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '0.75rem',
          marginTop: '0.5rem'
        }}
      >
        {pipelineStages.map((stage, idx) => {
          const isDone = stage.status === 'completed';
          const isActive = stage.status === 'active';

          return (
            <div
              key={stage.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive
                  ? 'var(--primary-light)'
                  : isDone
                  ? 'var(--bg-card-subtle)'
                  : 'var(--bg-app)',
                border: `1px solid ${
                  isActive ? 'var(--primary)' : isDone ? 'var(--status-pass-border)' : 'var(--border-subtle)'
                }`,
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ marginTop: '2px', flexShrink: 0 }}>
                {isDone ? (
                  <CheckCircle2 size={18} color="var(--status-pass-text)" />
                ) : isActive ? (
                  <Loader2 size={18} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <Clock size={18} color="var(--text-muted)" />
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    0{idx + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--primary)' : isDone ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    {stage.name}
                  </span>
                </div>
                <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {stage.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
