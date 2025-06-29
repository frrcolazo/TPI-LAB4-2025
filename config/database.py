from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+mysqlconnector://root:Ponquita123.@localhost:3306/proyecto_final"

engine = create_engine(DATABASE_URL)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_database_session():
    db = Session()
    try:
        yield db
    finally:
        db.close()
