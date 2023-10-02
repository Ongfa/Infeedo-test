# Infeedo-test
Infeedo Task API in NodeJS

This is a NodeJs project which can be used to add task, update task, get all tasks in created and task metrics in a specific timeline.

1) Create a new task.

API POST: http://localhost:8080/createTask

payload: 

{
    "title": "Infeedo test",
    "status": "open"
}

Response:
{
    "success": true,
    "message": "Task created successfully",
    "taskId": 19
}

2) Update an existing task.

API PUT: http://localhost:8080/updateTask

payload:

{
    "title": "Task 9",
    "status": "completed"
}

Response:
{
    "success": true,
    "message": "Task updated successfully"
}

3) Get all tasks

API GET: http://localhost:8080/getAllTasks

Response:
[
    {
        "id": 1,
        "status": "open",
        "date_created": "2023-08-09T18:30:00.000Z",
        "title": "Task 1"
    },
    {
        "id": 2,
        "status": "in_progress",
        "date_created": "2023-08-15T18:30:00.000Z",
        "title": "Task 2"
    },
    {
        "id": 3,
        "status": "in_progress",
        "date_created": "2023-08-22T18:30:00.000Z",
        "title": "Task 3"
    },
    {
        "id": 4,
        "status": "open",
        "date_created": "2023-09-04T18:30:00.000Z",
        "title": "Task 4"
    },
    {
        "id": 5,
        "status": "completed",
        "date_created": "2023-09-13T18:30:00.000Z",
        "title": "Task 5"
    },
    {
        "id": 6,
        "status": "open",
        "date_created": "2023-09-18T18:30:00.000Z",
        "title": "Task 6"
    },
    {
        "id": 7,
        "status": "completed",
        "date_created": "2023-09-26T18:30:00.000Z",
        "title": "Task 7"
    },
    {
        "id": 8,
        "status": "open",
        "date_created": "2023-10-01T18:30:00.000Z",
        "title": "Task 8"
    },
    {
        "id": 16,
        "status": "completed",
        "date_created": "2023-10-01T18:30:00.000Z",
        "title": "Task 9"
    },
    {
        "id": 17,
        "status": "completed",
        "date_created": "2023-10-01T18:30:00.000Z",
        "title": "Task 9"
    }
]

4) Get task metrics according to status and specified timeline

API GET: http://localhost:8080/getTaskMetrics?status=open&startDate=2023-08-10&endDate=2023-10-02

params: status, startDate, endDate

Response:
{
    "start_date": " 2023-10-01",
    "metrics": {
        "open_tasks": "3",
        "inprogress_tasks": "2",
        "completed_tasks": "2"
    },
    "end_date": " 2023-10-01"
}
