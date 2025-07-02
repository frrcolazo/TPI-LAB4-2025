import { mostrarSolo } from "../../utils/utils.js";

const categoriasConfig = {
    playa: { titulo: 'VAMOS A LA PLAYA', subtitulo: 'Relájate bajo el sol y disfruta del mar cristalino', icono: '🏖️', gradiente: 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))' },
    nieve: { titulo: 'VAMOS A LA NIEVE', subtitulo: 'Aventuras únicas en paisajes nevados', icono: '🏔️', gradiente: 'linear-gradient(135deg, rgba(236, 240, 241, 0.9), rgba(189, 195, 199, 0.9))' },
    ciudad: { titulo: 'VAMOS A LA CIUDAD', subtitulo: 'Descubre cultura, historia y vida urbana', icono: '🏙️', gradiente: 'linear-gradient(135deg, rgba(155, 89, 182, 0.9), rgba(142, 68, 173, 0.9))' }
};

export async function mostrarDestinos() {
    mostrarSolo("seccionDestinos");
    let seccionDestinos = document.querySelector(".seccionDestinos");
    
    if (!seccionDestinos) {
        seccionDestinos = document.createElement("section");
        seccionDestinos.className = "seccionDestinos";
        document.querySelector("main").appendChild(seccionDestinos);
    }

    seccionDestinos.innerHTML = `
        <div class="destinos-loading">
            <div class="loading-spinner-destinos"></div>
            <h2>Cargando destinos increíbles...</h2>
        </div>
    `;

    try {
        const res = await fetch("http://localhost:8000/destinos");
        if (!res.ok) throw new Error("Error al cargar destinos");
        const destinos = await res.json();

        if (destinos.length === 0) {
            seccionDestinos.innerHTML = `
                <div class="destinos-vacio">
                    <div class="vacio-icono">✈️</div>
                    <h2>¡Próximamente nuevos destinos!</h2>
                </div>
            `;
            return;
        }

        const destinosCategorizados = {
            playa: destinos.filter(d => d.categoria === 'playa'),
            nieve: destinos.filter(d => d.categoria === 'nieve'),
            ciudad: destinos.filter(d => d.categoria === 'ciudad')
        };

        seccionDestinos.innerHTML = `
            <div class="destinos-header">
                <h1 class="destinos-titulo-principal">🌟 Descubre tu próximo destino</h1>
                <p class="destinos-descripcion">Elige entre nuestras increíbles categorías de viajes</p>
            </div>
            ${Object.keys(destinosCategorizados).map(tipo => crearSeccionDestino(tipo, destinosCategorizados[tipo])).join('')}
        `;

        inicializarAnimaciones();

    } catch (err) {
        seccionDestinos.innerHTML = `
            <div class="destinos-error">
                <div class="error-icono">⚠️</div>
                <h2>Error al cargar destinos</h2>
                <button class="btn-reintentar-destinos" onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }
}

function crearSeccionDestino(tipo, destinos) {
    const config = categoriasConfig[tipo];
    
    if (destinos.length === 0) {
        return `
            <div class="destino destino-${tipo}">
                <div class="destino-overlay" style="background: ${config.gradiente}"></div>
                <div class="destino-contenido">
                    <div class="destino-header">
                        <span class="destino-icono">${config.icono}</span>
                        <h2 class="destino-titulo">${config.titulo}</h2>
                        <p class="destino-subtitulo">${config.subtitulo}</p>
                    </div>
                    <div class="carrusel-destino">
                        <div class="item-destino-vacio">
                            <span class="vacio-icono-pequeño">🚧</span>
                            <p>Próximamente nuevos destinos</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const itemsCarrusel = destinos.map((destino, index) => crearItemDestino(destino, config, index)).join('');
    const indicesTotales = Math.ceil(destinos.length / 3);

    return `
        <div class="destino destino-${tipo}" data-destinos='${JSON.stringify(destinos)}' data-indice-actual="0">
            <div class="destino-overlay" style="background: ${config.gradiente}"></div>
            <div class="destino-contenido">
                <div class="destino-header">
                    <span class="destino-icono">${config.icono}</span>
                    <h2 class="destino-titulo">${config.titulo}</h2>
                    <p class="destino-subtitulo">${config.subtitulo}</p>
                </div>
                
                <div class="carrusel-container">
                    <div class="carrusel-destino" id="carrusel-${tipo}">
                        ${itemsCarrusel}
                    </div>
                    
                    ${destinos.length > 3 ? crearControlesCarrusel(tipo, indicesTotales) : ''}
                </div>
            </div>
        </div>
    `;
}

function crearItemDestino(destino, config, index) {
    const rutaImagen = destino.imagen_url ? `assets/img/${destino.imagen_url}` : null;
    const delay = (index % 3) * 100;
    
    return `
        <div class="item-destino" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="destino-card">
                <div class="destino-imagen-container">
                    ${rutaImagen ? 
                        `<img src="${rutaImagen}" alt="${destino.nombre}" class="img-destino">` : 
                        `<div class="placeholder-destino">
                            <span class="placeholder-icono">🖼️</span>
                            <p>Imagen no disponible</p>
                        </div>`
                    }
                    <div class="destino-badge">${config.icono}</div>
                </div>
                <div class="destino-info">
                    <h3 class="destino-nombre">${destino.nombre}</h3>
                    <p class="destino-descripcion">${destino.descripcion}</p>
                    <div class="destino-pais">
                        <span class="pais-icono">📍</span>
                        <span class="pais-texto">${destino.pais}</span>
                    </div>
                    <button class="btn-ver-paquetes" onclick="verPaquetes(${destino.id})">
                        <span class="btn-texto">Ver paquetes</span>
                        <span class="btn-icono">→</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function crearControlesCarrusel(tipo, indicesTotales) {
    return `
        <div class="controles-carrusel">
            <button class="btn-carrusel prev" onclick="moverCarrusel('${tipo}', -1)">‹</button>
            <div class="indicadores-carrusel">
                ${Array.from({length: indicesTotales}, (_, i) => 
                    `<button class="indicador ${i === 0 ? 'activo' : ''}" onclick="irASlide('${tipo}', ${i})"></button>`
                ).join('')}
            </div>
            <button class="btn-carrusel next" onclick="moverCarrusel('${tipo}', 1)">›</button>
        </div>
    `;
}

function inicializarAnimaciones() {
    const destinos = document.querySelectorAll('.destino');
    destinos.forEach((destino, index) => {
        setTimeout(() => destino.classList.add('destino-visible'), index * 200);
    });
}

function actualizarIndicadores(tipo, indiceActual) {
    const slideActual = Math.floor(indiceActual / 3);
    const indicadores = document.querySelectorAll(`.destino-${tipo} .indicador`);
    indicadores.forEach((indicador, index) => {
        indicador.classList.toggle('activo', index === slideActual);
    });
}

window.moverCarrusel = function(tipo, direccion) {
    const seccionDestino = document.querySelector(`.destino-${tipo}`);
    const destinos = JSON.parse(seccionDestino.dataset.destinos);
    let indiceActual = parseInt(seccionDestino.dataset.indiceActual || '0');
    
    indiceActual += direccion * 3;
    if (indiceActual < 0) indiceActual = Math.max(0, destinos.length - 3);
    else if (indiceActual >= destinos.length) indiceActual = 0;

    seccionDestino.dataset.indiceActual = indiceActual.toString();
    actualizarCarrusel(tipo, indiceActual);
    actualizarIndicadores(tipo, indiceActual);
};

window.irASlide = function(tipo, slideIndex) {
    const seccionDestino = document.querySelector(`.destino-${tipo}`);
    const indiceActual = slideIndex * 3;
    
    seccionDestino.dataset.indiceActual = indiceActual.toString();
    actualizarCarrusel(tipo, indiceActual);
    actualizarIndicadores(tipo, indiceActual);
};

function actualizarCarrusel(tipo, indiceInicial) {
    const seccionDestino = document.querySelector(`.destino-${tipo}`);
    const destinos = JSON.parse(seccionDestino.dataset.destinos);
    const config = categoriasConfig[tipo];
    const carrusel = seccionDestino.querySelector('.carrusel-destino');
    
    const itemsCarrusel = Array.from({length: 3}, (_, i) => {
        const destino = destinos[indiceInicial + i];
        return destino ? crearItemDestino(destino, config, i) : '<div class="item-destino item-destino-placeholder"></div>';
    }).join('');

    carrusel.style.opacity = '0';
    setTimeout(() => {
        carrusel.innerHTML = itemsCarrusel;
        carrusel.style.opacity = '1';
    }, 150);
}

window.verPaquetes = function(idDestino) {
    document.querySelectorAll('.destino').forEach(destino => {
        destino.style.transform = 'translateY(-20px)';
        destino.style.opacity = '0.8';
    });
    
    setTimeout(() => location.hash = `#paquetes/${idDestino}`, 200);
};