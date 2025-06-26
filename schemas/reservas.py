from pydantic import BaseModel, Field, PositiveInt, PastDate
from typing import Optional, List


class Reservas(BaseModel):
    id: Optional[int] = None
    idUsuario=Optional[PositiveInt]
    idPaquete= Optional[PositiveInt]
    cantidad_personas= Optional[PositiveInt]
    fecha_reserva= Optional[PastDate]
#COMPLETAR FELI