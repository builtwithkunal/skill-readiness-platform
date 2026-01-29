from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://root:Kunalkunal01@localhost/skill_readiness_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)