const url = "http://127.0.0.1:8000/reservas";

const getAuthHeaders = () => ({
  "accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": "Bearer " + localStorage.getItem('token')
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
}

// Para editar tienes que enviar el objeto completo; aquí solo ejemplo con estado
async function editar(id, reservaCompleta) {
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
