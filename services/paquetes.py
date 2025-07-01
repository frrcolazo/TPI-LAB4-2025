from sqlalchemy import func, select, update
from sqlalchemy.orm import Session
from models.paquetes import Paquetes as PaquetesModel
from models.destinos import Destinos as DestinosModel
from models.reservas import Reservas as ReservasModel
from schemas.paquetes import Paquetes, PaquetesPOST


class PaquetesService:

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_paquetes(self):
        result = self.db.query(PaquetesModel).all()
        return result

    def get_paquete(self, id):
        result = self.db.query(PaquetesModel).filter(PaquetesModel.id == id).first()
        return result

<<<<<<< HEAD
    def get_paquete_mas_reservado(self):

        query = (
            select(ReservasModel.idPaquete, func.count())
            .group_by(ReservasModel.idPaquete)
            .order_by(func.count().desc())
            .limit(1)
        )
        result = self.db.execute(query).first()
        if not result:
            return
        id_paquete: int = result[0]
        return self.get_paquete(id_paquete)

    def get_paquetes_by_destino(self, destino):
=======
    def get_paquetes_by_destino(self, destino: str):
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
        result = (
            self.db.query(PaquetesModel)
            .filter(PaquetesModel.destino.nombre == destino)
            .all()
        )
        return result

    def create_paquetes(self, Paquete: PaquetesPOST):
        new_paquete = PaquetesModel(**Paquete.model_dump(exclude_none=True))
        self.db.add(new_paquete)
        self.db.commit()
        return

<<<<<<< HEAD
    def update_paquetes(self, id: int, data: PaquetesPOST) -> bool:
=======
    def update_paquetes(self, id: int, data: Paquetes) -> bool:
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
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
<<<<<<< HEAD
        return deleted > 0
=======
        return deleted > 0
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
