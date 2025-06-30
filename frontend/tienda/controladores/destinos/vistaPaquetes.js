import { paquetesServices } from "../../../servicios/paquetes-servicios.js";
import { mostrarSolo } from "../../utils/utils.js";

export async function vistaPaquetes(idDestino) {
    console.log("🚀 Cargando paquetes para destino ID:", idDestino);
    mostrarSolo("vistaPaquetes");
    
    const d = document;
    const vista = d.querySelector(".vistaPaquetes");
    
    // Mostrar loading mientras se cargan los datos
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
        const paquetesTodos = await paquetesServices.listar();
        console.log("Paquetes totales recibidos:", paquetesTodos);
        
        const paquetes = paquetesTodos.filter(
            paquete => Number(paquete.destino_id) === Number(idDestino)
        );
        console.log(`Paquetes filtrados para destino_id ${idDestino}:`, paquetes);

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
        console.error("Error al cargar paquetes:", error);
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
        const imagen = obtenerImagenDestino(paquete.destino_id);
        const diasDuracion = calcularDias(paquete.fecha_inicio, paquete.fecha_fin);
        const disponibilidad = obtenerEstadoDisponibilidad(paquete.cupo);
        const precioFormateado = formatearPrecio(paquete.precio);
        
        html += `
            <div class="paquete-detalle" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="paquete-imagen" style="background-image: url('${imagen}')">
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
    const opciones = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };
    return f.toLocaleDateString('es-AR', opciones);
}

function formatearRangoFechas(fechaInicio, fechaFin) {
    const inicio = formatearFecha(fechaInicio);
    const fin = formatearFecha(fechaFin);
    return `${inicio} - ${fin}`;
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
    const diferencia = fin - inicio;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24)) + 1;
}

function obtenerEstadoDisponibilidad(cupo) {
    if (cupo === 0) {
        return { clase: 'agotado', texto: 'Agotado' };
    } else if (cupo <= 3) {
        return { clase: 'ultimos', texto: 'Últimos lugares' };
    } else {
        return { clase: 'disponible', texto: 'Disponible' };
    }
}

function obtenerImagenDestino(destino_id) {
    const imagenes = {
        1: "assets/img/mar_del_plata.jpg",
        2: "assets/img/punta_cana.jpg",
        3: "assets/img/buzios.jpg",
        4: "assets/img/bariloche.jpg",
        5: "assets/img/san_martin.jpg",
        6: "assets/img/ushuaia.jpg",
        7: "assets/img/madrid.jpg",
        8: "assets/img/nueva_york.jpg",
        9: "assets/img/cordoba.jpg"
    };
    return imagenes[destino_id] || "assets/img/default.jpg";
}

// Funciones globales para los botones
window.verDetallesPaquete = function(paqueteId) {
    console.log("Ver detalles del paquete:", paqueteId);
    // Aquí puedes agregar la lógica para mostrar detalles
    alert(`Mostrando detalles del paquete ${paqueteId}`);
};

window.reservarPaquete = function(paqueteId) {
    console.log("Reservar paquete:", paqueteId);
    // Aquí puedes agregar la lógica para reservar
    alert(`Iniciando proceso de reserva para paquete ${paqueteId}`);
};