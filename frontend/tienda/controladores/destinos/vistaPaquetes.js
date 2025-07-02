import { paquetesServices } from "../../../servicios/paquetes-servicios.js";
import { mostrarSolo } from "../../utils/utils.js";
import { destinosServices } from "../../../servicios/destinos-servicios.js";

export async function vistaPaquetes(idDestino) {
    mostrarSolo("vistaPaquetes");
    
    const vista = document.querySelector(".vistaPaquetes");
    
    vista.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Cargando paquetes disponibles...</p>
        </div>
    `;
    
    if (!idDestino) {
        vista.innerHTML = `
            <div class="error-container">
                <h2>⚠️ Error</h2>
                <p>No se ha especificado un destino válido.</p>
                <button class="btn-volver" onclick="history.back()">Volver</button>
            </div>
        `;
        return;
    }

    try {
        const [paquetesTodos, destinos] = await Promise.all([
            paquetesServices.listar(),
            destinosServices.listar()
        ]);

        const paquetes = paquetesTodos
            .filter(paquete => Number(paquete.destino_id) === Number(idDestino))
            .map(paquete => ({
                ...paquete,
                destino: destinos.find(d => d.id === paquete.destino_id)
            }));

        if (!paquetes || paquetes.length === 0) {
            vista.innerHTML = `
                <div class="no-paquetes-container">
                    <div class="no-paquetes-icon">🏖️</div>
                    <h2>No hay paquetes disponibles</h2>
                    <p>Actualmente no tenemos paquetes para este destino.</p>
                    <p>¡Pronto tendremos nuevas ofertas disponibles!</p>
                    <button class="btn-volver" onclick="history.back()">Volver a destinos</button>
                </div>
            `;
            return;
        }

        renderizarPaquetes(paquetes, vista);
        
    } catch (error) {
        vista.innerHTML = `
            <div class="error-container">
                <h2>❌ Error de conexión</h2>
                <p>No se pudieron cargar los paquetes. Intenta nuevamente.</p>
                <button class="btn-reintentar" onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }
}

function renderizarPaquetes(paquetes, vista) {
    const destinoNombre = paquetes[0]?.destino?.nombre || 'Destino seleccionado';
    
    let html = `
        <div class="paquetes-header">
            <h1 class="paquetes-titulo">🌟 Paquetes para ${destinoNombre}</h1>
            <p class="paquetes-descripcion">Encuentra la experiencia perfecta para tu próximo viaje</p>
            <div class="paquetes-contador">${paquetes.length} ${paquetes.length === 1 ? 'paquete disponible' : 'paquetes disponibles'}</div>
        </div>
        <div class="lista-paquetes">
    `;

    paquetes.forEach((paquete, index) => {
        const rutaImagen = paquete.destino?.imagen_url ? `assets/img/${paquete.destino.imagen_url}` : null;
        const diasDuracion = calcularDias(paquete.fecha_inicio, paquete.fecha_fin);
        const disponibilidad = obtenerEstadoDisponibilidad(paquete.cupo);
        const precioFormateado = formatearPrecio(paquete.precio);
        
        html += `
            <div class="paquete-detalle" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="paquete-imagen" ${rutaImagen ? `style="background-image: url('${rutaImagen}')"` : ''}>
                    ${!rutaImagen ? `
                        <div class="placeholder-paquete">
                            <span class="placeholder-icono">🖼️</span>
                            <p>Imagen no disponible</p>
                        </div>
                    ` : ''}
                    <div class="paquete-badge ${disponibilidad.clase}">${disponibilidad.texto}</div>
                    <div class="paquete-duracion">${diasDuracion} días</div>
                </div>
                <div class="paquete-info">
                    <div class="paquete-header">
                        <h3 class="paquete-nombre">${paquete.nombre}</h3>
                        <div class="paquete-precio">
                            <span class="precio-valor">${precioFormateado}</span>
                            <span class="precio-texto">por persona</span>
                        </div>
                    </div>
                    
                    <div class="paquete-detalles">
                        <div class="detalle-item">
                            <span class="detalle-icono">📍</span>
                            <span class="detalle-texto">${paquete.destino?.nombre || 'Destino no especificado'}</span>
                        </div>
                        
                        <div class="detalle-item">
                            <span class="detalle-icono">📅</span>
                            <span class="detalle-texto">${formatearRangoFechas(paquete.fecha_inicio, paquete.fecha_fin)}</span>
                        </div>
                        
                        <div class="detalle-item">
                            <span class="detalle-icono">👥</span>
                            <span class="detalle-texto">${paquete.cupo} ${paquete.cupo === 1 ? 'lugar disponible' : 'lugares disponibles'}</span>
                        </div>
                    </div>
                    
                    <div class="paquete-acciones">
                        <button class="btn-ver-detalles" onclick="verDetallesPaquete(${paquete.id})">
                            Ver detalles
                        </button>
                        <button class="btn-reservar ${paquete.cupo === 0 ? 'disabled' : ''}" 
                                onclick="reservarPaquete(${paquete.id})" 
                                ${paquete.cupo === 0 ? 'disabled' : ''}>
                            ${paquete.cupo === 0 ? 'Sin cupos' : 'Reservar ahora'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
        </div>
        <div class="paquetes-footer">
            <button class="btn-volver-destinos" onclick="history.back()">
                ← Volver a destinos
            </button>
        </div>
    `;
    
    vista.innerHTML = html;
}

function formatearFecha(fecha) {
    if (!fecha) return "Sin fecha";
    const f = new Date(fecha);
    return f.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatearRangoFechas(fechaInicio, fechaFin) {
    return `${formatearFecha(fechaInicio)} - ${formatearFecha(fechaFin)}`;
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(precio);
}

function calcularDias(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) return 0;
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
}

function obtenerEstadoDisponibilidad(cupo) {
    if (cupo === 0) return { clase: 'agotado', texto: 'Agotado' };
    if (cupo <= 3) return { clase: 'ultimos', texto: 'Últimos lugares' };
    return { clase: 'disponible', texto: 'Disponible' };
}

export function reservarPaquete(idPaquete) {
    location.href = `#reserva/${idPaquete}`;
}

window.reservarPaquete = reservarPaquete;
window.verDetallesPaquete = function(paqueteId) {
    alert(`Mostrando detalles del paquete ${paqueteId}`);
};