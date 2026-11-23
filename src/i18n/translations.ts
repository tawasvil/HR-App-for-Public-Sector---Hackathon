export type Language = 'en' | 'fi' | 'sv';

export interface Translations {
  // Brand & Nav
  brandSubtitle: string;
  navOverview: string;
  navProfile: string;
  navAnalytics: string;
  orgName: string;
  orgUnitShort: string;
  resetDemo: string;
  resettingDemo: string;

  // Header
  unitPrefix: string;
  supervisorLabel: string;
  supervisorTitle: string;
  copilotButton: string;
  changeFocus: string;

  // Task Selection Screen ("What are you here for?")
  taskGreeting: string;
  taskHeading: string;
  taskSubheading: string;
  taskSnapshotSummary: (total: number, coverage: number, urgent: number) => string;
  taskAlarmsTitle: string;
  taskAlarmsDesc: (urgent: number) => string;
  taskAlarmsAction: string;
  taskProfileTitle: string;
  taskProfileDesc: string;
  taskProfileAction: string;
  taskContractTitle: string;
  taskContractDesc: string;
  taskContractAction: string;
  taskAnalyticsTitle: string;
  taskAnalyticsDesc: string;
  taskAnalyticsAction: string;
  taskCopilotTitle: string;
  taskCopilotDesc: string;
  taskCopilotAction: string;
  taskSkipToOverview: string;

  // Overview
  overviewTitle: string;
  overviewSubtitle: string;
  auditRiskCta: string;
  kpiTotalPersonnel: string;
  kpiActiveEmployees: string;
  kpiPersonnelSub: (perm: number, fixed: number, synced: number) => string;
  kpiCoverage: string;
  kpiCompliant: string;
  kpiUrgentActions: string;
  kpiItemSingular: string;
  kpiItemPlural: string;
  kpiResolvedSession: (count: number) => string;
  kpiRollingWindow: string;

  // Alarms
  alarmsTitle: string;
  alarmsSubtitle: string;
  hideResolved: string;
  showResolved: (count: number) => string;
  allAlarmsAddressedTitle: string;
  allAlarmsAddressedBody: string;
  reviewActionLog: string;
  openProfile360: string;
  processing: string;
  actionedAt: (ts: string) => string;
  draftWithCopilot: string;
  analyzeCoverage: string;
  resolvedPrefix: string;

  // Roster table
  rosterTitle: string;
  rosterSubtitle: (shown: number, total: number) => string;
  searchPlaceholder: string;
  filterAll: string;
  filterAllTypes: string;
  filterPermanent: string;
  filterFixedTerm: string;
  noMatchesTitle: string;
  noMatchesBody: string;
  resetFilters: string;
  colNameRole: string;
  colEmployment: string;
  colPermits: string;
  colTraining: string;
  colProfile: string;
  endsPrefix: string;
  indefiniteTenure: string;
  activePermitsVerified: (count: number) => string;
  viewProfile: string;

  // Employee 360
  backToOverview: string;
  switchEmployee: string;
  contractEnds: string;
  supervisorPrefix: string;
  reviewContract: string;
  askCopilot: string;
  missionTitle: string;
  deputyLabel: string;
  startDateLabel: string;
  activeAssignmentsLabel: string;
  permitsTitle: string;
  validCountLabel: (valid: number, total: number) => string;
  issuedPrefix: string;
  expiresPrefix: string;
  permanentPermit: string;
  trainingTitle: string;
  assignTraining: string;
  assignFormTitle: string;
  cancel: string;
  quickPickLabel: string;
  customTrainingOption: string;
  categoryLabel: string;
  dueDateLabel: string;
  hoursLabel: string;
  dispatchingLms: string;
  confirmAssignment: string;
  mandatory: string;
  elective: string;
  completedPrefix: string;
  duePrefix: string;
  triggersAuditTitle: string;
  activeAlertCount: (count: number) => string;
  noActiveTriggers: (name: string) => string;
  auditTrailHeading: string;

  // Analytics
  analyticsTitle: string;
  analyticsSubtitle: string;
  exportReport: string;
  compilingReport: string;
  catCoverageTitle: string;
  catCoverageSubtitle: string;
  unitAvg: string;
  auditTarget95: string;
  workforceTitle: string;
  workforceSubtitle: string;
  permanentStaff: string;
  fixedTermStaff: string;
  contractHorizonTitle: string;
  fixedTermEndingSeries: string;
  renewalsPendingSeries: string;
  domainMatrixTitle: string;
  colCategory: string;
  colVerified: string;
  colCoverage: string;
  fixedTermWatchlistTitle: string;
  colEmployee: string;
  colDeputy: string;
  colEndDate: string;
  convertedLabel: string;

  // Copilot
  copilotTitle: string;
  copilotSubtitle: string;
  copilotPresetsHeading: string;
  copilotEmptyHint: string;
  copilotLoading: string;
  copilotPlaceholder: string;
  copy: string;
  copied: string;
  presetPrompts: string[];

  // Modals
  execReportTitle: string;
  generatedPrefix: string;
  overallReadiness: string;
  activeWorkforce: string;
  openTriggers: string;
  sessionActions: string;
  domainCoverageHeading: string;
  keyFindingsHeading: string;
  leadershipActionsHeading: string;
  preparedBy: string;
  copyExecSummary: string;
  copiedClipboard: string;
  printBrief: string;
  done: string;

  contractModalTitle: string;
  currentAppointment: string;
  contractEndDateLabel: string;
  designatedDeputyLabel: string;
  selectDecisionLabel: string;
  extend12mTitle: string;
  extend12mDesc: string;
  convertPermTitle: string;
  convertPermDesc: string;
  handoffTitle: string;
  handoffDesc: (deputy: string) => string;
  justificationLabel: string;
  justificationPlaceholder: string;
  recordingDecision: string;
  confirmRegistry: string;

  // Statuses & Categories
  statuses: Record<string, string>;
  categories: Record<string, string>;
  alarmCategories: Record<string, string>;
  alarmActions: Record<string, string>;

  // Loading / Errors / Toasts
  loadErrorTitle: string;
  retryConnection: string;
  toastReset: string;

  // Footer & About Solution Modal
  footerInfoButton: string;
  footerMeta: string;
  aboutModalTitle: string;
  aboutModalSubtitle: string;
  aboutClose: string;
  aboutTabs: {
    description: string;
    architecture: string;
    security: string;
    gettingStarted: string;
  };
  aboutDescription: {
    headline: string;
    summary: string;
    problemTitle: string;
    problemBody: string;
    outcomeTitle: string;
    outcomeBody: string;
    capabilitiesHeading: string;
    capabilities: { title: string; detail: string }[];
  };
  aboutArchitecture: {
    headline: string;
    intro: string;
    layers: {
      tier: string;
      title: string;
      components: string[];
      detail: string;
    }[];
    integrationsHeading: string;
    integrations: { system: string; dataFlow: string }[];
    dataFlowCaption: string;
  };
  aboutSecurity: {
    headline: string;
    intro: string;
    pillars: { title: string; summary: string; controls: string[] }[];
    complianceLine: string;
  };
  aboutGettingStarted: {
    headline: string;
    intro: string;
    steps: { step: string; title: string; detail: string; tip: string }[];
    resetNote: string;
  };

