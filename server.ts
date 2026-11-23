import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  buildAutoRenewalForPermit,
  buildDashboardPayload,
  createInitialAlarms,
  createInitialContractOutlook,
  createInitialEmployees,
  SUPERVISOR_INFO,
  UNIT_METADATA,
} from './server/mockData.ts';
import type {
  AlarmTrigger,
  Employee,
  ExecutiveReportPayload,
  MonthlyContractOutlook,
  QualificationCategory,
} from './src/types/hr.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function formatTimestamp(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

let employeesState: Employee[] = createInitialEmployees();
let alarmsState: AlarmTrigger[] = createInitialAlarms();
let contractOutlookState: MonthlyContractOutlook[] = createInitialContractOutlook();
let zeroClickPolicyEnabled = true;

function recalculateEmployeeStatus(emp: Employee): Employee {
  const hasBadPermit = emp.permits.some(
    (p) => p.status === 'Expiring Soon' || p.status === 'Overdue' || p.status === 'Missing'
  );
  const hasOverdueTraining = emp.trainings.some((t) => t.status === 'Overdue');
  const hasUnresolvedAlarm = alarmsState.some((a) => a.employeeId === emp.id && !a.resolved);

  const totalMandatory = emp.trainings.filter((t) => t.mandatory).length;
  const completedOrScheduled = emp.trainings.filter(
    (t) => t.mandatory && (t.status === 'Completed' || t.status === 'Scheduled')
  ).length;
  const pct =
    totalMandatory > 0
      ? Math.round((completedOrScheduled / totalMandatory) * 100)
      : emp.trainingCompletionPct;

  return {
    ...emp,
    trainingCompletionPct: Math.min(100, Math.max(pct, emp.overallStatus === 'Compliant' ? 92 : pct)),
    overallStatus: hasBadPermit || hasOverdueTraining || hasUnresolvedAlarm ? 'Action Required' : 'Compliant',
  };
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Get full unit dashboard snapshot
  app.get('/api/dashboard', async (_req, res) => {
    await delay(180);
    res.json(
      buildDashboardPayload(employeesState, alarmsState, contractOutlookState, zeroClickPolicyEnabled)
    );
  });

  // 2. Get single employee 360 profile
  app.get('/api/employees/:id', async (req, res) => {
    await delay(150);
    const emp = employeesState.find((e) => e.id === req.params.id);
    if (!emp) {
      res.status(404).json({ error: 'Employee record not found.' });
      return;
    }
    res.json(emp);
  });

  // 3. Resolve / take action on an alarm trigger
  app.post('/api/alarms/:id/resolve', async (req, res) => {
    await delay(260);
    const { actionLabel, note } = req.body as { actionLabel?: string; note?: string };
    const alarmIdx = alarmsState.findIndex((a) => a.id === req.params.id);
    if (alarmIdx === -1) {
      res.status(404).json({ error: 'Alarm trigger not found.' });
      return;
    }

    const alarm = alarmsState[alarmIdx];
    const nowTs = formatTimestamp();
    const chosenAction = actionLabel || alarm.recommendedActionLabel;

    alarmsState[alarmIdx] = {
      ...alarm,
      resolved: true,
      resolvedAt: nowTs,
      resolutionNote:
        note ||
        `${chosenAction} executed by ${SUPERVISOR_INFO.name} (${nowTs}). Automated workflow dispatched.`,
    };

    employeesState = employeesState.map((emp) => {
      if (emp.id !== alarm.employeeId) return emp;

      let updatedPermits = emp.permits;
      let updatedTrainings = emp.trainings;
      let updatedContractEnd = emp.contractEndDate;

      if (alarm.category === 'Expiring License') {
        updatedPermits = emp.permits.map((p) =>
          p.status === 'Expiring Soon'
            ? {
                ...p,
                status: 'Valid',
                issuedAt: '2026-11-23',
                expiresAt: '2031-12-07',
                notes: `Zero-Click Renewal finalized (${nowTs}): health check & test drive confirmed, Traficom e-renewal filed.`,
                autoRenewal: p.autoRenewal
                  ? {
                      ...p.autoRenewal,
                      stage: 'completed',
                      reservations: p.autoRenewal.reservations.map((r) => ({
                        ...r,
                        status: 'Completed',
                      })),
                    }
                  : p.autoRenewal,
              }
            : p
        );
      } else if (alarm.category === 'Missing Training') {
        updatedPermits = emp.permits.map((p) =>
          p.status === 'Overdue'
            ? {
                ...p,
                status: 'Valid',
                expiresAt: '2027-11-23',
                notes: `Reminder dispatched & completion window scheduled (${nowTs}).`,
              }
            : p
        );
        updatedTrainings = emp.trainings.map((t) =>
          t.status === 'Overdue'
            ? { ...t, status: 'Scheduled', dueDate: '2026-11-30' }
            : t
        );
      } else if (alarm.category === 'Contract Ending') {
        updatedContractEnd = '2027-12-23';
        contractOutlookState = contractOutlookState.map((m) =>
          m.month === 'Dec 2026' ? { ...m, fixedTermExpiring: 0, renewalsPending: 0 } : m
        );
      } else if (alarm.category === 'Missing Data') {
        updatedPermits = emp.permits.map((p) =>
          p.status === 'Missing'
            ? {
                ...p,
                status: 'Valid',
                code: 'SUPO-88412',
                notes: `Verification request dispatched to Supo & HR Registry (${nowTs}).`,
              }
            : p
        );
      }

      const newAudit = {
        id: `aud-${Date.now()}`,
        timestamp: nowTs,
        actor: SUPERVISOR_INFO.name,
        action: `${chosenAction} — ${alarm.category}`,
        channel: 'Valmius Supervisor Console',
        detail:
          note ||
          `Resolved "${alarm.title}" via ${chosenAction}. Compliance workflow synchronized.`,
      };

      return recalculateEmployeeStatus({
        ...emp,
        contractEndDate: updatedContractEnd,
        permits: updatedPermits,
        trainings: updatedTrainings,
        auditLog: [newAudit, ...emp.auditLog],
      });
    });

    res.json(
      buildDashboardPayload(employeesState, alarmsState, contractOutlookState, zeroClickPolicyEnabled)
    );
  });

  // 4. Assign new training to an employee
  app.post('/api/employees/:id/trainings', async (req, res) => {
    await delay(240);
    const { title, category, dueDate, hours, mandatory } = req.body as {
      title: string;
      category: QualificationCategory;
      dueDate: string;
      hours?: number;
      mandatory?: boolean;
    };

    if (!title?.trim()) {
      res.status(400).json({ error: 'Training title is required.' });
      return;
    }

    const empIdx = employeesState.findIndex((e) => e.id === req.params.id);
    if (empIdx === -1) {
      res.status(404).json({ error: 'Employee not found.' });
      return;
    }

    const nowTs = formatTimestamp();
    const targetEmp = employeesState[empIdx];

    const newTraining = {
      id: `tr-${Date.now()}`,
      title: title.trim(),
      category: category || 'Role Certifications',
      dueDate: dueDate || '2026-12-15',
      status: 'Assigned' as const,
      hours: hours || 4,
      mandatory: mandatory ?? true,
    };

    const newAudit = {
      id: `aud-${Date.now()}`,
      timestamp: nowTs,
      actor: SUPERVISOR_INFO.name,
      action: 'Training Assigned',
      channel: 'Kuntakoulutus LMS Sync',
      detail: `Assigned "${newTraining.title}" (${newTraining.hours}h, due ${newTraining.dueDate}).`,
    };

    const updatedEmp = recalculateEmployeeStatus({
      ...targetEmp,
      trainings: [newTraining, ...targetEmp.trainings],
      auditLog: [newAudit, ...targetEmp.auditLog],
    });

    employeesState[empIdx] = updatedEmp;

    res.json({
      employee: updatedEmp,
      dashboard: buildDashboardPayload(
        employeesState,
        alarmsState,
        contractOutlookState,
        zeroClickPolicyEnabled
      ),
    });
  });

  // 5. Record contract decision for fixed-term employee
  app.post('/api/employees/:id/contract-decision', async (req, res) => {
    await delay(250);
    const { decision, note } = req.body as {
      decision: 'extend_12m' | 'convert_permanent' | 'handoff_deputy';
      note?: string;
    };

    const empIdx = employeesState.findIndex((e) => e.id === req.params.id);
    if (empIdx === -1) {
      res.status(404).json({ error: 'Employee not found.' });
      return;
    }

    const nowTs = formatTimestamp();
    const target = employeesState[empIdx];
    let updatedContractStatus = target.contractStatus;
    let updatedEmploymentType = target.employmentType;
    let updatedEndDate = target.contractEndDate;
    let summaryText = '';

    if (decision === 'extend_12m') {
      updatedEndDate = '2027-12-23';
      summaryText = 'Fixed-term civil servant appointment extended by 12 months through 2027-12-23.';
    } else if (decision === 'convert_permanent') {
      updatedEmploymentType = 'Permanent';
      updatedContractStatus = 'Permanent Civil Servant (Virkasuhde)';
      updatedEndDate = undefined;
      summaryText = 'Approved transition to Permanent Civil Servant (Virkasuhde).';
    } else {
      summaryText = `Scheduled formal knowledge handoff to designated deputy (${target.deputyName}) prior to 2026-12-23.`;
    }

    alarmsState = alarmsState.map((a) =>
      a.employeeId === target.id && a.category === 'Contract Ending'
        ? {
            ...a,
            resolved: true,
            resolvedAt: nowTs,
            resolutionNote: note || summaryText,
          }
        : a
    );

    contractOutlookState = contractOutlookState.map((m) =>
      m.month === 'Dec 2026'
        ? {
            ...m,
            permanentStable: decision === 'convert_permanent' ? m.permanentStable + 1 : m.permanentStable,
            fixedTermExpiring: 0,
            renewalsPending: 0,
          }
        : m
    );

    const updatedEmp = recalculateEmployeeStatus({
      ...target,
      employmentType: updatedEmploymentType,
      contractStatus: updatedContractStatus,
      contractEndDate: updatedEndDate,
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          timestamp: nowTs,
          actor: SUPERVISOR_INFO.name,
          action: 'Contract Lifecycle Decision Recorded',
          channel: 'Municipal HR Registry',
          detail: note ? `${summaryText} Note: ${note}` : summaryText,
        },
        ...target.auditLog,
      ],
    });

    employeesState[empIdx] = updatedEmp;

    res.json({
      employee: updatedEmp,
      dashboard: buildDashboardPayload(
        employeesState,
        alarmsState,
        contractOutlookState,
        zeroClickPolicyEnabled
      ),
    });
  });

  // 5b. Toggle Zero-Click Auto-Renewal policy
  app.post('/api/zero-click/policy', async (req, res) => {
    await delay(140);
    const { enabled } = req.body as { enabled: boolean };
    zeroClickPolicyEnabled = Boolean(enabled);
    res.json(
      buildDashboardPayload(employeesState, alarmsState, contractOutlookState, zeroClickPolicyEnabled)
    );
  });

  // 5c. Trigger zero-click auto-reservations (health check + test drive/skills + deputy + filing)
  app.post('/api/permits/:employeeId/:permitId/zero-click-reserve', async (req, res) => {
    await delay(260);
    const { employeeId, permitId } = req.params;
    const empIdx = employeesState.findIndex((e) => e.id === employeeId);
    if (empIdx === -1) {
      res.status(404).json({ error: 'Employee record not found.' });
      return;
    }

    const nowTs = formatTimestamp();
    const targetEmp = employeesState[empIdx];
    const targetPermit = targetEmp.permits.find((p) => p.id === permitId);
    if (!targetPermit) {
      res.status(404).json({ error: 'Permit record not found.' });
      return;
    }

    const autoRenewal = buildAutoRenewalForPermit(targetEmp, targetPermit, nowTs);
    const updatedPermits = targetEmp.permits.map((p) =>
      p.id === permitId
        ? {
            ...p,
            notes: `Zero-Click Renewal staged (${nowTs}): health check & practical test reserved automatically.`,
            autoRenewal,
          }
        : p
    );

    const reservedSummary = autoRenewal.reservations
      .filter((r) => r.type === 'health_check' || r.type === 'test_drive' || r.type === 'skills_test')
      .map((r) => `${r.title} (${r.scheduledAt}, ${r.bookingRef})`)
      .join(' · ');

    const updatedEmp = recalculateEmployeeStatus({
      ...targetEmp,
      permits: updatedPermits,
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          timestamp: nowTs,
          actor: 'Valmius Zero-Click Renewal Engine',
          action: `Zero-Click Reservations Created — ${targetPermit.code}`,
          channel: 'Terveystalo · Pelastusopisto · Shift Sync',
          detail: `${reservedSummary}. Deputy cover confirmed with ${targetEmp.deputyName}.`,
        },
        ...targetEmp.auditLog,
      ],
    });

    employeesState[empIdx] = updatedEmp;

    res.json({
      employee: updatedEmp,
      dashboard: buildDashboardPayload(
        employeesState,
        alarmsState,
        contractOutlookState,
        zeroClickPolicyEnabled
      ),
    });
  });

  // 5d. Optional 1-click slot reschedule for an auto-reserved health check or test drive
  app.post('/api/permits/:employeeId/:permitId/reschedule-slot', async (req, res) => {
    await delay(180);
    const { employeeId, permitId } = req.params;
    const { reservationId, scheduledAt } = req.body as {
      reservationId?: string;
      scheduledAt?: string;
    };

    if (!reservationId || !scheduledAt) {
      res.status(400).json({ error: 'reservationId and scheduledAt are required.' });
      return;
    }

    const empIdx = employeesState.findIndex((e) => e.id === employeeId);
    if (empIdx === -1) {
      res.status(404).json({ error: 'Employee record not found.' });
      return;
    }

    const nowTs = formatTimestamp();
    const targetEmp = employeesState[empIdx];
    let updatedTitle = '';

    const updatedPermits = targetEmp.permits.map((p) => {
      if (p.id !== permitId || !p.autoRenewal) return p;
      const nextReservations = p.autoRenewal.reservations.map((r) => {
        if (r.id === reservationId) {
          updatedTitle = r.title;
          return { ...r, scheduledAt };
        }
        return r;
      });
      const dateTokens = nextReservations
        .filter((r) => r.type === 'health_check' || r.type === 'test_drive' || r.type === 'skills_test')
        .map((r) => r.scheduledAt.split(' ')[0]);
      const syncedReservations = nextReservations.map((r) =>
        r.type === 'deputy_cover' && dateTokens.length >= 2
          ? { ...r, scheduledAt: `${dateTokens[0]} & ${dateTokens[1]}` }
          : r
      );

      return {
        ...p,
        autoRenewal: {
          ...p.autoRenewal,
          reservations: syncedReservations,
        },
      };
    });

    const updatedEmp = recalculateEmployeeStatus({
      ...targetEmp,
      permits: updatedPermits,
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          timestamp: nowTs,
          actor: SUPERVISOR_INFO.name,
          action: 'Reserved Renewal Slot Adjusted',
          channel: 'External Booking Sync',
          detail: `Updated "${updatedTitle || reservationId}" to ${scheduledAt}; deputy shift cover auto-synced.`,
        },
        ...targetEmp.auditLog,
      ],
    });

    employeesState[empIdx] = updatedEmp;

    res.json({
      employee: updatedEmp,
      dashboard: buildDashboardPayload(
        employeesState,
        alarmsState,
        contractOutlookState,
        zeroClickPolicyEnabled
      ),
    });
  });

  // 5e. Complete reserved health check / test drive & automatically issue renewed permit
  app.post('/api/permits/:employeeId/:permitId/complete-zero-click', async (req, res) => {
    await delay(260);
    const { employeeId, permitId } = req.params;
    const empIdx = employeesState.findIndex((e) => e.id === employeeId);
    if (empIdx === -1) {
      res.status(404).json({ error: 'Employee record not found.' });
      return;
    }

    const nowTs = formatTimestamp();
    const targetEmp = employeesState[empIdx];
    const targetPermit = targetEmp.permits.find((p) => p.id === permitId);
    if (!targetPermit) {
      res.status(404).json({ error: 'Permit record not found.' });
      return;
    }

    const existingAuto =
      targetPermit.autoRenewal || buildAutoRenewalForPermit(targetEmp, targetPermit, nowTs);

    const updatedPermits = targetEmp.permits.map((p) =>
      p.id === permitId
        ? {
            ...p,
            status: 'Valid' as const,
            issuedAt: '2026-11-23',
            expiresAt: '2031-12-07',
            notes: `Zero-Click Renewal completed (${nowTs}): Health check & practical test passed, Traficom/authority e-renewal issued through 2031-12-07.`,
            autoRenewal: {
              ...existingAuto,
              stage: 'completed' as const,
              reservations: existingAuto.reservations.map((r) => ({
                ...r,
                status: 'Completed' as const,
              })),
            },
          }
        : p
    );

    alarmsState = alarmsState.map((a) =>
      a.employeeId === targetEmp.id && a.category === 'Expiring License'
        ? {
            ...a,
            resolved: true,
            resolvedAt: nowTs,
            resolutionNote: `Zero-Click Renewal completed (${nowTs}): Occupational health check & test drive passed, ${targetPermit.code} renewed through 2031-12-07 with 0 manual steps.`,
          }
        : a
    );

    const updatedEmp = recalculateEmployeeStatus({
      ...targetEmp,
      permits: updatedPermits,
      auditLog: [
        {
          id: `aud-${Date.now()}`,
          timestamp: nowTs,
          actor: 'Valmius Zero-Click Renewal Engine',
          action: `Zero-Click Permit Renewed — ${targetPermit.code}`,
          channel: 'Terveystalo · Pelastusopisto · Traficom API',
          detail: `Medical fitness & practical test results verified automatically. ${targetPermit.name} renewed to 2031-12-07.`,
        },
        ...targetEmp.auditLog,
      ],
    });

    employeesState[empIdx] = updatedEmp;

    res.json({
      employee: updatedEmp,
      dashboard: buildDashboardPayload(
        employeesState,
        alarmsState,
        contractOutlookState,
        zeroClickPolicyEnabled
      ),
    });
  });

  // 6. Export executive situational report
  app.post('/api/reports/export', async (_req, res) => {
    await delay(280);
    const snapshot = buildDashboardPayload(
      employeesState,
      alarmsState,
      contractOutlookState,
      zeroClickPolicyEnabled
    );
    const activeAlarms = alarmsState.filter((a) => !a.resolved);
    const resolvedAlarms = alarmsState.filter((a) => a.resolved);

    const payload: ExecutiveReportPayload = {
      generatedAt: formatTimestamp(),
      generatedBy: `${SUPERVISOR_INFO.name} (${SUPERVISOR_INFO.title})`,
      unitName: UNIT_METADATA.unitName,
      organizationName: UNIT_METADATA.organizationName,
      readinessScorePct: snapshot.overview.complianceRatePct,
      totalPersonnel: snapshot.overview.totalPersonnel,
      permanentCount: snapshot.overview.permanentCount,
      fixedTermCount: snapshot.overview.fixedTermCount,
      openUrgentItems: activeAlarms.length,
      resolvedThisSession: resolvedAlarms.length,
      categoryCoverage: snapshot.categoryCoverage,
      keyFindings: [
        activeAlarms.length === 0
          ? 'All unit-level urgent compliance triggers have been actioned for the current 30-day window.'
          : `${activeAlarms.length} active compliance trigger(s) require supervisory follow-up prior to next month’s county audit.`,
        `Permanent workforce stability stands at ${Math.round((snapshot.overview.permanentCount / snapshot.overview.totalPersonnel) * 100)}% (${snapshot.overview.permanentCount} permanent / ${snapshot.overview.fixedTermCount} fixed-term).`,
        `Safety Permits & Role Certifications maintain high operational readiness across Shift A and Acute Triage teams.`,
      ],
      recommendedDecisions: activeAlarms.length > 0
        ? activeAlarms.map((a) => `${a.employeeName}: ${a.recommendedActionLabel} (${a.category})`)
        : [
            'Maintain 30-day rolling verification cadence across Traficom C1/CE and Valvira credentials.',
            'Proceed to Q1 2027 leadership & ICS-300 succession planning review.',
          ],
    };

    res.json(payload);
  });

  // 7. Reset demo state for repeatable executive demos
  app.post('/api/reset-demo', async (_req, res) => {
    await delay(150);
    employeesState = createInitialEmployees();
    alarmsState = createInitialAlarms();
    contractOutlookState = createInitialContractOutlook();
    zeroClickPolicyEnabled = true;
    res.json(
      buildDashboardPayload(employeesState, alarmsState, contractOutlookState, zeroClickPolicyEnabled)
    );
  });

  // 8. Server-side Gemini AI HR Copilot
  app.post('/api/copilot', async (req, res) => {
    const { prompt, employeeId, language } = req.body as {
      prompt?: string;
      employeeId?: string;
      language?: 'en' | 'fi' | 'sv';
    };

    if (!prompt?.trim()) {
      res.status(400).json({ error: 'Prompt is required.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured. Please add your Gemini API key in Settings > Secrets to activate the AI HR Copilot.',
      });
      return;
    }

    const snapshot = buildDashboardPayload(
      employeesState,
      alarmsState,
      contractOutlookState,
      zeroClickPolicyEnabled
    );
    const focusedEmployee = employeeId
      ? employeesState.find((e) => e.id === employeeId)
      : undefined;

    const unitContext = {
      currentDate: '2026-11-23',
      unitName: snapshot.unitName,
      organization: snapshot.organizationName,
      supervisor: snapshot.supervisor.name,
      overview: snapshot.overview,
      activeAlarms: snapshot.alarms,
      categoryCoverage: snapshot.categoryCoverage,
      employees: snapshot.employees.map((e) => ({
        id: e.id,
        name: e.name,
        role: e.role,
        contractStatus: e.contractStatus,
        contractEndDate: e.contractEndDate || 'Indefinite',
        deputyName: e.deputyName,
        overallStatus: e.overallStatus,
        trainingCompletionPct: e.trainingCompletionPct,
        permits: e.permits.map((p) => ({
          name: p.name,
          code: p.code,
          status: p.status,
          expiresAt: p.expiresAt,
        })),
        trainings: e.trainings.map((t) => ({
          title: t.title,
          status: t.status,
          dueDate: t.dueDate || t.completedAt,
        })),
      })),
      focusedEmployee: focusedEmployee ? focusedEmployee.name : null,
    };

    const replyLanguage =
      language === 'fi'
        ? 'Finnish (suomi)'
        : language === 'sv'
        ? 'Swedish (svenska)'
        : 'English';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: [
          `Supervisor Request (${replyLanguage}): ${prompt.trim()}`,
          `\nLive Unit HR Snapshot (JSON):\n${JSON.stringify(unitContext, null, 2)}`,
        ].join('\n'),
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: `You are the Valmius HR Copilot assisting Laura Korhonen (Unit Manager, Rescue & Emergency Services / Public Healthcare in Uusimaa Wellbeing Services County, Finland).
Current date is 2026-11-23.
Respond strictly in ${replyLanguage} using authentic public-sector HR terminology.
Guidelines:
- Always ground your answer strictly in the provided Live Unit HR Snapshot data (exact employee names, permit codes, expiration dates, deputies, contract types like Virkasuhde / Työsuhde).
- Never invent fictional employees or permits not present in the snapshot.
- Keep responses crisp, structured, executive-ready, and immediately actionable for a public-sector unit supervisor.
- Use short headings, clear bullet points, and concrete next steps (with dates and named deputies when relevant).
- When drafting notices or plans, provide copy-ready text alongside operational recommendations.`,
        },
      });

      const text = response.text;
      if (!text) {
        res.status(502).json({ error: 'The AI model returned an empty response. Please try again.' });
        return;
      }

      res.json({
        reply: text,
        timestamp: formatTimestamp(),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected Gemini API error.';
      console.error('[Copilot API Error]', err);
      if (message.includes('403') || message.includes('PERMISSION_DENIED') || message.includes('API_KEY_INVALID')) {
        res.status(403).json({
          error:
            'Gemini API key could not be authenticated. Please verify your API key in Settings > Secrets.',
        });
        return;
      }
      if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error: 'Gemini API rate quota reached. Please wait a moment or check your billing tier in Settings > Secrets.',
        });
        return;
      }
      res.status(500).json({ error: `AI Copilot request failed: ${message}` });
    }
  });

  // Vite dev middleware or production static serving
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist', 'index.html'));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Valmius HR server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
