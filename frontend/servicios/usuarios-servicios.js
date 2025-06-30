// usuarios-servicios.js
const url = "http://127.0.0.1:8000/usuarios";

async function login(usuario, password) {
    let cadUrl = "http://127.0.0.1:8000/login";
    return await fetch(cadUrl, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email: usuario, password: password })
    })
    .then(respuesta => respuesta.json())
    .catch(respuesta => respuesta.json());
}
async function listarTopReserva() {
    const urlTopReserva = url + "/top-reserva";
    return await fetch(urlTopReserva, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(res => {
        if (!res.ok) return null;
        return res.json();
    });
}
async function topReservas() {
    const res = await fetch('/api/usuarios/top-reserva');
    if (!res.ok) throw new Error('Error al obtener usuario con más reservas');
    return res.json();
}


async function listar(id) {
    let cadUrl;
    if (isNaN(id))
        cadUrl = url;
    else
        cadUrl = url + "/" + id;
    return await fetch(cadUrl, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(respuesta => respuesta.json());
}

async function crear(apellido, nombre, correo, password, role = "Cliente") {
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apellido,
            nombre,
            correo,
            password,
            role
        })
    }).then(respuesta => respuesta.json());
}

async function editar(id, apellido, nombre, correo, password, role = "Cliente") {
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apellido,
            nombre,
            correo,
            password,
            role
        })
    }).then(respuesta => respuesta.json());
}

async function borrar(id) {
    let urlDelete = url + "/" + id;
    return await fetch(urlDelete, {
        method: 'DELETE'
    }).then(respuesta => respuesta.json());
}

export const usuariosServices = {
    login,
    listar,
    listarTopReserva,
    topReservas,
    crear,
    editar,
    borrar
};