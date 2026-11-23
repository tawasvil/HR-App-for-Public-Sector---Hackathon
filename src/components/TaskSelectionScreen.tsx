import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CalendarClock,
  Shield,
  UserCheck,
} from 'lucide-react';
import type { DashboardPayload } from '../types/hr';
import type { Language, Translations } from '../i18n/translations';
import { EmployeeAvatar } from './StatusIndicator';
import { AppFooter } from './AppFooter';

export type TaskChoice =
  | 'alarms'
  | 'profile'
  | 'contract'
  | 'analytics'
  | 'copilot';

interface TaskSelectionScreenProps {
  t: Translations;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  dashboard: DashboardPayload | null;
  onSelectTask: (task: TaskChoice) => void;
  onOpenAbout: () => void;
}

const LANGUAGE_OPTIONS: { code: Language; label: string; name: string }[] = [
  { code: 'fi', label: 'FI', name: 'Suomi' },
  { code: 'sv', label: 'SV', name: 'Svenska' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const TaskSelectionScreen: React.FC<TaskSelectionScreenProps> = ({
  t,
  language,
  onChangeLanguage,
  dashboard,
  onSelectTask,
  onOpenAbout,
}) => {
  const total = dashboard?.overview.totalPersonnel ?? 42;
  const coverage = dashboard?.overview.complianceRatePct ?? 88;
  const urgent = dashboard?.overview.urgentActionsCount ?? 4;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Clean Top Bar */}
      <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-base tracking-tight text-slate-900 whitespace-nowrap">
            Valmius HR
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div
            className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/80"
            role="group"
            aria-label="Language toggle"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => onChangeLanguage(opt.code)}
                title={opt.name}
                aria-pressed={language === opt.code}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  language === opt.code
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2.5 pl-4 border-l border-slate-200">
            <EmployeeAvatar
              name={dashboard?.supervisor.name || 'Laura Korhonen'}
              initials="LK"
              avatarUrl={
                dashboard?.supervisor.avatarUrl ||
                '/src/assets/images/avatar_laura_korhonen_1795444452856.jpg'
              }
              size="sm"
            />
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-900 whitespace-nowrap">
                {t.supervisorLabel}
              </div>
              <div className="text-[11px] text-slate-500 whitespace-nowrap">
                {t.orgName}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Centered Task Selection Canvas */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10">
        <div className="w-full max-w-5xl space-y-8">
          {/* Editorial Heading & Live Unit Status Line */}
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#5E4AE3]">{t.taskGreeting}</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 text-balance">
              {t.taskHeading}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.taskSubheading}
            </p>
            <p className="text-xs font-mono tabular-nums text-slate-500 pt-1">
              {t.taskSnapshotSummary(total, coverage, urgent)}
            </p>
          </div>

          {/* 4 Primary Supervisory Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Task 1: Urgent Compliance Alarms */}
            <button
              type="button"
              onClick={() => onSelectTask('alarms')}
              className="group text-left rounded-xl border border-slate-200 bg-white p-6 hover:border-[#5E4AE3] transition-colors flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <BellRing className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs tabular-nums font-medium text-amber-800">
                    {urgent} {urgent === 1 ? t.kpiItemSingular : t.kpiItemPlural}
                  </span>
                </div>
                <h2 className="text-base font-display font-semibold text-slate-900 group-hover:text-[#5E4AE3] transition-colors">
                  {t.taskAlarmsTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.taskAlarmsDesc(urgent)}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E4AE3]">
                <span>{t.taskAlarmsAction}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Task 2: Person & Role 360° */}
            <button
              type="button"
              onClick={() => onSelectTask('profile')}
              className="group text-left rounded-xl border border-slate-200 bg-white p-6 hover:border-[#5E4AE3] transition-colors flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5E4AE3]/10 border border-[#5E4AE3]/20 text-[#5E4AE3] flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-slate-500">
                    {total} {t.kpiActiveEmployees}
                  </span>
                </div>
                <h2 className="text-base font-display font-semibold text-slate-900 group-hover:text-[#5E4AE3] transition-colors">
                  {t.taskProfileTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.taskProfileDesc}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E4AE3]">
                <span>{t.taskProfileAction}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Task 3: Fixed-Term Contract Decision */}
            <button
              type="button"
              onClick={() => onSelectTask('contract')}
              className="group text-left rounded-xl border border-slate-200 bg-white p-6 hover:border-[#5E4AE3] transition-colors flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <CalendarClock className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-slate-500">
                    2026-12-23
                  </span>
                </div>
                <h2 className="text-base font-display font-semibold text-slate-900 group-hover:text-[#5E4AE3] transition-colors">
                  {t.taskContractTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.taskContractDesc}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E4AE3]">
                <span>{t.taskContractAction}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Task 4: Unit Audit & Readiness Report */}
            <button
              type="button"
              onClick={() => onSelectTask('analytics')}
              className="group text-left rounded-xl border border-slate-200 bg-white p-6 hover:border-[#5E4AE3] transition-colors flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-emerald-700">
                    {coverage}% {t.kpiCompliant}
                  </span>
                </div>
                <h2 className="text-base font-display font-semibold text-slate-900 group-hover:text-[#5E4AE3] transition-colors">
                  {t.taskAnalyticsTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.taskAnalyticsDesc}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E4AE3]">
                <span>{t.taskAnalyticsAction}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>

          {/* Task 5: AI HR Copilot Row + Direct Dashboard Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => onSelectTask('copilot')}
              className="group flex-1 text-left rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-[#5E4AE3] transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-display font-semibold text-slate-900 group-hover:text-[#5E4AE3] transition-colors">
                    {t.taskCopilotTitle}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 truncate">
                    {t.taskCopilotDesc}
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E4AE3] whitespace-nowrap shrink-0">
                <span>{t.taskCopilotAction}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTask('alarms')}
              className="rounded-xl bg-[#5E4AE3] px-5 py-4 text-xs font-semibold text-white hover:bg-[#4F3FD1] transition-colors whitespace-nowrap shrink-0"
            >
              {t.taskSkipToOverview}
            </button>
          </div>
        </div>
      </main>

      <AppFooter t={t} onOpenAbout={onOpenAbout} />
    </div>
  );
};
