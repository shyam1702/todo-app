from database import engine, Base
from models import Task

Base.metadata.create_all(bind=engine)
print("Tables created!")
