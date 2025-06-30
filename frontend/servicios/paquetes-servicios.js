const url = "http://127.0.0.1:8000/paquetes";


async function listar(id) {
    let cadUrl;
    if (isNaN(id))
        cadUrl = url;
    else
        cadUrl = url + "/" + id;
    return await fetch(cadUrl, {
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(respuesta => respuesta.json());
}

async function crear(nombre, fecha_inicio, fecha_fin, cupo, precio, destino_id) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            destino_id: destino_id,
            nombre: nombre,
            precio: precio,
            cupo: cupo,
            fecha_inicio: fecha_inicio,
            fecha_fin,
        })
    })
        .then(respuesta => respuesta.json());
}

async function editar(id, nombre, fecha_inicio, fecha_fin, cupo, precio, destino_id) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            destino_id: destino_id,
            nombre: nombre,
            precio: precio,
            cupo: cupo,
            fecha_inicio: fecha_inicio,
            fecha_fin
        })
    })
        .then(respuesta => respuesta.json());
}

async function borrar(id) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'DELETE'
    })
        .then(respuesta => respuesta.json());
}

async function listarPorDestino(nombre_destino) {
    const newUrl = new URL(url + '/');
    newUrl.searchParams.append('nombre_destino', nombre_destino);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());

}

async function obtenerPaqueteMasReservado() {
    const urlMasReservado = url + "/mas-reservados";
    return await fetch(urlMasReservado, {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error("Paquete no encontrado");
        }
        return respuesta.json();
    });
}

export const paquetesServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorDestino,
    obtenerPaqueteMasReservado
}