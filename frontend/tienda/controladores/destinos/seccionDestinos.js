import { mostrarSolo } from "../../utils/utils.js";

export async function mostrarDestinos() {
    mostrarSolo("seccionDestinos");
    const d = document;
    let seccionDestinos = d.querySelector(".seccionDestinos");
    if (!seccionDestinos) {
        seccionDestinos = d.createElement("section");
        seccionDestinos.className = "seccionDestinos";
        d.querySelector("main").appendChild(seccionDestinos);
    }

    try {
        const res = await fetch("http://localhost:8000/destinos");
        if (!res.ok) throw new Error("Error al cargar destinos");
        const destinos = await res.json();

        if (destinos.length === 0) {
            seccionDestinos.innerHTML = `<p>No hay destinos disponibles.</p>`;
            return;
        }

        // Dividir destinos en grupos de 3 por orden
        // Los primeros 3 van a playa, los siguientes 3 a nieve, los últimos 3 a ciudad
        const destinosCategorizados = {
            playa: destinos.slice(0, 3),
            nieve: destinos.slice(3, 6), 
            ciudad: destinos.slice(6, 9)
        };

        seccionDestinos.innerHTML = `
            ${crearSeccionDestino('playa', 'VAMOS A LA PLAYA', destinosCategorizados.playa)}
            ${crearSeccionDestino('nieve', 'VAMOS A LA NIEVE', destinosCategorizados.nieve)}
            ${crearSeccionDestino('ciudad', 'VAMOS A LA CIUDAD', destinosCategorizados.ciudad)}
        `;

    } catch (err) {
        console.error(err);
        seccionDestinos.innerHTML = `
            <div class="destino destino-playa">
                <h2>VAMOS A LA PLAYA</h2>
                <div class="carrusel-destino">
                    <div class="item-destino"></div>
                    <div class="item-destino">Error al cargar destinos</div>
                    <div class="item-destino"></div>
                </div>
            </div>
            <div class="destino destino-nieve">
                <h2>VAMOS A LA NIEVE</h2>
                <div class="carrusel-destino">
                    <div class="item-destino"></div>
                    <div class="item-destino">Error al cargar destinos</div>
                    <div class="item-destino"></div>
                </div>
            </div>
            <div class="destino destino-ciudad">
                <h2>VAMOS A LA CIUDAD</h2>
                <div class="carrusel-destino">
                    <div class="item-destino"></div>
                    <div class="item-destino">Error al cargar destinos</div>
                    <div class="item-destino"></div>
                </div>
            </div>
        `;
    }
}

function crearSeccionDestino(tipo, titulo, destinos) {
    if (destinos.length === 0) {
        return `
            <div class="destino destino-${tipo}">
                <h2>${titulo}</h2>
                <div class="carrusel-destino">
                    <div class="item-destino"></div>
                    <div class="item-destino">No hay destinos disponibles</div>
                    <div class="item-destino"></div>
                </div>
            </div>
        `;
    }

    // Crear items del carrusel
    let itemsCarrusel = '';
    
    // Si hay 3 o menos, mostrar todos
    if (destinos.length <= 3) {
        destinos.forEach(destino => {
            itemsCarrusel += `
                <div class="item-destino">
                    <h3>${destino.nombre}</h3>
                    <p>${destino.descripcion}</p>
                    <p><strong>País:</strong> ${destino.pais}</p>
                    <button onclick="verPaquetes(${destino.id})">Ver paquetes</button>
                </div>
            `;
        });
        
        // Rellenar con items vacíos si hay menos de 3
        while (itemsCarrusel.split('item-destino').length - 1 < 3) {
            itemsCarrusel += '<div class="item-destino"></div>';
        }
    } else {
        // Si hay más de 3, mostrar los primeros 3 y preparar para carrusel
        for (let i = 0; i < 3; i++) {
            const destino = destinos[i];
            itemsCarrusel += `
                <div class="item-destino">
                    <h3>${destino.nombre}</h3>
                    <p>${destino.descripcion}</p>
                    <p><strong>País:</strong> ${destino.pais}</p>
                    <button onclick="verPaquetes(${destino.id})">Ver paquetes</button>
                </div>
            `;
        }
    }

    return `
        <div class="destino destino-${tipo}" data-destinos='${JSON.stringify(destinos)}'>
            <h2>${titulo}</h2>
            <div class="carrusel-destino">
                ${itemsCarrusel}
            </div>
            ${destinos.length > 3 ? `
                <div class="controles-carrusel">
                    <button class="btn-carrusel prev" onclick="moverCarrusel('${tipo}', -1)">‹</button>
                    <button class="btn-carrusel next" onclick="moverCarrusel('${tipo}', 1)">›</button>
                </div>
            ` : ''}
        </div>
    `;
}

// Función para manejar el carrusel (si tienes más de 3 destinos)
window.moverCarrusel = function(tipo, direccion) {
    const seccionDestino = document.querySelector(`.destino-${tipo}`);
    const destinos = JSON.parse(seccionDestino.dataset.destinos);
    
    if (!seccionDestino.dataset.indiceActual) {
        seccionDestino.dataset.indiceActual = '0';
    }
    
    let indiceActual = parseInt(seccionDestino.dataset.indiceActual);
    indiceActual += direccion;
    
    // Controlar límites
    if (indiceActual < 0) {
        indiceActual = Math.max(0, destinos.length - 3);
    } else if (indiceActual > destinos.length - 3) {
        indiceActual = 0;
    }
    
    seccionDestino.dataset.indiceActual = indiceActual.toString();
    
    // Actualizar contenido del carrusel
    const carrusel = seccionDestino.querySelector('.carrusel-destino');
    let itemsCarrusel = '';
    
    for (let i = 0; i < 3; i++) {
        const destino = destinos[indiceActual + i];
        if (destino) {
            itemsCarrusel += `
                <div class="item-destino">
                    <h3>${destino.nombre}</h3>
                    <p>${destino.descripcion}</p>
                    <p><strong>País:</strong> ${destino.pais}</p>
                    <button onclick="verPaquetes(${destino.id})">Ver paquetes</button>
                </div>
            `;
        } else {
            itemsCarrusel += '<div class="item-destino"></div>';
        }
    }
    
    carrusel.innerHTML = itemsCarrusel;
};