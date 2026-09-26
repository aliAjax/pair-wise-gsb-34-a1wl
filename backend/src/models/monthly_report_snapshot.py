from pydantic import BaseModel
class MonthlyReportSnapshot(BaseModel):
    id: int | float
    building_id: int | float
    month: str
    status: str
    metrics: dict
    adjusted_metrics: dict
    details: dict
    adjustments: list
    archived_at: str
    archived_by: str
    generated_at: str
