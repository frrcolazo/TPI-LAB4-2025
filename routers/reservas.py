from fastapi import APIRouter
from fastapi import Depends, Path, Query, HTTPException,UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import get_database_session
from models.reservas import Reservas as ProductoModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.reservas import ReservasService
import os
import shutil

reservas_router = APIRouter()


#COMPLETAR FELI