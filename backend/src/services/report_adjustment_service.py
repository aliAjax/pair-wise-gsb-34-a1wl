from datetime import datetime, timezone
from src.constants.log_templates import LOG_TEMPLATES
from src.constants.report_metric import ReportMetric
from src.constructors.report_adjustment_factory import create_report_adjustment_dto
from src.repositories.monthly_report_repository import MonthlyReportRepository
from src.repositories.report_adjustment_repository import ReportAdjustmentRepository
from src.services.monthly_report_service import ReportError
from src.utils.formatters import audit_target, is_valid_month, next_month

class ReportAdjustmentService:
    """归档后的更正：只对已归档月份登记调整单，调整额并入次月报表，旧月快照保持原样。"""
    def __init__(self):
        self.snapshots = MonthlyReportRepository()
        self.adjustments = ReportAdjustmentRepository()

    def list(self, building_id, month):
        return self.adjustments.find_by_adjust_month(building_id, month) + self.adjustments.find_by_source_month(building_id, month)

    def create(self, building_id, source_month, metric, delta, reason, actor="admin"):
        if not is_valid_month(source_month):
            raise ReportError("REPORT_MONTH_INVALID")
        if self.snapshots.find_by_building_month(building_id, source_month) is None:
            raise ReportError("REPORT_NOT_ARCHIVED")
        if metric not in ReportMetric:
            raise ReportError("VALIDATION_FAILED")
        adjustment = create_report_adjustment_dto(
            id=0,
            building_id=int(building_id),
            source_month=source_month,
            adjust_month=next_month(source_month),
            metric=metric,
            delta=float(delta),
            reason=reason,
            actor=actor,
            created_at=datetime.now(timezone.utc).isoformat()
        )
        saved = self.adjustments.insert(adjustment)
        print(LOG_TEMPLATES["ReportAdjustment"][0], audit_target("ReportAdjustment", saved["id"]))
        print(LOG_TEMPLATES["ReportAdjustment"][1], audit_target("Building", building_id), saved["adjust_month"])
        return saved
