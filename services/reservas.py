from sqlalchemy.orm import Session
from models.reservas import Reservas as ReservasModel
from schemas.reservas import Reservas, ReservasUpdate


class ReservasService():
    
    def __init__(self, db: Session) -> None:
        self.db = db
    def get_reservass(self) -> list[ReservasModel]:
        result = self.db.query(ReservasModel).all()
        return result

    def get_reservas(self, id):
        result = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        return result

    def create_reservas(self, reserva: Reservas):
        new_reserva = ReservasModel(**reserva.model_dump())
        self.db.add(new_reserva)
        self.db.commit()
        self.db.refresh(new_reserva)
        return new_reserva  # ✅ retorna el modelo

    def update_reservas(self, id, Reserva: Reservas):
        existing_reserva = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        if not existing_reserva:
            return None
        for key, value in Reserva.model_dump().items():
            setattr(existing_reserva, key, value)
        self.db.commit()
        return existing_reserva
    
    def delete_reservas(self, id) -> ReservasModel:
        existing_reserva = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        if not existing_reserva:
            raise ValueError("Reserva no encontrada")
        self.db.delete(existing_reserva)
        self.db.commit()
        return existing_reserva

    def get_reservas_by_usuario(self, idUsuario :int) -> list[ReservasModel]:
        result = self.db.query(ReservasModel).filter(ReservasModel.idUsuario == idUsuario).all()
        return result
    

    #COMPLETAR LO QUE FALTA FELI