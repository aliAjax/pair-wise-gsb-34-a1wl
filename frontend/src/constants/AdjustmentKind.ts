export const AdjustmentKind = ["TASK_REVIEWED_LATE","HAZARD_CLOSED_LATE","DEVICE_OVERDUE_LATE"] as const;
export type AdjustmentKind = (typeof AdjustmentKind)[number];
export const AdjustmentKindText: Record<AdjustmentKind, string> = {
  TASK_REVIEWED_LATE: "补录已复核任务",
  HAZARD_CLOSED_LATE: "补录按时关闭隐患",
  DEVICE_OVERDUE_LATE: "补录逾期维保设备"
};
