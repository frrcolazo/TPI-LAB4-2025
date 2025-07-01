<<<<<<< HEAD
from pydantic import (
    BaseModel,
    Field,
    PositiveInt,
    PositiveFloat,
)
=======
from pydantic import BaseModel, Field, EmailStr, PositiveInt, PositiveFloat
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
from typing import Optional, List
from datetime import date

from schemas.destinos import Destinos


class Paquetes(BaseModel):
    id: PositiveInt
    destino_id: PositiveInt
    nombre: str = Field(min_length=1)
    precio: PositiveFloat
<<<<<<< HEAD
    cupo: Optional[PositiveFloat] = None
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    destino: Optional[Destinos] = None

    class Config:
        from_attributes = True


class PaquetesPOST(BaseModel):
    destino_id: PositiveInt
    nombre: str = Field(min_length=1)
    precio: PositiveFloat
    cupo: Optional[PositiveFloat] = None
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "destino_id": 2,
                    "nombre": "Promo Verano 2025",
                    "precio": 1999.99,
                    "cupo": 20,
                    "fecha_inicio": "2025-12-15",
                    "fecha_fin": "2025-12-22",
                }
            ]
        }
=======
    cupo: Optional[PositiveFloat]
    fecha_inicio: Optional[date]
    fecha_fin: Optional[date]

    class Config:
        from_attributes = True
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
