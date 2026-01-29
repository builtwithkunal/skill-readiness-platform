from fastapi import FastAPI
from app.db import database

app = FastAPI(title="Skill Readiness Platform")


@app.get("/health")
def health_check():
    return {"status": "OK"}