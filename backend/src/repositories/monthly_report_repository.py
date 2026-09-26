from src.seed import seed
class MonthlyReportRepository:
    def find_all(self):
        return seed["monthlyReportSnapshot"]
    def find_by_building_month(self, building_id, month):
        for row in seed["monthlyReportSnapshot"]:
            if int(row["building_id"]) == int(building_id) and row["month"] == month:
                return row
        return None
    def insert(self, snapshot):
        snapshot["id"] = max([row["id"] for row in seed["monthlyReportSnapshot"]] + [0]) + 1
        seed["monthlyReportSnapshot"].append(snapshot)
        return snapshot
