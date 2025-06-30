import { paquetesServices } from "../../../servicios/paquetes-servicios.js";
import { mostrarSolo } from "../../utils/utils.js";

export async function vistaPaquetes(idDestino) {
    console.log("🚀 Cargando paquetes para destino ID:", idDestino); // <--- Agregado
    mostrarSolo("vistaPaquetes");

    const d = document;
    const vista = d.querySelector(".vistaPaquetes");
    vista.innerHTML = "";

    if (!idDestino) {
        vista.innerHTML = "<p>Error: destino no especificado.</p>";
        return;
    }

    const paquetes = await paquetesServices.listarPorDestino(idDestino);

    if (!paquetes || paquetes.length === 0) {
        vista.innerHTML = "<p>No hay paquetes disponibles para este destino.</p>";
        return;
    }

    let html = "<h2>Paquetes disponibles</h2><div class='lista-paquetes'>";
    paquetes.forEach(paquete => {
        html += `
            <div class="item-paquete">
                <h3>${paquete.nombre}</h3>
                <p><strong>Destino:</strong> ${paquete.destino?.nombre || 'Desconocido'}</p>
                <p><strong>Precio:</strong> $${paquete.precio}</p>
                <p><strong>Cupo disponible:</strong> ${paquete.cupo}</p>
                <p><strong>Desde:</strong> ${formatearFecha(paquete.fecha_inicio)}</p>
                <p><strong>Hasta:</strong> ${formatearFecha(paquete.fecha_fin)}</p>
            </div>
        `;
    });
    html += "</div>";

    vista.innerHTML = html;
}

function formatearFecha(fecha) {
    if (!fecha) return "Sin fecha";
    const f = new Date(fecha);
    return `${f.getDate().toString().padStart(2, "0")}/${(f.getMonth() + 1).toString().padStart(2, "0")}/${f.getFullYear()}`;
}