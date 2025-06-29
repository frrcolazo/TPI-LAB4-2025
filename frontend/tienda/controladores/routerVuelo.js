// import { CarruselPorDestino } from "./carrusel/carrusel.js";
import { cargarSeccionInicio } from "./inicio/seccionInicio.js";
// import { listarPaquetes } from "./listarPaquetes/listarPaquetes.js";
// import { vistaPaquete } from "./listarPaquetes/vistaPaquete.js";
import {
  getUsuarioAutenticado,
  login,
  mostrarUsuario,
  register,
  setUsuarioAutenticado
} from "./login/login.js";

export function RouterVuelo() {
  let session = getUsuarioAutenticado();
  setSession(session);

  let hash = location.hash;

  if (hash.startsWith("#paquete/")) {
    const nombrePaquete = decodeURIComponent(hash.split("/")[1]);
    vistaPaquete(nombrePaquete);
  
  } else if (hash === "#login") {
    login();

  } else if (hash === "#register") {
    register();

  } else if (hash === "#logout") {
    setUsuarioAutenticado(false, -1);
    location.replace("index.html"); // adaptalo al nombre de tu archivo

  } else if (hash === "#reservas") {
    // Acá cargás la vista de reservas activas
    import("./reservas/reservas.js").then(mod => mod.mostrarReservas());

  } else if (hash === "#historial") {
    // Acá cargás el historial
    import("./historial/historial.js").then(mod => mod.mostrarHistorial());

  } else {
    // Pantalla de inicio: botones + carruseles
    cargarSeccionInicio();
    CarruselPorDestino();
    listarPaquetes(); // O podés combinar esto en una sola función si querés
  }

  console.log("Ruta:", hash);
}

function setSession(session) {
  let d = document;
  if (session.autenticado) {
    mostrarUsuario(session.email);
  }
}
