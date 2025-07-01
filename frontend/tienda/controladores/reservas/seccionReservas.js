<<<<<<< HEAD
import { mostrarSolo } from "../../utils/utils.js";
import { reservasServices } from "../../../servicios/reservas-servicios.js"
// Por ejemplo, en el controlador de login:
mostrarSolo("seccionReservas");
// Ahora cargas el contenido de login en esa sección
export async function mostrarReservas() {
=======
export function mostrarReservas() {
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
    const d = document;
    // Limpiar/ocultar otras secciones
    let seccionInicio = d.querySelector(".seccionInicio");
    if (seccionInicio) {
        seccionInicio.innerHTML = "";
        seccionInicio.style.display = "none";
    }
    let seccionHistorial = d.querySelector(".seccionHistorial");
    if (seccionHistorial) {
        seccionHistorial.innerHTML = "";
        seccionHistorial.style.display = "none";
    }
    d.querySelector(".carrusel").innerHTML = "";
    d.querySelector(".seccionPaquetes").innerHTML = "";
    d.querySelector(".vistaPaquete").innerHTML = "";
    d.querySelector(".seccionLogin").innerHTML = "";

    // Mostrar la sección de reservas
    let seccionReservas = d.querySelector(".seccionReservas");
    seccionReservas.style.display = "";
    seccionReservas.innerHTML = `
        <h1 class="titulo-reservas">MIS RESERVAS ACTIVAS</h1>
        <div class="carrusel-reservas">
<<<<<<< HEAD
        </div>
    `;
    await cargarReservasEnCarrusel()
}

async function cargarReservasEnCarrusel() {
    const reservas = await reservasServices.listarPorUsuarioLogeado()
    const carruselReservas = document.querySelector(".carrusel-reservas");
    console.log(reservas, carruselReservas)
    if (reservas.length === 0) {
        carruselReservas.innerHTML = `<div class="mensaje-vacio">
        No tienes reservas activas por el momento.
        </div>`
        return
    }
    reservas.forEach(reserva => {
        const elementoReserva = document.createElement('div')
        elementoReserva.className = "item-reserva"
        elementoReserva.innerHTML = `
            <div class="paquete">${reserva.paquete_nombre}</div>
            <div class="detalle">
                <span><strong>Destino:</strong>${reserva.destino_nombre}</span>
                <span><strong>Fecha de reserva:</strong>${reserva.fecha_reserva}</span>
                <span><strong>Del:</strong>${reserva.fecha_inicio} <strong>al:</strong> ${reserva.fecha_fin}</span>
                <span><strong>Viajaron:</strong>${reserva.cantidad_personas} personas</span>
                </div>`
        carruselReservas.appendChild(elementoReserva)
    });

=======
            <div class="item-reserva"></div>
            <div class="item-reserva"></div>
        </div>
    `;
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
}