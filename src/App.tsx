import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  Bot,
  CheckCircle2,
  Compass,
  LayoutDashboard,
  Menu,
  RotateCcw,
  Shield,
  UserCheck,
  X,
} from 'lucide-react';
import type {
  AlarmTrigger,
  CopilotMessage,
  DashboardPayload,
  Employee,
  ExecutiveReportPayload,
  QualificationCategory,
} from './types/hr';
import { TRANSLATIONS, type Language } from './i18n/translations';
import { EmployeeAvatar } from './components/StatusIndicator';
import { SituationalOverview } from './components/SituationalOverview';
import { EmployeeProfileView } from './components/EmployeeProfileView';
import { AnalyticsReportView } from './components/AnalyticsReportView';
import { CopilotDrawer } from './components/CopilotDrawer';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { ContractReviewModal } from './components/ContractReviewModal';
import { TaskSelectionScreen, type TaskChoice } from './components/TaskSelectionScreen';
import { AppFooter } from './components/AppFooter';
import { AboutValmiusModal } from './components/AboutValmiusModal';
import { ZeroClickRenewalModal } from './components/ZeroClickRenewalModal';

type ActiveView = 'overview' | 'profile' | 'analytics';

interface ToastState {
  id: number;
  message: string;
}

const LANGUAGE_OPTIONS: { code: Language; label: string; name: string }[] = [
  { code: 'fi', label: 'FI', name: 'Suomi' },
  { code: 'sv', label: 'SV', name: 'Svenska' },
  { code: 'en', label: 'EN', name: 'English' },
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[language];

  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [showTaskSelector, setShowTaskSelector] = useState(true);
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('emp-mikko-virtanen');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [resolvingAlarmId, setResolvingAlarmId] = useState<string | null>(null);
  const [isAssigningTraining, setIsAssigningTraining] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [contractModalEmployee, setContractModalEmployee] = useState<Employee | null>(null);
  const [isSubmittingContract, setIsSubmittingContract] = useState(false);
  const [reportModalData, setReportModalData] = useState<ExecutiveReportPayload | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Zero-Click renewal state
  const [isTogglingPolicy, setIsTogglingPolicy] = useState(false);
  const [reservingPermitId, setReservingPermitId] = useState<string | null>(null);
  const [completingZeroClickPermitId, setCompletingZeroClickPermitId] = useState<string | null>(null);
  const [isReschedulingSlot, setIsReschedulingSlot] = useState(false);
  const [zeroClickTarget, setZeroClickTarget] = useState<{
    employeeId: string;
    permitId: string;
  } | null>(null);

  // Copilot state
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([]);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotError, setCopilotError] = useState<string | null>(null);
  const [pendingCopilotPrompt, setPendingCopilotPrompt] = useState<string | null>(null);

  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  }, []);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Unable to load unit dashboard data.');
      const data = (await res.json()) as DashboardPayload;
      setDashboard(data);
    } catch (err: unknown) {
      setLoadError(err instanceof Error ? err.message : 'Failed to connect to HR service.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  const handleSelectEmployee = useCallback((employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setActiveView('profile');
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResolveAlarm = async (alarm: AlarmTrigger, actionLabel?: string) => {
    if (alarm.actionType === 'review_contract' && !actionLabel && dashboard) {
      const target = dashboard.employees.find((e) => e.id === alarm.employeeId);
      if (target) {
        setContractModalEmployee(target);
        return;
      }
    }

    setResolvingAlarmId(alarm.id);
    try {
      const res = await fetch(`/api/alarms/${alarm.id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionLabel: actionLabel || alarm.recommendedActionLabel,
        }),
      });
      if (!res.ok) throw new Error('Failed to resolve trigger.');
      const updated = (await res.json()) as DashboardPayload;
      setDashboard(updated);
      const localizedAction =
        t.alarmActions[actionLabel || alarm.recommendedActionLabel] ||
        actionLabel ||
        alarm.recommendedActionLabel;
      showToast(`${localizedAction} · ${alarm.employeeName}`);
    } catch {
      showToast('Unable to update compliance trigger. Please retry.');
    } finally {
      setResolvingAlarmId(null);
    }
  };

  const handleAssignTraining = async (
    employeeId: string,
    payload: { title: string; category: QualificationCategory; dueDate: string; hours: number }
  ) => {
    setIsAssigningTraining(true);
    try {
      const res = await fetch(`/api/employees/${employeeId}/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to assign training.');
      const data = (await res.json()) as { employee: Employee; dashboard: DashboardPayload };
      setDashboard(data.dashboard);
      showToast(`${payload.title} · ${data.employee.name}`);
    } catch {
      showToast('Failed to assign training. Please retry.');
    } finally {
      setIsAssigningTraining(false);
    }
  };

  const handleContractDecision = async (
    employeeId: string,
    decision: 'extend_12m' | 'convert_permanent' | 'handoff_deputy',
    note: string
  ) => {
    setIsSubmittingContract(true);
    try {
      const res = await fetch(`/api/employees/${employeeId}/contract-decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, note }),
      });
      if (!res.ok) throw new Error('Failed to save contract decision.');
      const data = (await res.json()) as { employee: Employee; dashboard: DashboardPayload };
      setDashboard(data.dashboard);
      setContractModalEmployee(null);
      showToast(`${t.contractModalTitle} · ${data.employee.name}`);
    } catch {
      showToast('Unable to record contract decision. Please retry.');
    } finally {
      setIsSubmittingContract(false);
    }
  };

  const handleExportReport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch('/api/reports/export', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to generate report.');
      const report = (await res.json()) as ExecutiveReportPayload;
      setReportModalData(report);
    } catch {
      showToast('Unable to compile executive report.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/reset-demo', { method: 'POST' });
      if (!res.ok) throw new Error('Reset failed');
      const data = (await res.json()) as DashboardPayload;
      setDashboard(data);
      setCopilotMessages([]);
      setCopilotError(null);
      setZeroClickTarget(null);
      setActiveView('overview');
      showToast(t.toastReset);
    } catch {
      showToast('Failed to reset demo data.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleToggleZeroClickPolicy = async (enabled: boolean) => {
    setIsTogglingPolicy(true);
    try {
      const res = await fetch('/api/zero-click/policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) throw new Error('Failed to update policy.');
      const updated = (await res.json()) as DashboardPayload;
      setDashboard(updated);
      showToast(enabled ? t.zeroClick.toastPolicyOn : t.zeroClick.toastPolicyOff);
    } catch {
      showToast('Unable to update zero-click policy.');
    } finally {
      setIsTogglingPolicy(false);
    }
  };

  const handleTriggerZeroClickReserve = async (employeeId: string, permitId: string) => {
    setReservingPermitId(permitId);
    try {
      const res = await fetch(`/api/permits/${employeeId}/${permitId}/zero-click-reserve`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to stage zero-click reservations.');
      const data = (await res.json()) as { employee: Employee; dashboard: DashboardPayload };
      setDashboard(data.dashboard);
      const permit = data.employee.permits.find((p) => p.id === permitId);
      showToast(t.zeroClick.toastStaged(permit?.code || permitId, data.employee.name));
      setZeroClickTarget({ employeeId, permitId });
    } catch {
      showToast('Unable to create zero-click reservations.');
    } finally {
      setReservingPermitId(null);
    }
  };

  const handleRescheduleZeroClickSlot = async (
    employeeId: string,
    permitId: string,
    reservationId: string,
    scheduledAt: string
  ) => {
    setIsReschedulingSlot(true);
    try {
      const res = await fetch(`/api/permits/${employeeId}/${permitId}/reschedule-slot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId, scheduledAt }),
      });
      if (!res.ok) throw new Error('Failed to reschedule slot.');
      const data = (await res.json()) as { employee: Employee; dashboard: DashboardPayload };
      setDashboard(data.dashboard);
      showToast(t.zeroClick.toastRescheduled(scheduledAt));
    } catch {
      showToast('Unable to reschedule reservation slot.');
    } finally {
      setIsReschedulingSlot(false);
    }
  };

  const handleCompleteZeroClick = async (employeeId: string, permitId: string) => {
    setCompletingZeroClickPermitId(permitId);
    try {
      const res = await fetch(`/api/permits/${employeeId}/${permitId}/complete-zero-click`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to complete zero-click renewal.');
      const data = (await res.json()) as { employee: Employee; dashboard: DashboardPayload };
      setDashboard(data.dashboard);
      const permit = data.employee.permits.find((p) => p.id === permitId);
      showToast(t.zeroClick.toastCompleted(permit?.code || permitId, data.employee.name));
    } catch {
      showToast('Unable to complete zero-click permit renewal.');
    } finally {
      setCompletingZeroClickPermitId(null);
    }
  };

  const handleSendCopilotPrompt = useCallback(
    async (prompt: string) => {
      setCopilotError(null);
      const userMsg: CopilotMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: prompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setCopilotMessages((prev) => [...prev, userMsg]);
      setCopilotLoading(true);

      try {
        const res = await fetch('/api/copilot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            employeeId: activeView === 'profile' ? selectedEmployeeId : undefined,
            language,
          }),
        });
        const data = (await res.json()) as { reply?: string; timestamp?: string; error?: string };
        if (!res.ok || !data.reply) {
          throw new Error(data.error || 'AI Copilot could not generate a response.');
        }

        const assistantMsg: CopilotMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp:
            data.timestamp ||
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setCopilotMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        setCopilotError(
          err instanceof Error ? err.message : 'Unable to reach AI HR Copilot service.'
        );
      } finally {
        setCopilotLoading(false);
      }
    },
    [activeView, selectedEmployeeId, language]
  );

  const handleOpenCopilotWithPrompt = useCallback((prompt: string) => {
    setCopilotOpen(true);
    setPendingCopilotPrompt(prompt);
  }, []);

  const handleSelectTask = useCallback((task: TaskChoice) => {
    setShowTaskSelector(false);
    if (task === 'alarms') {
      setActiveView('overview');
    } else if (task === 'profile') {
      setSelectedEmployeeId('emp-mikko-virtanen');
      setActiveView('profile');
    } else if (task === 'contract') {
      setSelectedEmployeeId('emp-antti-laine');
      setActiveView('profile');
    } else if (task === 'analytics') {
      setActiveView('analytics');
    } else if (task === 'copilot') {
      setActiveView('overview');
      setCopilotOpen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedEmployee =
    dashboard?.employees.find((e) => e.id === selectedEmployeeId) ||
    dashboard?.employees[0] ||
    null;

  const resolvedZeroClickModalTarget = (() => {
    if (!zeroClickTarget || !dashboard) return null;
    const emp = dashboard.employees.find((e) => e.id === zeroClickTarget.employeeId);
    const perm = emp?.permits.find((p) => p.id === zeroClickTarget.permitId);
    if (!emp || !perm) return null;
    return { employee: emp, permit: perm };
  })();

  const viewBreadcrumb =
    activeView === 'overview'
      ? t.navOverview
      : activeView === 'profile'
      ? `${t.navProfile}${selectedEmployee ? ` / ${selectedEmployee.name}` : ''}`
      : t.navAnalytics;

  if (showTaskSelector) {
    return (
      <>
        <TaskSelectionScreen
          t={t}
          language={language}
          onChangeLanguage={setLanguage}
          dashboard={dashboard}
          onSelectTask={handleSelectTask}
          onOpenAbout={() => setAboutOpen(true)}
        />
        <AboutValmiusModal
          t={t}
          isOpen={aboutOpen}
          onClose={() => setAboutOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-slate-200 bg-white z-30">
        <button
          type="button"
          onClick={() => setShowTaskSelector(true)}
          className="h-16 px-5 flex items-center gap-2.5 border-b border-slate-200 text-left hover:bg-slate-50/70 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="font-display font-bold text-base tracking-tight text-slate-900 block leading-none">
              Valmius HR
            </span>
            <span className="text-[11px] text-slate-500 block mt-1 truncate">
              {t.brandSubtitle}
            </span>
          </div>
        </button>

        <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Primary Sidebar">
          <button
            type="button"
            onClick={() => setActiveView('overview')}
            className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
              activeView === 'overview'
                ? 'bg-[#5E4AE3]/10 text-[#5E4AE3]'
                : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>{t.navOverview}</span>
            </span>
            {dashboard && dashboard.overview.urgentActionsCount > 0 && (
              <span className="font-mono text-xs tabular-nums font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                {dashboard.overview.urgentActionsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveView('profile')}
            className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
              activeView === 'profile'
                ? 'bg-[#5E4AE3]/10 text-[#5E4AE3]'
                : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>{t.navProfile}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('analytics')}
            className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
              activeView === 'analytics'
                ? 'bg-[#5E4AE3]/10 text-[#5E4AE3]'
                : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>{t.navAnalytics}</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-2.5">
          <div className="text-xs text-slate-500 leading-relaxed pb-1">
            <div className="font-medium text-slate-800">{t.orgName}</div>
            <div>{t.orgUnitShort}</div>
          </div>
          <button
            type="button"
            onClick={() => setShowTaskSelector(true)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#5E4AE3]" />
            <span>{t.changeFocus}</span>
          </button>
          <button
            type="button"
            disabled={isResetting}
            onClick={() => void handleResetDemo()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isResetting ? t.resettingDemo : t.resetDemo}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] bg-white border-r border-slate-200 flex flex-col z-10">
            <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#5E4AE3] text-white flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-display font-bold text-base text-slate-900">
                  Valmius HR
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              <button
                type="button"
                onClick={() => {
                  setActiveView('overview');
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  activeView === 'overview'
                    ? 'bg-[#5E4AE3]/10 text-[#5E4AE3]'
                    : 'text-slate-600'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t.navOverview}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveView('profile');
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  activeView === 'profile'
                    ? 'bg-[#5E4AE3]/10 text-[#5E4AE3]'
                    : 'text-slate-600'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.navProfile}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveView('analytics');
                  setMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  activeView === 'analytics'
                    ? 'bg-[#5E4AE3]/10 text-[#5E4AE3]'
                    : 'text-slate-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t.navAnalytics}</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-xs px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs sm:text-sm font-medium text-slate-500 truncate">
              <span className="hidden sm:inline">{t.unitPrefix} · </span>
              <span className="text-slate-900 font-semibold">{viewBreadcrumb}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Toggle: Finnish, Swedish, English */}
            <div
              className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/80"
              role="group"
              aria-label="Language toggle"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLanguage(opt.code)}
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

            <div className="hidden md:flex items-center gap-2.5 px-4 border-l border-r border-slate-200">
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
                <div className="text-[11px] text-slate-500 whitespace-nowrap max-w-[300px] truncate">
                  {t.supervisorTitle}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCopilotOpen((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                copilotOpen
                  ? 'bg-slate-900 text-white'
                  : 'bg-[#5E4AE3] text-white hover:bg-[#4F3FD1]'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">{t.copilotButton}</span>
            </button>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-7 max-w-[1360px] w-full mx-auto">
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-8 w-80 bg-slate-200 rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="h-32 bg-white border border-slate-200 rounded-xl" />
                <div className="h-32 bg-white border border-slate-200 rounded-xl" />
                <div className="h-32 bg-white border border-slate-200 rounded-xl" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-40 bg-white border border-slate-200 rounded-xl" />
                <div className="h-40 bg-white border border-slate-200 rounded-xl" />
              </div>
              <div className="h-72 bg-white border border-slate-200 rounded-xl" />
            </div>
          ) : loadError || !dashboard ? (
            <div className="rounded-xl border border-red-200 bg-white p-8 text-center space-y-3 max-w-md mx-auto mt-12">
              <AlertCircle className="w-7 h-7 text-red-600 mx-auto" />
              <h2 className="text-base font-semibold text-slate-900">{t.loadErrorTitle}</h2>
              <p className="text-xs text-slate-600">{loadError}</p>
              <button
                type="button"
                onClick={() => void fetchDashboard()}
                className="rounded-lg bg-[#5E4AE3] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F3FD1]"
              >
                {t.retryConnection}
              </button>
            </div>
          ) : (
            <>
              {activeView === 'overview' && (
                <SituationalOverview
                  t={t}
                  dashboard={dashboard}
                  resolvingAlarmId={resolvingAlarmId}
                  isTogglingPolicy={isTogglingPolicy}
                  completingZeroClickPermitId={completingZeroClickPermitId}
                  onResolveAlarm={handleResolveAlarm}
                  onToggleZeroClickPolicy={handleToggleZeroClickPolicy}
                  onOpenZeroClickModal={(employeeId, permitId) =>
                    setZeroClickTarget({ employeeId, permitId })
                  }
                  onCompleteZeroClick={handleCompleteZeroClick}
                  onSelectEmployee={handleSelectEmployee}
                  onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
                />
              )}

              {activeView === 'profile' && selectedEmployee && (
                <EmployeeProfileView
                  t={t}
                  employee={selectedEmployee}
                  allEmployees={dashboard.employees}
                  employeeAlarms={dashboard.alarms.filter(
                    (a) => a.employeeId === selectedEmployee.id
                  )}
                  resolvingAlarmId={resolvingAlarmId}
                  isAssigningTraining={isAssigningTraining}
                  reservingPermitId={reservingPermitId}
                  completingZeroClickPermitId={completingZeroClickPermitId}
                  onBack={() => setActiveView('overview')}
                  onSelectEmployee={handleSelectEmployee}
                  onResolveAlarm={handleResolveAlarm}
                  onAssignTraining={handleAssignTraining}
                  onTriggerZeroClickReserve={handleTriggerZeroClickReserve}
                  onOpenZeroClickModal={(employeeId, permitId) =>
                    setZeroClickTarget({ employeeId, permitId })
                  }
                  onCompleteZeroClick={handleCompleteZeroClick}
                  onOpenContractReview={(emp) => setContractModalEmployee(emp)}
                  onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
                />
              )}

              {activeView === 'analytics' && (
                <AnalyticsReportView
                  t={t}
                  dashboard={dashboard}
                  isExporting={isExporting}
                  onExportReport={handleExportReport}
                  onSelectEmployee={handleSelectEmployee}
                />
              )}
            </>
          )}
        </main>

        <AppFooter t={t} onOpenAbout={() => setAboutOpen(true)} />
      </div>

      {/* Collapsible AI HR Copilot Drawer */}
      <CopilotDrawer
        t={t}
        isOpen={copilotOpen}
        messages={copilotMessages}
        isLoading={copilotLoading}
        error={copilotError}
        pendingPrompt={pendingCopilotPrompt}
        onConsumePendingPrompt={() => setPendingCopilotPrompt(null)}
        onClose={() => setCopilotOpen(false)}
        onSendPrompt={handleSendCopilotPrompt}
      />

      {/* Executive Report Modal */}
      <ExecutiveReportModal
        t={t}
        report={reportModalData}
        onClose={() => setReportModalData(null)}
      />

      {/* Fixed-Term Contract Decision Modal */}
      <ContractReviewModal
        t={t}
        employee={contractModalEmployee}
        isSubmitting={isSubmittingContract}
        onConfirm={handleContractDecision}
        onClose={() => setContractModalEmployee(null)}
      />

      {/* About Valmius HR Solution Modal */}
      <AboutValmiusModal
        t={t}
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      {/* Zero-Click License & Permit Renewal Pipeline Modal */}
      <ZeroClickRenewalModal
        t={t}
        target={resolvedZeroClickModalTarget}
        isRescheduling={isReschedulingSlot}
        isCompleting={Boolean(
          resolvedZeroClickModalTarget &&
            completingZeroClickPermitId === resolvedZeroClickModalTarget.permit.id
        )}
        onRescheduleSlot={handleRescheduleZeroClickSlot}
        onCompleteRenewal={handleCompleteZeroClick}
        onClose={() => setZeroClickTarget(null)}
      />

      {/* Subtle Action Feedback Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
