export const ReportArchiveStatus = ["UNARCHIVED","ARCHIVED"] as const;
export type ReportArchiveStatus = (typeof ReportArchiveStatus)[number];
export const ReportArchiveStatusText: Record<ReportArchiveStatus, string> = {
  UNARCHIVED: "未归档 · 实时重算",
  ARCHIVED: "已归档 · 已冻结"
};
