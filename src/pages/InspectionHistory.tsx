import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useInspection } from '../context/InspectionContext';
import { SAMPLE_INSPECTION_HISTORY } from '../data/sampleProducts';
import { StatusBadge } from '../components/shared/StatusBadge';
import { Search, ArrowRight, FileText } from 'lucide-react';

interface InspectionHistoryProps {
  onNavigate: (pageId: string) => void;
}

export const InspectionHistory: React.FC<InspectionHistoryProps> = ({ onNavigate }) => {
  const { selectProduct } = useProduct();
  const { inspections, loadInspectionById } = useInspection();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  // Source from live inspection context; fallback to sample data if not yet loaded
  const records = inspections.length > 0 ? inspections : SAMPLE_INSPECTION_HISTORY.map((s) => ({
    id: s.id,
    productId: s.productId,
    productName: s.productName,
    brand: s.brand,
    category: s.category,
    foodType: s.foodType,
    inspectionDate: s.date.includes(',') ? s.date.split(',')[0].trim() : s.date,
    inspectionTime: s.date.includes(',') ? s.date.split(',')[1].trim() : '',
    createdAt: new Date().toISOString(),
    complianceStatus: (s.complianceStatus === 'WARNING' ? 'REVIEW_REQUIRED' : s.complianceStatus) as any,
    reviewItems: s.reviewItemsCount,
    reviewItemsCount: s.reviewItemsCount,
    summary: s.summary,
    isSample: true
  }));

  const filteredHistory = records.filter((item) => {
    const isWarningOrReview =
      item.complianceStatus === 'WARNING' || item.complianceStatus === 'REVIEW_REQUIRED';
    
    let matchesFilter = true;
    if (filterStatus === 'PASS') {
      matchesFilter = item.complianceStatus === 'PASS';
    } else if (filterStatus === 'REVIEW_REQUIRED') {
      matchesFilter = isWarningOrReview;
    } else if (filterStatus === 'POTENTIAL_VIOLATION') {
      matchesFilter = item.complianceStatus === 'POTENTIAL_VIOLATION';
    }

    const matchesSearch =
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(search.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.5rem 1.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
              Historical Audit Log
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Sample Inspection Archive
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            Inspection History & Audit Trail
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Log of processed packaged commodities with statutory verification verdicts and evidence summaries.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by ID or product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px', height: '38px', fontSize: '0.82rem' }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { key: 'All', label: 'All Records' },
          { key: 'PASS', label: 'Compliant (Pass)' },
          { key: 'REVIEW_REQUIRED', label: 'Review Required' },
          { key: 'POTENTIAL_VIOLATION', label: 'Violations' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`btn ${filterStatus === key ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* History Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Inspection ID</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Product & Category</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Date & Time</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Food Type</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1.25rem' }}>Review Items</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, idx) => {
                const dateDisplay =
                  item.inspectionDate + (item.inspectionTime ? `, ${item.inspectionTime}` : '');
                const reviewCount = item.reviewItems ?? item.reviewItemsCount ?? 0;

                return (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: idx < filteredHistory.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--bg-card-subtle)'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1.25rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>{item.id}</span>
                        {item.isSample && (
                          <span
                            className="badge badge-neutral"
                            style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}
                          >
                            Sample
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.productName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.category}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-secondary)' }}>
                      {dateDisplay}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className="badge badge-pass" style={{ fontSize: '0.68rem' }}>
                        {item.foodType}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <StatusBadge status={item.complianceStatus} size="sm" />
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', color: reviewCount > 0 ? 'var(--status-warning-text)' : 'var(--text-muted)' }}>
                      {reviewCount} Review Item(s)
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button
                          onClick={() => {
                            selectProduct(item.productId);
                            loadInspectionById(item.id);
                            onNavigate('reports');
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.3rem 0.55rem', fontSize: '0.72rem' }}
                          title="View Inspection Report"
                        >
                          <FileText size={12} />
                          Report
                        </button>
                        <button
                          onClick={() => {
                            selectProduct(item.productId);
                            loadInspectionById(item.id);
                            onNavigate('new-inspection');
                          }}
                          className="btn btn-primary"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.72rem' }}
                          title="Open Inspection Workflow"
                        >
                          Inspect <ArrowRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        * Demonstration audit history. Connected to local state storage; prepared for PostgreSQL / FastAPI synchronization.
      </div>
    </div>
  );
};
