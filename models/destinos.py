from config.database import Base
from sqlalchemy import Column, Integer, String



class Destinos(Base):
    __tablename__ = "destinos"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(500), nullable=False)
    pais = Column(String(50), nullable=False)
    
    # Nuevos campos
    categoria = Column(String(20), nullable=False)  # 'playa', 'nieve', 'ciudad'
    imagen_url = Column(String(255), nullable=True) # puede ser null por defecto