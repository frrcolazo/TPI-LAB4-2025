from config.database import Base
from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, Text
from sqlalchemy.orm import relationship


class Reservas(Base):

    __tablename__ = "reservas"

    id = Column(Integer, primary_key = True)
#COMPLETAR LO QUE FALTA FELI



