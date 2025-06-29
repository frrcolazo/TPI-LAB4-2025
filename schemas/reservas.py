from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class Reservas(BaseModel):
    id: Optional[int] = None
    usuario_id: int
    paquete_id: int
    fecha_reserva: date
    cantidad_personas: int = Field(gt=0)

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "usuario_id": 2,
                    "paquete_id": 3,
                    "fecha_reserva": "2025-06-28",
                    "cantidad_personas": 4
                }
            ]
        }

