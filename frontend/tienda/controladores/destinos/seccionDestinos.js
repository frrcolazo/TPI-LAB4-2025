export function mostrarDestinos() {
    const d = document;
    // Limpiar/ocultar otras secciones
    d.querySelector(".seccionInicio").style.display = "none";
    d.querySelector(".seccionHistorial").style.display = "none";
    d.querySelector(".seccionPaquetes").style.display = "none";
    d.querySelector(".seccionReservas").style.display = "none";
    d.querySelector(".vistaPaquete").style.display = "none";
    d.querySelector(".seccionLogin").style.display = "none";

    let seccionDestinos = d.querySelector(".seccionDestinos");
    if (!seccionDestinos) {
        seccionDestinos = d.createElement("section");
        seccionDestinos.className = "seccionDestinos";
        d.querySelector("main").appendChild(seccionDestinos);
    }
    seccionDestinos.style.display = "";
    seccionDestinos.innerHTML = `
        <div class="destino destino-playa">
            <h2>VAMOS A LA PLAYA</h2>
            <div class="carrusel-destino">
                <div class="item-destino"></div>
                <div class="item-destino">CARRUSEL DE 3 QUE VA GIRANDO SI TIENE MAS DE 3 PAQUETES</div>
                <div class="item-destino"></div>
            </div>
        </div>
        <div class="destino destino-nieve">
            <h2>VAMOS A LA NIEVE</h2>
            <div class="carrusel-destino">
                <div class="item-destino"></div>
                <div class="item-destino">CARRUSEL DE 3 QUE VA GIRANDO SI TIENE MAS DE 3 PAQUETES</div>
                <div class="item-destino"></div>
            </div>
        </div>
        <div class="destino destino-ciudad">
            <h2>VAMOS A LA CIUDAD</h2>
            <div class="carrusel-destino">
                <div class="item-destino"></div>
                <div class="item-destino">CARRUSEL DE 3 QUE VA GIRANDO SI TIENE MAS DE 3 PAQUETES</div>
                <div class="item-destino"></div>
            </div>
        </div>
    `;
}