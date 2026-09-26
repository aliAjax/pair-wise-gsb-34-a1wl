from fastapi import APIRouter
from src.controllers.report_adjustment_controller import list_report_adjustment, create_report_adjustment
router = APIRouter(prefix="/api/report-adjustment", tags=["ReportAdjustment"])
router.get("")(list_report_adjustment)
router.post("")(create_report_adjustment)
