
# Sistema de gestión de viajes

Este es un proyecto full-stack usando:

- **Python 3.13**
- **FastAPI** (v0.115.x)
- **Uvicorn** (v0.34.3)
- **SQLAlchemy** (v2.0.41)
- **mysql-connector-python** (v9.3.0)
- **Bootstrap**, **HTML**, **CSS**, y **JavaScript**

---

## Requisitos previos

- Tener **Python 3.13**
- Instalar **Poetry**

comando de instalación en linux:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```
comando de instalación en windows powershell:
```bash
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

comando para agregar al path poetry en windows powershell:

- recuerda cambiar el usuario en la ruta

```bash
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Users\TU_USARIO_AQUÍ\AppData\Roaming\Python\Scripts", "User")
```

comando para agregar al path poetry en linux:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Instalación
```bash
git clone https://github.com/tu_usuario/tu_proyecto.git
cd tu_proyecto
poetry install
poetry shell        
```
## Construcción del proyecto

En desarrollo:
```bash
uvicorn main:app --reload
```

