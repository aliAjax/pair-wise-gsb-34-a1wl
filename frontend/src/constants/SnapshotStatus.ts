export const SnapshotStatus = ["LIVE","ARCHIVED"] as const;
export type SnapshotStatus = (typeof SnapshotStatus)[number];
export const SnapshotStatusText: Record<SnapshotStatus, string> = { LIVE: "未归档", ARCHIVED: "已归档" };
