import { paquetesServices } from "../../../servicios/paquetes-servicios.js";
import { mostrarSolo } from "../../utils/utils.js";

export async function vistaReserva(idPaquete) {
    mostrarSolo("vistaReserva");

    const d = document;
    const vista = d.querySelector(".vistaReserva");

    if (!idPaquete) {
        vista.innerHTML = `
            <div class="error-container">
                <h2>⚠️ Error</h2>
                <p>No hay ningún paquete seleccionado para reservar.</p>
                <button class="btn-volver" onclick="history.back()">Volver</button>
            </div>
        `;
        return;
    }

    vista.innerHTML = `<p>Cargando información del paquete...</p>`;

    try {
        const paquetes = await paquetesServices.listar();
        const paquete = paquetes.find(p => p.id == idPaquete);

        if (!paquete) {
            vista.innerHTML = `
                <div class="error-container">
                    <h2>⚠️ Error</h2>
                    <p>No se encontró el paquete seleccionado.</p>
                    <button class="btn-volver" onclick="history.back()">Volver</button>
                </div>
            `;
            return;
        }

        vista.innerHTML = `
            <div class="reserva-formulario">
                <h2>Reservar paquete: ${paquete.nombre}</h2>
                <p><strong>Destino:</strong> ${paquete.destino_id}</p>
                <p><strong>Precio por persona:</strong> ${formatearPrecio(paquete.precio)}</p>
                <p><strong>Fechas:</strong> ${formatearRangoFechas(paquete.fecha_inicio, paquete.fecha_fin)}</p>
                <p><strong>Cupos disponibles:</strong> ${paquete.cupo}</p>

                <form id="formReserva">
                    <label for="cantidad_personas">Cantidad de personas:</label>
                    <input 
                        type="number" 
                        id="cantidad_personas" 
                        name="cantidad_personas" 
                        min="1" 
                        max="${paquete.cupo}" 
                        value="1" 
                        required
                    />
                    <button type="submit">Confirmar reserva</button>
                </form>
                <button class="btn-volver" onclick="history.back()">← Volver</button>
            </div>
        `;

        const form = d.getElementById("formReserva");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const cantidad = parseInt(d.getElementById("cantidad_personas").value);

            if (cantidad < 1 || cantidad > paquete.cupo) {
                alert(`La cantidad debe estar entre 1 y ${paquete.cupo}`);
                return;
            }

            await confirmarReserva(paquete.id, cantidad);
        });

    } catch (error) {
        vista.innerHTML = `
            <div class="error-container">
                <h2>❌ Error al cargar datos</h2>
                <p>No se pudo obtener la información del paquete. Intenta nuevamente.</p>
                <button class="btn-reintentar" onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }
}

function formatearFecha(fecha) {
    if (!fecha) return "Sin fecha";
    const f = new Date(fecha);
    return f.toLocaleDateString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

function formatearRangoFechas(fechaInicio, fechaFin) {
    return `${formatearFecha(fechaInicio)} - ${formatearFecha(fechaFin)}`;
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(precio);
}

async function confirmarReserva(idPaquete, cantidad_personas) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Debes iniciar sesión para reservar.");
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.email;

        if (!email) {
            alert("Error: Token inválido - no contiene email");
            return;
        }

        const userRes = await fetch(`http://localhost:8000/usuarios/?email=${email}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!userRes.ok) {
            alert("❌ No se pudo obtener el usuario");
            return;
        }

        const usuarios = await userRes.json();
        const usuario = Array.isArray(usuarios) ? usuarios[0] : usuarios;

        if (!usuario || !usuario.id) {
            alert("Error: No se encontró un usuario válido para el email");
            return;
        }

        const hoy = new Date();
        const fechaReserva = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

        const reservaData = {
            idUsuario: usuario.id,
            idPaquete: idPaquete,
            cantidad_personas: cantidad_personas,
            fecha_reserva: fechaReserva
        };

        const res = await fetch("http://localhost:8000/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reservaData)
        });

        if (res.ok) {
            alert("✅ Reserva realizada con éxito. ¡Gracias por elegirnos!");
            localStorage.removeItem("paqueteSeleccionado");
            history.back();
        } else {
            const error = await res.json();
            let mensajeError = "Error desconocido";
            
            if (error.detail) {
                mensajeError = Array.isArray(error.detail) 
                    ? error.detail.map(e => typeof e === 'object' ? JSON.stringify(e) : e).join(', ')
                    : error.detail;
            } else if (error.message) {
                mensajeError = error.message;
            }
            
            alert("⚠️ Error al reservar: " + mensajeError);
        }

    } catch (err) {
        alert("❌ Error al conectar con el servidor: " + err.message);
    }
}