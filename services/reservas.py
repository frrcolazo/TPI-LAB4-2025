from models.reservas import Reservas as ReservasModel
from schemas.reservas import Reservas


class ReservasService():
    
    def __init__(self, db) -> None:
        self.db = db

#COMPLETAR FELI