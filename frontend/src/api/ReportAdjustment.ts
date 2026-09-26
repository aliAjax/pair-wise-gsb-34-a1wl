import { LOG_TEMPLATES } from "../constants/logTemplates";
import type { ReportAdjustment } from "../types/ReportAdjustment";

const endpoint = "/api/report-adjustment";
const STORAGE_KEY = "fire-inspect.report-adjustments";

function readLocal(): ReportAdjustment[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReportAdjustment[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(rows: ReportAdjustment[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export async function listReportAdjustment(): Promise<ReportAdjustment[]> {
  if (typeof fetch !== "undefined" && endpoint.startsWith("/api") && true) {
    try {
      const res = await fetch(endpoint);
      if (res.ok) return await res.json();
    } catch {
      // Local mock fallback keeps the UI available during offline review.
    }
  }
  return readLocal();
}

export async function saveReportAdjustment(payload: ReportAdjustment) {
  console.info(LOG_TEMPLATES.ReportAdjustment[0], payload.id);
  const rows = readLocal().filter((row) => row.id !== payload.id);
  rows.push(payload);
  writeLocal(rows);
  return payload;
}
