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

    def get_paquetes_by_mail(self, correo):
        result = (
            self.db.query(PaquetesModel).filter(PaquetesModel.correo == correo).all()
        )
        return result

    def get_paquetes_by_mail_first(self, correo):
        result = (
            self.db.query(PaquetesModel).filter(PaquetesModel.correo == correo).first()
        )
        return result

    def create_paquetes(self, Paquete: Paquetes):
        new_producto = PaquetesModel(**Paquete.model_dump())
        self.db.add(new_producto)
        self.db.commit()
        return

    def update_paquetes(self, id: int, data: Paquetes):
        query = (
            update(PaquetesModel)
            .where(PaquetesModel.id == id)
            .values(data.model_dump())
        )
        self.db.execute(query)
        self.db.commit()
        return

    def delete_paquetes(self, id: int):
        self.db.query(PaquetesModel).filter(PaquetesModel.id == id).delete()
        self.db.commit()
        return
