from config.database import Base
from sqlalchemy import Column, Integer, Boolean, ForeignKey, Date
from sqlalchemy.orm import relationship

class Paquetes(Base):

    __tablename__ = "paquetes"
    
    id= Column(Integer, primary_key=True)
#COMPLETAR LO QUE FALTA BENJA
