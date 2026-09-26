import type { ReportMetric } from "../constants/ReportMetric";

export interface ReportAdjustment {
  id: number;
  building_id: number;
  source_month: string;
  adjust_month: string;
  metric: ReportMetric;
  delta: number;
  reason: string;
  actor: string;
  created_at: string;
}
