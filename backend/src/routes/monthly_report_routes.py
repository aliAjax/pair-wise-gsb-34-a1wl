from fastapi import APIRouter
from src.controllers.monthly_report_controller import get_monthly_report, archive_monthly_report
router = APIRouter(prefix="/api/monthly-report", tags=["MonthlyReport"])
router.get("")(get_monthly_report)
router.post("/archive")(archive_monthly_report)
