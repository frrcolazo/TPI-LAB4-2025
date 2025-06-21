from config.database import Base
from sqlalchemy import Column, Integer, String, Float



class Destinos(Base):

    __tablename__ = "destinos"

    id  = Column(Integer, primary_key = True)

#COMPLETAR LO QUE FALTA GER