from fastapi import APIRouter, Depends, Path, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from config.database import get_database_session
from fastapi.encoders import jsonable_encoder
from services.reservas import ReservasService
from schemas.reservas import Reservas

reservas_router = APIRouter()

@reservas_router.get('/reservas', tags=['Reservas'], response_model=List[Reservas], status_code=200)
def get_reservas(db = Depends(get_database_session)):
    result = ReservasService(db).get_reservas()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@reservas_router.get('/reservas/{id}', tags=['Reservas'], response_model=Reservas)
def get_reserva(id: int = Path(ge=1), db = Depends(get_database_session)):
    result = ReservasService(db).get_reserva(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrada"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@reservas_router.post('/reservas', tags=['Reservas'], response_model=dict, status_code=201)
def create_reserva(reserva: Reservas, db = Depends(get_database_session)):
    resultado = ReservasService(db).create_reserva(reserva)
    if resultado is False:
        return JSONResponse(status_code=400, content={"message": "No se puede reservar un paquete cuya fecha de inicio es anterior a la fecha de reserva"})
    return JSONResponse(status_code=201, content={"message": "Se ha creado la reserva"})

@reservas_router.put('/reservas/{id}', tags=['Reservas'], response_model=dict, status_code=200)
def update_reserva(id: int, reserva: Reservas, db = Depends(get_database_session)):
    result = ReservasService(db).get_reserva(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrada"})
    ReservasService(db).update_reserva(id, reserva)
    return JSONResponse(status_code=200, content={"message": "Se ha actualizado la reserva"})

@reservas_router.delete('/reservas/{id}', tags=['Reservas'], response_model=dict, status_code=200)
def delete_reserva(id: int, db = Depends(get_database_session)):
    result = ReservasService(db).get_reserva(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrada"})
    ReservasService(db).delete_reserva(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la reserva"})

@reservas_router.get('/reservas/activas/{usuario_id}', tags=['Reservas'], response_model=List[Reservas], status_code=200)
def get_reservas_activas_por_usuario(usuario_id: int, db = Depends(get_database_session)):
    result = ReservasService(db).get_reservas_activas_por_usuario(usuario_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No hay reservas activas para este usuario"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@reservas_router.get('/reservas/vencidas/{usuario_id}', tags=['Reservas'], response_model=List[Reservas], status_code=200)
def get_reservas_vencidas_por_usuario(usuario_id: int, db = Depends(get_database_session)):
    result = ReservasService(db).get_reservas_vencidas_por_usuario(usuario_id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No hay reservas vencidas para este usuario"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))