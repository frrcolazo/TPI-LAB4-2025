from config.database import Base
from sqlalchemy import Column, Integer, String, Float, Text

class Usuarios(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key = True)
    apellido = Column(String(20))
    nombre= Column(String(20))
    correo= Column(String(100))
    password=Column(String(1000))
    role= Column(String(50))

