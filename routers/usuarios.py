from fastapi import APIRouter, File
from fastapi import Depends, Path, Query,  HTTPException, status,UploadFile
from fastapi.responses import JSONResponse,FileResponse
from pydantic import BaseModel, Field
from typing import Optional, List

from sqlalchemy import null
from config.database import get_database_session
from models.usuarios import Usuarios as UsuarioModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.usuarios import UsuariosService
from schemas.usuarios import Usuarios
from passlib.context import CryptContext
from utils.jwt_manager import create_token
from schemas.usuarios import User, UsuarioBase
import os
import shutil
usuarios_router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(users:dict, email: str, password: str)->UsuarioBase:
    user = get_user(users, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    user = UsuarioBase.from_orm(user)
    return user

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(users:list, email: str):
    for item in users:
        if item.correo == email:
            return item

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)    

@usuarios_router.post('/login', tags=['auth'])
def login(user: User, db = Depends(get_database_session)):
    #db = Session()
    usuariosDb:UsuarioModel= UsuariosService(db).get_usuarios()

   
    usuario= authenticate_user(usuariosDb, user.email, user.password)
    if not usuario:
       return JSONResponse(status_code=401, content={'accesoOk': False,'token':''})  
    else:
        token: str = create_token(user.model_dump())
        return JSONResponse(status_code=200, content={'accesoOk': True,'token':token, 'usuario': jsonable_encoder(usuario) })
    
          

@usuarios_router.get('/usuarios', tags=['Usuarios'], status_code=200, dependencies=[Depends(JWTBearer())])
def get_usuarios(db = Depends(get_database_session)):
    #db = Session()
    result = UsuariosService(db).get_usuarios()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@usuarios_router.get('/usuarios/{id}', tags=['Usuarios'], response_model=UsuarioBase)
def get_usuario(id: int = Path(ge=1, le=2000), db = Depends(get_database_session)) :
    #db = Session()
    result = UsuariosService(db).get_usuario(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "Usuario no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@usuarios_router.get('/usuarios/', tags=['Usuarios'])
def get_usuarios_by_mail(email: str = Query(min_length=5, max_length=35), db = Depends(get_database_session)) :
    #db = Session()
    result = UsuariosService(db).get_usuarios_by_mail(email)
    if not result:
        return JSONResponse(status_code=404, content={'message': "Email del usuario no encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@usuarios_router.post('/usuarios', tags=['Usuarios'], response_model=dict, status_code=201)
def create_usuarios(usuario: Usuarios, db = Depends(get_database_session)) -> dict:
    existing_user = UsuariosService(db).get_usuarios_by_mail(usuario.correo)
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    usuario.password =  get_password_hash(usuario.password)
    #db = Session()
    UsuariosService(db).create_usuarios(usuario)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el usuario"})


@usuarios_router.put('/usuarios/{id}', tags=['Usuarios'], response_model=dict, status_code=200)
def update_usuarios(id: int, Usuarios: Usuarios, db = Depends(get_database_session))-> dict:
    #db = Session()
    result = UsuariosService(db).get_usuario(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    Usuarios.password = get_password_hash(Usuarios.password)
    existing_user = UsuariosService(db).get_usuarios_by_mail_first(Usuarios.correo)
    if existing_user and existing_user.id != id:
        raise HTTPException(status_code=400, detail=f"El correo {existing_user} ya está registrado")
    UsuariosService(db).update_usuarios(id, Usuarios)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el usuario"})


@usuarios_router.delete('/usuarios/{id}', tags=['Usuarios'], response_model=dict, status_code=200)
def delete_usuarios(id: int, db = Depends(get_database_session))-> dict:
    #db = Session()
    result: UsuarioModel = db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    UsuariosService(db).delete_usuarios(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el usuario"})