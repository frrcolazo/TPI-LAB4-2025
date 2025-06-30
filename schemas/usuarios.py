from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional, List

class User(BaseModel):
    email:str
    password:str
class UsuarioBase(BaseModel):
    id: Optional[int] = None
    apellido: str = Field(min_length=2, max_length=20)
    nombre: str = Field(min_length=2, max_length=20)
    correo: EmailStr
    role:str
    class Config:
        from_attributes = True 

    @field_validator('role')
    @classmethod
    def validar_rol(cls, v):
        if v not in ('Cliente', 'Administrador'):
            raise ValueError("Rol debe ser 'Cliente' o 'Administrador'")
        return v
class Usuarios(UsuarioBase):
    password: str = Field(min_length=8)
    
    @field_validator('password')
    @classmethod
    def password_must_contain_one_upper(cls, v):
            if any(c.isupper() for c in v):
                return v
            raise ValueError("La contraseña debe contener al menos una letra mayúscula")
    

    

