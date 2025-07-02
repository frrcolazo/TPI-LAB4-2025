import { destinosServices } from "/servicios/destinos-servicios.js";

const htmlAmDestinos = `
<div class="card card-dark card-outline">
  <form class="needs-validation frmAmDestino" enctype="multipart/form-data" novalidate>
    <div class="card-header">
      <div class="col-md-8 offset-md-2">
        <div class="form-group mt-3">
          <label>Nombre</label>
          <input type="text" class="form-control" onchange="validateJS(event,'t&n')" name="nombre" id="destinoNombre" required>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Por favor complete este campo.</div>
        </div>
        <div class="form-group mt-3">
          <label>Descripción</label>
          <input type="text" class="form-control" onchange="validateJS(event,'t&n')" name="descripcion" id="destinoDescripcion" required>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Por favor complete este campo.</div>
        </div>
        <div class="form-group mt-3">
          <label>País</label>
          <input type="text" class="form-control" onchange="validateJS(event,'t&n')" name="pais" id="destinoPais" required>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Por favor complete este campo.</div>
        </div>
        <div class="form-group mt-3">
          <label>Categoría</label>
          <input type="text" class="form-control" onchange="validateJS(event,'t&n')" name="categoria" id="destinoCategoria" placeholder="Ej: playa, nieve o ciudad" required>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">Por favor complete este campo.</div>
        </div>
        <div class="form-group mt-3">
          <label>Imagen (JPG, PNG)</label>
          <input type="file" class="form-control" name="imagen" id="destinoImagen" accept="image/*">
          <small class="form-text text-muted">Seleccione una imagen para el destino.</small>
          <img id="previewImagen" src="" alt="Vista previa" style="max-width: 150px; margin-top: 10px; display:none;">
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="col-md-8 offset-md-2">
        <div class="form-group mt-3">
          <a href="#/destinos" class="btn btn-light border">Cancelar</a>
          <button type="submit" class="btn bg-dark float-right">Guardar</button>
        </div>
      </div>
    </div>
  </form>
</div>`;

let formulario, txtNombre, txtDescripcion, txtPais, txtCategoria, inputImagen, previewImagen, idDestino;

export async function newRegister(){
    document.querySelector('.contenidoTitulo').innerHTML = 'Agregar Destino';
    document.querySelector('.contenidoTituloSec').innerHTML = 'Agregar';
    crearFormulario();
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id) {
  idDestino = id;
  document.querySelector('.contenidoTitulo').innerHTML = 'Editar Destino';
  document.querySelector('.contenidoTituloSec').innerHTML = 'Editar';
  crearFormulario();
  formulario.addEventListener("submit", modificar);
  
  const destino = await destinosServices.listar(id);
  txtNombre.value = destino.nombre;
  txtDescripcion.value = destino.descripcion;
  txtPais.value = destino.pais;
  txtCategoria.value = destino.categoria || '';

  if (destino.imagen_url) {
    previewImagen.src = `./assets/img/${destino.imagen_url}`;
    previewImagen.style.display = "block";
  }
}

function crearFormulario(){
  document.querySelector('.rutaMenu').innerHTML = "Destinos";
  document.querySelector('.rutaMenu').setAttribute('href',"#/destinos");
  document.getElementById('contenidoPrincipal').innerHTML = htmlAmDestinos;

  const script = document.createElement("script");
  script.src = '../controladores/validaciones.js';
  document.getElementById('contenidoPrincipal').appendChild(script);

  formulario = document.querySelector(".frmAmDestino");
  txtNombre = document.getElementById('destinoNombre');
  txtDescripcion = document.getElementById('destinoDescripcion');
  txtPais = document.getElementById('destinoPais');
  txtCategoria = document.getElementById('destinoCategoria');
  inputImagen = document.getElementById('destinoImagen');
  previewImagen = document.getElementById('previewImagen');

  inputImagen.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImagen.src = ev.target.result;
        previewImagen.style.display = 'block';
      }
      reader.readAsDataURL(file);
    } else {
      previewImagen.src = "";
      previewImagen.style.display = 'none';
    }
  });
}

async function guardar(e) {
  e.preventDefault();
  try {
    const imagen_url = inputImagen.files.length > 0 ? await subirImagen(inputImagen.files[0]) : null;
    
    await destinosServices.crear({
      nombre: txtNombre.value,
      descripcion: txtDescripcion.value,
      pais: txtPais.value,
      categoria: txtCategoria.value,
      imagen_url
    });
    
    formulario.reset();
    window.location.href = "#/destinos";
  } catch (error) {
    alert("Error al guardar destino: " + error.message);
  }
}

async function modificar(e) {
  e.preventDefault();
  try {
    let imagen_url = null;
    if (inputImagen.files.length > 0) {
      imagen_url = await subirImagen(inputImagen.files[0]);
    } else {
      const destino = await destinosServices.listar(idDestino);
      imagen_url = destino.imagen_url || null;
    }

    await destinosServices.editar(idDestino, {
      nombre: txtNombre.value,
      descripcion: txtDescripcion.value,
      pais: txtPais.value,
      categoria: txtCategoria.value,
      imagen_url
    });
    
    formulario.reset();
    window.location.href = "#/destinos";
  } catch (error) {
    alert("Error al modificar destino: " + error.message);
  }
}

async function subirImagen(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch("http://127.0.0.1:8000/destinos/upload-image", {
    method: 'POST',
    body: formData
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al subir imagen (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.imagen_url;
}