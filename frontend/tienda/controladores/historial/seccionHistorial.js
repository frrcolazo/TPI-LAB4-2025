import { mostrarSolo } from "../../utils/utils.js";
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

function getUserEmailFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email || null;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

export async function mostrarHistorial() {
  mostrarSolo("seccionHistorial");

  const seccionHistorial = document.querySelector(".seccionHistorial");
  if (!seccionHistorial) return;

  seccionHistorial.innerHTML = `
    <h1 class="titulo-historial">VIAJES ACTIVOS</h1>
    <div class="loading">Cargando viajes activos...</div>
  `;

  try {
    const email = getUserEmailFromToken();
    if (!email) throw new Error("Email no encontrado en el token");

    const usuarios = await usuariosServices.listar();
    const usuario = usuarios.find(u => u.correo === email);
    if (!usuario) throw new Error("Usuario no encontrado");

    // Acá hago la llamada directa al endpoint /reservas/usuario/{idUsuario}/resumen
    const urlResumen = `http://127.0.0.1:8000/reservas/usuario/${usuario.id}/resumen`;
    const res = await fetch(urlResumen, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error HTTP ${res.status}: ${errorText}`);
    }

    const reservasResumen = await res.json();

    if (!reservasResumen || reservasResumen.length === 0) {
      seccionHistorial.innerHTML = `
        <h1 class="titulo-historial">VIAJES ACTIVOS</h1>
        <div class="sin-viajes">
          <p>No hay viajes activos en este momento.</p>
        </div>
      `;
      return;
    }

    const activosHTML = reservasResumen.map(reserva => `
      <div class="item-historial">
        <h3>${reserva.destino_nombre || "Destino desconocido"}</h3>
        <p><strong>Paquete:</strong> ${reserva.paquete_nombre || "N/A"}</p>
        <p><strong>Fecha inicio:</strong> ${formatearFecha(reserva.fecha_inicio)}</p>
        <p><strong>Fecha fin:</strong> ${formatearFecha(reserva.fecha_fin)}</p>
        <p><strong>Personas:</strong> ${reserva.cantidad_personas}</p>
        <p><strong>Reservado el:</strong> ${formatearFecha(reserva.fecha_reserva)}</p>
      </div>
    `).join("");

    seccionHistorial.innerHTML = `
      <h1 class="titulo-historial">VIAJES ACTIVOS</h1>
      <div class="carrusel-historial">
        ${activosHTML}
      </div>
    `;

  } catch (error) {
    console.error("Error al mostrar viajes activos:", error);
    seccionHistorial.innerHTML = `
      <h1 class="titulo-historial">VIAJES ACTIVOS</h1>
      <div class="error-historial">
        <p>Hubo un problema al cargar los viajes activos: ${error.message}</p>
      </div>
    `;
  }
}

function formatearFecha(fecha) {
  if (!fecha) return "N/A";
  return new Date(fecha).toLocaleDateString("es-AR");
}
