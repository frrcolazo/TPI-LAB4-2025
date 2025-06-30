import { mostrarSolo } from "../../utils/utils.js";

// Por ejemplo, en el controlador de login:
mostrarSolo("seccionReservas");
// Ahora cargas el contenido de login en esa sección
export function mostrarReservas() {
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
            <div class="item-reserva"></div>
            <div class="item-reserva"></div>
        </div>
    `;
}