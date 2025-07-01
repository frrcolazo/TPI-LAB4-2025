from fastapi import APIRouter
from fastapi import Depends, Path, Query, HTTPException,UploadFile, File
from pydantic import BaseModel, Field
from typing import List
from config.database import get_database_session
from models.reservas import Reservas as ReservasModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from routers.usuarios import get_user_actual
from schemas.usuarios import Usuarios
from services.reservas import ReservasService
import os
import shutil
from services.reservas import ReservasService
from schemas.reservas import Reservas, ReservasUpdate

reservas_router = APIRouter()

@reservas_router.get('/reservas', tags=['Reservas'], response_model=List[Reservas], status_code=200, dependencies=[Depends(JWTBearer())])
def get_reservass(db = Depends(get_database_session)) -> List[Reservas]:
    #db = Session()
    result = ReservasService(db).get_reservass()
    reservas_schemas = [Reservas.model_validate(reserva, from_attributes=True) for reserva in result]
    return reservas_schemas

@reservas_router.get('/reservas/activas/total',tags=['Reservas'],response_model=dict,status_code=200)
def get_total_reservas_activas(db = Depends(get_database_session)) -> dict:
    total = ReservasService(db).get_total_reservas_activas()
    return {"total_reservas_activas": total}

@reservas_router.get('/reservas/{id}', tags=['Reservas'], response_model=Reservas)
def get_reservas(id: int = Path(ge=1, le=2000), db = Depends(get_database_session)):
    result = ReservasService(db).get_reservas(id)
    if not result:
        raise HTTPException(status_code=404, detail="No encontrado")
    return result


# --- Crear reserva ---
@reservas_router.post('/reservas', tags=['Reservas'], response_model=Reservas, status_code=201)
def create_reservas(reserva: Reservas, db=Depends(get_database_session)) -> Reservas:
    try:
        return ReservasService(db).create_reservas(reserva)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))



# --- Actualizar reserva ---
@reservas_router.put('/reservas/{id}', tags=['Reservas'], response_model=Reservas, status_code=200)
def update_reservas(id: int, reserva: ReservasUpdate, db=Depends(get_database_session)) -> Reservas:
    result = ReservasService(db).get_reservas(id)
    if not result:
        raise HTTPException(status_code=404, detail="No encontrado")
    try:
        return ReservasService(db).update_reservas(id, reserva)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))



# --- Eliminar reserva ---
@reservas_router.delete('/reservas/{id}', tags=['Reservas'], response_model=Reservas, status_code=200)
def delete_reservas(id: int, db=Depends(get_database_session)) -> Reservas:
    try:
        result = ReservasService(db).delete_reservas(id)
    except ValueError:
        raise HTTPException(status_code=404, detail="No se encontró")
    return Reservas.model_validate(result)


# --- Obtener reservas por usuario ---
@reservas_router.get('/reservas/usuario/{idUsuario}', tags=['Reservas'], response_model=List[Reservas], status_code=200, dependencies=[Depends(JWTBearer())])
def get_reservas_by_usuario(idUsuario: int = Path(ge=1, le=2000), db=Depends(get_database_session)) -> List[Reservas]:
    result = ReservasService(db).get_reservas_by_usuario(idUsuario)
    if not result:
        raise HTTPException(status_code=404, detail="No encontrado")
    reservas_schemas = [Reservas.model_validate(reserva, from_attributes=True) for reserva in result]

    return reservas_schemas

# --- Obtener reservas por usuario ---
@reservas_router.get('/reservas/propias/activas', tags=['Reservas'], response_model=List[Reservas], status_code=200)
def get_reservas_by_usuario_activo(usuario: Usuarios = Depends(get_user_actual), db=Depends(get_database_session)) -> List[Reservas]:
    if not usuario.id:
        raise HTTPException(status_code=404, detail="Usuario no valido")
    result = ReservasService(db).get_reservas_activas_by_usuario(usuario.id)
    reservas_schemas = [Reservas.model_validate(reserva, from_attributes=True) for reserva in result]

    return reservas_schemas