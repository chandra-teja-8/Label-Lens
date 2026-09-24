import React, { useState } from 'react';
import { LEGAL_METROLOGY_RULES, FONT_REQUIREMENTS_TABLE } from '../data/complianceRulesData';
import { Search, Ruler } from 'lucide-react';

export const ComplianceRules: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Mandatory Declarations', 'MRP & Pricing', 'Net Quantity', 'Manufacturer / Packer', 'Consumer Care', 'Date Declarations', 'Font & Dimensions', 'Food Classification'];

  const filteredRules = LEGAL_METROLOGY_RULES.filter((rule) => {
    const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory;
    const matchesSearch =
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.clauseSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.ruleCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Header */}
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
            <span className="badge badge-pass" style={{ fontSize: '0.7rem' }}>
              Statutory Rulebook
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Enforcement Standards
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            Legal Metrology (Packaged Commodities) Rules, 2011
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Codified rules and dimensional standards for mandatory declarations on pre-packaged commodities.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Filter rules, clauses, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px', height: '38px', fontSize: '0.82rem' }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem', whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.85rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}
                >
                  {rule.ruleCode}
                </span>
                <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                  {rule.category}
                </span>
              </div>

              <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {rule.title}
              </h4>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {rule.clauseSummary}
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.65rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem'
              }}
            >
              <div><strong>Reference: </strong>{rule.statutoryReference}</div>
              {rule.penaltyClause && (
                <div style={{ color: 'var(--status-warning-text)' }}>
                  <strong>Penalty: </strong>{rule.penaltyClause}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* First Schedule Font Dimension Table */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Ruler size={20} color="var(--primary)" />
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>
              First Schedule Table I — Minimum Height of Numerals and Letters
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Statutory minimum letter & numeral height required based on the area of the Principal Display Panel (PDP).
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-card-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Area of Principal Display Panel (A)</th>
                <th style={{ padding: '0.75rem 1rem' }}>Net Quantity Range</th>
                <th style={{ padding: '0.75rem 1rem' }}>Normal Minimum Height</th>
                <th style={{ padding: '0.75rem 1rem' }}>Blown / Moulded / Perforated Minimum</th>
              </tr>
            </thead>
            <tbody>
              {FONT_REQUIREMENTS_TABLE.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{row.areaPdp}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{row.netQtyRange}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {row.normalMinHeightMm.toFixed(1)} mm
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                    {row.blownMouldedMinMm.toFixed(1)} mm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          * Legal Metrology Rules, 2011, First Schedule Table I. Height of numerals in net quantity declaration shall not be less than the values specified above.
        </div>
      </div>
    </div>
  );
};
