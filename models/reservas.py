from config.database import Base
from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, Text, Date
from sqlalchemy.orm import relationship


class Reservas(Base):

    __tablename__ = "reservas"

    id = Column(Integer, primary_key = True)
    idUsuario=Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    idPaquete= Column(Integer, ForeignKey('paquetes.id'), nullable=False)
    cantidad_personas= Column(Integer)
    fecha_reserva= Column(Date)
#COMPLETAR LO QUE FALTA FELI



