from fastapi import APIRouter
from fastapi import Depends, Path, Query, HTTPException, status, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import get_database_session
from models.paquetes import Paquetes as PaquetesModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.paquetes import PaquetesService
from schemas.paquetes import Paquetes, PaquetesPOST

paquetes_router = APIRouter()


@paquetes_router.get(
    "/paquetes",
    tags=["Paquetes"],
    status_code=200,
    response_model=list[Paquetes],
)
def get_paquetes(db=Depends(get_database_session)):
    result = PaquetesService(db).get_paquetes()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@paquetes_router.get(
    "/paquetes/mas-reservados", tags=["Paquetes"], response_model=Paquetes
)
def get_paquete_mas_reservado(db=Depends(get_database_session)) -> Paquetes:
    result = PaquetesService(db).get_paquete_mas_reservado()
    if not result:
        raise HTTPException(404, "Paquete no encontrado")
    return Paquetes.model_validate(result)


@paquetes_router.get("/paquetes/{id}", tags=["Paquetes"], response_model=Paquetes)
def get_paquete(
    id: int = Path(ge=1, le=2000), db=Depends(get_database_session)
) -> Paquetes:
    result = PaquetesService(db).get_paquete(id)
    if not result:
        raise HTTPException(404, "Paquete no encontrado")
    return Paquetes.model_validate(result)


@paquetes_router.get("/paquetes/", tags=["Paquetes"])
def get_paquetes_by_nombre_destino(
    nombre_destino: str = Query(max_length=35), db=Depends(get_database_session)
) -> list[Paquetes]:
    result = PaquetesService(db).get_paquetes_by_destino(nombre_destino)
    return [Paquetes.model_validate(paquete) for paquete in result]


@paquetes_router.post(
    "/paquetes", tags=["Paquetes"], response_model=dict, status_code=201
)
def create_paquetes(paquete: PaquetesPOST, db=Depends(get_database_session)):
    PaquetesService(db).create_paquetes(paquete)
    return JSONResponse(
        status_code=201, content={"message": "Se ha registrado el paquete"}
    )


@paquetes_router.put(
    "/paquetes/{id}", tags=["Paquetes"], response_model=dict, status_code=200
)
def update_paquetes(id: int, Paquetes: PaquetesPOST, db=Depends(get_database_session)):
    result = PaquetesService(db).update_paquetes(id, Paquetes)

    if not result:
        raise HTTPException(404, "Paquete no encontrado")

    return JSONResponse(
        status_code=200, content={"message": "Se ha modificado el paquete"}
    )


@paquetes_router.delete(
    "/paquetes/{id}", tags=["Paquetes"], response_model=dict, status_code=200
)
def delete_paquetes(id: int, db=Depends(get_database_session)):
    result = PaquetesService(db).delete_paquetes(id)
    if not result:
        raise HTTPException(404, "Paquete no encontrado")
    return JSONResponse(
        status_code=200, content={"message": "Se ha eliminado el paquete"}
    )
