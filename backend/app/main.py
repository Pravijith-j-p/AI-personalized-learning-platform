from fastapi import FastAPI
from .import models
from .database import engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-Powered Personalized Learning Platform")

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered Personalized Learning Platform!"}
