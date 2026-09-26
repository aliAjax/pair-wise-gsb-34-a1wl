from src.seed import seed
class ReportAdjustmentRepository:
    def find_all(self):
        return seed["reportAdjustment"]
    def find_by_adjust_month(self, building_id, adjust_month):
        return [row for row in seed["reportAdjustment"] if int(row["building_id"]) == int(building_id) and row["adjust_month"] == adjust_month]
    def find_by_source_month(self, building_id, source_month):
        return [row for row in seed["reportAdjustment"] if int(row["building_id"]) == int(building_id) and row["source_month"] == source_month]
    def insert(self, adjustment):
        adjustment["id"] = max([row["id"] for row in seed["reportAdjustment"]] + [0]) + 1
        seed["reportAdjustment"].append(adjustment)
        return adjustment
