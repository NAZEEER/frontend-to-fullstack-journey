# FastAPI Task API

A small in-memory task API built while learning Python, FastAPI, validation, HTTP status codes, and API testing.

## Setup

From this folder, install the project dependencies with:

```powershell
py -m pip install -r requirements.txt
```

The dependency list is in `requirements.txt`.

## Run the tests

After installing the dependencies, run:

```powershell
py -m pytest -q
```

Run the development server from this folder with:

```powershell
py -m uvicorn main:app --reload
```

The tasks are stored in memory, so they reset when the server restarts.
