import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { FoodTypeBadge } from '../components/shared/FoodTypeBadge';
import { ImageZoomModal } from '../components/shared/Modal';
import { ZoomIn } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { products, selectedProduct, selectProduct } = useProduct();
  const [zoomModal, setZoomModal] = useState<{ isOpen: boolean; title: string; src: string }>({
    isOpen: false,
    title: '',
    src: ''
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Selector Bar */}
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-pass" style={{ fontSize: '0.7rem' }}>
              Master Product Dossier
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Packaged Commodity Specification
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {selectedProduct.name}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Select Product:
          </span>
          <select
            value={selectedProduct.id}
            onChange={(e) => selectProduct(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Dossier Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '1.5rem' }}>
        {/* Left Column: Certified Package Surfaces */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Front Surface Card */}
          <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Principal Display Panel (Front)</span>
              <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setZoomModal({ isOpen: true, title: `${selectedProduct.name} Front`, src: selectedProduct.surfaces.front })}>
                <ZoomIn size={14} />
              </span>
            </div>
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setZoomModal({ isOpen: true, title: `${selectedProduct.name} Front`, src: selectedProduct.surfaces.front })}
            >
              <img src={selectedProduct.surfaces.front} alt="Front View" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Back Surface Card */}
          <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Declaration Panel (Back)</span>
              <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setZoomModal({ isOpen: true, title: `${selectedProduct.name} Back`, src: selectedProduct.surfaces.back })}>
                <ZoomIn size={14} />
              </span>
            </div>
            <div
              style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                cursor: 'pointer'
              }}
              onClick={() => setZoomModal({ isOpen: true, title: `${selectedProduct.name} Back`, src: selectedProduct.surfaces.back })}
            >
              <img src={selectedProduct.surfaces.back} alt="Back View" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Specifications Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Statutory Identity Block */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Statutory Product Identity
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Brand / Corporate Owner</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedProduct.brand}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Food Category</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedProduct.category}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Food Classification</div>
                <div style={{ marginTop: '4px' }}>
                  <FoodTypeBadge foodType={selectedProduct.foodType} confidence={selectedProduct.foodTypeConfidence} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FSSAI Central License</div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary)', marginTop: '2px' }}>
                  {selectedProduct.extractedFields.fssaiLicense?.structuredValue}
                </div>
              </div>
            </div>
          </div>

          {/* Legal Metrology Commercials */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Commercial & Metric Declarations
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Maximum Retail Price (MRP)</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedProduct.extractedFields.mrp?.structuredValue}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Declared Net Quantity</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedProduct.extractedFields.netQuantity?.structuredValue}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Durability / Date Statement</div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {selectedProduct.extractedFields.dates?.structuredValue}
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturer & Consumer Care Details */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Manufacturer & Consumer Redressal Contact
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>REGISTERED MANUFACTURER / PACKER:</div>
                <div style={{ color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.4 }}>
                  {selectedProduct.extractedFields.manufacturer?.structuredValue}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>CONSUMER CARE CONTACT:</div>
                <div style={{ color: 'var(--text-primary)', marginTop: '2px', lineHeight: 1.4 }}>
                  {selectedProduct.extractedFields.consumerCare?.structuredValue}
                </div>
              </div>
            </div>
          </div>

          {/* Complete Ingredients List */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Declared Ingredients
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {selectedProduct.ingredientsList}
            </p>
          </div>
        </div>
      </div>

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
