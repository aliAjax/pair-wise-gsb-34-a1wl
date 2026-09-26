import type { FireDevice } from "./FireDevice";
import type { HazardTicket } from "./HazardTicket";
import type { InspectionTask } from "./InspectionTask";

export interface MonthlyReportMetrics {
  planned_tasks: number;
  reviewed_tasks: number;
  completion_rate: number | null;
  due_hazards: number;
  ontime_closed_hazards: number;
  rectify_ontime_rate: number | null;
  overdue_devices: number;
}

export interface MonthlyReportDetails {
  tasks: InspectionTask[];
  hazards: HazardTicket[];
  devices: FireDevice[];
}

export interface MonthlyReportSnapshot {
  id: string;
  building_id: number;
  month: string;
  status: string;
  metrics: MonthlyReportMetrics;
  details: MonthlyReportDetails;
  adjustment_ids: number[];
  archived_at: string;
  archived_by: string;
}
