from config.database import Base
from sqlalchemy import Column, Float, Integer, Boolean, ForeignKey, Date, String
from sqlalchemy.orm import relationship


class Paquetes(Base):

    __tablename__ = "paquetes"

    id = Column(Integer, primary_key=True)
    destino_id = Column(Integer, ForeignKey("destinos.id"), nullable=False)
    nombre = Column(String(50), nullable=False)
    precio = Column(Float, nullable=False)
    cupo = Column(Integer)
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    destino = relationship("Destinos", backref="paquetes", lazy="select")
