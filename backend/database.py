# database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# connecting to the todo.db file in the same folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./todo.db"

# Create the engine to interact with the database
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session factory — we’ll use this to interact with the DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
