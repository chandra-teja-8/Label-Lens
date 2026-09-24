import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, CheckCircle2, ShieldCheck, Palette } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '960px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Application Settings
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Configure visual appearance, theme preferences, and review system configuration.
        </p>
      </div>

      {/* SECTION: SETTINGS -> APPEARANCE */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
          <Palette size={20} color="var(--primary)" />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Appearance</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Choose how LabelLens looks. Two production-grade visual themes designed for statutory inspection.
            </p>
          </div>
        </div>

        {/* Two Visual Preview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {/* THEME 1 PREVIEW CARD: DARK PROFESSIONAL (Option 4) */}
          <div
            onClick={() => setTheme('dark')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${theme === 'dark' ? 'var(--primary)' : 'var(--border-default)'}`,
              backgroundColor: '#080D1A',
              padding: '1.25rem',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: theme === 'dark' ? '0 0 0 2px var(--primary-light), var(--shadow-md)' : 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {theme === 'dark' && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  backgroundColor: '#F59E0B',
                  color: '#080D1A',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                <CheckCircle2 size={13} />
                <span>ACTIVE THEME</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#111A2E',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Moon size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#F8FAFC' }}>Dark Professional</h4>
                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Option 4 Design Direction</span>
              </div>
            </div>

            {/* Visual Mini Mockup of Theme 1 */}
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#0B1224',
                padding: '0.85rem',
                border: '1px solid #23355A',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                marginTop: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '8px', backgroundColor: '#F59E0B', borderRadius: '4px' }} />
                <div style={{ width: '40px', height: '14px', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: '10px' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: '36px', backgroundColor: '#111A2E', borderRadius: '6px', border: '1px solid #23355A' }} />
                <div style={{ flex: 1, height: '36px', backgroundColor: '#111A2E', borderRadius: '6px', border: '1px solid #23355A' }} />
              </div>
              <div style={{ height: '22px', backgroundColor: '#F59E0B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#080D1A' }}>Proceed to Analysis</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.85rem', lineHeight: 1.4 }}>
              Deep navy background, high-contrast dark cards, restrained gold/amber highlights, and emerald compliance indicators.
            </p>
          </div>

          {/* THEME 2 PREVIEW CARD: LIGHT CLEAN & MODERN (Option 5) */}
          <div
            onClick={() => setTheme('light')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 'var(--radius-lg)',
              border: `2px solid ${theme === 'light' ? 'var(--primary)' : 'var(--border-default)'}`,
              backgroundColor: '#F8FAFC',
              padding: '1.25rem',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: theme === 'light' ? '0 0 0 2px var(--primary-light), var(--shadow-md)' : 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {theme === 'light' && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  padding: '0.2rem 0.55rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                <CheckCircle2 size={13} />
                <span>ACTIVE THEME</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #CBD5E1'
                }}
              >
                <Sun size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A' }}>Clean & Modern</h4>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Option 5 Design Direction</span>
              </div>
            </div>

            {/* Visual Mini Mockup of Theme 2 */}
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                padding: '0.85rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                marginTop: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '8px', backgroundColor: '#2563EB', borderRadius: '4px' }} />
                <div style={{ width: '40px', height: '14px', backgroundColor: '#ECFDF5', borderRadius: '10px' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: '36px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
                <div style={{ flex: 1, height: '36px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }} />
              </div>
              <div style={{ height: '22px', backgroundColor: '#2563EB', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FFFFFF' }}>Proceed to Analysis</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.85rem', lineHeight: 1.4 }}>
              Clean light slate background, soft blue primary action buttons, deep navy text, and crisp modern cards.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
          * Theme preference is automatically saved in your browser's persistent local storage and remembered across sessions.
        </div>
      </div>

      {/* System Architecture & Engine Information */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShieldCheck size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>System Configuration & Regulatory Scope</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.82rem' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>PLATFORM NAME</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>LabelLens</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI-Powered Product Label Inspection</div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>REGULATORY STANDARD</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>Rules, 2011</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Legal Metrology (Packaged Commodities)</div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>BACKEND INTEGRATION READY</div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>FastAPI / PyTorch</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Decoupled service abstractions</div>
          </div>
        </div>

        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
          Notice: LabelLens is an AI-assisted screening tool. It does not replace the statutory authority of designated Legal Metrology inspectors or FSSAI food safety officers.
        </div>
      </div>
    </div>
  );
};
