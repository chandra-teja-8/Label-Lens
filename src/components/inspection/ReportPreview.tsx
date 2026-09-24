import React from 'react';
import { SampleProduct } from '../../types/inspection';
import { StatusBadge } from '../shared/StatusBadge';
import { FoodTypeBadge } from '../shared/FoodTypeBadge';
import { Printer, Download } from 'lucide-react';

interface ReportPreviewProps {
  product: SampleProduct;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ product }) => {
  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  const reportId = `LL-INSP-${Date.now().toString().slice(-6)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Action Bar */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-card)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Inspection Report Document</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Statutory report ready for download, offline export, or archival verification.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handlePrint} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
            <Printer size={15} />
            Print Report
          </button>
          <button onClick={handlePrint} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
            <Download size={15} />
            Export Document
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div
        className="card report-print-sheet"
        style={{
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-default)'
        }}
      >
        {/* Report Document Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px solid var(--border-default)',
            paddingBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em'
                }}
              >
                LabelLens
              </span>
              <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                Inspection Report
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Packaged Commodity Legal Metrology Compliance Inspection
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Reference: Legal Metrology (Packaged Commodities) Rules, 2011
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {reportId}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Timestamp: {timestamp}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Inspector Role: Packaged Commodity Inspector
            </span>
          </div>
        </div>

        {/* Executive Summary Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Product Name</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {product.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.category}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Food Classification</div>
            <div style={{ marginTop: '4px' }}>
              <FoodTypeBadge foodType={product.foodType} confidence={product.foodTypeConfidence} showDetails={false} />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Screening Verdict</div>
            <div style={{ marginTop: '4px' }}>
              <StatusBadge status={product.overallCompliance.status} size="lg" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rules Checked</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {product.overallCompliance.passedCount} / {product.complianceChecks.length} Passed
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--status-warning-text)' }}>
              {product.overallCompliance.warningCount} Manual Review Item(s)
            </div>
          </div>
        </div>

        {/* Multi-Surface Images Audit Strip */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
            Multi-Surface Package Image Record
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-app)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>Principal Display Panel (Front)</div>
              <img src={product.surfaces.front} alt="Front" style={{ height: '180px', objectFit: 'contain' }} />
            </div>

            <div
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-app)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>Statutory Declaration Panel (Back)</div>
              <img src={product.surfaces.back} alt="Back" style={{ height: '180px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        {/* Extracted Declarations Table */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
            Statutory Declarations Audit Table
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-default)', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem 0.85rem' }}>Mandatory Field</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Extracted Value</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Confidence</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(product.extractedFields).map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.6rem 0.85rem', fontWeight: 600 }}>{v.label}</td>
                  <td style={{ padding: '0.6rem 0.85rem' }}>{v.structuredValue}</td>
                  <td style={{ padding: '0.6rem 0.85rem', color: 'var(--text-muted)' }}>{v.confidence.tier}</td>
                  <td style={{ padding: '0.6rem 0.85rem' }}><StatusBadge status={v.status} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legal Metrology Findings & Evidence */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
            Compliance Checklist & Evidence Log
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {product.complianceChecks.map((check) => (
              <div
                key={check.id}
                style={{
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card-subtle)',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{check.title}</strong>
                  <StatusBadge status={check.status} size="sm" />
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <strong>Statutory Ref:</strong> {check.ruleReference} | <strong>Source:</strong> {check.source}
                </div>
                <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Evidence: "{check.evidenceSnippet}"
                </div>
                <div style={{ marginTop: '0.3rem', color: 'var(--text-secondary)' }}>
                  {check.explanation}
                </div>
                {check.recommendation && (
                  <div style={{ marginTop: '0.2rem', color: 'var(--status-warning-text)' }}>
                    <strong>Action:</strong> {check.recommendation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Font Geometry Summary */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
            Font Dimension Estimates
          </h4>
          <div
            style={{
              padding: '0.85rem',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem'
            }}
          >
            <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              * Estimated from image geometry. Physical font-size verification requires calibrated image/package dimensions.
            </div>
            {product.fontAnalysis.map((fa) => (
              <div key={fa.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                <span>{fa.field}</span>
                <span>Est: ≈ {fa.estimatedHeightMm} mm (Req: {fa.minRequiredMm} mm)</span>
                <StatusBadge status={fa.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Regulatory Disclaimer Footer */}
        <div
          style={{
            borderTop: '2px solid var(--border-default)',
            paddingTop: '1rem',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            lineHeight: 1.45
          }}
        >
          <p>
            <strong>Regulatory Redaction Notice: </strong>This inspection record is generated by LabelLens as an AI-assisted packaged commodity screening tool. Findings reflect algorithmic detection against the provisions of the Legal Metrology (Packaged Commodities) Rules, 2011 and relevant FSSAI labelling directives. It does not constitute a legally binding judicial determination; final enforcement measures require appropriate physical sampling and manual verification.
          </p>
        </div>
      </div>
    </div>
  );
};
