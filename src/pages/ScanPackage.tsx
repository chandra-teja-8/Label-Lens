import React, { useState, useRef, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { Camera, Upload, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { ImageZoomModal } from '../components/shared/Modal';

interface ScanPackageProps {
  onNavigate?: (pageId: string) => void;
}

export const ScanPackage: React.FC<ScanPackageProps> = ({ onNavigate }) => {
  const { selectedProduct, products, selectProduct, updateProductSurface } = useProduct();
  const [activeSurface, setActiveSurface] = useState<'front' | 'back' | 'side' | 'topBottom'>('front');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [zoomModal, setZoomModal] = useState<{ isOpen: boolean; title: string; src: string }>({
    isOpen: false,
    title: '',
    src: ''
  });

  // Handle live webcam streaming
  useEffect(() => {
    if (cameraActive) {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } })
          .then((mediaStream) => {
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              videoRef.current.play();
            }
          })
          .catch(() => {
            setCameraError('Camera access unavailable or permission denied. Using high-resolution package sample instead.');
            setCameraActive(false);
          });
      } else {
        setCameraError('Webcam API is not supported in this environment.');
        setCameraActive(false);
      }
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  const captureCameraFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        updateProductSurface(selectedProduct.id, activeSurface, dataUrl);
        setCameraActive(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateProductSurface(selectedProduct.id, activeSurface, url);
    }
  };

  const currentImage = selectedProduct.surfaces[activeSurface];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Package Scanner & Camera Viewport
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Capture multi-surface images of packaged commodities for statutory label inspection.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Product:</span>
          <select
            value={selectedProduct.id}
            onChange={(e) => selectProduct(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
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

          {onNavigate && (
            <button
              onClick={() => onNavigate('new-inspection')}
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 600 }}
            >
              <Play size={13} fill="currentColor" />
              Inspect Pack
            </button>
          )}
        </div>
      </div>

      {cameraError && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--status-warning-bg)',
            border: '1px solid var(--status-warning-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--status-warning-text)',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={16} />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Main Scanner Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        {/* Left: Interactive Viewport */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            overflow: 'hidden',
            backgroundColor: 'var(--bg-app)',
            position: 'relative'
          }}
        >
          {/* Viewport Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                SCANNING: {activeSurface.toUpperCase()} VIEW
              </span>
              <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                {activeSurface === 'front' || activeSurface === 'back' ? 'Mandatory Surface' : 'Optional Surface'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {cameraActive ? (
                <button
                  onClick={captureCameraFrame}
                  className="btn btn-primary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', backgroundColor: '#10B981', color: '#FFFFFF' }}
                >
                  <Camera size={13} />
                  Capture Photo
                </button>
              ) : null}

              <button
                onClick={() => setCameraActive(!cameraActive)}
                className={`btn ${cameraActive ? 'btn-secondary' : 'btn-primary'}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                <Camera size={13} />
                {cameraActive ? 'Cancel Camera' : 'Live Camera'}
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                <Upload size={13} />
                Upload Image
              </button>
            </div>
          </div>

          {/* Viewport Canvas Frame */}
          <div
            style={{
              height: '460px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '2rem',
              backgroundColor: '#050811'
            }}
          >
            {/* Viewfinder Target Framing Guidelines */}
            <div
              style={{
                position: 'absolute',
                top: '25px',
                bottom: '25px',
                left: '40px',
                right: '40px',
                border: '1.5px dashed rgba(59, 130, 246, 0.45)',
                borderRadius: 'var(--radius-md)',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '18px', height: '18px', borderTop: '2.5px solid var(--primary)', borderLeft: '2.5px solid var(--primary)' }} />
                <div style={{ width: '18px', height: '18px', borderTop: '2.5px solid var(--primary)', borderRight: '2.5px solid var(--primary)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '18px', height: '18px', borderBottom: '2.5px solid var(--primary)', borderLeft: '2.5px solid var(--primary)' }} />
                <div style={{ width: '18px', height: '18px', borderBottom: '2.5px solid var(--primary)', borderRight: '2.5px solid var(--primary)' }} />
              </div>
            </div>

            {/* Centered Guide Banner */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                padding: '0.3rem 0.85rem',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.04em',
                zIndex: 15
              }}
            >
              {cameraActive ? 'CAMERA LIVE — ALIGN COMMODITY INSIDE FRAME' : 'ALIGN PACKAGE INSIDE THE FRAME'}
            </div>

            {/* Live Video Feed or Image Display */}
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-md)'
                }}
              />
            ) : currentImage ? (
              <div
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() =>
                  setZoomModal({
                    isOpen: true,
                    title: `${selectedProduct.name} — ${activeSurface.toUpperCase()} Surface`,
                    src: currentImage
                  })
                }
              >
                <img
                  src={currentImage}
                  alt="Viewport view"
                  style={{
                    maxHeight: '380px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  maxWidth: '300px'
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AlertCircle size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>
                    No {activeSurface} image available
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: 'rgba(255,255,255,0.6)' }}>
                    Optional surface. Upload a photo or use your camera if declarations appear on this side.
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                >
                  <Upload size={12} /> Select File
                </button>
              </div>
            )}
          </div>

          {/* Viewport Footer Controls */}
          <div
            style={{
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--bg-card)',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            <span>Resolution: Planar Inspection Mode</span>
            <span style={{ color: 'var(--status-pass-text)' }}>● Illumination Uniform</span>
          </div>
        </div>

        {/* Right: Surface Slots Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Multi-Surface Slots</h4>
              <span className="badge badge-pass" style={{ fontSize: '0.65rem' }}>
                Active Slot
              </span>
            </div>

            {/* Front Surface Slot */}
            <div
              onClick={() => setActiveSurface('front')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeSurface === 'front' ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                border: `1px solid ${activeSurface === 'front' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img src={selectedProduct.surfaces.front} alt="Front" style={{ maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>FRONT VIEW</span>
                  <CheckCircle2 size={13} color="var(--status-pass-text)" />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Principal Display Panel</div>
              </div>
            </div>

            {/* Back Surface Slot */}
            <div
              onClick={() => setActiveSurface('back')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeSurface === 'back' ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                border: `1px solid ${activeSurface === 'back' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                <img src={selectedProduct.surfaces.back} alt="Back" style={{ maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>BACK VIEW</span>
                  <CheckCircle2 size={13} color="var(--status-pass-text)" />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mandatory Declarations</div>
              </div>
            </div>

            {/* Side Surface Slot (Optional) */}
            <div
              onClick={() => setActiveSurface('side')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeSurface === 'side' ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                border: `1px solid ${activeSurface === 'side' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  color: 'var(--text-muted)'
                }}
              >
                {selectedProduct.surfaces.side ? (
                  <img src={selectedProduct.surfaces.side} alt="Side" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <AlertCircle size={16} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>SIDE VIEW</span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.6rem' }}>
                    {selectedProduct.surfaces.side ? 'Loaded' : 'Optional'}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {selectedProduct.surfaces.side ? 'Custom side image' : 'No side image'}
                </div>
              </div>
            </div>

            {/* Top / Bottom Surface Slot (Optional) */}
            <div
              onClick={() => setActiveSurface('topBottom')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeSurface === 'topBottom' ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                border: `1px solid ${activeSurface === 'topBottom' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  color: 'var(--text-muted)'
                }}
              >
                {selectedProduct.surfaces.topBottom ? (
                  <img src={selectedProduct.surfaces.topBottom} alt="Top/Bottom" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <AlertCircle size={16} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>TOP / BOTTOM</span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.6rem' }}>
                    {selectedProduct.surfaces.topBottom ? 'Loaded' : 'Optional'}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {selectedProduct.surfaces.topBottom ? 'Custom top image' : 'No top/bottom image'}
                </div>
              </div>
            </div>
          </div>

          {/* Inspector Guidelines Card */}
          <div className="card" style={{ padding: '1rem', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Inspector Guidance:</span>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Ensure mandatory declaration blocks (MRP, Net Wt, Manufacturer, Consumer Care) are clearly lit without glare or package folds.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

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
