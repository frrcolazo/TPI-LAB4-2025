from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import get_database_session
from models.paquetes import Paquetes as PaquetesModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.paquetes import PaquetesService
from schemas.paquetes import Paquetes

paquetes_router = APIRouter()


#COMPLETAR BENJA
