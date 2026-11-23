import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import type { ComplianceStatus } from '../types/hr';

interface ComplianceBadgeProps {
  status: ComplianceStatus | 'Compliant' | 'Action Required' | 'Completed' | 'Scheduled' | 'Assigned';
  label?: string;
  compact?: boolean;
}

export const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  status,
  label,
  compact = false,
}) => {
  const padding = compact ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  const displayLabel = label ?? status;

  switch (status) {
    case 'Valid':
    case 'Compliant':
    case 'Completed':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 font-medium text-emerald-700 whitespace-nowrap shrink-0 ${padding}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>{displayLabel}</span>
        </span>
      );
    case 'Expiring Soon':
    case 'Scheduled':
    case 'Assigned':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 font-medium text-amber-800 whitespace-nowrap shrink-0 ${padding}`}
        >
          <Clock className="w-3.5 h-3.5 shrink-0 text-amber-600" aria-hidden="true" />
          <span>{displayLabel}</span>
        </span>
      );
    case 'Action Required':
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 font-medium text-amber-800 whitespace-nowrap shrink-0 ${padding}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" aria-hidden="true" />
          <span>{displayLabel}</span>
        </span>
      );
    case 'Overdue':
    case 'Missing':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 font-medium text-red-700 whitespace-nowrap shrink-0 ${padding}`}
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" aria-hidden="true" />
          <span>{displayLabel}</span>
        </span>
      );
  }
};

interface EmployeeAvatarProps {
  name: string;
  initials: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
  name,
  initials,
  avatarUrl,
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
  }[size];

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClasses} rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100`}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={`${sizeClasses} rounded-lg border border-slate-200 bg-slate-100 text-slate-700 font-display font-semibold flex items-center justify-center shrink-0 select-none`}
    >
      {initials}
    </div>
  );
};
