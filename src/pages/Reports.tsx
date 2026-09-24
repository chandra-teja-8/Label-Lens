import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { ReportPreview } from '../components/inspection/ReportPreview';
import { StatusBadge } from '../components/shared/StatusBadge';
import { FoodTypeBadge } from '../components/shared/FoodTypeBadge';
import { FileText, Printer, Eye } from 'lucide-react';

export const Reports: React.FC = () => {
  const { products, selectedProduct, selectProduct } = useProduct();
  const [viewMode, setViewMode] = useState<'list' | 'preview'>('preview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div
        className="card no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.25rem 1.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-pass" style={{ fontSize: '0.7rem' }}>
              Statutory Documentation
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Compliance Certificates
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            Inspection & Compliance Reports
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Official screening reports for packaged commodities under Legal Metrology Rules, 2011.
          </p>
        </div>

        {/* View Mode Switcher & Product Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)', padding: '3px' }}>
            <button
              onClick={() => setViewMode('preview')}
              className={`btn ${viewMode === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
            >
              <FileText size={14} />
              Certificate View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
            >
              <Eye size={14} />
              All Reports Directory
            </button>
          </div>

          {viewMode === 'preview' && (
            <select
              value={selectedProduct.id}
              onChange={(e) => selectProduct(e.target.value)}
              style={{
                padding: '0.45rem 0.9rem',
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
          )}
        </div>
      </div>

      {/* VIEW MODE 1: ALL REPORTS DIRECTORY TABLE */}
      {viewMode === 'list' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Archived Inspection Certificates</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              All packaged commodities currently audited in LabelLens. Click Inspect or View Certificate to examine details.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Report Code</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Product & Brand</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Food Classification</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Statutory Verdict</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Compliance Rate</th>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: idx < products.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--bg-card-subtle)'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--primary)' }}>
                      LL-CERT-2026-{p.id.slice(0, 3).toUpperCase()}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.brand} • {p.category}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <FoodTypeBadge foodType={p.foodType} confidence={p.foodTypeConfidence} showDetails={false} />
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <StatusBadge status={p.overallCompliance.status} size="sm" />
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {p.overallCompliance.passedCount} / {p.complianceChecks.length} Passed
                      </span>
                      {p.overallCompliance.warningCount > 0 && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--status-warning-text)' }}>
                          {p.overallCompliance.warningCount} Review Item
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            selectProduct(p.id);
                            setViewMode('preview');
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}
                        >
                          <Eye size={13} />
                          Certificate
                        </button>
                        <button
                          onClick={() => {
                            selectProduct(p.id);
                            setViewMode('preview');
                            setTimeout(() => window.print(), 100);
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}
                          title="Print directly"
                        >
                          <Printer size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: CERTIFICATE PREVIEW */}
      {viewMode === 'preview' && <ReportPreview product={selectedProduct} />}
    </div>
  );
};
