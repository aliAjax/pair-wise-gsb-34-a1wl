import type { ReportAdjustment } from "../types/ReportAdjustment";

export const createDefaultReportAdjustment = (overrides: Partial<ReportAdjustment> = {}): ReportAdjustment => ({
  id: 1,
  building_id: 1,
  source_month: "2026-08",
  adjust_month: "2026-09",
  metric: "completion_rate",
  delta: 0,
  reason: "",
  actor: "admin",
  created_at: "2026-09-01T09:00:00Z",
  ...overrides
});

export const createReportAdjustmentForm = createDefaultReportAdjustment;
export const createReportAdjustmentResponse = createDefaultReportAdjustment;
