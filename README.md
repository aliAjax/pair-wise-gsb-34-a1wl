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

## 合规报表月度快照台

`/reports` 页为月度快照台，统计口径、归档保存与页面分离：

- 统计口径：`frontend/src/utils/monthlyReportStats.ts`
  - 完成率 = 当月已复核(REVIEWED)任务 / 当月计划任务（按 plan_date 归属自然月）
  - 整改及时率 = 按时关闭隐患(closed_at ≤ deadline) / 当月到期隐患（按 deadline 归属自然月，经 InspectionResult → InspectionTask 关联楼栋）
  - 逾期维保数 = 截至统计日（月末或当天，取较早者）next_maintenance_at 已过期的设备
- 归档保存：`frontend/src/api/MonthlyReport.ts` + `frontend/src/api/ReportAdjustment.ts`（localStorage 持久化）+ `frontend/src/stores/MonthlyReportStore.ts`
  - 月末归档把指标与明细冻结为快照，旧月报表保持原样
  - 归档后的更正登记为调整单（ReportAdjustment），按 target_month 并入次月重算
  - 未归档月份每次按最新记录实时重算
- 页面：`frontend/src/pages/ReportsPage.tsx` + `frontend/src/hooks/useMonthlyReport.ts`

## 枚举/常量出现位置清单

- DeviceType: constants/DeviceType、types/DeviceType、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- InspectionStatus: constants/InspectionStatus、types/InspectionStatus、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- HazardSeverity: constants/HazardSeverity、types/HazardSeverity、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- ReportArchiveStatus: constants/ReportArchiveStatus、constructors/MonthlyReportConstructor、pages/ReportsPage 引用。
- AdjustmentKind: constants/AdjustmentKind、utils/monthlyReportStats、constructors/ReportAdjustmentConstructor、pages/ReportsPage 引用。

## 为什么会牵一发动全身

实体字段、枚举、日志模板、错误消息、构造器、筛选器和展示组件被刻意拆散到多个目录；修改一个状态值通常需要同步类型、构造器、服务、控制器、store、页面、README 与数据库种子。

## License

MIT
