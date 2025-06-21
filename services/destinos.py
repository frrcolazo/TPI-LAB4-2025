from models.destinos import Destinos as DestinosModel
from schemas.destinos import Destinos
from sqlalchemy import  func

class DestinosService():
    
    def __init__(self, db) -> None:
        self.db = db

#COMPLETAR GER