import { mostrarSolo } from "../../utils/utils.js";

// Mapeo manual de nombres de destinos a archivos de imagen
const mapeoImagenes = {
    // Destinos de playa
    "Mar del Plata": "mar_del_plata.jpg",
    "Punta Cana": "punta_cana.jpg", 
    "Búzios": "buzios.jpg",
    "Buzios": "buzios.jpg", // Por si viene sin tilde
    
    // Destinos de nieve
    "Bariloche": "bariloche.jpg",
    "San Martín de los Andes": "san_martin.jpg",
    "Ushuaia": "ushuaia.jpg",
    
    // Destinos de ciudad
    "Madrid": "madrid.jpg",
    "Nueva York": "nueva_york.jpg",
    "Córdoba": "cordoba.jpg"
};

// Configuración de categorías con información adicional
const categoriasConfig = {
    playa: {
        titulo: 'VAMOS A LA PLAYA',
        subtitulo: 'Relájate bajo el sol y disfruta del mar cristalino',
        icono: '🏖️',
        gradiente: 'linear-gradient(135deg, rgba(52, 152, 219, 0.9), rgba(41, 128, 185, 0.9))'
    },
    nieve: {
        titulo: 'VAMOS A LA NIEVE',
        subtitulo: 'Aventuras únicas en paisajes nevados',
        icono: '🏔️',
        gradiente: 'linear-gradient(135deg, rgba(236, 240, 241, 0.9), rgba(189, 195, 199, 0.9))'
    },
    ciudad: {
        titulo: 'VAMOS A LA CIUDAD',
        subtitulo: 'Descubre cultura, historia y vida urbana',
        icono: '🏙️',
        gradiente: 'linear-gradient(135deg, rgba(155, 89, 182, 0.9), rgba(142, 68, 173, 0.9))'
    }
};

function obtenerImagenDestino(nombreDestino) {
    const imagen = mapeoImagenes[nombreDestino];
    return imagen ? `./assets/img/${imagen}` : null;
}

export async function mostrarDestinos() {
    mostrarSolo("seccionDestinos");
    const d = document;
    let seccionDestinos = d.querySelector(".seccionDestinos");
    
    if (!seccionDestinos) {
        seccionDestinos = d.createElement("section");
        seccionDestinos.className = "seccionDestinos";
        d.querySelector("main").appendChild(seccionDestinos);
    }

    // Mostrar loading inicial
    seccionDestinos.innerHTML = `
        <div class="destinos-loading">
            <div class="loading-spinner-destinos"></div>
            <h2>Cargando destinos increíbles...</h2>
            <p>Preparando las mejores aventuras para ti</p>
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
                    <p>Estamos trabajando para traerte los mejores lugares del mundo</p>
                </div>
            `;
            return;
        }

        // Dividir destinos en grupos de 3 por orden
        const destinosCategorizados = {
            playa: destinos.slice(0, 3),
            nieve: destinos.slice(3, 6), 
            ciudad: destinos.slice(6, 9)
        };

        seccionDestinos.innerHTML = `
            <div class="destinos-header">
                <h1 class="destinos-titulo-principal">🌟 Descubre tu próximo destino</h1>
                <p class="destinos-descripcion">Elige entre nuestras increíbles categorías de viajes</p>
            </div>
            ${crearSeccionDestino('playa', destinosCategorizados.playa)}
            ${crearSeccionDestino('nieve', destinosCategorizados.nieve)}
            ${crearSeccionDestino('ciudad', destinosCategorizados.ciudad)}
        `;

        // Inicializar animaciones después de cargar
        inicializarAnimacionesDestinos();

    } catch (err) {
        console.error(err);
        seccionDestinos.innerHTML = `
            <div class="destinos-error">
                <div class="error-icono">⚠️</div>
                <h2>Error al cargar destinos</h2>
                <p>No pudimos conectar con nuestros servidores</p>
                <button class="btn-reintentar-destinos" onclick="location.reload()">
                    Reintentar
                </button>
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
                            <div class="vacio-contenido">
                                <span class="vacio-icono-pequeño">🚧</span>
                                <p>Próximamente nuevos destinos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    let itemsCarrusel = '';
    let indicesTotales = Math.ceil(destinos.length / 3);

    destinos.forEach((destino, index) => {
        const rutaImagen = obtenerImagenDestino(destino.nombre);
        const delay = (index % 3) * 100; // Para animación escalonada
        
        itemsCarrusel += `
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
    });

    // Rellenar con espacios vacíos si es necesario
    while (itemsCarrusel.split('item-destino').length - 1 < 3) {
        itemsCarrusel += '<div class="item-destino item-destino-placeholder"></div>';
    }

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
                    
                    ${destinos.length > 3 ? `
                        <div class="controles-carrusel">
                            <button class="btn-carrusel prev" onclick="moverCarrusel('${tipo}', -1)" aria-label="Anterior">
                                <span class="carrusel-icono">‹</span>
                            </button>
                            <div class="indicadores-carrusel">
                                ${Array.from({length: indicesTotales}, (_, i) => 
                                    `<button class="indicador ${i === 0 ? 'activo' : ''}" onclick="irASlide('${tipo}', ${i})" aria-label="Ir a página ${i + 1}"></button>`
                                ).join('')}
                            </div>
                            <button class="btn-carrusel next" onclick="moverCarrusel('${tipo}', 1)" aria-label="Siguiente">
                                <span class="carrusel-icono">›</span>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function inicializarAnimacionesDestinos() {
    // Animación de aparición progresiva
    const destinos = document.querySelectorAll('.destino');
    destinos.forEach((destino, index) => {
        setTimeout(() => {
            destino.classList.add('destino-visible');
        }, index * 200);
    });
}

function actualizarIndicadores(tipo, indiceActual) {
    const destinos = JSON.parse(document.querySelector(`.destino-${tipo}`).dataset.destinos);
    const totalSlides = Math.ceil(destinos.length / 3);
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
    indiceActual += direccion * 3; // Mover de 3 en 3

    if (indiceActual < 0) {
        indiceActual = Math.max(0, destinos.length - 3);
    } else if (indiceActual >= destinos.length) {
        indiceActual = 0;
    }

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
    
    let itemsCarrusel = '';

    for (let i = 0; i < 3; i++) {
        const destino = destinos[indiceInicial + i];
        if (destino) {
            const rutaImagen = obtenerImagenDestino(destino.nombre);
            
            itemsCarrusel += `
                <div class="item-destino" data-aos="fade-up" data-aos-delay="${i * 100}">
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
        } else {
            itemsCarrusel += '<div class="item-destino item-destino-placeholder"></div>';
        }
    }

    // Animación de transición
    carrusel.style.opacity = '0';
    carrusel.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        carrusel.innerHTML = itemsCarrusel;
        carrusel.style.opacity = '1';
        carrusel.style.transform = 'translateY(0)';
    }, 150);
}

window.verPaquetes = function(idDestino) {
    // Animación de salida antes de navegar
    const destinos = document.querySelectorAll('.destino');
    destinos.forEach(destino => {
        destino.style.transform = 'translateY(-20px)';
        destino.style.opacity = '0.8';
    });
    
    setTimeout(() => {
        location.hash = `#paquetes/${idDestino}`;
    }, 200);
};