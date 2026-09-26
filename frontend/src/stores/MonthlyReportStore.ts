import { create } from "zustand";
import { listMonthlyReportSnapshot, saveMonthlyReportSnapshot } from "../api/MonthlyReport";
import { listReportAdjustment, saveReportAdjustment } from "../api/ReportAdjustment";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { LOG_TEMPLATES } from "../constants/logTemplates";
import { createMonthlyReportResponse } from "../constructors/MonthlyReportConstructor";
import { createReportAdjustmentResponse } from "../constructors/ReportAdjustmentConstructor";
import type { MonthlyReportSnapshot } from "../types/MonthlyReport";
import type { ReportAdjustment } from "../types/ReportAdjustment";
import { computeMonthlyReport, monthEnded, nextMonth } from "../utils/monthlyReportStats";
import type { MonthlyReportInput } from "../utils/monthlyReportStats";

export interface ReportAdjustmentDraft {
  building_id: number;
  source_month: string;
  kind: string;
  ref_id: number;
  reason: string;
}

type State = {
  snapshots: MonthlyReportSnapshot[];
  adjustments: ReportAdjustment[];
  loading: boolean;
  error: string;
  load: () => Promise<void>;
  clearError: () => void;
  archive: (input: MonthlyReportInput, archivedBy: string) => Promise<MonthlyReportSnapshot | null>;
  registerAdjustment: (draft: ReportAdjustmentDraft) => Promise<ReportAdjustment | null>;
};

export const useMonthlyReportStore = create<State>((set, get) => ({
  snapshots: [],
  adjustments: [],
  loading: false,
  error: "",
  async load() {
    set({ loading: true });
    const [snapshots, adjustments] = await Promise.all([listMonthlyReportSnapshot(), listReportAdjustment()]);
    set({ snapshots, adjustments, loading: false });
  },
  clearError() {
    set({ error: "" });
  },
  async archive(input, archivedBy) {
    const id = `${input.buildingId}:${input.month}`;
    if (get().snapshots.some((snapshot) => snapshot.id === id)) {
      set({ error: ERROR_MESSAGES.REPORT_ALREADY_ARCHIVED });
      return null;
    }
    if (!monthEnded(input.month, input.now)) {
      set({ error: ERROR_MESSAGES.REPORT_MONTH_NOT_ENDED });
      return null;
    }
    const { metrics, details, appliedAdjustments } = computeMonthlyReport(input);
    console.info(LOG_TEMPLATES.MonthlyReport[0], id);
    const snapshot = createMonthlyReportResponse({
      id,
      building_id: input.buildingId,
      month: input.month,
      status: "ARCHIVED",
      metrics,
      details,
      adjustment_ids: appliedAdjustments.map((adjustment) => adjustment.id),
      archived_at: new Date().toISOString(),
      archived_by: archivedBy
    });
    await saveMonthlyReportSnapshot(snapshot);
    set({ snapshots: [...get().snapshots, snapshot], error: "" });
    return snapshot;
  },
  async registerAdjustment(draft) {
    const sourceId = `${draft.building_id}:${draft.source_month}`;
    if (!get().snapshots.some((snapshot) => snapshot.id === sourceId)) {
      set({ error: ERROR_MESSAGES.ADJUSTMENT_REQUIRES_ARCHIVE });
      return null;
    }
    const nextId = get().adjustments.reduce((max, adjustment) => Math.max(max, adjustment.id), 0) + 1;
    const adjustment = createReportAdjustmentResponse({
      ...draft,
      id: nextId,
      target_month: nextMonth(draft.source_month),
      delta: 1,
      created_at: new Date().toISOString()
    });
    await saveReportAdjustment(adjustment);
    set({ adjustments: [...get().adjustments, adjustment], error: "" });
    return adjustment;
  }
}));
