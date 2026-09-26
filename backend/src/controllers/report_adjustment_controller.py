from fastapi import HTTPException
from src.middlewares.error_handler_middleware import to_error_payload
from src.services.report_adjustment_service import ReportAdjustmentService
from src.services.monthly_report_service import ReportError
service = ReportAdjustmentService()
def list_report_adjustment(building_id: int, month: str):
    try:
        return service.list(building_id, month)
    except ReportError as exc:
        raise HTTPException(status_code=400, detail=to_error_payload(exc))
def create_report_adjustment(payload: dict):
    try:
        return service.create(payload.get("building_id"), payload.get("source_month"), payload.get("metric"), payload.get("delta", 0), payload.get("reason", ""), payload.get("actor", "admin"))
    except ReportError as exc:
        raise HTTPException(status_code=409, detail=to_error_payload(exc))
