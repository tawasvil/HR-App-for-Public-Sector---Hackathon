import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CalendarClock, Download, Loader2, ShieldCheck, Users } from 'lucide-react';
import type { DashboardPayload } from '../types/hr';
import type { Translations } from '../i18n/translations';

interface AnalyticsReportViewProps {
  t: Translations;
  dashboard: DashboardPayload;
  isExporting: boolean;
  onExportReport: () => void;
  onSelectEmployee: (employeeId: string) => void;
}

export const AnalyticsReportView: React.FC<AnalyticsReportViewProps> = ({
  t,
  dashboard,
  isExporting,
  onExportReport,
  onSelectEmployee,
}) => {
  const { overview, categoryCoverage, contractOutlook, employees } = dashboard;

  const permanentPct = Math.round((overview.permanentCount / overview.totalPersonnel) * 100);
  const fixedTermPct = 100 - permanentPct;

  const fixedTermEmployees = employees.filter((e) => e.employmentType === 'Fixed-Term');

  const localizedCoverage = categoryCoverage.map((item) => ({
    ...item,
    displayCategory: t.categories[item.category] || item.category,
  }));

  return (
    <div className="space-y-8">
      {/* Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-slate-900">
            {t.analyticsTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{t.analyticsSubtitle}</p>
        </div>

        <button
          type="button"
          disabled={isExporting}
          onClick={onExportReport}
          className="inline-flex items-center gap-2 rounded-lg bg-[#5E4AE3] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#4F3FD1] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.compilingReport}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{t.exportReport}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Analytics Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Qualification Coverage by Category */}
        <section className="xl:col-span-7 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-display font-semibold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5E4AE3]" />
                <span>{t.catCoverageTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.catCoverageSubtitle}</p>
            </div>
            <span className="text-xs font-mono tabular-nums text-slate-500">
              {t.unitAvg} {overview.complianceRatePct}%
            </span>
          </div>

          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={localizedCoverage}
                margin={{ top: 16, right: 16, left: -12, bottom: 8 }}
                barSize={44}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="displayCategory"
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(val) => `${val}%`}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
                    fontSize: '12px',
                  }}
                  formatter={(value: unknown, _name: unknown, props: { payload?: { compliantCount?: number; totalCount?: number } }) => [
                    `${value}% (${props?.payload?.compliantCount ?? 0}/${props?.payload?.totalCount ?? 0})`,
                    t.colCoverage,
                  ]}
                />
                <ReferenceLine
                  y={95}
                  stroke="#16A34A"
                  strokeDasharray="4 4"
                  label={{
                    value: t.auditTarget95,
                    position: 'insideTopRight',
                    fill: '#15803D',
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {localizedCoverage.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={
                        entry.percentage >= 92
                          ? '#5E4AE3'
                          : entry.percentage >= 85
                          ? '#D97706'
                          : '#DC2626'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Personnel Breakdown & Contract Horizon */}
        <section className="xl:col-span-5 rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between gap-6">
          <div>
            <h2 className="text-base font-display font-semibold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#5E4AE3]" />
              <span>{t.workforceTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.workforceSubtitle}</p>

            {/* Clean Proportional Bar */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 tabular-nums">
                  {t.permanentStaff} ({overview.permanentCount} · {permanentPct}%)
                </span>
                <span className="font-medium text-amber-800 tabular-nums">
                  {t.fixedTermStaff} ({overview.fixedTermCount} · {fixedTermPct}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-[#5E4AE3] transition-all duration-300"
                  style={{ width: `${permanentPct}%` }}
                />
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${fixedTermPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* 6-Month Contract Expirations Chart */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <CalendarClock className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.contractHorizonTitle}</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                Dec 2026 – May 2027
              </span>
            </div>

            <div className="h-[185px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contractOutlook}
                  margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
                  barSize={24}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#475569', fontSize: 11 }}
                    axisLine={{ stroke: '#CBD5E1' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontSize: '12px',
                    }}
                  />
                  <Bar
                    dataKey="fixedTermExpiring"
                    name={t.fixedTermEndingSeries}
                    fill="#D97706"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="renewalsPending"
                    name={t.renewalsPendingSeries}
                    fill="#5E4AE3"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Data Grid: Category Audit Breakdown & Fixed-Term Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-sm font-display font-semibold text-slate-900">
              {t.domainMatrixTitle}
            </h2>
          </div>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                <th className="py-2.5 px-6">{t.colCategory}</th>
                <th className="py-2.5 px-4 text-right">{t.colVerified}</th>
                <th className="py-2.5 px-6 text-right">{t.colCoverage}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoryCoverage.map((row) => (
                <tr key={row.category}>
                  <td className="py-3 px-6 font-medium text-slate-800">
                    {t.categories[row.category] || row.category}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-xs tabular-nums text-slate-600">
                    {row.compliantCount} / {row.totalCount}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums ${
                        row.percentage >= 92
                          ? 'text-emerald-700'
                          : row.percentage >= 85
                          ? 'text-amber-700'
                          : 'text-red-700'
                      }`}
                    >
                      {row.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-sm font-display font-semibold text-slate-900">
              {t.fixedTermWatchlistTitle}
            </h2>
          </div>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium text-slate-500">
                <th className="py-2.5 px-6">{t.colEmployee}</th>
                <th className="py-2.5 px-4">{t.colDeputy}</th>
                <th className="py-2.5 px-6 text-right">{t.colEndDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fixedTermEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => onSelectEmployee(emp.id)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-6">
                    <div className="font-medium text-slate-900">{emp.name}</div>
                    <div className="text-xs text-slate-500">{emp.role}</div>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">{emp.deputyName}</td>
                  <td className="py-3 px-6 text-right font-mono text-xs tabular-nums text-slate-700">
                    {emp.contractEndDate || t.convertedLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
