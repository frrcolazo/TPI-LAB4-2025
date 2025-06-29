from pydantic import BaseModel, Field, EmailStr, PositiveInt, PositiveFloat
from typing import Optional, List
from datetime import date

from schemas.destinos import Destinos


class Paquetes(BaseModel):
    id: Optional[PositiveInt] = None
    destino_id: Optional[PositiveInt]
    nombre: str = Field(min_length=1)
    precio: PositiveFloat
    cupo: Optional[PositiveFloat]
    fecha_inicio: Optional[date]
    fecha_fin: Optional[date]
    destino: Optional[Destinos]

    class Config:
        from_attributes = True
