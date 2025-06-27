from pydantic import BaseModel, Field, EmailStr, PastDate, PositiveInt, PositiveFloat
from typing import Optional, List
from datetime import date


class Paquetes(BaseModel):
    id: Optional[PositiveInt] = None
    destino_id: Optional[PositiveInt]
    nombre: str = Field(min_length=1)
    precio: PositiveFloat
    cupo: Optional[PositiveFloat]
    fecha_inicio: Optional[PastDate]
    fecha_fin: Optional[PastDate]

    class Config:
        from_attributes = True
