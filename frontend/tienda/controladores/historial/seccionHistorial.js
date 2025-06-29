export function mostrarHistorial() {
    const d = document;
    // Limpiar otras secciones
    let seccionInicio = d.querySelector(".seccionInicio");
    seccionInicio.innerHTML = "";
    seccionInicio.style.display = "none"; // <-- OCULTAR

    d.querySelector(".carrusel").innerHTML = "";
    d.querySelector(".seccionPaquetes").innerHTML = "";
    d.querySelector(".vistaPaquete").innerHTML = "";
    d.querySelector(".seccionLogin").innerHTML = "";

    // Usar la sección ya existente en el HTML
    let seccionHistorial = d.querySelector(".seccionHistorial");
    if (!seccionHistorial) return; // Si no existe, no hace nada

    seccionHistorial.innerHTML = `
        <h1 class="titulo-historial">HISTORIAL DE VIAJES</h1>
        <div class="carrusel-historial">
            <div class="item-historial"></div>
            <div class="item-historial"></div>
            <div class="item-historial"></div>
        </div>
    `;
}