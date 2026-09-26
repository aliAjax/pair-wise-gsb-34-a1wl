import { create } from "zustand";
import { archiveMonthlyReport, fetchMonthlyReport } from "../api/MonthlyReport";
import { createReportAdjustment } from "../api/ReportAdjustment";
import { LOG_TEMPLATES } from "../constants/logTemplates";
import type { ReportMetric } from "../constants/ReportMetric";
import type { MonthlyReport } from "../types/MonthlyReport";
import { currentMonth } from "../utils/formatters";

type State = {
  report: MonthlyReport | null;
  loading: boolean;
  buildingId: number;
  month: string;
  select: (buildingId: number, month: string) => void;
  load: () => Promise<void>;
  archive: () => Promise<void>;
  adjust: (metric: ReportMetric, delta: number, reason: string) => Promise<void>;
};

export const useMonthlyReportStore = create<State>((set, get) => ({
  report: null,
  loading: false,
  buildingId: 1,
  month: currentMonth(),
  select(buildingId, month) {
    set({ buildingId, month });
  },
  async load() {
    set({ loading: true });
    const report = await fetchMonthlyReport(get().buildingId, get().month);
    console.info(LOG_TEMPLATES.MonthlyReportSnapshot[3], report.status);
    set({ report, loading: false });
  },
  async archive() {
    const { buildingId, month } = get();
    const snapshot = await archiveMonthlyReport(buildingId, month);
    console.info(LOG_TEMPLATES.MonthlyReportSnapshot[0], buildingId, month);
    if (snapshot) set({ report: snapshot });
  },
  async adjust(metric, delta, reason) {
    const { buildingId, month } = get();
    await createReportAdjustment({ building_id: buildingId, source_month: month, metric, delta, reason });
    console.info(LOG_TEMPLATES.ReportAdjustment[0], buildingId, month, metric, delta);
    await get().load();
  }
}));
