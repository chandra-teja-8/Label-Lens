import React, { useState, useRef } from 'react';
import { ZoomIn, Upload, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { SampleProduct } from '../../types/inspection';
import { useProduct } from '../../context/ProductContext';
import { ImageZoomModal } from '../shared/Modal';

interface PackageImageCardProps {
  product: SampleProduct;
}

export const PackageImageCard: React.FC<PackageImageCardProps> = ({ product }) => {
  const { updateProductSurface } = useProduct();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetSurface, setTargetSurface] = useState<'front' | 'back' | 'side' | 'topBottom'>('front');

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc: string;
    imageAlt: string;
    caption?: string;
  }>({
    isOpen: false,
    title: '',
    imageSrc: '',
    imageAlt: ''
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateProductSurface(product.id, targetSurface, url);
    }
  };

  const triggerUpload = (surface: 'front' | 'back' | 'side' | 'topBottom') => {
    setTargetSurface(surface);
    fileInputRef.current?.click();
  };

  const openZoom = (title: string, src: string, alt: string, caption?: string) => {
    setModalState({
      isOpen: true,
      title,
      imageSrc: src,
      imageAlt: alt,
      caption
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Multi-Surface Package Inspection</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Captured surfaces for {product.name}. Principal display panel (PDP) and statutory declaration panels.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Surfaces Ready:</span>
          <span className="badge badge-pass">2 / 2 Mandatory (Front + Back)</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {/* Surface 1: Front View (Authoritative) */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--status-pass-text)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Front View (PDP)</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mandatory</span>
          </div>

          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              height: '270px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() =>
              openZoom(
                `${product.name} — Front View`,
                product.surfaces.front,
                `${product.name} Front Surface`,
                'Principal Display Panel (PDP) showing brand name, product classification, and standardized food symbol.'
              )
            }
          >
            <img
              src={product.surfaces.front}
              alt={`${product.name} Front`}
              style={{
                maxWidth: '92%',
                maxHeight: '92%',
                objectFit: 'contain',
                transition: 'transform var(--transition-normal)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0,0,0,0.65)',
                color: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ZoomIn size={13} />
              <span>Inspect</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {product.id}_front.png
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => triggerUpload('front')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
                title="Replace Front Image"
              >
                <RefreshCw size={12} />
                <span>Replace</span>
              </button>
            </div>
          </div>
        </div>

        {/* Surface 2: Back View (Authoritative) */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="var(--status-pass-text)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Back View (Declarations)</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mandatory</span>
          </div>

          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              height: '270px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() =>
              openZoom(
                `${product.name} — Back View`,
                product.surfaces.back,
                `${product.name} Back Surface`,
                'Mandatory declaration panel containing MRP, Net Quantity, Manufacturer details, Consumer Care, and Nutrition table.'
              )
            }
          >
            <img
              src={product.surfaces.back}
              alt={`${product.name} Back`}
              style={{
                maxWidth: '92%',
                maxHeight: '92%',
                objectFit: 'contain',
                transition: 'transform var(--transition-normal)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(0,0,0,0.65)',
                color: '#ffffff',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ZoomIn size={13} />
              <span>Inspect</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {product.id}_back.png
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => triggerUpload('back')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
                title="Replace Back Image"
              >
                <RefreshCw size={12} />
                <span>Replace</span>
              </button>
            </div>
          </div>
        </div>

        {/* Surface 3: Side View */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            borderStyle: product.surfaces.side ? 'solid' : 'dashed',
            backgroundColor: 'var(--bg-card-subtle)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {product.surfaces.side ? (
                <CheckCircle2 size={16} color="var(--status-pass-text)" />
              ) : (
                <AlertCircle size={16} color="var(--text-muted)" />
              )}
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Side View
              </span>
            </div>
            <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
              {product.surfaces.side ? 'Uploaded' : 'Optional'}
            </span>
          </div>

          {product.surfaces.side ? (
            <div
              style={{
                position: 'relative',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                height: '270px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => openZoom(`${product.name} — Side View`, product.surfaces.side!, `${product.name} Side Surface`)}
            >
              <img
                src={product.surfaces.side}
                alt={`${product.name} Side`}
                style={{ maxWidth: '92%', maxHeight: '92%', objectFit: 'contain' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  color: '#ffffff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <ZoomIn size={13} />
                <span>Inspect</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '270px',
                border: '1px dashed var(--border-default)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)'
                }}
              >
                <Upload size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  No side image available
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Not required if all statutory declarations are on Front and Back.
                </div>
              </div>
              <button
                onClick={() => triggerUpload('side')}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                <Upload size={12} /> Upload Surface
              </button>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {product.surfaces.side ? 'Side surface loaded' : 'No secondary declarations'}
            </span>
            {product.surfaces.side && (
              <button
                onClick={() => triggerUpload('side')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
              >
                <RefreshCw size={12} />
                <span>Change</span>
              </button>
            )}
          </div>
        </div>

        {/* Surface 4: Top / Bottom View */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            borderStyle: product.surfaces.topBottom ? 'solid' : 'dashed',
            backgroundColor: 'var(--bg-card-subtle)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {product.surfaces.topBottom ? (
                <CheckCircle2 size={16} color="var(--status-pass-text)" />
              ) : (
                <AlertCircle size={16} color="var(--text-muted)" />
              )}
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Top / Bottom View
              </span>
            </div>
            <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
              {product.surfaces.topBottom ? 'Uploaded' : 'Optional'}
            </span>
          </div>

          {product.surfaces.topBottom ? (
            <div
              style={{
                position: 'relative',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                height: '270px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => openZoom(`${product.name} — Top/Bottom View`, product.surfaces.topBottom!, `${product.name} Top/Bottom Surface`)}
            >
              <img
                src={product.surfaces.topBottom}
                alt={`${product.name} Top/Bottom`}
                style={{ maxWidth: '92%', maxHeight: '92%', objectFit: 'contain' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  color: '#ffffff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <ZoomIn size={13} />
                <span>Inspect</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '270px',
                border: '1px dashed var(--border-default)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)'
                }}
              >
                <Upload size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  No top/bottom image available
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  End-seal folds contain zero statutory declarations.
                </div>
              </div>
              <button
                onClick={() => triggerUpload('topBottom')}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                <Upload size={12} /> Upload Surface
              </button>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {product.surfaces.topBottom ? 'Top/Bottom surface loaded' : 'No secondary declarations'}
            </span>
            {product.surfaces.topBottom && (
              <button
                onClick={() => triggerUpload('topBottom')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
              >
                <RefreshCw size={12} />
                <span>Change</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hidden File Input for Real Surface Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <ImageZoomModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        imageSrc={modalState.imageSrc}
        imageAlt={modalState.imageAlt}
        caption={modalState.caption}
      />
    </div>
  );
};
