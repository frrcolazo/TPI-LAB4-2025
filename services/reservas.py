from sqlalchemy.orm import Session
from models.reservas import Reservas as ReservasModel
from models.paquetes import Paquetes as PaquetesModel  
from schemas.reservas import Reservas
from datetime import date  

class ReservasService():
    
    def __init__(self, db: Session) -> None:
        self.db = db
    def get_reservass(self) -> list[ReservasModel]:
        result = self.db.query(ReservasModel).all()
        return result
    def get_total_reservas_activas(self) -> int:
        return self.db.query(ReservasModel).filter(ReservasModel.estado == True).count()
    def get_reservas(self, id):
        result = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        return result

    def create_reservas(self, reserva: Reservas):
        # Validar paquete existe
        paquete = self.db.query(PaquetesModel).filter(PaquetesModel.id == reserva.idPaquete).first()
        if not paquete:
            raise ValueError("Paquete no encontrado")

        hoy = date.today()

        # Validar que la reserva es para hoy
        if reserva.fecha_reserva != hoy:
            raise ValueError("La fecha de reserva solo puede ser hoy")

        # Validar que la fecha de reserva no es posterior al inicio del paquete
        if reserva.fecha_reserva > paquete.fecha_inicio:
            raise ValueError("La fecha de reserva no puede ser posterior al inicio del paquete")

        # Validar disponibilidad de cupo
        reservas_existentes = self.db.query(ReservasModel).filter(
            ReservasModel.idPaquete == reserva.idPaquete,
            ReservasModel.fecha_reserva == reserva.fecha_reserva
        ).all()

        personas_reservadas = sum(r.cantidad_personas for r in reservas_existentes)
        cupo_disponible = paquete.cupo - personas_reservadas

        if reserva.cantidad_personas > cupo_disponible:
            raise ValueError(f"No hay cupo suficiente. Cupo disponible: {cupo_disponible}")

        # Crear reserva
        new_reserva = ReservasModel(**reserva.model_dump())
        self.db.add(new_reserva)
        self.db.commit()
        self.db.refresh(new_reserva)
        return new_reserva


    from datetime import date

    def update_reservas(self, id, reserva: Reservas):
        existing_reserva = self.db.query(ReservasModel).filter(ReservasModel.id == id).first()
        if not existing_reserva:
            return None

        paquete = self.db.query(PaquetesModel).filter(PaquetesModel.id == reserva.idPaquete).first()
        if not paquete:
            raise ValueError("Paquete no encontrado")

        hoy = date.today()

        # Validar que la modificacion de la reserva es para hoy
        if reserva.fecha_reserva != hoy:
            raise ValueError("La fecha de reserva solo puede ser hoy")

        # Validar que la fecha de reserva no es posterior al inicio del paquete
        if reserva.fecha_reserva > paquete.fecha_inicio:
            raise ValueError("La fecha de reserva no puede ser posterior al inicio del paquete")

        # Validar disponibilidad de cupo (excluyendo la reserva que se está actualizando)
        reservas_existentes = self.db.query(ReservasModel).filter(
            ReservasModel.idPaquete == reserva.idPaquete,
            ReservasModel.fecha_reserva == reserva.fecha_reserva,
            ReservasModel.id != id
        ).all()

        personas_reservadas = sum(r.cantidad_personas for r in reservas_existentes)
        cupo_disponible = paquete.cupo - personas_reservadas 

        if reserva.cantidad_personas > cupo_disponible:
            raise ValueError(f"No hay cupo suficiente. Cupo disponible: {cupo_disponible}")

        # Actualizar campos
        for key, value in reserva.model_dump().items():
            setattr(existing_reserva, key, value)

        self.db.commit()
        self.db.refresh(existing_reserva)
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
    
    def get_reservas_activas_by_usuario(self, idUsuario :int) -> list[ReservasModel]:
        result = self.db.query(ReservasModel).filter(ReservasModel.idUsuario == idUsuario, ReservasModel.estado == True).all()
        return result
    #COMPLETAR LO QUE FALTA FELI