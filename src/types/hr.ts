export type EmploymentType = 'Permanent' | 'Fixed-Term';

export type ContractStatus =
  | 'Permanent Civil Servant (Virkasuhde)'
  | 'Permanent Employment (Työsuhde)'
  | 'Fixed-Term Civil Servant (Määräaikainen virkasuhde)'
  | 'Fixed-Term Employment (Määräaikainen työsuhde)';

export type ComplianceStatus = 'Valid' | 'Expiring Soon' | 'Overdue' | 'Missing';

export type QualificationCategory =
  | 'Safety Permits'
  | 'Information Security'
  | 'Role Certifications'
  | 'Leadership Training';

export type RenewalReservationType =
  | 'health_check'
  | 'test_drive'
  | 'skills_test'
  | 'deputy_cover'
  | 'authority_filing';

export type ReservationStatus = 'Reserved' | 'Confirmed' | 'Queued' | 'Completed';

export interface RenewalReservation {
  id: string;
  type: RenewalReservationType;
  title: string;
  provider: string;
  location: string;
  scheduledAt: string;
  bookingRef: string;
  status: ReservationStatus;
  availableSlots?: string[];
}

export interface PermitAutoRenewal {
  enabled: boolean;
  zeroClickTriggeredAt: string;
  stage: 'reservations_confirmed' | 'supervisor_acknowledged' | 'completed';
  manualClicksRequired: number;
  summary: string;
  reservations: RenewalReservation[];
}

export interface Permit {
  id: string;
  name: string;
  code: string;
  category: QualificationCategory;
  issuedAt: string;
  expiresAt: string | null;
  status: ComplianceStatus;
  issuer: string;
  notes?: string;
  autoRenewal?: PermitAutoRenewal;
}

export interface TrainingRecord {
  id: string;
  title: string;
  category: QualificationCategory;
  completedAt?: string;
  dueDate?: string;
  status: 'Completed' | 'Scheduled' | 'Overdue' | 'Assigned';
  hours: number;
  mandatory: boolean;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  channel?: string;
  detail: string;
}

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  role: string;
  unit: string;
  costCenter: string;
  supervisor: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  initials: string;
  employmentType: EmploymentType;
  contractStatus: ContractStatus;
  contractStartDate: string;
  contractEndDate?: string;
  deputyName: string;
  missionSummary: string;
  activeAssignments: string[];
  overallStatus: 'Compliant' | 'Action Required';
  trainingCompletionPct: number;
  permits: Permit[];
  trainings: TrainingRecord[];
  auditLog: AuditEntry[];
}

export type AlarmCategory =
  | 'Expiring License'
  | 'Missing Training'
  | 'Contract Ending'
  | 'Missing Data';

export type AlarmActionType =
  | 'send_reminder'
  | 'schedule_renewal'
  | 'review_contract'
  | 'request_document';

export interface AlarmTrigger {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  category: AlarmCategory;
  severity: 'urgent' | 'warning';
  daysRemaining?: number;
  title: string;
  description: string;
  recommendedActionLabel: string;
  secondaryActionLabel?: string;
  actionType: AlarmActionType;
  resolved: boolean;
  resolvedAt?: string;
  resolutionNote?: string;
}

export interface UnitOverviewStats {
  totalPersonnel: number;
  permanentCount: number;
  fixedTermCount: number;
  complianceRatePct: number;
  urgentActionsCount: number;
  rosterSampleCount: number;
}

export interface CategoryCoverage {
  category: QualificationCategory;
  compliantCount: number;
  totalCount: number;
  percentage: number;
}

export interface MonthlyContractOutlook {
  month: string;
  permanentStable: number;
  fixedTermExpiring: number;
  renewalsPending: number;
}

export interface DashboardPayload {
  unitName: string;
  organizationName: string;
  zeroClickPolicyEnabled: boolean;
  supervisor: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  overview: UnitOverviewStats;
  alarms: AlarmTrigger[];
  employees: Employee[];
  categoryCoverage: CategoryCoverage[];
  contractOutlook: MonthlyContractOutlook[];
}

export interface ExecutiveReportPayload {
  generatedAt: string;
  generatedBy: string;
  unitName: string;
  organizationName: string;
  readinessScorePct: number;
  totalPersonnel: number;
  permanentCount: number;
  fixedTermCount: number;
  openUrgentItems: number;
  resolvedThisSession: number;
  categoryCoverage: CategoryCoverage[];
  keyFindings: string[];
  recommendedDecisions: string[];
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
