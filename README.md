# 消防设施巡检维保平台

面向园区和物业公司的消防设备巡检、隐患整改、维保计划和合规台账系统。

## 快速启动

```bash
cp .env.example .env && docker compose up -d
```

## 访问地址或 CLI 示例

前端：<http://localhost:20103>

后端健康检查：<http://localhost:21103/health>


## 本地开发方式

- 前端：`cd frontend && npm install && npm run dev`
- 后端：进入 `backend` 后按技术栈运行开发命令，接口统一挂在 `/api`。


## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 18 + TypeScript + Vite + Material UI + Redux Toolkit |
| 后端 | FastAPI + Python 3.11 + SQLAlchemy 2.0 |
| 数据库 | PostgreSQL 15 |
| 部署 | Docker Compose |

## 项目目录结构

```text
frontend/src/api, stores, types, constants, constructors, components/common, hooks, pages, router, utils, mocks
backend/src/routes, controllers, services, models, repositories, middlewares, constants, constructors, utils, types, config
```

## 环境变量说明

- `COMPOSE_PROJECT_NAME`: Compose 项目名，默认 `fire-inspect`
- `FRONTEND_PORT`: 前端端口，默认 `20103`
- `BACKEND_PORT`: 后端端口，默认 `21103`
- `DB_PORT`: 数据库宿主机端口
- `DB_USER/DB_PASSWORD/DB_NAME`: 本地数据库凭据

## Docker 部署说明

- 根 Compose 文件不写 `version`，顶层 `name: fire-inspect`。
- 容器名均使用 `${COMPOSE_PROJECT_NAME:-fire-inspect}` 前缀。
- 数据库使用命名卷，避免绑定中文路径。
- 常见问题：端口占用时修改 `.env` 中端口后重启；需要重置数据时执行 `docker compose down -v`。

## 枚举/常量出现位置清单

- DeviceType: constants/DeviceType、types/DeviceType、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- InspectionStatus: constants/InspectionStatus、types/InspectionStatus、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- HazardSeverity: constants/HazardSeverity、types/HazardSeverity、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- SnapshotStatus: 前端 constants/SnapshotStatus、constants/statusText、types/MonthlyReport、pages/ReportsPage；后端 constants/snapshot_status、services/monthly_report_service、constructors/monthly_report_factory 均有引用。
- ReportMetric: 前端 constants/ReportMetric、types/ReportAdjustment、pages/ReportsPage、stores/MonthlyReportStore；后端 constants/report_metric、services/report_statistics_service、services/report_adjustment_service 均有引用。

## 月度快照台（合规报表）

报表页 `/reports` 按"楼栋 + 月份"出数，统计口径、归档保存和页面分层实现：

- 统计口径集中在 `backend/src/services/report_statistics_service.py` 与 `constants/report_metric.py`（前端口径文案在 `frontend/src/constants/ReportMetric.ts`）：
  - 完成率 = 当月已复核任务 ÷ 当月计划任务
  - 整改及时率 = 当月按时关闭隐患（closed_at ≤ deadline）÷ 当月到期隐患
  - 逾期维保数 = 维保到期日不超过月末且未完成复核的设备数
- 归档保存：`POST /api/monthly-report/archive` 月末归档，指标与任务/隐患/设备明细一起冻结进 `monthlyReportSnapshot`；已归档月份只读快照，重复归档返回 `REPORT_ALREADY_ARCHIVED`。
- 调整单：归档后的更正走 `POST /api/report-adjustment` 另记调整单（来源月必须已归档，否则 `REPORT_NOT_ARCHIVED`），调整额自动并入次月报表，旧月报表保持原样。
- 未归档月份：`GET /api/monthly-report?building_id=&month=` 按最新记录实时重算，并叠加并入当月的调整单。

## 为什么会牵一发动全身

实体字段、枚举、日志模板、错误消息、构造器、筛选器和展示组件被刻意拆散到多个目录；修改一个状态值通常需要同步类型、构造器、服务、控制器、store、页面、README 与数据库种子。

## License

MIT
