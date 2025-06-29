import { destionosServices } from "../../servicios/destionos-servicios.js";
import { paquetesServices } from "../../servicios/paquetes-servicios.js";

var formulario = '';

var txtNombre = '';
var txtCupo = '';
var fileFoto = '';
var selCategoria = '';
var txtPrecio = '';

var idPaquete;
export async function newRegister() {
    let d = document;

    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Paquete';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';
    crearFormulario();

    formulario = d.querySelector(".frmAmPaquete")
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id) {
    let d = document;
    idPaquete = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Paquete';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
    crearFormulario();

    formulario = d.querySelector(".frmAmPaquete")
    formulario.addEventListener("submit", modificar);
    let paquete = await paquetesServices.listar(id);


    txtCupo.value = paquete.descripcion;
    txtNombre.value = paquete.nombre;

    if (paquete.foto.length > 0)
        fileFoto.src = paquete.foto;
    selCategoria.value = paquete.idCategoria;
    txtPrecio.value = paquete.precio;

}

async function crearFormulario() {
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Paquetes";
    d.querySelector('.rutaMenu').setAttribute('href', "#/paquetes");

    let cP = d.getElementById('contenidoPrincipal');
    cP.innerHTML = await fetch('./formulario.html').then(response => response.text())

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);

    txtCupo = d.getElementById('paqueteCupo');
    txtNombre = d.getElementById('paqueteNombre');
    fileFoto = d.querySelector('.changePicture');
    txtPrecio = d.getElementById('paquetePrecio');
    selCategoria = d.getElementById('paqueteCategoria');

    /*Cargar categorías en select*/
    let res = await destionosServices.listar();
    res.forEach(element => {
        let opcion = d.createElement('option');
        opcion.value = element.id;
        opcion.text = element.descripcion;
        selCategoria.appendChild(opcion);
    });
}

function guardar(e) {

    e.preventDefault();

    var categoria = selCategoria.options[selCategoria.selectedIndex];


    paquetesServices.crear(txtNombre.value, txtCupo.value, fileFoto.src, txtPrecio.value,
        categoria.value, categoria.text)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/paquetes";

        })
        .catch(error => console.log(error))

}

function modificar(e) {

    e.preventDefault();

    var categoria = selCategoria.options[selCategoria.selectedIndex];
    paquetesServices.editar(idPaquete, txtNombre.value, txtCupo.value, fileFoto.src, txtPrecio.value,
        categoria.value, categoria.text)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/paquetes";

        })
        .catch(error => console.log(error))

}   