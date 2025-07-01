import { mostrarSolo } from "../../utils/utils.js";

export function mostrarHistorial() {
    mostrarSolo("seccionHistorial");
    const seccionHistorial = document.querySelector(".seccionHistorial");
    if (!seccionHistorial) return;

    seccionHistorial.innerHTML = `
        <h1 class="titulo-historial">HISTORIAL DE VIAJES</h1>
        <div class="carrusel-historial">
            <div class="item-historial"></div>
            <div class="item-historial"></div>
            <div class="item-historial"></div>
        </div>
    `;
}