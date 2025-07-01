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
    <h1 class="titulo-historial">HISTORIAL DE VIAJES</h1>
    <div class="loading">Cargando historial de viajes...</div>
  `;

  try {
    const email = getUserEmailFromToken();
    if (!email) throw new Error("Email no encontrado en el token");

    const usuarios = await usuariosServices.listar();
    const usuario = usuarios.find(u => u.correo === email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const urlHistorial = `http://127.0.0.1:8000/reservas/usuario/${usuario.id}/resumen`;
    const res = await fetch(urlHistorial, {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error HTTP ${res.status}: ${errorText}`);
    }

    const reservas = await res.json();
    console.log("RESERVAS ORIGINALES:", reservas);

    // 🔍 Filtrar solo las reservas que ya finalizaron
    const hoy = new Date();
    const reservasPasadas = reservas.filter(reserva => {
      const fechaFin = new Date(reserva.fecha_fin);
      return fechaFin < hoy;
    });

    if (reservasPasadas.length === 0) {
      seccionHistorial.innerHTML = `
        <h1 class="titulo-historial">HISTORIAL DE VIAJES</h1>
        <div class="sin-viajes">
          <p>No hay viajes pasados registrados en tu historial.</p>
        </div>
      `;
      return;
    }

    const historialHTML = reservasPasadas.map(reserva => `
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
      <h1 class="titulo-historial">HISTORIAL DE VIAJES</h1>
      <div class="carrusel-historial">
        ${historialHTML}
      </div>
    `;

  } catch (error) {
    console.error("Error al mostrar historial de viajes:", error);
    seccionHistorial.innerHTML = `
      <h1 class="titulo-historial">HISTORIAL DE VIAJES</h1>
      <div class="error-historial">
        <p>Hubo un problema al cargar el historial: ${error.message}</p>
      </div>
    `;
  }
}

function formatearFecha(fecha) {
  if (!fecha) return "N/A";
  return new Date(fecha).toLocaleDateString("es-AR");
}
