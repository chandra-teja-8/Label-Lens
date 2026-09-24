import React, { useState } from 'react';
import { Search, ShieldCheck, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProduct } from '../../context/ProductContext';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { theme, toggleTheme } = useTheme();
  const { products, selectedProduct, selectProduct } = useProduct();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const matchedProducts = searchQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      {/* Search Input with Live Results Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '420px', position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Search inspections, products or reports..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
            style={{
              width: '100%',
              paddingLeft: '38px',
              height: '38px',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '44px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              maxHeight: '260px',
              overflowY: 'auto',
              padding: '0.5rem'
            }}
          >
            {matchedProducts.length > 0 ? (
              matchedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    selectProduct(p.id);
                    onNavigate('product-details');
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '0.5rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    transition: 'background-color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{p.name}</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.category}</div>
                  </div>
                  <ArrowRight size={14} color="var(--primary)" />
                </div>
              ))
            ) : (
              <div style={{ padding: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                No matching products found. Try "Kurkure", "Lays", "Parle", or "MTR".
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center Contextual Identifier */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.35rem 0.85rem',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}
      >
        <ShieldCheck size={15} color="var(--primary)" />
        <span style={{ fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
          {currentPage.replace(/-/g, ' ')}
        </span>
        <span style={{ color: 'var(--border-strong)' }}>|</span>
        <span>Legal Metrology Screening</span>
      </div>

      {/* Right Controls: Product Selector, Theme Switcher, Inspector Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Active Product Selector in Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Sample:
          </span>
          <select
            value={selectedProduct.id}
            onChange={(e) => selectProduct(e.target.value)}
            style={{
              height: '36px',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-default)',
              fontWeight: 500,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Quick Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light Clean & Modern' : 'Dark Professional'} theme`}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          {theme === 'dark' ? <Sun size={17} color="var(--primary)" /> : <Moon size={17} color="var(--primary)" />}
        </button>

        {/* Notifications Dropdown */}
        <NotificationDropdown onNavigate={onNavigate} />

        {/* User / Inspector Profile Menu */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.35rem 0.65rem 0.35rem 0.4rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}
          >
            IN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Inspector
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Enforcement Wing
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
