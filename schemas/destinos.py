from pydantic import BaseModel, Field
from typing import Optional

class Destinos(BaseModel):
    id: Optional[int] = None
    nombre: str = Field(min_length=2, max_length=100)
    descripcion: str = Field(min_length=10, max_length=500)
    pais: str = Field(min_length=2, max_length=50)

    class Config:
        from_attributes = True  # <- Necesario para convertir ORM a JSON
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "nombre": "Buenos Aires",
                    "descripcion": "Descubre la vibrante capital argentina con sus barrios únicos, espectáculos de tango, asados tradicionales y rica vida cultural",
                    "pais": "Argentina"
                }
            ]
        }
<<<<<<< HEAD
#COMPLETAR GER
=======
>>>>>>> develop
