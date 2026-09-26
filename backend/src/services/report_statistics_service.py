from src.constants.report_metric import REVIEWED_TASK_STATUSES, CLOSED_RECTIFY_STATUSES, INSPECTED_DEVICE_STATUSES
from src.constructors.monthly_report_factory import create_monthly_report_metrics_dto
from src.repositories.fire_device_repository import FireDeviceRepository
from src.repositories.hazard_ticket_repository import HazardTicketRepository
from src.repositories.inspection_result_repository import InspectionResultRepository
from src.repositories.inspection_task_repository import InspectionTaskRepository
from src.utils.formatters import in_month, month_end, parse_date

class ReportStatisticsService:
    """统计口径：只负责按楼栋+月份从最新业务记录计算指标和明细，不读写归档快照。"""
    def __init__(self):
        self.tasks = InspectionTaskRepository()
        self.results = InspectionResultRepository()
        self.hazards = HazardTicketRepository()
        self.devices = FireDeviceRepository()

    def compute(self, building_id, month):
        task_rows = self._month_tasks(building_id, month)
        hazard_rows = self._month_hazards(building_id, month)
        device_rows = self._overdue_devices(building_id, month)
        reviewed = [row for row in task_rows if row["status"] in REVIEWED_TASK_STATUSES]
        on_time = [row for row in hazard_rows if self._closed_on_time(row)]
        metrics = create_monthly_report_metrics_dto(
            tasks_total=len(task_rows),
            tasks_reviewed=len(reviewed),
            completion_rate=(len(reviewed) / len(task_rows)) if task_rows else 0.0,
            hazards_due=len(hazard_rows),
            hazards_closed_on_time=len(on_time),
            on_time_rectify_rate=(len(on_time) / len(hazard_rows)) if hazard_rows else 0.0,
            devices_overdue=len(device_rows)
        )
        details = {"tasks": task_rows, "hazards": hazard_rows, "devices": device_rows}
        return metrics, details

    def apply_adjustments(self, metrics, adjustments):
        adjusted = dict(metrics)
        for row in adjustments:
            metric = row.get("metric")
            if metric in adjusted:
                adjusted[metric] = round(adjusted[metric] + row.get("delta", 0), 4)
        return adjusted

    def _month_tasks(self, building_id, month):
        return [row for row in self.tasks.find_all() if int(row["building_id"]) == int(building_id) and in_month(row["plan_date"], month)]

    def _month_hazards(self, building_id, month):
        task_by_id = {row["id"]: row for row in self.tasks.find_all()}
        result_by_id = {row["id"]: row for row in self.results.find_all()}
        rows = []
        for hazard in self.hazards.find_all():
            result = result_by_id.get(hazard["result_id"], {})
            task = task_by_id.get(result.get("task_id"), {})
            if int(task.get("building_id", -1)) == int(building_id) and in_month(hazard["deadline"], month):
                rows.append(hazard)
        return rows

    def _overdue_devices(self, building_id, month):
        end = month_end(month)
        rows = []
        for device in self.devices.find_all():
            due = parse_date(device["next_maintenance_at"])
            if int(device["building_id"]) == int(building_id) and due is not None and due <= end and device["status"] not in INSPECTED_DEVICE_STATUSES:
                rows.append(device)
        return rows

    def _closed_on_time(self, hazard):
        if hazard["rectify_status"] not in CLOSED_RECTIFY_STATUSES:
            return False
        closed = parse_date(hazard["closed_at"])
        deadline = parse_date(hazard["deadline"])
        return closed is not None and deadline is not None and closed <= deadline
