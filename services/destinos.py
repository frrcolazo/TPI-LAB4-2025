from models.destinos import Destinos as DestinosModel
from schemas.destinos import Destinos

class DestinosService():
    
    def __init__(self, db) -> None:
        self.db = db
    
    def get_destinos(self):
        result = self.db.query(DestinosModel).all()
        return result
    
    def get_destino(self, id):
        result = self.db.query(DestinosModel).filter(DestinosModel.id == id).first()
        return result
    
    def get_destino_by_nombre(self, nombre):
        nombre = nombre.strip()
        return self.db.query(DestinosModel).filter(DestinosModel.nombre.ilike(nombre)).first()

    def get_destinos_by_filtros(self, nombre=None, pais=None):
        query = self.db.query(DestinosModel)
        if nombre:
            query = query.filter(DestinosModel.nombre.ilike(f"%{nombre}%"))
        if pais:
            query = query.filter(DestinosModel.pais.ilike(f"%{pais}%"))
        return query.all()
    
    def create_destino(self, destino: Destinos):
        new_destino = DestinosModel(**destino.model_dump())
        self.db.add(new_destino)
        self.db.commit()
        return
    
    def update_destino(self, id: int, data: Destinos):
        destino = self.db.query(DestinosModel).filter(DestinosModel.id == id).first()
        destino.nombre = data.nombre
        destino.descripcion = data.descripcion
        destino.pais = data.pais
        self.db.commit()
        return
    
    def delete_destino(self, id: int):
        self.db.query(DestinosModel).filter(DestinosModel.id == id).delete()
        self.db.commit()
        return