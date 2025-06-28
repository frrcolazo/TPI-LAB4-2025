from models.reservas import Reservas as ReservasModel
from schemas.reservas import Reservas
from datetime import date
from models.paquetes import Paquetes as PaquetesModel
class ReservasService():

    def __init__(self, db) -> None:
        self.db = db

    def get_reservas(self):
        return self.db.query(ReservasModel).all()

    def get_reserva(self, id: int):
        return self.db.query(ReservasModel).filter(ReservasModel.id == id).first()

    def create_reserva(self, reserva: Reservas):
        paquete = self.db.query(PaquetesModel).filter(PaquetesModel.id == reserva.paquete_id).first()
        if paquete.fecha_inicio < reserva.fecha_reserva:
            return False
        new_reserva = ReservasModel(**reserva.model_dump())
        self.db.add(new_reserva)
        self.db.commit()
        return True

    def update_reserva(self, id: int, data: Reservas):
        reserva = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        if reserva:
            reserva.usuario_id = data.usuario_id
            reserva.paquete_id = data.paquete_id
            reserva.fecha_reserva = data.fecha_reserva
            reserva.cantidad_personas = data.cantidad_personas
            self.db.commit()
        return

    def delete_reserva(self, id: int):
        self.db.query(ReservasModel).filter(ReservasModel.id == id).delete()
        self.db.commit()
        return

    def get_reservas_activas_por_usuario(self, usuario_id: int):
        today = date.today()
        query = (
            self.db.query(ReservasModel)
            .join(PaquetesModel, ReservasModel.paquete_id == PaquetesModel.id)
            .filter(
                ReservasModel.usuario_id == usuario_id,
                PaquetesModel.fecha_fin >= today
            )
        )
        return query.all()
    
    def get_reservas_vencidas_por_usuario(self, usuario_id: int):
        today = date.today()
        query = (
            self.db.query(ReservasModel)
            .join(PaquetesModel, ReservasModel.paquete_id == PaquetesModel.id)
            .filter(
                ReservasModel.usuario_id == usuario_id,
                PaquetesModel.fecha_fin < today
            )
        )
        return query.all()