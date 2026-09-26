import { useState } from "react";
import { AdjustmentKind, AdjustmentKindText } from "../constants/AdjustmentKind";
import { ReportArchiveStatus, ReportArchiveStatusText } from "../constants/ReportArchiveStatus";
import { EmptyState } from "../components/common/EmptyState";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { useMonthlyReport } from "../hooks/useMonthlyReport";
import { formatDate, formatMonth, formatNumber, formatPercent, formatRisk, formatStatus } from "../utils/formatters";
import { nextMonth } from "../utils/monthlyReportStats";
import type { HazardTicket } from "../types/HazardTicket";

const hazardCloseState = (ticket: HazardTicket) => {
  if (!ticket.closed_at) return "OPEN";
  const closed = Date.parse(ticket.closed_at);
  const deadline = Date.parse(ticket.deadline);
  if (Number.isNaN(closed) || Number.isNaN(deadline)) return "OPEN";
  return closed <= deadline ? "ON_TIME" : "LATE";
};

export function ReportsPage() {
  const report = useMonthlyReport();
  const [kind, setKind] = useState<string>(AdjustmentKind[0]);
  const [refId, setRefId] = useState("");
  const [reason, setReason] = useState("");

  const submitAdjustment = async () => {
    const saved = await report.adjust({ kind, ref_id: Number(refId) || 0, reason });
    if (saved) {
      setRefId("");
      setReason("");
    }
  };

  const status = report.frozen ? ReportArchiveStatus[1] : ReportArchiveStatus[0];

  return (
    <main className="page">
      <section className="page-head">
        <div>
          <p className="eyebrow">fire-inspect</p>
          <h1>合规报表 · 月度快照台</h1>
        </div>
        <StatusBadge value={status} />
      </section>

      <section className="panel filters">
        <label>
          楼栋
          <select value={report.buildingId} onChange={(event) => report.selectBuilding(Number(event.target.value))}>
            {report.buildings.map((building) => (
              <option key={building.id} value={building.id}>{building.name}</option>
            ))}
          </select>
        </label>
        <label>
          月份
          <input
            type="month"
            value={report.month}
            onChange={(event) => event.target.value && report.selectMonth(event.target.value)}
          />
        </label>
        {report.frozen ? (
          <p className="hint">
            {ReportArchiveStatusText.ARCHIVED}，{report.snapshot?.archived_by} 于 {report.snapshot?.archived_at ? formatDate(report.snapshot.archived_at) : "—"} 归档，旧月报表保持原样
          </p>
        ) : (
          <>
            <button type="button" disabled={!report.canArchive} onClick={report.archive}>月末归档</button>
            <p className="hint">
              {report.canArchive
                ? `${ReportArchiveStatusText.UNARCHIVED}，归档后连明细一起冻结`
                : "当月未结束不能归档，当前按最新记录实时重算"}
            </p>
          </>
        )}
        {report.error && <p className="error">{report.error}</p>}
      </section>

      <section className="metrics">
        <StatCard label="巡检完成率" value={formatPercent(report.metrics.completion_rate)} />
        <StatCard label="隐患整改及时率" value={formatPercent(report.metrics.rectify_ontime_rate)} />
        <StatCard label="逾期维保设备" value={formatNumber(report.metrics.overdue_devices)} />
      </section>
      <section className="metrics">
        <StatCard label="已复核 / 计划任务" value={`${report.metrics.reviewed_tasks} / ${report.metrics.planned_tasks}`} />
        <StatCard label="按时关闭 / 到期隐患" value={`${report.metrics.ontime_closed_hazards} / ${report.metrics.due_hazards}`} />
        <StatCard label="并入本月调整单" value={report.appliedAdjustments.length} />
      </section>

      <section className="detail-grid">
        <div className="panel">
          <h2>巡检任务明细（{formatMonth(report.month)}）</h2>
          <div className="table">
            {report.details.tasks.map((task) => (
              <article key={task.id} className="row">
                <strong>任务 #{task.id}</strong>
                <span>{formatDate(task.plan_date)}</span>
                <StatusBadge value={task.status} />
              </article>
            ))}
            {report.details.tasks.length === 0 && <EmptyState title="当月无巡检任务" />}
          </div>
        </div>
        <div className="panel">
          <h2>到期隐患明细（{formatMonth(report.month)}）</h2>
          <div className="table">
            {report.details.hazards.map((ticket) => (
              <article key={ticket.id} className="row">
                <strong>隐患 #{ticket.id} · {formatRisk(ticket.severity)}</strong>
                <span>截止 {ticket.deadline ? formatDate(ticket.deadline) : "—"}</span>
                <StatusBadge value={hazardCloseState(ticket)} />
              </article>
            ))}
            {report.details.hazards.length === 0 && <EmptyState title="当月无到期隐患" />}
          </div>
        </div>
        <div className="panel">
          <h2>逾期维保设备</h2>
          <div className="table">
            {report.details.devices.map((device) => (
              <article key={device.id} className="row">
                <strong>{device.device_code}</strong>
                <span>{formatStatus(device.device_type)}</span>
                <span>应检 {device.next_maintenance_at ? formatDate(device.next_maintenance_at) : "—"}</span>
              </article>
            ))}
            {report.details.devices.length === 0 && <EmptyState title="无逾期维保设备" />}
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>调整单</h2>
        <div className="table">
          {report.appliedAdjustments.map((adjustment) => (
            <article key={adjustment.id} className="row">
              <strong>{AdjustmentKindText[adjustment.kind as AdjustmentKind] ?? formatStatus(adjustment.kind)} #{adjustment.ref_id}</strong>
              <span>{formatMonth(adjustment.source_month)} 更正并入 · {adjustment.reason || "无备注"}</span>
              <span>+{adjustment.delta}</span>
            </article>
          ))}
          {report.appliedAdjustments.length === 0 && <EmptyState title="本月无并入的调整单" />}
        </div>
        {report.outgoingAdjustments.length > 0 && (
          <>
            <h2>本月归档后登记（并入 {formatMonth(nextMonth(report.month))}）</h2>
            <div className="table">
              {report.outgoingAdjustments.map((adjustment) => (
                <article key={adjustment.id} className="row">
                  <strong>{AdjustmentKindText[adjustment.kind as AdjustmentKind] ?? formatStatus(adjustment.kind)} #{adjustment.ref_id}</strong>
                  <span>{adjustment.reason || "无备注"}</span>
                  <span>{formatDate(adjustment.created_at)}</span>
                </article>
              ))}
            </div>
          </>
        )}
        {report.frozen && (
          <div className="adjustment-form">
            <label>
              类型
              <select value={kind} onChange={(event) => setKind(event.target.value)}>
                {AdjustmentKind.map((value) => (
                  <option key={value} value={value}>{AdjustmentKindText[value]}</option>
                ))}
              </select>
            </label>
            <label>
              关联记录 ID
              <input value={refId} onChange={(event) => setRefId(event.target.value)} placeholder="任务 / 隐患 / 设备" />
            </label>
            <label>
              更正说明
              <input value={reason} onChange={(event) => setReason(event.target.value)} placeholder="次月补录原因" />
            </label>
            <button type="button" onClick={submitAdjustment}>登记调整单（并入 {formatMonth(nextMonth(report.month))}）</button>
          </div>
        )}
      </section>
    </main>
  );
}
