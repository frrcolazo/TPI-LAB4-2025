<<<<<<< HEAD
import { mostrarSolo } from "../../utils/utils.js";

export function cargarSeccionInicio() {
    mostrarSolo("seccionInicio");
    const seccion = document.querySelector('.seccionInicio');
    seccion.innerHTML = `
        <h1 class="titulo">TU VUELO</h1>
        <a href="#destinos" class="btnAcceso principal">Encontrá tu próximo destino</a>
=======
export function cargarSeccionInicio() {
    const seccion = document.querySelector('.seccionInicio');
    seccion.style.display = ""; // <-- MOSTRAR
    seccion.innerHTML = `
        <h1 class="titulo">TU VUELO</h1>
        <a href="#" class="btnAcceso principal">Encontrá tu próximo destino</a>
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
        <div class="accesos-rapidos">
            <a href="#historial" class="btnAcceso">Mi historial de viajes</a>
            <a href="#reservas" class="btnAcceso">Ver mis reservas</a>
        </div>
    `;
<<<<<<< HEAD
}
=======
}
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
