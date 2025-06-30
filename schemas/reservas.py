from pydantic import BaseModel, Field, PositiveInt, PastDate
from typing import Optional, List
from datetime import date


class Reservas(BaseModel):
    id: Optional[int] = None
    idUsuario:Optional[PositiveInt]
    idPaquete: Optional[PositiveInt]
    cantidad_personas: Optional[PositiveInt]
    fecha_reserva: Optional[date]
    estado: bool = Field(default=True, description="Estado de la reserva, True si está activa, False si está cancelada")

class ReservasUpdate(BaseModel):
    idUsuario: Optional[PositiveInt] = None
    idPaquete: Optional[PositiveInt] = None
    cantidad_personas: Optional[PositiveInt] = None
    fecha_reserva: Optional[date] = None
    estado: Optional[bool] = None

class Config:
    from_attributes = True
    schema_extra = {
        "example": {
            "idUsuario": 1,
            "idPaquete": 2,
            "cantidad_personas": 4,
            "fecha_reserva": "2023-10-01",
            "estado": True
        }
    }  
    
#COMPLETAR FELI