from models.usuarios import Usuarios as UsuariosModel
from schemas.usuarios import Usuarios
from models.reservas import Reservas as ReservasModel
from models.paquetes import Paquetes as PaquetesModel
from models.destinos import Destinos as DestinosModel
from datetime import date
from sqlalchemy import func, desc


class UsuariosService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_usuarios(self):
        result = self.db.query(UsuariosModel).all()
        return result

    def get_usuario(self, id):
        result = self.db.query(UsuariosModel).filter(UsuariosModel.id == id).first()
        return result

    def get_usuarios_by_mail(self, correo):
        result = self.db.query(UsuariosModel).filter(UsuariosModel.correo == correo).all()
        return result
    
    def get_usuarios_by_mail_first(self, correo):
        result = self.db.query(UsuariosModel).filter(UsuariosModel.correo == correo).first()
        return result

    def create_usuarios(self, Usuario: Usuarios):
        new_producto = UsuariosModel(**Usuario.model_dump() )
        self.db.add(new_producto)
        self.db.commit()
        return
    def update_usuarios(self, id: int, data: Usuarios):
        usuario = self.db.query(UsuariosModel).filter(UsuariosModel.id == id).first()
        usuario.apellido  = data.apellido
        usuario.nombre = data.nombre
        usuario.correo = data.correo
        usuario.password = data.password
        usuario.role = data.role
        self.db.commit()
        return

    def delete_usuarios(self, id: int):
       self.db.query(UsuariosModel).filter(UsuariosModel.id == id).delete()
       self.db.commit()
       return

    def get_usuario_con_mas_reservas(self):
        query = (
            self.db.query(
                UsuariosModel.id,
                UsuariosModel.nombre,
                UsuariosModel.apellido,
                func.count(ReservasModel.id).label("cantidad_reservas")
            )
            .join(ReservasModel, UsuariosModel.id == ReservasModel.idUsuario)
            .group_by(UsuariosModel.id, UsuariosModel.nombre)
            .order_by(desc("cantidad_reservas"))
            .limit(1)
        )
        return query.first()
    
    def get_historial_viajes_por_usuario(self, usuario_id: int):
        query = (
            self.db.query(
                UsuariosModel.id.label("usuario_id"),
                UsuariosModel.nombre,
                UsuariosModel.apellido,
                PaquetesModel.nombre.label("paquete_nombre"),
                DestinosModel.nombre.label("destino_nombre"),
                PaquetesModel.fecha_inicio,
                PaquetesModel.fecha_fin,
                ReservasModel.fecha_reserva,
                ReservasModel.cantidad_personas
            )
            .join(ReservasModel, UsuariosModel.id == ReservasModel.idUsuario)
            .join(PaquetesModel, ReservasModel.idPaquete == PaquetesModel.id)
            .join(DestinosModel, PaquetesModel.destino_id == DestinosModel.id)
            .filter(UsuariosModel.id == usuario_id)
            .order_by(ReservasModel.fecha_reserva.desc())
        )
        results = query.all()
        historial = []
        for row in results:
            historial.append({
                "usuario_id": row.usuario_id,
                "nombre": row.nombre,
                "apellido": row.apellido,
                "paquete_nombre": row.paquete_nombre,
                "destino_nombre": row.destino_nombre,
                "fecha_inicio": row.fecha_inicio,
                "fecha_fin": row.fecha_fin,
                "fecha_reserva": row.fecha_reserva,
                "cantidad_personas": row.cantidad_personas,
            })
        return historial