  // Zero-Click License / Permit Renewal
  zeroClick: {
    engineTitle: string;
    engineSubtitle: string;
    policyActive: string;
    policyManual: string;
    toggleLabel: string;
    zeroClicksBadge: string;
    stagedSummary: (count: number) => string;
    noPendingPipelines: string;
    inspectReservations: string;
    finalizeAutoRenewal: string;
    finalizing: string;
    startZeroClick: string;
    startingZeroClick: string;
    manageSlots: string;
    modalTitle: string;
    modalSubtitle: string;
    triggeredAt: string;
    stepsHeading: string;
    slotSelectLabel: string;
    rescheduleUpdating: string;
    completeAndIssue: string;
    completingAndIssuing: string;
    alreadyCompleted: string;
    close: string;
    typeLabels: Record<string, string>;
    reservationStatuses: Record<string, string>;
    toastPolicyOn: string;
    toastPolicyOff: string;
    toastStaged: (permitCode: string, name: string) => string;
    toastCompleted: (permitCode: string, name: string) => string;
    toastRescheduled: (slot: string) => string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandSubtitle: 'Competency & Readiness',
    navOverview: 'Situational Overview',
    navProfile: 'Person & Role 360°',
    navAnalytics: 'Unit Analytics',
    orgName: 'Uusimaa Wellbeing Services',
    orgUnitShort: 'Unit 4 · Rescue & Acute Care',
    resetDemo: 'Reset Demo Data',
    resettingDemo: 'Resetting...',

    unitPrefix: 'Unit 4',
    supervisorLabel: 'Supervisor: Laura Korhonen',
    supervisorTitle: 'Unit Manager, Rescue & Emergency Services / Public Healthcare',
    copilotButton: 'AI HR Copilot',
    changeFocus: 'Switch Task',

    taskGreeting: 'Welcome back, Laura Korhonen',
    taskHeading: 'What are you here for?',
    taskSubheading:
      'Choose a supervisory workflow to jump straight to the right view for Unit 4 — Emergency Medical & Rescue Operations.',
    taskSnapshotSummary: (total, coverage, urgent) =>
      `${total} active personnel · ${coverage}% compliant · ${urgent} urgent action${urgent === 1 ? '' : 's'} pending`,
    taskAlarmsTitle: 'Handle urgent compliance alarms',
    taskAlarmsDesc: (urgent) =>
      urgent > 0
        ? `Review ${urgent} active trigger${urgent === 1 ? '' : 's'} — expiring C1/CE driving permits, overdue GDPR training, and missing security clearances.`
        : 'All urgent triggers are resolved. Review the unit situational overview and completed action log.',
    taskAlarmsAction: 'Open Alarms & Overview',
    taskProfileTitle: "Inspect an employee's 360° profile",
    taskProfileDesc:
      'Consolidate official tenure (Virkasuhde), active permits, training history, and deputy arrangements on one screen.',
    taskProfileAction: 'Open Mikko Virtanen 360°',
    taskContractTitle: 'Decide on ending fixed-term contracts',
    taskContractDesc:
      'Evaluate Antti Laine’s appointment ending in 30 days (2026-12-23) — extend, convert to permanent, or assign deputy handoff.',
    taskContractAction: 'Review Contract Decision',
    taskAnalyticsTitle: 'Prepare unit audit & readiness report',
    taskAnalyticsDesc:
      'Inspect compliance coverage across safety, infosec, and certifications, and export an executive situational brief.',
    taskAnalyticsAction: 'Open Unit Analytics',
    taskCopilotTitle: 'Draft notices or analyze coverage with AI HR Copilot',
    taskCopilotDesc:
      'Generate renewal notices, pre-audit risk summaries, and substitute coverage recommendations from live unit records.',
    taskCopilotAction: 'Launch AI HR Copilot',
    taskSkipToOverview: 'Go directly to Situational Overview',

    overviewTitle: 'Situational Overview & Action Triggers',
    overviewSubtitle:
      'Unit 4 — Emergency Medical & Rescue Operations · Real-time qualification, training, and employment lifecycle readiness.',
    auditRiskCta: 'Audit Risk Summary',
    kpiTotalPersonnel: 'Total Unit Personnel',
    kpiActiveEmployees: 'active employees',
    kpiPersonnelSub: (perm, fixed, synced) =>
      `${perm} permanent · ${fixed} fixed-term · ${synced} Shift A profiles synced`,
    kpiCoverage: 'Qualification & Permit Coverage',
    kpiCompliant: 'compliant',
    kpiUrgentActions: 'Urgent Actions Required',
    kpiItemSingular: 'item needing attention',
    kpiItemPlural: 'items needing attention',
    kpiResolvedSession: (count) => `${count} resolved this session · Automated alerts active`,
    kpiRollingWindow: 'Proactive 30-day rolling compliance window',

    alarmsTitle: 'Proactive Timely Alarms',
    alarmsSubtitle:
      'Automated early-warning triggers surfaced before permits expire or onboarding gates stall.',
    hideResolved: 'Hide Resolved Triggers',
    showResolved: (count) => `Show Resolved (${count})`,
    allAlarmsAddressedTitle: 'All Urgent Compliance Triggers Addressed',
    allAlarmsAddressedBody:
      'Every upcoming permit expiration, training overdue alert, and fixed-term review has been actioned.',
    reviewActionLog: 'Review Action Log',
    openProfile360: 'Open 360° Profile',
    processing: 'Processing...',
    actionedAt: (ts) => `Actioned at ${ts}`,
    draftWithCopilot: 'Draft Notice with Copilot',
    analyzeCoverage: 'Analyze Coverage',
    resolvedPrefix: 'Resolved',

    rosterTitle: 'Unit Personnel Competency Roster',
    rosterSubtitle: (shown, total) =>
      `Showing ${shown} of ${total} synced profiles · Click any row to open Person & Role 360°`,
    searchPlaceholder: 'Search name, role, permit...',
    filterAll: 'All',
    filterAllTypes: 'All Types',
    filterPermanent: 'Permanent',
    filterFixedTerm: 'Fixed-Term',
    noMatchesTitle: 'No personnel match your current filters',
    noMatchesBody: 'Adjust your search term or clear status filters to view all unit profiles.',
    resetFilters: 'Reset Filters',
    colNameRole: 'Name & Role',
    colEmployment: 'Employment Relationship',
    colPermits: 'Key Permits & Qualifications',
    colTraining: 'Mandatory Training',
    colProfile: 'Profile',
    endsPrefix: 'Ends',
    indefiniteTenure: 'Indefinite tenure',
    activePermitsVerified: (count) => `${count} active permits verified`,
    viewProfile: 'View Profile',

    backToOverview: 'Back to Situational Overview',
    switchEmployee: 'Switch Employee:',
    contractEnds: 'Contract ends',
    supervisorPrefix: 'Supervisor:',
    reviewContract: 'Review Contract',
    askCopilot: 'Ask AI Copilot',
    missionTitle: 'Mission & Organization',
    deputyLabel: 'Substitute / Deputy Arrangement',
    startDateLabel: 'Appointment Start Date',
    activeAssignmentsLabel: 'Active Role Assignments & Duties',
    permitsTitle: 'Permits & Qualifications',
    validCountLabel: (valid, total) => `${valid}/${total} valid`,
    issuedPrefix: 'Issued',
    expiresPrefix: 'Expires',
    permanentPermit: 'Permanent / Until Revoked',
    trainingTitle: 'Training & Competence History',
    assignTraining: 'Assign Training',
    assignFormTitle: 'Assign Mandatory / Role Training',
    cancel: 'Cancel',
    quickPickLabel: 'Quick-Pick Course or Custom Title',
    customTrainingOption: 'Custom training title...',
    categoryLabel: 'Category',
    dueDateLabel: 'Due Date',
    hoursLabel: 'Hours',
    dispatchingLms: 'Dispatching to LMS...',
    confirmAssignment: 'Confirm Assignment',
    mandatory: 'Mandatory',
    elective: 'Elective',
    completedPrefix: 'Completed',
    duePrefix: 'Due',
    triggersAuditTitle: 'Active Triggers & Audit Log',
    activeAlertCount: (count) => `${count} active alert${count === 1 ? '' : 's'}`,
    noActiveTriggers: (name) => `No unresolved compliance triggers for ${name}.`,
    auditTrailHeading: 'Automated Notifications & Supervisory Audit Trail',

    analyticsTitle: 'Unit Reporting & Analytics',
    analyticsSubtitle:
      'Executive readiness telemetry, competency domain coverage, and 6-month fixed-term horizon.',
    exportReport: 'Export Situational Report',
    compilingReport: 'Compiling Situational Report...',
    catCoverageTitle: 'Qualification Coverage by Category',
    catCoverageSubtitle:
      'Compliance percentage across mandatory public-sector competency domains (Target: 95%)',
    unitAvg: 'Unit Avg',
    auditTarget95: '95% Audit Target',
    workforceTitle: 'Personnel Breakdown & Tenure Stability',
    workforceSubtitle:
      'Distribution of permanent civil/employment tenure vs. fixed-term appointments',
    permanentStaff: 'Permanent Staff',
    fixedTermStaff: 'Fixed-Term',
    contractHorizonTitle: 'Upcoming Contract Expirations (Next 6 Months)',
    fixedTermEndingSeries: 'Fixed-Term Ending',
    renewalsPendingSeries: 'Decision Pending',
    domainMatrixTitle: 'Domain Compliance Matrix',
    colCategory: 'Competency Category',
    colVerified: 'Verified',
    colCoverage: 'Coverage',
    fixedTermWatchlistTitle: 'Tracked Fixed-Term Appointments (Roster)',
    colEmployee: 'Employee',
    colDeputy: 'Deputy',
    colEndDate: 'End Date',
    convertedLabel: 'Converted',

    copilotTitle: 'AI HR Copilot',
    copilotSubtitle: 'Grounded in live Unit 4 roster & permit data',
    copilotPresetsHeading: 'One-Click Supervisory Workflows',
    copilotEmptyHint:
      "Select a supervisory workflow above or ask a question about Unit 4's permits, overdue trainings, fixed-term appointments, or substitute coverage.",
    copilotLoading: 'Analyzing Unit 4 compliance records and drafting recommendation...',
    copilotPlaceholder: 'Ask about unit readiness, renewals, or deputies...',
    copy: 'Copy',
    copied: 'Copied',
    presetPrompts: [
      'Draft renewal notice & training plan for Mikko Virtanen',
      "Summarize unit compliance risks before next month's audit",
      "Recommend substitute coverage if Antti Laine's fixed-term contract ends",
    ],

    execReportTitle: 'Executive Situational Readiness Report',
    generatedPrefix: 'Generated',
    overallReadiness: 'Overall Readiness',
    activeWorkforce: 'Active Workforce',
    openTriggers: 'Open Triggers',
    sessionActions: 'Session Actions',
    domainCoverageHeading: 'Competency Coverage by Domain',
    keyFindingsHeading: 'Key Findings',
    leadershipActionsHeading: 'Leadership Action Items',
    preparedBy: 'Prepared by',
    copyExecSummary: 'Copy Executive Summary',
    copiedClipboard: 'Copied to Clipboard',
    printBrief: 'Print Brief',
    done: 'Done',

    contractModalTitle: 'Fixed-Term Contract Decision',
    currentAppointment: 'Current Appointment',
    contractEndDateLabel: 'Contract End Date',
    designatedDeputyLabel: 'Designated Deputy',
    selectDecisionLabel: 'Select Supervisory Decision',
    extend12mTitle: 'Extend Fixed-Term Appointment (12 Months)',
    extend12mDesc:
      'Extends Määräaikainen virkasuhde through 2027-12-23 for Winter Readiness continuity.',
    convertPermTitle: 'Recommend Conversion to Permanent Civil Servant',
    convertPermDesc: 'Initiates HR approval to transition to Permanent Virkasuhde.',
    handoffTitle: 'Conclude Contract & Activate Deputy Handoff',
    handoffDesc: (deputy) => `Assigns operational handover checklist to ${deputy}.`,
    justificationLabel: 'Justification / HR Registry Note (Optional)',
    justificationPlaceholder:
      'e.g. Budget approved under CC-4105 winter preparedness allocation...',
    recordingDecision: 'Recording Decision...',
    confirmRegistry: 'Confirm & Update Registry',

    statuses: {
      Valid: 'Valid',
      'Expiring Soon': 'Expiring Soon',
      Overdue: 'Overdue',
      Missing: 'Missing',
      Compliant: 'Compliant',
      'Action Required': 'Action Required',
      Completed: 'Completed',
      Scheduled: 'Scheduled',
      Assigned: 'Assigned',
    },
    categories: {
      'Safety Permits': 'Safety Permits',
      'Information Security': 'Information Security',
      'Role Certifications': 'Role Certifications',
      'Leadership Training': 'Leadership Training',
    },
    alarmCategories: {
      'Expiring License': 'Expiring License',
      'Missing Training': 'Missing Training',
      'Contract Ending': 'Contract Ending',
      'Missing Data': 'Missing Data',
    },
    alarmActions: {
      'Schedule Renewal': 'Schedule Renewal',
      'Send Reminder': 'Send Reminder',
      'Review Contract': 'Review Contract',
      'Request Verification': 'Request Verification',
    },

    loadErrorTitle: 'Unable to load Unit 4 HR Registry',
    retryConnection: 'Retry Connection',
    toastReset: 'Demo state restored to initial 4 urgent triggers.',

    footerInfoButton: 'About the Valmius HR -solution',
    footerMeta: 'Valmius HR · Uusimaa Wellbeing Services County · Unit 4 Prototype',
    aboutModalTitle: 'About the Valmius HR Solution',
    aboutModalSubtitle:
      'Public-sector workforce competency, permit lifecycle, and unit readiness platform',
    aboutClose: 'Close',
    aboutTabs: {
      description: 'Description',
      architecture: 'Architecture Schema',
      security: 'Information Security',
      gettingStarted: 'Getting Started',
    },
    aboutDescription: {
      headline: 'Unified situational awareness for public-sector unit supervisors',
      summary:
        'Valmius HR brings together scattered civil-service tenure records, safety permits, mandatory training history, and deputy arrangements into a single operational workspace built for rescue services, acute healthcare, and municipal units.',
      problemTitle: 'The operational challenge',
      problemBody:
        'Unit managers often track C1/CE driving permits, GDPR and clinical certifications, Supo security clearances, and fixed-term Virkasuhde contracts across disconnected spreadsheets, LMS tools, and payroll systems—creating last-minute compliance gaps before audits or shift rosters.',
      outcomeTitle: 'The Valmius HR approach',
      outcomeBody:
        'Instead of manual cross-checking, Valmius HR continuously evaluates a 30-day rolling readiness window, surfaces timely action triggers before expirations occur, and gives supervisors a complete 360° profile to act in one click.',
      capabilitiesHeading: 'Core functional pillars',
      capabilities: [
        {
          title: 'Situational Overview & Timely Alarms',
          detail:
            'Real-time readiness KPIs paired with automated triggers for expiring licenses, overdue mandatory trainings, ending fixed-term appointments, and missing onboarding clearances.',
        },
        {
          title: 'Person & Role 360°',
          detail:
            'Holistic individual record consolidating employment relationship (Virkasuhde / Työsuhde), deputy arrangements, active permits, LMS training assignment, and audit trail.',
        },
        {
          title: 'Unit Analytics & Executive Reporting',
          detail:
            'Category-level compliance tracking against a 95% audit target, 6-month fixed-term expiration outlook, and one-click exportable situational briefs.',
        },
        {
          title: 'Grounded AI HR Copilot',
          detail:
            'Server-side generative assistant strictly grounded in live Unit 4 records to draft bilingual renewal notices, pre-audit risk summaries, and deputy coverage plans.',
        },
      ],
    },
    aboutArchitecture: {
      headline: 'Four-tier modular architecture & registry integration model',
      intro:
        'Designed for low-friction deployment alongside existing public-sector HR, LMS, and authority registries without replacing core payroll systems.',
      layers: [
        {
          tier: 'Layer 01',
          title: 'Presentation & Trilingual UI (React 19 + TypeScript)',
          components: ['Task Entry Screen', 'Situational Overview', 'Person 360°', 'Analytics & Copilot Drawer'],
          detail:
            'Single-page application with real-time FI/SV/EN localization, Recharts compliance visualizations, and accessible status indicators.',
        },
        {
          tier: 'Layer 02',
          title: 'Application Gateway & Workflow API (Node.js + Express)',
          components: ['REST Endpoints', 'Trigger Evaluation', 'LMS Dispatch', 'Audit Trail Logger'],
          detail:
            'Stateless API boundary handling alarm resolution, contract extension workflows, situational report compilation, and session state.',
        },
        {
          tier: 'Layer 03',
          title: 'Readiness Rules & Grounded AI Service',
          components: ['30-Day Rolling Ruleset', 'Category Aggregator', 'Server-Side @google/genai'],
          detail:
            'Computes unit coverage ratios deterministically while isolating generative drafting strictly on the server with unit-scoped context.',
        },
        {
          tier: 'Layer 04',
          title: 'Public-Sector Registry Adapters (Integration Boundary)',
          components: ['HR Master / Payroll', 'LMS Training Registry', 'Permit & Supo Gateways'],
          detail:
            'Synchronizes employment contracts, course completions, and permit validity dates via standardized connectors.',
        },
      ],
      integrationsHeading: 'Key external data boundaries',
      integrations: [
        {
          system: 'HR & Payroll Master (e.g. Populus / Prima / Sarastia)',
          dataFlow: 'Inbound Virkasuhde & Työsuhde tenure, cost centers, and contract end dates; outbound extension decisions.',
        },
        {
          system: 'Learning Management (LMS)',
          dataFlow: 'Bi-directional sync of mandatory GDPR, safety, and leadership completions plus one-click training assignments.',
        },
        {
          system: 'Authority & Permit Registries (Traficom / Valvira / Supo)',
          dataFlow: 'Verification metadata and expiration alerts for C1/CE permits, clinical licenses, and security clearances.',
        },
      ],
      dataFlowCaption:
        'Browser client communicates exclusively with the Express API boundary; no external registry or AI credentials are exposed client-side.',
    },
    aboutSecurity: {
      headline: 'Information security, privacy & AI governance statement',
      intro:
        'Built to align with Nordic public-sector data protection expectations for wellbeing services counties (hyvinvointialueet) and rescue authorities.',
      pillars: [
        {
          title: 'GDPR & Data Minimization',
          summary:
            'Processes only role-relevant competency, permit status, and employment lifecycle metadata needed for unit operational readiness.',
          controls: [
            'Sensitive background dossiers remain in authority systems; only verification status and validity dates are surfaced.',
            'Purpose-bound supervisor visibility scoped strictly to assigned organizational unit (Unit 4).',
          ],
        },
        {
          title: 'Access Control & Auditability',
          summary:
            'Every supervisory action—alarm resolution, training assignment, and contract recommendation—creates a timestamped audit entry.',
          controls: [
            'Role-Based Access Control (RBAC) separating unit managers, HR specialists, and executive auditors.',
            'Encrypted transport (TLS 1.3) and encrypted-at-rest EU/EEA hosting alignment.',
          ],
        },
        {
          title: 'Server-Side AI Safeguards',
          summary:
            'The AI HR Copilot operates strictly as a drafting and analytical aid under human-in-the-loop supervision.',
          controls: [
            'API credentials never leave the server environment and are never rendered or configurable in the browser UI.',
            'Prompts are grounded exclusively in the active unit context; no automated personnel decisions are executed without explicit supervisor confirmation.',
          ],
        },
      ],
      complianceLine:
        'Framework alignment: EU GDPR (2016/679) · Finnish Data Protection Act (1050/2018) · ISO/IEC 27001 control model · Julkri / Vahti readiness.',
    },
    aboutGettingStarted: {
      headline: 'Getting started in 4 guided steps',
      intro:
        'Whether evaluating Valmius HR in an executive walkthrough or onboarding as a unit supervisor, follow this flow to explore every capability.',
      steps: [
        {
          step: '01',
          title: 'Select language & supervisory task',
          detail:
            'Use the FI / SV / EN switcher in the top bar anytime. On the entry screen, pick your immediate focus—urgent alarms, a 360° profile, contract review, analytics, or AI Copilot.',
          tip: 'You can return to the task selector anytime via Switch Task in the sidebar.',
        },
        {
          step: '02',
          title: 'Resolve proactive timely alarms',
          detail:
            'In Situational Overview, review the 4 urgent triggers and execute direct actions such as Schedule Renewal for Mikko Virtanen or Send Reminder for Sanna Nieminen.',
          tip: 'Watch the KPI readiness coverage and urgent counter update dynamically.',
        },
        {
          step: '03',
          title: 'Inspect Person & Role 360° and assign training',
          detail:
            'Open any employee row (e.g. Mikko Virtanen or Antti Laine) to inspect permits, deputy assignments, and audit history. Use Assign Training to dispatch an LMS course.',
          tip: 'For fixed-term staff like Antti Laine, open Review Contract to record an extension or conversion decision.',
        },
        {
          step: '04',
          title: 'Export executive report & test AI HR Copilot',
          detail:
            'Switch to Unit Analytics to inspect category compliance against the 95% target and export a board-ready brief. Open AI HR Copilot for one-click draft notices.',
          tip: 'Use Reset Demo Data in the sidebar to restore the initial 4 triggers before a new demo.',
        },
      ],
      resetNote:
        'Interactive sandbox note: All state changes persist during the running session and can be restored instantly with Reset Demo Data.',
    },

    zeroClick: {
      engineTitle: 'Zero-Click License & Permit Renewal Engine',
      engineSubtitle:
        'Automatically reserves occupational health checks, test drives/skills tests, shift deputy coverage, and authority e-renewals at T-14d with zero supervisor clicks.',
      policyActive: 'Zero-Click Auto-Reserve: Active',
      policyManual: 'Zero-Click Policy: Manual',
      toggleLabel: 'Auto-Reserve Policy',
      zeroClicksBadge: '0 manual clicks required',
      stagedSummary: (count) =>
        `${count} active renewal pipeline${count === 1 ? '' : 's'} with pre-reserved health check & test drive`,
      noPendingPipelines:
        'All upcoming permit expirations have completed zero-click renewal and verified authority records.',
      inspectReservations: 'Inspect Reservations',
      finalizeAutoRenewal: 'Complete Checks & Issue Permit',
      finalizing: 'Issuing Renewal...',
      startZeroClick: 'Run Zero-Click Renewal',
      startingZeroClick: 'Reserving Slots...',
      manageSlots: 'Inspect / Reschedule Slots',
      modalTitle: 'Zero-Click Permit Renewal Pipeline',
      modalSubtitle:
        'Automated booking chain synchronized across Occupational Health, Training Track, Shift Roster, and Authority Registry.',
      triggeredAt: 'Auto-triggered',
      stepsHeading: 'Automated Reservations & Authority Chain',
      slotSelectLabel: 'Adjust reserved time slot (optional):',
      rescheduleUpdating: 'Syncing slot...',
      completeAndIssue: 'Simulate Pass & Auto-Issue Permit (2031)',
      completingAndIssuing: 'Filing Authority Renewal...',
      alreadyCompleted: 'Permit Renewed & Valid Through 2031-12-07',
      close: 'Close',
      typeLabels: {
        health_check: 'Occupational Health Check',
        test_drive: 'Emergency Test Drive',
        skills_test: 'Practical Skills Test',
        deputy_cover: 'Deputy Shift Cover',
        authority_filing: 'Authority E-Filing',
      },
      reservationStatuses: {
        Reserved: 'Auto-Reserved',
        Confirmed: 'Shift Confirmed',
        Queued: 'E-Filing Queued',
        Completed: 'Completed',
      },
      toastPolicyOn: 'Zero-Click Auto-Renewal policy enabled for Unit 4.',
      toastPolicyOff: 'Zero-Click Auto-Renewal switched to manual confirmation mode.',
      toastStaged: (permitCode, name) =>
        `Zero-Click reservations (health check + practical test + deputy) booked for ${name} (${permitCode})`,
      toastCompleted: (permitCode, name) =>
        `${permitCode} automatically renewed through 2031-12-07 for ${name}`,
      toastRescheduled: (slot) => `Reserved slot updated to ${slot} and deputy roster synced.`,
    },
  },

