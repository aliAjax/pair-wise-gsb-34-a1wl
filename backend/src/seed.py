seed = {
  "building": [
    {
      "id": 1,
      "name": "name 1",
      "campus": "campus 1",
      "floor_count": "floor count 1",
      "fire_grade": "fire grade 1",
      "manager_id": 1,
      "address_code": "address code 1"
    },
    {
      "id": 2,
      "name": "name 2",
      "campus": "campus 2",
      "floor_count": "floor count 2",
      "fire_grade": "fire grade 2",
      "manager_id": 2,
      "address_code": "address code 2"
    },
    {
      "id": 3,
      "name": "name 3",
      "campus": "campus 3",
      "floor_count": "floor count 3",
      "fire_grade": "fire grade 3",
      "manager_id": 3,
      "address_code": "address code 3"
    }
  ],
  "fireDevice": [
    {
      "id": 1,
      "building_id": 1,
      "device_code": "device code 1",
      "device_type": "HYDRANT",
      "floor": "floor 1",
      "location_desc": "location desc 1",
      "install_date": "2026-06-11T09:00:00Z",
      "status": "IN_PROGRESS",
      "next_maintenance_at": "2026-06-11T09:00:00Z"
    },
    {
      "id": 2,
      "building_id": 2,
      "device_code": "device code 2",
      "device_type": "SMOKE_DETECTOR",
      "floor": "floor 2",
      "location_desc": "location desc 2",
      "install_date": "2026-06-12T09:00:00Z",
      "status": "SUBMITTED",
      "next_maintenance_at": "2026-06-12T09:00:00Z"
    },
    {
      "id": 3,
      "building_id": 3,
      "device_code": "device code 3",
      "device_type": "SPRINKLER",
      "floor": "floor 3",
      "location_desc": "location desc 3",
      "install_date": "2026-06-13T09:00:00Z",
      "status": "PLANNED",
      "next_maintenance_at": "2026-06-13T09:00:00Z"
    },
    {
      "id": 4,
      "building_id": 1,
      "device_code": "device code 4",
      "device_type": "EXTINGUISHER",
      "floor": "floor 1",
      "location_desc": "location desc 4",
      "install_date": "2026-07-02T09:00:00Z",
      "status": "IN_PROGRESS",
      "next_maintenance_at": "2026-08-10T09:00:00Z"
    },
    {
      "id": 5,
      "building_id": 1,
      "device_code": "device code 5",
      "device_type": "EXIT_LIGHT",
      "floor": "floor 2",
      "location_desc": "location desc 5",
      "install_date": "2026-07-15T09:00:00Z",
      "status": "PLANNED",
      "next_maintenance_at": "2026-09-15T09:00:00Z"
    },
    {
      "id": 6,
      "building_id": 2,
      "device_code": "device code 6",
      "device_type": "HYDRANT",
      "floor": "floor 1",
      "location_desc": "location desc 6",
      "install_date": "2026-07-20T09:00:00Z",
      "status": "REVIEWED",
      "next_maintenance_at": "2026-10-01T09:00:00Z"
    }
  ],
  "inspectionTask": [
    {
      "id": 1,
      "building_id": 1,
      "inspector_id": 1,
      "plan_date": "2026-06-11T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "IN_PROGRESS",
      "checklist_version": "checklist version 1",
      "finished_at": "2026-06-11T09:00:00Z"
    },
    {
      "id": 2,
      "building_id": 2,
      "inspector_id": 2,
      "plan_date": "2026-06-12T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "SUBMITTED",
      "checklist_version": "checklist version 2",
      "finished_at": "2026-06-12T09:00:00Z"
    },
    {
      "id": 3,
      "building_id": 3,
      "inspector_id": 3,
      "plan_date": "2026-06-13T09:00:00Z",
      "task_type": "SPRINKLER",
      "status": "PLANNED",
      "checklist_version": "checklist version 3",
      "finished_at": "2026-06-13T09:00:00Z"
    },
    {
      "id": 4,
      "building_id": 1,
      "inspector_id": 1,
      "plan_date": "2026-08-05T09:00:00Z",
      "task_type": "EXTINGUISHER",
      "status": "REVIEWED",
      "checklist_version": "checklist version 4",
      "finished_at": "2026-08-05T15:00:00Z"
    },
    {
      "id": 5,
      "building_id": 1,
      "inspector_id": 2,
      "plan_date": "2026-08-12T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "REVIEWED",
      "checklist_version": "checklist version 4",
      "finished_at": "2026-08-12T15:00:00Z"
    },
    {
      "id": 6,
      "building_id": 1,
      "inspector_id": 1,
      "plan_date": "2026-08-19T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "REVIEWED",
      "checklist_version": "checklist version 4",
      "finished_at": "2026-08-19T15:00:00Z"
    },
    {
      "id": 7,
      "building_id": 1,
      "inspector_id": 3,
      "plan_date": "2026-08-20T09:00:00Z",
      "task_type": "EXIT_LIGHT",
      "status": "SUBMITTED",
      "checklist_version": "checklist version 4",
      "finished_at": "2026-08-20T15:00:00Z"
    },
    {
      "id": 8,
      "building_id": 1,
      "inspector_id": 1,
      "plan_date": "2026-09-03T09:00:00Z",
      "task_type": "EXTINGUISHER",
      "status": "REVIEWED",
      "checklist_version": "checklist version 5",
      "finished_at": "2026-09-03T15:00:00Z"
    },
    {
      "id": 9,
      "building_id": 1,
      "inspector_id": 2,
      "plan_date": "2026-09-10T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "REVIEWED",
      "checklist_version": "checklist version 5",
      "finished_at": "2026-09-10T15:00:00Z"
    },
    {
      "id": 10,
      "building_id": 1,
      "inspector_id": 1,
      "plan_date": "2026-09-15T09:00:00Z",
      "task_type": "SPRINKLER",
      "status": "IN_PROGRESS",
      "checklist_version": "checklist version 5",
      "finished_at": ""
    },
    {
      "id": 11,
      "building_id": 1,
      "inspector_id": 3,
      "plan_date": "2026-09-22T09:00:00Z",
      "task_type": "EXIT_LIGHT",
      "status": "PLANNED",
      "checklist_version": "checklist version 5",
      "finished_at": ""
    },
    {
      "id": 12,
      "building_id": 2,
      "inspector_id": 2,
      "plan_date": "2026-09-08T09:00:00Z",
      "task_type": "HYDRANT",
      "status": "REVIEWED",
      "checklist_version": "checklist version 5",
      "finished_at": "2026-09-08T15:00:00Z"
    },
    {
      "id": 13,
      "building_id": 2,
      "inspector_id": 3,
      "plan_date": "2026-09-18T09:00:00Z",
      "task_type": "SMOKE_DETECTOR",
      "status": "OVERDUE",
      "checklist_version": "checklist version 5",
      "finished_at": ""
    }
  ],
  "inspectionResult": [
    {
      "id": 1,
      "task_id": 1,
      "device_id": 1,
      "item_code": "item code 1",
      "result_status": "IN_PROGRESS",
      "measured_value": "measured value 1",
      "photo_url": "/mock/photo_url-1.png",
      "note": "note 1"
    },
    {
      "id": 2,
      "task_id": 2,
      "device_id": 2,
      "item_code": "item code 2",
      "result_status": "SUBMITTED",
      "measured_value": "measured value 2",
      "photo_url": "/mock/photo_url-2.png",
      "note": "note 2"
    },
    {
      "id": 3,
      "task_id": 3,
      "device_id": 3,
      "item_code": "item code 3",
      "result_status": "PLANNED",
      "measured_value": "measured value 3",
      "photo_url": "/mock/photo_url-3.png",
      "note": "note 3"
    },
    {
      "id": 4,
      "task_id": 4,
      "device_id": 4,
      "item_code": "item code 4",
      "result_status": "REVIEWED",
      "measured_value": "measured value 4",
      "photo_url": "/mock/photo_url-4.png",
      "note": "note 4"
    },
    {
      "id": 5,
      "task_id": 5,
      "device_id": 1,
      "item_code": "item code 5",
      "result_status": "REVIEWED",
      "measured_value": "measured value 5",
      "photo_url": "/mock/photo_url-5.png",
      "note": "note 5"
    },
    {
      "id": 6,
      "task_id": 8,
      "device_id": 4,
      "item_code": "item code 6",
      "result_status": "REVIEWED",
      "measured_value": "measured value 6",
      "photo_url": "/mock/photo_url-6.png",
      "note": "note 6"
    },
    {
      "id": 7,
      "task_id": 9,
      "device_id": 5,
      "item_code": "item code 7",
      "result_status": "REVIEWED",
      "measured_value": "measured value 7",
      "photo_url": "/mock/photo_url-7.png",
      "note": "note 7"
    },
    {
      "id": 8,
      "task_id": 12,
      "device_id": 2,
      "item_code": "item code 8",
      "result_status": "REVIEWED",
      "measured_value": "measured value 8",
      "photo_url": "/mock/photo_url-8.png",
      "note": "note 8"
    }
  ],
  "hazardTicket": [
    {
      "id": 1,
      "result_id": 1,
      "severity": "severity 1",
      "owner_id": 1,
      "deadline": "deadline 1",
      "rectify_status": "IN_PROGRESS",
      "rectify_note": "rectify note 1",
      "closed_at": "2026-06-11T09:00:00Z"
    },
    {
      "id": 2,
      "result_id": 2,
      "severity": "severity 2",
      "owner_id": 2,
      "deadline": "deadline 2",
      "rectify_status": "SUBMITTED",
      "rectify_note": "rectify note 2",
      "closed_at": "2026-06-12T09:00:00Z"
    },
    {
      "id": 3,
      "result_id": 3,
      "severity": "severity 3",
      "owner_id": 3,
      "deadline": "deadline 3",
      "rectify_status": "PLANNED",
      "rectify_note": "rectify note 3",
      "closed_at": "2026-06-13T09:00:00Z"
    },
    {
      "id": 4,
      "result_id": 4,
      "severity": "HIGH",
      "owner_id": 1,
      "deadline": "2026-08-15T09:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "rectify note 4",
      "closed_at": "2026-08-12T10:00:00Z"
    },
    {
      "id": 5,
      "result_id": 5,
      "severity": "MEDIUM",
      "owner_id": 2,
      "deadline": "2026-08-25T09:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "rectify note 5",
      "closed_at": "2026-08-24T10:00:00Z"
    },
    {
      "id": 6,
      "result_id": 6,
      "severity": "LOW",
      "owner_id": 1,
      "deadline": "2026-09-10T09:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "rectify note 6",
      "closed_at": "2026-09-08T10:00:00Z"
    },
    {
      "id": 7,
      "result_id": 7,
      "severity": "CRITICAL",
      "owner_id": 3,
      "deadline": "2026-09-20T09:00:00Z",
      "rectify_status": "IN_PROGRESS",
      "rectify_note": "rectify note 7",
      "closed_at": ""
    },
    {
      "id": 8,
      "result_id": 8,
      "severity": "MEDIUM",
      "owner_id": 2,
      "deadline": "2026-09-05T09:00:00Z",
      "rectify_status": "CLOSED",
      "rectify_note": "rectify note 8",
      "closed_at": "2026-09-09T10:00:00Z"
    }
  ],
  "monthlyReportSnapshot": [
    {
      "id": 1,
      "building_id": 1,
      "month": "2026-08",
      "status": "ARCHIVED",
      "metrics": {
        "tasks_total": 3,
        "tasks_reviewed": 3,
        "completion_rate": 1.0,
        "hazards_due": 2,
        "hazards_closed_on_time": 1,
        "on_time_rectify_rate": 0.5,
        "devices_overdue": 2
      },
      "adjusted_metrics": {
        "tasks_total": 3,
        "tasks_reviewed": 3,
        "completion_rate": 1.0,
        "hazards_due": 2,
        "hazards_closed_on_time": 1,
        "on_time_rectify_rate": 0.5,
        "devices_overdue": 2
      },
      "details": {
        "tasks": [
          {
            "id": 4,
            "building_id": 1,
            "inspector_id": 1,
            "plan_date": "2026-08-05T09:00:00Z",
            "task_type": "EXTINGUISHER",
            "status": "REVIEWED",
            "checklist_version": "checklist version 4",
            "finished_at": "2026-08-05T15:00:00Z"
          },
          {
            "id": 5,
            "building_id": 1,
            "inspector_id": 2,
            "plan_date": "2026-08-12T09:00:00Z",
            "task_type": "HYDRANT",
            "status": "REVIEWED",
            "checklist_version": "checklist version 4",
            "finished_at": "2026-08-12T15:00:00Z"
          },
          {
            "id": 6,
            "building_id": 1,
            "inspector_id": 1,
            "plan_date": "2026-08-19T09:00:00Z",
            "task_type": "SMOKE_DETECTOR",
            "status": "REVIEWED",
            "checklist_version": "checklist version 4",
            "finished_at": "2026-08-19T15:00:00Z"
          }
        ],
        "hazards": [
          {
            "id": 4,
            "result_id": 4,
            "severity": "HIGH",
            "owner_id": 1,
            "deadline": "2026-08-15T09:00:00Z",
            "rectify_status": "CLOSED",
            "rectify_note": "rectify note 4",
            "closed_at": "2026-08-12T10:00:00Z"
          },
          {
            "id": 5,
            "result_id": 5,
            "severity": "MEDIUM",
            "owner_id": 2,
            "deadline": "2026-08-25T09:00:00Z",
            "rectify_status": "IN_PROGRESS",
            "rectify_note": "rectify note 5",
            "closed_at": ""
          }
        ],
        "devices": [
          {
            "id": 1,
            "building_id": 1,
            "device_code": "device code 1",
            "device_type": "HYDRANT",
            "floor": "floor 1",
            "location_desc": "location desc 1",
            "install_date": "2026-06-11T09:00:00Z",
            "status": "IN_PROGRESS",
            "next_maintenance_at": "2026-06-11T09:00:00Z"
          },
          {
            "id": 4,
            "building_id": 1,
            "device_code": "device code 4",
            "device_type": "EXTINGUISHER",
            "floor": "floor 1",
            "location_desc": "location desc 4",
            "install_date": "2026-07-02T09:00:00Z",
            "status": "IN_PROGRESS",
            "next_maintenance_at": "2026-08-10T09:00:00Z"
          }
        ]
      },
      "adjustments": [],
      "archived_at": "2026-08-31T16:00:00Z",
      "archived_by": "admin",
      "generated_at": "2026-08-31T16:00:00Z"
    }
  ],
  "reportAdjustment": [
    {
      "id": 1,
      "building_id": 1,
      "source_month": "2026-08",
      "adjust_month": "2026-09",
      "metric": "completion_rate",
      "delta": -0.25,
      "reason": "8月补录巡检任务1条，完成率由100%修正为75%，差额并入9月报表",
      "actor": "admin",
      "created_at": "2026-09-03T10:00:00Z"
    }
  ]
}
