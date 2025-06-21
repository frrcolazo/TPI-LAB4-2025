from fastapi import APIRouter
from fastapi import Depends, Path, Query, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import get_database_session
from models.destinos import Destinos as DestinosModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.destinos import DestinosService
from schemas.destinos import Destinos

destinos_router = APIRouter()

#COMPLETAR GER
