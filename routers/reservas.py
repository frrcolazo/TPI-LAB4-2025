from fastapi import APIRouter
from fastapi import Depends, Path, Query, HTTPException,UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
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
from schemas.reservas import Reservas, ReservasUpdate

reservas_router = APIRouter()

@reservas_router.get('/reservas', tags=['Reservas'], response_model=List[Reservas], status_code=200, dependencies=[Depends(JWTBearer())])
def get_reservass(db = Depends(get_database_session)) -> List[Reservas]:
    #db = Session()
    result = ReservasService(db).get_ventass()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@reservas_router.get('/reservas/{id}', tags=['Reservas'], response_model=Reservas)
def get_reservas(id: int = Path(ge=1, le=2000), db = Depends(get_database_session)) -> Reservas:
    #db = Session()
    result = ReservasService(db).get_reservas(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})


@reservas_router.post('/reservas', tags=['Reservas'], response_model=dict, status_code=201)
def create_reservas(reserva: Reservas, db = Depends(get_database_session)) -> dict:
    #db = Session()
    ReservasService(db).create_reservas(reserva)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado la reserva"})


@reservas_router.put('/reservas/{id}', tags=['Reservas'], response_model=dict, status_code=200)
def update_reservas(id: int, Ventas:  ReservasUpdate, db = Depends(get_database_session))-> dict:
    #db = Session()
    result = ReservasService(db).get_reservas(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    ReservasService(db).update_reservas(id, Ventas)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado la reserva"})


@reservas_router.delete('/reservas/{id}', tags=['Reservas'], response_model=dict, status_code=200)
def delete_reservas(id: int, db = Depends(get_database_session))-> dict:
    #db = Session()
    result:ReservasModel = db.query(ReservasModel).filter(ReservasModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    ReservasService(db).delete_ventas(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la reserva"})

@reservas_router.get('/reservas/usuario/{idUsuario}', tags=['Reservas'], response_model=List[Reservas], status_code=200, dependencies=[Depends(JWTBearer())])
def get_reservas_by_usuario(idUsuario: int = Path(ge=1, le=2000), db = Depends(get_database_session)) -> List[Reservas]:
    #db = Session()
    result = ReservasService(db).get_reservas_by_usuario(idUsuario)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

#COMPLETAR FELI