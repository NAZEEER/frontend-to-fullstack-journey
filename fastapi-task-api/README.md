# FastAPI Task API

A small in-memory task-management API built while learning Python, FastAPI, request validation, HTTP status codes, and API testing.

## Features

- Health check endpoint at `GET /health`.
- Create tasks with `POST /task`.
- List tasks with `GET /tasks`.
- Read one task with `GET /tasks/{task_id}`.
- Update task completion state with `PATCH /tasks/{task_id}`.
- Delete tasks with `DELETE /tasks/{task_id}`.
- Validates task titles with Pydantic: required, 1 to 80 characters.
- Returns HTTP 404 for missing task IDs and HTTP 422 for invalid request data.
- Includes automated tests using pytest and FastAPI `TestClient`.
- Stores tasks in memory, so data resets when the server restarts.

## Tech Stack

- Python
- FastAPI
- Pydantic
- Uvicorn
- pytest
- HTTPX
- FastAPI `TestClient`

## Project Structure

```text
fastapi-task-api/
  main.py
  test_main.py
  requirements.txt
  README.md
```

## Setup

From the `fastapi-task-api` directory:

```powershell
py -m pip install -r requirements.txt
```

## Run the Tests

```powershell
py -m pytest -q
```

## Run the Development Server

```powershell
py -m uvicorn main:app --reload
```

FastAPI's interactive documentation is then available at:

- `http://127.0.0.1:8000/docs`
- `http://127.0.0.1:8000/redoc`

## Implementation Notes

The API keeps tasks in a module-level list. `Task` validates the title and default completion state, while `TaskUpdate` validates completion changes. Route handlers check task IDs before reading, updating, or deleting records and raise `HTTPException` with a 404 status when a task does not exist.

The test file covers task creation, missing-task errors, empty and overlong titles, valid title length, updates, and deletion behavior.

## Screenshot and Demo

<!-- Screenshot placeholder: add a screenshot of the `/docs` interface after running the verified setup commands locally. -->

Live API demo: `[Add deployed URL only if one is available]`

