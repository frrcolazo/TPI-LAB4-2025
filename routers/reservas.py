from fastapi import APIRouter
from fastapi import Depends, Path, Query, HTTPException,UploadFile, File
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import get_database_session
from models.reservas import Reservas as ReservasModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.reservas import ReservasService
import os
import shutil
from services.reservas import ReservasService
from schemas.reservas import Reservas

reservas_router = APIRouter()

@reservas_router.get('/reservas', tags=['Reservas'], response_model=List[Reservas], status_code=200, dependencies=[Depends(JWTBearer())])
def get_reservass(db = Depends(get_database_session)) -> List[Reservas]:
    #db = Session()
    result = ReservasService(db).get_reservass()
    reservas_schemas = [Reservas.model_validate(reserva) for reserva in result]
    return reservas_schemas


@reservas_router.get('/reservas/{id}', tags=['Reservas'], response_model=Reservas)
def get_reservas(id: int = Path(ge=1, le=2000), db = Depends(get_database_session)):
    result = ReservasService(db).get_reservas(id)
    if not result:
        raise HTTPException(status_code=404, detail="No encontrado")
    return result


# --- Crear reserva ---
@reservas_router.post('/reservas', tags=['Reservas'], response_model=Reservas, status_code=201)
def create_reservas(reserva: Reservas, db=Depends(get_database_session)) -> Reservas:
    return ReservasService(db).create_reservas(reserva)


# --- Actualizar reserva ---
@reservas_router.put('/reservas/{id}', tags=['Reservas'], response_model=Reservas, status_code=200)
def update_reservas(id: int, reserva: Reservas, db=Depends(get_database_session)) -> Reservas:
    result = ReservasService(db).get_reservas(id)
    if not result:
        raise HTTPException(status_code=404, detail="No encontrado")
    return ReservasService(db).update_reservas(id, reserva)


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
    reservas_schemas = [Reservas.model_validate(reserva) for reserva in result]
    return reservas_schemas