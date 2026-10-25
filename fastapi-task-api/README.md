# FastAPI Task API

A small in-memory task API built while learning Python, FastAPI, validation, HTTP status codes, and API testing.

## Run the tests

Install FastAPI, Pydantic, pytest, and HTTPX in your Python environment, then run:

```powershell
py -m pytest -q
```

Run the development server from this folder with:

```powershell
py -m uvicorn main:app --reload
```

The tasks are stored in memory, so they reset when the server restarts.
