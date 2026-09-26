import type { MonthlyReport, MonthlyReportMetrics } from "../types/MonthlyReport";

export const createDefaultMonthlyReportMetrics = (overrides: Partial<MonthlyReportMetrics> = {}): MonthlyReportMetrics => ({
  tasks_total: 0,
  tasks_reviewed: 0,
  completion_rate: 0,
  hazards_due: 0,
  hazards_closed_on_time: 0,
  on_time_rectify_rate: 0,
  devices_overdue: 0,
  ...overrides
});

export const createDefaultMonthlyReport = (overrides: Partial<MonthlyReport> = {}): MonthlyReport => ({
  building_id: 1,
  month: "2026-09",
  status: "LIVE",
  metrics: createDefaultMonthlyReportMetrics(),
  adjusted_metrics: createDefaultMonthlyReportMetrics(),
  details: { tasks: [], hazards: [], devices: [] },
  adjustments: [],
  archived_at: "",
  archived_by: "",
  generated_at: "",
  ...overrides
});

export const createMonthlyReportForm = createDefaultMonthlyReport;
export const createMonthlyReportResponse = createDefaultMonthlyReport;
