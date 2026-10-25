from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()

tasks=[]

class Task(BaseModel):
    title: str = Field(min_length=1, max_length=80)
    done: bool = False

class TaskUpdate(BaseModel):
    done: bool

@app.get("/health")
def health():
    return {"status":"ok"}



@app.post("/task")
def create_task(task: Task):
    tasks.append(task)
    return{"message":"Task created","total_task":len(tasks),"task":task}

@app.get("/tasks")
def get_tasks():
    return{"tasks":tasks}   

@app.get("/tasks/{task_id}")
def get_task(task_id:int):
    if task_id < 0 or task_id >= len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")

    return tasks[task_id]  

# @app.delete("/tasks/{task_id}")
# def delete_task(task_id:int):
#     if task_id < 0 or task_id >= len(tasks):
#         raise HTTPException(status_code=404, detail = "Task not found")
    
#     delete_task= task.pop(task_id)
#     return{
#         "message": "task deleted",
#         "task": delete_task
#     }
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    if task_id < 0 or task_id >= len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")

    deleted_task = tasks.pop(task_id)
    return {
        "message": "Task deleted",
        "task": deleted_task
    }

# @app.patch("/task/{task_id}")
# def update_task(task_id: int ,update: TaskUpdate):
#     if task_id < 0 or task_id >= len(tasks):
#         raise HTTPException(status_code=404, detail="Task not found")

#     tasks[task_id].done = update.done
#     return {"message": "Task updated","task":tasks[task_id]}
@app.patch("/tasks/{task_id}")
def update_task(task_id: int, update: TaskUpdate):
    if task_id < 0 or task_id >= len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")

    tasks[task_id].done = update.done
    return {"message": "Task updated", "task": tasks[task_id]}