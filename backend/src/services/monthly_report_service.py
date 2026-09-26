from datetime import datetime, timezone
from src.constants.error_codes import ERROR_CODES
from src.constants.error_messages import ERROR_MESSAGES
from src.constants.log_templates import LOG_TEMPLATES
from src.constructors.monthly_report_factory import create_monthly_report_snapshot_dto, create_monthly_report_view_dto
from src.repositories.monthly_report_repository import MonthlyReportRepository
from src.repositories.report_adjustment_repository import ReportAdjustmentRepository
from src.services.report_statistics_service import ReportStatisticsService
from src.utils.formatters import audit_target, is_valid_month

class ReportError(Exception):
    def __init__(self, code):
        self.code = ERROR_CODES.get(code, code)
        super().__init__(ERROR_MESSAGES.get(code, "report error"))

class MonthlyReportService:
    """归档保存：已归档月份返回冻结快照，未归档月份按最新记录实时重算。"""
    def __init__(self):
        self.snapshots = MonthlyReportRepository()
        self.adjustments = ReportAdjustmentRepository()
        self.statistics = ReportStatisticsService()

    def get_report(self, building_id, month):
        self._ensure_month(month)
        snapshot = self.snapshots.find_by_building_month(building_id, month)
        if snapshot is not None:
            print(LOG_TEMPLATES["MonthlyReportSnapshot"][3], audit_target("MonthlyReportSnapshot", snapshot["id"]))
            return snapshot
        print(LOG_TEMPLATES["MonthlyReportSnapshot"][1], audit_target("Building", building_id), month)
        return self._live_report(building_id, month)

    def archive(self, building_id, month, actor="admin"):
        self._ensure_month(month)
        if self.snapshots.find_by_building_month(building_id, month) is not None:
            raise ReportError("REPORT_ALREADY_ARCHIVED")
        live = self._live_report(building_id, month)
        now = datetime.now(timezone.utc).isoformat()
        snapshot = create_monthly_report_snapshot_dto(
            id=0,
            building_id=int(building_id),
            month=month,
            status="ARCHIVED",
            metrics=live["metrics"],
            adjusted_metrics=live["adjusted_metrics"],
            details=live["details"],
            adjustments=live["adjustments"],
            archived_at=now,
            archived_by=actor,
            generated_at=now
        )
        saved = self.snapshots.insert(snapshot)
        print(LOG_TEMPLATES["MonthlyReportSnapshot"][0], audit_target("MonthlyReportSnapshot", saved["id"]))
        return saved

    def _live_report(self, building_id, month):
        metrics, details = self.statistics.compute(building_id, month)
        adjustments = self.adjustments.find_by_adjust_month(building_id, month)
        return create_monthly_report_view_dto(
            building_id=int(building_id),
            month=month,
            status="LIVE",
            metrics=metrics,
            adjusted_metrics=self.statistics.apply_adjustments(metrics, adjustments),
            details=details,
            adjustments=adjustments,
            generated_at=datetime.now(timezone.utc).isoformat()
        )

    def _ensure_month(self, month):
        if not is_valid_month(month):
            raise ReportError("REPORT_MONTH_INVALID")
