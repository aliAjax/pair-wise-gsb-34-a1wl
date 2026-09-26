import type { SnapshotStatus } from "../constants/SnapshotStatus";
import type { FireDevice } from "./FireDevice";
import type { HazardTicket } from "./HazardTicket";
import type { InspectionTask } from "./InspectionTask";
import type { ReportAdjustment } from "./ReportAdjustment";

export interface MonthlyReportMetrics {
  tasks_total: number;
  tasks_reviewed: number;
  completion_rate: number;
  hazards_due: number;
  hazards_closed_on_time: number;
  on_time_rectify_rate: number;
  devices_overdue: number;
}

export interface MonthlyReportDetails {
  tasks: InspectionTask[];
  hazards: HazardTicket[];
  devices: FireDevice[];
}

export interface MonthlyReport {
  id?: number;
  building_id: number;
  month: string;
  status: SnapshotStatus;
  metrics: MonthlyReportMetrics;
  adjusted_metrics: MonthlyReportMetrics;
  details: MonthlyReportDetails;
  adjustments: ReportAdjustment[];
  archived_at: string;
  archived_by: string;
  generated_at: string;
}
