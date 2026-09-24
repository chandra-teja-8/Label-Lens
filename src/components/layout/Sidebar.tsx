import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Scan,
  Cpu,
  Package,
  BookOpen,
  History,
  FileText,
  Settings,
  ScanEye,
  Info
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'new-inspection', label: 'New Inspection', icon: PlusCircle },
  { id: 'scan-package', label: 'Scan Package', icon: Scan },
  { id: 'ai-analysis', label: 'AI Analysis', icon: Cpu },
  { id: 'product-details', label: 'Product Details', icon: Package },
  { id: 'compliance-rules', label: 'Compliance Rules', icon: BookOpen },
  { id: 'inspection-history', label: 'Inspection History', icon: History },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        minHeight: '100vh',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '1.5rem 1.4rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }}
          >
            <ScanEye size={22} strokeWidth={2.2} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}
            >
              LabelLens
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                letterSpacing: '0.01em'
              }}
            >
              AI-Powered Product Label Inspection
            </span>
          </div>
        </div>
      </div>

      {/* Primary Navigation — 9 destinations */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div
          style={{
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 700,
            color: 'var(--text-muted)',
            padding: '0.25rem 0.75rem 0.5rem'
          }}
        >
          Inspection Platform
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                textAlign: 'left'
              }}
            >
              <Icon size={18} color={isActive ? 'var(--primary)' : 'currentColor'} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Context */}
      <div
        style={{
          padding: '1.2rem',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-card-subtle)',
          margin: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
          <Info size={14} />
          <span style={{ fontWeight: 600 }}>Statutory Reference</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
          Legal Metrology (Packaged Commodities) Rules, 2011 screening module.
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.4rem' }}>
          AI-assisted screening; final regulatory determination requires manual verification.
        </div>
      </div>
    </aside>
  );
};
