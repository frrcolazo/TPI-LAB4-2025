const url = "http://127.0.0.1:8000/reservas";

const getAuthHeaders = () => ({
<<<<<<< HEAD
    "accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem('token')
=======
  "accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": "Bearer " + localStorage.getItem('token')
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
});

async function listar(id) {
    let cadUrl = isNaN(id) ? url : `${url}/${id}`;
    return await fetch(cadUrl, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(async respuesta => {
        if (!respuesta.ok) {
            const errText = await respuesta.text();
            throw new Error(`Error HTTP ${respuesta.status}: ${errText}`);
        }
        return respuesta.json();
    });
}

<<<<<<< HEAD
// Cambiado: ahora recibe un objeto reserva
async function crear(reserva) {
    return await fetch(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reserva)
    }).then(respuesta => respuesta.json());
=======
async function crear(idUsuario, idPaquete, cantidad_personas, fecha_reserva, estado) {
  return await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      idUsuario,
      idPaquete,
      cantidad_personas,
      fecha_reserva,
      estado
    })
  }).then(respuesta => respuesta.json());
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
}

// Para editar tienes que enviar el objeto completo; aquí solo ejemplo con estado
async function editar(id, reservaCompleta) {
<<<<<<< HEAD
    let urlPut = `${url}/${id}`;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(reservaCompleta)
    }).then(respuesta => respuesta.json());
}

async function borrar(id) {
    let urlDelete = `${url}/${id}`;
    return await fetch(urlDelete, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(respuesta => respuesta.json());
}

async function listarPorUsuario(idUsuario) {
    let urlUsuario = `${url}/usuario/${idUsuario}`;
    return await fetch(urlUsuario, {
        method: 'GET',
        headers: getAuthHeaders()
    }).then(respuesta => respuesta.json());
}

async function listarPorUsuarioLogeado() {
    let urlUsuario = `${url}/propias/activas/resumen`;
    return await fetch(urlUsuario, {
        method: 'GET',
        headers: getAuthHeaders()
    }).then(respuesta => respuesta.json());
}

async function obtenerTotalReservasActivas() {
    const urlTotalActivas = url + "/activas/total";
    return await fetch(urlTotalActivas, {
        method: 'GET',
        headers: getAuthHeaders()
    })
        .then(async respuesta => {
            if (!respuesta.ok) {
                const errText = await respuesta.text();
                throw new Error(`Error HTTP ${respuesta.status}: ${errText}`);
            }
            return respuesta.json();
        });
}
async function getReservasActivasPorUsuario(idUsuario) {
    try {
        const res = await fetch(`${url}/usuario/${idUsuario}/resumen`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            if (res.status === 404) {
                alert("No hay reservas activas para este usuario.");
                return [];
            }
            const error = await res.json();
            throw new Error(error.detail || "Error al obtener reservas");
        }

        return await res.json();
    } catch (err) {
        console.error("Error en reservasServices.getReservasActivasPorUsuario:", err);
        throw err;
    }
}
export const reservasServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorUsuario,
    listarPorUsuarioLogeado,
    obtenerTotalReservasActivas,
    getReservasActivasPorUsuario
};
//01-07-2025
=======
  let urlPut = `${url}/${id}`;
  return await fetch(urlPut, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(reservaCompleta)
  }).then(respuesta => respuesta.json());
}

async function borrar(id) {
  let urlDelete = `${url}/${id}`;
  return await fetch(urlDelete, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(respuesta => respuesta.json());
}

async function listarPorUsuario(idUsuario) {
  let urlUsuario = `${url}/usuario/${idUsuario}`;
  return await fetch(urlUsuario, {
    method: 'GET',
    headers: getAuthHeaders()
  }).then(respuesta => respuesta.json());
}

export const reservasServices = {
  listar,
  crear,
  editar,
  borrar,
  listarPorUsuario
};
>>>>>>> 00142904fbea67cc287c098406e1b8678ca124cf
