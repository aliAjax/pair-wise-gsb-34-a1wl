export const mockData = {
  "building": [
    {
      "id": 1,
      "name": "1号研发楼",
      "campus": "东区",
      "floor_count": 12,
      "fire_grade": "一级",
      "manager_id": 1,
      "address_code": "JD-001"
    },
    {
      "id": 2,
      "name": "2号生产楼",
      "campus": "东区",
      "floor_count": 8,
      "fire_grade": "二级",
      "manager_id": 2,
      "address_code": "JD-002"
    },
    {
      "id": 3,
      "name": "3号仓储楼",
      "campus": "西区",
      "floor_count": 5,
      "fire_grade": "一级",
      "manager_id": 3,
      "address_code": "JD-003"
    }
  ],
  "fireDevice": [
    {
      "id": 1,
      "building_id": 1,
      "device_code": "MHQ-1F-001",
      "device_type": "EXTINGUISHER",
      "floor": "1F",
      "location_desc": "一层大堂东侧",
      "install_date": "2024-03-12T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-08-20T09:00:00Z"
    },
    {
      "id": 2,
      "building_id": 1,
      "device_code": "XHS-3F-002",
      "device_type": "HYDRANT",
      "floor": "3F",
      "location_desc": "三层走廊北",
      "install_date": "2024-03-12T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-09-10T09:00:00Z"
    },
    {
      "id": 3,
      "building_id": 1,
      "device_code": "YG-5F-003",
      "device_type": "SMOKE_DETECTOR",
      "floor": "5F",
      "location_desc": "五层机房门口",
      "install_date": "2024-06-01T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-10-15T09:00:00Z"
    },
    {
      "id": 4,
      "building_id": 2,
      "device_code": "YG-2F-001",
      "device_type": "SMOKE_DETECTOR",
      "floor": "2F",
      "location_desc": "二层车间西",
      "install_date": "2024-05-20T09:00:00Z",
      "status": "FAULT",
      "next_maintenance_at": "2026-07-25T09:00:00Z"
    },
    {
      "id": 5,
      "building_id": 2,
      "device_code": "PL-1F-002",
      "device_type": "SPRINKLER",
      "floor": "1F",
      "location_desc": "一层仓库区",
      "install_date": "2024-05-20T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-09-05T09:00:00Z"
    },
    {
      "id": 6,
      "building_id": 2,
      "device_code": "YJD-4F-003",
      "device_type": "EXIT_LIGHT",
      "floor": "4F",
      "location_desc": "四层疏散通道",
      "install_date": "2024-05-20T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-11-01T09:00:00Z"
    },
    {
      "id": 7,
      "building_id": 3,
      "device_code": "YJD-1F-001",
      "device_type": "EXIT_LIGHT",
      "floor": "1F",
      "location_desc": "一层月台",
      "install_date": "2024-08-08T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-08-31T09:00:00Z"
    },
    {
      "id": 8,
      "building_id": 3,
      "device_code": "XHS-2F-002",
      "device_type": "HYDRANT",
      "floor": "2F",
      "location_desc": "二层货架区",
      "install_date": "2024-08-08T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2026-09-30T09:00:00Z"
    },
    {
      "id": 9,
      "building_id": 3,
      "device_code": "MHQ-1F-003",
      "device_type": "EXTINGUISHER",
      "floor": "1F",
      "location_desc": "一层办公区",
      "install_date": "2024-08-08T09:00:00Z",
      "status": "NORMAL",
      "next_maintenance_at": "2027-01-15T09:00:00Z"
    }
  ],
  "inspectionTask": [
    {
      "id": 1,
      "building_id": 1,
      "inspector_id": 11,
      "plan_date": "2026-07-06T09:00:00Z",
      "task_type": "EXTINGUISHER",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-07-06T10:30:00Z"
    },
    {
      "id": 2,
      "building_id": 1,
      "inspector_id": 11,
      "plan_date": "2026-07-20T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-07-21T09:10:00Z"
    },
    {
      "id": 3,
      "building_id": 2,
      "inspector_id": 12,
      "plan_date": "2026-07-10T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-07-10T15:00:00Z"
    },
    {
      "id": 4,
      "building_id": 3,
      "inspector_id": 13,
      "plan_date": "2026-07-15T09:00:00Z",
      "task_type": "EXIT_LIGHT",
      "status": "OVERDUE",
      "checklist_version": "CL-2026-V3",
      "finished_at": ""
    },
    {
      "id": 5,
      "building_id": 1,
      "inspector_id": 11,
      "plan_date": "2026-08-03T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-08-03T11:00:00Z"
    },
    {
      "id": 6,
      "building_id": 1,
      "inspector_id": 12,
      "plan_date": "2026-08-17T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "SUBMITTED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-08-17T16:40:00Z"
    },
    {
      "id": 7,
      "building_id": 2,
      "inspector_id": 12,
      "plan_date": "2026-08-05T09:00:00Z",
      "task_type": "SPRINKLER",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-08-05T10:00:00Z"
    },
    {
      "id": 8,
      "building_id": 2,
      "inspector_id": 13,
      "plan_date": "2026-08-19T09:00:00Z",
      "task_type": "EXIT_LIGHT",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-08-19T14:20:00Z"
    },
    {
      "id": 9,
      "building_id": 3,
      "inspector_id": 13,
      "plan_date": "2026-08-12T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "IN_PROGRESS",
      "checklist_version": "CL-2026-V3",
      "finished_at": ""
    },
    {
      "id": 10,
      "building_id": 1,
      "inspector_id": 11,
      "plan_date": "2026-09-07T09:00:00Z",
      "task_type": "EXTINGUISHER",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-09-07T09:50:00Z"
    },
    {
      "id": 11,
      "building_id": 1,
      "inspector_id": 12,
      "plan_date": "2026-09-21T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "SUBMITTED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-09-21T17:10:00Z"
    },
    {
      "id": 12,
      "building_id": 2,
      "inspector_id": 12,
      "plan_date": "2026-09-09T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "REVIEWED",
      "checklist_version": "CL-2026-V3",
      "finished_at": "2026-09-09T10:40:00Z"
    },
    {
      "id": 13,
      "building_id": 2,
      "inspector_id": 13,
      "plan_date": "2026-09-23T09:00:00Z",
      "task_type": "SPRINKLER",
      "status": "IN_PROGRESS",
      "checklist_version": "CL-2026-V3",
      "finished_at": ""
    },
    {
      "id": 14,
      "building_id": 3,
      "inspector_id": 13,
      "plan_date": "2026-09-14T09:00:00Z",
      "task_type": "EXIT_LIGHT",
      "status": "PLANNED",
      "checklist_version": "CL-2026-V3",
      "finished_at": ""
    }
  ],
  "inspectionResult": [
    {
      "id": 1,
      "task_id": 1,
      "device_id": 1,
      "item_code": "ITEM-PRESSURE",
      "result_status": "NORMAL",
      "measured_value": "0.9MPa",
      "photo_url": "/mock/photo_url-1.png",
      "note": "压力正常"
    },
    {
      "id": 2,
      "task_id": 3,
      "device_id": 4,
      "item_code": "ITEM-SMOKE",
      "result_status": "ABNORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-2.png",
      "note": "烟感无响应"
    },
    {
      "id": 3,
      "task_id": 5,
      "device_id": 2,
      "item_code": "ITEM-VALVE",
      "result_status": "ABNORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-3.png",
      "note": "阀门锈蚀"
    },
    {
      "id": 4,
      "task_id": 7,
      "device_id": 4,
      "item_code": "ITEM-SMOKE",
      "result_status": "ABNORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-4.png",
      "note": "复查仍无响应"
    },
    {
      "id": 5,
      "task_id": 8,
      "device_id": 5,
      "item_code": "ITEM-PUMP",
      "result_status": "NORMAL",
      "measured_value": "1.2MPa",
      "photo_url": "/mock/photo_url-5.png",
      "note": "水压正常"
    },
    {
      "id": 6,
      "task_id": 10,
      "device_id": 1,
      "item_code": "ITEM-PRESSURE",
      "result_status": "NORMAL",
      "measured_value": "0.9MPa",
      "photo_url": "/mock/photo_url-6.png",
      "note": "压力正常"
    },
    {
      "id": 7,
      "task_id": 12,
      "device_id": 4,
      "item_code": "ITEM-SMOKE",
      "result_status": "ABNORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-7.png",
      "note": "更换前仍故障"
    },
    {
      "id": 8,
      "task_id": 2,
      "device_id": 3,
      "item_code": "ITEM-DETECTOR",
      "result_status": "NORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-8.png",
      "note": "巡检正常"
    },
    {
      "id": 9,
      "task_id": 6,
      "device_id": 2,
      "item_code": "ITEM-VALVE",
      "result_status": "NORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-9.png",
      "note": "已润滑"
    },
    {
      "id": 10,
      "task_id": 1,
      "device_id": 2,
      "item_code": "ITEM-VALVE",
      "result_status": "ABNORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-10.png",
      "note": "接口渗漏"
    },
    {
      "id": 11,
      "task_id": 10,
      "device_id": 3,
      "item_code": "ITEM-DETECTOR",
      "result_status": "ABNORMAL",
      "measured_value": "",
      "photo_url": "/mock/photo_url-11.png",
      "note": "灵敏度下降"
    }
  ],
  "hazardTicket": [
    {
      "id": 1,
      "result_id": 2,
      "severity": "HIGH",
      "owner_id": 21,
      "deadline": "2026-07-20T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "已更换烟感",
      "closed_at": "2026-07-18T10:00:00Z"
    },
    {
      "id": 2,
      "result_id": 3,
      "severity": "MEDIUM",
      "owner_id": 22,
      "deadline": "2026-08-15T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "阀门已更换",
      "closed_at": "2026-08-20T09:30:00Z"
    },
    {
      "id": 3,
      "result_id": 4,
      "severity": "CRITICAL",
      "owner_id": 21,
      "deadline": "2026-08-10T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "烟感已返厂更换",
      "closed_at": "2026-08-09T15:00:00Z"
    },
    {
      "id": 4,
      "result_id": 7,
      "severity": "HIGH",
      "owner_id": 22,
      "deadline": "2026-09-30T18:00:00Z",
      "rectify_status": "IN_PROGRESS",
      "rectify_note": "待维保商到场",
      "closed_at": ""
    },
    {
      "id": 5,
      "result_id": 10,
      "severity": "LOW",
      "owner_id": 23,
      "deadline": "2026-07-25T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "接口已紧固",
      "closed_at": "2026-07-26T08:30:00Z"
    },
    {
      "id": 6,
      "result_id": 11,
      "severity": "MEDIUM",
      "owner_id": 23,
      "deadline": "2026-09-20T18:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "探测器已清洗",
      "closed_at": "2026-09-19T11:00:00Z"
    }
  ]
} as const;
