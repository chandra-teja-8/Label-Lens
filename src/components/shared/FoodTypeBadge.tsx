import React from 'react';
import { FoodType, ConfidenceRating } from '../../types/inspection';
import { HelpCircle } from 'lucide-react';

interface FoodTypeBadgeProps {
  foodType: FoodType;
  confidence?: ConfidenceRating;
  showDetails?: boolean;
}

export const FoodTypeBadge: React.FC<FoodTypeBadgeProps> = ({
  foodType,
  confidence,
  showDetails = true
}) => {
  const isVeg = foodType === 'Vegetarian';
  const isNonVeg = foodType === 'Non-Vegetarian';

  const symbolSrc = isVeg
    ? '/assets/veg_symbol.png'
    : isNonVeg
    ? '/assets/nonveg_symbol.png'
    : null;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.4rem 0.75rem',
        backgroundColor: 'var(--bg-card)',
        border: `1px solid ${isVeg ? 'var(--status-pass-border)' : isNonVeg ? 'var(--status-violation-border)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {symbolSrc ? (
        <img
          src={symbolSrc}
          alt={foodType}
          style={{
            width: '20px',
            height: '20px',
            objectFit: 'contain',
            borderRadius: '2px'
          }}
        />
      ) : (
        <HelpCircle size={18} color="var(--text-muted)" />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: isVeg ? 'var(--status-pass-text)' : isNonVeg ? 'var(--status-violation-text)' : 'var(--text-secondary)'
            }}
          >
            {foodType}
          </span>
          {showDetails && confidence && (
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-card-subtle)',
                padding: '0.1rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {confidence.tier} Confidence
            </span>
          )}
        </div>

        {showDetails && confidence && (
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            Detected: Standardized classification symbol ({confidence.source})
          </span>
        )}
      </div>
    </div>
  );
};
