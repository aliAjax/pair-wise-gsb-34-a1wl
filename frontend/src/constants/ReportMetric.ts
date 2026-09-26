export const ReportMetric = ["completion_rate","on_time_rectify_rate","devices_overdue"] as const;
export type ReportMetric = (typeof ReportMetric)[number];
export const ReportMetricText: Record<ReportMetric, string> = {
  completion_rate: "完成率",
  on_time_rectify_rate: "整改及时率",
  devices_overdue: "逾期维保数"
};
export const REPORT_CALIBER: Record<ReportMetric, string> = {
  completion_rate: "当月已复核任务 ÷ 当月计划任务",
  on_time_rectify_rate: "当月按时关闭隐患 ÷ 当月到期隐患",
  devices_overdue: "维保到期日不超过月末且未完成复核的设备数"
};
