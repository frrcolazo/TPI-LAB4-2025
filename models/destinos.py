from config.database import Base
from sqlalchemy import Column, Integer, String



class Destinos(Base):

    __tablename__ = "destinos"

    id  = Column(Integer, primary_key = True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(500), nullable=False)
<<<<<<< HEAD
    pais = Column(String(50), nullable=False)
#COMPLETAR LO QUE FALTA GER
=======
    pais = Column(String(50), nullable=False)
>>>>>>> develop
