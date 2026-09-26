import { AdjustmentKind } from "../constants/AdjustmentKind";
import type { FireDevice } from "../types/FireDevice";
import type { HazardTicket } from "../types/HazardTicket";
import type { InspectionResult } from "../types/InspectionResult";
import type { InspectionTask } from "../types/InspectionTask";
import type { MonthlyReportDetails, MonthlyReportMetrics } from "../types/MonthlyReport";
import type { ReportAdjustment } from "../types/ReportAdjustment";

export interface MonthlyReportInput {
  buildingId: number;
  month: string;
  tasks: InspectionTask[];
  results: InspectionResult[];
  hazards: HazardTicket[];
  devices: FireDevice[];
  adjustments: ReportAdjustment[];
  now?: Date;
}

export interface MonthlyReportComputation {
  metrics: MonthlyReportMetrics;
  details: MonthlyReportDetails;
  appliedAdjustments: ReportAdjustment[];
}

const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const isMonthKey = (value: string) => MONTH_PATTERN.test(value);

export function currentMonth(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function monthEndOf(month: string): Date {
  const [year, mon] = month.split("-").map(Number);
  return new Date(Date.UTC(year, mon, 0, 23, 59, 59, 999));
}

export function nextMonth(month: string): string {
  const [year, mon] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, mon, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthEnded(month: string, now = new Date()): boolean {
  return monthEndOf(month).getTime() < now.getTime();
}

const toDate = (value: string): Date | null => {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : new Date(time);
};

export function dateInMonth(value: string, month: string): boolean {
  const date = toDate(value);
  if (!date || !isMonthKey(month)) return false;
  const [year, mon] = month.split("-").map(Number);
  return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === mon;
}

const closedOnTime = (ticket: HazardTicket): boolean => {
  const closed = toDate(ticket.closed_at);
  const deadline = toDate(ticket.deadline);
  return closed !== null && deadline !== null && closed.getTime() <= deadline.getTime();
};

const rateOf = (num: number, den: number): number | null =>
  den === 0 ? null : Math.round((num / den) * 1000) / 10;

// 统计口径：
// - 完成率：按 plan_date 归属自然月，已复核(status=REVIEWED)任务 / 当月计划任务。
// - 整改及时率：隐患按 deadline 归属自然月，closed_at <= deadline 记为按时关闭。
// - 逾期维保数：截至统计日(月末或今天，取较早者) next_maintenance_at 已过期的设备。
// - 调整单：已归档月份的更正按 target_month 并入对应月份重算，旧月快照不改。
export function computeMonthlyReport(input: MonthlyReportInput): MonthlyReportComputation {
  const { buildingId, month, tasks, results, hazards, devices, adjustments } = input;
  const now = input.now ?? new Date();

  const monthTasks = tasks.filter(
    (task) => task.building_id === buildingId && dateInMonth(task.plan_date, month)
  );
  const reviewedTasks = monthTasks.filter((task) => task.status === "REVIEWED");

  const taskById = new Map(tasks.map((task) => [task.id, task]));
  const resultById = new Map(results.map((result) => [result.id, result]));
  const buildingOfHazard = (ticket: HazardTicket): number | null => {
    const result = resultById.get(ticket.result_id);
    const task = result ? taskById.get(result.task_id) : undefined;
    return task ? task.building_id : null;
  };
  const monthHazards = hazards.filter(
    (ticket) => buildingOfHazard(ticket) === buildingId && dateInMonth(ticket.deadline, month)
  );
  const ontimeHazards = monthHazards.filter(closedOnTime);

  const monthEnd = monthEndOf(month);
  const asOf = monthEnd.getTime() < now.getTime() ? monthEnd : now;
  const overdueDevices = devices.filter((device) => {
    if (device.building_id !== buildingId) return false;
    const due = toDate(device.next_maintenance_at);
    return due !== null && due.getTime() <= asOf.getTime();
  });

  const appliedAdjustments = adjustments.filter(
    (adjustment) => adjustment.building_id === buildingId && adjustment.target_month === month
  );

  let planned = monthTasks.length;
  let reviewed = reviewedTasks.length;
  let due = monthHazards.length;
  let ontime = ontimeHazards.length;
  let overdue = overdueDevices.length;
  for (const adjustment of appliedAdjustments) {
    if (adjustment.kind === AdjustmentKind[0]) {
      planned += adjustment.delta;
      reviewed += adjustment.delta;
    } else if (adjustment.kind === AdjustmentKind[1]) {
      due += adjustment.delta;
      ontime += adjustment.delta;
    } else if (adjustment.kind === AdjustmentKind[2]) {
      overdue += adjustment.delta;
    }
  }

  return {
    metrics: {
      planned_tasks: planned,
      reviewed_tasks: reviewed,
      completion_rate: rateOf(reviewed, planned),
      due_hazards: due,
      ontime_closed_hazards: ontime,
      rectify_ontime_rate: rateOf(ontime, due),
      overdue_devices: overdue
    },
    details: {
      tasks: monthTasks,
      hazards: monthHazards,
      devices: overdueDevices
    },
    appliedAdjustments
  };
}
