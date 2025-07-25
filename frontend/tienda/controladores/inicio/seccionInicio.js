import { mostrarSolo } from "../../utils/utils.js";

export function cargarSeccionInicio() {
    mostrarSolo("seccionInicio");
    const seccion = document.querySelector('.seccionInicio');
    seccion.innerHTML = `
        <h1 class="titulo">TU VUELO</h1>
        <a href="#destinos" class="btnAcceso principal">Encontrá tu próximo destino</a>
        <div class="accesos-rapidos">
            <a href="#historial" class="btnAcceso">Mi historial de viajes</a>
            <a href="#reservas" class="btnAcceso">Ver mis reservas</a>
        </div>
    `;
}