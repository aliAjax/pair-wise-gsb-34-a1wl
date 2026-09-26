import { useEffect, useMemo, useState } from "react";
import { useBuildingStore } from "../stores/BuildingStore";
import { useFireDeviceStore } from "../stores/FireDeviceStore";
import { useHazardTicketStore } from "../stores/HazardTicketStore";
import { useInspectionResultStore } from "../stores/InspectionResultStore";
import { useInspectionTaskStore } from "../stores/InspectionTaskStore";
import { useMonthlyReportStore } from "../stores/MonthlyReportStore";
import type { ReportAdjustmentDraft } from "../stores/MonthlyReportStore";
import { computeMonthlyReport, currentMonth, monthEnded } from "../utils/monthlyReportStats";

const ARCHIVED_BY = "消防主管";

export function useMonthlyReport() {
  const buildings = useBuildingStore((state) => state.rows);
  const loadBuildings = useBuildingStore((state) => state.load);
  const tasks = useInspectionTaskStore((state) => state.rows);
  const loadTasks = useInspectionTaskStore((state) => state.load);
  const results = useInspectionResultStore((state) => state.rows);
  const loadResults = useInspectionResultStore((state) => state.load);
  const hazards = useHazardTicketStore((state) => state.rows);
  const loadHazards = useHazardTicketStore((state) => state.load);
  const devices = useFireDeviceStore((state) => state.rows);
  const loadDevices = useFireDeviceStore((state) => state.load);
  const snapshots = useMonthlyReportStore((state) => state.snapshots);
  const adjustments = useMonthlyReportStore((state) => state.adjustments);
  const loading = useMonthlyReportStore((state) => state.loading);
  const error = useMonthlyReportStore((state) => state.error);
  const loadReports = useMonthlyReportStore((state) => state.load);
  const clearError = useMonthlyReportStore((state) => state.clearError);
  const archiveReport = useMonthlyReportStore((state) => state.archive);
  const registerAdjustment = useMonthlyReportStore((state) => state.registerAdjustment);

  const [buildingId, setBuildingId] = useState(0);
  const [month, setMonth] = useState(() => currentMonth());

  useEffect(() => {
    loadBuildings();
    loadTasks();
    loadResults();
    loadHazards();
    loadDevices();
    loadReports();
  }, [loadBuildings, loadTasks, loadResults, loadHazards, loadDevices, loadReports]);

  const effectiveBuildingId = buildingId || buildings[0]?.id || 0;

  const snapshot = useMemo(
    () => snapshots.find((row) => row.building_id === effectiveBuildingId && row.month === month),
    [snapshots, effectiveBuildingId, month]
  );

  const computed = useMemo(
    () =>
      computeMonthlyReport({
        buildingId: effectiveBuildingId,
        month,
        tasks,
        results,
        hazards,
        devices,
        adjustments
      }),
    [effectiveBuildingId, month, tasks, results, hazards, devices, adjustments]
  );

  const frozen = Boolean(snapshot);
  const metrics = snapshot ? snapshot.metrics : computed.metrics;
  const details = snapshot ? snapshot.details : computed.details;
  const appliedAdjustments = useMemo(() => {
    if (!snapshot) return computed.appliedAdjustments;
    return adjustments.filter((adjustment) => snapshot.adjustment_ids.includes(adjustment.id));
  }, [snapshot, computed, adjustments]);
  const outgoingAdjustments = useMemo(
    () =>
      adjustments.filter(
        (adjustment) => adjustment.building_id === effectiveBuildingId && adjustment.source_month === month
      ),
    [adjustments, effectiveBuildingId, month]
  );

  const selectBuilding = (id: number) => {
    clearError();
    setBuildingId(id);
  };
  const selectMonth = (value: string) => {
    clearError();
    setMonth(value);
  };

  const archive = () =>
    archiveReport(
      { buildingId: effectiveBuildingId, month, tasks, results, hazards, devices, adjustments },
      ARCHIVED_BY
    );

  const adjust = (draft: Omit<ReportAdjustmentDraft, "building_id" | "source_month">) =>
    registerAdjustment({ ...draft, building_id: effectiveBuildingId, source_month: month });

  return {
    buildings,
    buildingId: effectiveBuildingId,
    selectBuilding,
    month,
    selectMonth,
    loading,
    error,
    frozen,
    snapshot,
    metrics,
    details,
    appliedAdjustments,
    outgoingAdjustments,
    canArchive: !frozen && monthEnded(month),
    archive,
    adjust
  };
}
