from fastapi import HTTPException
from src.middlewares.error_handler_middleware import to_error_payload
from src.services.monthly_report_service import MonthlyReportService, ReportError
service = MonthlyReportService()
def get_monthly_report(building_id: int, month: str):
    try:
        return service.get_report(building_id, month)
    except ReportError as exc:
        raise HTTPException(status_code=400, detail=to_error_payload(exc))
def archive_monthly_report(payload: dict):
    try:
        return service.archive(payload.get("building_id"), payload.get("month"), payload.get("actor", "admin"))
    except ReportError as exc:
        raise HTTPException(status_code=409, detail=to_error_payload(exc))
