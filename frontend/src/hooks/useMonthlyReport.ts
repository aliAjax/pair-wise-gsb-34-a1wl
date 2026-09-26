import { useEffect } from "react";
import { useBuildingStore } from "../stores/BuildingStore";
import { useMonthlyReportStore } from "../stores/MonthlyReportStore";

export function useMonthlyReport() {
  const { report, loading, buildingId, month, select, load, archive, adjust } = useMonthlyReportStore();
  const { rows: buildings, load: loadBuildings } = useBuildingStore();

  useEffect(() => {
    loadBuildings();
  }, [loadBuildings]);

  useEffect(() => {
    load();
  }, [buildingId, month]);

  return { report, loading, buildingId, month, buildings, select, archive, adjust };
}
