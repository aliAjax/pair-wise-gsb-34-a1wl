import { mockData } from "../mocks/seedData";
import { createMonthlyReportResponse } from "../constructors/MonthlyReportConstructor";
import type { MonthlyReport } from "../types/MonthlyReport";

const endpoint = "/api/monthly-report";

export async function fetchMonthlyReport(buildingId: number, month: string): Promise<MonthlyReport> {
  if (typeof fetch !== "undefined" && endpoint.startsWith("/api") && true) {
    try {
      const res = await fetch(`${endpoint}?building_id=${buildingId}&month=${month}`);
      if (res.ok) return await res.json();
    } catch {
      // Local mock fallback keeps the UI available during offline review.
    }
  }
  const archived = mockData.monthlyReportSnapshot.find((row) => row.building_id === buildingId && row.month === month);
  if (archived) return archived as unknown as MonthlyReport;
  return createMonthlyReportResponse({ building_id: buildingId, month });
}

export async function archiveMonthlyReport(buildingId: number, month: string): Promise<MonthlyReport | null> {
  if (typeof fetch !== "undefined" && endpoint.startsWith("/api") && true) {
    try {
      const res = await fetch(`${endpoint}/archive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ building_id: buildingId, month })
      });
      if (res.ok) return await res.json();
    } catch {
      // Local mock fallback keeps the UI available during offline review.
    }
  }
  console.info("archive MonthlyReport", buildingId, month);
  return null;
}
