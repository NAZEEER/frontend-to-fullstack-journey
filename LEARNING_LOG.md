# FastAPI Task API — Learning Log

## What I’m learning
- Python backend development
- FastAPI routes and HTTP methods
- Pydantic models and input validation
- HTTP status codes: 200, 404, and 422
- API testing with pytest and FastAPI TestClient

## What I’m building
A task-management API using FastAPI. Tasks have a title (1–80 characters) and a `done` value that defaults to `false`.

Routes implemented:
- `GET /health` — check that the API is running
- `POST /task` — create a task
- `GET /tasks` — list tasks
- `GET /tasks/{task_id}` — retrieve one task
- `PATCH /tasks/{task_id}` — update the task’s `done` status
- `DELETE /tasks/{task_id}` — delete a task

## Test completed
- Added a test in `test_main.py` for creating a task.
- Ran `py -m pytest -q`.
- Result: **1 passed**. A warning appeared, but the test passed.

## Current limitation
Tasks are stored in an in-memory list, not a database, so they are lost when the server restarts.

## Next step
Add tests for invalid titles and missing task IDs.
