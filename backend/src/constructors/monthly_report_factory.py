def create_monthly_report_metrics_dto(**overrides):
    row = {"tasks_total":0,"tasks_reviewed":0,"completion_rate":0.0,"hazards_due":0,"hazards_closed_on_time":0,"on_time_rectify_rate":0.0,"devices_overdue":0}
    row.update(overrides)
    return row

def create_monthly_report_snapshot_dto(**overrides):
    row = {"id":1,"building_id":1,"month":"2026-08","status":"ARCHIVED","metrics":create_monthly_report_metrics_dto(),"adjusted_metrics":create_monthly_report_metrics_dto(),"details":{"tasks":[],"hazards":[],"devices":[]},"adjustments":[],"archived_at":"2026-08-31T16:00:00Z","archived_by":"admin","generated_at":"2026-08-31T16:00:00Z"}
    row.update(overrides)
    return row

def create_monthly_report_view_dto(**overrides):
    row = {"building_id":1,"month":"2026-09","status":"LIVE","metrics":create_monthly_report_metrics_dto(),"adjusted_metrics":create_monthly_report_metrics_dto(),"details":{"tasks":[],"hazards":[],"devices":[]},"adjustments":[],"archived_at":"","archived_by":"","generated_at":""}
    row.update(overrides)
    return row
