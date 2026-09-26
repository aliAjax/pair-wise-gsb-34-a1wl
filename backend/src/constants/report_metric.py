# 月度合规报表统计口径：指标键、参与统计的状态集合与口径说明集中在这里，
# service / controller / 前端页面共同引用，调整口径时同步修改。
ReportMetric = ["completion_rate", "on_time_rectify_rate", "devices_overdue"]

# 完成率 = 当月已复核任务 / 当月计划任务
REVIEWED_TASK_STATUSES = ["REVIEWED"]

# 整改及时率 = 当月按时关闭隐患 / 当月到期隐患（closed_at <= deadline 视为按时）
CLOSED_RECTIFY_STATUSES = ["CLOSED"]

# 逾期维保数 = 维保到期日不超过月末且尚未复核完成的设备数
INSPECTED_DEVICE_STATUSES = ["REVIEWED"]

REPORT_CALIBER = {
  "completion_rate": "当月已复核任务 / 当月计划任务",
  "on_time_rectify_rate": "当月按时关闭隐患 / 当月到期隐患",
  "devices_overdue": "维保到期日不超过月末且未完成复核的设备数"
}