  fi: {
    brandSubtitle: 'Osaaminen ja valmius',
    navOverview: 'Tilannekuva',
    navProfile: 'Henkilö- ja rooli 360°',
    navAnalytics: 'Yksikön analytiikka',
    orgName: 'Uudenmaan hyvinvointialue',
    orgUnitShort: 'Yksikkö 4 · Pelastus ja akuuttihoito',
    resetDemo: 'Palauta demotila',
    resettingDemo: 'Palautetaan...',

    unitPrefix: 'Yksikkö 4',
    supervisorLabel: 'Esihenkilö: Laura Korhonen',
    supervisorTitle: 'Yksikönjohtaja, Pelastustoimi ja ensihoito / Julkinen terveydenhuolto',
    copilotButton: 'AI HR-avustaja',
    changeFocus: 'Vaihda tehtävää',

    taskGreeting: 'Tervetuloa takaisin, Laura Korhonen',
    taskHeading: 'Mitä varten olet täällä?',
    taskSubheading:
      'Valitse työnkulku siirtyäksesi suoraan oikeaan näkymään yksikössä Yksikkö 4 — Ensihoito ja pelastustoiminta.',
    taskSnapshotSummary: (total, coverage, urgent) =>
      `${total} aktiivista henkilöä · ${coverage} % ajan tasalla · ${urgent} kiireellistä herätettä`,
    taskAlarmsTitle: 'Käsittele kiireelliset määräaikahälytykset',
    taskAlarmsDesc: (urgent) =>
      urgent > 0
        ? `Tarkasta ${urgent} avointa herätettä — vanheneva C1/CE-ajolupa, myöhässä oleva tietoturvakoulutus ja puuttuva turvallisuusselvitys.`
        : 'Kaikki kiireelliset herätteet on hoidettu. Tarkastele yksikön tilannekuvaa ja käsiteltyjen toimien lokia.',
    taskAlarmsAction: 'Avaa hälytykset ja tilannekuva',
    taskProfileTitle: 'Tarkastele henkilön 360°-profiilia',
    taskProfileDesc:
      'Näe virka- tai työsuhde, voimassa olevat luvat, koulutushistoria ja sijaisjärjestelyt yhdellä näkymällä.',
    taskProfileAction: 'Avaa Mikko Virtanen 360°',
    taskContractTitle: 'Päätä päättyvistä määräaikaisuuksista',
    taskContractDesc:
      'Arvioi Antti Laineen 30 päivän päästä (23.12.2026) päättyvä virkasuhde — jatka, vakinaista tai aktivoi sijainen.',
    taskContractAction: 'Arvioi sopimuspäätös',
    taskAnalyticsTitle: 'Valmistele auditointi- ja valmiusraportti',
    taskAnalyticsDesc:
      'Tarkastele osaamisalueiden kattavuutta ja vie johdon tilannekuvaraportti yhdellä klikkauksella.',
    taskAnalyticsAction: 'Avaa yksikön analytiikka',
    taskCopilotTitle: 'Laadi ilmoituksia tai analysoi sijaisuuksia AI HR-avustajalla',
    taskCopilotDesc:
      'Luo uusintailmoitukset, auditoinnin riskitiivistelmät ja sijaisjärjestelysuositukset yksikön ajantasaisesta datasta.',
    taskCopilotAction: 'Avaa AI HR-avustaja',
    taskSkipToOverview: 'Siirry suoraan tilannekuvaan',

    overviewTitle: 'Tilannekuva ja ennakoivat herätteet',
    overviewSubtitle:
      'Yksikkö 4 — Ensihoito ja pelastustoiminta · Reaaliaikainen pätevyys-, koulutus- ja palvelussuhdevalmius.',
    auditRiskCta: 'Auditoinnin riskiyhteenveto',
    kpiTotalPersonnel: 'Yksikön henkilöstö yhteensä',
    kpiActiveEmployees: 'aktiivista työntekijää',
    kpiPersonnelSub: (perm, fixed, synced) =>
      `${perm} vakituista · ${fixed} määräaikaista · ${synced} A-vuoron profiilia synkronoitu`,
    kpiCoverage: 'Lupa- ja pätevyyskattavuus',
    kpiCompliant: 'ajan tasalla',
    kpiUrgentActions: 'Kiireelliset toimenpiteet',
    kpiItemSingular: 'välitön toimenpide',
    kpiItemPlural: 'välitöntä toimenpidettä',
    kpiResolvedSession: (count) =>
      `${count} käsitelty tässä istunnossa · Automaattihälytykset käytössä`,
    kpiRollingWindow: 'Ennakoiva 30 vrk seurantaikkuna',

    alarmsTitle: 'Ennakoivat määräaikahälytykset',
    alarmsSubtitle:
      'Automaattiset herätteet ennen lupien vanhenemista, koulutusten myöhästymistä tai perehdytyspuutteita.',
    hideResolved: 'Piilota käsitellyt',
    showResolved: (count) => `Näytä käsitellyt (${count})`,
    allAlarmsAddressedTitle: 'Kaikki kiireelliset herätteet käsitelty',
    allAlarmsAddressedBody:
      'Kaikki vanhenevat luvat, pakolliset koulutukset ja määräaikaisuuksien arvioinnit on hoidettu.',
    reviewActionLog: 'Tarkastele lokia',
    openProfile360: 'Avaa 360°-profiili',
    processing: 'Käsitellään...',
    actionedAt: (ts) => `Käsitelty ${ts}`,
    draftWithCopilot: 'Laadi ilmoitus avustajalla',
    analyzeCoverage: 'Analysoi sijaisjärjestely',
    resolvedPrefix: 'Käsitelty',

    rosterTitle: 'Yksikön henkilöstö- ja pätevyysluettelo',
    rosterSubtitle: (shown, total) =>
      `Näytetään ${shown} / ${total} synkronoitua profiilia · Avaa Henkilö 360° klikkaamalla riviä`,
    searchPlaceholder: 'Hae nimellä, roolilla, luvalla...',
    filterAll: 'Kaikki',
    filterAllTypes: 'Kaikki suhteet',
    filterPermanent: 'Vakituinen',
    filterFixedTerm: 'Määräaikainen',
    noMatchesTitle: 'Valituilla suodattimilla ei löytynyt henkilöitä',
    noMatchesBody: 'Muokkaa hakusanaa tai tyhjennä suodattimet nähdäksesi kaikki henkilöt.',
    resetFilters: 'Tyhjennä suodattimet',
    colNameRole: 'Nimi ja tehtävä',
    colEmployment: 'Palvelussuhde',
    colPermits: 'Keskeiset luvat ja pätevyydet',
    colTraining: 'Pakolliset koulutukset',
    colProfile: 'Profiili',
    endsPrefix: 'Päättyy',
    indefiniteTenure: 'Toistaiseksi voimassa oleva',
    activePermitsVerified: (count) => `${count} voimassa olevaa lupaa`,
    viewProfile: 'Avaa profiili',

    backToOverview: 'Takaisin tilannekuvaan',
    switchEmployee: 'Vaihda henkilöä:',
    contractEnds: 'Määräaikaisuus päättyy',
    supervisorPrefix: 'Esihenkilö:',
    reviewContract: 'Arvioi sopimus',
    askCopilot: 'Kysy AI-avustajalta',
    missionTitle: 'Tehtävä ja organisaatio',
    deputyLabel: 'Sijais- ja varamiesjärjestely',
    startDateLabel: 'Palvelussuhteen alkamispäivä',
    activeAssignmentsLabel: 'Aktiiviset vastuut ja projektitehtävät',
    permitsTitle: 'Luvat ja pätevyydet',
    validCountLabel: (valid, total) => `${valid}/${total} voimassa`,
    issuedPrefix: 'Myönnetty',
    expiresPrefix: 'Vanhenee',
    permanentPermit: 'Pysyvä / Toistaiseksi voimassa',
    trainingTitle: 'Koulutus- ja osaamishistoria',
    assignTraining: 'Määrää koulutus',
    assignFormTitle: 'Määrää pakollinen tai roolikohtainen koulutus',
    cancel: 'Peruuta',
    quickPickLabel: 'Valitse kurssi tai kirjoita nimi',
    customTrainingOption: 'Muu koulutus...',
    categoryLabel: 'Kategoria',
    dueDateLabel: 'Määräaika',
    hoursLabel: 'Tunnit',
    dispatchingLms: 'Lähetetään oppimisjärjestelmään...',
    confirmAssignment: 'Vahvista koulutusmääräys',
    mandatory: 'Pakollinen',
    elective: 'Täydentävä',
    completedPrefix: 'Suoritettu',
    duePrefix: 'Määräaika',
    triggersAuditTitle: 'Aktiiviset herätteet ja loki',
    activeAlertCount: (count) => `${count} aktiivista hälytystä`,
    noActiveTriggers: (name) => `Ei avoimia vaatimustenmukaisuusherätteitä: ${name}.`,
    auditTrailHeading: 'Automaattiset ilmoitukset ja esihenkilön lokihistoria',

    analyticsTitle: 'Yksikön raportointi ja analytiikka',
    analyticsSubtitle:
      'Johdon tilannekuva, osaamisalueiden kattavuus ja 6 kuukauden määräaikaisuusnäkymä.',
    exportReport: 'Vie tilannekuvaraportti',
    compilingReport: 'Kootaan raporttia...',
    catCoverageTitle: 'Pätevyyskattavuus kategorioittain',
    catCoverageSubtitle:
      'Vaatimustenmukaisuus (% ) pakollisilla osaamisalueilla (Tavoite: 95 %)',
    unitAvg: 'Yksikön ka.',
    auditTarget95: '95 % auditointitavoite',
    workforceTitle: 'Henkilöstörakenne ja palvelussuhteet',
    workforceSubtitle: 'Vakituisen henkilöstön ja määräaikaisten virkasuhteiden jakauma',
    permanentStaff: 'Vakituiset',
    fixedTermStaff: 'Määräaikaiset',
    contractHorizonTitle: 'Päättyvät määräaikaisuudet (seuraavat 6 kk)',
    fixedTermEndingSeries: 'Päättyvät sopimukset',
    renewalsPendingSeries: 'Päätös avoinna',
    domainMatrixTitle: 'Osaamisalueiden vaatimustenmukaisuus',
    colCategory: 'Osaamisalue',
    colVerified: 'Vahvistettu',
    colCoverage: 'Kattavuus',
    fixedTermWatchlistTitle: 'Seurannassa olevat määräaikaisuudet',
    colEmployee: 'Henkilö',
    colDeputy: 'Sijainen',
    colEndDate: 'Päättymispäivä',
    convertedLabel: 'Vakinaistettu',

    copilotTitle: 'AI HR-avustaja',
    copilotSubtitle: 'Pohjautuu Yksikkö 4:n ajantasaiseen tietoon',
    copilotPresetsHeading: 'Yhden klikkauksen esihenkilötoiminnot',
    copilotEmptyHint:
      'Valitse yllä oleva työnkulku tai kysy Yksikkö 4:n luvista, koulutuksista, määräaikaisuuksista tai sijaisjärjestelyistä.',
    copilotLoading: 'Analysoidaan Yksikkö 4:n tietoja ja laaditaan suositusta...',
    copilotPlaceholder: 'Kysy valmiudesta, uusinnoista tai sijaisista...',
    copy: 'Kopioi',
    copied: 'Kopioitu',
    presetPrompts: [
      'Laadi uusintailmoitus ja koulutussuunnitelma Mikko Virtaselle',
      'Tiivistä yksikön vaatimustenmukaisuusriskit ennen ensi kuun auditointia',
      'Suosittele sijaisjärjestelyä, jos Antti Laineen määräaikaisuus päättyy',
    ],

    execReportTitle: 'Johdon tilannekuva- ja valmiusraportti',
    generatedPrefix: 'Luotu',
    overallReadiness: 'Kokonaisvalmius',
    activeWorkforce: 'Henkilöstömäärä',
    openTriggers: 'Avoimet herätteet',
    sessionActions: 'Käsitellyt toimet',
    domainCoverageHeading: 'Kattavuus osaamisalueittain',
    keyFindingsHeading: 'Keskeiset havainnot',
    leadershipActionsHeading: 'Suositellut johtopäätökset',
    preparedBy: 'Laatinut',
    copyExecSummary: 'Kopioi yhteenveto',
    copiedClipboard: 'Kopioitu leikepöydälle',
    printBrief: 'Tulosta tiivistelmä',
    done: 'Valmis',

    contractModalTitle: 'Määräaikaisuuden jatkopäätös',
    currentAppointment: 'Nykyinen palvelussuhde',
    contractEndDateLabel: 'Päättymispäivä',
    designatedDeputyLabel: 'Nimetty sijainen',
    selectDecisionLabel: 'Valitse esihenkilöpäätös',
    extend12mTitle: 'Jatka määräaikaista virkasuhdetta (12 kk)',
    extend12mDesc:
      'Jatkaa määräaikaista virkasuhdetta 23.12.2027 saakka talvivalmiuden turvaamiseksi.',
    convertPermTitle: 'Esitä vakinaistamista (Toistaiseksi voimassa oleva virkasuhde)',
    convertPermDesc: 'Käynnistää HR-hyväksynnän vakituiseen virkasuhteeseen siirtymiseksi.',
    handoffTitle: 'Päätä sopimus ja aktivoi sijaisen perehdytys',
    handoffDesc: (deputy) => `Osoittaa tehtävien siirtolistan sijaiselle (${deputy}).`,
    justificationLabel: 'Perustelu / HR-rekisterimerkintä (valinnainen)',
    justificationPlaceholder: 'Esim. Määräraha hyväksytty kustannuspaikalle CC-4105...',
    recordingDecision: 'Tallennetaan päätöstä...',
    confirmRegistry: 'Vahvista ja päivitä rekisteri',

    statuses: {
      Valid: 'Voimassa',
      'Expiring Soon': 'Vanhenee pian',
      Overdue: 'Myöhässä',
      Missing: 'Puuttuu',
      Compliant: 'Kunnossa',
      'Action Required': 'Vaatii toimia',
      Completed: 'Suoritettu',
      Scheduled: 'Ajastettu',
      Assigned: 'Määrätty',
    },
    categories: {
      'Safety Permits': 'Turvallisuusluvat',
      'Information Security': 'Tietoturva',
      'Role Certifications': 'Roolipätevyydet',
      'Leadership Training': 'Esihenkilövalmius',
    },
    alarmCategories: {
      'Expiring License': 'Vanheneva lupa',
      'Missing Training': 'Puuttuva koulutus',
      'Contract Ending': 'Päättyvä sopimus',
      'Missing Data': 'Puuttuva tieto',
    },
    alarmActions: {
      'Schedule Renewal': 'Varaa uusinta',
      'Send Reminder': 'Lähetä muistutus',
      'Review Contract': 'Arvioi sopimus',
      'Request Verification': 'Pyydä vahvistus',
    },

    loadErrorTitle: 'Yksikkö 4:n HR-rekisteriä ei voitu ladata',
    retryConnection: 'Yritä uudelleen',
    toastReset: 'Demotila palautettu neljään alkuperäiseen herätteeseen.',

    footerInfoButton: 'Tietoa Valmius HR -ratkaisusta',
    footerMeta: 'Valmius HR · Uudenmaan hyvinvointialue · Yksikkö 4 -prototyyppi',
    aboutModalTitle: 'Tietoa Valmius HR -ratkaisusta',
    aboutModalSubtitle:
      'Julkisen sektorin osaamisen, lupien elinkaaren ja yksikkövalmiuden hallinta-alusta',
    aboutClose: 'Sulje',
    aboutTabs: {
      description: 'Kuvaus',
      architecture: 'Arkkitehtuurikaavio',
      security: 'Tietoturvaseloste',
      gettingStarted: 'Pikaopas',
    },
    aboutDescription: {
      headline: 'Yhtenäinen tilannekuva julkisen sektorin esihenkilöille',
      summary:
        'Valmius HR kokoaa hajallaan olevat virka- ja työsuhdetiedot, turvallisuusluvat, pakollisen koulutushistorian sekä sijaisjärjestelyt yhteen näkymään pelastustoimen, ensihoidon ja hyvinvointialueiden yksiköille.',
      problemTitle: 'Toiminnallinen haaste',
      problemBody:
        'Esihenkilöt joutuvat seuraamaan C1/CE-ajolupia, tietoturva- ja potilasturvallisuuskoulutuksia, Supo-turvallisuusselvityksiä sekä määräaikaisia virkasuhteita erillisistä taulukoista, oppimisjärjestelmistä ja henkilöstörekistereistä — mikä aiheuttaa yllättäviä puutteita ennen auditointeja ja vuorosuunnittelua.',
      outcomeTitle: 'Valmius HR:n ratkaisu',
      outcomeBody:
        'Manuaalisen tarkistamisen sijaan Valmius HR arvioi jatkuvasti 30 vuorokauden valmiusikkunaa, nostaa ennakoivat herätteet esiin ennen lupien vanhenemista ja tarjoaa esihenkilölle täydellisen 360°-henkilöprofiilin yhdellä klikkauksella.',
      capabilitiesHeading: 'Keskeiset toiminnallisuudet',
      capabilities: [
        {
          title: 'Tilannekuva ja ennakoivat herätteet',
          detail:
            'Reaaliaikaiset valmiusmittarit ja automaattiset hälytykset vanhenevista luvista, myöhästyneistä koulutuksista, päättyvistä määräaikaisuuksista ja puuttuvista perehdytystiedoista.',
        },
        {
          title: 'Henkilö- ja rooli 360°',
          detail:
            'Kattava henkilöprofiili, joka yhdistää palvelussuhteen (virkasuhde / työsuhde), varamiesjärjestelyt, voimassa olevat luvat, LMS-koulutusmääräykset ja esihenkilön lokihistorian.',
        },
        {
          title: 'Yksikön analytiikka ja raportointi',
          detail:
            'Osaamisalueiden vaatimustenmukaisuus suhteessa 95 % auditointitavoitteeseen, 6 kuukauden määräaikaisuusennuste ja yhdellä klikkauksella vietävä johdon tilannekuvaraportti.',
        },
        {
          title: 'Tietopohjainen AI HR-avustaja',
          detail:
            'Palvelinpuolen tekoälyavustaja, joka pohjautuu suoraan Yksikkö 4:n ajantasaisiin tietoihin ja laatii uusintailmoituksia, riskitiivistelmiä sekä sijaisuussuosituksia.',
        },
      ],
    },
    aboutArchitecture: {
      headline: 'Nelitasoinen modulaarinen arkkitehtuuri ja integraatiomalli',
      intro:
        'Suunniteltu liitettäväksi vaivattomasti julkisen sektorin nykyisiin HR-, oppimis- ja viranomaisrekistereihin korvaamatta palkanlaskennan ydinjärjestelmiä.',
      layers: [
        {
          tier: 'Taso 01',
          title: 'Käyttöliittymä ja monikielisyys (React 19 + TypeScript)',
          components: ['Tehtävävalikko', 'Tilannekuva', 'Henkilö 360°', 'Analytiikka & AI-avustaja'],
          detail:
            'Yksisivuinen sovellus reaaliaikaisella FI/SV/EN-kielituella, Recharts-visualisoinneilla ja saavutettavilla tilaindikaattoreilla.',
        },
        {
          tier: 'Taso 02',
          title: 'Sovellusrajapinta ja työnkulkumoottori (Node.js + Express)',
          components: ['REST-rajapinnat', 'Herätteiden käsittely', 'LMS-jakelu', 'Lokituspalvelu'],
          detail:
            'Hallitsee herätteiden kuittaukset, määräaikaisuuspäätökset, johdon raporttien koostamisen ja istuntokohtaisen tilan.',
        },
        {
          tier: 'Taso 03',
          title: 'Valmiussääntömoottori ja eristetty AI-palvelu',
          components: ['30 vrk sääntömoottori', 'Kategoria-aggregaattori', 'Palvelinpuolen @google/genai'],
          detail:
            'Laskee yksikön kattavuusluvut deterministisesti ja eristää tekoälykutsut palvelimelle tiukasti yksikkökontekstiin rajattuna.',
        },
        {
          tier: 'Taso 04',
          title: 'Julkisen sektorin rekisteriliitännät (Integraatioraja)',
          components: ['HR-päärekisteri', 'LMS-koulutusjärjestelmä', 'Lupa- ja Supo-rajapinnat'],
          detail:
            'Synkronoi palvelussuhteet, koulutussuoritukset ja lupien voimassaolopäivät vakioitujen liitäntöjen kautta.',
        },
      ],
      integrationsHeading: 'Keskeiset ulkoiset tietorajapinnat',
      integrations: [
        {
          system: 'HR- ja palkanlaskentajärjestelmä (esim. Populus / Prima / Sarastia)',
          dataFlow: 'Sisäänvirtaavat virka- ja työsuhdetiedot, kustannuspaikat ja päättymispäivät; ulosvirtaavat jatkopäätökset.',
        },
        {
          system: 'Oppimisympäristö (LMS)',
          dataFlow: 'Kaksisuuntainen synkronointi tietoturva-, turvallisuus- ja johtamiskoulutuksista sekä yhden klikkauksen koulutusmääräykset.',
        },
        {
          system: 'Viranomais- ja luparekisterit (Traficom / Valvira / Supo)',
          dataFlow: 'Vahvistustiedot ja vanhenemishälytykset C1/CE-ajoluvista, ammattioikeuksista ja turvallisuusselvityksistä.',
        },
      ],
      dataFlowCaption:
        'Selainasiakas kommunikoi ainoastaan Express-sovellusrajapinnan kanssa; ulkoisten rekisterien tai tekoälypalvelujen avaimia ei koskaan välitetä selaimeen.',
    },
    aboutSecurity: {
      headline: 'Tietoturva-, tietosuoja- ja tekoälyhallintalausunto',
      intro:
        'Suunniteltu vastaamaan hyvinvointialueiden, pelastuslaitosten ja julkisten organisaatioiden tietosuoja- ja tietoturvavaatimuksia.',
      pillars: [
        {
          title: 'GDPR ja tietojen minimointi',
          summary:
            'Käsittelee vain yksikön toimintavalmiuden kannalta välttämättömiä pätevyys-, lupa- ja palvelussuhdetietoja.',
          controls: [
            'Arkaluonteiset selvitysasiakirjat säilyvät viranomaisjärjestelmissä; käyttöliittymään tuodaan vain tilatieto ja voimassaolopäivä.',
            'Käyttötarkoitussidonnainen näkyvyys rajataan tiukasti esihenkilön omaan vastuuyksikköön (Yksikkö 4).',
          ],
        },
        {
          title: 'Pääsynhallinta ja auditointijälki',
          summary:
            'Jokainen esihenkilön toimenpide — herätteen kuittaus, koulutusmääräys ja sopimuspäätös — tallentaa aikaleimatun lokimerkinnän.',
          controls: [
            'Roolipohjainen pääsynhallinta (RBAC) eriyttää yksikönjohtajat, HR-asiantuntijat ja johdon tarkastajat.',
            'Salattu tiedonsiirto (TLS 1.3) sekä EU/ETA-alueen tietosuojavaatimusten mukainen tallennussalaus.',
          ],
        },
        {
          title: 'Palvelinpuolen tekoälyn suojamekanismit',
          summary:
            'AI HR-avustaja toimii tiukasti esihenkilön luonnos- ja analyysitukena ihmisen valvonnassa (human-in-the-loop).',
          controls: [
            'API-tunnisteet pidetään täysin palvelinpuolella eikä niitä koskaan näytetä tai syötetä selaimessa.',
            'Kehotteet ankkuroidaan vain kyseisen yksikön kontekstiin, eikä automaattisia henkilöstöpäätöksiä tehdä ilman esihenkilön vahvistusta.',
          ],
        },
      ],
      complianceLine:
        'Viitekehykset: EU GDPR (2016/679) · Tietosuojalaki (1050/2018) · ISO/IEC 27001 -hallintamalli · Julkisen hallinnon tietoturvavaatimukset.',
    },
    aboutGettingStarted: {
      headline: 'Aloita käyttö neljässä selkeässä vaiheessa',
      intro:
        'Olipa kyseessä johdon esittely tai esihenkilön päivittäinen työskentely, näiden vaiheiden avulla käyt läpi kaikki keskeiset ominaisuudet.',
      steps: [
        {
          step: '01',
          title: 'Valitse kieli ja aloitustehtävä',
          detail:
            'Vaihda kieltä (FI / SV / EN) yläpalkista milloin tahansa. Valitse aloitussivulla tilanteeseen sopiva työnkulku: kiireelliset hälytykset, 360°-profiili, sopimuspäätös, analytiikka tai AI-avustaja.',
          tip: 'Pääset takaisin tehtävävalikkoon sivupalkin Vaihda tehtävää -painikkeesta.',
        },
        {
          step: '02',
          title: 'Käsittele ennakoivat määräaikahälytykset',
          detail:
            'Tarkastele Tilannekuva-näkymässä neljää kiireellistä herätettä ja suorita toimenpiteitä suoraan, kuten Varaa uusinta Mikko Virtaselle tai Lähetä muistutus Sanna Niemiselle.',
          tip: 'Seuraa kuinka valmiuskattavuus (%) ja avointen herätteiden määrä päivittyvät reaaliaikaisesti.',
        },
        {
          step: '03',
          title: 'Tutki Henkilö 360° -profiilia ja määrää koulutus',
          detail:
            'Avaa kuka tahansa henkilö (esim. Mikko Virtanen tai Antti Laine) nähdäksesi luvat, sijaisjärjestelyt ja lokihistorian. Lisää pakollinen koulutus Määrää koulutus -toiminnolla.',
          tip: 'Määräaikaisilla henkilöillä (Antti Laine) voit kirjata jatko- tai vakinaistamispäätöksen Arvioi sopimus -ikkunassa.',
        },
        {
          step: '04',
          title: 'Vie johdon raportti ja hyödynnä AI HR-avustajaa',
          detail:
            'Siirry Yksikön analytiikkaan vertaamaan kattavuutta 95 % auditointitavoitteeseen ja vie tilannekuvaraportti. Kokeile AI HR-avustajan yhden klikkauksen valmiita kehotteita.',
          tip: 'Palauta demotila alkuun ennen uutta esittelyä sivupalkin Palauta demotila -painikkeella.',
        },
      ],
      resetNote:
        'Interaktiivinen demoympäristö: Kaikki muutokset säilyvät käynnissä olevan istunnon ajan ja voidaan palauttaa heti alkuperäiseen tilaan.',
    },

    zeroClick: {
      engineTitle: 'Zero-Click-lupauusintamoottori',
      engineSubtitle:
        'Varaa työterveystarkastukset, ajokokeet/osaamisnäytteet, sijaisvuorot ja viranomaisuusinnan automaattisesti T-14 vrk kohdalla ilman esihenkilön klikkauksia.',
      policyActive: 'Automaattinen varaus: Käytössä',
      policyManual: 'Uusintatila: Manuaalinen',
      toggleLabel: 'Automaattinen varauspolitiikka',
      zeroClicksBadge: '0 manuaalista klikkausta',
      stagedSummary: (count) =>
        `${count} käynnissä olevaa uusintaketjua valmiiksi varatulla terveystarkastuksella ja ajokokeella`,
      noPendingPipelines:
        'Kaikki tulevat lupien vanhenemiset on käsitelty Zero-Click-uusinnalla ja vahvistettu viranomaisrekisteriin.',
      inspectReservations: 'Tarkastele varauksia',
      finalizeAutoRenewal: 'Merkitse suoritetuksi ja uusi lupa',
      finalizing: 'Uusitaan lupaa...',
      startZeroClick: 'Käynnistä Zero-Click-uusinta',
      startingZeroClick: 'Varataan aikoja...',
      manageSlots: 'Tarkastele / Vaihda aikoja',
      modalTitle: 'Zero-Click-lupauusinnan varausketju',
      modalSubtitle:
        'Automaattinen varausketju synkronoituna työterveyden, ajoharjoitteluradan, työvuorolistan ja viranomaisrekisterin välillä.',
      triggeredAt: 'Käynnistetty automaattisesti',
      stepsHeading: 'Automaattiset varaukset ja viranomaisketju',
      slotSelectLabel: 'Vaihda varattua aikaa (valinnainen):',
      rescheduleUpdating: 'Synkronoidaan aikaa...',
      completeAndIssue: 'Simuloi läpäisy ja myönnä lupa (2031)',
      completingAndIssuing: 'Lähetetään viranomaisuusinta...',
      alreadyCompleted: 'Lupa uusittu ja voimassa 2031-12-07 saakka',
      close: 'Sulje',
      typeLabels: {
        health_check: 'Työterveystarkastus',
        test_drive: 'Hälytysajon ajokoe',
        skills_test: 'Käytännön näyttökoe',
        deputy_cover: 'Sijaisvuorojärjestely',
        authority_filing: 'Viranomaisilmoitus',
      },
      reservationStatuses: {
        Reserved: 'Automaattisesti varattu',
        Confirmed: 'Vuoro vahvistettu',
        Queued: 'Odottaa lähetystä',
        Completed: 'Suoritettu',
      },
      toastPolicyOn: 'Zero-Click-automaattiuusinta otettu käyttöön Yksikkö 4:ssä.',
      toastPolicyOff: 'Zero-Click-automaattiuusinta asetettu manuaaliseen vahvistustilaan.',
      toastStaged: (permitCode, name) =>
        `Zero-Click-varaukset (terveystarkastus + koe + sijainen) tehty: ${name} (${permitCode})`,
      toastCompleted: (permitCode, name) =>
        `${permitCode} uusittu automaattisesti 2031-12-07 saakka (${name})`,
      toastRescheduled: (slot) => `Varattu aika päivitetty (${slot}) ja sijaisvuoro synkronoitu.`,
    },
  },

