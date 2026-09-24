import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { ComplianceStatus } from '../../types/inspection';

interface StatusBadgeProps {
  status: ComplianceStatus | 'Needs Review' | 'Detected' | 'Not Detected' | 'NEEDS_CALIBRATION';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let badgeClass = 'badge-neutral';
  let Icon = HelpCircle;
  let text = String(status);

  if (status === 'PASS' || status === 'Detected') {
    badgeClass = 'badge-pass';
    Icon = CheckCircle2;
    text = status === 'PASS' ? 'PASS' : 'Detected';
  } else if (status === 'WARNING' || status === 'Needs Review') {
    badgeClass = 'badge-warning';
    Icon = AlertTriangle;
    text = status === 'WARNING' ? 'REVIEW REQUIRED' : 'Needs Review';
  } else if (status === 'NEEDS_CALIBRATION') {
    badgeClass = 'badge-warning';
    Icon = AlertTriangle;
    text = 'NEEDS CALIBRATION';
  } else if (status === 'POTENTIAL_VIOLATION') {
    badgeClass = 'badge-violation';
    Icon = XCircle;
    text = 'POTENTIAL VIOLATION';
  } else if (status === 'NOT_DETECTED' || status === 'Not Detected') {
    badgeClass = 'badge-neutral';
    Icon = HelpCircle;
    text = 'NOT DETECTED';
  }

  const iconSizes = { sm: 12, md: 14, lg: 16 };

  return (
    <span className={`badge ${badgeClass}`} style={{ fontSize: size === 'sm' ? '0.7rem' : size === 'lg' ? '0.85rem' : '0.75rem' }}>
      <Icon size={iconSizes[size]} />
      <span>{text}</span>
    </span>
  );
};
