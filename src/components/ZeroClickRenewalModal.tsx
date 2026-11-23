import React, { useEffect } from 'react';
import {
  Calendar,
  Car,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Loader2,
  MapPin,
  Stethoscope,
  UserCheck,
  X,
  Zap,
} from 'lucide-react';
import type { Employee, Permit, RenewalReservation } from '../types/hr';
import type { Translations } from '../i18n/translations';

interface ZeroClickRenewalModalProps {
  t: Translations;
  target: { employee: Employee; permit: Permit } | null;
  isRescheduling: boolean;
  isCompleting: boolean;
  onRescheduleSlot: (
    employeeId: string,
    permitId: string,
    reservationId: string,
    scheduledAt: string
  ) => Promise<void>;
  onCompleteRenewal: (employeeId: string, permitId: string) => Promise<void>;
  onClose: () => void;
}

export const ZeroClickRenewalModal: React.FC<ZeroClickRenewalModalProps> = ({
  t,
  target,
  isRescheduling,
  isCompleting,
  onRescheduleSlot,
  onCompleteRenewal,
  onClose,
}) => {
  useEffect(() => {
    if (!target) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [target, onClose]);

  const autoRenewal = target?.permit.autoRenewal;
  if (!target || !autoRenewal) return null;

  const { employee, permit } = target;
  const isCompleted = autoRenewal.stage === 'completed';

  const getReservationIcon = (type: RenewalReservation['type']) => {
    switch (type) {
      case 'health_check':
        return <Stethoscope className="w-4 h-4 text-[#5E4AE3]" />;
      case 'test_drive':
        return <Car className="w-4 h-4 text-[#5E4AE3]" />;
      case 'skills_test':
        return <ClipboardCheck className="w-4 h-4 text-[#5E4AE3]" />;
      case 'deputy_cover':
        return <UserCheck className="w-4 h-4 text-emerald-700" />;
      case 'authority_filing':
      default:
        return <FileCheck2 className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="zero-click-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 bg-slate-50/70">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="zero-click-modal-title"
                className="text-lg font-display font-semibold text-slate-900"
              >
                {t.zeroClick.modalTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.zeroClick.modalSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.zeroClick.close}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Context Header Strip */}
          <div className="rounded-xl bg-slate-50 p-4 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-900">
                {employee.name} · {permit.name}
              </span>
              <span className="text-xs font-mono font-semibold text-[#5E4AE3] tabular-nums">
                {t.zeroClick.zeroClicksBadge}
              </span>
            </div>
            <div className="text-xs text-slate-500 tabular-nums">
              <span className="font-mono">{permit.code}</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>
                {t.zeroClick.triggeredAt}: {autoRenewal.zeroClickTriggeredAt}
              </span>
              {permit.expiresAt && (
                <>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>
                    {t.expiresPrefix} {permit.expiresAt}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-600 pt-1 leading-relaxed">{autoRenewal.summary}</p>
          </div>

          {/* Reservations Chain */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-700">
                {t.zeroClick.stepsHeading}
              </h3>
              {isRescheduling && (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#5E4AE3]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.zeroClick.rescheduleUpdating}</span>
                </span>
              )}
            </div>

            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {autoRenewal.reservations.map((res, idx) => {
                const statusLabel =
                  t.zeroClick.reservationStatuses[res.status] || res.status;
                const typeLabel = t.zeroClick.typeLabels[res.type] || res.type;

                return (
                  <div key={res.id} className="p-4 space-y-2.5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          {getReservationIcon(res.type)}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-xs font-medium text-[#5E4AE3]">
                            0{idx + 1}. {typeLabel}
                          </div>
                          <div className="text-sm font-semibold text-slate-900">{res.title}</div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 pt-0.5">
                            <span>{res.provider}</span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{res.location}</span>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{res.bookingRef}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 space-y-1">
                        <div
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            res.status === 'Completed' || res.status === 'Confirmed'
                              ? 'text-emerald-700'
                              : res.status === 'Reserved'
                              ? 'text-[#5E4AE3]'
                              : 'text-slate-600'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{statusLabel}</span>
                        </div>
                        <div className="flex items-center justify-end gap-1.5 text-xs font-mono tabular-nums text-slate-700">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{res.scheduledAt}</span>
                        </div>
                      </div>
                    </div>

                    {!isCompleted && res.availableSlots && res.availableSlots.length > 0 && (
                      <div className="pl-11 flex flex-wrap items-center gap-2 pt-1">
                        <label
                          htmlFor={`slot-${res.id}`}
                          className="text-[11px] text-slate-500"
                        >
                          {t.zeroClick.slotSelectLabel}
                        </label>
                        <select
                          id={`slot-${res.id}`}
                          disabled={isRescheduling || isCompleting}
                          value={res.scheduledAt}
                          onChange={(e) =>
                            void onRescheduleSlot(
                              employee.id,
                              permit.id,
                              res.id,
                              e.target.value
                            )
                          }
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono tabular-nums text-slate-800 focus:bg-white focus:border-[#5E4AE3] focus:outline-none"
                        >
                          {res.availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {isCompleted && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 flex items-center gap-2.5 text-xs font-medium text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.zeroClick.alreadyCompleted}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50/70">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            {t.zeroClick.close}
          </button>

          {!isCompleted && (
            <button
              type="button"
              disabled={isCompleting || isRescheduling}
              onClick={() => void onCompleteRenewal(employee.id, permit.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#5E4AE3] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.zeroClick.completingAndIssuing}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.zeroClick.completeAndIssue}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
