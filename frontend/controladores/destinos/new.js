import { destinosServices } from "/servicios/destinos-servicios.js";

const htmlAmDestinos = `
<div class="card card-dark card-outline">
	<form  class="needs-validation frmAmDestino"  enctype="multipart/form-data">
		<div class="card-header">
			<div class="col-md-8 offset-md-2">
				<!--=====================================
                Nombre
                ======================================-->
				<div class="form-group mt-3">
					<label>Nombre</label>
					<input 
						type="text" 
						class="form-control"
						onchange="validateJS(event,'t&n')"
						name="nombre"
                    id="destinoNombre"
						required>
					<div class="valid-feedback">Valid.</div>
					<div class="invalid-feedback">Por favor complete este campo.</div>
				</div>
                <!--=====================================
                Descripcion
                ======================================-->
                <div class="form-group mt-3">
                    <label>Descripción</label>
                    <input 
                        type="text" 
                        class="form-control"
                        onchange="validateJS(event,'t&n')"
                        name="descripcion"
                        id="destinoDescripcion"
                        required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Por favor complete este campo.</div>
                </div>
                <!--=====================================
                País
                ======================================-->
                <div class="form-group mt-3">
                    <label>País</label>
                    <input 
                        type="text" 
                        class="form-control"
                        onchange="validateJS(event,'t&n')"
                        name="pais"
                        id="destinoPais"
                        required>
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Por favor complete este campo.</div>
                </div>
			</div>
		</div>
		<div class="card-footer">
			<div class="col-md-8 offset-md-2">
				<div class="form-group mt-3">
					<a href="#/destinos" class="btn btn-light border text-left">Cancelar</a>
					<button type="submit" class="btn bg-dark float-right">Guardar</button>
				</div>
			</div>
		</div>
	</form>
</div> `;

var formulario = '';
var txtNombre = '';
var txtDescripcion = '';
var txtPais = '';
var idDestino;

export async function newRegister(){
    let d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Destino';
    d.querySelector('.contenidoTituloSec').innerHTML = 'Agregar';
    crearFormulario();
    formulario = d.querySelector(".frmAmDestino")
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id){
    let d = document;
    idDestino = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Destino';
    d.querySelector('.contenidoTituloSec').innerHTML = 'Editar';
    crearFormulario();
    formulario = d.querySelector(".frmAmDestino")
    formulario.addEventListener("submit", modificar);
    let destino =  await destinosServices.listar(id);
    txtNombre.value = destino.nombre;
    txtDescripcion.value = destino.descripcion;
    txtPais.value = destino.pais;
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Destinos";
    d.querySelector('.rutaMenu').setAttribute('href',"#/destinos");
    let cP = d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmDestinos;
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    txtNombre = d.getElementById('destinoNombre');
    txtDescripcion = d.getElementById('destinoDescripcion');
    txtPais = d.getElementById('destinoPais');
}

function guardar(e) {
    e.preventDefault();
    destinosServices.crear({
        nombre: txtNombre.value,
        descripcion: txtDescripcion.value,
        pais: txtPais.value
    })
    .then(respuesta => {
        formulario.reset();
        window.location.href = "#/destinos";
    })
    .catch(error => console.log(error))
}

function modificar(e) {
    e.preventDefault();
    destinosServices.editar(idDestino, {
        nombre: txtNombre.value,
        descripcion: txtDescripcion.value,
        pais: txtPais.value
    })
    .then(respuesta => {
        formulario.reset();
        window.location.href = "#/destinos";
    })
    .catch(error => console.log(error))
}