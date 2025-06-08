from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas 
from database import SessionLocal, engine



# to create the tables in todo.db
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    
    try:
        yield db
        
    finally:
        db.close()
        

@app.get("/")
def root():
    return {"message" : "its working"}

@app.get("/tasks", response_model=list[schemas.TaskResponse])
def read_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


@app.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(title=task.title)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.put("/tasks/{task_id}", response_model= schemas.TaskResponse)

def put_task(task_id: int, db : Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task.completed = not task.completed
    db.commit()
    db.refresh(task)
    return task


@app.delete("/tasks/{task_id}")

def delete_task(task_id : int, db : Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if task is None:
        raise HTTPException(status_code = 404, detail = "Task not found")
    db.delete(task)
    db.commit()
    db.refresh(task)
    return {"message" : "Task deleted"}