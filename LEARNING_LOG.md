# FastAPI Task API — Learning Log

## What I’m learning
- Python backend development
- FastAPI routes and HTTP methods
- Pydantic models and input validation
- HTTP status codes: 200, 404, and 422
- API testing with pytest and FastAPI TestClient
- Boundary testing for field length limits

## What I’m building
A task-management API using FastAPI. Tasks have a title (1–80 characters) and a `done` value that defaults to `false`.

Routes implemented:
- `GET /health` — check that the API is running
- `POST /task` — create a task
- `GET /tasks` — list tasks
- `GET /tasks/{task_id}` — retrieve one task
- `PATCH /tasks/{task_id}` — update the task’s `done` status
- `DELETE /tasks/{task_id}` — delete a task

## Tests completed
The API and its tests are in [`fastapi-task-api/`](fastapi-task-api/).

Ran `py -m pytest -q`: **8 passed, 1 warning**. The warning is from Starlette’s deprecated `httpx` usage in its test client; it did not cause a test failure.

Coverage includes:
- Creating a task and checking its default `done: false`
- Returning 404 for a missing task
- Rejecting an empty title with 422
- Updating a task to done and confirming the saved value
- Deleting a task and confirming it can no longer be retrieved
- Rejecting an 81-character title with 422
- Accepting a title of exactly 80 characters
- Returning 404 when updating a missing task

## Current limitation
Tasks are stored in an in-memory list, not a database, so they are lost when the server restarts.

## Next step
Move task storage to PostgreSQL while preserving the API behavior with tests.
