from models.reservas import Reservas as ReservasModel
from schemas.reservas import Reservas


class ReservasService():
    
    def __init__(self, db) -> None:
        self.db = db
    def get_reservass(self):
        result = self.db.query(ReservasModel).all()
        return result

    def get_reservas(self, id):
        result = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        return result

    def create_reservas(self, reserva: Reservas):
        new_reserva = ReservasModel(
            idUsuario=reserva.idUsuario,
            idPaquete=reserva.idPaquete,
            cantidad_personas=reserva.cantidad_personas,
            fecha_reserva=reserva.fecha_reserva,
            estado=reserva.estado if reserva.estado is not None else True  # Default to True if not provided
        )
        self.db.add(new_reserva)
        self.db.commit()
        self.db.refresh(new_reserva)
        return new_reserva
    
    def update_reservas(self, id, reserva: Reservas):
        existing_reserva = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        if not existing_reserva:
            return None
        existing_reserva.idUsuario = reserva.idUsuario
        existing_reserva.idPaquete = reserva.idPaquete
        existing_reserva.cantidad_personas = reserva.cantidad_personas
        existing_reserva.fecha_reserva = reserva.fecha_reserva
        existing_reserva.estado = reserva.estado if reserva.estado is not None else existing_reserva.estado
        self.db.add(existing_reserva)
        self.db.commit()
        self.db.refresh(existing_reserva)
        return existing_reserva
    
    def delete_reservas(self, id):
        existing_reserva = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        if not existing_reserva:
            return None
        self.db.delete(existing_reserva)
        self.db.commit()
        return existing_reserva

    def get_reservas_by_usuario(self, idUsuario):
        result = self.db.query(ReservasModel).filter(ReservasModel.idUsuario == idUsuario).all()
        return result
    

    #COMPLETAR LO QUE FALTA FELI