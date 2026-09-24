import React from 'react';
import { useProduct } from '../context/ProductContext';
import { useInspection } from '../context/InspectionContext';
import { SAMPLE_INSPECTION_HISTORY } from '../data/sampleProducts';
import { StatusBadge } from '../components/shared/StatusBadge';
import { FoodTypeBadge } from '../components/shared/FoodTypeBadge';
import { PlusCircle, ShieldCheck, AlertTriangle, ArrowRight, Package, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  onNavigate: (pageId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { products, selectedProduct, selectProduct } = useProduct();
  const { inspections, loadInspectionById } = useInspection();

  const recentInspections = inspections.length > 0 ? inspections.slice(0, 4) : SAMPLE_INSPECTION_HISTORY;

  // Calculate actual statistics from sample repository
  const totalProducts = products.length;
  const compliantCount = products.filter((p) => p.overallCompliance.status === 'PASS').length;
  const warningCount = products.filter((p) => p.overallCompliance.status === 'WARNING').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Welcome & Action Banner */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          padding: '1.75rem 2rem',
          background: 'var(--bg-card)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-pass" style={{ fontSize: '0.7rem' }}>
              Statutory Inspection Suite
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Legal Metrology (Packaged Commodities) Rules, 2011
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Packaged Commodity Inspection Dashboard
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            Automated label analysis powered by Computer Vision and OCR. Screen mandatory declarations,
            quantities, font heights, food classification symbols, and consumer nutritional disclosures.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onNavigate('new-inspection')}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', fontWeight: 600 }}
          >
            <PlusCircle size={18} />
            Start New Inspection
          </button>
          <button
            onClick={() => onNavigate('scan-package')}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
          >
            Scan Package Viewport
          </button>
        </div>
      </div>

      {/* Verified Sample Metrics Grid (Accurately calculated from data) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Sample Catalog Size
            </span>
            <Package size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {totalProducts} Products
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            4 authoritative packaged commodities configured with certified high-res imagery.
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Fully Compliant Packs
            </span>
            <CheckCircle2 size={18} color="var(--status-pass-text)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--status-pass-text)' }}>
            {compliantCount} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {totalProducts}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Passes all 6 mandatory statutory declarations without inspection warnings.
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Review Required Items
            </span>
            <AlertTriangle size={18} color="var(--status-warning-text)" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--status-warning-text)' }}>
            {warningCount} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>Packages</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Requires manual verification of secondary retail batch/MRP stamping.
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Regulatory Framework
            </span>
            <ShieldCheck size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            Rules, 2011 Codified
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            7 statutory declaration categories and First Schedule font dimensions active.
          </div>
        </div>
      </div>

      {/* Main Content Split: Sample Products Library & Recent Inspections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Four Sample Products Grid */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Authoritative Sample Products</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Select a product to inspect its multi-surface imagery and compliance dossier.
              </p>
            </div>
            <button
              onClick={() => onNavigate('product-details')}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              View Catalog
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {products.map((p) => {
              const isSelected = selectedProduct.id === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => selectProduct(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                    border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-app)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '3px',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <img src={p.surfaces.front} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {p.name}
                        </span>
                        {isSelected && <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>Active</span>}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {p.category} • Net Qty: {p.extractedFields.netQuantity?.structuredValue}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FoodTypeBadge foodType={p.foodType} confidence={p.foodTypeConfidence} showDetails={false} />
                    <StatusBadge status={p.overallCompliance.status} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Inspection Records */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Recent Inspection Records</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Demonstration inspection history log with review findings.
              </p>
            </div>
            <button
              onClick={() => onNavigate('inspection-history')}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              All History
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentInspections.map((item: any) => {
              const dateText = item.inspectionDate
                ? `${item.inspectionDate}${item.inspectionTime ? `, ${item.inspectionTime}` : ''}`
                : item.date;

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.8rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.productName}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {item.id}
                      </span>
                      {item.isSample && (
                        <span className="badge badge-neutral" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
                          Sample
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {dateText} • {item.summary}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StatusBadge status={item.complianceStatus} size="sm" />
                    <button
                      onClick={() => {
                        selectProduct(item.productId);
                        loadInspectionById(item.id);
                        onNavigate('new-inspection');
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
                      title="Open in Inspection Workflow"
                    >
                      Inspect <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
