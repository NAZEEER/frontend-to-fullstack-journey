from fastapi.testclient import TestClient
from main import app, tasks

client = TestClient(app)

def test_create_task():
    tasks.clear()

    response = client.post("/task", json={"title": "Test task"})

    assert response.status_code == 200
    assert response.json()["task"]["title"] == "Test task"
    assert response.json()["task"]["done"] is False

def test_missing_task_returns_404():
    tasks.clear()
    response = client.get("/tasks/999")
    assert response.status_code == 404


def test_empty_title_returns_422():
    response = client.post("/task", json={"title": ""})
    assert response.status_code == 422

def test_update_task_to_done():
    tasks.clear()
    client.post("/task", json={"title": "Test task"})

    response = client.patch("/tasks/0", json={"done": True})

    assert response.status_code == 200
    assert response.json()["task"]["done"] is True
    check = client.get("/tasks/0")
    assert check.json()["done"] is True


def test_delete_task():
    tasks.clear()
    client.post("/task", json={"title": "Test task"})

    response = client.delete("/tasks/0")
    assert response.status_code == 200
    assert response.json()["task"]["title"] == "Test task"

    check = client.get("/tasks/0")
    assert check.status_code == 404

def test_title_over_80_characters_returns_422():
    response = client.post("/task", json={"title": "x" * 81})
    assert response.status_code == 422

def test_title_of_80_characters_is_accepted():
    tasks.clear()
    title = "x" * 80
    response = client.post("/task", json={"title": title})

    assert response.status_code == 200
    assert response.json()["task"]["title"] == title

def test_update_missing_task_returns_404():
    tasks.clear()

    response = client.patch("/tasks/999", json={"done": True})

    assert response.status_code == 404