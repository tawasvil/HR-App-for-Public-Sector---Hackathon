import React, { useState } from 'react';
import { Calendar, CheckCircle2, Loader2, ShieldCheck, Users, X } from 'lucide-react';
import type { Employee } from '../types/hr';
import type { Translations } from '../i18n/translations';
import { EmployeeAvatar } from './StatusIndicator';

interface ContractReviewModalProps {
  t: Translations;
  employee: Employee | null;
  isSubmitting: boolean;
  onConfirm: (
    employeeId: string,
    decision: 'extend_12m' | 'convert_permanent' | 'handoff_deputy',
    note: string
  ) => Promise<void>;
  onClose: () => void;
}

export const ContractReviewModal: React.FC<ContractReviewModalProps> = ({
  t,
  employee,
  isSubmitting,
  onConfirm,
  onClose,
}) => {
  const [decision, setDecision] = useState<'extend_12m' | 'convert_permanent' | 'handoff_deputy'>(
    'extend_12m'
  );
  const [note, setNote] = useState('');

  if (!employee) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(employee.id, decision, note);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contract-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <EmployeeAvatar
              name={employee.name}
              initials={employee.initials}
              avatarUrl={employee.avatarUrl}
              size="md"
            />
            <div>
              <h2 id="contract-modal-title" className="text-base font-semibold text-slate-900">
                {t.contractModalTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {employee.name} · {employee.role}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contract review"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{t.currentAppointment}</span>
              <span className="font-medium text-slate-900">{employee.contractStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{t.contractEndDateLabel}</span>
              <span className="font-mono tabular-nums font-medium text-amber-700">
                {employee.contractEndDate || '2026-12-23'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{t.designatedDeputyLabel}</span>
              <span className="font-medium text-slate-900">{employee.deputyName}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-slate-700">
              {t.selectDecisionLabel}
            </label>

            <button
              type="button"
              onClick={() => setDecision('extend_12m')}
              className={`w-full text-left rounded-lg border p-3.5 transition-colors flex items-start gap-3 ${
                decision === 'extend_12m'
                  ? 'border-[#5E4AE3] bg-[#5E4AE3]/5'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 mt-0.5 text-[#5E4AE3] shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900">{t.extend12mTitle}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.extend12mDesc}</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDecision('convert_permanent')}
              className={`w-full text-left rounded-lg border p-3.5 transition-colors flex items-start gap-3 ${
                decision === 'convert_permanent'
                  ? 'border-[#5E4AE3] bg-[#5E4AE3]/5'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 mt-0.5 text-[#5E4AE3] shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900">{t.convertPermTitle}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.convertPermDesc}</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDecision('handoff_deputy')}
              className={`w-full text-left rounded-lg border p-3.5 transition-colors flex items-start gap-3 ${
                decision === 'handoff_deputy'
                  ? 'border-[#5E4AE3] bg-[#5E4AE3]/5'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4 mt-0.5 text-[#5E4AE3] shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-900">{t.handoffTitle}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {t.handoffDesc(employee.deputyName)}
                </div>
              </div>
            </button>
          </div>

          <div>
            <label htmlFor="contract-decision-note" className="block text-xs font-medium text-slate-700 mb-1.5">
              {t.justificationLabel}
            </label>
            <textarea
              id="contract-decision-note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.justificationPlaceholder}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#5E4AE3] focus:outline-none focus:ring-2 focus:ring-[#5E4AE3]/15"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#5E4AE3] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.recordingDecision}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.confirmRegistry}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
