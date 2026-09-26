import { useState } from "react";
import { EmptyState } from "../components/common/EmptyState";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { SnapshotStatusText } from "../constants/SnapshotStatus";
import { REPORT_CALIBER, ReportMetric, ReportMetricText } from "../constants/ReportMetric";
import type { ReportMetric as ReportMetricKey } from "../constants/ReportMetric";
import { useMonthlyReport } from "../hooks/useMonthlyReport";
import { formatDate, formatMonth, formatNumber, formatPercent, nextMonth } from "../utils/formatters";

export function ReportsPage() {
  const { report, loading, buildingId, month, buildings, select, archive, adjust } = useMonthlyReport();
  const [metric, setMetric] = useState<ReportMetricKey>("completion_rate");
  const [delta, setDelta] = useState("0");
  const [reason, setReason] = useState("");

  const archived = report?.status === "ARCHIVED";
  const hasAdjustments = (report?.adjustments.length ?? 0) > 0;
  const shown = report?.adjusted_metrics ?? report?.metrics;

  return <main className="page">
    <section className="page-head">
      <div>
        <p className="eyebrow">fire-inspect</p>
        <h1>合规报表 · 月度快照台</h1>
      </div>
      {report && <StatusBadge value={report.status} />}
    </section>

    <section className="panel filters">
      <label>楼栋
        <select value={buildingId} onChange={(event) => select(Number(event.target.value), month)}>
          {buildings.map((row) => <option key={row.id} value={row.id}>{row.name}（#{row.id}）</option>)}
        </select>
      </label>
      <label>月份
        <input type="month" value={month} onChange={(event) => event.target.value && select(buildingId, event.target.value)} />
      </label>
      {report && <span className="sub">{SnapshotStatusText[report.status]} · 生成于 {formatDate(report.generated_at)}</span>}
    </section>

    {loading && <EmptyState title="报表加载中…" />}

    {!loading && report && shown && <>
      <section className="metrics">
        <StatCard label="完成率" value={formatPercent(shown.completion_rate)} />
        <StatCard label="整改及时率" value={formatPercent(shown.on_time_rectify_rate)} />
        <StatCard label="逾期维保数" value={formatNumber(shown.devices_overdue)} />
      </section>

      <section className="panel">
        <h2>统计口径</h2>
        {ReportMetric.map((key) => <p key={key} className="sub">{ReportMetricText[key]}：{REPORT_CALIBER[key]}</p>)}
        <p className="sub">当月任务 {report.metrics.tasks_reviewed}/{report.metrics.tasks_total} 已复核 · 隐患 {report.metrics.hazards_closed_on_time}/{report.metrics.hazards_due} 按时关闭 · 到期未检设备 {report.metrics.devices_overdue} 台</p>
        {hasAdjustments && <p className="sub">含 {report.adjustments.length} 张调整单并入：重算完成率 {formatPercent(report.metrics.completion_rate)}、整改及时率 {formatPercent(report.metrics.on_time_rectify_rate)}、逾期维保 {report.metrics.devices_overdue} 台</p>}
        {archived && <p className="sub">已于 {formatDate(report.archived_at)} 由 {report.archived_by} 归档冻结，旧月报表保持原样；更正请登记调整单并入 {formatMonth(nextMonth(report.month))}。</p>}
      </section>

      <section className="workbench">
        <div className="panel wide">
          <h2>巡检任务明细（{report.details.tasks.length}）</h2>
          {report.details.tasks.length === 0 && <EmptyState title="当月无巡检任务" />}
          {report.details.tasks.map((row) => <article key={row.id} className="row">
            <strong>#{row.id} {row.task_type}</strong>
            <span>{formatDate(row.plan_date)}</span>
            <StatusBadge value={row.status} />
          </article>)}
        </div>
        <div className="panel">
          <h2>到期隐患（{report.details.hazards.length}）</h2>
          {report.details.hazards.length === 0 && <EmptyState title="当月无到期隐患" />}
          {report.details.hazards.map((row) => <article key={row.id} className="row">
            <strong>#{row.id} {row.severity}</strong>
            <span>{formatDate(row.deadline)}</span>
            <StatusBadge value={row.rectify_status} />
          </article>)}
        </div>
      </section>

      <section className="workbench">
        <div className="panel wide">
          <h2>到期未检设备（{report.details.devices.length}）</h2>
          {report.details.devices.length === 0 && <EmptyState title="无逾期维保设备" />}
          {report.details.devices.map((row) => <article key={row.id} className="row">
            <strong>{row.device_code}</strong>
            <span>{formatDate(row.next_maintenance_at)}</span>
            <StatusBadge value={row.status} />
          </article>)}
        </div>
        <div className="panel">
          <h2>调整单（{report.adjustments.length}）</h2>
          {report.adjustments.length === 0 && <EmptyState title="暂无调整单" />}
          {report.adjustments.map((row) => <article key={row.id} className="row">
            <strong>{ReportMetricText[row.metric]} {row.delta > 0 ? "+" : ""}{row.delta}</strong>
            <span>{row.source_month} → {row.adjust_month}</span>
            <StatusBadge value="MERGED" />
          </article>)}
          {!archived && <button className="primary" onClick={archive}>月末归档（冻结 {formatMonth(month)} 报表与明细）</button>}
          {archived && <div className="adjust-form">
            <h2>登记调整单（并入 {formatMonth(nextMonth(report.month))}）</h2>
            <label>指标
              <select value={metric} onChange={(event) => setMetric(event.target.value as ReportMetricKey)}>
                {ReportMetric.map((key) => <option key={key} value={key}>{ReportMetricText[key]}</option>)}
              </select>
            </label>
            <label>调整额
              <input type="number" step="0.01" value={delta} onChange={(event) => setDelta(event.target.value)} />
            </label>
            <label>更正说明
              <input type="text" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="次月补录原因" />
            </label>
            <button className="primary" onClick={() => adjust(metric, Number(delta), reason)}>提交调整单</button>
          </div>}
        </div>
      </section>
    </>}
  </main>;
}
