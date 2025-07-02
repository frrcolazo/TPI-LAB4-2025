from pydantic import BaseModel, Field
from typing import Optional

class Destinos(BaseModel):
    id: Optional[int] = None
    nombre: str = Field(min_length=2, max_length=100)
    descripcion: str = Field(min_length=10, max_length=500)
    pais: str = Field(min_length=2, max_length=50)
    
    # Nuevos campos
    categoria: str = Field(..., min_length=3, max_length=20)  # obligatoria
    imagen_url: Optional[str] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "examples": [
                {
                    "id": 1,
                    "nombre": "Buenos Aires",
                    "descripcion": "Capital argentina con historia y cultura.",
                    "pais": "Argentina",
                    "categoria": "ciudad",
                    "imagen_url": "buenos_aires.jpg"
                }
            ]
        }