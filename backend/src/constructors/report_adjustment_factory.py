def create_report_adjustment_dto(**overrides):
    row = {"id":1,"building_id":1,"source_month":"2026-08","adjust_month":"2026-09","metric":"completion_rate","delta":0.0,"reason":"","actor":"admin","created_at":"2026-09-01T09:00:00Z"}
    row.update(overrides)
    return row
