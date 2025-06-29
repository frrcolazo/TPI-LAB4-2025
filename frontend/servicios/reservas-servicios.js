const url = "http://127.0.0.1:8000/reservas";

async function listar(id) {
    let cadUrl = isNaN(id) ? url : `${url}/${id}`;
    return await fetch(cadUrl, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(respuesta => respuesta.json());
}

async function crear(idUsuario, idPaquete, cantidad_personas, fecha_reserva, estado) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario,
            idPaquete,
            cantidad_personas,
            fecha_reserva,
            estado
        })
    }).then(respuesta => respuesta.json());
}

async function editar(id, estado) {
    let urlPut = `${url}/${id}`;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ estado })
    }).then(respuesta => respuesta.json());
}

async function borrar(id) {
    let urlDelete = `${url}/${id}`;
    return await fetch(urlDelete, {
        method: 'DELETE'
    }).then(respuesta => respuesta.json());
}

async function listarPorUsuario(idUsuario) {
    let urlUsuario = `${url}/usuario/${idUsuario}`;
    return await fetch(urlUsuario, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(respuesta => respuesta.json());
}

export const reservasServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorUsuario
}
