export function mostrarSolo(seccionClase) {
    const secciones = document.querySelectorAll("main > section");
    secciones.forEach(seccion => {
        if (seccion.classList.contains(seccionClase)) {
            seccion.style.display = "";
        } else {
            seccion.style.display = "none";
        }
    });
}