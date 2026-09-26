export interface ReportAdjustment {
  id: number;
  building_id: number;
  source_month: string;
  target_month: string;
  kind: string;
  ref_id: number;
  delta: number;
  reason: string;
  created_at: string;
}
