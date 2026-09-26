import { mockData } from "../mocks/seedData";
import type { ReportAdjustment } from "../types/ReportAdjustment";

const endpoint = "/api/report-adjustment";

export async function listReportAdjustment(buildingId: number, month: string): Promise<ReportAdjustment[]> {
  if (typeof fetch !== "undefined" && endpoint.startsWith("/api") && true) {
    try {
      const res = await fetch(`${endpoint}?building_id=${buildingId}&month=${month}`);
      if (res.ok) return await res.json();
    } catch {
      // Local mock fallback keeps the UI available during offline review.
    }
  }
  return mockData.reportAdjustment.filter((row) => row.building_id === buildingId && (row.adjust_month === month || row.source_month === month)) as unknown as ReportAdjustment[];
}

export async function createReportAdjustment(payload: Pick<ReportAdjustment, "building_id" | "source_month" | "metric" | "delta" | "reason">): Promise<ReportAdjustment | null> {
  if (typeof fetch !== "undefined" && endpoint.startsWith("/api") && true) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch {
      // Local mock fallback keeps the UI available during offline review.
    }
  }
  console.info("create ReportAdjustment", payload);
  return null;
}
