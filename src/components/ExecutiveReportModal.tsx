import React, { useState } from 'react';
import { Check, Copy, FileText, Printer, X } from 'lucide-react';
import type { ExecutiveReportPayload } from '../types/hr';
import type { Translations } from '../i18n/translations';

interface ExecutiveReportModalProps {
  t: Translations;
  report: ExecutiveReportPayload | null;
  onClose: () => void;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  t,
  report,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopySummary = async () => {
    const text = [
      `VALMIUS HR — ${t.execReportTitle.toUpperCase()}`,
      `${report.organizationName}`,
      `${report.unitName}`,
      `${t.generatedPrefix}: ${report.generatedAt} (${report.generatedBy})`,
      ``,
      `${t.overallReadiness}: ${report.readinessScorePct}%`,
      `${t.activeWorkforce}: ${report.totalPersonnel} (${report.permanentCount} / ${report.fixedTermCount})`,
      `${t.openTriggers}: ${report.openUrgentItems} (${t.sessionActions}: ${report.resolvedThisSession})`,
      ``,
      `${t.domainCoverageHeading}:`,
      ...report.categoryCoverage.map(
        (c) => `- ${t.categories[c.category] || c.category}: ${c.percentage}% (${c.compliantCount}/${c.totalCount})`
      ),
      ``,
      `${t.keyFindingsHeading}:`,
      ...report.keyFindings.map((f) => `- ${f}`),
      ``,
      `${t.leadershipActionsHeading}:`,
      ...report.recommendedDecisions.map((d) => `- ${d}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked in restricted frame
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exec-report-title"
    >
      <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 bg-slate-50/70">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5E4AE3]/10 text-[#5E4AE3] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="exec-report-title" className="text-lg font-semibold text-slate-900">
                {t.execReportTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                {report.unitName} · {t.generatedPrefix} {report.generatedAt}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report modal"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5 border-b border-slate-200">
            <div>
              <p className="text-xs text-slate-500">{t.overallReadiness}</p>
              <p className="text-2xl font-display font-semibold text-slate-900 tabular-nums mt-1">
                {report.readinessScorePct}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.activeWorkforce}</p>
              <p className="text-2xl font-display font-semibold text-slate-900 tabular-nums mt-1">
                {report.totalPersonnel}
              </p>
              <p className="text-xs text-slate-500 tabular-nums">
                {report.permanentCount} / {report.fixedTermCount}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.openTriggers}</p>
              <p className="text-2xl font-display font-semibold text-slate-900 tabular-nums mt-1">
                {report.openUrgentItems}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">{t.sessionActions}</p>
              <p className="text-2xl font-display font-semibold text-emerald-700 tabular-nums mt-1">
                {report.resolvedThisSession}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {t.domainCoverageHeading}
            </h3>
            <div className="space-y-3">
              {report.categoryCoverage.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">
                      {t.categories[item.category] || item.category}
                    </span>
                    <span className="font-mono tabular-nums text-slate-600">
                      {item.percentage}% ({item.compliantCount}/{item.totalCount})
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#5E4AE3] transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2.5">
                {t.keyFindingsHeading}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {report.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2.5">
                {t.leadershipActionsHeading}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {report.recommendedDecisions.map((decision, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5E4AE3] shrink-0" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
            {t.preparedBy} {report.generatedBy} · {report.organizationName}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50/70">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.copiedClipboard}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.copyExecSummary}</span>
              </>
            )}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.printBrief}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-[#5E4AE3] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] transition-colors whitespace-nowrap shrink-0"
            >
              {t.done}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
