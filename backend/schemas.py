from pydantic import BaseModel

# What we expect when someone creates a new task
class TaskCreate(BaseModel):
    title: str

# What we send back in the response
class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        from_attributes = True
