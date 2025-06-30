import { destinosServices } from "../../servicios/destinos-servicios.js";
import { paquetesServices } from "../../servicios/paquetes-servicios.js";


export async function newRegister() {
    let d = document;

    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Paquete';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';
    await crearFormulario();

    const formulario = d.querySelector(".frmAmPaquete");
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id) {
    const d = document;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Paquete';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';

    await crearFormulario();

    const paquete = await paquetesServices.listar(id);
    console.log(paquete)
    const formulario = d.querySelector(".frmAmPaquete");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault()
        modificar(id)
    });

    d.getElementById('paqueteNombre').value = paquete.nombre;
    d.getElementById('paqueteCupo').value = paquete.cupo;
    d.getElementById('paqueteFechaInicio').value = paquete.fecha_inicio;
    d.getElementById('paqueteFechaFin').value = paquete.fecha_fin;
    d.getElementById('paquetePrecio').value = paquete.precio;
    d.getElementById('paqueteDestino').value = paquete.id_destino;
}

async function crearFormulario() {
    const d = document;

    d.querySelector('.rutaMenu').innerHTML = "Paquetes";
    d.querySelector('.rutaMenu').setAttribute('href', "#/paquetes");

    const cP = d.getElementById('contenidoPrincipal');
    cP.innerHTML = await fetch('/controladores/paquetes/formulario.html').then(res => res.text());

    await new Promise(r => requestAnimationFrame(r));
    // Cargar select de destinos
    const selDestino = d.getElementById('paqueteDestino');
    const destinos = await destinosServices.listar();
    destinos.forEach(element => {
        const opcion = d.createElement('option');
        opcion.value = element.id;
        opcion.text = element.nombre;
        selDestino.appendChild(opcion);
    });

    // Cargar validaciones
    const script = d.createElement("script");
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
}


function guardar(e) {
    e.preventDefault();

    const d = document;
    const formulario = d.querySelector(".frmAmPaquete");
    const nombre = d.getElementById('paqueteNombre').value;
    const cupo = d.getElementById('paqueteCupo').value;
    const fechaInicio = d.getElementById('paqueteFechaInicio').value;
    const fechaFin = d.getElementById('paqueteFechaFin').value;
    const precio = d.getElementById('paquetePrecio').value;
    const selDestino = d.getElementById('paqueteDestino');
    const destino = selDestino.options[selDestino.selectedIndex].value;
    console.log(selDestino + selDestino.selectedIndex)
    paquetesServices.crear(nombre, fechaInicio, fechaFin, cupo, precio, destino)
        .then(() => {
            formulario.reset();
            window.location.href = "#/paquetes";
        })
        .catch(error => console.log(error));
}

function modificar(id) {

    const d = document;
    const formulario = d.querySelector(".frmAmPaquete");
    const nombre = d.getElementById('paqueteNombre').value;
    const cupo = d.getElementById('paqueteCupo').value;
    const fechaInicio = d.getElementById('paqueteFechaInicio').value;
    const fechaFin = d.getElementById('paqueteFechaFin').value;
    const precio = d.getElementById('paquetePrecio').value;
    const selDestino = d.getElementById('paqueteDestino');
    const destino = selDestino.options[selDestino.selectedIndex].value;

    paquetesServices.editar(id, nombre, fechaInicio, fechaFin, cupo, precio, destino)
        .then(() => {
            formulario.reset();
            window.location.href = "#/paquetes";
        })
        .catch(error => console.log(error));
}
