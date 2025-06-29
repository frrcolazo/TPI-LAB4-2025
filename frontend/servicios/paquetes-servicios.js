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

async function crear(nombre, fecha_inicio, fecha_fin, cupo, precio, destino_id, destino) {

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
            destino: destino
        })
    })
        .then(respuesta => respuesta.json());
}

async function editar(id, nombre, fecha_inicio, fecha_fin, cupo, precio, destino_id, destino) {

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
            fecha_fin,
            destino: destino
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

async function listarPorDestino(destino_id) {
    const newUrl = new URL(url + '/');
    newUrl.searchParams.append('destino_id', destino_id);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());

}
export const paquetesServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorDestino
}