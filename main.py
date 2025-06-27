from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from fastapi.middleware.cors import CORSMiddleware
from routers.destinos import destinos_router
from routers.usuarios import usuarios_router
from routers.reservas import reservas_router
from routers.paquetes import paquetes_router
from fastapi.staticfiles import StaticFiles



app = FastAPI()
app.title = "Mi aplicación con  FastAPI"
app.version = "0.0.1"

app.add_middleware(ErrorHandler)

## Acá con los CORS (Cross-Origin Resource Sharing)
## defino todos los origenes que van a poder utitlizar/consultar el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], ##habilito el back para cualquier dominio que quiera consultar
    allow_credentials=True,
    allow_methods=["*"],##habilito todos los métodos HTTP( GET, POST, PUT, HEAD, OPTION, etc)
    allow_headers=["*"],##habilito todos los headers que se puedan enviar desde un navegador.
)


app.include_router(destinos_router)
app.include_router(usuarios_router)
app.include_router(reservas_router)
app.include_router(paquetes_router)

Base.metadata.create_all(bind=engine)

# 1. Servimos todos los archivos estáticos del directorio frontend en la ruta "/" (raíz)
app.mount("/", StaticFiles(directory="frontend", html=True ), name="frontend")


# @app.get('/', tags=['home'])
# def message():
#     return HTMLResponse('<h1>Hello world</h1>')

