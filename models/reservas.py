from config.database import Base
from sqlalchemy import Column, Integer, Date, ForeignKey

class Reservas(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    paquete_id = Column(Integer, ForeignKey("paquetes.id"), nullable=False)
    fecha_reserva = Column(Date, nullable=False)
    cantidad_personas = Column(Integer, nullable=False)

    class Config:
        orm_mode = True
