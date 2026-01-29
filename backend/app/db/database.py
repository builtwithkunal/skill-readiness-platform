from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://root:Kunalkunal01@localhost/skill_readiness_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

from app.models.base import Base
from app.models.user import User
from app.models.skill import Skill
from app.models.role import Role
from app.models.user_skill_score import UserSkillScore
from app.models.resume_skill import ResumeSkill

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()