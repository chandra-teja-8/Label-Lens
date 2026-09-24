import React from 'react';
import { Camera, Cpu, Table, ShieldCheck, HeartPulse, FileCheck } from 'lucide-react';
import { InspectionStep } from '../../context/InspectionContext';

interface InspectionStepperProps {
  currentStep: InspectionStep;
  onStepClick: (step: InspectionStep) => void;
}

interface StepDef {
  step: InspectionStep;
  title: string;
  icon: React.ElementType;
}

const STEPS: StepDef[] = [
  { step: 1, title: 'Capture Images', icon: Camera },
  { step: 2, title: 'AI Processing', icon: Cpu },
  { step: 3, title: 'Extract Information', icon: Table },
  { step: 4, title: 'Compliance Check', icon: ShieldCheck },
  { step: 5, title: 'Health Insights', icon: HeartPulse },
  { step: 6, title: 'Results & Report', icon: FileCheck }
];

export const InspectionStepper: React.FC<InspectionStepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)',
        padding: '0.9rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '1.5rem',
        overflowX: 'auto'
      }}
    >
      {STEPS.map((item, index) => {
        const Icon = item.icon;
        const isCurrent = currentStep === item.step;
        const isPast = currentStep > item.step;

        return (
          <React.Fragment key={item.step}>
            <button
              onClick={() => onStepClick(item.step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isCurrent ? 'var(--primary)' : isPast ? 'var(--status-pass-bg)' : 'transparent',
                color: isCurrent ? 'var(--primary-text)' : isPast ? 'var(--status-pass-text)' : 'var(--text-muted)',
                fontWeight: isCurrent ? 700 : 500,
                fontSize: '0.82rem',
                border: isCurrent
                  ? '1px solid var(--primary)'
                  : isPast
                  ? '1px solid var(--status-pass-border)'
                  : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isCurrent ? 'rgba(0,0,0,0.15)' : isPast ? 'var(--status-pass-text)' : 'var(--bg-card-subtle)',
                  color: isCurrent ? 'var(--primary-text)' : isPast ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}
              >
                {item.step}
              </div>
              <Icon size={16} />
              <span>{item.title}</span>
            </button>

            {index < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: isPast ? 'var(--status-pass-text)' : 'var(--border-subtle)',
                  margin: '0 0.5rem',
                  minWidth: '20px',
                  opacity: isPast ? 0.6 : 0.3
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
