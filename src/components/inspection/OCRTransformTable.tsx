import React from 'react';
import { SampleProduct } from '../../types/inspection';
import { StatusBadge } from '../shared/StatusBadge';
import { FoodTypeBadge } from '../shared/FoodTypeBadge';
import { ArrowRight, FileText } from 'lucide-react';

interface OCRTransformTableProps {
  product: SampleProduct;
}

export const OCRTransformTable: React.FC<OCRTransformTableProps> = ({ product }) => {
  const fields = Object.entries(product.extractedFields);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Summary Card */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>OCR & NLP Extraction Matrix</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Transformation of unformatted raw OCR label text into structured Legal Metrology declaration fields.
            </p>
          </div>
        </div>

        {/* Food Classification Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Standardized Food Classification:
          </span>
          <FoodTypeBadge foodType={product.foodType} confidence={product.foodTypeConfidence} />
        </div>
      </div>

      {/* Extraction Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderBottom: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)'
                }}
              >
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, width: '180px' }}>Declaration Field</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Raw OCR Label Text</th>
                <th style={{ width: '24px', padding: '0.85rem 0.25rem' }}></th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>Structured Extracted Value</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, width: '100px' }}>Surface</th>
                <th style={{ padding: '0.85rem 1.25rem', fontWeight: 600, width: '130px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {fields.map(([key, item], idx) => {
                return (
                  <tr
                    key={key}
                    style={{
                      borderBottom: idx < fields.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--bg-card-subtle)',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.label}
                    </td>

                    <td
                      style={{
                        padding: '0.85rem 1.25rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        maxWidth: '320px',
                        lineHeight: 1.4
                      }}
                    >
                      {item.rawValue}
                    </td>

                    <td style={{ padding: '0.85rem 0.25rem', textAlign: 'center' }}>
                      <ArrowRight size={14} color="var(--primary)" />
                    </td>

                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {item.structuredValue}
                    </td>

                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>
                        {item.sourceSurface}
                      </span>
                    </td>

                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
