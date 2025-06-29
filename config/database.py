from sqlalchemy import create_engine
import os
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_URL = "mysql+mysqlconnector://root:Ponquita123.@localhost:3306/proyecto_final"

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL no está definida en las variables de entorno")

engine = create_engine(DATABASE_URL)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_database_session():
    db = Session()
    try:
        yield db
    finally:
        db.close()
