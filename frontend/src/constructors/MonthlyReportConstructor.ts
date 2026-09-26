import type { MonthlyReportSnapshot } from "../types/MonthlyReport";

export const createDefaultMonthlyReportSnapshot = (overrides: Partial<MonthlyReportSnapshot> = {}): MonthlyReportSnapshot => ({
  id: "1:2026-09",
  building_id: 1,
  month: "2026-09",
  status: "UNARCHIVED",
  metrics: {
    planned_tasks: 0,
    reviewed_tasks: 0,
    completion_rate: null,
    due_hazards: 0,
    ontime_closed_hazards: 0,
    rectify_ontime_rate: null,
    overdue_devices: 0
  },
  details: { tasks: [], hazards: [], devices: [] },
  adjustment_ids: [],
  archived_at: "",
  archived_by: "",
  ...overrides
});

export const createMonthlyReportForm = createDefaultMonthlyReportSnapshot;
export const createMonthlyReportResponse = createDefaultMonthlyReportSnapshot;
