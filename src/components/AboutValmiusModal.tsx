import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  BookOpen,
  CheckCircle2,
  Compass,
  Database,
  Layers,
  Lock,
  Shield,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { Translations } from '../i18n/translations';

type AboutTab = 'description' | 'architecture' | 'security' | 'gettingStarted';

interface AboutValmiusModalProps {
  t: Translations;
  isOpen: boolean;
  onClose: () => void;
}

export const AboutValmiusModal: React.FC<AboutValmiusModalProps> = ({
  t,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<AboutTab>('description');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: AboutTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'description',
      label: t.aboutTabs.description,
      icon: <BookOpen className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      id: 'architecture',
      label: t.aboutTabs.architecture,
      icon: <Layers className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      id: 'security',
      label: t.aboutTabs.security,
      icon: <ShieldCheck className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      id: 'gettingStarted',
      label: t.aboutTabs.gettingStarted,
      icon: <Compass className="w-3.5 h-3.5 shrink-0" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-valmius-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 bg-slate-50/70">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="about-valmius-title"
                className="text-lg font-display font-semibold text-slate-900"
              >
                {t.aboutModalTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.aboutModalSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.aboutClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="border-b border-slate-200 bg-white px-6 py-3 overflow-x-auto">
          <div
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1"
            role="tablist"
            aria-label={t.aboutModalTitle}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-[#5E4AE3]' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'description' && (
            <div className="space-y-6" role="tabpanel">
              <div className="space-y-2 max-w-3xl">
                <h3 className="text-xl font-display font-semibold text-slate-900 text-balance">
                  {t.aboutDescription.headline}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.aboutDescription.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-200">
                <div className="rounded-xl bg-slate-50 p-5 space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {t.aboutDescription.problemTitle}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.aboutDescription.problemBody}
                  </p>
                </div>
                <div className="rounded-xl bg-[#5E4AE3]/[0.04] p-5 space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {t.aboutDescription.outcomeTitle}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.aboutDescription.outcomeBody}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900">
                  {t.aboutDescription.capabilitiesHeading}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.aboutDescription.capabilities.map((cap, idx) => (
                    <div
                      key={cap.title}
                      className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs tabular-nums font-semibold text-[#5E4AE3]">
                          0{idx + 1}.
                        </span>
                        <h5 className="text-sm font-semibold text-slate-900">{cap.title}</h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cap.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6" role="tabpanel">
              <div className="space-y-1.5 max-w-3xl">
                <h3 className="text-xl font-display font-semibold text-slate-900 text-balance">
                  {t.aboutArchitecture.headline}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.aboutArchitecture.intro}
                </p>
              </div>

              {/* Layered Architecture Schema */}
              <div className="space-y-2">
                {t.aboutArchitecture.layers.map((layer, idx) => {
                  const isBoundary = idx === 1 || idx === 2;
                  return (
                    <React.Fragment key={layer.tier}>
                      <div
                        className={`rounded-xl border p-4 sm:p-5 ${
                          idx === 2
                            ? 'border-[#5E4AE3]/35 bg-[#5E4AE3]/[0.03]'
                            : isBoundary
                            ? 'border-slate-200 bg-slate-50/70'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-mono text-xs tabular-nums font-semibold text-[#5E4AE3]">
                              {layer.tier}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-900">
                              {layer.title}
                            </h4>
                          </div>
                          <div className="text-xs text-slate-500">
                            {layer.components.join(' · ')}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mt-2">
                          {layer.detail}
                        </p>
                      </div>
                      {idx < t.aboutArchitecture.layers.length - 1 && (
                        <div className="flex justify-center py-0.5 text-slate-400" aria-hidden="true">
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* External Integration Boundaries */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#5E4AE3]" />
                  <h4 className="text-sm font-semibold text-slate-900">
                    {t.aboutArchitecture.integrationsHeading}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {t.aboutArchitecture.integrations.map((item) => (
                    <div
                      key={item.system}
                      className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5"
                    >
                      <div className="text-xs font-semibold text-slate-900">{item.system}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.dataFlow}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-2 pt-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{t.aboutArchitecture.dataFlowCaption}</span>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6" role="tabpanel">
              <div className="space-y-1.5 max-w-3xl">
                <h3 className="text-xl font-display font-semibold text-slate-900 text-balance">
                  {t.aboutSecurity.headline}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.aboutSecurity.intro}
                </p>
              </div>

              <div className="space-y-4">
                {t.aboutSecurity.pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 space-y-3"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-900">{pillar.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.summary}</p>
                    </div>
                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {pillar.controls.map((control, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600 font-medium">
                {t.aboutSecurity.complianceLine}
              </div>
            </div>
          )}

          {activeTab === 'gettingStarted' && (
            <div className="space-y-6" role="tabpanel">
              <div className="space-y-1.5 max-w-3xl">
                <h3 className="text-xl font-display font-semibold text-slate-900 text-balance">
                  {t.aboutGettingStarted.headline}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.aboutGettingStarted.intro}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.aboutGettingStarted.steps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-sm tabular-nums font-bold text-[#5E4AE3]">
                          {item.step}.
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                      {item.tip}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
                {t.aboutGettingStarted.resetNote}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-6 py-4 bg-slate-50/70">
          <span className="text-xs text-slate-500 truncate">{t.footerMeta}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#5E4AE3] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1] transition-colors whitespace-nowrap shrink-0"
          >
            {t.aboutClose}
          </button>
        </div>
      </div>
    </div>
  );
};