  sv: {
    brandSubtitle: 'Kompetens och beredskap',
    navOverview: 'Lägesbild',
    navProfile: 'Person och roll 360°',
    navAnalytics: 'Enhetsanalys',
    orgName: 'Nylands välfärdsområde',
    orgUnitShort: 'Enhet 4 · Räddning & akutsjukvård',
    resetDemo: 'Återställ demo',
    resettingDemo: 'Återställer...',

    unitPrefix: 'Enhet 4',
    supervisorLabel: 'Chef: Laura Korhonen',
    supervisorTitle: 'Enhetschef, Räddningstjänst & akutvård / Offentlig hälso- och sjukvård',
    copilotButton: 'AI HR-assistent',
    changeFocus: 'Byt uppgift',

    taskGreeting: 'Välkommen tillbaka, Laura Korhonen',
    taskHeading: 'Vad vill du göra idag?',
    taskSubheading:
      'Välj ett arbetsflöde för att gå direkt till rätt vy för Enhet 4 — Akutvård och räddningsinsatser.',
    taskSnapshotSummary: (total, coverage, urgent) =>
      `${total} aktiva medarbetare · ${coverage} % godkänd · ${urgent} brådskande åtgärd${urgent === 1 ? '' : 'er'}`,
    taskAlarmsTitle: 'Hantera brådskande efterlevnadslarm',
    taskAlarmsDesc: (urgent) =>
      urgent > 0
        ? `Granska ${urgent} aktiva larm — utgående C1/CE-körtillstånd, försenad GDPR-utbildning och saknad säkerhetsprövning.`
        : 'Alla brådskande larm är hanterade. Granska enhetens lägesbild och åtgärdslogg.',
    taskAlarmsAction: 'Öppna larm och lägesbild',
    taskProfileTitle: 'Granska en medarbetares 360°-profil',
    taskProfileDesc:
      'Samla anställningsform (Virkasuhde), giltiga tillstånd, utbildningshistorik och ersättare på en skärm.',
    taskProfileAction: 'Öppna Mikko Virtanen 360°',
    taskContractTitle: 'Besluta om utgående visstidsavtal',
    taskContractDesc:
      'Ta ställning till Antti Laines förordnande som slutar om 30 dagar (2026-12-23) — förläng, tillsvidareanställ eller lämna över.',
    taskContractAction: 'Granska avtalsbeslut',
    taskAnalyticsTitle: 'Förbered revisions- och beredskapsrapport',
    taskAnalyticsDesc:
      'Följ kompetenstäckning per kategori och exportera en sammanställd lägesrapport för ledningen.',
    taskAnalyticsAction: 'Öppna enhetsanalys',
    taskCopilotTitle: 'Skapa utkast eller analysera vikarieberedskap med AI-assistenten',
    taskCopilotDesc:
      'Ta fram förnyelsemeddelanden, revisionsrisker och ersättarförslag direkt från enhetens aktuella data.',
    taskCopilotAction: 'Starta AI HR-assistent',
    taskSkipToOverview: 'Gå direkt till lägesbilden',

    overviewTitle: 'Lägesbild och proaktiva åtgärder',
    overviewSubtitle:
      'Enhet 4 — Akutvård och räddningsinsatser · Beredskap i realtid för behörigheter, utbildningar och anställningar.',
    auditRiskCta: 'Risksammanfattning inför revision',
    kpiTotalPersonnel: 'Total enhetspersonal',
    kpiActiveEmployees: 'aktiva medarbetare',
    kpiPersonnelSub: (perm, fixed, synced) =>
      `${perm} ordinarie · ${fixed} visstid · ${synced} skift A-profiler synkade`,
    kpiCoverage: 'Behörighets- och tillståndstäckning',
    kpiCompliant: 'uppfyller krav',
    kpiUrgentActions: 'Brådskande åtgärder',
    kpiItemSingular: 'ärende kräver åtgärd',
    kpiItemPlural: 'ärenden kräver åtgärd',
    kpiResolvedSession: (count) =>
      `${count} hanterade i denna session · Automatiska larm aktiva`,
    kpiRollingWindow: 'Proaktivt 30-dagars kontrollfönster',

    alarmsTitle: 'Proaktiva tidslarm',
    alarmsSubtitle:
      'Automatiska varningar innan tillstånd löper ut, utbildningar försenas eller introduktion stannar av.',
    hideResolved: 'Dölj hanterade larm',
    showResolved: (count) => `Visa hanterade (${count})`,
    allAlarmsAddressedTitle: 'Alla brådskande larm är hanterade',
    allAlarmsAddressedBody:
      'Alla kommande förnyelser av tillstånd, obligatoriska utbildningar och visstidsbeslut är åtgärdade.',
    reviewActionLog: 'Granska åtgärdslogg',
    openProfile360: 'Öppna 360°-profil',
    processing: 'Bearbetar...',
    actionedAt: (ts) => `Åtgärdad ${ts}`,
    draftWithCopilot: 'Skapa utkast med AI-assistent',
    analyzeCoverage: 'Analysera vikarieberedskap',
    resolvedPrefix: 'Hanterad',

    rosterTitle: 'Enhetens personal- och kompetensöversikt',
    rosterSubtitle: (shown, total) =>
      `Visar ${shown} av ${total} synkroniserade profiler · Klicka på en rad för Person & Roll 360°`,
    searchPlaceholder: 'Sök namn, roll, tillstånd...',
    filterAll: 'Alla',
    filterAllTypes: 'Alla anställningar',
    filterPermanent: 'Tillsvidare',
    filterFixedTerm: 'Visstid',
    noMatchesTitle: 'Inga medarbetare matchar filtren',
    noMatchesBody: 'Justera söktermen eller återställ filtren för att visa alla profiler.',
    resetFilters: 'Återställ filter',
    colNameRole: 'Namn och roll',
    colEmployment: 'Anställningsförhållande',
    colPermits: 'Viktiga tillstånd & behörigheter',
    colTraining: 'Obligatorisk utbildning',
    colProfile: 'Profil',
    endsPrefix: 'Slutar',
    indefiniteTenure: 'Tillsvidareanställning',
    activePermitsVerified: (count) => `${count} giltiga tillstånd verifierade`,
    viewProfile: 'Visa profil',

    backToOverview: 'Tillbaka till lägesbilden',
    switchEmployee: 'Byt medarbetare:',
    contractEnds: 'Avtal slutar',
    supervisorPrefix: 'Chef:',
    reviewContract: 'Granska avtal',
    askCopilot: 'Fråga AI-assistenten',
    missionTitle: 'Uppdrag och organisation',
    deputyLabel: 'Ersättare / Ställföreträdare',
    startDateLabel: 'Tillträdesdatum',
    activeAssignmentsLabel: 'Aktiva uppdrag och ansvarsområden',
    permitsTitle: 'Tillstånd och behörigheter',
    validCountLabel: (valid, total) => `${valid}/${total} giltiga`,
    issuedPrefix: 'Utfärdad',
    expiresPrefix: 'Löper ut',
    permanentPermit: 'Permanent / Tills vidare',
    trainingTitle: 'Utbildnings- och kompetenshistorik',
    assignTraining: 'Tilldela utbildning',
    assignFormTitle: 'Tilldela obligatorisk eller rollspecifik utbildning',
    cancel: 'Avbryt',
    quickPickLabel: 'Välj kursmall eller ange egen titel',
    customTrainingOption: 'Egen utbildningstitel...',
    categoryLabel: 'Kategori',
    dueDateLabel: 'Förfallodatum',
    hoursLabel: 'Timmar',
    dispatchingLms: 'Skickar till lärplattform...',
    confirmAssignment: 'Bekräfta tilldelning',
    mandatory: 'Obligatorisk',
    elective: 'Valfri',
    completedPrefix: 'Slutförd',
    duePrefix: 'Senast',
    triggersAuditTitle: 'Aktiva larm och granskningslogg',
    activeAlertCount: (count) => `${count} aktiva larm`,
    noActiveTriggers: (name) => `Inga olösta efterlevnadslarm för ${name}.`,
    auditTrailHeading: 'Automatiska aviseringar och chefslogg',

    analyticsTitle: 'Enhetsrapportering och analys',
    analyticsSubtitle:
      'Ledningsöversikt, kompetenstäckning per kategori och 6-månaders visstidsprognos.',
    exportReport: 'Exportera lägesrapport',
    compilingReport: 'Sammanställer lägesrapport...',
    catCoverageTitle: 'Behörighetstäckning per kategori',
    catCoverageSubtitle:
      'Efterlevnadsgrad (%) inom obligatoriska kompetensområden (Mål: 95 %)',
    unitAvg: 'Enhetssnitt',
    auditTarget95: '95 % revisionsmål',
    workforceTitle: 'Personalstruktur och anställningstrygghet',
    workforceSubtitle: 'Fördelning mellan tillsvidare- och visstidsanställningar',
    permanentStaff: 'Tillsvidareanställda',
    fixedTermStaff: 'Visstidsanställda',
    contractHorizonTitle: 'Utgående visstidsavtal (nästa 6 månader)',
    fixedTermEndingSeries: 'Avtal som löper ut',
    renewalsPendingSeries: 'Väntar på beslut',
    domainMatrixTitle: 'Efterlevnadsmatris per område',
    colCategory: 'Kompetensområde',
    colVerified: 'Verifierade',
    colCoverage: 'Täckning',
    fixedTermWatchlistTitle: 'Bevakade visstidsförordnanden',
    colEmployee: 'Medarbetare',
    colDeputy: 'Ersättare',
    colEndDate: 'Slutdatum',
    convertedLabel: 'Tillsvidare',

    copilotTitle: 'AI HR-assistent',
    copilotSubtitle: 'Grundad i Enhet 4:s aktuella registerdata',
    copilotPresetsHeading: 'Snabbflöden för chefer',
    copilotEmptyHint:
      'Välj ett chefsflöde ovan eller ställ en fråga om Enhet 4:s tillstånd, försenade utbildningar, visstidsavtal eller vikarieplanering.',
    copilotLoading: 'Analyserar Enhet 4:s efterlevnadsdata och tar fram förslag...',
    copilotPlaceholder: 'Fråga om beredskap, förnyelser eller ersättare...',
    copy: 'Kopiera',
    copied: 'Kopierad',
    presetPrompts: [
      'Skapa förnyelsemeddelande och utbildningsplan för Mikko Virtanen',
      'Sammanfatta enhetens efterlevnadsrisker inför nästa månads revision',
      'Rekommendera ersättare om Antti Laines visstidsanställning avslutas',
    ],

    execReportTitle: 'Ledningens läges- och beredskapsrapport',
    generatedPrefix: 'Genererad',
    overallReadiness: 'Total beredskap',
    activeWorkforce: 'Aktiv personal',
    openTriggers: 'Öppna larm',
    sessionActions: 'Hanterade i sessionen',
    domainCoverageHeading: 'Kompetenstäckning per område',
    keyFindingsHeading: 'Viktiga iakttagelser',
    leadershipActionsHeading: 'Rekommenderade chefsbeslut',
    preparedBy: 'Upprättad av',
    copyExecSummary: 'Kopiera sammanfattning',
    copiedClipboard: 'Kopierad till urklipp',
    printBrief: 'Skriv ut sammanfattning',
    done: 'Klar',

    contractModalTitle: 'Beslut om visstidsanställning',
    currentAppointment: 'Nuvarande förordnande',
    contractEndDateLabel: 'Slutdatum',
    designatedDeputyLabel: 'Utpekad ersättare',
    selectDecisionLabel: 'Välj chefsbeslut',
    extend12mTitle: 'Förläng visstidsförordnande (12 månader)',
    extend12mDesc:
      'Förlänger tjänsteförhållandet till 2027-12-23 för att säkra vinterberedskapen.',
    convertPermTitle: 'Föreslå övergång till tillsvidaretjänst',
    convertPermDesc: 'Initierar HR-godkännande för ordinarie tjänsteförhållande (Virkasuhde).',
    handoffTitle: 'Avsluta avtal och aktivera överlämning',
    handoffDesc: (deputy) => `Tilldelar operativ överlämningschecklista till ${deputy}.`,
    justificationLabel: 'Motivering / HR-notering (valfritt)',
    justificationPlaceholder: 'T.ex. Budget godkänd under kostnadsställe CC-4105...',
    recordingDecision: 'Registrerar beslut...',
    confirmRegistry: 'Bekräfta och uppdatera register',

    statuses: {
      Valid: 'Giltig',
      'Expiring Soon': 'Löper ut snart',
      Overdue: 'Försenad',
      Missing: 'Saknas',
      Compliant: 'Godkänd',
      'Action Required': 'Åtgärd krävs',
      Completed: 'Slutförd',
      Scheduled: 'Schemalagd',
      Assigned: 'Tilldelad',
    },
    categories: {
      'Safety Permits': 'Säkerhetstillstånd',
      'Information Security': 'Informationssäkerhet',
      'Role Certifications': 'Rollcertifieringar',
      'Leadership Training': 'Ledarskapsutbildning',
    },
    alarmCategories: {
      'Expiring License': 'Utgående tillstånd',
      'Missing Training': 'Saknad utbildning',
      'Contract Ending': 'Utgående avtal',
      'Missing Data': 'Saknad uppgift',
    },
    alarmActions: {
      'Schedule Renewal': 'Boka förnyelse',
      'Send Reminder': 'Skicka påminnelse',
      'Review Contract': 'Granska avtal',
      'Request Verification': 'Begär verifiering',
    },

    loadErrorTitle: 'Kunde inte ladda Enhet 4:s HR-register',
    retryConnection: 'Försök igen',
    toastReset: 'Demoläget återställt till de 4 ursprungliga larmen.',

    footerInfoButton: 'Om Valmius HR-lösningen',
    footerMeta: 'Valmius HR · Nylands välfärdsområde · Enhet 4-prototyp',
    aboutModalTitle: 'Om Valmius HR-lösningen',
    aboutModalSubtitle:
      'Plattform för kompetens, tillståndens livscykel och beredskap inom offentlig sektor',
    aboutClose: 'Stäng',
    aboutTabs: {
      description: 'Beskrivning',
      architecture: 'Arkitekturschema',
      security: 'Informationssäkerhet',
      gettingStarted: 'Kom igång',
    },
    aboutDescription: {
      headline: 'Samlad lägesbild för enhetschefer inom offentlig sektor',
      summary:
        'Valmius HR samlar spridda uppgifter om tjänsteförhållanden, säkerhetstillstånd, obligatoriska utbildningar och ersättarplanering i en enhetlig arbetsyta för räddningstjänst, akutsjukvård och kommunala enheter.',
      problemTitle: 'Den operativa utmaningen',
      problemBody:
        'Enhetschefer tvingas ofta följa C1/CE-körtillstånd, GDPR- och kliniska certifikat, säkerhetsprövningar samt visstidsförordnanden i separata kalkylblad, lärplattformar och lönesystem — vilket skapar oväntade brister inför revisioner och skiftplanering.',
      outcomeTitle: 'Valmius HR:s arbetssätt',
      outcomeBody:
        'I stället för manuell korskontroll utvärderar Valmius HR löpande ett 30-dagars beredskapsfönster, lyfter fram proaktiva larm innan tillstånd löper ut och ger chefen en fullständig 360°-profil med ett klick.',
      capabilitiesHeading: 'Centrala funktionsområden',
      capabilities: [
        {
          title: 'Lägesbild och proaktiva tidslarm',
          detail:
            'Beredskapsmått i realtid kombinerat med automatiska varningar för utgående tillstånd, försenade utbildningar, avslutande visstidsavtal och saknade introduktionsdata.',
        },
        {
          title: 'Person och roll 360°',
          detail:
            'Samlad medarbetarvy som förenar anställningsform (Virkasuhde / Työsuhde), ställföreträdare, giltiga tillstånd, LMS-tilldelning och granskningslogg.',
        },
        {
          title: 'Enhetsanalys och ledningsrapport',
          detail:
            'Kategorivis efterlevnad mot 95 % revisionsmål, 6-månaders avtalsprognos och direkt exporterbar lägesrapport för ledningen.',
        },
        {
          title: 'Registergrundad AI HR-assistent',
          detail:
            'Serverbaserad AI-assistent som utgår från Enhet 4:s aktuella data för att ta fram förnyelsemeddelanden, revisionsrisker och ersättarförslag.',
        },
      ],
    },
    aboutArchitecture: {
      headline: 'Fyrlagers modulär arkitektur och integrationsmodell',
      intro:
        'Utformad för smidig anslutning till offentlig sektors befintliga HR-, utbildnings- och myndighetsregister utan att ersätta kärnsystem för lön.',
      layers: [
        {
          tier: 'Lager 01',
          title: 'Presentation och flerspråkigt UI (React 19 + TypeScript)',
          components: ['Uppgiftsväljare', 'Lägesbild', 'Person 360°', 'Analys & AI-assistent'],
          detail:
            'Ensidig webbapplikation med direkt språkväxling (FI/SV/EN), Recharts-diagram och tydliga tillgänglighetsanpassade statusmarkörer.',
        },
        {
          tier: 'Lager 02',
          title: 'Applikationsgateway och arbetsflöden (Node.js + Express)',
          components: ['REST-slutpunkter', 'Larmhantering', 'LMS-utskick', 'Granskningslogg'],
          detail:
            'Hanterar larmåtgärder, avtalsbeslut, rapportsammanställning och sessionens arbetsflöden.',
        },
        {
          tier: 'Lager 03',
          title: 'Beredskapsregler och isolerad AI-tjänst',
          components: ['30-dagars regelverk', 'Kategoriaggregering', 'Serverbaserad @google/genai'],
          detail:
            'Beräknar täckningsgrader deterministiskt och isolerar AI-anrop till serversidan strikt begränsat till enhetens kontext.',
        },
        {
          tier: 'Lager 04',
          title: 'Offentliga registeradaptrar (Integrationsgräns)',
          components: ['HR-huvudregister', 'LMS-lärplattform', 'Tillstånds- & Supo-gateways'],
          detail:
            'Synkroniserar anställningar, genomförda kurser och giltighetstider via standardiserade kopplingar.',
        },
      ],
      integrationsHeading: 'Viktiga externa datagränser',
      integrations: [
        {
          system: 'HR- och lönesystem (t.ex. Populus / Prima / Sarastia)',
          dataFlow: 'Inkommande Virkasuhde/Työsuhde-avtal, kostnadsställen och slutdatum; utgående förlängningsbeslut.',
        },
        {
          system: 'Lärplattform (LMS)',
          dataFlow: 'Tvåvägssynk av obligatorisk informationssäkerhets-, säkerhets- och ledarskapsutbildning samt direkttilldelning.',
        },
        {
          system: 'Myndighets- och tillståndsregister (Traficom / Valvira / Supo)',
          dataFlow: 'Verifieringsmetadata och utgångsvarningar för C1/CE-tillstånd, yrkeslegitimationer och säkerhetsprövningar.',
        },
      ],
      dataFlowCaption:
        'Webbläsaren kommunicerar uteslutande med Express-gränssnittet; inga externa register- eller AI-nycklar exponeras i klienten.',
    },
    aboutSecurity: {
      headline: 'Uttalande om informationssäkerhet, dataskydd och AI-styrning',
      intro:
        'Utformad för att möta kraven på dataskydd och informationssäkerhet hos välfärdsområden och räddningsmyndigheter.',
      pillars: [
        {
          title: 'GDPR och uppgiftsminimering',
          summary:
            'Behandlar endast den kompetens-, tillstånds- och anställningsmetadata som krävs för enhetens operativa beredskap.',
          controls: [
            'Känsliga utredningshandlingar stannar i myndighetssystem; endast verifieringsstatus och giltighetsdatum visas.',
            'Ändamålsbunden chefsbehörighet strikt begränsad till den egna enheten (Enhet 4).',
          ],
        },
        {
          title: 'Åtkomstkontroll och spårbarhet',
          summary:
            'Varje chefsåtgärd — larmhantering, utbildningstilldelning och avtalsbeslut — skapar en tidsstämplad loggpost.',
          controls: [
            'Rollbaserad åtkomstkontroll (RBAC) skiljer enhetschefer, HR-specialister och revisorer åt.',
            'Krypterad överföring (TLS 1.3) och lagringskryptering anpassad för EU/EES-krav.',
          ],
        },
        {
          title: 'Serverbaserade AI-skydd',
          summary:
            'AI HR-assistenten fungerar uteslutande som utkast- och analysstöd under mänsklig kontroll (human-in-the-loop).',
          controls: [
            'API-nycklar lämnar aldrig servermiljön och visas eller konfigureras aldrig i webbläsaren.',
            'Svar grundas enbart i den aktuella enhetskontexten och inga personalbeslut genomförs utan chefens uttryckliga godkännande.',
          ],
        },
      ],
      complianceLine:
        'Ramverk: EU GDPR (2016/679) · Finlands dataskyddslag (1050/2018) · ISO/IEC 27001-kontroller · Offentlig förvaltnings säkerhetskrav.',
    },
    aboutGettingStarted: {
      headline: 'Kom igång i fyra tydliga steg',
      intro:
        'Följ det här flödet under en ledningsdemonstration eller som ny enhetschef för att snabbt utforska lösningens funktioner.',
      steps: [
        {
          step: '01',
          title: 'Välj språk och startflöde',
          detail:
            'Använd FI / SV / EN-väljaren i toppmenyn när som helst. På startskärmen väljer du direkt ditt fokus — brådskande larm, 360°-profil, avtalsbeslut, analys eller AI-assistent.',
          tip: 'Du kan alltid återgå till uppgiftsväljaren via Byt uppgift i sidomenyn.',
        },
        {
          step: '02',
          title: 'Åtgärda proaktiva tidslarm',
          detail:
            'Granska de 4 akuta larmen i Lägesbild och klicka på direktåtgärder som Boka förnyelse för Mikko Virtanen eller Skicka påminnelse till Sanna Nieminen.',
          tip: 'Se hur enhetens täckningsgrad (%) och larmräknare uppdateras direkt.',
        },
        {
          step: '03',
          title: 'Granska Person 360° och tilldela utbildning',
          detail:
            'Öppna valfri medarbetare (t.ex. Mikko Virtanen eller Antti Laine) för att se tillstånd, ersättare och logg. Använd Tilldela utbildning för att skicka en LMS-kurs.',
          tip: 'För visstidsanställda som Antti Laine kan du öppna Granska avtal för att registrera förlängning eller övergång.',
        },
        {
          step: '04',
          title: 'Exportera lägesrapport och testa AI-assistenten',
          detail:
            'Öppna Enhetsanalys för att jämföra områden mot 95 %-målet och exportera en ledningsrapport. Testa snabbvalen i AI HR-assistenten.',
          tip: 'Använd Återställ demo i sidomenyn för att återställa de 4 ursprungliga larmen inför nästa demo.',
        },
      ],
      resetNote:
        'Interaktiv demomiljö: Ändringar sparas under pågående session och kan återställas omedelbart med Återställ demo.',
    },

    zeroClick: {
      engineTitle: 'Zero-Click-motor för tillståndsförnyelse',
      engineSubtitle:
        'Bokar automatiskt företagshälsokontroll, körprov/färdighetsprov, vikarie i skiftschemat och myndighetsförnyelse vid T-14 dagar utan manuella klick.',
      policyActive: 'Automatisk bokning: Aktiv',
      policyManual: 'Förnyelseläge: Manuell',
      toggleLabel: 'Automatisk bokningspolicy',
      zeroClicksBadge: '0 manuella klick krävs',
      stagedSummary: (count) =>
        `${count} aktiv förnyelsekedja med förbokad hälsokontroll och körprov`,
      noPendingPipelines:
        'Alla kommande tillståndsförnyelser är slutförda via Zero-Click och verifierade mot myndighetsregister.',
      inspectReservations: 'Granska bokningar',
      finalizeAutoRenewal: 'Slutför kontroller & förnya tillstånd',
      finalizing: 'Utfärdar förnyelse...',
      startZeroClick: 'Starta Zero-Click-förnyelse',
      startingZeroClick: 'Bokar tider...',
      manageSlots: 'Granska / Ändra tider',
      modalTitle: 'Zero-Click-kedja för tillståndsförnyelse',
      modalSubtitle:
        'Automatiserad bokningskedja synkroniserad mellan företagshälsa, övningsbana, skiftschema och myndighetsregister.',
      triggeredAt: 'Automatiskt utlöst',
      stepsHeading: 'Automatiska bokningar och myndighetsflöde',
      slotSelectLabel: 'Justera bokad tid (valfritt):',
      rescheduleUpdating: 'Synkar tid...',
      completeAndIssue: 'Simulera godkänd & utfärda tillstånd (2031)',
      completingAndIssuing: 'Skickar myndighetsförnyelse...',
      alreadyCompleted: 'Tillstånd förnyat och giltigt t.o.m. 2031-12-07',
      close: 'Stäng',
      typeLabels: {
        health_check: 'Företagshälsokontroll',
        test_drive: 'Utryckningskörprov',
        skills_test: 'Praktiskt färdighetsprov',
        deputy_cover: 'Ersättare i skift',
        authority_filing: 'Myndighetsanmälan',
      },
      reservationStatuses: {
        Reserved: 'Automatiskt bokad',
        Confirmed: 'Skift bekräftat',
        Queued: 'Köad för sändning',
        Completed: 'Slutförd',
      },
      toastPolicyOn: 'Zero-Click automatisk förnyelse aktiverad för Enhet 4.',
      toastPolicyOff: 'Zero-Click automatisk förnyelse växlad till manuellt godkännande.',
      toastStaged: (permitCode, name) =>
        `Zero-Click-bokningar (hälsokontroll + prov + ersättare) skapade för ${name} (${permitCode})`,
      toastCompleted: (permitCode, name) =>
        `${permitCode} automatiskt förnyat t.o.m. 2031-12-07 för ${name}`,
      toastRescheduled: (slot) => `Bokad tid uppdaterad till ${slot} och skiftschema synkat.`,
    },
  },
};
