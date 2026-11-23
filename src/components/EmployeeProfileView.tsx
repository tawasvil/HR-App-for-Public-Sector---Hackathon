import React, { useState } from 'react';
import {
  ArrowLeft,
  BellRing,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  History,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Zap,
} from 'lucide-react';
import type { AlarmTrigger, Employee, QualificationCategory } from '../types/hr';
import type { Translations } from '../i18n/translations';
import { ComplianceBadge, EmployeeAvatar } from './StatusIndicator';

interface EmployeeProfileViewProps {
  t: Translations;
  employee: Employee;
  allEmployees: Employee[];
  employeeAlarms: AlarmTrigger[];
  resolvingAlarmId: string | null;
  isAssigningTraining: boolean;
  reservingPermitId: string | null;
  completingZeroClickPermitId: string | null;
  onBack: () => void;
  onSelectEmployee: (employeeId: string) => void;
  onResolveAlarm: (alarm: AlarmTrigger, actionLabel?: string) => void;
  onAssignTraining: (
    employeeId: string,
    payload: { title: string; category: QualificationCategory; dueDate: string; hours: number }
  ) => Promise<void>;
  onTriggerZeroClickReserve: (employeeId: string, permitId: string) => void;
  onOpenZeroClickModal: (employeeId: string, permitId: string) => void;
  onCompleteZeroClick: (employeeId: string, permitId: string) => void;
  onOpenContractReview: (employee: Employee) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

const QUICK_TRAINING_TEMPLATES: {
  title: string;
  category: QualificationCategory;
  hours: number;
}[] = [
  {
    title: 'Emergency Vehicle C1/CE Medical & Tactical Refresher',
    category: 'Safety Permits',
    hours: 6,
  },
  {
    title: 'Annual Information Security & Patient Data GDPR',
    category: 'Information Security',
    hours: 2,
  },
  {
    title: 'Mass-Casualty Triage & Dispatch Coordination Drill',
    category: 'Role Certifications',
    hours: 4,
  },
  {
    title: 'Public Sector Shift Supervision & Deputy Readiness',
    category: 'Leadership Training',
    hours: 8,
  },
];

export const EmployeeProfileView: React.FC<EmployeeProfileViewProps> = ({
  t,
  employee,
  allEmployees,
  employeeAlarms,
  resolvingAlarmId,
  isAssigningTraining,
  reservingPermitId,
  completingZeroClickPermitId,
  onBack,
  onSelectEmployee,
  onResolveAlarm,
  onAssignTraining,
  onTriggerZeroClickReserve,
  onOpenZeroClickModal,
  onCompleteZeroClick,
  onOpenContractReview,
  onOpenCopilotWithPrompt,
}) => {
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [trainingTitle, setTrainingTitle] = useState(QUICK_TRAINING_TEMPLATES[0].title);
  const [trainingCategory, setTrainingCategory] = useState<QualificationCategory>(
    QUICK_TRAINING_TEMPLATES[0].category
  );
  const [trainingDueDate, setTrainingDueDate] = useState('2026-12-10');
  const [trainingHours, setTrainingHours] = useState(6);

  const openAlarms = employeeAlarms.filter((a) => !a.resolved);

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingTitle.trim()) return;
    await onAssignTraining(employee.id, {
      title: trainingTitle,
      category: trainingCategory,
      dueDate: trainingDueDate,
      hours: trainingHours,
    });
    setShowAssignForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Back Navigation & Quick Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToOverview}</span>
        </button>

        <div className="flex items-center gap-3">
          <label htmlFor="employee-switcher" className="text-xs text-slate-500 whitespace-nowrap">
            {t.switchEmployee}
          </label>
          <select
            id="employee-switcher"
            value={employee.id}
            onChange={(e) => onSelectEmployee(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-[#5E4AE3] focus:outline-none focus:ring-2 focus:ring-[#5E4AE3]/15"
          >
            {allEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} — {emp.role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Unified Person & Role 360 Header Card */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <EmployeeAvatar
              name={employee.name}
              initials={employee.initials}
              avatarUrl={employee.avatarUrl}
              size="lg"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-display font-bold text-slate-900">
                  {employee.name}
                </h1>
                <ComplianceBadge
                  status={employee.overallStatus}
                  label={t.statuses[employee.overallStatus]}
                />
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  {employee.employeeNumber}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700">
                {employee.role} · {employee.unit}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                <span>{employee.contractStatus}</span>
                {employee.contractEndDate && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-amber-700 tabular-nums">
                      {t.contractEnds} {employee.contractEndDate}
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>
                  {t.supervisorPrefix} {employee.supervisor}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.email}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.phone}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{employee.location}</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {employee.employmentType === 'Fixed-Term' && (
                <button
                  type="button"
                  onClick={() => onOpenContractReview(employee)}
                  className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                >
                  {t.reviewContract}
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  onOpenCopilotWithPrompt(
                    employee.id === 'emp-mikko-virtanen'
                      ? t.presetPrompts[0]
                      : employee.id === 'emp-antti-laine'
                      ? t.presetPrompts[2]
                      : `${t.askCopilot}: ${employee.name}`
                  )
                }
                className="rounded-lg bg-[#5E4AE3] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] transition-colors whitespace-nowrap shrink-0"
              >
                {t.askCopilot}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Four Structured Cards on One Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Mission & Organization */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#5E4AE3]" />
              <h2 className="text-base font-display font-semibold text-slate-900">
                {t.missionTitle}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">{employee.costCenter}</span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">{employee.missionSummary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-500 block">{t.deputyLabel}</span>
              <span className="mt-1 inline-flex items-center gap-1.5 font-medium text-slate-900 text-sm">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                {employee.deputyName}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.startDateLabel}</span>
              <span className="mt-1 block font-mono tabular-nums font-medium text-slate-900 text-sm">
                {employee.contractStartDate}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.activeAssignmentsLabel}</span>
            </h3>
            <ul className="space-y-2">
              {employee.activeAssignments.map((assignment, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5E4AE3] shrink-0" />
                  <span>{assignment}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Card 2: Permits & Qualifications */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#5E4AE3]" />
              <h2 className="text-base font-display font-semibold text-slate-900">
                {t.permitsTitle}
              </h2>
            </div>
            <span className="text-xs text-slate-500 tabular-nums">
              {t.validCountLabel(
                employee.permits.filter((p) => p.status === 'Valid').length,
                employee.permits.length
              )}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {employee.permits.map((permit) => {
              const isReservingThis = reservingPermitId === permit.id;
              const isCompletingThis = completingZeroClickPermitId === permit.id;
              const auto = permit.autoRenewal;
              const isAutoCompleted = auto?.stage === 'completed';

              return (
                <div key={permit.id} className="py-3.5 first:pt-1 last:pb-1 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{permit.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        <span className="font-mono">{permit.code}</span>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span>{permit.issuer}</span>
                      </div>
                    </div>
                    <ComplianceBadge
                      status={permit.status}
                      label={t.statuses[permit.status]}
                      compact
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 tabular-nums">
                    <span>
                      {t.issuedPrefix} {permit.issuedAt}
                    </span>
                    <span
                      className={
                        permit.status === 'Expiring Soon'
                          ? 'font-medium text-amber-700'
                          : permit.status === 'Overdue' || permit.status === 'Missing'
                          ? 'font-medium text-red-700'
                          : ''
                      }
                    >
                      {permit.expiresAt ? `${t.expiresPrefix} ${permit.expiresAt}` : t.permanentPermit}
                    </span>
                  </div>
                  {permit.notes && (
                    <p className="text-xs text-slate-600 pt-0.5">{permit.notes}</p>
                  )}

                  {auto ? (
                    <div className="mt-2 rounded-lg bg-slate-50 p-3 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E4AE3]">
                          <Zap className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {isAutoCompleted
                              ? t.zeroClick.alreadyCompleted
                              : t.zeroClick.zeroClicksBadge}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenZeroClickModal(employee.id, permit.id)}
                          className="text-xs font-medium text-[#5E4AE3] hover:text-[#4F3FD1] transition-colors whitespace-nowrap"
                        >
                          {t.zeroClick.manageSlots}
                        </button>
                      </div>

                      <div className="divide-y divide-slate-200/70 text-xs">
                        {auto.reservations
                          .filter((r) => r.type !== 'authority_filing')
                          .map((res) => (
                            <div
                              key={res.id}
                              className="py-1.5 first:pt-0.5 last:pb-0.5 flex flex-wrap items-center justify-between gap-2"
                            >
                              <span className="inline-flex items-center gap-1.5 text-slate-700">
                                {res.type === 'health_check' ? (
                                  <Stethoscope className="w-3.5 h-3.5 text-[#5E4AE3] shrink-0" />
                                ) : res.type === 'test_drive' ? (
                                  <Car className="w-3.5 h-3.5 text-[#5E4AE3] shrink-0" />
                                ) : res.type === 'skills_test' ? (
                                  <ClipboardCheck className="w-3.5 h-3.5 text-[#5E4AE3] shrink-0" />
                                ) : (
                                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                )}
                                <span>{t.zeroClick.typeLabels[res.type] || res.title}</span>
                              </span>
                              <span className="font-mono tabular-nums text-slate-600">
                                {res.scheduledAt} · {res.bookingRef}
                              </span>
                            </div>
                          ))}
                      </div>

                      {!isAutoCompleted && (
                        <div className="pt-1 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            disabled={isCompletingThis}
                            onClick={() => onCompleteZeroClick(employee.id, permit.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors whitespace-nowrap"
                          >
                            {isCompletingThis ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>{t.zeroClick.finalizing}</span>
                              </>
                            ) : (
                              <span>{t.zeroClick.finalizeAutoRenewal}</span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    permit.expiresAt &&
                    permit.status !== 'Missing' && (
                      <div className="pt-1">
                        <button
                          type="button"
                          disabled={isReservingThis}
                          onClick={() => onTriggerZeroClickReserve(employee.id, permit.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#5E4AE3] hover:text-[#5E4AE3] disabled:opacity-60 transition-colors whitespace-nowrap"
                        >
                          {isReservingThis ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>{t.zeroClick.startingZeroClick}</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 text-[#5E4AE3]" />
                              <span>{t.zeroClick.startZeroClick}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Card 3: Training & Competence History */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-[#5E4AE3]" />
              <h2 className="text-base font-display font-semibold text-slate-900">
                {t.trainingTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAssignForm((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4F3FD1] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.assignTraining}</span>
            </button>
          </div>

          {showAssignForm && (
            <form
              onSubmit={handleAssignSubmit}
              className="rounded-lg border border-[#5E4AE3]/25 bg-slate-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">{t.assignFormTitle}</span>
                <button
                  type="button"
                  onClick={() => setShowAssignForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  {t.cancel}
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-slate-600">{t.quickPickLabel}</label>
                <select
                  value={
                    QUICK_TRAINING_TEMPLATES.some((tpl) => tpl.title === trainingTitle)
                      ? trainingTitle
                      : '__custom__'
                  }
                  onChange={(e) => {
                    const found = QUICK_TRAINING_TEMPLATES.find((tpl) => tpl.title === e.target.value);
                    if (found) {
                      setTrainingTitle(found.title);
                      setTrainingCategory(found.category);
                      setTrainingHours(found.hours);
                    }
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-[#5E4AE3] focus:outline-none"
                >
                  {QUICK_TRAINING_TEMPLATES.map((tpl) => (
                    <option key={tpl.title} value={tpl.title}>
                      {tpl.title} ({tpl.hours}h)
                    </option>
                  ))}
                  <option value="__custom__">{t.customTrainingOption}</option>
                </select>
                <input
                  type="text"
                  value={trainingTitle}
                  onChange={(e) => setTrainingTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-[#5E4AE3] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">{t.categoryLabel}</label>
                  <select
                    value={trainingCategory}
                    onChange={(e) => setTrainingCategory(e.target.value as QualificationCategory)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-[#5E4AE3] focus:outline-none"
                  >
                    <option value="Safety Permits">{t.categories['Safety Permits']}</option>
                    <option value="Information Security">
                      {t.categories['Information Security']}
                    </option>
                    <option value="Role Certifications">
                      {t.categories['Role Certifications']}
                    </option>
                    <option value="Leadership Training">
                      {t.categories['Leadership Training']}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">{t.dueDateLabel}</label>
                  <input
                    type="date"
                    value={trainingDueDate}
                    onChange={(e) => setTrainingDueDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 tabular-nums focus:border-[#5E4AE3] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">{t.hoursLabel}</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={trainingHours}
                    onChange={(e) => setTrainingHours(Number(e.target.value) || 2)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 tabular-nums focus:border-[#5E4AE3] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isAssigningTraining}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors"
                >
                  {isAssigningTraining ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{t.dispatchingLms}</span>
                    </>
                  ) : (
                    <span>{t.confirmAssignment}</span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-slate-100">
            {employee.trainings.map((tr) => (
              <div key={tr.id} className="py-3 first:pt-1 last:pb-1 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium text-slate-900">{tr.title}</div>
                  <div className="text-xs text-slate-500 tabular-nums">
                    <span>{t.categories[tr.category] || tr.category}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{tr.hours}h</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{tr.mandatory ? t.mandatory : t.elective}</span>
                    {tr.completedAt && (
                      <>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span>
                          {t.completedPrefix} {tr.completedAt}
                        </span>
                      </>
                    )}
                    {tr.dueDate && !tr.completedAt && (
                      <>
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        <span>
                          {t.duePrefix} {tr.dueDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <ComplianceBadge status={tr.status} label={t.statuses[tr.status]} compact />
              </div>
            ))}
          </div>
        </section>

        {/* Card 4: Active Triggers & Audit Log */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-[#5E4AE3]" />
              <h2 className="text-base font-display font-semibold text-slate-900">
                {t.triggersAuditTitle}
              </h2>
            </div>
            <span className="text-xs text-slate-500 tabular-nums">
              {t.activeAlertCount(openAlarms.length)}
            </span>
          </div>

          {openAlarms.length > 0 ? (
            <div className="space-y-3">
              {openAlarms.map((alarm) => {
                const isResolving = resolvingAlarmId === alarm.id;
                return (
                  <div
                    key={alarm.id}
                    className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <BellRing className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-amber-900">{alarm.title}</div>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                          {alarm.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={isResolving}
                        onClick={() => onResolveAlarm(alarm)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors"
                      >
                        {isResolving ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{t.processing}</span>
                          </>
                        ) : (
                          <span>
                            {t.alarmActions[alarm.recommendedActionLabel] ||
                              alarm.recommendedActionLabel}
                          </span>
                        )}
                      </button>
                      {alarm.secondaryActionLabel && (
                        <button
                          type="button"
                          disabled={isResolving}
                          onClick={() => onResolveAlarm(alarm, alarm.secondaryActionLabel)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          {t.alarmActions[alarm.secondaryActionLabel] ||
                            alarm.secondaryActionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3.5 flex items-center gap-2.5 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.noActiveTriggers(employee.name)}</span>
            </div>
          )}

          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-semibold text-slate-700">{t.auditTrailHeading}</h3>
            <div className="divide-y divide-slate-100">
              {employee.auditLog.map((entry) => (
                <div key={entry.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-slate-900">{entry.action}</span>
                    <span className="font-mono tabular-nums text-slate-500">{entry.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600">{entry.detail}</p>
                  <div className="text-[11px] text-slate-400">
                    {entry.actor}
                    {entry.channel ? ` · ${entry.channel}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
