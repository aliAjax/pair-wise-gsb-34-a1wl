from pydantic import BaseModel
class ReportAdjustment(BaseModel):
    id: int | float
    building_id: int | float
    source_month: str
    adjust_month: str
    metric: str
    delta: int | float
    reason: str
    actor: str
    created_at: str
