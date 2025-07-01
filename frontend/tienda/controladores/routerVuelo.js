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
<<<<<<< HEAD

=======
  
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
  } else if (hash === "#login") {
    login();

  } else if (hash === "#register") {
    register();

  } else if (hash === "#logout") {
    setUsuarioAutenticado(false, -1);
    location.replace("vuelo.html"); // adaptalo al nombre de tu archivo

  } else if (hash === "#reservas") {
<<<<<<< HEAD
    import("./reservas/seccionReservas.js").then(mod => mod.mostrarReservas());

  } else if (hash === "#destinos") {
    import("./destinos/seccionDestinos.js").then(mod => mod.mostrarDestinos());

  } else if (hash === "#historial") {
    import("./historial/seccionHistorial.js").then(mod => mod.mostrarHistorial());

  } else if (hash.startsWith("#paquetes/")) {
    const idDestino = hash.split("/")[1];
    import("./destinos/vistaPaquetes.js").then(mod => mod.vistaPaquetes(idDestino));

  } else if (hash.startsWith("#reserva/")) {
    const idPaquete = hash.split("/")[1];
    import("./destinos/vistaReserva.js").then(mod => mod.vistaReserva(idPaquete));

  
  } else {
    cargarSeccionInicio();
    mostrarUsuario();
  }
}

=======
    // Acá cargás la vista de reservas activas
    import("./reservas/seccionReservas.js").then(mod => mod.mostrarReservas());

  } else if (hash === "#historial") {
    // Acá cargás el historial
    import("./historial/seccionHistorial.js").then(mod => mod.mostrarHistorial());

  } else {
    // Pantalla de inicio: botones + carruseles
    cargarSeccionInicio();
    mostrarUsuario();
    CarruselPorDestino();
    listarPaquetes(); // O podés combinar esto en una sola función si querés
  }

  console.log("Ruta:", hash);
}
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf

function setSession(session) {
  let d = document;
  if (session.autenticado) {
    mostrarUsuario(session.email);
<<<<<<< HEAD
  } else {
    // Si NO está autenticado, reseteamos los botones de login/register
    let btnLogin = d.querySelector(".btnLogin");
    let btnRegister = d.querySelector(".btnRegister");

    if (btnLogin) {
      btnLogin.textContent = "Login";
      btnLogin.setAttribute("href", "#login");
    }

    if (btnRegister) {
      btnRegister.textContent = "Registrarse";
      btnRegister.setAttribute("href", "#register");
    }
  }
}

=======
  }
}
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
