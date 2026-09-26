import type { ReportAdjustment } from "../types/ReportAdjustment";

export const createDefaultReportAdjustment = (overrides: Partial<ReportAdjustment> = {}): ReportAdjustment => ({
  id: 1,
  building_id: 1,
  source_month: "2026-08",
  target_month: "2026-09",
  kind: "TASK_REVIEWED_LATE",
  ref_id: 0,
  delta: 1,
  reason: "",
  created_at: "",
  ...overrides
});

export const createReportAdjustmentForm = createDefaultReportAdjustment;
export const createReportAdjustmentResponse = createDefaultReportAdjustment;
