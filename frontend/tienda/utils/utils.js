export function mostrarSolo(seccionClase) {
    const secciones = document.querySelectorAll("main > section");
    const footer = document.querySelector('footer');
    
    secciones.forEach(seccion => {
        if (seccion.classList.contains(seccionClase)) {
            seccion.style.display = "";
        } else {
            seccion.style.display = "none";
        }
    });
    
    // Gestión del footer según la sección activa
    if (footer) {
        // Remover clases anteriores
        footer.classList.remove('footer-inicio', 'footer-destinos');
        
        // Agregar clase según la sección activa
        if (seccionClase === 'seccionInicio') {
            footer.classList.add('footer-inicio');
        } else if (seccionClase === 'seccionDestinos') {
            footer.classList.add('footer-destinos');
        }
        // Puedes agregar más secciones aquí según necesites
    }
}