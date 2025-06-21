from models.paquetes import Paquetes as PaquetesModel
from schemas.paquetes import Paquetes


class PaquetesService():
    
    def __init__(self, db) -> None:
        self.db = db

#COMPLETAR BENJA