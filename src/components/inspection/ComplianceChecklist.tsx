import React from 'react';
import { SampleProduct } from '../../types/inspection';
import { StatusBadge } from '../shared/StatusBadge';
import { ShieldCheck, Info, Scale, HelpCircle } from 'lucide-react';

interface ComplianceChecklistProps {
  product: SampleProduct;
}

export const ComplianceChecklist: React.FC<ComplianceChecklistProps> = ({ product }) => {
  const { complianceChecks, overallCompliance, priceQuantity } = product;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Statutory Screening Advisory Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.4rem',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-default)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Legal Metrology Compliance Engine (Rules, 2011)
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Automated screening against mandatory declarations under the Legal Metrology (Packaged Commodities) Rules, 2011.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Screening Verdict
            </div>
            <div style={{ marginTop: '2px' }}>
              <StatusBadge status={overallCompliance.status} size="lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-card)',
          padding: '0.65rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <Info size={15} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Notice:</strong> AI-assisted compliance screening. Potential non-compliance flags indicate areas requiring confirmation; final regulatory determination requires appropriate manual verification.
        </span>
      </div>

      {/* Compliance Checklist Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {complianceChecks.map((item) => {
          return (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                borderLeft: `4px solid ${
                  item.status === 'PASS'
                    ? 'var(--status-pass-text)'
                    : item.status === 'WARNING'
                    ? 'var(--status-warning-text)'
                    : 'var(--status-violation-text)'
                }`
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        backgroundColor: 'var(--bg-card-subtle)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {item.ruleReference}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {item.title}
                  </h4>
                </div>

                <StatusBadge status={item.status} size="md" />
              </div>

              {/* Detected Value & Evidence Box */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Detected Value: </span>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.detectedValue}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                    <span>Source: <strong style={{ color: 'var(--text-secondary)' }}>{item.source}</strong></span>
                    <span>Confidence: <strong style={{ color: 'var(--primary)' }}>{item.confidence.percentageText}</strong></span>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.4rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Evidence Snippet: </span>
                  <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {item.evidenceSnippet}
                  </span>
                </div>
              </div>

              {/* Regulatory Analysis & Recommendation */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <p><strong>Screening Findings: </strong>{item.explanation}</p>
                {item.recommendation && (
                  <p style={{ marginTop: '0.35rem', color: 'var(--status-warning-text)' }}>
                    <strong>Action Required: </strong>{item.recommendation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price & Quantity Analysis Card */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Scale size={20} color="var(--primary)" />
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Price & Quantity Consistency Analysis</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Comparison of declared net quantity and retail pricing against historical benchmark references.
            </p>
          </div>
        </div>

        {priceQuantity.hasReference ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              backgroundColor: 'var(--bg-card-subtle)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Current Quantity:</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {priceQuantity.currentQuantity}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Ref: {priceQuantity.referenceQuantity}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Current MRP:</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {priceQuantity.currentMrp}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Ref: {priceQuantity.referenceMrp}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Unit Sale Price:</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {priceQuantity.unitPriceCurrent}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Ref: {priceQuantity.unitPriceReference}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Analysis Verdict:</div>
              <div style={{ marginTop: '4px' }}>
                <span className={`badge ${priceQuantity.status === 'NORMAL' ? 'badge-pass' : 'badge-warning'}`}>
                  {priceQuantity.status === 'NORMAL' ? 'Standard Consistency' : 'Quantity Variation Flag'}
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.3 }}>
                {priceQuantity.note}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-default)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <HelpCircle size={18} />
            <span>
              <strong>Reference comparison unavailable:</strong> No prior historical catalog or pricing reference data exists in the system for this SKU. Single-pack inspection relies solely on package-printed declarations.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
