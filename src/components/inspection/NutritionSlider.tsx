import React, { useState, useMemo } from 'react';
import { SampleProduct } from '../../types/inspection';
import { calculatePortionNutrition, HEALTH_DISCLAIMER } from '../../services/nutritionService';
import { HeartPulse, Info, ShieldAlert, Layers } from 'lucide-react';
import { ImageZoomModal } from '../shared/Modal';

interface NutritionSliderProps {
  product: SampleProduct;
}

export const NutritionSlider: React.FC<NutritionSliderProps> = ({ product }) => {
  const [portionG, setPortionG] = useState<number>(product.nutrition.servingSizeG);
  const [activeTab, setActiveTab] = useState<'nutrition' | 'ingredients' | 'guidance'>('nutrition');
  const [guidanceGroup, setGuidanceGroup] = useState<'General' | 'Children' | 'Pregnancy'>('General');
  const [zoomModal, setZoomModal] = useState<{ isOpen: boolean; title: string; src: string }>({
    isOpen: false,
    title: '',
    src: ''
  });

  // Calculate dynamic nutrients at selected portion size
  const calculatedItems = useMemo(() => {
    return calculatePortionNutrition(product.nutrition.items, portionG);
  }, [product.nutrition.items, portionG]);

  const activeGuidance = product.consumerGuidance.find((g) => g.targetGroup === guidanceGroup) || product.consumerGuidance[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Non-Medical Advisory Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}
      >
        <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Informational Guidance: </strong>
          {HEALTH_DISCLAIMER}
        </span>
      </div>

      {/* Tabs Header */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.5rem'
        }}
      >
        <button
          onClick={() => setActiveTab('nutrition')}
          className={`btn ${activeTab === 'nutrition' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.82rem' }}
        >
          <HeartPulse size={16} />
          Dynamic Nutrition & Serving Slider
        </button>

        <button
          onClick={() => setActiveTab('ingredients')}
          className={`btn ${activeTab === 'ingredients' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.82rem' }}
        >
          <Layers size={16} />
          Ingredients, Additives & Allergens
        </button>

        <button
          onClick={() => setActiveTab('guidance')}
          className={`btn ${activeTab === 'guidance' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '0.82rem' }}
        >
          <Info size={16} />
          Consumer Guidance
        </button>
      </div>

      {/* TAB 1: DYNAMIC NUTRITION & PORTION SLIDER */}
      {activeTab === 'nutrition' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Slider Control Card */}
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Interactive Serving Size Calibrator</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Slide to adjust the portion weight and dynamically observe recalculated nutritional intake.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.3rem',
                  padding: '0.35rem 0.85rem',
                  backgroundColor: 'var(--primary-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-accent)'
                }}
              >
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {portionG}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>grams</span>
              </div>
            </div>

            {/* Slider Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={portionG}
                onChange={(e) => setPortionG(Number(e.target.value))}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  accentColor: 'var(--primary)'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>5 g (Tasting)</span>
                <span>{product.nutrition.defaultServingLabel}</span>
                <span>50 g (Half Pack)</span>
                <span>100 g (Full Standard Reference)</span>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
              Estimated for selected portion size ({portionG} g). Configured reference thresholds indicate nutritional density.
            </div>
          </div>

          {/* Nutrients Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}
          >
            {calculatedItems.map((item, idx) => {
              const statusColor =
                item.thresholdStatus === 'green'
                  ? 'var(--status-pass-text)'
                  : item.thresholdStatus === 'amber'
                  ? 'var(--status-warning-text)'
                  : item.thresholdStatus === 'red'
                  ? 'var(--status-violation-text)'
                  : 'var(--text-secondary)';

              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderLeft: `3px solid ${statusColor}`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.name}</span>
                      {item.thresholdStatus && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: statusColor
                          }}
                          title={`Threshold Indicator: ${item.thresholdStatus.toUpperCase()}`}
                        />
                      )}
                    </div>

                    <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.perServe}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.unit}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '0.85rem',
                      paddingTop: '0.65rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span>Per 100g: {item.per100g} {item.unit}</span>
                    {item.rdaPercent !== undefined && <span>RDA: ~{item.rdaPercent}%</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Product-Specific Innovation Panel Image */}
          {(product.surfaces.innovationNutrition || product.surfaces.innovationIngredients) && (
            <div className="card" style={{ padding: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  Authoritative Package Nutrition Declaration Crop
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Extracted from certified package foil
                </span>
              </div>
              <div
                style={{
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() =>
                  setZoomModal({
                    isOpen: true,
                    title: `${product.name} — Nutrition Panel Crop`,
                    src: product.surfaces.innovationNutrition || product.surfaces.innovationIngredients!
                  })
                }
              >
                <img
                  src={product.surfaces.innovationNutrition || product.surfaces.innovationIngredients}
                  alt={`${product.name} Nutrition Crop`}
                  style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INGREDIENTS, ADDITIVES & ALLERGENS */}
      {activeTab === 'ingredients' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Full Ingredient List */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Extracted Ingredients List
            </h4>
            <div
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {product.ingredientsList}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Detected from ingredient label on package back panel.
            </div>
          </div>

          {/* Product Specific Crop */}
          {product.surfaces.innovationIngredients && (
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  Authoritative Package Ingredients Panel Crop
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Official supplied high-res package snippet
                </span>
              </div>
              <div
                style={{
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() =>
                  setZoomModal({
                    isOpen: true,
                    title: `${product.name} — Ingredients Snippet`,
                    src: product.surfaces.innovationIngredients!
                  })
                }
              >
                <img
                  src={product.surfaces.innovationIngredients}
                  alt={`${product.name} Ingredients Crop`}
                  style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          {/* Additives & Preservatives Matrix */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Additives, Acidity Regulators & Emulsifiers
            </h4>

            {product.additivesAndPreservatives.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {product.additivesAndPreservatives.map((add, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.85rem',
                      backgroundColor: 'var(--bg-card-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{add.name}</span>
                        {add.insCode && (
                          <span className="badge badge-neutral" style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
                            {add.insCode}
                          </span>
                        )}
                      </div>
                      <span className="badge badge-pass" style={{ fontSize: '0.68rem' }}>
                        {add.regulatoryStatus}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      <strong>Label Text:</strong> "{add.detectedOnLabel}" — <strong>Role:</strong> {add.technicalFunction}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontStyle: 'italic' }}>
                      {add.notes}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Zero synthetic additives or chemical preservatives detected on label (pure ground spice formulation).
              </div>
            )}
          </div>

          {/* Allergens Notice */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={16} color="var(--primary)" />
              Detected Allergens & Sensitivities
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {product.allergens.map((alg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.78rem'
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{alg.allergen}</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{alg.detectedSource}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      className={`badge ${
                        alg.riskLevel === 'Present in Ingredients' ? 'badge-warning' : 'badge-neutral'
                      }`}
                      style={{ fontSize: '0.68rem' }}
                    >
                      {alg.riskLevel}
                    </span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{alg.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONSUMER GUIDANCE */}
      {activeTab === 'guidance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Target Group Selector */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['General', 'Children', 'Pregnancy'] as const).map((group) => (
              <button
                key={group}
                onClick={() => setGuidanceGroup(group)}
                className={`btn ${guidanceGroup === group ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem' }}
              >
                {group} Profile
              </button>
            ))}
          </div>

          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                Informational Overview: {guidanceGroup} Dietary Context
              </h4>
              <span className="badge badge-neutral">{activeGuidance.status}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              {activeGuidance.summary}
            </p>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Key Observations from Extracted Label:
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {activeGuidance.details.map((dt, i) => (
                  <li key={i}>{dt}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                marginTop: '0.5rem'
              }}
            >
              <strong>Disclaimer: </strong>These insights are algorithmic summaries derived from package declarations and standard nutritional benchmarks. They do not constitute clinical guidance or personalized medical advice.
            </div>
          </div>
        </div>
      )}

      <ImageZoomModal
        isOpen={zoomModal.isOpen}
        onClose={() => setZoomModal({ isOpen: false, title: '', src: '' })}
        title={zoomModal.title}
        imageSrc={zoomModal.src}
        imageAlt={zoomModal.title}
      />
    </div>
  );
};
