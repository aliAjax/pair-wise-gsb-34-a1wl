import { LOG_TEMPLATES } from "../constants/logTemplates";
import type { MonthlyReportSnapshot } from "../types/MonthlyReport";

const endpoint = "/api/monthly-report";
const STORAGE_KEY = "fire-inspect.monthly-report.snapshots";

function readLocal(): MonthlyReportSnapshot[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MonthlyReportSnapshot[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(rows: MonthlyReportSnapshot[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export async function listMonthlyReportSnapshot(): Promise<MonthlyReportSnapshot[]> {
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

export async function saveMonthlyReportSnapshot(payload: MonthlyReportSnapshot) {
  console.info(LOG_TEMPLATES.MonthlyReport[1], payload.id);
  const rows = readLocal().filter((row) => row.id !== payload.id);
  rows.push(payload);
  writeLocal(rows);
  return payload;
}
