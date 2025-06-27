from sqlalchemy import update
from sqlalchemy.orm import Session
from models.paquetes import Paquetes as PaquetesModel
from schemas.paquetes import Paquetes


class PaquetesService:

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_paquetes(self):
        result = self.db.query(PaquetesModel).all()
        return result

    def get_paquete(self, id):
        result = self.db.query(PaquetesModel).filter(PaquetesModel.id == id).first()
        return result

    def get_paquetes_by_destino(self, destino):
        result = (
            self.db.query(PaquetesModel)
            .filter(PaquetesModel.destino.nombre == destino)
            .all()
        )
        return result

    def create_paquetes(self, Paquete: Paquetes):
        new_paquete = PaquetesModel(**Paquete.model_dump())
        self.db.add(new_paquete)
        self.db.commit()
        return

    def update_paquetes(self, id: int, data: Paquetes) -> bool:
        query = (
            update(PaquetesModel)
            .where(PaquetesModel.id == id)
            .values(data.model_dump())
        )
        updated = self.db.execute(query)
        self.db.commit()
        return updated.rowcount > 0

    def delete_paquetes(self, id: int) -> bool:
        deleted = self.db.query(PaquetesModel).filter(PaquetesModel.id == id).delete()
        self.db.commit()
        return deleted > 0
