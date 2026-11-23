import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Car,
  CheckCircle2,
  Clock,
  FileWarning,
  GraduationCap,
  Loader2,
  Search,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import type { AlarmTrigger, DashboardPayload, Employee, Permit } from '../types/hr';
import type { Translations } from '../i18n/translations';
import { ComplianceBadge, EmployeeAvatar } from './StatusIndicator';

interface SituationalOverviewProps {
  t: Translations;
  dashboard: DashboardPayload;
  resolvingAlarmId: string | null;
  isTogglingPolicy: boolean;
  completingZeroClickPermitId: string | null;
  onResolveAlarm: (alarm: AlarmTrigger, actionLabel?: string) => void;
  onToggleZeroClickPolicy: (enabled: boolean) => void;
  onOpenZeroClickModal: (employeeId: string, permitId: string) => void;
  onCompleteZeroClick: (employeeId: string, permitId: string) => void;
  onSelectEmployee: (employeeId: string) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
}

export const SituationalOverview: React.FC<SituationalOverviewProps> = ({
  t,
  dashboard,
  resolvingAlarmId,
  isTogglingPolicy,
  completingZeroClickPermitId,
  onResolveAlarm,
  onToggleZeroClickPolicy,
  onOpenZeroClickModal,
  onCompleteZeroClick,
  onSelectEmployee,
  onOpenCopilotWithPrompt,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Action Required' | 'Compliant'>('All');
  const [employmentFilter, setEmploymentFilter] = useState<'All' | 'Permanent' | 'Fixed-Term'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResolvedAlarms, setShowResolvedAlarms] = useState(false);

  const { overview, alarms, employees, zeroClickPolicyEnabled } = dashboard;

  const stagedPipelines = useMemo(() => {
    const items: { employee: Employee; permit: Permit }[] = [];
    for (const emp of employees) {
      for (const perm of emp.permits) {
        if (perm.autoRenewal && perm.autoRenewal.stage !== 'completed') {
          items.push({ employee: emp, permit: perm });
        }
      }
    }
    return items;
  }, [employees]);

  const activeAlarms = useMemo(() => alarms.filter((a) => !a.resolved), [alarms]);
  const resolvedAlarms = useMemo(() => alarms.filter((a) => a.resolved), [alarms]);

  const visibleAlarms = showResolvedAlarms ? alarms : activeAlarms;

  const filteredEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return employees.filter((emp) => {
      if (statusFilter !== 'All' && emp.overallStatus !== statusFilter) return false;
      if (employmentFilter !== 'All' && emp.employmentType !== employmentFilter) return false;
      if (q) {
        const hay = [
          emp.name,
          emp.role,
          emp.unit,
          emp.contractStatus,
          ...emp.permits.map((p) => p.name),
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [employees, statusFilter, employmentFilter, searchQuery]);

  const getAlarmIcon = (category: AlarmTrigger['category']) => {
    switch (category) {
      case 'Expiring License':
        return <Clock className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'Missing Training':
        return <GraduationCap className="w-4 h-4 text-red-600 shrink-0" />;
      case 'Contract Ending':
        return <CalendarClock className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'Missing Data':
      default:
        return <FileWarning className="w-4 h-4 text-red-600 shrink-0" />;
    }
  };

  const resetFilters = () => {
    setStatusFilter('All');
    setEmploymentFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Context */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-slate-900">
            {t.overviewTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{t.overviewSubtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenCopilotWithPrompt(t.presetPrompts[1])}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:border-[#5E4AE3]/40 hover:text-[#5E4AE3] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <span>{t.auditRiskCta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top KPI Summary Cards */}
      <section aria-label="Unit Key Performance Indicators" className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.kpiTotalPersonnel}</span>
            <Users className="w-4 h-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-display font-bold text-slate-900 tabular-nums">
              {overview.totalPersonnel}
            </span>
            <span className="text-xs text-slate-500">{t.kpiActiveEmployees}</span>
          </div>
          <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 tabular-nums">
            {t.kpiPersonnelSub(overview.permanentCount, overview.fixedTermCount, overview.rosterSampleCount)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.kpiCoverage}</span>
            <ShieldCheck className="w-4 h-4 text-[#5E4AE3]" aria-hidden="true" />
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-3xl font-display font-bold text-slate-900 tabular-nums">
              {overview.complianceRatePct}%
            </span>
            <span className="text-xs font-medium text-emerald-700">{t.kpiCompliant}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#5E4AE3] transition-all duration-300"
                style={{ width: `${overview.complianceRatePct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.kpiUrgentActions}</span>
            {overview.urgentActionsCount > 0 ? (
              <AlertTriangle className="w-4 h-4 text-amber-600" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            )}
          </div>
          <div className="mt-3 flex items-baseline gap-2.5">
            <span
              className={`text-3xl font-display font-bold tabular-nums ${
                overview.urgentActionsCount > 0 ? 'text-slate-900' : 'text-emerald-700'
              }`}
            >
              {overview.urgentActionsCount}
            </span>
            <span className="text-xs text-slate-500">
              {overview.urgentActionsCount === 1 ? t.kpiItemSingular : t.kpiItemPlural}
            </span>
          </div>
          <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 tabular-nums">
            {resolvedAlarms.length > 0
              ? t.kpiResolvedSession(resolvedAlarms.length)
              : t.kpiRollingWindow}
          </p>
        </div>
      </section>

      {/* Zero-Click License & Permit Renewal Automation Bar */}
      <section
        aria-label={t.zeroClick.engineTitle}
        className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#5E4AE3]/10 text-[#5E4AE3] flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="text-sm font-display font-semibold text-slate-900">
                {t.zeroClick.engineTitle}
              </h2>
              <span className="text-xs font-mono font-medium text-[#5E4AE3] tabular-nums">
                {t.zeroClick.zeroClicksBadge}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              {t.zeroClick.engineSubtitle}
            </p>
            <p className="text-xs text-slate-500 pt-0.5 tabular-nums">
              {stagedPipelines.length > 0
                ? t.zeroClick.stagedSummary(stagedPipelines.length)
                : t.zeroClick.noPendingPipelines}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            disabled={isTogglingPolicy}
            aria-pressed={zeroClickPolicyEnabled}
            onClick={() => onToggleZeroClickPolicy(!zeroClickPolicyEnabled)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              zeroClickPolicyEnabled
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-50'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                zeroClickPolicyEnabled ? 'text-emerald-600' : 'text-slate-400'
              }`}
            />
            <span>
              {zeroClickPolicyEnabled ? t.zeroClick.policyActive : t.zeroClick.policyManual}
            </span>
          </button>

          {stagedPipelines.length > 0 && (
            <button
              type="button"
              onClick={() =>
                onOpenZeroClickModal(
                  stagedPipelines[0].employee.id,
                  stagedPipelines[0].permit.id
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.zeroClick.inspectReservations}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Proactive Timely Alarms Feed */}
      <section aria-label={t.alarmsTitle} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-display font-semibold text-slate-900">
              {t.alarmsTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.alarmsSubtitle}</p>
          </div>
          {resolvedAlarms.length > 0 && (
            <button
              type="button"
              onClick={() => setShowResolvedAlarms((v) => !v)}
              className="text-xs font-medium text-[#5E4AE3] hover:text-[#4F3FD1] transition-colors whitespace-nowrap"
            >
              {showResolvedAlarms ? t.hideResolved : t.showResolved(resolvedAlarms.length)}
            </button>
          )}
        </div>

        {visibleAlarms.length === 0 ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {t.allAlarmsAddressedTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{t.allAlarmsAddressedBody}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowResolvedAlarms(true)}
              className="rounded-lg border border-emerald-200 bg-white px-3.5 py-2 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition-colors whitespace-nowrap shrink-0"
            >
              {t.reviewActionLog}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {visibleAlarms.map((alarm) => {
              const isResolving = resolvingAlarmId === alarm.id;
              const matchedEmp = employees.find((e) => e.id === alarm.employeeId);
              const autoPermit =
                alarm.category === 'Expiring License'
                  ? matchedEmp?.permits.find((p) => p.autoRenewal)
                  : undefined;
              const isCompletingAuto =
                autoPermit && completingZeroClickPermitId === autoPermit.id;

              return (
                <div
                  key={alarm.id}
                  className={`rounded-xl border p-5 transition-colors flex flex-col justify-between gap-4 ${
                    alarm.resolved
                      ? 'border-slate-200 bg-slate-50/70'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        {alarm.resolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          getAlarmIcon(alarm.category)
                        )}
                        <span
                          className={
                            alarm.resolved
                              ? 'text-emerald-700'
                              : alarm.severity === 'urgent'
                              ? 'text-red-700'
                              : 'text-amber-800'
                          }
                        >
                          {alarm.resolved
                            ? `${t.resolvedPrefix} · ${t.alarmCategories[alarm.category] || alarm.category}`
                            : alarm.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectEmployee(alarm.employeeId)}
                        className="text-xs font-medium text-slate-600 hover:text-[#5E4AE3] transition-colors whitespace-nowrap shrink-0"
                      >
                        {t.openProfile360}
                      </button>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => onSelectEmployee(alarm.employeeId)}
                        className="text-left group"
                      >
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-[#5E4AE3] transition-colors">
                          {alarm.employeeName}
                        </span>
                        <span className="text-xs text-slate-500 ml-2">{alarm.employeeRole}</span>
                      </button>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {alarm.resolved ? alarm.resolutionNote : alarm.description}
                      </p>

                      {!alarm.resolved && autoPermit?.autoRenewal && (
                        <div className="mt-3 rounded-lg bg-slate-50 px-3.5 py-2.5 divide-y divide-slate-200/70 text-xs">
                          {autoPermit.autoRenewal.reservations
                            .filter((r) => r.type !== 'authority_filing')
                            .map((res) => (
                              <div
                                key={res.id}
                                className="py-1.5 first:pt-0.5 last:pb-0.5 flex flex-wrap items-center justify-between gap-2"
                              >
                                <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                                  {res.type === 'health_check' ? (
                                    <Stethoscope className="w-3.5 h-3.5 text-[#5E4AE3] shrink-0" />
                                  ) : res.type === 'test_drive' ? (
                                    <Car className="w-3.5 h-3.5 text-[#5E4AE3] shrink-0" />
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
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                    {alarm.resolved ? (
                      <span className="text-xs text-slate-500 tabular-nums">
                        {t.actionedAt(alarm.resolvedAt || '')}
                      </span>
                    ) : autoPermit && matchedEmp ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={Boolean(isCompletingAuto) || isResolving}
                          onClick={() => onCompleteZeroClick(matchedEmp.id, autoPermit.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
                        >
                          {isCompletingAuto ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>{t.zeroClick.finalizing}</span>
                            </>
                          ) : (
                            <span>{t.zeroClick.finalizeAutoRenewal}</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenZeroClickModal(matchedEmp.id, autoPermit.id)}
                          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                        >
                          {t.zeroClick.manageSlots}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={isResolving}
                          onClick={() => onResolveAlarm(alarm)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#5E4AE3] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
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
                            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
                          >
                            {t.alarmActions[alarm.secondaryActionLabel] ||
                              alarm.secondaryActionLabel}
                          </button>
                        )}
                      </div>
                    )}

                    {!alarm.resolved && alarm.employeeId === 'emp-mikko-virtanen' && (
                      <button
                        type="button"
                        onClick={() => onOpenCopilotWithPrompt(t.presetPrompts[0])}
                        className="text-xs font-medium text-[#5E4AE3] hover:text-[#4F3FD1] transition-colors whitespace-nowrap"
                      >
                        {t.draftWithCopilot}
                      </button>
                    )}
                    {!alarm.resolved && alarm.employeeId === 'emp-antti-laine' && (
                      <button
                        type="button"
                        onClick={() => onOpenCopilotWithPrompt(t.presetPrompts[2])}
                        className="text-xs font-medium text-[#5E4AE3] hover:text-[#4F3FD1] transition-colors whitespace-nowrap"
                      >
                        {t.analyzeCoverage}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Unit Personnel Table */}
      <section aria-label={t.rosterTitle} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-display font-semibold text-slate-900">
              {t.rosterTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
              {t.rosterSubtitle(filteredEmployees.length, employees.length)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <div className="relative min-w-[220px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#5E4AE3] focus:outline-none focus:ring-2 focus:ring-[#5E4AE3]/15"
              />
            </div>

            {/* Status filter segmented control */}
            <div className="inline-flex items-center rounded-lg bg-slate-100 p-1" role="group" aria-label="Filter by compliance status">
              {(['All', 'Action Required', 'Compliant'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    statusFilter === status
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {status === 'All' ? t.filterAll : t.statuses[status]}
                </button>
              ))}
            </div>

            {/* Employment type segmented control */}
            <div className="inline-flex items-center rounded-lg bg-slate-100 p-1" role="group" aria-label="Filter by employment type">
              {(['All', 'Permanent', 'Fixed-Term'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEmploymentFilter(type)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    employmentFilter === type
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type === 'All'
                    ? t.filterAllTypes
                    : type === 'Permanent'
                    ? t.filterPermanent
                    : t.filterFixedTerm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <AlertCircle className="w-6 h-6 text-slate-400 mx-auto" />
            <div>
              <p className="text-sm font-medium text-slate-900">{t.noMatchesTitle}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.noMatchesBody}</p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                  <th className="py-3 px-5">{t.colNameRole}</th>
                  <th className="py-3 px-4">{t.colEmployment}</th>
                  <th className="py-3 px-4">{t.colPermits}</th>
                  <th className="py-3 px-4">{t.colTraining}</th>
                  <th className="py-3 px-5 text-right">{t.colProfile}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredEmployees.map((emp: Employee) => {
                  const flaggedPermit = emp.permits.find((p) => p.status !== 'Valid');
                  const statusKey = flaggedPermit ? flaggedPermit.status : emp.overallStatus;
                  return (
                    <tr
                      key={emp.id}
                      onClick={() => onSelectEmployee(emp.id)}
                      className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <EmployeeAvatar
                            name={emp.name}
                            initials={emp.initials}
                            avatarUrl={emp.avatarUrl}
                            size="md"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 group-hover:text-[#5E4AE3] transition-colors truncate">
                              {emp.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate">{emp.role}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-xs font-medium text-slate-800">{emp.contractStatus}</div>
                        <div className="text-xs text-slate-500 tabular-nums mt-0.5">
                          {emp.contractEndDate
                            ? `${t.endsPrefix} ${emp.contractEndDate}`
                            : t.indefiniteTenure}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-col items-start gap-1">
                          <ComplianceBadge
                            status={statusKey}
                            label={t.statuses[statusKey]}
                            compact
                          />
                          <span className="text-xs text-slate-500 truncate max-w-[240px]">
                            {flaggedPermit
                              ? flaggedPermit.name
                              : t.activePermitsVerified(emp.permits.length)}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5 min-w-[140px]">
                          <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                emp.trainingCompletionPct < 80
                                  ? 'bg-red-500'
                                  : emp.trainingCompletionPct < 95
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-600'
                              }`}
                              style={{ width: `${emp.trainingCompletionPct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono tabular-nums text-slate-700 w-9 text-right">
                            {emp.trainingCompletionPct}%
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEmployee(emp.id);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#5E4AE3] hover:text-[#5E4AE3] transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>{t.viewProfile}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
