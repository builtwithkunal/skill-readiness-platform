from fastapi import FastAPI
from app.api.routes.skills import router as skill_router
from app.api.routes.roles import router as role_router
from app.api.routes.users import router as user_router
from app.db import database

app = FastAPI(title="Skill Readiness Platform")

app.include_router(skill_router)

app.include_router(role_router)

app.include_router(user_router)

@app.get("/health")
def health_check():
    return {"status": "OK"}