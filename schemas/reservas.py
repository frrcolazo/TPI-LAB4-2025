from pydantic import BaseModel, Field
from typing import Optional, List


class Reservas(BaseModel):
    id: Optional[int] = None

#COMPLETAR FELI